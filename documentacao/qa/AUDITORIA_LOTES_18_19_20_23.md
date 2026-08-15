# Auditoria — Lotes 18, 19, 20 e 23

**Data:** 14/08/2026  
**Escopo:** fundação de motion, CTAs, imagens de categoria e navegação ativa  
**Veredito:** **APROVADO**

## Resumo executivo

Os quatro lotes foram implementados sem biblioteca adicional, sem alteração do logo, das fotografias, dos textos comerciais ou dos destinos dos links. A mudança é perceptível durante interação: CTAs ganham preenchimento e resposta tátil, fotografias ampliam dentro da própria moldura e o Header indica a rota atual. Em repouso, a composição, a hierarquia e o conteúdo permanecem equivalentes à baseline.

## Lote 18 — fundação técnica

- Tokens Tailwind: `duration-tactile` (160 ms), `duration-smooth` (420 ms) e `duration-reveal` (700 ms).
- Easings correspondentes: `ease-tactile`, `ease-smooth` e `ease-reveal`.
- `tactile` atende clique/hover; `smooth` atende cards, imagens e sublinhado; `reveal` fica preparado para o Lote 21, ainda não iniciado.
- Nenhuma dependência foi adicionada.

## Lote 19 — CTAs

### Mudança visual

- CTAs primários recebem preenchimento horizontal vermelho-escuro no hover.
- CTAs editoriais mantêm borda e sombra deslocada e passam a responder ao clique com deslocamento/escala.
- CTAs secundários e ações de Header/Footer recebem feedback coerente de hover e clique.

### Mudança técnica

- `Button.jsx`, antes órfão, passou a renderizar os CTAs principais da Home e da Localização.
- Variantes `editorialPrimary` e `editorialSecondary` concentram a linguagem visual.
- `cta-fill-primary` implementa o preenchimento em CSS, sem JavaScript.

## Lote 20 — imagens de categoria

### Mudança visual

- Fotografias ampliam para 105% no hover, em 420 ms, sem ultrapassar a moldura.
- Selos, enquadramentos, fotografias e estados de indisponibilidade não foram alterados.

### Mudança técnica

- O efeito foi aplicado no componente realmente usado por Home e Cardápio, `MenuHighlights`.
- `CategoryCard.jsx` foi removido depois de confirmada a ausência de importações; manter duas implementações concorrentes faria o motion divergir novamente.

## Lote 23 — navegação ativa

### Mudança visual

- A rota atual recebe cor primária e sublinhado que cresce a partir do centro.
- O comportamento existe nos menus desktop e mobile do Header.
- A navegação inferior conserva seu estado ativo e agora usa os mesmos tokens táteis.

### Mudança técnica

- `NavLink` usa `className` funcional.
- O hash `/#sobre` é tratado separadamente: “Sobre nós” não aparece ativo na primeira dobra da Home, somente quando o hash está presente.
- Foco visível, Escape e devolução de foco do menu mobile foram preservados.

## Acessibilidade e movimento reduzido

- `prefers-reduced-motion: reduce` elimina a transição do preenchimento e do sublinhado, preservando o estado final de cor e a identificação da rota.
- Axe não encontrou violações críticas ou sérias nas três rotas.
- Nenhum nome acessível, ordem de foco ou alvo mínimo existente foi removido.

## Performance e regressão

- O build final permanece sem biblioteca de motion; o JS produzido ficou em 68,17 kB gzip e o CSS em 6,37 kB gzip.
- Não houve overflow horizontal em 320, 390, 768, 1280 e 1440 px.
- A matriz E2E passou em Chromium desktop e mobile.
- Os Lotes 21, 22, 24 e 25 não foram iniciados.

## Evidências visuais

- `documentacao/qa/home-lotes-18-19-20-23-mobile.png` — Home em 390 × 844.
- `documentacao/qa/home-lotes-18-19-20-23-desktop.png` — Home em 1.280 × 900, com CTA primário em hover.
- `documentacao/qa/cardapio-lote-20-hover-desktop.png` — Cardápio em 1.280 × 900, com fotografia em hover.

## Resultado

**APROVADO.** As mudanças visuais são deliberadas e limitadas aos estados de interação. As mudanças técnicas eliminam duplicação, instituem tokens reutilizáveis e ampliam testes de navegação, motion e preferência reduzida. Não foi encontrada regressão bloqueante.
