# Próximos passos operacionais — Turquia Lanches

> Atualizado em 28/11/2026.
> Complementa a seção 10 do `ROADMAP.md` e o `CHECKLIST-LANCAMENTO.md`.
> Este documento é a sequência de execução prática para sair do estado atual e chegar em operação real.

## Status atual (main em 28/11/2026)

| Tema | Situação |
|---|---|
| Código fases 2–8 | Implementado |
| SPA `/admin` e rewrites | OK em produção |
| Parse Bearer + sanitização BOM (front e API) | OK — commits no `main` de 28/11 |
| `ADMIN_TOKEN` na Vercel | Configurado (valor **temporário** `123`) |
| Painel `/admin` autentica e lista produtos | OK em produção |
| RPC `create_order` no repositório | Existe (`supabase/migrations/20261122214600_create_order_rpc.sql` + grants) |
| RPC aplicada em produção | **Conferir** — ainda bloqueante se não estiver |
| Pedidos no painel | API responde; lista vazia até haver pedidos reais |
| Cardápio | Seed / preços provisórios ainda presentes |
| Checklist de lançamento | Não assinado |
| Aceite comercial da loja | Pendente (preços, fotos, zonas, treino) |

### O que foi feito em 28/11/2026 (registro)

1. Rota `/admin` acessível (SPA rewrite / cleanUrls).
2. Correção do parse do header `Authorization: Bearer …` na API.
3. Sanitização de BOM no front (`AdminPage.jsx`) e nas env vars do `api/admin.js`.
4. `ADMIN_TOKEN` definido na Vercel (Production, Preview, Development) com valor temporário `123` para desbloquear o painel.
5. Redeploy de produção; `GET /api/admin` com Bearer `123` retorna 200 e produtos.

---

## Sequência de execução a partir de agora

### A. Segurança do painel (rápido)

1. Gerar token forte (≥32 caracteres aleatórios).
2. Atualizar `ADMIN_TOKEN` na Vercel (Production, Preview, Development).
3. Redeploy (mudança de env sensível exige deploy novo).
4. Entrar em `/admin` com o token novo; confirmar 401 com token errado.

**Aceite:** senha `123` fora de produção; só token forte funciona.

---

### B. RPC `create_order` em produção (bloqueante para pedidos reais)

**Objetivo:** `POST /api/orders` gravar pedidos de verdade.

1. Abrir o projeto Supabase ligado à produção.
2. **SQL Editor** → colar e executar, nesta ordem se ainda não estiverem aplicadas:
   - `supabase/migrations/20261122214600_create_order_rpc.sql`
   - `supabase/migrations/20261123024500_create_order_grants.sql`
3. Confirmar:
   - Função `public.create_order(jsonb)` existe.
   - `EXECUTE` só para `service_role`.
   - Índice único em `orders.idempotency_key`.

**Aceite:** pedido de teste pelo site grava `orders` + `order_items`.

---

### C. Teste ponta a ponta

1. Site em produção → itens na sacola → `/checkout`.
2. Preencher dados e zona ativa → finalizar.
3. Verificar:
   - 200 com `orderId` / `orderNumber`
   - Linha em `orders` (`pending`) e itens em `order_items`
   - Página de confirmação
   - Pedido aparece no `/admin`
   - WhatsApp opcional não muda status
4. Mesma `idempotencyKey` de novo → `replay: true`, sem duplicar.

**Aceite:** pedido gravado + idempotência + visível no painel.

---

### D. Melhorias do painel (quando o fluxo acima estiver estável)

Prioridade sugerida, sem inventar dados comerciais:

1. Feedback visual ao mudar status de pedido (loading / sucesso / erro).
2. Filtro ou abas por status (`pending`, `confirmed`, …).
3. Atualização periódica ou botão “Atualizar” mais evidente.
4. Edição de status de produto (`active` / indisponível) se a loja precisar.
5. Mensagem clara quando não há pedidos ainda.

Só implementar o que a loja for usar no dia a dia.

---

### E. Comercial (depende da loja)

| Item | Ação | Responsável |
|---|---|---|
| Preços reais | Substituir seed R$ 29,90 | Loja (via `/admin` ou Dashboard) |
| Fotos | Preencher `image_url` dos produtos | Loja |
| Zonas e taxas | Conferir `delivery_zones` | Loja |
| Texto operacional | Revisar aviso de confirmação pela loja | Loja |
| Treino | Operador: WhatsApp + status no painel | Loja |

---

### F. Lançamento

1. Percorrer e assinar `documentacao/CHECKLIST-LANCAMENTO.md`.
2. Pedido real de validação em produção.
3. Pedido no `/admin` e no WhatsApp da loja.
4. Rollback conhecido (redeploy do SHA anterior na Vercel).
5. Monitorar falhas de `POST /api/orders` e uso de preço provisório.

---

## Critério de “pronto para operação real”

- [x] `/admin` acessível e autenticando em produção
- [x] Correções de Bearer e BOM no código
- [ ] `ADMIN_TOKEN` forte (não a senha temporária `123`)
- [ ] Migration `create_order` (+ grants) aplicada em produção
- [ ] Pedido de teste gravado e localizado no Supabase e no `/admin`
- [ ] Idempotência validada
- [ ] Preços reais publicados (saiu do provisório)
- [ ] Checklist de lançamento assinado pela loja e pelo técnico
- [ ] Operador treinado no fluxo

Somente após os itens em aberto a plataforma pode ser considerada em operação real.

---

## Referências

- `ROADMAP.md` — seção 10 (próximos passos após fase 8)
- `GUIA.md` — estado atual do código
- `documentacao/CHECKLIST-LANCAMENTO.md`
- `documentacao/OPERACAO-ADMIN.md`
- `documentacao/DECISOES-PENDENTES.md`
