-- Garante EXECUTE da RPC create_order para a service_role e recarrega o schema do PostgREST.
-- Idempotente: seguro reaplicar se a função já existir.

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
