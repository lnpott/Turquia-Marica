# Aplicar RPC create_order no Supabase de produção

> Projeto: `turquia-lanches` · ref `sxpsewnfgpkppqivzvcc` · região `sa-east-1`
> Código no Git (main): migrations `20261122214600_create_order_rpc.sql` + `20261123024500_create_order_grants.sql` (via #52).
>
> **Não há conector automático neste fluxo.** Cole o SQL abaixo no **SQL Editor** do Supabase Dashboard e execute uma vez.

## 1. Script completo (idempotente)

Rode **tudo de uma vez** no SQL Editor de produção:

```sql
-- === create_order + idempotency (de 20261122214600_create_order_rpc.sql) ===

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS orders_idempotency_key_uidx
  ON public.orders (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

CREATE OR REPLACE FUNCTION public.create_order(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_key text;
  v_existing public.orders%ROWTYPE;
  v_zone public.delivery_zones%ROWTYPE;
  v_item jsonb;
  v_product public.products%ROWTYPE;
  v_option public.product_options%ROWTYPE;
  v_qty int;
  v_option_ids jsonb;
  v_option_id text;
  v_option_sum int;
  v_line int;
  v_subtotal int := 0;
  v_snapshots jsonb := '[]'::jsonb;
  v_order public.orders%ROWTYPE;
  v_name text;
  v_phone text;
  v_address text;
  v_reference text;
  v_payment text;
  v_items jsonb;
BEGIN
  v_key := nullif(trim(payload->>'idempotencyKey'), '');
  IF v_key IS NULL OR length(v_key) < 8 OR length(v_key) > 80 THEN
    RAISE EXCEPTION 'INVALID_IDEMPOTENCY_KEY' USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_existing FROM public.orders WHERE idempotency_key = v_key;
  IF FOUND THEN
    RETURN jsonb_build_object(
      'replay', true,
      'orderId', v_existing.id,
      'orderNumber', v_existing.order_number,
      'subtotalCents', v_existing.subtotal_cents,
      'deliveryFeeCents', v_existing.delivery_fee_cents,
      'totalCents', v_existing.total_cents,
      'createdAt', v_existing.created_at,
      'items', (
        SELECT COALESCE(jsonb_agg(jsonb_build_object(
          'product_id', product_id,
          'product_name', product_name,
          'unit_price_cents', unit_price_cents,
          'quantity', quantity,
          'total_price_cents', total_price_cents
        )), '[]'::jsonb)
        FROM public.order_items
        WHERE order_id = v_existing.id
      )
    );
  END IF;

  v_name := trim(payload->>'customerName');
  v_phone := trim(payload->>'customerPhone');
  v_address := trim(payload->>'deliveryAddress');
  v_reference := trim(payload->>'deliveryReference');
  v_payment := payload->>'paymentMethod';
  v_items := payload->'items';

  IF v_name IS NULL OR length(v_name) < 2 OR length(v_name) > 120
     OR v_phone IS NULL OR length(v_phone) < 8 OR length(v_phone) > 20
     OR v_address IS NULL OR length(v_address) < 5 OR length(v_address) > 240
     OR v_reference IS NULL OR length(v_reference) < 2 OR length(v_reference) > 160 THEN
    RAISE EXCEPTION 'MISSING_CUSTOMER_FIELDS' USING ERRCODE = '22023';
  END IF;

  IF v_payment NOT IN ('card_delivery', 'cash_delivery', 'pix_delivery') THEN
    RAISE EXCEPTION 'INVALID_PAYMENT_METHOD' USING ERRCODE = '22023';
  END IF;

  IF v_items IS NULL OR jsonb_typeof(v_items) <> 'array' OR jsonb_array_length(v_items) < 1 OR jsonb_array_length(v_items) > 30 THEN
    RAISE EXCEPTION 'EMPTY_CART' USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_zone
  FROM public.delivery_zones
  WHERE id = payload->>'zoneId' AND active = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'DELIVERY_ZONE_UNAVAILABLE' USING ERRCODE = '22023';
  END IF;

  FOR v_item IN SELECT value FROM jsonb_array_elements(v_items)
  LOOP
    v_qty := floor(COALESCE((v_item->>'quantity')::numeric, 0));
    IF v_qty < 1 OR v_qty > 20 THEN
      RAISE EXCEPTION 'INVALID_QUANTITY' USING ERRCODE = '22023';
    END IF;

    SELECT * INTO v_product
    FROM public.products
    WHERE id = v_item->>'productId' AND status = 'active';

    IF NOT FOUND THEN
      RAISE EXCEPTION 'PRODUCT_UNAVAILABLE' USING ERRCODE = '22023';
    END IF;

    v_option_sum := 0;
    v_option_ids := COALESCE(v_item->'optionIds', '[]'::jsonb);
    IF jsonb_typeof(v_option_ids) <> 'array' THEN
      RAISE EXCEPTION 'INVALID_OPTIONS' USING ERRCODE = '22023';
    END IF;

    FOR v_option_id IN SELECT jsonb_array_elements_text(v_option_ids)
    LOOP
      SELECT o.* INTO v_option
      FROM public.product_options o
      JOIN public.product_option_groups g ON g.id = o.group_id
      WHERE o.id = v_option_id
        AND g.product_id = v_product.id
        AND o.status = 'active';

      IF NOT FOUND THEN
        RAISE EXCEPTION 'OPTION_UNAVAILABLE' USING ERRCODE = '22023';
      END IF;

      v_option_sum := v_option_sum + v_option.price_cents;
    END LOOP;

    v_line := (v_product.price_cents + v_option_sum) * v_qty;
    v_subtotal := v_subtotal + v_line;
    v_snapshots := v_snapshots || jsonb_build_array(jsonb_build_object(
      'product_id', v_product.id,
      'product_name', v_product.name,
      'unit_price_cents', v_product.price_cents,
      'quantity', v_qty,
      'total_price_cents', v_line,
      'selected_options', v_option_ids
    ));
  END LOOP;

  INSERT INTO public.orders (
    customer_name, customer_phone, delivery_address, delivery_reference,
    delivery_radius_km, delivery_fee_cents, subtotal_cents, total_cents,
    payment_method, payment_change_for, notes, status, idempotency_key
  ) VALUES (
    v_name, v_phone, v_address, v_reference,
    v_zone.max_radius_km, v_zone.fee_cents, v_subtotal, v_subtotal + v_zone.fee_cents,
    v_payment, nullif(trim(COALESCE(payload->>'paymentChangeFor', '')), ''),
    nullif(trim(COALESCE(payload->>'notes', '')), ''),
    'pending', v_key
  )
  RETURNING * INTO v_order;

  INSERT INTO public.order_items (
    order_id, product_id, product_name, unit_price_cents, quantity, total_price_cents, selected_options
  )
  SELECT
    v_order.id,
    s->>'product_id',
    s->>'product_name',
    (s->>'unit_price_cents')::int,
    (s->>'quantity')::int,
    (s->>'total_price_cents')::int,
    COALESCE(s->'selected_options', '[]'::jsonb)
  FROM jsonb_array_elements(v_snapshots) AS s;

  RETURN jsonb_build_object(
    'replay', false,
    'orderId', v_order.id,
    'orderNumber', v_order.order_number,
    'subtotalCents', v_order.subtotal_cents,
    'deliveryFeeCents', v_order.delivery_fee_cents,
    'totalCents', v_order.total_cents,
    'createdAt', v_order.created_at,
    'items', v_snapshots
  );
EXCEPTION
  WHEN unique_violation THEN
    SELECT * INTO v_existing FROM public.orders WHERE idempotency_key = v_key;
    IF NOT FOUND THEN
      RAISE;
    END IF;
    RETURN jsonb_build_object(
      'replay', true,
      'orderId', v_existing.id,
      'orderNumber', v_existing.order_number,
      'subtotalCents', v_existing.subtotal_cents,
      'deliveryFeeCents', v_existing.delivery_fee_cents,
      'totalCents', v_existing.total_cents,
      'createdAt', v_existing.created_at,
      'items', '[]'::jsonb
    );
END;
$$;

REVOKE ALL ON FUNCTION public.create_order(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_order(jsonb) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_order(jsonb) TO service_role;

-- === grants + reload schema (de 20261123024500_create_order_grants.sql) ===

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname = 'create_order'
  ) THEN
    REVOKE ALL ON FUNCTION public.create_order(jsonb) FROM PUBLIC;
    REVOKE ALL ON FUNCTION public.create_order(jsonb) FROM anon, authenticated;
    GRANT EXECUTE ON FUNCTION public.create_order(jsonb) TO service_role;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
```

## 2. Verificação

```sql
SELECT proname, prosecdef
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public' AND p.proname = 'create_order';

SELECT indexname FROM pg_indexes
WHERE tablename = 'orders' AND indexname = 'orders_idempotency_key_uidx';
```

Esperado: uma linha com `create_order` e `prosecdef = true`; índice presente.

## 3. Alinhamento com o código (PRs)

| Origem | O que entra no remoto |
|--------|------------------------|
| #52 (mergeado em main) | RPC `create_order`, grants `service_role`, fail-closed catálogo, harden de `/api/orders` |
| Migration no repo | `20261122214600` + `20261123024500` |
| Vercel | `SUPABASE_SERVICE_ROLE_KEY` + `ADMIN_TOKEN` (já definidos) |
| #55 / este PR | Reviews via GET (não afeta schema) |

Sem este SQL no remoto, `POST /api/orders` falha e nenhum pedido é gravado.
