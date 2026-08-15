# Auditoria — Lotes 16 e 17

## Veredito

**APROVADO.** A imagem social foi atualizada depois da estabilização dos lotes visuais, e a tagline vigente na `BEST_ONE` recebeu a confirmação explícita exigida. O Lote 14 continua bloqueado e não recebeu conteúdo presumido.

## Lote 16 — Imagem Open Graph

### Geração

- Fonte: Home reconstruída a partir do código vigente.
- Viewport: 1.200×630 px, proporção padrão de compartilhamento social.
- Saída: `public/og-image.png`, PNG de 1.200×630 px.
- Estado capturado: Header, assinatura Parque Nanci/Maricá, marca, tagline, texto institucional e fotografia ilustrativa do Hero.

### Conferência visual

- A marca e a tagline permanecem legíveis na metade esquerda.
- A fotografia ocupa a metade direita sem encobrir o texto.
- O enquadramento representa a Home atual, incluindo grid editorial, vermelho, amarelo, preto e fundo quente.
- A captura não inclui estados inventados de preço, promoção, horário ou pedido.

### Conferência técnica

- `/og-image.png` responde HTTP 200 com `Content-Type: image/png`.
- O cabeçalho IHDR do PNG informa exatamente 1.200×630 px.
- `og:image` e `twitter:image` continuam apontando para `https://turquia-marica.vercel.app/og-image.png`.

**Resultado:** APROVADO. A imagem social corresponde ao estado visual estabilizado da Home.

## Lote 17 — Tagline

### Decisão registrada

O responsável confirmou explicitamente que o texto correto é o já adotado na `BEST_ONE`: **“Turquia Lanches. Fartura sem pose.”** A alternativa “Fome de Leão? Lanche Especial.” não será trazida da `main`.

### Implementação

- O Hero já continha a copy aprovada, portanto nenhuma alteração de JSX foi necessária.
- A decisão foi registrada no estado do lote e no Changelog de `BEST_PLAN.MD`.
- A imagem Open Graph regenerada no Lote 16 também registra visualmente a tagline aprovada.

**Resultado:** APROVADO. A tagline deixa de ser provisória e passa a ser a direção de copy confirmada para esta implantação.

## Correção complementar da auditoria anterior

Um comentário de revisão identificou que o teste do Lote 12 cobria diferentes larguras somente com altura de 844 px. A correção desta execução:

- adiciona 375×667 e 390×740 à matriz, mantendo 414×844;
- aplica compensação baseada em `100vh` ao Hero do Cardápio e ao CTA do mapa em viewports móveis baixas;
- verifica interseção completa entre retângulos, aceitando conteúdo antes ou depois da barra, mas nunca sob ela.
- registra as capturas de viewport `cardapio-lote-12-375x667.png` e `localizacao-lote-12-375x667.png` como evidência da altura curta.

## Testes obrigatórios

- `npm run check`.
- `npm run test:e2e`.
- `npm audit --audit-level=high`.
- `git diff --check`.

## Pendência preservada

O Lote 14 permanece bloqueado por dados comerciais e fotografias oficiais. A conclusão dos Lotes 16 e 17 não altera esse estado.
