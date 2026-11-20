# Plano de Implantação: Aba "Faça seu Pedido" e Canal Próprio de Vendas

> **Status:** PLANEJADO — Aguardando autorização para execução em branch dedicada.  
> **Projeto:** Turquia Lanches (Parque Nanci, Maricá - RJ)  
> **Data:** 20/11/2026  
> **Objetivo:** Estabelecer a aba e fluxo completo de **"Faça seu pedido"** (`#pedido`), aproveitando as fotografias e itens de exemplo já disponíveis no repositório, viabilizando vendas diretas sem comissões do iFood.

---

## 1. Contexto e Motivação do Negócio

Atualmente, o site da Turquia Lanches direciona todo o fluxo digital de delivery para o marketplace do iFood.

### 1.1 Gargalos do Modelo Atual

1. **Taxas Elevadas:** Comissões entre 12% e 27%+ por pedido reduzem a rentabilidade da operação.
2. **Perda de Retenção:** O cliente é cadastrado na base do iFood, impossibilitando campanhas diretas de fidelização por WhatsApp ou promoções personalizadas.
3. **Concorrência Visual:** No aplicativo do marketplace, o usuário é exposto a dezenas de estabelecimentos concorrentes em Maricá.

### 1.2 Proposta de Valor do Canal Direto

- **0% de comissão:** Margem integral preservada para a Turquia Lanches.
- **Relacionamento Direto:** Cada pedido gera ou atualiza o contato do cliente na agenda oficial do WhatsApp (`+55 21 96469-9374`).
- **Agilidade e Sem Custos de Mensalidade:** Aproveitamento da infraestrutura React/Vite já implantada, sem necessidade de contratar plataformas terceiras no estágio inicial.

---

## 2. Acervo e Dados Existentes Utilizados como Exemplo

Conforme o princípio de integridade e não-invenção do projeto, utilizaremos os itens e fotografias já catalogados no repositório:

| Produto | Categoria | Preço de Exemplo | Imagem Local | Arquivo de Origem |
|---|---|---|---|---|
| **Baca Burger** | Lanches | R$ 29,90 | `Baca.jpg` | `src/assets/images/products/Baca.jpg` |
| **Passa Burger** | Lanches | R$ 29,90 | `PASSA.jpg` | `src/assets/images/products/PASSA.jpg` |
| **X-Turquia** | Lanches | R$ 29,90 | `X.jpg` | `src/assets/images/products/X.jpg` |
| **Pizza Teste** | Lanches / Pizzas | R$ 29,90 | `PIZZA.jpg` | `src/assets/images/products/PIZZA.jpg` |
| **Tábua Mista** | Combos | R$ 29,90 | `tabua.jpg` | `src/assets/images/products/tabua.jpg` |
| **Tábua Cama** | Combos | R$ 29,90 | `TABUCAMA.jpg` | `src/assets/images/products/TABUCAMA.jpg` |
| **Porção de Batata** | Porções / Combos | R$ 29,90 | `BATATA.jpg` | `src/assets/images/products/BATATA.jpg` |
| **Rings de Cebola** | Porções / Combos | R$ 29,90 | `cebola.jpg` | `src/assets/images/products/cebola.jpg` |
| **Pi Doce** | Sobremesas | R$ 29,90 | `PIDOCE.jpg` | `src/assets/images/products/PIDOCE.jpg` |

> *Nota de transparência comercial:* Na seção de pedido é exibida a indicação explícita de que os preços e itens são de referência do cardápio e que a confirmação dos valores finais ocorre diretamente no WhatsApp do balcão.

---

## 3. Arquitetura da Solução

```
[Header Desktop]          -> Link "Faça seu pedido" (#pedido) + Ícone da Sacola
[BottomNavBar Mobile]     -> Aba "Pedir" (#pedido) com ícone ShoppingBag
[Rota /pedido & SPA]      -> Redirecionamento automático para /#pedido
[Seção #pedido]           -> Grade de produtos com botão "Adicionar ao pedido"
[Modal de Personalização] -> Quantidade + Observações (ex.: ponto da carne, sem cebola)
[CartDrawer (Sacola)]     -> Resumo dos itens, Subtotal, Seleção Delivery/Retirada, Pagamento
[Finalização]             -> Disparo wa.me para WhatsApp Oficial (+55 21 96469-9374)
```

### 3.1 Formato da Mensagem Gerada para o WhatsApp

