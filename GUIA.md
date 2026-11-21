# GUIA — estado atual

> O que o produto **é hoje**. Futuro (cardápio comprável, pedido, entrega) está só em [`ROADMAP.md`](ROADMAP.md).
> Atualizado em 21/11/2026 na branch `feat/sem-ifood`.
> Divergência: **código + Git > este GUIA > ROADMAP (só da fase autorizada) > AGENTS > ASSETS > `documentacao/historico/`**.

## Produto

Site institucional da **Turquia Lanches**, Parque Nanci, Maricá/RJ.

Faz: marca, fotografia e vídeo reais, cardápio em vitrine, localização, contato.

Não faz: pedido, sacola, checkout, pagamento, login, taxa de entrega, iFood ou outro marketplace.

## Stack

React 18, React Router 7, Vite 8, Tailwind 3, MapLibre GL, Vitest, Playwright, axe. Node 22. Deploy Vercel a partir de `main`. CI: GitHub Actions `quality.yml`.

## Rotas

- `/` — home com âncoras (`#cardapio`, `#localizacao`).
- `/cardapio` e `/localizacao` redirecionam para essas âncoras.
- `/visual-qa-demo` só com `VITE_VISUAL_QA_DEMO=true`.

Não existem `/sacola`, `/checkout` nem `/produto/:id`. Documentos que descrevem isso estão em `documentacao/historico/`.

## Dados (`src/data/contact.js`)

| Campo | Estado |
|-------|--------|
| Endereço | R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160 |
| Horário | Terça a domingo, 17h–00h. Segunda fechado |
| WhatsApp | https://wa.me/5521964699374 |
| Instagram | @turquialanches |
| Maps | disponível |
| Telefone | indisponível |
| iFood | removido |

Não inventar telefone, preço, taxa, área de entrega ou horário diferente.

## Cardápio (`src/data/menu.js`)

Vitrine provisória. Nove itens publicados, todos a R$ 29,90, incluindo "Pizza Teste". Categorias em `construction`. Imagens de produto não são o acervo oficial — ver [`documentacao/ASSETS.md`](documentacao/ASSETS.md). Esses preços **não** são cardápio operacional.

## Hero

Cinco slides em `src/components/home/HeroSection.jsx`: ambiente (vídeo), hambúrguer, espaço infantil (vídeo), tábua de petiscos, pizza. Não redesenhar fora de uma tarefa que peça isso.

## Comandos

```bash
npm install
npm run dev
npm run check
npm run test:e2e
```

E2E na primeira vez: `npx playwright install chromium`.

Segredos de mapa só no painel da Vercel, nunca no repositório e nunca com prefixo `VITE_`.

## Onde mexer

| Pergunta | Arquivo |
|----------|---------|
| O que está no ar neste código | este GUIA |
| O que vamos construir | ROADMAP.md |
| Como um agente edita | AGENTS.md |
| Qual foto pode vender | documentacao/ASSETS.md |
| Etapas, migração, QA antigo | documentacao/historico/ |

Branch de trabalho da retirada do iFood: `feat/sem-ifood`. `main` pode ainda ter o site anterior até o merge. Conferir a branch antes de editar.
