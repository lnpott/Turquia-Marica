-- Migration: init_schema
-- Criacao da estrutura do catalogo comercial, pedidos e regras de entrega

-- 1. Tabela de Categorias
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'construction', 'hidden')),
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Tabela de Produtos
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

-- 3. Tabela de Opcionais / Adicionais (expansivel)
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

-- 4. Tabela de Configuracao de Entrega (raio em km a partir da loja)
CREATE TABLE IF NOT EXISTS public.delivery_zones (
  id TEXT PRIMARY KEY,
  max_radius_km NUMERIC(5,2) NOT NULL,
  fee_cents INT NOT NULL CHECK (fee_cents >= 0),
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT true
);

-- 5. Tabela de Pedidos
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

-- 6. Tabela de Itens do Pedido (Snapshot historico imutavel)
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

-- 7. Ativar Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_option_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 8. Politicas RLS (Catalogo e zonas publicos para leitura; Pedidos inseridos por service_role / backend seguro)
CREATE POLICY "Permitir leitura publica de categorias ativas"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura publica de produtos ativos"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura publica de grupos de opcionais"
  ON public.product_option_groups FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura publica de itens de opcionais"
  ON public.product_options FOR SELECT
  USING (true);

CREATE POLICY "Permitir leitura publica de zonas de entrega"
  ON public.delivery_zones FOR SELECT
  USING (active = true);

-- Insercao de dados iniciais do catalogo existente (vitrine atual como base)
INSERT INTO public.categories (id, name, status, display_order) VALUES
  ('combos', 'Combos', 'active', 1),
  ('lanches', 'Lanches', 'active', 2),
  ('porcoes', 'Porções', 'active', 3),
  ('bebidas', 'Bebidas', 'construction', 4),
  ('sobremesas', 'Sobremesas', 'construction', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, category_id, name, description, price_cents, status, display_order) VALUES
  ('combo-1', 'combos', 'Combo Turquia Especial', 'Hambúrguer especial, batata frita e refrigerante lata.', 2990, 'active', 1),
  ('lanche-1', 'lanches', 'X-Burguer Clássico', 'Pão brioche, blend 160g, queijo prato derretido e maionese da casa.', 2990, 'active', 2),
  ('porcao-1', 'porcoes', 'Batata Rústica com Alecrim', 'Batatas cortadas em gomos rústicos, temperadas com alecrim e páprica.', 2990, 'active', 3),
  ('combo-2', 'combos', 'Combo Família', 'Dois lanches à escolha, batata grande e dois refrigerantes.', 2990, 'active', 4),
  ('lanche-2', 'lanches', 'X-Bacon Crocante', 'Blend 160g, queijo cheddar, fatias crocantes de bacon e barbecue artesanal.', 2990, 'active', 5),
  ('porcao-2', 'porcoes', 'Anéis de Cebola Empanados', 'Anéis de cebola crocantes acompanhados de molho especial.', 2990, 'active', 6),
  ('combo-3', 'combos', 'Combo Duplo Smash', 'Dois smash burgers, batata frita individual e refrigerante.', 2990, 'active', 7),
  ('lanche-3', 'lanches', 'X-Salada Especial', 'Blend 160g, queijo, alface fresca, tomate selecionado e picles da casa.', 2990, 'active', 8),
  ('porcao-3', 'porcoes', 'Frango Crocante em Tiras', 'Tiras de peito de frango empanadas com crosta crocante e molho tártaro.', 2990, 'active', 9)
ON CONFLICT (id) DO NOTHING;