```text
🍔 *NOVO PEDIDO — TURQUIA LANCHES*
----------------------------------------
*Cliente:* Carlos Oliveira
*Telefone:* (21) 98765-4321
*Tipo:* 🛵 Entrega (Delivery)
*Endereço:* Rua das Gaivotas, 120, Apto 201
*Bairro:* Parque Nanci
*Ponto de ref.:* Próximo à praça principal
----------------------------------------
📋 *ITENS:*
• 1x Baca Burger (R$ 29,90)
   _Obs: Ponto bem passado, sem picles_
• 1x Porção de Batata (R$ 29,90)
----------------------------------------
*Subtotal:* R$ 59,80
*Taxa de entrega:* A combinar com atendente
*Pagamento:* Pix (chave enviada na confirmação)
----------------------------------------
_Pedido enviado pelo site oficial da Turquia Lanches_
```

---

## 4. Roteiro de Implementação por Sublotes

### Lote 70 — Módulo de Estado da Sacola e Regras de Negócio
- **Arquivos criados:**
  - `src/data/orderConfig.js`: Enums de modalidades de entrega (`delivery`, `pickup`), formas de pagamento (`pix`, `card`, `cash`) e lista de bairros de Maricá.
  - `src/utils/orderPayload.js`: Funções de cálculo de subtotal, formatação de moeda brasileira e montagem do texto codificado para o WhatsApp.
  - `src/hooks/useOrderCart.jsx`: Contexto e hook com persistência sincronizada no `localStorage` (`turquia_order_cart_v1`).

### Lote 71 — Componentes de Interface da Aba de Pedidos
- **Arquivos criados:**
  - `src/components/order/OrderSection.jsx`: Seção `#pedido` com apresentação dos produtos existentes, tags de preço, modal de observações/quantidade e botão "Adicionar ao pedido".
  - `src/components/order/CartDrawer.jsx`: Gaveta lateral deslizante acessível (com trap de foco, suporte a tecla Escape e leitores de tela), listagem dos itens, botões `+`/`-`/remover e formulário de checkout.
  - `src/components/order/CartFloatingTrigger.jsx`: Botão flutuante responsivo indicando a quantidade de itens e subtotal.

### Lote 72 — Integração com a Navegação e Páginas
- **Arquivos modificados:**
  - `src/components/layout/Header.jsx`: Adiciona `Faça seu pedido` aos `NAV_LINKS` (apontando para `#pedido`) e atalho da sacola.
  - `src/components/layout/BottomNavBar.jsx`: Adiciona a aba `Pedir` na barra fixa móvel.
  - `src/hooks/useActiveSection.js`: Inclui `'pedido'` na lista padrão de seções monitoradas por `IntersectionObserver`.
  - `src/layouts/MainLayout.jsx`: Envolve a aplicação com `OrderCartProvider` e injeta `CartDrawer` e `CartFloatingTrigger`.
  - `src/pages/Home.jsx`: Renderiza `<OrderSection />` com âncora `#pedido` posicionada entre os fatos rápidos e o cardápio.
  - `src/App.jsx`: Registra rotas SPA `/pedido` e `/faca-seu-pedido` com fallback para `/#pedido`.

### Lote 73 — Atualização de Testes e Validação Integrada
- **Arquivos criados/modificados:**
  - `tests/order-cart.test.jsx` (Novo): Cobertura unitária de adição de itens, cálculo de totais e formatação da mensagem do WhatsApp.
  - `tests/business-info.test.jsx`: Atualização dos testes de navegação para reconhecer os 5 links do Header/BottomNav.
  - `tests/e2e/site.spec.js`: Validação E2E com Playwright da rolagem até `#pedido`, abertura da sacola e acessibilidade via `@axe-core/playwright`.

---

## 5. Critérios de Aceite e Qualidade

1. **Testes Automatizados:**
   - `npm run check` (Lint + Vitest + Vite Build + Audit Demo Leak) 100% verde.
   - `npm run test:e2e` Playwright aprovado em desktop (1280 px) e mobile (320 px e 390 px).
2. **Acessibilidade:**
   - Zero violações críticas ou sérias no `@axe-core/playwright`.
   - Gerenciamento de foco ao abrir e fechar a sacola (tecla `Escape` fecha o drawer e retorna o foco ao botão de abertura).
3. **Responsividade:**
   - Sem corte de conteúdo pela `BottomNavBar` em viewports móveis (`320×568`, `375×667`, `390×844`).
   - Sem rolagem horizontal em qualquer largura de tela.
4. **Governança Git:**
   - Implementação realizada em branch isolada `feat/faca-seu-pedido`.
   - PR aberto contra `main` após todas as validações locais.

---

## 6. Procedimento de Rollback

Caso seja necessário reverter a funcionalidade:
1. Reverter o commit de merge da branch `feat/faca-seu-pedido`.
2. Como não há banco de dados nem migrations externas envolvidas (o estado é 100% local no cliente), a reversão é limpa, imediata e sem resíduos operacionais.
