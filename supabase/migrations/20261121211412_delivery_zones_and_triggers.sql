-- Migration: delivery_zones_and_triggers
-- Configuracao de faixas de entrega por raio em km e triggers de auditoria (updated_at)

-- 1. Zonas de entrega iniciais baseadas em raio (km a partir de R. Canarinhos, 663)
INSERT INTO public.delivery_zones (id, max_radius_km, fee_cents, description, active) VALUES
  ('zone-1', 3.00, 500, 'Raio até 3 km (Parque Nanci e imediações)', true),
  ('zone-2', 6.00, 800, 'Raio de 3.01 km até 6 km (Região central/bairros adjacentes)', true),
  ('zone-3', 10.00, 1200, 'Raio de 6.01 km até 10 km (Maricá expandido)', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Funcao para atualizacao automatica da coluna updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Triggers de updated_at para tabelas do sistema
DROP TRIGGER IF EXISTS trigger_categories_updated_at ON public.categories;
CREATE TRIGGER trigger_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_products_updated_at ON public.products;
CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_orders_updated_at ON public.orders;
CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Indices de performance para consultas frequentes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
