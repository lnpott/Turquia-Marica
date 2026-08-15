# Auditoria independente — Lote 4

## Veredito

**APROVADO COM RESSALVAS.** A fundação visual e a recomposição da Home representam avanço real sobre o checkpoint anterior, mas o primeiro resultado do lote não estava pronto para aprovação: o amarelo ocupava toda a primeira dobra, aproximava a página de uma campanha promocional genérica e colocava “fartura de bairro” antes da própria marca. A correção desta auditoria devolveu o fundo acolhedor, reservou o amarelo para acentos e reordenou o Hero para **marca → local → experiência → comida → conversão**.

O lote permanece `EM EXECUÇÃO` até aprovação visual explícita. Nenhum trabalho de Cardápio ou Localização foi iniciado nesta auditoria.

## Objeto e rastreabilidade

- O hash `07900e6` citado no pedido não existe no histórico disponibilizado neste ambiente.
- O conteúdo correspondente está consolidado no commit `ad3b7fd`, cujo diff contra `2e64783` contém as alterações de fundação visual, Home, runtime, auditoria e screenshots.
- Os screenshots versionados foram comparados com a aplicação reconstruída a partir do `HEAD` auditado.
- A auditoria inspecionou os PNGs em resolução integral: 390 × 4.199 px e 1.280 × 2.204 px, além dos registros anteriores de 390 × 4.333 px e 1.280 × 2.206 px.

## Conferência do Summary anterior

| Afirmação | Resultado | Evidência |
|---|---|---|
| Linguagem editorial de alto contraste | Confirmada com ressalva | Grid, bordas, sombras deslocadas e contraste foram implementados; o amarelo inicial era excessivo e foi corrigido. |
| Header, menu mobile, BottomNavBar e Footer refinados | Confirmada | A assinatura nominal, separadores mais firmes e encerramento escuro existem no código e na renderização. |
| Hero completamente recomposto | Confirmada com correção | Hierarquia, fotografia e CTAs mudaram; a auditoria recolocou a marca no título e reduziu o caráter promocional. |
| Informações rápidas integradas | Confirmada | A faixa escura dá continuidade ao Hero e organiza três fatos no mesmo grid. |
| Categorias refinadas | Confirmada com ressalva | O tratamento é coerente e mais intencional, mas permanece dependente de fotografias provisórias e tem alta densidade no mobile. |
| Bloco institucional convertido em encerramento editorial | Confirmada | O bloco vermelho cria fechamento de marca antes do Footer. |
| Screenshots em 390 e 1.280 px | Confirmada | Ambos existem e foram regenerados depois das correções. |
| Lote tecnicamente validado | Confirmada | Check, E2E, audit, rotas e diff-check foram repetidos. |

## Comparação antes × depois

### Melhorias comprovadas

- Header desktop passou a exibir nome e logo, fortalecendo reconhecimento de marca.
- Hierarquia tipográfica do Hero ficou mais clara e memorável.
- CTAs principais ganharam dimensão, contraste e foco visível suficientes.
- A faixa informativa deixou de parecer um banner solto e passou a conectar Hero e conteúdo.
- Cards compartilham acabamento gráfico e melhor separação entre imagem e legenda.
- O bloco institucional e o Footer encerram a página com contraste e ritmo mais definidos.
- A altura total caiu de 4.333 para 4.199 px em 390 px, sem ocultar seções.

### Mudanças neutras

- A inclinação da fotografia aumenta energia, mas continua limitada pela imagem provisória.
- A barra inferior fixa permanece útil e ocupa a fotografia em parte da primeira dobra; é um compromisso conhecido de navegação mobile, não um bloqueio.
- Bordas retas e sombras deslocadas reforçam a linguagem editorial, mas precisam ser calibradas novamente quando fotografias oficiais forem inseridas.

### Regressões encontradas e corrigidas

#### P1 — Hero excessivamente promocional

- **Onde:** fundo amarelo integral do Hero nos screenshots iniciais “after”.
- **Impacto:** aparência de campanha de rede de fast-food, menor acolhimento e competição excessiva com vermelho, preto, grid, fotografia e botões.
- **Correção:** retorno ao fundo quente da marca; amarelo restrito ao selo local, apoio da fotografia, ícones e acentos.

#### P1 — Marca subordinada a uma frase genérica

- **Onde:** título “Fartura de bairro. Sem pose.” e selo “Turquia Lanches · Maricá”.
- **Impacto:** a leitura começava pelo arquétipo “lanchonete de bairro”, contrariando a hierarquia estratégica solicitada.
- **Correção:** título iniciado por “Turquia Lanches”, selo dedicado a Parque Nanci/Maricá e texto de experiência/acolhimento antes da fotografia e dos CTAs.

#### P2 — Estado indisponível concorrendo com conversão

- **Onde:** botão tracejado “iFood em construção” no Header desktop.
- **Impacto:** um canal inativo tinha peso de CTA e disputava atenção com Cardápio e Como chegar.
- **Correção:** convertido em texto secundário “Pedidos em breve”, sem borda ou superfície de botão.

## Problemas remanescentes

### P0

Nenhum.

### P1

Nenhum bloqueio remanescente dentro da Home após as correções.

### P2

- As imagens provisórias ainda limitam a comunicação de ambiente e acolhimento. A estrutura agora reserva essa progressão por texto e composição, mas a comprovação fotográfica pertence à etapa posterior definida pelo usuário.
- Os quatro cards em sequência produzem densidade alta no mobile. É aceitável no lote atual, mas deve ser reavaliado quando existirem categorias e produtos oficiais.
- A BottomNavBar cobre parte da fotografia durante a primeira dobra em 390 px. Os controles permanecem descobertos e o conteúdo é rolável; revisar somente se a aprovação visual considerar a interferência excessiva.

### P3

- Hover com deslocamento e sombras editoriais devem ser comparados com os futuros assets para evitar excesso gráfico.
- O texto institucional é propositalmente curto enquanto as informações oficiais permanecem adiadas.

## UX e funcionamento

- Header navega para Cardápio, Localização e âncora Sobre nós.
- Menu mobile abre, leva foco ao primeiro link, fecha por `Escape` e devolve foco ao botão.
- BottomNavBar navega para as três rotas; “Pedir” permanece desabilitado e não finge ser link.
- Hero oferece Cardápio e Google Maps; iFood indisponível não gera link falso.
- Âncora `#sobre` rola a seção ao topo e recebe foco programático.
- Foco visível, teclado e movimento reduzido continuam ativos.
- Não há overflow horizontal em 320, 390, 768, 1.280 ou 1.440 px.
- Acesso direto e reload retornam HTTP 200 nas três rotas.

## Ressalva para aprovação

“APROVADO COM RESSALVAS” autoriza considerar a correção tecnicamente e visualmente consistente para revisão humana, mas **não conclui o Lote 4**. A aprovação explícita do responsável continua necessária conforme o plano. Até essa decisão, Cardápio, Localização e qualquer lote seguinte permanecem parados.
