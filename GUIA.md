# GUIA — estado atual e direção aprovada

> Este documento separa o que está implementado em `main` do que é apenas planejado.
> Base da revisão: `main` em `18ab1eb` (22/11/2026).
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
- Migrations versionadas: `20261121205545_init_schema.sql` e `20261121211412_delivery_zones_and_triggers.sql`.
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

- A vitrine tenta ler o Supabase em `src/hooks/useCatalog.js` (`categories`, `products`, `delivery_zones`).
- Preço vindo do banco é `price_cents`, exibido em reais. Produto do banco sai com `isMock: false`.
- Se a consulta volta vazia **ou** falha, o hook cai em `src/data/menu.js`. Esse fallback tem nove itens, preço uniforme `R$ 29,90` e categorias em `construction`.
- Imagens de produto e categoria continuam provisórias (`documentacao/ASSETS.md`).
- A Fase 2 **não** está aceita: erro de rede vira cardápio estático, e o preço de demonstração ainda pode aparecer como se fosse o da loja.

### Sacola e checkout (código presente, aceite aberto)

- `CartContext` guarda itens em `localStorage` (`turquia_cart_items_v1`).
- Preço gravado na sacola usa `product.price_cents` ou, se faltar, `2990`. O resumo local não recalcula pelo catálogo atual.
- Checkout só trata entrega. O raio padrão no formulário é `2.5` km, digitado pelo cliente. Taxa cai em `500` centavos se não houver zona casada.
- Não há fluxo de retirada. Não há validação de horário de aceite.

### Backend e integrações

- `api/reviews.js` — avaliações Google Places.
- `src/lib/supabase.js` + `src/services/catalog.js` — leitura anon de categorias, produtos e zonas.
- `POST /api/orders` (`api/orders.js`) usa service role. Recalcula preço unitário no banco, rejeita produto inativo, calcula taxa por zona (ou `500` centavos) e grava `orders` + `order_items` com snapshot. Status inicial `pending`.
- A gravação **não** é uma transação SQL: insere o pedido e depois os itens; se os itens falham, apaga o pedido. Não há chave de idempotência. Opcionais da sacola são copiados, mas o total do servidor não soma o preço deles.
- `src/services/whatsappOrder.js` monta `wa.me/5521964699374` depois da resposta persistida. Abrir o link não marca pedido enviado, aceito ou pago.
- `api/admin.js` + `/admin` listam pedidos/produtos e alteram preço e status com token Bearer guardado no `localStorage`. Não substitui política de acesso do Supabase Dashboard.

### Contato conhecido no código

A fonte atual é `src/data/contact.js` e, no WhatsApp do pedido, a mesma constante em `whatsappOrder.js`:

- Endereço publicado: R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160.
- Horário publicado: terça a domingo, 17h às 00h; segunda fechado.
- WhatsApp publicado: `https://wa.me/5521964699374`.
- Instagram: `@turquialanches`.
- Telefone convencional: indisponível.

Esses dados foram lidos no código. Não foram reconfirmados com a loja nesta auditoria. Horário publicado não é janela de pedido.

## 3. Auditoria de 22/11/2026

Feita em `main` (`18ab1eb`). O que os documentos ainda diziam e o código desmente:

| Afirmação antiga | Evidência |
|---|---|
| Não há sacola, checkout nem pedido | Rotas em `src/App.jsx` |
| Não há cliente Supabase nem `api` de pedidos | `src/services/catalog.js`, `api/orders.js` |
| Node `>=22.x` | `package.json` está em `22.x` |

O que continua verdadeiro e impede declarar fase pronta:

- Catálogo comercial oficial (D1) não foi validado. Fallback de `R$ 29,90` ainda entra na UI.
- Preço da sacola pode divergir do banco até o `POST /api/orders`.
- Pedido + itens não são uma transação; retry pode duplicar.
- Entrega presume raio informado pelo cliente e taxa fallback de R$ 5,00.
- Pagamento no checkout (`card_delivery`, `cash_delivery`, `pix_delivery`) não tem confirmação operacional registrada neste PR.
- Admin por token no navegador não é o processo operacional da Fase 7.

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
