# Plano técnico de implantação — catálogo, preços e pedidos

**Projeto:** Turquia Lanches  
**Base de análise:** branch `main`, consultada em 21/11/2026  
**Status deste documento:** proposta técnica; não representa código implantado.

## 1. Resultado esperado

Construir uma plataforma de pedidos própria integrada ao site institucional. O catálogo, preços e pedidos serão persistidos no Supabase. A finalização do pedido deve ocorrer no servidor, e o WhatsApp será oferecido depois da gravação como canal complementar.

## 2. Diagnóstico do repositório em `main`

### Confirmado

- React 18, React Router DOM 7, Vite 8 e Tailwind 3.
- Node 22 ou superior.
- Deploy Vercel.
- Função server-side existente em `api/reviews.js`.
- `src/App.jsx` não possui rotas de sacola, checkout ou pedido.
- `src/data/menu.js` fornece dados estáticos para a vitrine e contém nove produtos com preço `R$ 29,90`.
- Categorias estão marcadas como `construction`.
- Assets de categoria/produto são descritos como provisórios em `documentacao/ASSETS.md`.
- `package.json` não declara dependência `@supabase/supabase-js`.
- `.env.example` contém variáveis do Google Places, não do Supabase.
- Workflow CI executa `npm run check` e `npm run test:e2e`.

### Não localizado na inspeção remota de `main`

- diretório `supabase/` ou migrations;
- cliente Supabase;
- API de catálogo;
- API de pedidos;
- endpoint `/api/health`;
- tabelas ou políticas RLS do projeto.

Repetir a inspeção no checkout local antes de criar arquivos, para evitar duplicar trabalho que tenha sido integrado depois da consulta.

## 3. Arquitetura lógica

```text
Navegador (React)
  ├─ consulta catálogo publicado ───────────────► Supabase (anon + RLS)
  ├─ mantém sacola temporária
  └─ envia IDs, quantidades e dados mínimos
                    │
                    ▼
          Vercel Function: POST /api/orders
                    │
          valida payload e regras
                    │
                    ▼
          Supabase PostgreSQL
          ├─ valida catálogo/preços atuais
          ├─ cria pedido
          ├─ cria itens e opcionais (snapshots)
          └─ confirma transação atômica
                    │
                    ▼
          Resposta com referência do pedido
                    │
          UI oferece botão WhatsApp
                    │
                    ▼
          wa.me com resumo do pedido
```

O frontend nunca é fonte confiável de preço, taxa ou total. O WhatsApp não é fonte de persistência.

## 4. Responsabilidade de cada camada

### React

- Consultar categorias e produtos publicados.
- Exibir preço e disponibilidade retornados do catálogo.
- Gerenciar sacola para experiência do usuário.
- Enviar IDs de produtos/opcionais e quantidades.
- Mostrar erros de preço alterado, indisponibilidade ou falha.
- Mostrar confirmação apenas depois da resposta de persistência.

Não enviar preço como autoridade. Se o navegador enviar preço para conveniência de interface, o servidor deve ignorá-lo no cálculo.

### Supabase

- PostgreSQL como fonte persistente.
- Catálogo e preços.
- Disponibilidade.
- Pedidos e histórico.
- Snapshots dos itens e preços.
- RLS e constraints.
- Função transacional para criação do pedido.

### Vercel

- Endpoint server-side `POST /api/orders`.
- Validação de payload e regras operacionais.
- Acesso privilegiado ao Supabase somente por segredo server-side.
- Mensagens de erro seguras e logs sem dados pessoais desnecessários.
- Endpoint de health sem expor credenciais ou conteúdo sensível.

## 5. Modelo relacional sugerido

### `menu_categories`

- `id uuid primary key`
- `name text not null`
- `slug text unique not null`
- `sort_order integer not null default 0`
- `is_active boolean not null default true`
- `created_at`, `updated_at`

### `menu_items`

- `id uuid primary key`
- `category_id uuid references menu_categories`
- `name text not null`
- `slug text unique not null`
- `description text`
- `price_cents integer not null check (price_cents >= 0)`
- `image_path text`
- `is_published boolean not null default false`
- `is_available boolean not null default false`
- `sort_order integer not null default 0`
- `created_at`, `updated_at`

Separar publicação de disponibilidade permite que um produto permaneça visível como indisponível, se essa for a decisão de UX.

### `menu_item_options`

