# ROADMAP — plataforma digital Turquia Lanches

> Este documento descreve o produto-alvo e a sequência de implantação.
> O estado implementado está em `GUIA.md`.
> Revisão documental baseada em `main` (`18ab1eb`), em 22/11/2026.
> Supabase é obrigatório para catálogo, preços e pedidos. Esta decisão não é opcional nem depende de o WhatsApp ser suficiente.

## 1. Objetivo do produto

Transformar o site institucional da Turquia Lanches em uma plataforma própria, com portfólio completo, catálogo comercial ativo e fluxo de pedidos persistido.

O cliente deverá conseguir:

1. conhecer a loja, ambiente, localização, canais e informações institucionais;
2. consultar categorias e produtos ativos;
3. visualizar preços oficiais, imagens aprovadas, descrições e opcionais;
4. selecionar produtos e quantidades;
5. montar e revisar uma sacola;
6. escolher entrega ou retirada, conforme modalidades realmente oferecidas;
7. informar os dados necessários;
8. visualizar subtotal, taxa e total calculados com valores oficiais;
9. finalizar e registrar o pedido no Supabase;
10. receber uma referência e resumo;
11. opcionalmente abrir o WhatsApp com o resumo estruturado para comunicação com a loja.

O sistema não deve alegar pagamento realizado, pedido aceito pela loja ou mensagem enviada sem confirmação técnica correspondente.

## 2. Decisões arquiteturais obrigatórias

| Tema | Decisão |
|---|---|
| Banco | Supabase PostgreSQL |
| Catálogo | Categorias, produtos, preços e disponibilidade persistidos no Supabase |
| Pedidos | Todo pedido finalizado deve ser gravado no Supabase |
| Itens | Salvar snapshots de nome, preço, quantidade e opcionais |
| Autoridade de preço | Servidor/banco, nunca o navegador |
| Atomicidade | Pedido, itens e opcionais em uma transação |
| WhatsApp | Canal complementar após persistência, nunca armazenamento principal |
| Backend | Funções server-side da Vercel, alinhadas ao padrão já usado em `api/reviews.js` |
| Segredos | Somente variáveis server-side protegidas na Vercel |
| Autenticação do cliente | Fora do MVP, salvo decisão posterior fundamentada |
| Administração inicial | Supabase Dashboard com acesso restrito; painel próprio é evolução posterior |
| Pagamento online | Fora do MVP até contratação e integração de gateway |
| Marketplace | Não reintroduzir iFood ou outro marketplace sem decisão explícita |

## 3. Estado auditado em 22/11/2026

O inventário vivo está no `GUIA.md`. Resumo para não tratar código existente como fase aceita:

- Leitura de catálogo no Supabase existe, com fallback estático de demonstração.
- Sacola em `localStorage`, checkout só de entrega, `POST /api/orders` e link de WhatsApp existem.
- Pedido e itens não são uma transação; não há idempotência; opcionais não entram no total do servidor.
- Taxa fallback de 500 centavos e raio digitado pelo cliente não são regra oficial (D3, D4).
- Admin em `/admin` existe e não equivale à Fase 7.

Nenhum desses itens fecha o aceite da fase correspondente.

## 4. Bloqueios comerciais

A fase dependente não começa enquanto a decisão correspondente não estiver confirmada pela loja.

| ID | Informação/decisão | Fases afetadas | Regra |
|---|---|---|---|
| D1 | Catálogo oficial: nomes, categorias, descrições, fotos e preços | 1–2 | Não vender itens ou preços de demonstração |
| D2 | Opcionais, tamanhos, complementos e acréscimos | 2–3 | Só cadastrar o que existir e tiver preço confirmado |
| D3 | Entrega, retirada ou ambas | 4 | Não presumir modalidade |
| D4 | Área atendida, bairros/raio, taxa, pedido mínimo e prazo | 4 | Não calcular nem prometer entrega sem regra oficial |
| D5 | WhatsApp que receberá o resumo do pedido | 5 | Confirmar canal e formato operacional |
| D6 | Pagamento aceito e momento do pagamento | 5 | Não mostrar opção não confirmada |
| D7 | Horários em que o sistema aceita pedidos e exceções | 4–5 | Horário comercial publicado não equivale automaticamente a janela de pedidos |
| D8 | Responsável e processo de atualização do catálogo | 1 e 7 | Definir quem publica preços e disponibilidade |
| D9 | Dados obrigatórios do cliente e política de privacidade/retenção | 4–5 | Minimização de dados e finalidade explícita |
| D10 | Projeto Supabase, ambientes e responsáveis pelo acesso | 0–1 | Separar desenvolvimento e produção; nunca compartilhar service role |

