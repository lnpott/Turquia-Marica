# Registro operacional — o que foi e o que não foi

> **Regra permanente do projeto:** ao final de qualquer sessão de ops, PR ou intervenção em Vercel/Supabase/GitHub, registrar aqui (ou em entrada datada abaixo) **o que foi feito** e **o que não foi feito**. Não declarar concluído sem evidência.

---

## Sessão 28/11/2026 (~02:20–02:30 -03)

Contexto: execução dos passos 1–6 do plano pós-fase 8; alinhamento com #52/#53/#55; tentativa de desbloqueio operacional.

### Feito (com evidência)

| Item | Evidência |
|------|-----------|
| Merge do PR **#52** (orders + grants + fail-closed) em `main` | Squash merge SHA `ba653d62d99893c611638036de74d85e9f336b38` |
| Migrations no repo em `main` | `20261122214600_create_order_rpc.sql` + `20261123024500_create_order_grants.sql` |
| `ADMIN_TOKEN` criado na Vercel (Production, Preview, Development), tipo sensitive, sem `VITE_` | Env id `E9GMbTvh6BbHvdrm` no projeto `turquia-marica` |
| Confirmação de envs Supabase já existentes na Vercel | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` nos 3 ambientes |
| Branch `chore/ops-desbloqueio-proxima-fase` a partir de `main` | Ref criada no GitHub |
| Commit com fix de reviews (GET), `APPLY-RPC-SUPABASE.md`, `PROXIMOS-PASSOS.md`, checklist | SHA `9e98c0f801a8a33f0f180ddba82d5ac2a9eca1b2` (e este registro) |
| SQL de aplicação remota documentado (RPC + grants + NOTIFY) | `documentacao/APPLY-RPC-SUPABASE.md` |

### Não feito (explícito)

| Item | Motivo / bloqueio |
|------|-------------------|
| **Aplicar SQL no Supabase de produção** | Não há conector Supabase neste fluxo; exige SQL Editor manual no projeto `sxpsewnfgpkppqivzvcc` |
| Confirmação de que `create_order` existe e tem `EXECUTE` só para `service_role` no remoto | Depende do item acima |
| Criação do PR no GitHub a partir da branch ops | Formulário interativo pendente de confirmação do usuário |
| Fechamento formal dos PRs **#53** e **#55** | Formulários interativos pendentes; conteúdo do #55 já reaplicado na branch ops; #53 superado pelos docs novos |
| Redeploy de produção a partir de `main` estável (com ADMIN_TOKEN + reviews GET) | Aguarda merge do PR ops e/ou deploy explícito |
| Pedido de teste E2E real em produção | Bloqueado até RPC remota + deploy; não gravar pedido real sem autorização |
| Validação de idempotência / fail-closed em produção | Depende do E2E |
| Preços/fotos oficiais, zonas conferidas, checklist assinado | Comercial / loja — fora desta sessão |
| Valor do `ADMIN_TOKEN` versionado no Git | **Propositadamente não** — segredo só na Vercel e com o operador |

### Estado da produção Vercel no momento da sessão

- Deploy de produção ainda associado a branch de fix de reviews (`fix/google-places-after-orders`), **não** necessariamente ao `main` pós-#52 + este PR.
- `ADMIN_TOKEN` só passa a valer no runtime após **novo deploy** que carregue as envs.

### Próxima ação obrigatória (em ordem)

1. Confirmar/criar o PR da branch `chore/ops-desbloqueio-proxima-fase` → `main` e mergear.
2. Executar o SQL de `APPLY-RPC-SUPABASE.md` no SQL Editor do Supabase produção.
3. Redeploy de produção a partir de `main`.
4. Teste E2E controlado + registrar resultado (feito / não feito) nesta mesma seção ou em entrada nova.

---

## Modelo para próximas sessões

Copiar o bloco abaixo e preencher:

```markdown
## Sessão AAAA-MM-DD (horário -03)

### Feito
- ...

### Não feito
- ...

### Evidências (SHA, PR, env id, URL de deploy)
- ...

### Próxima ação
- ...
```

Não apagar entradas antigas; apenas acrescentar.
