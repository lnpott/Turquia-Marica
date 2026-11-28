# Próximos passos operacionais — Turquia Lanches

> Atualizado em 28/11/2026.
> Complementa a seção 10 do `ROADMAP.md` e o `CHECKLIST-LANCAMENTO.md`.
> Sequência prática para operação real após o merge do #52.

## Status atual (28/11/2026)

| Tema | Situação |
|---|---|
| Código fases 2–8 + harden orders | Em `main` (#52 squash) |
| RPC `create_order` no repositório | Sim (`20261122214600` + grants `20261123024500`) |
| RPC aplicada em produção | **Pendente — bloqueante** (ver `APPLY-RPC-SUPABASE.md`) |
| `ADMIN_TOKEN` na Vercel | **Configurado** (Production / Preview / Development) |
| `SUPABASE_SERVICE_ROLE_KEY` | Presente nos 3 ambientes |
| Reviews Places API | Corrigido para GET neste PR |
| Cardápio | Ainda seed R$ 29,90 / fallback sem foto |
| Checklist de lançamento | Não assinado |

---

## Sequência de execução

### 1. Aplicar a RPC no Supabase de produção (bloqueante)

Siga **`documentacao/APPLY-RPC-SUPABASE.md`** (SQL completo + grants + `NOTIFY pgrst`).

**Aceite:** função `public.create_order(jsonb)` existe; só `service_role` tem `EXECUTE`.

### 2. Redeploy de produção a partir de `main`

Após merge deste PR, garantir deploy READY de `main` em `turquia-marica` (para carregar `ADMIN_TOKEN` e o fix de reviews).

### 3. Teste ponta a ponta

1. Sacola → checkout → finalizar.
2. Conferir linha em `orders` / `order_items` (status `pending`).
3. Página de confirmação + WhatsApp opcional (sem marcar enviado/aceito/pago).
4. Mesma `idempotencyKey` → `replay: true`, sem duplicar.
5. Token errado em `/admin` → 401; token correto lista pedidos.

### 4. Comercial (loja)

Preços reais, `image_url`, zonas/taxas, texto D7, treino do operador.

### 5. Assinar checklist e lançar

`documentacao/CHECKLIST-LANCAMENTO.md` + monitoramento mínimo de `POST /api/orders`.

---

## Critério de “pronto para operação real”

- [ ] Migration `create_order` (+ grants) aplicada em produção
- [x] `ADMIN_TOKEN` configurado em todos os ambientes
- [ ] Pedido de teste gravado no Supabase
- [ ] Idempotência validada
- [ ] Preços reais publicados
- [ ] Checklist assinado
- [ ] Operador treinado

---

## Referências

- `documentacao/APPLY-RPC-SUPABASE.md`
- `ROADMAP.md` §10
- `GUIA.md`
- `documentacao/OPERACAO-ADMIN.md`
- `documentacao/DECISOES-PENDENTES.md`
