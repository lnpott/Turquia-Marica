# Checklist de lançamento (Fase 8)

Marcar só com evidência. Assinatura da loja é obrigatória para “aceito em produção”.

> Atualizado em 23/11/2026 — alinhado com `documentacao/PROXIMOS-PASSOS.md`.

## Técnico

- [ ] Migration `create_order` aplicada no projeto Supabase de produção
- [ ] `SUPABASE_URL` / `VITE_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` só no server
- [ ] `ADMIN_TOKEN` definido e diferente de qualquer valor de exemplo
- [ ] `npm run check` verde na branch a publicar
- [ ] `npm run test:e2e` sem falha crítica
- [ ] Bundle sem vazamento de demo (`audit:demo-leak`)
- [ ] Tentativa de preço adulterado no POST rejeitada (preço só do banco)
- [ ] Retry com a mesma `idempotency_key` não duplica pedido
- [ ] Produto indisponível bloqueia checkout
- [ ] Zona de entrega inativa/ausente bloqueia envio
- [ ] WhatsApp opcional: pedido permanece no banco sem abrir o link
- [ ] Mobile ~390px e desktop ~1280px sem overflow horizontal crítico

## Comercial / loja

- [ ] Preços reais publicados (substituir seed R$ 29,90)
- [ ] Fotos reais publicadas (`image_url` preenchido)
- [ ] Zonas de raio e taxas conferidas
- [ ] Operador treinado no WhatsApp e no status do pedido
- [ ] Texto de D7 (aceite a qualquer hora + confirmação pela loja) revisado
- [ ] Política mínima de dados (nome, telefone, endereço) aceita

## Pós-deploy

- [ ] Pedido de teste real gravado e localizado no Supabase
- [ ] Pedido aparece corretamente no `/admin`
- [ ] Rollback conhecido (redeploy do SHA anterior na Vercel)
- [ ] Contato de emergência técnico e da loja

**Assinatura loja:** _________________ **Data:** _______  
**Assinatura técnico:** _________________ **Data:** _______
