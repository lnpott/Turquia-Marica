-- ============================================================
-- Turquia Lanches — aplicação única no Supabase REMOTO
-- Idempotente: seguro reaplicar no SQL Editor
-- Uso: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1) Categorias
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'construction', 'hidden')),
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2) Produtos
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INT NOT NULL CHECK (price_cents >= 0),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'out_of_stock', 'hidden')),
  image_url TEXT,
  image_alt TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3) Opcionais
CREATE TABLE IF NOT EXISTS public.product_option_groups (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE,
  name TEXT NOT NULL,
  min_selection INT NOT NULL DEFAULT 0,
  max_selection INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.product_options (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL REFERENCES public.product_option_groups(id) ON UPDATE CASCADE ON DELETE CASCADE,
  name TEXT NOT NULL,
  price_cents INT NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'out_of_stock', 'hidden')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4) Zonas de entrega
CREATE TABLE IF NOT EXISTS public.delivery_zones (
  id TEXT PRIMARY KEY,
  max_radius_km NUMERIC(5,2) NOT NULL,
  fee_cents INT NOT NULL CHECK (fee_cents >= 0),
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true
);

-- 5) Pedidos
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_reference TEXT NOT NULL,
  delivery_radius_km NUMERIC(5,2),
  delivery_fee_cents INT NOT NULL DEFAULT 0 CHECK (delivery_fee_cents >= 0),
  subtotal_cents INT NOT NULL CHECK (subtotal_cents >= 0),
  total_cents INT NOT NULL CHECK (total_cents >= 0),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('card_delivery', 'cash_delivery', 'pix_delivery')),
  payment_change_for TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS orders_idempotency_key_uidx
  ON public.orders (idempotency_key)
  WHERE idempotency_key IS NOT NULL;

-- 6) Itens do pedido (snapshot)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  unit_price_cents INT NOT NULL CHECK (unit_price_cents >= 0),
  quantity INT NOT NULL CHECK (quantity > 0),
  total_price_cents INT NOT NULL CHECK (total_price_cents >= 0),
  selected_options JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7) RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_option_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura publica de categorias ativas" ON public.categories;
CREATE POLICY "Permitir leitura publica de categorias ativas"
  ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir leitura publica de produtos ativos" ON public.products;
CREATE POLICY "Permitir leitura publica de produtos ativos"
  ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir leitura publica de grupos de opcionais" ON public.product_option_groups;
CREATE POLICY "Permitir leitura publica de grupos de opcionais"
  ON public.product_option_groups FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir leitura publica de itens de opcionais" ON public.product_options;
CREATE POLICY "Permitir leitura publica de itens de opcionais"
  ON public.product_options FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir leitura publica de zonas de entrega" ON public.delivery_zones;
CREATE POLICY "Permitir leitura publica de zonas de entrega"
  ON public.delivery_zones FOR SELECT USING (active = true);

-- 8) Seed categorias
INSERT INTO public.categories (id, name, status, display_order) VALUES
  ('combos', 'Combos', 'active', 1),
  ('lanches', 'Lanches', 'active', 2),
  ('porcoes', 'Porções', 'active', 3),
  ('bebidas', 'Bebidas', 'construction', 4),
  ('sobremesas', 'Sobremesas', 'active', 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order;

-- 9) Seed produtos alinhados a src/data/menu.js (preço provisório R$ 29,90)
-- image_url NULL → frontend usa fallback local com foto até preencher Storage/CDN
INSERT INTO public.products (id, category_id, name, description, price_cents, status, display_order, image_url, image_alt) VALUES
  ('baca', 'lanches', 'Baca Burger', 'Lanche ilustrativo da vitrine provisória.', 2990, 'active', 1, NULL, 'Baca Burger'),
  ('passa', 'lanches', 'Passa Burger', 'Lanche ilustrativo da vitrine provisória.', 2990, 'active', 2, NULL, 'Passa Burger'),
  ('pizza', 'lanches', 'Pizza Teste', 'Item ilustrativo da vitrine provisória.', 2990, 'active', 3, NULL, 'Pizza'),
  ('x-turquia', 'lanches', 'X-Turquia', 'Lanche ilustrativo da vitrine provisória.', 2990, 'active', 4, NULL, 'X-Turquia'),
  ('tabua', 'combos', 'Tábua Mista', 'Combo ilustrativo da vitrine provisória.', 2990, 'active', 5, NULL, 'Tábua Mista'),
  ('tabucama', 'combos', 'Tábua Cama', 'Combo ilustrativo da vitrine provisória.', 2990, 'active', 6, NULL, 'Tábua Cama'),
  ('batata', 'combos', 'Porção de Batata', 'Porção ilustrativa da vitrine provisória.', 2990, 'active', 7, NULL, 'Porção de batata'),
  ('cebola', 'combos', 'Rings de Cebola', 'Porção ilustrativa da vitrine provisória.', 2990, 'active', 8, NULL, 'Rings de cebola'),
  ('pidoce', 'sobremesas', 'Pi Doce', 'Sobremesa ilustrativa da vitrine provisória.', 2990, 'active', 9, NULL, 'Pi Doce')
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  image_alt = EXCLUDED.image_alt;

-- 10) Zonas de entrega
INSERT INTO public.delivery_zones (id, max_radius_km, fee_cents, description, active) VALUES
  ('zone-1', 3.00, 500, 'Raio até 3 km (Parque Nanci e imediações)', true),
  ('zone-2', 6.00, 800, 'Raio de 3.01 km até 6 km (Região central/bairros adjacentes)', true),
  ('zone-3', 10.00, 1200, 'Raio de 6.01 km até 10 km (Maricá expandido)', true)
ON CONFLICT (id) DO NOTHING;

-- 11) updated_at + índices
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_categories_updated_at ON public.categories;
CREATE TRIGGER trigger_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_products_updated_at ON public.products;
CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_orders_updated_at ON public.orders;
CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- 12) RPC create_order
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

-- 13) Grants: só service_role
REVOKE ALL ON FUNCTION public.create_order(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_order(jsonb) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_order(jsonb) TO service_role;

NOTIFY pgrst, 'reload schema';