- `id uuid primary key`
- `menu_item_id uuid references menu_items`
- `name text not null`
- `price_delta_cents integer not null default 0`
- `is_available boolean not null default true`
- `sort_order integer not null default 0`

A estrutura de grupos de opcionais (obrigatório/opcional, mínimo/máximo de escolhas, exclusividade) deve ser adicionada somente depois de D2 ser definido.

### `orders`

- `id uuid primary key`
- `order_number` ou referência pública não enumerável, definida na implementação
- `status text/enum not null`
- `fulfillment_type text not null`
- `customer_name text not null`
- `customer_phone text not null`
- campos de endereço somente para entrega
- `customer_notes text`
- `subtotal_cents integer not null`
- `delivery_fee_cents integer not null`
- `total_cents integer not null`
- `currency text not null default 'BRL'`
- `idempotency_key uuid unique not null`
- `created_at`, `updated_at`

Definir limites de texto, validação de telefone, campos obrigatórios por modalidade e retenção antes do lançamento.

### `order_items`

- `id uuid primary key`
- `order_id uuid references orders`
- `menu_item_id uuid null references menu_items`
- `item_name_snapshot text not null`
- `unit_price_cents_snapshot integer not null`
- `quantity integer not null`
- `line_total_cents integer not null`

### `order_item_options`

- `id uuid primary key`
- `order_item_id uuid references order_items`
- `option_id uuid null references menu_item_options`
- `option_name_snapshot text not null`
- `price_delta_cents_snapshot integer not null`
- `quantity integer not null default 1`

Snapshots garantem que mudanças futuras no catálogo não reescrevam o histórico comercial de pedidos antigos.

## 6. Transação de criação de pedido

Preferir uma função PostgreSQL/RPC chamada pelo backend para fazer toda a operação dentro de uma única transação.

Fluxo proposto:

1. Receber identificador idempotente, modalidade, dados mínimos e linhas do pedido.
2. Validar o formato e os limites no endpoint.
3. A função transacional consulta produtos e opcionais atuais.
4. Recusar item não publicado, indisponível ou opção inválida.
5. Recalcular preço unitário, acréscimos, subtotal, taxa e total.
6. Inserir `orders`.
7. Inserir `order_items` com snapshots.
8. Inserir `order_item_options` com snapshots.
9. Confirmar tudo atomicamente.
10. Retornar ID/referência e totais calculados.

Se qualquer etapa falhar, nenhuma parte do pedido deve permanecer gravada. Retry com a mesma chave idempotente deve retornar o pedido existente ou resposta equivalente, sem duplicar.

O backend não deve aceitar do cliente `subtotal`, `delivery_fee` ou `total` como valores confiáveis. A taxa deve vir de regra oficial configurada no servidor/banco, depois de D4 ser confirmado.

## 7. RLS e privilégios

Políticas mínimas:

| Recurso | Visitante `anon` | Backend privilegiado |
|---|---|---|
| Categorias ativas | SELECT limitado | CRUD operacional |
| Produtos publicados | SELECT limitado | CRUD operacional |
| Opcionais públicos disponíveis | SELECT limitado | CRUD operacional |
| Pedidos | Sem SELECT/INSERT/UPDATE/DELETE direto | Operações autorizadas |
| Itens de pedidos | Sem acesso direto | Operações autorizadas |

- Ativar RLS em todas as tabelas expostas.
- Não criar policy pública para listar pedidos.
- Não expor `service_role`.
- Restringir EXECUTE da função transacional ao papel/credencial apropriado.
- Testar acesso anônimo e tentativa de leitura de pedido alheio.
- Não confiar apenas em esconder componentes no frontend.

## 8. Endpoints sugeridos

### `GET /api/health`

- Verifica configuração essencial sem retornar valores de variáveis.
- Resposta simples, sem dados de cliente ou detalhes internos.
- Pode verificar conectividade com Supabase de forma controlada, sem expor credenciais.

### Leitura de catálogo

Preferência inicial: frontend usa chave anon para SELECT público diretamente no Supabase, com RLS. Se houver necessidade de normalização/cache ou proteção de regras adicionais, avaliar endpoint server-side.

### `POST /api/orders`

- Único caminho público para criar pedido.
- Validar método, schema, tamanho, quantidades, IDs e campos.
- Rate limiting com solução compatível com ambiente serverless; não depender de memória local da função.
- Idempotência.
- Recalcular preço na transação.
- Responder com referência, status inicial e resumo.
- Não devolver dados sensíveis além do necessário.

