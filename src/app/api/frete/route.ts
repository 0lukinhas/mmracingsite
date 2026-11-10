import { NextRequest, NextResponse } from 'next/server';

interface MelhorEnvioService {
  id: number;
  name: string;
  price?: string | number;
  custom_price?: string | number;
  delivery_time?: number;
  custom_delivery_time?: number;
  delivery_range?: { min: number; max: number };
  company?: {
    id: number;
    name: string;
    picture?: string;
  };
  error?: string | null;
}

const TSHIRT_PACKAGE = {
  height: 4,
  width: 16,
  length: 22,
  weight: 0.30,
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawCep = body.postal_code || body.cep || '';
    const cleanDestCep = String(rawCep).replace(/\D/g, '');

    if (cleanDestCep.length !== 8) {
      return NextResponse.json(
        { error: 'CEP inválido. O CEP deve conter 8 dígitos numéricos.' },
        { status: 400 }
      );
    }

    const token = process.env.MELHOR_ENVIO_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: 'MELHOR_ENVIO_TOKEN não configurado no ambiente.' },
        { status: 500 }
      );
    }

    const originCep = (process.env.ORIGIN_POSTAL_CODE || '13255505').replace(/\D/g, '');
    const isSandbox = (process.env.MELHOR_ENVIO_ENV || '').toLowerCase() === 'sandbox';
    const baseUrl = isSandbox
      ? 'https://sandbox.melhorenvio.com.br'
      : 'https://melhorenvio.com.br';

    const payload = {
      from: { postal_code: originCep },
      to: { postal_code: cleanDestCep },
      package: TSHIRT_PACKAGE,
      options: {
        receipt: false,
        own_hand: false,
      },
    };

    const meRes = await fetch(`${baseUrl}/api/v2/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'MMRacingMalton177 (contato@mmracing.com.br)',
      },
      body: JSON.stringify(payload),
    });

    if (!meRes.ok) {
      const errDetail = await meRes.text();
      return NextResponse.json(
        { error: 'Falha na resposta do Melhor Envio', details: errDetail },
        { status: 502 }
      );
    }

    const data = await meRes.json();
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Formato inválido retornado pelo Melhor Envio', details: data },
        { status: 502 }
      );
    }

    const quotes = (data as MelhorEnvioService[])
      .filter((service) => !service.error && service.price)
      .map((service) => {
        const price = parseFloat(String(service.custom_price || service.price));
        const days = service.custom_delivery_time || service.delivery_time || 0;
        return {
          id: service.id,
          name: service.name,
          company: service.company ? service.company.name : 'Transportadora',
          picture: service.company ? service.company.picture : null,
          price,
          formatted_price: `R$ ${price.toFixed(2).replace('.', ',')}`,
          delivery_days: days,
          delivery_range: service.delivery_range || { min: days, max: days },
        };
      })
      .sort((a, b) => a.price - b.price);

    return NextResponse.json(
      {
        success: true,
        destination_cep: cleanDestCep,
        origin_cep: originCep,
        quotes,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'Erro interno ao calcular frete', message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cep = searchParams.get('cep') || searchParams.get('postal_code') || '';
  // Reutiliza o POST mockando o body
  return POST(
    new NextRequest(req.url, {
      method: 'POST',
      body: JSON.stringify({ postal_code: cep }),
    })
  );
}

