# Auditoria consolidada — Lotes 21 a 26

**Data:** 15/08/2026  
**Baseline:** `98d570e`  
**Escopo:** Home, Cardápio, Localização, navegação compartilhada, motion, acessibilidade e imagem social.

## Veredito

**APROVADO.** Os Lotes 21–26 foram consolidados em uma única entrega visual. A aplicação abandonou o padrão neo-brutalista repetitivo de bordas, sombras deslocadas e badges amarelos e adotou uma direção editorial quente, com hierarquia tipográfica, fotografia em plano de fundo, superfícies creme, vermelho pontual e amarelo como acento.

## Mudanças de design

- Hero da Home reconstruído como composição fotográfica em tela cheia, headline dominante e movimento ambiente lento.
- Cardápio convertido de grade homogênea de cards em lista editorial numerada, com imagens circulares e ritmo vertical próprio.
- Localização recomposta com headline editorial, mapa ilustrado discreto e ação no fluxo do documento.
- Header tornou-se silencioso, sem borda pesada ou fundo de hover; Footer ganhou encerramento tipográfico escuro.
- BottomNavBar passou a usar fundo escuro e amarelo apenas no estado ativo.
- CTAs perderam sombras deslocadas e ganharam profundidade suave, preenchimento e resposta tátil.
- Estados provisórios deixaram de depender de badges coloridos.

## Lote 21 — Scroll reveal

Implementado com `IntersectionObserver` nativo no componente `Reveal`, sem dependência nova. As entradas usam opacidade e deslocamento curto, com stagger nas categorias e apresentação imediata em `prefers-reduced-motion`.

## Lote 22 — Movimento ambiente do Hero

Aprovada a variante de zoom e deslocamento lento da fotografia. O movimento é sutil, preserva texto/CTA e é removido integralmente quando o usuário solicita movimento reduzido.

## Lote 24 — Performance e acessibilidade

- Nenhuma dependência de runtime adicionada.
- Axe sem violações críticas ou sérias nas três rotas.
- Lighthouse: Home 97/100/100/100 (LCP 2,3 s, CLS 0, TBT 70 ms), Cardápio 97/100/100/100 (LCP 2,3 s, CLS 0, TBT 70 ms) e Localização 99/100/100/100 (LCP 1,9 s, CLS 0, TBT 60 ms), na ordem Performance/Acessibilidade/Boas Práticas/SEO.
- A Performance superou a baseline 96; CLS permaneceu em zero. O TBT subiu de 30 ms para 60–70 ms, ainda muito abaixo do limite de 200 ms considerado rápido, sem regressão perceptível.
- Contrastes insuficientes encontrados durante a auditoria no eyebrow escuro e no aviso de endereço foram corrigidos.
- Overflow horizontal em 320 px foi encontrado e eliminado no elemento raiz.
- Interseções reais da BottomNavBar com o Hero do Cardápio e a ação do mapa foram corrigidas e cobertas por E2E.

## Lote 25 — Fechamento social

`public/og-image.png` foi regenerado em 1.200 × 630 a partir do Hero final e validado pelo teste E2E de MIME, dimensões e metadados Open Graph/Twitter.

## Lote 26 — Arquitetura visual

A implementação previamente descrita apenas no plano passou a existir no código real. Header, Hero, Home, Cardápio, Localização, mapa, contato, Footer, BottomNavBar, Button, tokens e estilos globais foram efetivamente refatorados.

## Evidências

O diretório `documentacao/qa/lote-26/` contém 12 capturas versionadas: antes/depois de Home, Cardápio e Localização em 390 px e 1.280 px.

## Validação

- `npm run check`: aprovado (lint, 4 testes unitários e build).
- `npm run test:e2e`: 32/32 aprovados em desktop e mobile, incluindo axe, rotas, SEO, reduced motion, scroll reveal, Hero, navegação, CTAs, hashes, mapa e overflow.
- `npm audit --audit-level=high`: aprovado, zero vulnerabilidades altas.
- `git diff --check`: aprovado.
- Logo preservado; nenhum arquivo de arte da marca foi modificado.

## Ressalvas externas

Fotografias e dados comerciais oficiais continuam condicionados aos sublotes 14A–14F. Nenhum preço, horário, telefone, endereço completo ou URL de pedido foi inventado.
