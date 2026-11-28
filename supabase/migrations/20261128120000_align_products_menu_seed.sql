-- Migration: align product seed with src/data/menu.js IDs
-- Preço provisório R$ 29,90. image_url permanece NULL até fotos oficiais.
-- Idempotente.

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

INSERT INTO public.products (id, category_id, name, description, price_cents, status, display_order, image_alt) VALUES
  ('baca', 'lanches', 'Baca Burger', 'Lanche ilustrativo da vitrine provisória.', 2990, 'active', 1, 'Baca Burger'),
  ('passa', 'lanches', 'Passa Burger', 'Lanche ilustrativo da vitrine provisória.', 2990, 'active', 2, 'Passa Burger'),
  ('pizza', 'lanches', 'Pizza Teste', 'Item ilustrativo da vitrine provisória.', 2990, 'active', 3, 'Pizza'),
  ('x-turquia', 'lanches', 'X-Turquia', 'Lanche ilustrativo da vitrine provisória.', 2990, 'active', 4, 'X-Turquia'),
  ('tabua', 'combos', 'Tábua Mista', 'Combo ilustrativo da vitrine provisória.', 2990, 'active', 5, 'Tábua Mista'),
  ('tabucama', 'combos', 'Tábua Cama', 'Combo ilustrativo da vitrine provisória.', 2990, 'active', 6, 'Tábua Cama'),
  ('batata', 'combos', 'Porção de Batata', 'Porção ilustrativa da vitrine provisória.', 2990, 'active', 7, 'Porção de batata'),
  ('cebola', 'combos', 'Rings de Cebola', 'Porção ilustrativa da vitrine provisória.', 2990, 'active', 8, 'Rings de cebola'),
  ('pidoce', 'sobremesas', 'Pi Doce', 'Sobremesa ilustrativa da vitrine provisória.', 2990, 'active', 9, 'Pi Doce')
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  image_alt = EXCLUDED.image_alt;
