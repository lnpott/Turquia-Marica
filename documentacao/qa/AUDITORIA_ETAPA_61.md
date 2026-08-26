# Auditoria independente — Etapa 61

**Data:** 26/08/2026
**Commit auditado:** `0d0ba02`
**Objeto:** adaptação das melhorias visuais da exportação do Grok, com preservação do mapa atual
**Veredito:** **APROVADO PARA MERGE, COM RESSALVAS NÃO BLOQUEANTES**

## 1. Escopo conferido

Foram auditados o diff completo da Etapa 61, os componentes renderizados, os testes
automatizados, as evidências em 390 px e 1280 px e os comentários do PR #29.

A implementação permaneceu dentro do mandato confirmado:

- não trocou a stack React/Vite;
- não incorporou TanStack, Nitro, autenticação, banco, PWA ou dependências do scaffold
  exportado;
- não trouxe dados comerciais ou avaliações do repositório externo;
- preservou o `MapEmbed` MapLibre existente, incluindo coordenadas, estilo, pin,
  indicação do retorno, carregamento lazy, fallback e atribuições;
- limitou a adaptação ao hero, à seção “A casa” e à composição da seção Localização.

## 2. Resultado por área

### Hero — aprovado

Os indicadores passaram de elementos apenas informativos para botões com nome
acessível e `aria-current`. A seleção manual reutiliza o mesmo `activeIndex` do ciclo
automático e não criou uma segunda fonte de estado. A implementação anterior de
vídeo, poster, preload, pausa fora da viewport, aba oculta e redução de movimento foi
preservada.

O foco visível foi acrescentado. Os traços continuam visualmente pequenos, mas a
separação entre alvos e a navegação por teclado mantêm o controle operável. Um aumento
futuro da área invisível de clique pode melhorar ergonomia em telas touch sem alterar
o desenho; não é bloqueio para este merge.

### “A casa” — aprovado com ressalvas

Os placeholders foram substituídos somente por mídias já versionadas no projeto. Os
vídeos têm poster, `muted`, `playsInline`, `loop` e `preload="metadata"`; a reprodução
é iniciada apenas quando cada vídeo cruza 35% da viewport e é evitada quando
`prefers-reduced-motion` já está ativo.

Ressalvas não bloqueantes:

1. em desktop, os dois vídeos podem cruzar o limiar ao mesmo tempo e reproduzir
   simultaneamente;
2. uma alteração de `prefers-reduced-motion` enquanto o vídeo permanece parado na
   mesma posição da viewport só será observada na próxima callback do
   `IntersectionObserver`.

Recomendação posterior: centralizar a preferência de movimento em um hook reativo e,
se medições reais indicarem custo, limitar a reprodução ao vídeo com maior área
visível. Não é recomendável ampliar este PR apenas para essa otimização sem medição.

### Localização e mapa — aprovado

O placeholder de fotografia foi removido e o `MapEmbed` atual passou a ocupar a coluna
principal. O mapa não foi reimplementado e nenhum `iframe` foi adicionado. A ficha ao
lado continua consumindo `BUSINESS_INFO`, e o CTA de rota permanece único dentro da
seção.

O teste E2E confirma que o mapa carrega o marcador editorial “Retorno KM 25”, mantém a
seta e o rótulo dentro do canvas e publica os dados oficiais uma única vez. Portanto,
a falha de certificado observada exclusivamente durante a geração manual das imagens
não representa substituição ou regressão do componente: as screenshots registram o
fallback previsto, enquanto o E2E validou a renderização vetorial real.

### Conteúdo e dados — aprovado

Não foram introduzidos telefone, preço, endereço, coordenada, avaliação ou canal novo.
Os textos da seção “A casa” permanecem compatíveis com o acervo e com os dados já
confirmados. Cardápio, avaliações e canais continuam usando as fontes locais
existentes.

### Documentação e governança — aprovado

A Etapa 61 foi registrada no plano canônico `BEST_PLAN.MD`. O comentário antigo sobre
`version_clean.md` já havia sido respondido: o arquivo se declara consultivo e o
acompanhamento operacional permanece no plano canônico. Não há comentário inline novo
e não resolvido sobre a Etapa 61.

## 3. Validações executadas nesta auditoria

- `npm run check`: lint, 24 testes unitários, build de produção e auditoria contra
  vazamento de conteúdo demonstrativo.
- `npm run test:e2e`: 38 testes Playwright em desktop/mobile, incluindo axe, console,
  overflow, hero, mapa, navegação, avaliações e reduced motion.
- `git diff --check`: nenhum erro de whitespace no patch auditado.
- Inspeção em resolução integral das evidências:
  - `documentacao/qa/etapa-61/grok-adaptacao-mobile.png` (390 × 844, página completa);
  - `documentacao/qa/etapa-61/grok-adaptacao-desktop.png` (1280 × 900, página completa).

## 4. Achados

### Bloqueantes

Nenhum achado bloqueante confirmado.

### Não bloqueantes

| Severidade | Achado | Impacto | Recomendação |
| --- | --- | --- | --- |
| Baixa | Dois vídeos da seção “A casa” podem reproduzir simultaneamente em desktop. | Uso adicional de decoder/CPU somente enquanto ambos estão visíveis. | Medir em dispositivo real antes de alterar; se necessário, reproduzir apenas a mídia mais visível. |
| Baixa | Mudança de `prefers-reduced-motion` durante a sessão não possui listener próprio na seção “A casa”. | A preferência nova pode aguardar outra interseção para pausar o vídeo. | Reutilizar futuramente um hook reativo de preferência de movimento. |
| Baixa | Indicadores do hero mantêm área visual estreita. | Menor conforto de toque, embora teclado, foco e espaçamento estejam presentes. | Ampliar a caixa clicável transparente em lote de refinamento, preservando o traço visual. |
| Ambiente | O host de tiles apresentou erro de certificado durante a captura manual. | As evidências estáticas mostram o fallback, não os tiles renderizados. | Manter monitoramento do provedor; o E2E atual confirmou o mapa real e o fallback é funcional. |

## 5. Decisão

O commit `0d0ba02` está **aprovado para merge**. Os testes de regressão passaram, o
mapa atual foi preservado, não houve importação indevida de arquitetura ou dados e as
ressalvas encontradas são melhorias futuras de baixo risco, não defeitos que impeçam
publicação.

Após o merge, a Etapa 61 deve permanecer como “implementada, aguardando auditoria
independente” somente até este relatório ser incorporado ao histórico; com este
documento, a auditoria independente está concluída e aprovada com as ressalvas acima.
