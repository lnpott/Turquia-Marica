# Turquia Lanches

Site institucional e catálogo da Turquia Lanches em Parque Nanci, Maricá/RJ. O site apresenta a marca, o cardápio em preparação e a localização; pedidos serão encaminhados ao iFood somente quando existir uma URL oficial da loja.

## Stack

- React 18;
- React Router 7;
- Vite 8 com três entradas HTML estáticas;
- Tailwind CSS 3;
- Vitest, Testing Library, Playwright e axe.

## Rotas públicas

- `/` — apresentação e destaques do catálogo;
- `/cardapio/` — categorias e estado do cardápio;
- `/localizacao/` — dados disponíveis e link para Google Maps.

As três rotas geram HTML próprio em `dist`, permitindo acesso direto, reload e metadados específicos.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run test:e2e
npm run check
```

O primeiro E2E local exige o Chromium do Playwright:

```bash
npx playwright install chromium
```

## Dados comerciais

`src/data/contact.js` é a fonte única de endereço, horários e canais. Cada campo possui estado de disponibilidade. Não substitua estados ausentes por dados inferidos.

No baseline da branch `BEST_ONE`:

- Maps e Instagram estão disponíveis;
- iFood, WhatsApp, telefone e horários estão indisponíveis;
- o endereço público está incompleto;
- produtos e preços aguardam aprovação.

## Conteúdo visual

O acervo atual é provisório. Imagens públicas são identificadas como ilustrativas e não representam produtos específicos ou fotografia oficial da casa. Consulte `documentacao/ASSETS.md` antes de trocar ou reutilizar imagens.

## Deploy

O build gera `dist/index.html`, `dist/cardapio/index.html` e `dist/localizacao/index.html`. O `vercel.json` preserva os deep links e configura cache imutável para assets hasheados.

Antes de publicar, execute `npm run check` para validar lint, testes e build de produção.

## Governança

- `BEST_PLAN.MD` — plano operacional vivo, estados e evidências;
- `Roadmap_Mestre_CLAUDE.md` — arquitetura e histórico;
- `documentacao/Relatorio_Auditoria_Pesquisa_Turquia_Lanches.md` — auditoria que originou esta implantação;
- `documentacao/historico/` — exports e planos antigos, fora do runtime.

Ordem de precedência: código/Git atual → `BEST_PLAN.MD` → roadmap histórico.