A lista detalhada está em `documentacao/DECISOES-PENDENTES.md`.

## 5. Fases de implantação

Cada fase deve ser entregue em PR separado, salvo dependência técnica que justifique divisão menor. A fase só pode ser marcada como concluída após validação e evidência.

| Fase | Entrega | Dependências / bloqueios | Status |
|---|---|---|---|
| 0 | Alinhamento documental, inventário técnico, confirmação de ambiente e decisões | Nenhuma alteração funcional | **Concluída** (Decisões D1-D10 confirmadas em `documentacao/DECISOES-PENDENTES.md`) |
| 1 | Projeto Supabase, schema inicial, RLS, migrations e configuração segura dos ambientes | D10; política de acesso aprovada | **Concluída** na fundação (projeto `sxpsewnfgpkppqivzvcc`, duas migrations no repo, envs na Vercel). Backup e rotação de segredo não foram reauditados neste PR |
| 2 | Catálogo real vindo do Supabase, com categorias, produtos, preços, imagens e disponibilidade | D1, D2, D8 | **Aceite técnico no código.** A UI não troca falha por `menu.js`. A carga do banco ainda é o seed de R$ 29,90 até a loja publicar preço real |
| 3 | Sacola, quantidades, opcionais e resumo calculado; estado local apenas como conveniência | Fase 2; D2 | **Aceite técnico no código.** Sacola sem preço local; total recalculado pelo catálogo; item ausente bloqueia |
| 4 | Dados do cliente, entrega/retirada, validação de área, taxa, horário e total | D3, D4, D7, D9 | **Parcial.** Taxa só da zona ativa. Sem retirada. Horário de aceite não configurado (D7) |
| 5 | Endpoint server-side de finalização e gravação transacional de pedido, itens e snapshots | Fases 1–4; D5, D6, D9 | **Código da transação e da idempotência pronto.** Depende de aplicar `create_order` no Supabase. Pagamento na entrega segue o constraint já existente |
| 6 | Confirmação do pedido e botão opcional de WhatsApp com resumo gerado a partir do pedido persistido | Fase 5; D5 | **Parcial, sem aceite.** `whatsappOrder.js` monta `wa.me` após o POST; não marca enviado/aceito/pago |
| 7 | Operação do catálogo e acompanhamento de pedidos; começar com Supabase Dashboard restrito e avaliar painel próprio | D8; requisitos operacionais | **Parcial, sem aceite.** `/admin` com token no navegador; processo da loja não documentado como aceito |
| 8 | QA integrado, segurança, acessibilidade, monitoramento, contingência e lançamento gradual | Fases anteriores aprovadas | Pendente |

### Fase 0 — alinhamento e inventário

- Resolver contradições entre `README.md`, `GUIA.md`, `ROADMAP.md` e regras Turquia do `AGENTS.md`.
- Auditar `main` localmente antes de editar código.
- Confirmar que não existe integração Supabase preexistente não localizada na inspeção remota inicial.
- Confirmar proprietários, ambientes e acesso ao projeto Supabase.
- Registrar D1–D10 e bloqueios.

**Aceite:** documentação coerente, decisões registradas e plano técnico revisado.

### Fase 1 — fundação Supabase

- Criar ou confirmar projeto Supabase da Turquia.
- Separar ambientes de desenvolvimento e produção.
- Adicionar migrations versionadas em `supabase/migrations/`.
- Criar tabelas, constraints, índices, RLS e políticas.
- Configurar variáveis server-side na Vercel e variáveis públicas estritamente necessárias.
- Documentar backup, recuperação e rotação de segredos.

