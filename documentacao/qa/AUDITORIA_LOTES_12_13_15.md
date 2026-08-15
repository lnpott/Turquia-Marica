# Auditoria consolidada — Lotes 12, 13 e 15

## Veredito

**APROVADO COM RESSALVAS EXTERNAS.** Os três lotes autorizados atendem aos respectivos critérios de aceite. Nenhuma pendência encontrada exige alteração nos Lotes 16 ou 17, que permanecem não iniciados.

## Lote 12 — BottomNavBar em mobile

### Implementação conferida

- O Hero do Cardápio usa enquadramento móvel `11/5`, volta a `4/3` no desktop e reduz o intervalo anterior à fotografia somente no mobile.
- A ação “Conferir ficha” do mapa passou de `bottom-40` para `bottom-44` no mobile, sem mudança no desktop.
- A lógica, os itens e o `z-index` da própria BottomNavBar não foram alterados.

### Validação

- Um teste E2E mede as caixas reais do Hero, da ação do mapa e da navegação inferior em 375×667, 390×740 e 414×844 px.
- Em todos os três viewports, inclusive nas duas alturas curtas, os retângulos do Hero e da ação não intersectam o retângulo da navegação. A compensação CSS responde à altura disponível em vez de assumir apenas 844 px.
- As capturas integrais `cardapio-lote-12-15-mobile.png` e `localizacao-lote-12-mobile.png`, ambas em 390 px, confirmam visualmente o afastamento.

**Resultado:** APROVADO. Nenhuma foto do Hero do Cardápio ou CTA do mapa fica parcialmente coberto nos viewports exigidos.

## Lote 13 — Consistência global

### Componentes auditados

- `Header.jsx`: marca, navegação, estado de pedidos e menu móvel preservam hierarquia, contraste, foco e comportamento por `Escape`.
- `Footer.jsx`: mantém encerramento escuro, navegação equivalente e separação honesta entre canais disponíveis e iFood indisponível.
- `BottomNavBar.jsx`: os quatro estados permanecem consistentes; “Pedir” continua desabilitado sem link falso.
- `Location.jsx`, `ContactCard.jsx` e `MapEmbed.jsx`: compartilham tipografia, bordas, sombras, acentos e linguagem factual das demais rotas.

### Achados

- Não foi encontrada inconsistência visual ou funcional P0/P1 adicional.
- A distância móvel do CTA do mapa era o único ajuste objetivo e foi resolvida no Lote 12.
- Axe não encontrou violações sérias ou críticas nas três rotas, e não houve overflow nos viewports de aceite.

**Resultado:** APROVADO. O lote cumpre seu caráter de auditoria; não foi necessário redesenhar Header, Footer ou Localização.

## Lote 15 — Precisão semântica

### Inventário conferido

O acervo local contém fotografias adequadas para Combos, Lanches, Porções e Sobremesas, mas nenhuma fotografia de produto adequada para Bebidas. A imagem anterior mostrava pessoas brindando, comunicando ambiente/confraternização em vez da categoria em si.

### Correção

- Bebidas deixou de importar e renderizar `hero-gallery`.
- O card mantém sua posição e acabamento, mas usa um placeholder editorial com ícone neutro e o texto “Imagem pendente de acervo”.
- Nenhuma imagem externa, produto ou informação comercial foi adicionada.
- Porções ainda repete a fotografia do Hero da Home, porém a associação com batatas é semanticamente correta; a substituição permanece dependente do Lote 14.

**Resultado:** APROVADO COM RESSALVA EXTERNA. Todas as categorias agora têm fotografia compatível ou pendência de acervo explícita.

## Evidências e testes

- `npm run check`: lint, quatro testes unitários e build aprovados.
- `npm run test:e2e`: suíte desktop/mobile, incluindo medições em 375–414 px, aprovada.
- `npm audit --audit-level=high`: zero vulnerabilidades.
- `git diff --check`: aprovado.
- Screenshots: `cardapio-lote-12-15-mobile.png`, `localizacao-lote-12-mobile.png` e `cardapio-lote-15-desktop.png`.

## Pendências externas

O Lote 14 permanece **BLOQUEADO/PENDENTE** até o cliente fornecer URL oficial do iFood, telefone/WhatsApp, endereço completo/CEP, horários, produtos/preços aprovados e fotografias oficiais. Nenhum desses dados foi inferido nesta execução.

## Próximos lotes

Os Lotes 16 e 17 não foram tocados nem iniciados. Esta auditoria não autoriza execução automática posterior.
