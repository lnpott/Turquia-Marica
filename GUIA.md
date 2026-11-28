# GUIA — estado atual e direção aprovada

> Este documento separa o que está implementado em `main` do que é apenas planejado.
> Base da revisão: `main` em `53bdc06` (22/11/2026, pós #47–#50).
> Não marcar fase do roadmap como concluída só porque a rota existe.

## 1. Produto e objetivo

A Turquia Lanches possui um site institucional e uma vitrine de cardápio. A direção aprovada é evoluir esse produto para uma plataforma própria que reúna:

- portfólio institucional completo;
- catálogo comercial ativo;
- preços e opcionais oficiais;
- sacola e finalização de pedidos;
- persistência de catálogo, preços e pedidos no Supabase;
- encaminhamento opcional do pedido pelo WhatsApp após sua gravação.

**Decisão arquitetural permanente:** Supabase é parte obrigatória da solução. Não existe alternativa de produção baseada apenas em `localStorage`, link de WhatsApp ou dados estáticos para armazenar pedidos.

## 2. Estado confirmado em `main`

### Stack e execução

- React 18 e React DOM 18.
- React Router DOM 7.
- Vite 8.
- Tailwind CSS 3.
- Node.js `22.x` em `package.json` (`engines`) e `.nvmrc`.
- Supabase PostgreSQL (projeto dedicado `turquia-lanches`, ref `sxpsewnfgpkppqivzvcc`, região `sa-east-1`).
- Vercel para hospedagem, funções server-side e variáveis de ambiente (projeto `turquia-marica`).
- Vitest para testes unitários.
- Playwright para testes E2E.
- axe-core/Playwright para verificações de acessibilidade.

Scripts confirmados em `package.json`:

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run check
npm run test:e2e
npm run test:e2e:demo
npm run audit:demo-leak
```

`npm run check` executa lint, testes Vitest e build. O workflow `.github/workflows/quality.yml` também executa E2E no Chromium.

### Banco de dados e infraestrutura Supabase

- Projeto hospedado: `turquia-lanches` (ref `sxpsewnfgpkppqivzvcc`) ativo na organização `lnpott's Org`.
- Migrations versionadas: `20261121205545_init_schema.sql`, `20261121211412_delivery_zones_and_triggers.sql`, `20261122214600_create_order_rpc.sql` (RPC `create_order`) e `20261123024500_create_order_grants.sql` (GRANT service_role).
- Tabelas criadas com Row Level Security (RLS) habilitado:
  - `categories` (com carga inicial dos 5 grupos da vitrine);
  - `products` (com carga inicial dos 9 itens do catálogo atual, preços em centavos);
  - `product_option_groups` e `product_options` (modelagem expansível para adicionais);
  - `delivery_zones` (suporte a regras de taxa por raio em km);
  - `orders` e `order_items` (estrutura para pedidos com snapshot de itens e dados de entrega).
- Variáveis de ambiente configuradas no projeto Vercel (`turquia-marica`) nos ambientes Production, Preview e Development:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (segredo restrito do servidor)

### Aplicação e rotas

Confirmado em `src/App.jsx`:

- `/` — Home institucional.
- `/cardapio` redireciona para `/#cardapio`.
- `/localizacao` redireciona para `/#localizacao`.
- `/sacola` — `CartPage`.
- `/checkout` — `CheckoutPage`.
- `/pedido/confirmado` — `OrderConfirmedPage`.
- `/admin` — `AdminPage`.
- `/visual-qa-demo` só com `VITE_VISUAL_QA_DEMO=true`.

Essas rotas existem. Isso não significa catálogo oficial nem pedido aceito pela loja.

### Cardápio

- `useCatalog` prefere o Supabase quando a resposta traz produtos **com** `image_url`.
- Se a leitura falha, vem vazia **ou** nenhum produto remoto tem foto, a vitrine cai de volta em `src/data/menu.js` com `priceProvisional: true` e R$ 29,90 (#49). O aviso de preço provisório deve permanecer visível.
- A carga seed no banco também é R$ 29,90 até a loja publicar preços reais via `/admin` ou Dashboard.
- Imagens do seed remoto só entram se `image_url` estiver preenchido; caso contrário o fallback local com foto ilustrativa é usado.

### Sacola e checkout (código presente, aceite aberto)

- `CartContext` guarda só `productId`, quantidade e `optionIds` em `localStorage`. Não guarda preço.
- A sacola e o checkout recalculam com `quoteCart` a partir do catálogo atual. Item que sumiu fica marcado e bloqueia o envio.
- Checkout só lista zonas ativas vindas do banco. Sem zona, não há taxa e o botão não envia. Não existe mais fallback de R$ 5,00 no cliente.
- Não há retirada. Não há janela de horário configurada: o texto do checkout diz isso. O horário publicado não bloqueia o pedido (D7 continua aberto).

### Backend e integrações

- `api/reviews.js` — avaliações Google Places.
- `src/lib/supabase.js` + `src/services/catalog.js` — leitura anon de categorias, produtos e zonas.
- `POST /api/orders` valida o body antes da RPC, chama `create_order` e devolve `reason` estável em falha (`RPC_PERMISSION_DENIED`, `RPC_NOT_FOUND`, `INVALID_SERVICE_KEY`, códigos de negócio).
- A mesma `idempotency_key` devolve o pedido já gravado em vez de duplicar.
- Em produção (22/11/2026) a gravação ainda falhava com 500 genérico; ver §3.1.
- Confirmação (`OrderConfirmedPage`) afirma só “pedido gravado”; não afirma aceite da loja nem pagamento. WhatsApp é opcional e não muda status.
- `api/admin.js` exige `ADMIN_TOKEN` no servidor (#50). Bearer errado → 401. Só depois usa service role. Processo em `documentacao/OPERACAO-ADMIN.md`.

### Contato conhecido no código

A fonte atual é `src/data/contact.js` e, no WhatsApp do pedido, a mesma constante em `whatsappOrder.js`:

- Endereço publicado: R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160.
- Horário publicado: terça a domingo, 17h às 00h; segunda fechado.
- WhatsApp publicado: `https://wa.me/5521964699374`.
- Instagram: `@turquialanches`.
- Telefone convencional: indisponível.

Esses dados foram lidos no código. Não foram reconfirmados com a loja nesta auditoria. Horário publicado não é janela de pedido.

## 3. Estado em 22/11/2026 (`53bdc06`)

Merges relevantes no mesmo dia: #47 (fases 2–5 técnicas), #48 (fases 6–8 em código/docs), #49 (cardápio provisório de volta), #50 (auth do admin).

| Tema | Realidade no código | Aceite de loja |
|---|---|---|
| Catálogo | Supabase se houver foto; senão `menu.js` provisório | **Não** — preços oficiais e fotos reais pendentes (D1) |
| Sacola | IDs + `quoteCart`; sem preço confiado no storage | Técnico ok; depende de catálogo real |
| Checkout | Só entrega; zona do banco; sem taxa inventada no cliente | **Parcial** — D3/D4/D7 |
| Pedido | RPC `create_order` + idempotência no código | **Bloqueado** até migration/grants e service role corretos no remoto |
| WhatsApp | Após persistência; texto não marca enviado/aceito/pago | Canal a confirmar (D5) |
| Admin | `/admin` + `ADMIN_TOKEN` server-side | Processo existe em doc; treino da loja pendente |
| Lançamento | Checklist em `documentacao/CHECKLIST-LANCAMENTO.md` | **Não assinado** |

O que ainda impede “pronto para operação real”:

1. Aplicar `create_order` + grants no Supabase de produção e validar um pedido de ponta a ponta.
2. Publicar preços e fotos reais (sair do seed/provisório R$ 29,90).
3. Confirmar zonas, WhatsApp operacional e regras de pagamento/horário com a loja.
4. Preencher e assinar o checklist de lançamento.

## 3.1 Teste de gravação (22/11/2026 ~23:30 -03)

`POST https://turquia-marica.vercel.app/api/orders` com payload válido (zona `zone-1`, produto `combo-1`) retornou **HTTP 500** genérico `ORDER_REJECTED` em todos os cenários (válido, zona inválida, sacola vazia). Não era `503 SUPABASE_NOT_CONFIGURED`: URL e alguma service key existem no servidor.

Leitura REST com `anon` continua OK (categorias, 9 produtos seed, 3 zonas). A função `create_order` existe; chamada direta com `anon` responde `permission denied` (esperado).

Interpretação: falha na execução da RPC com a chave do servidor (service role incorreta, sem `EXECUTE`, ou erro não mapeado). O handler foi endurecido para validar o body antes da RPC e devolver `reason` estável (`RPC_PERMISSION_DENIED`, `RPC_NOT_FOUND`, `INVALID_SERVICE_KEY`, etc.). Migration `20261123024500_create_order_grants.sql` reafirma `GRANT EXECUTE` à `service_role` e `NOTIFY pgrst, 'reload schema'`.

**Ainda necessário em produção:** aplicar essa migration no Supabase, conferir `SUPABASE_SERVICE_ROLE_KEY` na Vercel e repetir o POST até obter `201` com `orderNumber`.

## 4. Arquitetura aprovada para o produto futuro

### Supabase

Fonte persistente para:
- categorias;
- produtos;
- preços;
- disponibilidade;
- opcionais e seus acréscimos;
- pedidos;
- itens e opcionais congelados no momento da compra.

### Frontend

React continua responsável pela experiência de navegação:
- consultar catálogo publicado;
- exibir preço e disponibilidade;
- manter sacola temporária no navegador;
- coletar dados necessários para o pedido;
- apresentar confirmação somente após resposta persistida do servidor.

O navegador não define o preço final.

### Servidor

A Vercel recebe a solicitação de pedido e valida:
- método e formato;
- campos obrigatórios;
- quantidade e IDs;
- disponibilidade atual;
- preço atual no banco;
- opcionais válidos;
- regras de entrega/retirada;
- idempotência e duplicidade.

A gravação de pedido, itens e opcionais deve ser atômica, preferencialmente por função transacional PostgreSQL/RPC no Supabase. Não gravar cabeçalho e itens em chamadas independentes sem transação.

### WhatsApp

Depois da confirmação de persistência:
- apresentar número/referência e resumo do pedido;
- oferecer botão para abrir WhatsApp com mensagem estruturada;
- não marcar pedido como enviado, aceito ou pago apenas porque o navegador abriu o WhatsApp;
- preservar o pedido no Supabase mesmo se o cliente fechar a página ou não enviar a mensagem.

## 5. Segurança e privacidade

- `SUPABASE_URL` e chave pública/anon podem ser usadas no frontend, com RLS corretamente configurado.
- `SUPABASE_SERVICE_ROLE_KEY` é segredo exclusivo do servidor.
- Nunca usar prefixo `VITE_` em service role, tokens ou segredos.
- Visitantes só podem ler dados publicados conforme políticas RLS.
- Visitantes não podem listar, ler, alterar ou apagar pedidos de outros clientes.
- Criação de pedidos ocorre por endpoint server-side; não liberar INSERT público irrestrito em `orders`.
- Validar e limitar payload, quantidades, texto e frequência.
- Não armazenar dados de cartão.
- Definir aviso de privacidade, finalidade, retenção e acesso aos dados pessoais antes do lançamento.

## 6. Regras de governança

1. `main` é a referência inicial desta revisão.
2. Criar branch nova a partir do `main` atualizado para cada lote.
3. Uma fase por PR, com escopo explícito.
4. Não implementar preço, entrega, pagamento ou prazo por suposição.
5. Atualizar este guia quando o estado real do código mudar.
6. Atualizar o roadmap somente com evidência de implementação e validação.
7. Não declarar fase concluída apenas porque o código foi escrito.
8. Executar `npm run check` e `npm run test:e2e` nas mudanças aplicáveis.
9. Registrar decisões comerciais e evidências no repositório.
10. Não confundir abrir WhatsApp com mensagem enviada ou pedido aceito.
