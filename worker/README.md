# 🚚 Integração Melhor Envio - MM Racing / Malton 177

Esta pasta contém o proxy seguro (Serverless / Cloudflare Worker) para cotar fretes da Camiseta Oficial USA Tour 2027 com a API do **Melhor Envio**.

---

## 🔒 Por que usar este intermediador?
1. **Segurança do Token:** O GitHub Pages é público e estático. Colocar o Token do Melhor Envio no JavaScript do front-end exporia seus créditos e sua conta.
2. **CORS:** O Melhor Envio bloqueia chamadas diretas de navegadores. O worker adiciona os cabeçalhos de CORS (`Access-Control-Allow-Origin: *`).

---

## 🚀 Como colocar no ar em 2 minutos (Cloudflare Worker Gratuito)

1. Crie uma conta ou faça login em [dash.cloudflare.com](https://dash.cloudflare.com/) (100% gratuito, até 100.000 requisições/dia).
2. Vá em **Workers & Pages** -> **Create Application** -> **Create Worker**.
3. Dê o nome: `mmracing-frete-melhorenvio`.
4. Clique em **Deploy**.
5. Na página do Worker criado, clique em **Edit code** e cole todo o conteúdo do arquivo [`melhor-envio-proxy.js`](./melhor-envio-proxy.js). Clique em **Deploy**.
6. Vá na aba **Settings** do Worker -> **Variables and Secrets** e adicione:
   - `MELHOR_ENVIO_TOKEN`: (Cole o Token Bearer gerado no painel do Melhor Envio)
   - `ORIGIN_POSTAL_CODE`: `09635000` (Ou o CEP de onde as camisetas serão despachadas)
   - `MELHOR_ENVIO_ENV`: `production` (ou `sandbox` se for ambiente de testes)
7. Copie a URL do seu Worker gerada pela Cloudflare (ex: `https://mmracing-frete-melhorenvio.seu-usuario.workers.dev`).
8. No arquivo `mc177usa/index.html` (e `mc177usa.html`), localize a linha:
   ```javascript
   var MELHOR_ENVIO_ENDPOINT = '';
   ```
   E coloque a URL com `/api/frete`:
   ```javascript
   var MELHOR_ENVIO_ENDPOINT = 'https://mmracing-frete-melhorenvio.seu-usuario.workers.dev/api/frete';
   ```

---

## ⚡ Alternativa com Next.js / Vercel
Se você for publicar a aplicação na Vercel:
A rota já está criada e testada em [`src/app/api/frete/route.ts`](../src/app/api/frete/route.ts).
Basta configurar as variáveis de ambiente na Vercel:
- `MELHOR_ENVIO_TOKEN`
- `ORIGIN_POSTAL_CODE`
- `MELHOR_ENVIO_ENV`
E apontar o `MELHOR_ENVIO_ENDPOINT` para `/api/frete`.

---

## 👕 Especificações do Pacote da Camiseta configuradas:
- **Altura:** 4 cm
- **Largura:** 16 cm
- **Comprimento:** 22 cm
- **Peso:** 0.30 kg (300 gramas)
- **Tamanhos:** P, M, G, GG, G1, G2, G3

