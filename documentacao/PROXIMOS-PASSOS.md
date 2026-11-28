# Próximos passos operacionais — Turquia Lanches

> Atualizado em 23/11/2026.
> Complementa a seção 10 do `ROADMAP.md` e o `CHECKLIST-LANCAMENTO.md`.
> Este documento é a sequência de execução prática para sair do estado atual e chegar em operação real.

## Status atual (main em 23/11/2026)

| Tema | Situação |
|---|---|
| Código fases 2–8 | Implementado |
| RPC `create_order` | Existe no repositório (`supabase/migrations/20261122214600_create_order_rpc.sql`) |
| RPC aplicada em produção | **Não** — bloqueante |
| `ADMIN_TOKEN` | Precisa ser definido na Vercel |
| Cardápio | Ainda usa preço provisório R$ 29,90 quando não há foto no Supabase |
| Checklist de lançamento | Não assinado |
| Aceite comercial da loja | Pendente (preços, fotos, zonas, treino) |

---

## Sequência obrigatória de execução

### 1. Aplicar a RPC no Supabase de produção (bloqueante)

**Objetivo:** permitir que `POST /api/orders` grave pedidos de verdade.

1. Abrir o projeto Supabase `turquia-lanches` (ref `sxpsewnfgpkppqivzvcc`).
2. Ir em **SQL Editor**.
3. Colar o conteúdo completo de:
   `supabase/migrations/20261122214600_create_order_rpc.sql`
4. Executar (Run).
5. Confirmar:
   - A função `public.create_order(jsonb)` existe.
   - Somente a role `service_role` tem `EXECUTE`.
   - O índice único em `orders.idempotency_key` foi criado.

**Aceite:** um pedido de teste via frontend grava linha em `orders` e `order_items`.

---

### 2. Configurar `ADMIN_TOKEN` na Vercel

**Objetivo:** proteger o painel `/admin`.

1. Vercel → projeto `turquia-marica` → **Settings** → **Environment Variables**.
2. Criar variável:
   - Nome: `ADMIN_TOKEN`
   - Valor: string longa e aleatória (mínimo 32 caracteres recomendado)
   - Ambientes: **Production**, **Preview** e **Development**
3. **Nunca** usar o prefixo `VITE_`.
4. Não reutilizar a `SUPABASE_SERVICE_ROLE_KEY` nem a anon key.

**Aceite:** acessar `/admin` com o token correto funciona; token errado retorna 401.

---

### 3. Teste ponta a ponta (obrigatório)

1. Abrir o site em produção (ou preview com as envs corretas).
2. Adicionar itens na sacola.
3. Ir para `/checkout`.
4. Preencher dados do cliente e escolher zona ativa.
5. Finalizar o pedido.
6. Verificar:
   - Resposta 200 com `orderId` e `orderNumber`
   - Linha criada em `orders` (status `pending`)
   - Itens criados em `order_items` com snapshots corretos
   - Página `/pedido/confirmado` aparece
   - Botão de WhatsApp opcional funciona (sem marcar como enviado/aceito/pago)
7. Repetir o mesmo pedido com a **mesma `idempotencyKey`**:
   - Deve retornar `replay: true`
   - Não pode criar pedido duplicado

**Aceite:** pedido gravado atomicamente + idempotência validada.

---

### 4. Comercial (depende da loja)

| Item | Ação | Responsável |
|---|---|---|
| Preços reais | Substituir seed R$ 29,90 | Loja (via `/admin` ou Dashboard) |
| Fotos | Preencher `image_url` dos produtos | Loja |
| Zonas e taxas | Conferir `delivery_zones` | Loja |
| Texto D7 | Revisar aviso de “aceita pedido a qualquer hora + confirmação pela loja” | Loja |
| Treino | Operador sabe usar WhatsApp + status do pedido | Loja |

---

### 5. Lançamento

1. Percorrer e assinar `documentacao/CHECKLIST-LANCAMENTO.md`.
2. Fazer um pedido real de validação em produção.
3. Confirmar que o pedido aparece no `/admin` e no WhatsApp da loja.
4. Manter procedimento de rollback conhecido (redeploy do SHA anterior na Vercel).
5. Monitoramento mínimo recomendado:
   - Falhas de `POST /api/orders`
   - Taxa de fallback do cardápio (preço provisório)

---

## Critério de “pronto para operação real”

- [ ] Migration `create_order` aplicada em produção
- [ ] `ADMIN_TOKEN` configurado em todos os ambientes
- [ ] Pedido de teste gravado e localizado no Supabase
- [ ] Idempotência validada
- [ ] Preços reais publicados (saiu do R$ 29,90)
- [ ] Checklist de lançamento assinado pela loja e pelo técnico
- [ ] Operador treinado no fluxo

Somente após todos os itens acima a plataforma pode ser considerada em operação real.

---

## Referências

- `ROADMAP.md` — seção 10 (próximos passos após fase 8)
- `GUIA.md` — estado atual do código
- `documentacao/CHECKLIST-LANCAMENTO.md`
- `documentacao/OPERACAO-ADMIN.md`
- `documentacao/DECISOES-PENDENTES.md`