**Aceite:** migrations aplicáveis em ambiente de desenvolvimento; RLS testado com anon e service role; nenhum segredo no bundle, Git ou logs.

### Fase 2 — catálogo oficial

- Migrar dados comerciais confirmados para o Supabase.
- Implementar leitura de categorias e produtos publicados.
- Usar valores monetários em centavos (`price_cents`).
- Exibir indisponibilidade conforme regra definida.
- Preservar imagens ilustrativas fora do catálogo vendável até aprovação.
- Remover dependência de preço comercial hardcoded no frontend.

**Aceite:** UI apresenta dados retornados pelo Supabase; preço e status conferem com a base; erro de conexão não transforma catálogo vazio em sucesso falso.

### Fase 3 — sacola

- Adicionar estado de sacola e persistência local apenas para conveniência.
- Persistir identificadores, quantidades e seleções, não confiar em preço local.
- Recalcular exibição a partir do catálogo atual.
- Tratar item removido, indisponível ou preço alterado.
- Não criar pedido nesta fase.

**Aceite:** adicionar, alterar quantidade, remover, atualizar e recuperar sacola sem totais divergentes.

### Fase 4 — dados e modalidade

- Implementar apenas modalidade aprovada.
- Validar endereço/área com regra oficial.
- Calcular taxa no servidor com tabela/regra confirmada.
- Validar horário de aceitação e exceções.
- Exibir claramente subtotal, taxa e total.
- Coletar somente dados pessoais necessários.

**Aceite:** cenários dentro/fora da área, horário aberto/fechado, retirada/entrega e taxa conferidos com casos de teste aprovados pela loja.

### Fase 5 — gravação transacional de pedidos

- Criar endpoint server-side, por exemplo `POST /api/orders`.
- Validar payload e normalizar os dados.
- Consultar produtos/opcionais atuais no banco.
- Recalcular preços, subtotal, taxa e total no servidor/banco.
- Criar pedido, itens e opcionais com snapshots na mesma transação.
- Implementar idempotência para impedir duplicidade em retry.
- Retornar apenas referência e resumo necessários ao cliente.
- Registrar estado inicial como `pending_confirmation` ou equivalente acordado.

**Aceite:** pedido e todos os itens persistidos atomicamente; erro não deixa pedido parcial; retry idempotente; cliente não consegue alterar o total enviando preço adulterado.

### Fase 6 — WhatsApp após persistência

- Gerar mensagem usando o pedido confirmado no banco.
- Oferecer botão para abrir o WhatsApp.
- Não depender da abertura do WhatsApp para salvar o pedido.
- Não marcar `sent`, `accepted` ou `paid` por inferência do navegador.
- Registrar no máximo o evento de clique/abertura, se houver finalidade operacional e isso for claramente nomeado.

**Aceite:** pedido permanece consultável no Supabase mesmo sem abertura/envio de WhatsApp; texto contém referência, itens e total consistentes.

### Fase 7 — operação e administração

- Definir responsável por manter catálogo, preços, disponibilidade e pedidos.
- Começar com acesso restrito ao Supabase Dashboard se for suficiente.
- Avaliar painel administrativo próprio apenas quando houver requisitos operacionais claros.
- Definir papéis, autenticação, trilha de auditoria e procedimento de alteração.
- Não expor painel administrativo ao público.

**Aceite:** processo operacional documentado e testado por pessoa autorizada.

### Fase 8 — lançamento

- Testes unitários, integração, E2E, acessibilidade e responsividade.
- Testes de RLS e tentativa de acesso cruzado a pedidos.
- Testes de preço adulterado, produto indisponível, retry, timeout e falha de banco.
- Testes de WhatsApp sem envio e com número ausente.
- Verificação de logs sem dados pessoais desnecessários.
- Configuração de alertas, backups e procedimento de rollback.
- Lançamento gradual após aprovação da loja.

**Aceite:** checklist de lançamento assinado, sem falhas críticas e com recuperação testada.

## 6. Modelo de dados proposto

O esquema final deve ser validado antes da migration inicial. Modelo lógico sugerido:

