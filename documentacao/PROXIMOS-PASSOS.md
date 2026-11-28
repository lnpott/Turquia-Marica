# Próximos passos operacionais

> Ver sempre `REGISTRO-OPERACIONAL.md` para o status auditado.

## Agora (bloqueantes)

1. **Aplicar SQL** em `APPLY-RPC-SUPABASE.md` no projeto Supabase `sxpsewnfgpkppqivzvcc`.
2. **Merge** da branch `chore/ops-desbloqueio-proxima-fase` → `main` (reviews GET + docs).
3. Confirmar deploy produção READY no novo SHA.
4. Repetir `POST /api/orders` até **201** (não 500 `RPC_FAILED`).
5. Testar idempotência e `/admin` com `ADMIN_TOKEN`.

## Depois (loja)

6. Preços e fotos reais.
7. Zonas/taxas conferidas.
8. Assinar `CHECKLIST-LANCAMENTO.md`.

## Já feito (não repetir)

- #52 no `main` e em produção Vercel.
- `ADMIN_TOKEN` nas envs Vercel.
- Script SQL documentado no repo.