## 9. WhatsApp

A mensagem deve ser montada com dados retornados do pedido persistido, por exemplo:

- referência do pedido;
- nome do cliente, se necessário;
- modalidade;
- itens, quantidades e opcionais;
- subtotal, taxa e total;
- observações relevantes.

Regras:
- gerar URL `wa.me` com texto codificado;
- oferecer a ação depois da persistência;
- manter a confirmação na aplicação mesmo se WhatsApp não abrir;
- não inferir envio ou leitura da mensagem;
- não mudar status para `confirmed` ou `paid` ao clicar;
- confirmar que o número de destino é o canal oficial autorizado.

## 10. Operação do catálogo

Primeiro ciclo:
- equipe autorizada atualiza categorias/produtos/preços no Supabase Dashboard;
- mudanças críticas são auditadas;
- publicação e disponibilidade são campos distintos;
- registrar responsável e data da alteração.

Painel administrativo próprio:
- não é pré-requisito do MVP;
- só iniciar quando o fluxo via Dashboard for insuficiente;
- exigir autenticação, papéis, trilha de auditoria e testes de autorização.

## 11. Variáveis de ambiente

Nomes sugeridos, sujeitos à implementação:

```dotenv
# Públicas, se o frontend acessar o catálogo diretamente com RLS
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Exclusivamente server-side
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Não é necessário duplicar todas as variáveis em todos os ambientes. A configuração final deve seguir o modo de acesso escolhido. `SUPABASE_SERVICE_ROLE_KEY` jamais pode receber prefixo `VITE_`, aparecer no bundle, ser commitada ou ser incluída em logs.

Separar desenvolvimento/preview/produção. Nunca copiar credenciais reais para `.env.example`.

## 12. Privacidade e proteção contra abuso

- Coletar apenas nome, telefone, endereço quando necessário e observações relevantes.
- Informar finalidade e canal de contato.
- Definir retenção e descarte dos dados.
- Não armazenar dados de cartão.
- Validar e limitar observações e demais campos livres.
- Adotar rate limiting e proteção contra spam.
- Evitar expor UUIDs ou referências que permitam consultar pedidos sem autenticação.
- Não permitir consulta pública de pedidos por número sequencial sem token seguro.
- Não incluir telefone/endereço em logs de analytics.

## 13. Falhas e contingência

| Falha | Comportamento |
|---|---|
| Supabase indisponível | Não finalizar; explicar que o pedido não foi registrado |
| Preço mudou | Atualizar resumo e pedir nova confirmação |
| Produto ficou indisponível | Bloquear finalização e indicar item |
| Timeout após envio | Consultar idempotência antes de permitir novo pedido |
| WhatsApp não abre | Pedido continua salvo; permitir copiar referência/resumo |
| Loja não confirma | Manter status pendente; não alegar aceitação |
| Configuração de entrega ausente | Desabilitar entrega; não inventar taxa |

## 14. Testes obrigatórios

- leitura pública somente de catálogo publicado;
- produto indisponível não pode ser comprado;
- preço adulterado no payload é ignorado;
- opção não vinculada ao produto é rejeitada;
- quantidades inválidas são rejeitadas;
- total recalculado coincide com banco;
- transação não deixa cabeçalho sem itens;
- retry não duplica;
- anon não consulta pedidos;
- cliente A não consulta pedido de cliente B;
- falha de banco não mostra confirmação falsa;
- clique WhatsApp não altera status de pedido;
- snapshots permanecem após alteração de preço/nome;
- mobile e desktop sem overflow;
- acessibilidade e erros de console.

## 15. Ordem de implementação

1. Resolver documentação e decisões.
2. Confirmar projeto e ambientes Supabase.
3. Criar migrations, RLS e testes de políticas.
4. Integrar leitura do catálogo.
5. Validar catálogo/preços oficiais.
6. Construir sacola.
7. Definir modalidade, entrega, horários e dados.
8. Construir endpoint e RPC transacional.
9. Implementar confirmação e WhatsApp.
10. Definir rotina operacional e lançar após QA.

## 16. Critério de conclusão

A implantação só estará concluída quando todos os pedidos finalizados forem persistidos, os totais forem calculados com dados confiáveis, os snapshots estiverem preservados, o acesso estiver protegido por RLS e backend, e a opção de WhatsApp funcionar sem ser confundida com persistência ou aceite.
