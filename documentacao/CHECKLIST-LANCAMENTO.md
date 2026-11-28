# Checklist de lançamento (Fase 8)

Marcar só com evidência. Assinatura da loja é obrigatória para “aceito em produção”.

> Atualizado em 28/11/2026.
> O que foi / não foi em detalhe: `documentacao/REGISTRO-OPERACIONAL.md`.

## Técnico

- [ ] Migration `create_order` (+ grants) aplicada no Supabase de produção (`APPLY-RPC-SUPABASE.md`) — **não feito**
- [x] `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` nos ambientes Vercel — **feito** (existência; não revalidado com pedido 201)
- [x] `ADMIN_TOKEN` definido (sensitive, sem `VITE_`) em Production / Preview / Development — **feito** (env criada; runtime depende de redeploy)
- [ ] Redeploy de produção a partir de `main` com as envs acima — **não feito**
- [ ] `npm run check` verde na branch publicada
- [ ] `npm run test:e2e` sem falha crítica
- [ ] Bundle sem vazamento de demo (`audit:demo-leak`)
- [ ] Tentativa de preço adulterado no POST rejeitada
- [ ] Retry com a mesma `idempotency_key` não duplica pedido — **não feito em produção**
- [ ] Produto indisponível bloqueia checkout
- [ ] Zona de entrega inativa/ausente bloqueia envio
- [ ] WhatsApp opcional: pedido permanece no banco sem abrir o link
- [ ] Mobile ~390px e desktop ~1280px sem overflow horizontal crítico

## Comercial / loja

- [ ] Preços reais publicados (substituir seed R$ 29,90) — **não feito**
- [ ] Fotos reais publicadas (`image_url` preenchido) — **não feito**
- [ ] Zonas de raio e taxas conferidas — **não feito**
- [ ] Operador treinado no WhatsApp e no status do pedido — **não feito**
- [ ] Texto de D7 revisado — **não feito**
- [ ] Política mínima de dados aceita — **não feito**

## Pós-deploy

- [ ] Pedido de teste real gravado e localizado no Supabase — **não feito**
- [ ] Pedido aparece corretamente no `/admin` — **não feito**
- [ ] Rollback conhecido (redeploy do SHA anterior na Vercel)
- [ ] Contato de emergência técnico e da loja

**Assinatura loja:** _________________ **Data:** _______  
**Assinatura técnico:** _________________ **Data:** _______
