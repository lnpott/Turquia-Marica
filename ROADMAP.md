# ROADMAP — cardápio, pedido e entrega

> Plano do que o produto **vai ser**. Não descreve o código de hoje.
> O presente está em [GUIA.md](GUIA.md).
> Data: 21/11/2026.

A decisão antiga ("o site não é e-commerce") está revogada como direção de produto. O código ainda é vitrine até as fases abaixo entrarem.

Honestidade continua: endereço, horário, telefone, preço, taxa, raio e pagamento só entram se um humano confirmar. Dado ausente fica ausente.

## Produto alvo

No celular, dentro do horário, a pessoa:

1. vê o cardápio oficial;
2. escolhe quantidade e opcionais reais, se existirem;
3. monta a sacola;
4. escolhe entrega ou retirada;
5. se entrega, informa endereço dentro da área e vê a taxa real, ou a recusa se estiver fora;
6. vê o total;
7. envia um pedido que a casa consegue executar;
8. vê confirmação com número e resumo, sem tela de "pago" se não houve pagamento.

Fora da primeira versão: login, app nativo, iFood, fidelidade, cartão no site sem gateway contratado, estoque, rastreio de motoboy, redesign de hero ou mapa.

## Decisões que bloqueiam código

Sem resposta, a fase não começa. Não chutar.

| ID | Decisão | Bloqueia | Enquanto não houver resposta |
|----|---------|----------|------------------------------|
| D1 | Lista oficial: nome, categoria, preço, foto, disponível | Fase 1 | Não publicar item comprável. Os nove atuais continuam vitrine |
| D2 | Opcionais e o preço de cada um | Fase 2 | Só quantidade |
| D3 | Entrega, retirada ou as duas | Fase 4 | Não desenhar as duas por precaução |
| D4 | Raio ou bairros, taxa, pedido mínimo, tempo | Fase 4 | Entrega desligada. Sem número inventado |
| D5 | Quem recebe o pedido: WhatsApp atual, outro número, ou painel | Fase 5 | WhatsApp já publicado, mensagem pronta, sem backend |
| D6 | Pagamento: na entrega/retirada, Pix manual, ou gateway | Fase 5 | Só pagar na entrega ou na retirada, texto confirmado |
| D7 | Horário em que o site aceita pedido | Fase 4 | Horário já em `contact.js`. Fora dele, cardápio visível e pedido fechado |
| D8 | Quem edita o cardápio: Git ou painel | Fase 7 | Git. Sem admin no MVP |

## Arquitetura alvo

Manter React, Vite, Tailwind e Vercel. Sem banco até a fase 6.

Rotas quando a fase autorizar: `/cardapio` deixa de ser só redirect; `/produto/:id` se houver detalhe; `/sacola`; `/pedido`; `/pedido/confirmado`.

Carrinho no browser (`Context` + `localStorage`). Preço em centavos, cálculo num único módulo. Componente não soma por conta própria.

MVP (D5 = WhatsApp): a confirmação abre `wa.me` com mensagem estruturada. A tela diz que a casa ainda precisa confirmar. Não dizer "pedido aceito".

Fase 6: `POST` no servidor valida preço, horário e área. Segredo só no painel da Vercel, nunca com prefixo `VITE_`.

Não reintroduzir iFood. Não vender com imagem ilustrativa (`documentacao/ASSETS.md`). Não deixar taxa "a calcular" em produção.

## Fases

Uma fase por PR. Não misturar com mapa, hero ou limpeza de asset.

Pronto, em fase que mexe em UI ou dado: `npm run check`, E2E do fluxo, 390 px e 1280 px sem overflow, `audit:demo-leak` sem vazar demo.

| Fase | Entrega | Trava |
|------|---------|-------|
| 0 | Este arquivo no repositório; GUIA só no presente | — |
| 1 | Cardápio vendável, `priceCents`, item indisponível some | D1 |
| 2 | Quantidade; opcional só com D2 | D2 se houver opcional |
| 3 | Sacola persistida, subtotal único | — |
| 4 | Entrega ou retirada, taxa da tabela, fora da área não conclui | D3, D4, D7 |
| 5 | Fechar pedido. WhatsApp no MVP | D5, D6 |
| 6 | Pedido no servidor | Só se o WhatsApp não bastar |
| 7 | Admin do cardápio | Só se D8 pedir |

Fases 2 e 3 podem usar cardápio de teste fora do build público (`menu.demo.js` + `audit:demo-leak`). Fase 4 não vai a produção sem D4.

Higiene de asset (o que era `limpeza.MD`, agora em `documentacao/historico/limpeza.MD`) é PR separado, nunca no meio de uma fase de pedido.

## Status em 21/11/2026

| Item | Estado |
|------|--------|
| Fase 0 | Este arquivo entra neste PR de documentação |
| Fases 1–7 | Não iniciadas |
| D1–D8 | Em aberto |

## Como executar

1. Ler `AGENTS.md`, `GUIA.md` e este arquivo.
2. Confirmar branch. A vitrine sem iFood está em `feat/sem-ifood`; `main` pode estar atrás.
3. Uma fase. Se D1–D8 não estiver escrito aqui, parar e perguntar.
4. Menor diff. Não editar hero, mapa nem avaliações nessa fase.
5. `npm run check` e E2E do fluxo.
6. Atualizar a tabela de status neste arquivo.
7. Parar.
