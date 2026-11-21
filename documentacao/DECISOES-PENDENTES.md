# Decisões confirmadas — Turquia Lanches

Registro canônico de decisões comerciais e arquiteturais alinhadas para a evolução do sistema.

| ID | Pergunta | Resposta confirmada | Responsável | Data / evidência |
|---|---|---|---|---|
| D1 / D1-A | Catálogo inicial e fotos | Inicialmente cadastrar no Supabase o catálogo existente (`src/data/menu.js`). Posteriormente os preços/itens serão ajustados via painel administrativo próprio. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D2 | Opcionais, tamanhos e complementos | Inicialmente manter a base de itens conforme o catálogo atual; suportar modelagem expansível para adicionais no banco. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D3 | Modalidade de atendimento | **Apenas entregas em domicílio** disponíveis no site no MVP. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D4 | Área e cálculo de entrega | **Raio em quilômetros** a partir da loja física (R. Canarinhos, 663 - Parque Nanci, Maricá). | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D5 | Canal de WhatsApp para pedidos | **Sim**, o número oficial já publicado (`+55 21 96469-9374`) receberá o resumo estruturado dos pedidos após a gravação. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D6 | Formas de pagamento | **Na entrega** (Cartão de crédito/débito na maquininha do entregador, Dinheiro com troco, Pix no ato da entrega). Sem gateway online no MVP. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D7 | Janela de pedidos e aceite | O site **aceitará pedidos sempre**, com aviso claro de que a confirmação e o tempo de preparo/entrega serão validados pela loja via WhatsApp. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D8 | Gestão do catálogo e painel admin | Criação do Supabase com os dados iniciais; em seguida implementação de um **painel interno no sistema** para o admin alterar preços/disponibilidade sem acessar diretamente o Supabase. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D9 | Dados obrigatórios do cliente | **Nome**, **Telefone/WhatsApp**, **Endereço completo** (Rua, Número, Bairro, CEP/Referência) e **Ponto de referência**. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |
| D10 | Projeto Supabase e infraestrutura | **Criar um novo projeto Supabase exclusivo** para a Turquia Lanches. | Usuário / Alinhamento | 21/11/2026 (/grill-me) |

## Dados atualmente confirmados

- **Endereço Loja:** R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160
- **Horário Balcão:** Terça a domingo, 17h às 00h (segunda fechado)
- **WhatsApp Oficial:** +55 21 96469-9374
- **Instagram:** @turquialanches
- **Canal de Pedido:** Site (checkout próprio com gravação no Supabase) -> Notificação/Confirmação no WhatsApp Oficial
