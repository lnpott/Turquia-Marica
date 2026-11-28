# Registro operacional — o que foi e o que não foi

> **Regra permanente:** cada sessão de ops registra **Feito** e **Não feito** com evidência. Não apagar entradas antigas.

---

## Auditoria 28/11/2026 (~02:55 -03) — GitHub main + Vercel + teste HTTP

### Feito (evidência)

| Item | Evidência |
|------|-----------|
| Código #52 em `main` | SHA `ba653d62d99893c611638036de74d85e9f336b38` |
| Migrations no repo | `20261122214600_create_order_rpc.sql`, `20261123024500_create_order_grants.sql` |
| Produção Vercel em `main` #52 | Deploy `dpl_CPe4rLCqKYCyz8csqB1qDQt6cbTE` READY |
| Preview branch ops | `dpl_xmUv98ykmjh7zDir7nVYthHcixFE` READY · branch `chore/ops-desbloqueio-proxima-fase` · `ab8a1df0…` |
| `ADMIN_TOKEN` na Vercel | Env `E9GMbTvh6BbHvdrm` · Production/Preview/Development |
| Envs Supabase na Vercel | `VITE_SUPABASE_*` + `SUPABASE_SERVICE_ROLE_KEY` presentes |
| Teste `POST /api/orders` produção | HTTP **500** `{"error":"ORDER_REJECTED","reason":"RPC_FAILED"}` (prova que o endpoint responde, mas a RPC remota falha) |

### Não feito

| Item | Motivo |
|------|--------|
| SQL da RPC no Supabase de produção | Sem acesso API Supabase; exige SQL Editor manual (`APPLY-RPC-SUPABASE.md`) |
| Pedido 201 com `orderNumber` | Bloqueado por `RPC_FAILED` |
| Merge branch ops → `main` | PR/formulário ainda não confirmado pelo dono do repo |
| Reviews GET em `main`/produção | Só na branch ops |
| Fechamento #53 / #55 | Ainda open no GitHub |
| Preços/fotos oficiais, checklist assinado | Comercial / loja |

### Conclusão

**Não está operacional.** Código de gravação existe; **banco remoto ainda não executa `create_order` com sucesso** (ou grants/service role incompatíveis). Próximo passo humano obrigatório: rodar `APPLY-RPC-SUPABASE.md` no SQL Editor e repetir o POST.

---

## Sessão anterior 28/11/2026 (ops inicial)

### Feito
- Merge #52; branch ops; docs APPLY/PROXIMOS/CHECKLIST; ADMIN_TOKEN criado.

### Não feito
- SQL remoto; merge ops; E2E com 201.

---

## Modelo

```markdown
## Sessão AAAA-MM-DD
### Feito
### Não feito
### Evidências
### Próxima ação
```
