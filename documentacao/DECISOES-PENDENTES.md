# Decisões pendentes — Turquia Lanches

Este registro evita que agentes ou desenvolvedores inventem informações comerciais. Preencher com confirmação de pessoa responsável pela loja e registrar fonte/data.

| ID | Pergunta | Resposta confirmada | Responsável | Data / evidência |
|---|---|---|---|---|
| D1 | Qual é o catálogo completo oficial, com nome, categoria, descrição, preço e disponibilidade? | PENDENTE | | |
| D1-A | Quais fotos são oficiais e podem representar cada produto? | PENDENTE | | |
| D2 | Quais produtos têm tamanhos, adicionais, complementos ou escolhas obrigatórias? Qual preço de cada um? | PENDENTE | | |
| D3 | A loja aceita retirada, entrega ou ambas? | PENDENTE | | |
| D4-A | Quais bairros/ruas ou raio fazem parte da área de entrega? | PENDENTE | | |
| D4-B | Qual é a taxa por região? Há pedido mínimo? | PENDENTE | | |
| D4-C | Qual é o prazo informado e como lidar com alta demanda? | PENDENTE | | |
| D5 | O WhatsApp publicado em `src/data/contact.js` é o número oficial que receberá pedidos? | PENDENTE | | |
| D6 | Quais formas de pagamento são aceitas e em qual momento? | PENDENTE | | |
| D7 | O sistema aceita pedidos durante todo o horário publicado? Há horário limite, pausa ou feriados? | PENDENTE | | |
| D8 | Quem atualiza catálogo, preço e disponibilidade? Supabase Dashboard é suficiente no início? | PENDENTE | | |
| D9-A | Quais dados do cliente são realmente necessários para retirada? | PENDENTE | | |
| D9-B | Quais dados são necessários para entrega? | PENDENTE | | |
| D9-C | Qual aviso de privacidade, prazo de retenção e processo de exclusão serão adotados? | PENDENTE | | |
| D10-A | Já existe projeto Supabase exclusivo da Turquia? | PENDENTE | | |
| D10-B | Quais ambientes serão usados (dev, preview, produção)? | PENDENTE | | |
| D10-C | Quem terá acesso administrativo ao projeto e às chaves? | PENDENTE | | |

## Dados atualmente publicados no código

Os dados abaixo foram observados em `src/data/contact.js` na revisão de `main`, em 21/11/2026. A confirmação operacional ainda deve ser feita antes de usar esses dados para aceitar pedidos:

- Endereço: R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160.
- Horário: terça a domingo, 17h às 00h; segunda fechado.
- WhatsApp: https://wa.me/5521964699374.
- Instagram: @turquialanches.
- Telefone convencional: indisponível.

## Regras

1. Não converter PENDENTE em valor presumido.
2. Não usar preço de `src/data/menu.js` como preço oficial sem validação.
3. Guardar evidência: mensagem da pessoa responsável, documento oficial ou fonte pública verificável.
4. Se houver divergência entre fontes, registrar ambas e solicitar decisão.
5. Só desbloquear a fase correspondente quando os dados essenciais estiverem confirmados.
