/**
 * Cloudflare Worker - Proxy Seguro para a API do Melhor Envio
 * 
 * Este worker intermediário protege seu Token privado do Melhor Envio,
 * resolve o problema de CORS para o GitHub Pages e calcula o frete da camiseta.
 * 
 * Variáveis de ambiente configuradas no Cloudflare Dashboard ou wrangler.toml:
 * - MELHOR_ENVIO_TOKEN: Token de acesso gerado no painel do Melhor Envio (Bearer)
 * - ORIGIN_POSTAL_CODE: CEP de onde a camiseta é enviada (somente números, ex: "01001000")
 * - MELHOR_ENVIO_ENV: "production" ou "sandbox" (padrão: "production")
 * - ALLOWED_ORIGIN: "https://0lukinhas.github.io" ou "*" (padrão: "*")
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Dimensões e peso padrão do pacote com 1 camiseta dobrada
const TSHIRT_PACKAGE = {
  height: 4,      // 4 cm de altura
  width: 16,      // 16 cm de largura
  length: 22,     // 22 cm de comprimento
  weight: 0.30,   // 300 gramas (0.30 kg)
};

const melhorEnvioWorker = {
  async fetch(request, env) {
    // Tratamento de pre-flight CORS (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    const url = new URL(request.url);

    // Rota de teste/saúde
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(
        JSON.stringify({
          status: 'online',
          service: 'MM Racing / Malton 177 - Melhor Envio Gateway',
          configured: Boolean(env.MELHOR_ENVIO_TOKEN),
          origin_cep: env.ORIGIN_POSTAL_CODE || '13255505',
          environment: env.MELHOR_ENVIO_ENV || 'production',
        }),
        {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    }

    // Apenas responde a /api/frete ou /calculate
    if (url.pathname !== '/api/frete' && url.pathname !== '/calculate') {
      return new Response(JSON.stringify({ error: 'Rota não encontrada' }), {
        status: 404,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    try {
      let destPostalCode = '';
      let quantity = 1;

      if (request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        destPostalCode = body.postal_code || body.cep || '';
        quantity = Math.max(1, parseInt(body.quantity || 1, 10));
      } else if (request.method === 'GET') {
        destPostalCode = url.searchParams.get('cep') || url.searchParams.get('postal_code') || '';
        quantity = Math.max(1, parseInt(url.searchParams.get('quantity') || 1, 10));
      }

      // Higieniza o CEP (apenas dígitos)
      const cleanDestCep = String(destPostalCode).replace(/\D/g, '');
      if (cleanDestCep.length !== 8) {
        return new Response(
          JSON.stringify({
            error: 'CEP inválido. O CEP deve conter exatamente 8 dígitos numéricos.',
          }),
          {
            status: 400,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          }
        );
      }

      const token = env.MELHOR_ENVIO_TOKEN;
      if (!token) {
        return new Response(
          JSON.stringify({
            error: 'MELHOR_ENVIO_TOKEN não configurado no servidor.',
          }),
          {
            status: 500,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          }
        );
      }

      const originCep = (env.ORIGIN_POSTAL_CODE || '13255505').replace(/\D/g, '');
      const isSandbox = (env.MELHOR_ENVIO_ENV || '').toLowerCase() === 'sandbox';
      const melhorenvioBase = isSandbox
        ? 'https://sandbox.melhorenvio.com.br'
        : 'https://melhorenvio.com.br';

      // Ajusta o pacote caso seja mais de 1 camiseta
      const packageDimensions = {
        height: Math.min(105, TSHIRT_PACKAGE.height * quantity),
        width: TSHIRT_PACKAGE.width,
        length: TSHIRT_PACKAGE.length,
        weight: Number((TSHIRT_PACKAGE.weight * quantity).toFixed(2)),
      };

      const payload = {
        from: {
          postal_code: originCep,
        },
        to: {
          postal_code: cleanDestCep,
        },
        package: packageDimensions,
        options: {
          receipt: false,
          own_hand: false,
        },
      };

      const meResponse = await fetch(`${melhorenvioBase}/api/v2/me/shipment/calculate`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'MMRacingMalton177 (contato@mmracing.com.br)',
        },
        body: JSON.stringify(payload),
      });

      if (!meResponse.ok) {
        const errorText = await meResponse.text();
        return new Response(
          JSON.stringify({
            error: 'Falha na resposta da API do Melhor Envio',
            status: meResponse.status,
            details: errorText,
          }),
          {
            status: 502,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          }
        );
      }

      const data = await meResponse.json();

      if (!Array.isArray(data)) {
        return new Response(
          JSON.stringify({
            error: 'Formato de resposta inesperado do Melhor Envio',
            details: data,
          }),
          {
            status: 502,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          }
        );
      }

      // Filtra apenas serviços disponíveis e sem erros
      const quotes = data
        .filter((service) => !service.error && service.price)
        .map((service) => {
          const priceNumber = parseFloat(service.custom_price || service.price);
          const days = service.custom_delivery_time || service.delivery_time;
          return {
            id: service.id,
            name: service.name,
            company: service.company ? service.company.name : 'Transportadora',
            picture: service.company ? service.company.picture : null,
            price: priceNumber,
            formatted_price: `R$ ${priceNumber.toFixed(2).replace('.', ',')}`,
            delivery_days: days,
            delivery_range: service.delivery_range || { min: days, max: days },
          };
        })
        .sort((a, b) => a.price - b.price); // Ordena pelo mais barato primeiro

      return new Response(
        JSON.stringify({
          success: true,
          destination_cep: cleanDestCep,
          origin_cep: originCep,
          quotes,
        }),
        {
          status: 200,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: 'Erro interno ao cotar frete',
          message: err.message || String(err),
        }),
        {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};

export default melhorEnvioWorker;

