import { createClient } from '@supabase/supabase-js'

/** Remove BOM (U+FEFF) e espaços — env vars coladas com BOM quebram headers. */
function cleanEnv(value) {
  if (typeof value !== 'string') return ''
  return value.replace(/^\uFEFF/, '').trim()
}

const supabaseUrl = cleanEnv(import.meta.env.VITE_SUPABASE_URL)
const supabaseAnonKey = cleanEnv(import.meta.env.VITE_SUPABASE_ANON_KEY)

/**
 * Cliente Supabase com permissões públicas anônimas (RLS).
 * Utilizado para leitura do catálogo de categorias, produtos e faixas de entrega.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null
