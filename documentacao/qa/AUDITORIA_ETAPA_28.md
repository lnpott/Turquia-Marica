# Auditoria consolidada — Etapa 28

**Data:** 15/08/2026  
**Responsável:** Codex (OpenAI)<br>
**Fechamento:** 19:09 BRT (22:09 UTC)<br>
**Escopo:** modo local de demonstração visual com produtos fictícios, isolamento do build público e evidência responsiva.

## Veredito

**APROVADO.** A rota de QA oferece o contexto visual completo da aplicação quando ativada localmente e não deixa rota, fixture, chunk ou sentinela no build público padrão.

## Resultado visual

- 16 produtos fictícios cobrem quatro categorias, variações de título, descrição, preço e ausência de fotografia real.
- Header, Footer e BottomNavBar reais permanecem presentes para detectar interferências de layout.
- O aviso amarelo persistente diferencia inequivocamente a superfície de QA do Cardápio comercial.
- Filtros reutilizam os componentes aprovados e permitem avaliar densidade, alinhamento e fluxo da grade.
- O placeholder “SEM FOTO · QA” evita mídia enganosa e mantém a proporção do card.

## Isolamento comprovado

- A flag é desligada por padrão em `.env.example`.
- A rota, página e fixture são eliminadas pelo build padrão.
- `npm run build` chama `audit:demo-leak`, que busca rota, sentinelas e campos demonstrativos em todos os arquivos textuais de `dist/`.
- Se a flag for ativada por engano durante `npm run build`, o gate encontra o conteúdo e reprova o deploy.
- `src/data/menu.js`, `public/sitemap.xml`, Open Graph e componentes visuais públicos não foram alterados.
- A rota demonstrativa não possui qualquer link no Header, Footer ou BottomNavBar.
- Como `isPlaceholder` também identifica os Reviews fictícios públicos da Etapa 27, o gate o classifica como vazamento da Etapa 28 somente quando aparece no mesmo artefato que uma sentinela demo; `isMock` continua sendo bloqueado globalmente.

## Evidências

`documentacao/qa/etapa-28/` contém capturas completas em 320, 390, 768, 1280 e 1440 px, geradas somente após todos os cards concluírem o scroll reveal.

## Validação

- `npm run check`: lint, 6 testes unitários, build e gate de ausência aprovados.
- `npm run test:e2e`: 32/32 testes públicos aprovados, incluindo a indisponibilidade da rota de QA no build padrão.
- `npm run test:e2e:demo`: 5/5 projetos aprovados, com filtros, contexto real, axe, console e evidência visual.
- `npm audit --audit-level=high`: zero vulnerabilidades.
- `git diff --check`: aprovado.
- `src/data/menu.js`: idêntico a `origin/main`.
- Sitemap: somente a Home canônica.
- Hashes do logo preservados: `b8bfb19a81b5e0b7d11863f2ed8c5c7a` e `77fa9b3692375171ea1c2b66438da98a`.

## Operação e rollback

- Desenvolvimento visual: `VITE_VISUAL_QA_DEMO=true npm run dev`, acessando `/__visual-qa`.
- Evidência formal: `npm run test:e2e:demo`.
- Produção: `npm run build`; nunca usar `build:demo` no deploy.
- Rollback: reverter o commit da Etapa 28 remove rota, fixture, assets, scripts, configuração e evidências sem tocar nos componentes públicos.
