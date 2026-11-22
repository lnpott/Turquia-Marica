# Operação do catálogo e pedidos

Documento de processo (Fase 7). Não substitui o aceite presencial da loja.

## Responsabilidades

| Papel | O que faz |
|---|---|
| Dono/operador da loja | Confirma pedido no WhatsApp, prepara, entrega, recebe pagamento |
| Responsável técnico | Aplica migrations, guarda `SUPABASE_SERVICE_ROLE_KEY` e `ADMIN_TOKEN` só no servidor |
| Painel `/admin` | Lista pedidos e produtos; altera `price_cents` e status com Bearer token |

## Acesso

1. Definir `ADMIN_TOKEN` nas variáveis de ambiente da Vercel (server-side). Nunca prefixar com `VITE_`.
2. Abrir `/admin` (URL não está no menu público).
3. Informar o token. O navegador guarda em `localStorage` só para reuso da sessão; a API valida o Bearer no servidor.
4. Alternativa segura: Supabase Dashboard com usuário restrito, sem service role no laptop do balcão.

## Fluxo de pedido

1. Cliente grava pedido → status inicial `pending` / `pending_confirmation`.
2. Cliente pode abrir o WhatsApp com resumo; isso **não** muda o status.
3. Operador confirma pelo WhatsApp e, se usar o painel, atualiza o status (`confirmed`, `preparing`, `out_for_delivery`, `completed`, `cancelled`, `rejected`).
4. Pagamento é na entrega (cartão, dinheiro ou Pix no ato). O sistema não registra pagamento online.

## Catálogo

- Preços oficiais vivem em `menu_items.price_cents` no Supabase.
- O seed inicial de R$ 29,90 **não** é cardápio comercial até a loja publicar valores reais.
- Preferir alterar preço pelo `/admin` ou Dashboard, não reeditando `menu.js` no Git.

## Contingência

- Se `create_order` não estiver aplicada no projeto remoto, `POST /api/orders` falha e nenhum pedido é gravado.
- Se o WhatsApp não abrir, o pedido permanece no banco e deve ser consultado no painel/Dashboard.
- Em falha de catálogo (rede/Supabase), a UI não inventa preço de demonstração.
