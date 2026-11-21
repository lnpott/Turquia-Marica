# GUIA — estado atual e direção aprovada

> Este documento separa o que está implementado em `main` do que é apenas planejado.
> Base da revisão: branch `main`, consultada em 21/11/2026.
> Não interpretar o roadmap como funcionalidade já disponível.

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
- Node.js 22 ou superior.
- Vercel para hospedagem e funções server-side.
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

### Aplicação e rotas

- `src/App.jsx` mantém a Home institucional em `/`.
- `/cardapio` redireciona para `/#cardapio`.
- `/localizacao` redireciona para `/#localizacao`.
- A rota de QA visual depende de `VITE_VISUAL_QA_DEMO=true`.
- Não existem rotas implementadas de sacola, checkout ou confirmação de pedido.
- O próprio comentário de `src/App.jsx` declara que não há canal de pedido no site.

### Cardápio

- `src/data/menu.js` é atualmente a fonte estática consumida pela vitrine.
- Há nove registros de produtos.
- Os preços encontrados são uniformemente `R$ 29,90`.
- As categorias estão marcadas como `construction`.
- A documentação de assets declara que imagens de categorias e produtos são provisórias/ilustrativas.
- Os registros existentes não podem ser promovidos automaticamente a catálogo oficial nem utilizados para pedidos reais sem validação comercial.

### Contato conhecido no código

A fonte atual é `src/data/contact.js`:

- Endereço publicado: R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160.
- Horário publicado: terça a domingo, 17h às 00h; segunda fechado.
- WhatsApp publicado: `https://wa.me/5521964699374`.
- Instagram: `@turquialanches`.
- Telefone convencional: indisponível.

Esses dados foram observados no código. Antes de usá-los para regras de aceitação de pedidos, a loja deve confirmar que continuam corretos e que o WhatsApp publicado é o canal operacional que receberá pedidos.

### Backend e integrações

- Existe uma função Vercel `api/reviews.js`, usada para consultar avaliações do Google Places.
- `.env.example` contém `GOOGLE_PLACE_ID` e `GOOGLE_MAPS_API_KEY`, destinados exclusivamente ao servidor.
- A função de avaliações é evidência de que o repositório já utiliza o padrão de funções server-side da Vercel.
- Não foi localizada integração Supabase no `main` consultado.
- Não foi localizado `supabase/`, migration SQL, cliente Supabase, API de pedidos ou endpoint `/api/health` no `main` consultado.
- Não há persistência de pedidos implementada.

A ausência foi verificada nos caminhos pesquisados; não equivale a uma auditoria byte a byte de todos os diretórios. Antes de implementar, o agente deve repetir a busca no checkout local.

## 3. Contradições documentais identificadas

A documentação existente em `main` contém afirmações incompatíveis entre si:

- `ROADMAP.md` descreve pedidos no futuro, mas condiciona o backend transacional a uma hipótese em que o WhatsApp não bastaria.
- `GUIA.md` contém trechos que proíbem checkout, pedidos e backend transacional, embora o novo objetivo os exija.
- `README.md` ainda declara que o site não é e-commerce e não encaminha pedidos.
- `GUIA.md` contém referências operacionais à branch `feat/sem-ifood` e afirma que `main` poderia estar atrás, embora esta revisão tenha sido feita diretamente em `main`.
- O texto do roadmap afirma que não haverá banco até uma fase posterior. Isso está revogado: Supabase é requisito estrutural obrigatório.

Este pacote propõe substituir essas instruções contraditórias. Não afirma que o repositório já foi alterado.

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
