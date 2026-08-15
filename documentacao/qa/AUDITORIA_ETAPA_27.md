# Auditoria consolidada — Etapa 27

**Data:** 15/08/2026  
**Baseline:** `9cc0f1b`  
**Escopo:** SPA por âncoras, Cardápio orientado a produto, Localização integrada, Reviews demonstrativos, redirects e SEO.

## Veredito

**APROVADO.** A Etapa 27 foi entregue de forma atômica para impedir estados intermediários quebrados entre redirects e âncoras. A Home passou a concentrar todo o conteúdo real, preservando o design editorial-quente do Lote 26.

## Riscos mitigados

- `LocationSection` e `#localizacao` foram entregues no mesmo commit que o redirect legado; não existe janela em que `/localizacao` aponte para uma âncora ausente.
- `MainLayout` agora usa somente `pathname` como key; mudanças de hash não remontam a Home nem reiniciam estado local/animações.
- O estado ativo compara pixels visíveis, usando ratio e ordem apenas como desempate, evitando favorecer seções curtas.
- Reviews fictícios têm `isPlaceholder: true`, `sourceUrl: null`, nomes demonstrativos e sinalização visível na seção/cards; nenhum schema de review é emitido.
- Produtos fictícios existem somente como fixture injetada no teste unitário; `products` continua vazio no runtime público.
- MapEmbed deixou de ser link e a Home possui exatamente um CTA para Maps.
- Páginas e shells antigos foram removidos apenas depois da migração de consumidores.

## Resultado funcional e visual

- Header, BottomNavBar e Footer navegam pelas âncoras da Home.
- A seção ativa acompanha a maior área visível do viewport.
- Cardápio apresenta uma hierarquia centrada em produto, mantendo um único estado vazio honesto enquanto não há catálogo oficial.
- Localização aparece abaixo de Sobre, com mapa editorial, dados parciais e CTA único.
- Reviews demonstrativos formam uma faixa horizontal com scroll-snap, navegação por teclado e transparência editorial.
- Sitemap contém somente a Home canônica; produção usa redirects permanentes e React mantém fallback local.

## Evidências

`documentacao/qa/etapa-27/` contém comparativos da Home antes/depois em 390 e 1280 px e capturas isoladas de Cardápio, Localização e Reviews nas duas larguras.

## Validação

- `npm run check`: lint, 6 testes unitários e build de página única aprovados.
- `npm run test:e2e`: 30/30 testes aprovados em desktop/mobile, cobrindo âncoras, estado ativo, fallback, conteúdo honesto, placeholders, sitemap, axe, reduced motion, BottomNavBar e overflow.
- Lighthouse: Performance 99, Acessibilidade 100, Boas Práticas 100 e SEO 100; LCP 1,9 s, CLS 0 e TBT 70 ms.
- Preview Vercel: `/cardapio` respondeu 308 com `Location: /#cardapio`; `/localizacao` respondeu 308 com `Location: /#localizacao`.
- `npm audit --audit-level=high`: sem vulnerabilidades altas.
- `git diff --check`: aprovado.
- Hashes do logo preservados.

## Ressalvas

- A origem oficial das futuras avaliações permanece indefinida; a camada atual é deliberadamente agnóstica e demonstrativa.
