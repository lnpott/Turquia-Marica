# Operação do catálogo e pedidos

Documento de processo (Fase 7). Não substitui o aceite presencial da loja.

## Responsabilidades

| Papel | O que faz |
|---|---|
| Dono/operador da loja | Confirma pedido no WhatsApp, prepara, entrega, recebe pagamento |
| Responsável técnico | Aplica migrations, guarda `SUPABASE_SERVICE_ROLE_KEY` e `ADMIN_TOKEN` só no servidor |
| Painel `/admin` | Lista pedidos e produtos; altera `price_cents` e status com Bearer = `ADMIN_TOKEN` |

## Acesso

1. Definir `ADMIN_TOKEN` nas variáveis de ambiente da Vercel (Production, Preview, Development). **Nunca** prefixar com `VITE_`.
2. O valor deve ser longo e aleatório. Não reutilizar a service role nem a anon key.
3. Abrir `/admin` (URL não está no menu público).
4. Informar o mesmo valor de `ADMIN_TOKEN`. O front envia `Authorization: Bearer …`; a API compara com `process.env.ADMIN_TOKEN` (comparação em tempo constante). Token errado → 401.
5. A **service role** só é usada no servidor depois dessa validação. O Bearer do cliente **nunca** é a chave Supabase.
6. Alternativa segura: Supabase Dashboard com usuário restrito, sem service role no laptop do balcão.

## Fluxo de pedido

1. Cliente grava pedido → status inicial `pending`.
2. Cliente pode abrir o WhatsApp com resumo; isso **não** muda o status.
3. Operador confirma pelo WhatsApp e, se usar o painel, atualiza o status (`confirmed`, `preparing`, `dispatched`, `delivered`, `cancelled`).
4. Pagamento é na entrega (cartão, dinheiro ou Pix no ato). O sistema não registra pagamento online.

## Catálogo

- Preços oficiais vivem em `products.price_cents` no Supabase.
- O seed inicial de R$ 29,90 **não** é cardápio comercial até a loja publicar valores reais.
- Preferir alterar preço pelo `/admin` ou Dashboard, não reeditando `menu.js` no Git.

## Contingência

- Se `create_order` não estiver aplicada no projeto remoto, `POST /api/orders` falha e nenhum pedido é gravado.
- Se o WhatsApp não abrir, o pedido permanece no banco e deve ser consultado no painel/Dashboard.
- Se `/api/admin` retornar `FETCH_FAILED` com mensagem de tabela/relação, conferir migrations no projeto Supabase ligado à produção.
