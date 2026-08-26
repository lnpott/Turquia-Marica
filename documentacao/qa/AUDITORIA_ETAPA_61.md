# Auditoria independente — Etapa 61

**Data da reauditoria:** 26/08/2026
**Commit-base auditado:** `69400c0`
**Escopo:** adaptação visual do Grok, hero, mídia da seção “A casa”, preservação do
mapa, acessibilidade, testes e evidências responsivas.

## Veredito final

**APROVADO PARA MERGE.**

Os dois bloqueios P1 e a ressalva P2 encontrados na primeira auditoria foram
corrigidos, cobertos por regressão automatizada e revalidados em desktop e mobile. O
mapa MapLibre atual permanece inalterado.

## Correções auditadas

### Resolvido — ciclo e reinício do autoplay

O efeito do timer agora depende também de `activeIndex`. Toda troca de cena reagenda
o avanço, mesmo quando duas cenas consecutivas possuem a mesma duração. O novo teste
com timer controlado seleciona manualmente a cena 4, confirma que ela permanece ativa
até 4.999 ms e valida o ciclo 4 → 5 → 1.

### Resolvido — área tátil dos indicadores

Cada botão indicador possui caixa interativa real de 44×44 px. A linha editorial de
18×2 px (38×2 px quando ativa) passou para um pseudo-elemento, preservando a aparência
sem reduzir o alvo de mouse, toque ou teclado. O E2E mede os cinco botões nos dois
projetos Playwright e exige largura e altura mínimas de 44 px.

### Resolvido — mudança dinâmica de reduced motion

Os vídeos de “A casa” agora separam visibilidade e preferência de movimento, observam
`MediaQueryList.change`, pausam imediatamente quando a preferência muda para
`reduce` e removem listener/observer no cleanup. O E2E altera a preferência com a
página aberta e confirma que todos os vídeos ficam pausados.

## Itens preservados e aprovados

- React/Vite/Tailwind atuais; nenhum scaffold TanStack/Nitro, banco, autenticação,
  PWA ou dependência da exportação foi incorporado.
- `LocationSection` continua renderizando o `MapEmbed` local, sem `iframe` ou troca de
  provedor.
- Coordenadas, pin, indicação do retorno, carregamento lazy, fallback, CTA único e
  atribuições do mapa permanecem preservados.
- “A casa” usa apenas vídeos, posters e fotografia já versionados.
- Vídeos usam `muted`, `playsInline`, `loop`, `preload="metadata"`, poster e pausa fora
  da viewport.
- `version_clean.md` permanece relatório consultivo; o estado operacional está apenas
  no `BEST_PLAN.MD`.

## Validação final

- `npm run check`: ESLint aprovado; 2 arquivos e 25 testes Vitest aprovados; build
  Vite e `audit:demo-leak` aprovados.
- `npm run test:e2e`: 40/40 aprovados em desktop e mobile, incluindo axe, console,
  overflow, ciclo/seleção do hero, área tátil e mudança dinâmica de reduced motion.
- `git diff --check`: aprovado.
- Screenshot mobile 390×844 inspecionado em resolução integral, sem corte ou overflow.
- Screenshot desktop 1280×900 inspecionado em resolução integral, sem corte ou
  overflow.
- Verificação programática das capturas confirmou os cinco controles do hero com
  dimensões mínimas de 44×44 px.

## Evidências

- `documentacao/qa/etapa-61-correcoes/hero-indicadores-mobile.png`
- `documentacao/qa/etapa-61-correcoes/hero-indicadores-desktop.png`

## Riscos residuais

- O build mantém o aviso já conhecido de chunk do MapLibre acima de 500 kB; o mapa é
  carregado dinamicamente e esse aviso não foi causado por estas correções.
- Não há pendência funcional, visual ou de acessibilidade identificada nesta
  reauditoria que bloqueie o merge da Etapa 61.