| Entidade | Responsabilidade | Campos importantes |
|---|---|---|
| `menu_categories` | Categorias do catálogo | `id`, `name`, `slug`, `sort_order`, `is_active` |
| `menu_items` | Produtos e preços | `id`, `category_id`, `name`, `description`, `price_cents`, `image_path`, `is_published`, `is_available` |
| `menu_item_options` | Opcionais/acréscimos | `id`, `menu_item_id`, `name`, `price_delta_cents`, `is_available` |
| `orders` | Cabeçalho do pedido | `id`, `order_number`, `status`, `fulfillment_type`, dados mínimos do cliente, subtotal/taxa/total em centavos, `idempotency_key`, timestamps |
| `order_items` | Snapshot de cada produto | `order_id`, `menu_item_id` opcional, `item_name_snapshot`, `unit_price_cents_snapshot`, `quantity`, `line_total_cents` |
| `order_item_options` | Snapshot de cada opcional | `order_item_id`, `option_name_snapshot`, `price_delta_cents_snapshot`, quantidade, total |

Regras:
- Valores monetários em inteiro de centavos, moeda BRL.
- `price_cents >= 0`; quantidades inteiras dentro de limites definidos.
- Não depender de JOIN com o catálogo atual para reconstruir pedido antigo.
- Snapshots preservam o nome e o preço praticado na hora da compra.
- Exclusão de produto não deve apagar histórico de pedido.
- Adicionar índices para status/data e chaves de consulta operacional.
- Definir política de retenção de dados pessoais.

## 7. Segurança, RLS e fronteiras de confiança

- RLS habilitado em todas as tabelas expostas.
- `anon` pode ler somente categorias/produtos publicados e dados públicos necessários.
- O cliente não pode ler pedidos nem pedidos de outros clientes.
- Não liberar INSERT público direto em `orders`, `order_items` ou `order_item_options`.
- A criação ocorre por backend confiável e transação no PostgreSQL.
- `SUPABASE_SERVICE_ROLE_KEY` somente em ambiente server-side protegido.
- Nunca prefixar service role com `VITE_`.
- Validar input, tamanho, tipos, quantidade, rate limit e idempotência.
- Não armazenar dados de cartão.
- Não registrar endereço/telefone em logs de aplicação sem necessidade.
- Separar ambientes e credenciais; não usar banco de produção em teste destrutivo.

## 8. Estados e semântica

Estados iniciais sugeridos, sujeitos à aprovação operacional:

- `pending_confirmation`: pedido gravado, aguardando confirmação humana da loja.
- `confirmed`: loja confirmou.
- `preparing`: em preparo.
- `ready`: pronto para retirada/expedição.
- `out_for_delivery`: saiu para entrega, se aplicável.
- `completed`: concluído.
- `cancelled`: cancelado.
- `rejected`: recusado pela loja.

Abrir WhatsApp não altera automaticamente o estado. “Pedido registrado” significa persistência concluída; não significa que a loja aceitou ou que o cliente pagou.

## 9. Critérios gerais de qualidade

Em cada PR aplicável:
- `npm run check`;
- `npm run test:e2e`;
- testes específicos de integração Supabase;
- RLS verificado com perfis anon/autorizado;
- mobile 390 px e desktop 1280 px, além dos viewports já cobertos;
- sem overflow horizontal;
- console sem erros;
- estados de carregamento, vazio e falha tratados;
- nenhuma credencial em artefatos públicos;
- documentação atualizada.

## 10. Fora do MVP

- Aplicativo nativo.
- Login obrigatório do cliente.
- Programa de fidelidade.
- Integração com iFood ou marketplace.
- Pagamento online sem gateway contratado.
- Rastreamento de motoboy.
- Gestão de estoque avançada.
- Painel administrativo próprio antes de comprovar necessidade.
- Automação de WhatsApp Business/API sem decisão e contratação específicas.

## 11. Regra de avanço

Não pular fases por conveniência. Uma fase pode ser dividida em PRs menores, mas não pode ser declarada concluída sem critérios de aceite, testes e evidências. Se uma decisão comercial estiver pendente, implementar apenas o que não dependa dela e manter a funcionalidade bloqueada em produção.
