import { supabase } from '../lib/supabase'

/**
 * Busca todas as categorias ativas ordenadas por display_order.
 */
export async function getActiveCategories() {
  if (!supabase) return { data: null, error: new Error('Supabase client não configurado') }
  return await supabase
    .from('categories')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })
}

/**
 * Busca todos os produtos ativos com opcionais opcionais associados.
 */
export async function getActiveProducts() {
  if (!supabase) return { data: null, error: new Error('Supabase client não configurado') }
  return await supabase
    .from('products')
    .select('*, product_option_groups(*, product_options(*))')
    .eq('status', 'active')
    .order('display_order', { ascending: true })
}

/**
 * Busca as zonas de entrega ativas baseadas em raio km.
 */
export async function getDeliveryZones() {
  if (!supabase) return { data: null, error: new Error('Supabase client não configurado') }
  return await supabase
    .from('delivery_zones')
    .select('*')
    .eq('active', true)
    .order('max_radius_km', { ascending: true })
}
