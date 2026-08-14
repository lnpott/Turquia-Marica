# Auditoria independente — Lote 5 Cardápio

## Veredito

**APROVADO COM RESSALVAS.** Não há P0 ou P1 após as correções. A primeira implementação era visualmente consistente e tecnicamente válida, porém oferecia pouca utilidade proporcional ao esforço: cinco atalhos levavam a cinco cards que repetiam a mesma indisponibilidade sem apresentar conteúdo distinto. Isso criava uma simulação de catálogo e alongava a página mobile para aproximadamente 3.151 px.

A auditoria condensou a estrutura em uma lista honesta de categorias previstas, removeu atalhos redundantes e fotografias repetidas, preservou os hashes existentes para acesso direto e reformulou a mensagem do Hero para não sugerir escolha de itens inexistentes. A Home não recebeu ajustes e a Localização não foi alterada.

## Rastreabilidade

- Commit auditado: `c1af644` — `feat(design): refine menu discovery experience`.
- Base do diff: `54fc4f8`.
- O diff original possui oito arquivos: plano, relatório, dois screenshots, `MenuCatalog`, página Menu e dois arquivos de teste.
- A auditoria confirmou que o commit não altera arquivos da Home nem da Localização.
- Correções da auditoria estão em commit posterior específico e limitadas a Cardápio, testes, documentação e screenshots do Cardápio.

## Conferência do Summary

| Afirmação | Resultado |
|---|---|
| Lote 4 registrado como concluído | Confirmada. |
| Hero e catálogo orientados à descoberta mobile-first | Parcialmente confirmada: a direção existia, mas os atalhos e cards repetitivos excediam a utilidade real. |
| Filtros vazios removidos | Confirmada. |
| Atalhos acessíveis por teclado e hash | Confirmada tecnicamente, mas refutada como escolha de UX: os destinos não ofereciam conteúdo distinto. |
| Ausência de produto, preço e iFood falso | Confirmada. |
| Screenshots em 390 e 1.280 px | Confirmada e regenerada após correções. |
| Localização não iniciada | Confirmada. |

## Decisões de produto

- O catálogo continua sem produtos, preços e URL oficial de pedido; nenhum deles foi inventado.
- Filtros não são renderizados porque hoje produziriam resultados vazios.
- Categorias provisórias são apresentadas como uma lista condensada de estrutura prevista, com estado explícito de confirmação.
- O CTA principal leva à lista de categorias. O iFood permanece texto desabilitado e não cria link falso.
- A arquitetura reserva espaço para produto, descrição e preço futuros sem transformar a página atual em e-commerce.

## Mudanças visuais e de UX

- Hero compacto e de alto contraste, coerente com a fundação visual aprovada.
- Mensagem honesta: “Veja o que está previsto. Sem promessa vazia.”
- CTA “Ver categorias previstas” acima da dobra.
- Fotografia do Hero claramente marcada como ilustrativa.
- Lista condensada de cinco categorias previstas, sem atalhos redundantes ou filtros vazios.
- Hashes das categorias foram preservados para URLs existentes; acesso direto e reload transferem foco ao destino.
- Avisos foram consolidados em um estado breve por categoria e um aviso geral.

## Comparação com o checkpoint anterior

### Melhorias comprovadas

- A página mobile deixou de usar uma sequência de grandes cards fotográficos e ficou substancialmente mais curta.
- Categorias são identificáveis em uma lista curta e numerada, sem exigir navegação redundante.
- Hero, estrutura, Header e Footer compartilham contraste, bordas e tipografia.
- O estado provisório é a informação central e não fica escondido sob linguagem de compra.
- Filtros vazios e atalhos sem conteúdo distinto foram removidos.

### Ressalvas

- As categorias ainda são provisórias e não equivalem a produtos disponíveis.
- A fotografia do Hero e seu enquadramento serão reavaliados somente com o acervo oficial.
- Preço e CTA real de pedido permanecem ausentes por falta de dados externos; a interface não simula conversão indisponível.

## Validação visual

- `documentacao/qa/cardapio-mobile-390.png`: referência anterior.
- `documentacao/qa/cardapio-mobile-after.png`: resultado em 390 px.
- `documentacao/qa/cardapio-desktop-after.png`: resultado em 1.280 px.
- Viewports adicionais inspecionados: 320, 768 e 1.440 px.
- A implementação inicialmente auditada media aproximadamente 3.151 px em 390 px; a repetição não se justificava e foi condensada.
- A versão final mede 2.670 px em 390 px e 1.833 px em 1.280 px.
- Não há overflow em 320, 390, 640, 768, 1.280 ou 1.440 px.

## Validação funcional

- Acesso direto e reload de `/cardapio` e `/cardapio/`: HTTP 200.
- O CTA para a lista funciona por mouse e teclado sem depender de animação.
- URLs diretas com os cinco hashes e reload mantêm HTTP 200 e transferem foco ao destino.
- Não existe grupo de filtros vazio nem atalhos redundantes.
- Não existe link para iFood enquanto o canal estiver indisponível.
- Foco visível permanece ativo.
- `prefers-reduced-motion: reduce` desativa a animação de página.
- Sem overflow horizontal em 320, 390, 768, 1.280 e 1.440 px.
- Reflow equivalente a 200% em desktop foi conferido no layout de 640 CSS px.
- Nenhum erro de console foi observado durante a inspeção manual.
- O CTA possui alvo de 48 px, foco visível, atualiza `#categorias` e o botão Voltar restaura a URL anterior.
- Os cinco hashes diretos posicionam e focam a categoria abaixo do Header tanto no primeiro acesso quanto após reload.
- Header, menu mobile, `Escape`, retorno de foco, BottomNavBar e Footer foram verificados dentro da rota.
- A hierarquia contém um `h1`, um `h2` e cinco `h3`, em ordem compreensível.
- Home e Localização retornam HTTP 200 e passaram novamente pelo E2E/axe, sem redesenho.

## Fora do lote

- Localização;
- fotografias oficiais;
- produtos, ingredientes e preços;
- ativação do iFood;
- filtros reais, que somente entram quando houver produtos aprovados em mais de uma categoria.

## Classificação de problemas

- **P0:** nenhum.
- **P1:** nenhum após correção.
- **P2 corrigido:** atalhos redundantes e cinco cards quase idênticos simulavam profundidade de catálogo sem conteúdo real.
- **P2 corrigido:** “Escolha rápido. Encontre sem confusão.” sugeria capacidade de escolha maior que a existente.
- **P3:** a lista de categorias só ganhará utilidade comercial quando os produtos oficiais entrarem; hoje sua utilidade é exclusivamente informar a estrutura prevista.
- **P3:** o aviso geral repete o estado resumido da lista, mas fornece a explicação editorial necessária e não alonga desproporcionalmente a página.

## Utilidade e proporcionalidade

Os cinco cards originais não ensinavam algo diferente além do nome da categoria e repetiam o mesmo status. Portanto, os 3.151 px mobile não eram proporcionais ao conteúdo. A versão corrigida assume explicitamente que são categorias **previstas**, remove imagens repetidas e apresenta todos os nomes em uma lista curta. Sua utilidade real é limitada, mas legítima: informar a futura organização sem simular ofertas.

## Próxima ação

O lote pode ser considerado concluído com as ressalvas de conteúdo oficial registradas. Parar após commit e não iniciar Localização automaticamente.
