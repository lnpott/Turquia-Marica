# Próximos passos operacionais — Turquia Lanches

> Atualizado em 28/11/2026.
> Complementa a seção 10 do `ROADMAP.md` e o `CHECKLIST-LANCAMENTO.md`.
> **Registro detalhado do que foi / não foi:** `documentacao/REGISTRO-OPERACIONAL.md`.

## Status atual (28/11/2026)

| Tema | Situação | Feito? |
|---|---|---|
| Código fases 2–8 + harden orders (#52) | Em `main` (`ba653d62…`) | **Sim** |
| RPC `create_order` no repositório | `20261122214600` + grants `20261123024500` | **Sim** |
| RPC aplicada em produção | Aguardando SQL Editor | **Não** |
| `ADMIN_TOKEN` na Vercel (3 ambientes) | Env criada (sensitive) | **Sim** (falta redeploy para runtime) |
| `SUPABASE_SERVICE_ROLE_KEY` | Presente nos 3 ambientes | **Sim** (não revalidada com POST 201) |
| Reviews Places API GET | Na branch ops; PR/merge pendente | **Parcial** |
| PR ops (`chore/ops-desbloqueio-proxima-fase`) mergeado | Formulário / merge pendente | **Não** |
| Redeploy produção a partir de `main` | Pendente | **Não** |
| Pedido E2E + idempotência em produção | Bloqueado | **Não** |
| Cardápio preços/fotos oficiais | Seed R$ 29,90 | **Não** |
| Checklist de lançamento assinado | — | **Não** |

---

## Sequência de execução (só marcar com evidência)

### 1. Aplicar a RPC no Supabase de produção (bloqueante) — **NÃO FEITO**

Siga **`documentacao/APPLY-RPC-SUPABASE.md`**.

**Aceite:** função `public.create_order(jsonb)` existe; só `service_role` tem `EXECUTE`.

### 2. Merge do PR ops + redeploy de produção — **NÃO FEITO**

Após merge de `chore/ops-desbloqueio-proxima-fase`, deploy READY de `main` em `turquia-marica` (carrega `ADMIN_TOKEN` + reviews GET).

### 3. Teste ponta a ponta — **NÃO FEITO**

1. Sacola → checkout → finalizar.
2. Linha em `orders` / `order_items` (`pending`).
3. Confirmação + WhatsApp opcional.
4. Mesma `idempotencyKey` → `replay: true`.
5. `/admin` 401 com token errado; OK com token certo.

Registrar resultado em `REGISTRO-OPERACIONAL.md`.

### 4. Comercial (loja) — **NÃO FEITO**

Preços, `image_url`, zonas, D7, treino.

### 5. Assinar checklist — **NÃO FEITO**

`documentacao/CHECKLIST-LANCAMENTO.md`.

---

## Critério de “pronto para operação real”

- [ ] Migration `create_order` (+ grants) aplicada em produção
- [x] `ADMIN_TOKEN` configurado na Vercel (redeploy ainda pendente)
- [ ] Pedido de teste gravado no Supabase
- [ ] Idempotência validada
- [ ] Preços reais publicados
- [ ] Checklist assinado
- [ ] Operador treinado

---

## Referências

- `documentacao/REGISTRO-OPERACIONAL.md` — **fonte do que foi / não foi**
- `documentacao/APPLY-RPC-SUPABASE.md`
- `ROADMAP.md` §10
- `GUIA.md`
- `documentacao/OPERACAO-ADMIN.md`
- `documentacao/DECISOES-PENDENTES.md`
