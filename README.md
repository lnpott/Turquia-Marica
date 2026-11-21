# Turquia Lanches

[![Quality](https://github.com/lnpott/Turquia-Marica/actions/workflows/quality.yml/badge.svg)](https://github.com/lnpott/Turquia-Marica/actions/workflows/quality.yml)

Site institucional da **Turquia Lanches** em Parque Nanci, Maricá/RJ. Não é e-commerce e não encaminha pedido ao iFood.

**Produção:** [turquia-marica.vercel.app](https://turquia-marica.vercel.app)

## Documentação

| Arquivo | Papel |
|---------|--------|
| [GUIA.md](GUIA.md) | O que o site é **agora** |
| [ROADMAP.md](ROADMAP.md) | Para onde vai: cardápio, pedido e entrega |
| [AGENTS.md](AGENTS.md) | Regras para agentes de IA |
| [documentacao/ASSETS.md](documentacao/ASSETS.md) | Mídia real vs ilustrativa |
| [documentacao/historico/](documentacao/historico/) | Arquivo morto. Não define escopo |

Precedência: código > GUIA > ROADMAP da fase autorizada > AGENTS > ASSETS > histórico.

## Stack e comandos

React 18, React Router 7, Vite 8, Tailwind 3, MapLibre, Vitest, Playwright.

```bash
npm install
npm run dev
npm run check
npm run test:e2e
```

Dados comerciais só em `src/data/contact.js`. Não inventar preço, telefone ou canal.
