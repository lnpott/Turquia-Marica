# Turquia Lanches

[![Quality](https://github.com/lnpott/Turquia-Marica/actions/workflows/quality.yml/badge.svg)](https://github.com/lnpott/Turquia-Marica/actions/workflows/quality.yml)

Site institucional e catálogo da **Turquia Lanches** em Parque Nanci, Maricá/RJ.

Pedidos são encaminhados ao **iFood** oficial. O site não é e-commerce.

**Produção:** [turquia-marica.vercel.app](https://turquia-marica.vercel.app)

---

## Documentação

| Arquivo | Função |
|---------|--------|
| **[GUIA.md](GUIA.md)** | **Documento canônico unificado** — leia este primeiro |
| [AGENTS.md](AGENTS.md) | Regras obrigatórias para agentes de IA |
| [BEST_PLAN.MD](BEST_PLAN.MD) | Plano operacional vivo (etapas e estados) |
| [documentacao/ASSETS.md](documentacao/ASSETS.md) | Catálogo de mídia ativa |

---

## Stack

- React 18 + React Router 7
- Vite 8
- Tailwind CSS 3
- MapLibre GL
- Vitest + Playwright + axe

## Comandos

```bash
npm install
npm run dev
npm run check          # lint + test + build + audit:demo-leak
npm run test:e2e
```

Primeira execução de E2E:

```bash
npx playwright install chromium
```

## Dados comerciais

Fonte única: `src/data/contact.js`  
Nunca invente endereço, horário, telefone, preço ou canal.

## CI/CD

- **CI:** GitHub Actions (`Quality`) em PR e push para `main`
- **CD:** Vercel a partir de `main`

---

Leia o **[GUIA.md](GUIA.md)** para arquitetura atual, Hero, pendências e como trabalhar no repositório.
