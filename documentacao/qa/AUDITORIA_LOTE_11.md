# Auditoria — Lote 11: consistência Home ↔ Cardápio

## Veredito

**APROVADO COM RESSALVAS.** A página de Cardápio agora reutiliza a linguagem visual de `MenuHighlights` já adotada na Home: fotografias ilustrativas, borda firme, sombra deslocada, selo explícito e estado comercial honesto. O catálogo textual paralelo foi eliminado sem remover as âncoras históricas das categorias.

## Escopo conferido

- `/cardapio/` usa `MenuHighlights` com todas as cinco categorias.
- O modo completo adapta eyebrow, título e descrição ao contexto de estrutura prevista.
- A Home mantém o modo compacto e o CTA para abrir o Cardápio.
- `#categorias` continua sendo o destino do CTA do Hero.
- `#categoria-combos`, `#categoria-lanches`, `#categoria-porcoes`, `#categoria-bebidas` e `#categoria-sobremesas` continuam aceitando acesso direto, reload e foco programático.
- `MenuCatalog.jsx` foi removido após busca confirmar que não havia outro consumidor.

## Evidência visual

- `cardapio-lote-11-mobile.png`: captura integral em 390 px, com conteúdo de 3.834 px de altura.
- `cardapio-lote-11-desktop.png`: captura integral em 1.280 px, com conteúdo de 2.269 px de altura.
- Em desktop, a grade 3 + 2 preserva hierarquia e leitura consistente com a Home.
- Em mobile, os cinco cards permanecem legíveis, sem overflow horizontal, e deixam claro que imagens e conteúdo são provisórios.

## Auditoria funcional e de conteúdo

- Nenhum preço, produto ou canal de pedido foi inventado.
- As cinco categorias exibem “Não disponível / em construção”.
- O iFood indisponível continua sem link.
- A lista possui nome acessível “Categorias previstas”.
- Os cards históricos continuam focáveis apenas por navegação programática, com estilo de foco visível.
- Testes unitários foram atualizados para verificar a lista visual, e o E2E passou a exigir cinco imagens dentro de `#categorias`.

## Ressalvas e separação de escopo

### Lote 12

A BottomNavBar fixa ainda cobre parte da fotografia do Hero na captura móvel. O problema já está descrito no Lote 12 e não foi mascarado por uma correção lateral neste lote.

### Lotes 14 e 15

As fotografias continuam provisórias. A imagem de Bebidas é semanticamente fraca e algumas imagens se repetem entre Hero e categorias; a correção depende do acervo e permanece no Lote 15, sem introdução de banco de imagens não aprovado.

### Densidade móvel

A página cresceu porque passou de uma lista textual para cinco cards fotográficos. A extensão é coerente com o objetivo de consistência visual, mas deve ser reavaliada quando houver produtos e fotografias oficiais. Não há categoria interativa vazia nem conteúdo fictício para justificar controles adicionais.

## Conclusão

O objetivo específico do Lote 11 foi atendido sem reabrir Hero, Header, Footer, Localização ou dados comerciais. As ressalvas encontradas já possuem lotes próprios e não bloqueiam a aprovação deste lote. O próximo passo recomendado continua sendo o Lote 12, somente após autorização explícita.
