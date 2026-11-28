# Aplicar Supabase remoto + Vercel (restaurar catálogo e pedidos)

Documento operacional para o estado em que o cardápio aparece como **indisponível** ou os pedidos retornam 500/`ORDER_REJECTED`.

## Contexto

- Frontend: `useCatalog` prefere Supabase com produtos que tenham `image_url`; se falha, vazio ou sem foto, usa `src/data/menu.js` (provisório).
- Em `main` o fallback em erro de conexão foi corrigido para não deixar a vitrine vazia.
- Pedidos: `POST /api/orders` → RPC `create_order` com `SUPABASE_SERVICE_ROLE_KEY`.
- Projeto Supabase: `turquia-lanches` (ref `sxpsewnfgpkppqivzvcc`, região `sa-east-1`).
- Projeto Vercel: `turquia-marica`.

## 1. Aplicar SQL no Supabase (obrigatório uma vez)

1. Abra [Supabase Dashboard](https://supabase.com/dashboard) → projeto **turquia-lanches**.
2. **SQL Editor** → **New query**.
3. Cole o conteúdo de `supabase/scripts/apply_remote_full.sql`.
4. **Run**.
5. Esperado: *Success* (pode aparecer *No rows returned* — normal para DDL/seed com `ON CONFLICT`).
6. Table Editor: confira `categories`, `products` (9 itens com ids `baca`, `passa`, …), `delivery_zones` (3 zonas).

Prompt útil (Supabase AI / anotações):

```text
Aplicar no remoto o script supabase/scripts/apply_remote_full.sql do repo
Turquia-Marica: schema, RLS de leitura no catálogo, seed alinhado ao menu.js,
zonas, RPC create_order com idempotência e GRANT só para service_role.
Não liberar INSERT público em orders.
```

## 2. Variáveis na Vercel

Dashboard: projeto **turquia-marica** → **Settings** → **Environment Variables**.

| Key | Origem | Targets |
|-----|--------|--------|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | API → `anon` `public` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | API → `service_role` (secreto; **sem** prefixo `VITE_`) | Production, Preview, Development |
| `ADMIN_TOKEN` | Token forte gerado por você (`openssl rand -hex 32`) | Production, Preview, Development |

Após salvar: **Deployments** → último de Production → **Redeploy** (necessário para `VITE_*` entrarem no build).

## 3. Validação

1. Site: https://turquia-marica.vercel.app/ → seção Cardápio com itens (provisório ou remoto).
2. Pedido de teste:

```bash
curl -s -X POST https://turquia-marica.vercel.app/api/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "idempotencyKey": "teste-manual-001",
    "customerName": "Cliente Teste",
    "customerPhone": "21999999999",
    "deliveryAddress": "Rua Teste, 100",
    "deliveryReference": "Portão azul",
    "zoneId": "zone-1",
    "paymentMethod": "pix_delivery",
    "items": [{ "productId": "baca", "quantity": 1, "optionIds": [] }]
  }'
```

Esperado: HTTP **201** com `orderNumber`.  
Se `RPC_NOT_FOUND` / `RPC_PERMISSION_DENIED` / `INVALID_SERVICE_KEY`: reaplicar o SQL e conferir a service role na Vercel.

## 4. Fotos oficiais no catálogo remoto

O frontend só troca o menu local pelo remoto se **algum** produto tiver `image_url` preenchido. Até lá, a vitrine local (com imagens do repo) permanece via fallback.

Preencha `products.image_url` no Table Editor ou via Storage público do Supabase quando as fotos oficiais estiverem prontas.

## Arquivos relacionados

| Arquivo | Uso |
|---------|-----|
| `supabase/scripts/apply_remote_full.sql` | Colar no SQL Editor do remoto |
| `supabase/migrations/20261128120000_align_products_menu_seed.sql` | Migration versionada (CLI local / histórico) |
| `src/hooks/useCatalog.js` | Fallback local em falha/vazio/sem foto |
| `GUIA.md` | Estado e arquitetura |
