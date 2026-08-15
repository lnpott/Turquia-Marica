# Auditoria final — Lotes 18 a 25 e reverificação do Lote 14

**Data:** 14/08/2026  
**Veredito do bloco 18–25:** **APROVADO COM OBSERVAÇÃO DE TBT**  
**Veredito do Lote 14:** **BLOQUEADO — PENDENTE DE INSUMOS OFICIAIS**

## Escopo auditado

A auditoria cobre a fundação de motion, CTAs, zoom de categorias, scroll reveal, movimento ambiente do Hero, navegação ativa, performance, acessibilidade e imagem Open Graph. Também reverifica os dados e o acervo do Lote 14 contra o estado atual do repositório. Os Lotes 18, 19, 20 e 23 permanecem conforme a auditoria anterior; esta entrega conclui 21, 22, 24 e 25.

## Lote 21 — scroll reveal

### Mudança visual

- Seções abaixo do Hero entram com fade e deslocamento vertical de 24 px.
- Cards de categoria entram em cascata, com intervalo de 70 ms.
- A entrada ocorre uma única vez e não altera a posição final nem o fluxo da página.

### Mudança técnica

- `Reveal.jsx` usa `IntersectionObserver` nativo, sem biblioteca adicional.
- O observer deixa de observar o elemento após a primeira interseção e é desconectado no cleanup.
- Ausência de `IntersectionObserver` produz conteúdo visível por fallback.
- Com `prefers-reduced-motion: reduce`, o estado já nasce revelado e as transições são removidas.

## Lote 22 — movimento ambiente do Hero

### Decisão aplicada

Foi aplicada a direção **A — Ken Burns lento**, autorizada pelo comando do responsável para executar o lote. Essa direção já possuía uma fundação CSS local, mas não estava ligada à imagem renderizada.

### Mudança visual

- A fotografia do Hero oscila lentamente entre escala 1 e 1,02 em 12 segundos, alternando a direção.
- Não há carrossel, troca de fotografia, parallax dependente de scroll ou alteração do logo.

### Mudança técnica

- O efeito é CSS puro, sem listener, timer JavaScript ou trabalho contínuo na main thread.
- A imagem continua sendo o recurso LCP com `fetchPriority="high"`.
- Movimento reduzido desativa completamente a animação.

## Lote 24 — performance e acessibilidade

### Lighthouse mobile

| Rota | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 97 | 100 | 100 | 100 | 2,31 s | 0 | 94 ms |
| Cardápio | 97 | 100 | 100 | 100 | 2,34 s | 0 | 53 ms |
| Localização | 96 | 100 | 100 | 100 | 1,91 s | 0 | 184 ms |

A baseline registrada para Cardápio era Performance 96, Acessibilidade 100, Boas Práticas 100, SEO 100, LCP 2,5 s, CLS 0 e TBT 30 ms. O Cardápio melhorou Performance para 97 e LCP para 2,34 s; CLS e demais categorias foram preservados. O TBT variou para 53 ms no Cardápio e foi maior na Localização, mas permaneceu baixo em valor absoluto, sem perda de pontuação e sem Long Task criada pelo motion. Essa variabilidade é registrada como observação não bloqueante, não ocultada como “melhoria”. Dados exatos: `RESUMO_LIGHTHOUSE_LOTE_24.json`.

### Acessibilidade e regressão

- Axe: nenhuma violação crítica ou séria nas três rotas.
- `prefers-reduced-motion`: page transition, Ken Burns, preenchimento, sublinhado, reveal e cascata são eliminados ou apresentados diretamente.
- Teclado: foco visível, Escape e devolução do foco do menu mobile preservados.
- Layout: nenhum overflow horizontal nos viewports de 320, 390, 768, 1280 e 1440 px.
- Navegação inferior: Hero e ação do mapa continuam sem interseção nos viewports móveis baixos de aceite.

## Lote 25 — imagem Open Graph

- `public/og-image.png` foi regenerada em 1.200 × 630 a partir da Home final.
- A captura usou movimento reduzido para obter um frame determinístico.
- Logo, tagline, direção visual e fotografia ilustrativa continuam fiéis à Home.
- O E2E preserva a verificação de HTTP 200, MIME PNG, dimensões e referências Open Graph/Twitter.

## Lote 14 — reverificação do estado atual

A reverificação foi executada, mas o lote não pode ser implementado comercialmente sem inventar informações:

- `BUSINESS_INFO.hours.value` e `phone.value` continuam `null` e indisponíveis.
- iFood e WhatsApp continuam com URL `null` e estado indisponível.
- Localização permanece parcial: “Parque Nanci, Maricá/RJ”, sem logradouro, número ou CEP confirmado.
- `products` continua vazio; não há nomes, ingredientes, preços ou badges aprovados.
- O acervo permanece explicitamente provisório; Bebidas continua com placeholder neutro.
- Instagram e a ficha do Maps são os únicos canais disponíveis já registrados, mas não suprem os dados comerciais pendentes.

**Resultado correto:** a auditoria de prontidão do Lote 14 foi concluída, os guardrails atuais foram confirmados e nenhum dado foi inventado. O lote permanece **BLOQUEADO — PENDENTE** até o cliente fornecer os insumos oficiais. “Fazer” o Lote 14 sem esses insumos violaria a regra expressa do planejamento.

## Evidências visuais

- `home-mobile-lotes-21-25.png`
- `home-desktop-lotes-21-25.png`
- `cardapio-mobile-lotes-21-25.png`
- `localizacao-desktop-lotes-21-25.png`
- `public/og-image.png`

## Resultado final

**Lotes 18–25 aprovados com observação não bloqueante de TBT. Lote 14 reverificado e corretamente mantido bloqueado.** Não há regressão P0/P1, biblioteca de animação nova, dado comercial inventado ou alteração do logo.
