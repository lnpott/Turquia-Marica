# Auditoria independente — Etapa 61

**Data:** 26/08/2026
**Commit auditado:** `69400c0`
**Escopo:** adaptação visual da exportação do Grok, preservação do mapa atual,
acessibilidade, comportamento do hero, mídia da seção “A casa”, testes e evidências.

## Veredito

**REPROVADO PARA MERGE nesta revisão.**

A direção visual está coerente e o `MapEmbed` atual foi preservado, mas há dois
defeitos confirmados nos novos controles do hero. O primeiro interrompe o avanço
automático em uma sequência válida; o segundo cria alvos interativos muito menores
que o mínimo recomendado para interação por toque. Ambos devem ser corrigidos e
receber cobertura de regressão antes do merge.

## Achados

### P1 — o autoplay pode parar quando duas cenas consecutivas têm a mesma duração

**Evidência:** o efeito que agenda a próxima cena depende apenas de
`activeSlide.duration` e `canAnimate`. As cenas 4 e 5 possuem a mesma duração de
5.000 ms. Quando o timer da cena 4 seleciona a cena 5, o valor das dependências não
muda; portanto o efeito não agenda outro timer e o carrossel permanece na cena 5.
Pelo mesmo motivo, a nova seleção manual entre cenas com a mesma duração não reinicia
o intervalo a partir da ação do visitante.

**Impacto:** comportamento público quebrado e divergência do contrato documentado de
carrossel contínuo.

**Correção mínima recomendada:** incluir a identidade da cena ativa na dependência do
efeito (por exemplo, `activeIndex`) e criar teste com timer controlado que atravesse
todo o ciclo, inclusive a transição 4 → 5 → 1. O teste também deve confirmar que uma
seleção manual reinicia a contagem da cena escolhida.

### P1 — indicadores clicáveis possuem área interativa de apenas 18×2 px

**Evidência:** o próprio `button` recebe a classe `.hero-carousel__indicator`, que
define `width: 18px` e `height: 2px`; apenas o indicador ativo aumenta a largura para
38 px. Não há padding ou elemento pai ampliando a área clicável.

**Impacto:** os controles são difíceis de acionar em touch e falham o objetivo de
transformar os indicadores em controles realmente utilizáveis. O foco visível existe,
mas não compensa o alvo físico extremamente pequeno.

**Correção mínima recomendada:** manter a linha visual em pseudo-elemento, mas dar ao
`button` uma caixa de pelo menos 24×24 px (preferencialmente 44×44 px no mobile), sem
alterar a aparência editorial. Adicionar teste de dimensão computada em viewport
mobile.

### P2 — vídeos da seção “A casa” não reagem à mudança dinâmica de reduced motion

**Evidência:** `matchMedia('(prefers-reduced-motion: reduce)')` é consultado dentro do
callback do `IntersectionObserver`, mas não há listener para `change`. Se a preferência
for ativada enquanto o vídeo está visível, ele continua tocando até ocorrer nova
notificação de interseção.

**Impacto:** a preferência é respeitada no carregamento/entrada da seção, mas não
durante uma alteração feita com a página aberta.

**Correção recomendada:** observar `MediaQueryList.change`, pausar imediatamente os
vídeos quando a preferência for ativada e remover o listener no cleanup.

## Itens aprovados

- O projeto manteve React/Vite/Tailwind e não importou o scaffold TanStack/Nitro,
  banco, autenticação ou PWA da exportação.
- `LocationSection` continua renderizando o `MapEmbed` local. Não foi introduzido
  `iframe` ou novo provedor de mapa.
- O mapa preserva coordenadas, pin, indicação de retorno, carregamento lazy, fallback,
  CTA único e atribuições existentes.
- A composição visual da seção “A casa” usa somente assets já versionados e não cria
  nova dependência.
- Os vídeos usam poster, `muted`, `playsInline`, `loop`, `preload="metadata"` e pausa
  quando saem da área observada.
- A atualização do teste unitário confirma o mapa acessível e a remoção do placeholder
  antigo.
- O comentário inline anterior sobre `version_clean.md` está resolvido: o documento
  se declara consultivo e remete estados operacionais exclusivamente ao
  `BEST_PLAN.MD`.

## Validação executada

### Aprovada

- `npm run check`: ESLint aprovado; 2 arquivos/24 testes Vitest aprovados; build Vite
  e `audit:demo-leak` aprovados.
- `git diff --check`: aprovado para o relatório e atualização de estado desta revisão.
- Inspeção integral das evidências de 390×844 e 1280×900: composição responsiva sem
  overflow visual aparente; fallback do mapa visível nas capturas conforme ressalva já
  registrada.
- Inspeção estática do ciclo completo de durações e das dimensões CSS dos novos
  controles.

### Não concluída nesta execução

- `npm run test:e2e`: não iniciou porque o executável Chromium correspondente à versão
  instalada do Playwright não existe neste ambiente. A falha é ambiental e ocorreu
  antes de abrir qualquer página; não é resultado funcional da implementação.
- A execução 38/38 registrada pela implementação permanece como evidência histórica,
  mas a suíte atual não cobre os dois P1 acima e, portanto, não seria suficiente para
  aprovar o merge mesmo se repetida sem falha ambiental.

## Requisitos para nova auditoria

1. corrigir a dependência/reinício do timer do hero;
2. ampliar a área real dos botões indicadores;
3. cobrir ciclo completo, seleção manual e dimensões mobile em testes;
4. corrigir ou registrar decisão explícita sobre a mudança dinâmica de reduced motion;
5. executar `npm run check` e `npm run test:e2e` completos;
6. repetir inspeção em 390 px e 1280 px;
7. solicitar nova auditoria independente antes do merge.
