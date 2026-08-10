# ROADMAP VIVO — Migração Turquia Lanches (HTML Estático → React/Vite)

> **Documentação operacional permanente da migração.** Atualizado ao final de cada lote.
> Qualquer agente futuro deve ler este arquivo antes de alterar o projeto.

---

## 1. Origem do projeto

| Item | Valor |
|:---|:---|
| **Projeto original** | Turquia Lanches / Turquia-Maricá (lanchonete em Parque Nanci, Maricá/RJ) |
| **Origem visual/UX** | Google Stitch |
| **ID do projeto Stitch** | `projects/10254386617209499733` |
| **Workspace Stitch** | `turquia-lanches-app` |
| **Repositório Git remoto** | `https://github.com/lnpott/Turquia-Marica.git` (branch `main`) |
| **Commit-base da reconstrução** | `9bccbf7` (feat: producao consolidada v3.0) — estado limpo antes do Lote 1 |
| **HTMLs locais de produção (base)** | `turquia_lanches_homepage_production/`, `index.html_homepage_production*/`, `turquia_lanches_card_pio_production/`, `turquia_lanches_sacola_production/`, `turquia_lanches_checkout_production/`, `turquia_lanches_confirma_o_production/`, `turquia_lanches_localiza_o_production/` (todos com `code.html` + `screen.png`) |
| **Design System** | `sabor_e_tradi_o/DESIGN.md` — paleta/tipografia/espaçamentos consolidados no `tailwind.config.cjs` |

---

## 2. Arquitetura adotada

- **Vite** (v5) como bundler/servidor de dev (`vite.config.js`, plugin `@vitejs/plugin-react`).
- **React 18** com JSX e `createRoot`.
- **React Router** (v6) com `BrowserRouter`/`Routes`/`Route`.
- **TailwindCSS 3** via `postcss.config.js` + `tailwind.config.cjs` (paleta completa do Stitch).
- **Context API + `useReducer`** para o carrinho (`src/contexts/CartContext.jsx`) — **implementado no Lote 6** (ações `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR_CART`, `SET_DELIVERY`); **Lote 8** adicionou `lastOrder` (snapshot do pedido concluído) + ação `PLACE_ORDER`.
- **Estrutura `src/`:**
  - `src/components/layout/` → Header, BottomNavBar, Footer
  - `src/components/ui/` → Button, Badge, QuantitySelector
  - `src/components/home/` → seções da Homepage
  - `src/components/product/` → ProductCard, CategoryCard, ProductHero, AddonsSelector, ObservationsField, AddToCartBar
  - `src/components/menu/` → CategoryFilterBar, ProductGrid
  - `src/components/cart/` → CartItem, CartSummary, EmptyCartState, CartBadge
  - `src/components/checkout/` → CheckoutField, DeliverySelector, AddressForm, PaymentSelector, OrderSummaryPanel
  - `src/components/confirmation/` → SuccessIcon, OrderSummaryConfirm, WhatsAppButton
  - `src/components/location/` → MapEmbed, ContactCard
  - `src/layouts/MainLayout.jsx` → Header + {children/Outlet} + Footer + BottomNavBar (prop `hideBottomNav` para fluxos lineares)
  - `src/pages/` → Home, Menu, ProductDetails, Cart, Checkout, Confirmation, Location (todas as 7 páginas do plano)
  - `src/data/` → `menu.js` (dados mock), `contact.js` (contatos reais — fonte única)
  - `src/utils/` → `format.js` (formatBRL)
  - `src/contexts/`, `src/styles/` (index.css)
- **Aplicação única responsiva** Mobile/Desktop via breakpoints Tailwind (`md:`, `lg:`, `xl:`) — sem rotas duplicadas.
- **Princípio de reutilização:** componentes globais extraídos dos HTMLs de produção e reutilizados entre páginas.

---

## 3. Hierarquia das fontes (ordem de autoridade)

| Fonte | Papel |
|:---|:---|
| **Stitch** | Referência visual/UX aprovada (telas mobile/desktop por página). |
| **HTML local de produção** | Fonte estrutural/código legado a ser migrado (extrair, não recriar). |
| **Design System** (`DESIGN.md` + `tailwind.config.cjs`) | Tokens visuais, tipografia, cores, espaçamento e componentes. |
| **Implementation Plan** (`implementation_plan.md`) | Ordem e escopo técnico da implementação (lotes). |
| **Agente (assistente)** | Executor das alterações no código. |
| **Orientação externa/ChatGPT** | Estratégia, sequência dos lotes, checkpoints e controle de escopo. |

---

## 4. Matriz de rastreabilidade

| Nome | Rota | Lote | Arquivo React | Origem HTML local | Ref. Stitch | Componentes reutilizados | Estado/lógica | Observações |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| Homepage | `/` | 3 | `src/pages/Home.jsx` + `src/components/home/*` | `index.html_homepage_production_final_audit/code.html` (base) + `index.html_homepage_production/`, `_fixed/` (conferência) | `7ca30246…` (Mobile Rebirth V3.1), `6bd252bd…` (Narrativa e Ritmo Desktop) | Header, BottomNavBar, Footer (via MainLayout), Button | Nenhum (estático) | CTA corrigido para `bg-primary text-white` (Stitch); tipografia DM Sans/Rubik; `max-w-[1280px]` |
| Cardápio | `/cardapio` | 4 | `src/pages/Menu.jsx`, `src/data/menu.js`, `src/components/product/*`, `src/components/menu/*` | `turquia_lanches_card_pio_production/code.html` | `a0c2d94e…` (Mobile Rebirth V3.1), `86a10f72…` (Cardápio Production - Final Audit) | Header, BottomNavBar, Footer (via MainLayout), Button, Badge, CategoryCard, ProductCard | Filtro local `useState` (`activeCategory`) — sem carrinho | `max-w-[1280px]` (corrigido do `1440px` local); botões "adicionar" visuais apenas (sem CartContext) |
| Detalhes do Produto | `/produto/:id` | 5 | `src/pages/ProductDetails.jsx` + `src/components/product/{ProductHero,AddonsSelector,ObservationsField,AddToCartBar}.jsx` | Não existe localmente (Stitch é a referência) | `73ceb944…` (desktop), `1150c4b8…` (mobile) | Header, BottomNavBar, Footer (via MainLayout), Button, Badge, QuantitySelector, ProductCard (link) | Estado local (qty, ponto da carne, adicionais, remoções, obs, preço calculado) | Preço calculado via `priceValue` (mock); payload local preparado para Lote 6 |
| Sacola | `/sacola` | 6 | `src/pages/Cart.jsx`, `src/contexts/CartContext.jsx`, `src/components/cart/*` | `turquia_lanches_sacola_production/code.html` | `cf81049c…` (Desktop), `184cdd73…` (Mobile) | Header (CartBadge), BottomNavBar (contador), Button, QuantitySelector, CartItem, CartSummary, EmptyCartState | `CartContext` (useReducer) + integração Produto → Sacola | Itens mesclados por `key` de personalização (addons/remoções/ponto/obs incluídos); taxa de entrega "A calcular"; checkout link placeholder
| Checkout | `/checkout` | 7 | `src/pages/Checkout.jsx`, `src/components/checkout/*` | `turquia_lanches_checkout_production/code.html` | `5027f9aa…` (Checkout Desktop — única ref; mobile adaptado) | Header (via MainLayout `hideBottomNav`), EmptyCartState, CheckoutField, DeliverySelector, AddressForm, PaymentSelector, OrderSummaryPanel | `CartContext` (`items`, `cartTotal`, `setDelivery`/SET_DELIVERY) + validação local | Fluxo linear sem BottomNavBar; entrega/retirada condiciona o endereço; pagamento PIX/Cartão/Dinheiro com troco; taxa "A calcular"/"Grátis"; CTA → `/confirmacao` (Lote 8) |
| Confirmação | `/confirmacao` | 8 | `src/pages/Confirmation.jsx`, `src/components/confirmation/*` | `turquia_lanches_confirma_o_production/code.html` | `824e366e…` | Header/Footer (MainLayout `hideBottomNav`), Button, WhatsAppIcon, formatBRL | `CartContext` (`lastOrder` via `PLACE_ORDER` no checkout) | Snapshot do pedido preservado após limpar a sacola; nº do pedido demonstrativo; CTA "Voltar ao Início" → `/` (plano) no lugar de "Acompanhar Pedido" (Lote 9) |
| Localização | `/localizacao` | 9 | `src/pages/Location.jsx`, `src/components/location/{MapEmbed,ContactCard}.jsx`, `src/data/contact.js` | `turquia_lanches_localiza_o_production/code.html` | `b4d2755a…` (Desktop), `4bf47c60…` (Mobile) | Header (link Localização — já existia), Footer (via MainLayout), WhatsAppIcon | Nenhum (página informativa estática) | Dados 100% reais do HTML (Parque Nanci, horário "Em breve", shre.ink, @turquialanches, Google Maps); mapa = imagem placeholder (sem iframe/API); sem HoursTable (HTML não define horários) |

---

## 5. Histórico dos lotes

### Lote 1 — Infraestrutura React/Vite — ✅ CONCLUÍDO
- **Objetivo:** transformar o repositório num projeto React funcional sem quebrar nada existente.
- **Arquivos principais:** `package.json` (react, react-dom, react-router-dom, @vitejs/plugin-react), `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `index.html` (entry Vite), `.gitignore`, `package-lock.json`.
- **Origem das referências:** `implementation_plan.md` (Lote 1).
- **Decisões:** versões React 18.3.1 / Router 6.26.2 / plugin-react 4.3.4; placeholder temporário em `/`.
- **Build:** ✅ `vite build` sem erros (33 módulos).
- **Status Git:** nada commitado/push; HTMLs de produção intactos.
- **Riscos:** aviso CJS/ESM do Vite (resolvido no Lote 2).
- **Deliberadamente NÃO implementado:** páginas, carrinho, design system (lotes posteriores).

### Lote 2 — Design System e Componentes Globais — ✅ CONCLUÍDO
- **Objetivo:** consolidar a paleta do Stitch no Tailwind e criar componentes globais de layout/UI.
- **Arquivos principais:** `tailwind.config.js` → **`tailwind.config.cjs`** (paleta completa, 47 cores), `postcss.config.js`, `src/styles/index.css` (`.ambient-shadow`, `.card-shadow`), `src/layouts/MainLayout.jsx`, `src/components/layout/{Header,BottomNavBar,Footer}.jsx`, `src/components/ui/{Button,Badge,QuantitySelector}.jsx`, `package.json` (`"type": "module"`), `index.html` (fontes Google).
- **Origem:** `sabor_e_tradi_o/DESIGN.md` + config Tailwind embutida nos HTMLs de produção (idêntica ao Stitch).
- **Decisões:** `"type": "module"` + `tailwind.config.cjs` (corrige aviso ESM/CJS sem quebrar CJS); `font-body` corrigido de Rubik → DM Sans; spacing `margin-desktop: 64px`, `stack-loose: 32px`; footer com `pb-24 md:pb-16` (não coberto pelo BottomNavBar); `.material-symbols-outlined` com `font-variation-settings` (fidelidade Stitch).
- **Build:** ✅ 38 módulos; CSS com tokens `#ae0011`/`#fdc008`/`#fff8f6`.
- **Status Git:** nada commitado/push; 0 HTMLs de produção modificados.
- **Deliberadamente NÃO implementado:** páginas (Lotes 3–9), CartContext.

### Lote 3 — Homepage `/` — ✅ CONCLUÍDO
- **Objetivo:** migrar a Homepage preservando fidelidade Stitch e reutilizando componentes globais.
- **Arquivos principais:** `src/pages/Home.jsx`, `src/components/home/{HeroSection,AmbienceSection,GallerySection,FoodHighlights,MenuPreviewSection}.jsx`, `src/App.jsx` (rota `/`).
- **Origem:** `index.html_homepage_production_final_audit/code.html` (base estrutural) — a versão que já aplica a correção Stitch (`bg-primary` nos CTAs).
- **Decisões:** CTA "PEÇA AGORA" com `bg-primary text-white`; 5 seções (Hero, Nosso Espaço, Momentos Turquia, O Irresistível, Cardápio); composição Mobile (1 col + hero mobile) e Desktop (grid 12-col) em **uma única implementação** responsiva.
- **Build:** ✅ 45 módulos; CSS 20.26 kB.
- **Status Git:** nada commitado/push; refs intactas.
- **Deliberadamente NÃO implementado:** demais páginas, CartContext, links de produto.

### Lote 4 — Cardápio `/cardapio` — ✅ CONCLUÍDO
- **Objetivo:** migrar o Cardápio, preparando a interface para futura integração com o carrinho, sem implementar `CartContext`.
- **Arquivos principais:** `src/data/menu.js`, `src/pages/Menu.jsx`, `src/components/product/{ProductCard,CategoryCard}.jsx`, `src/components/menu/{CategoryFilterBar,ProductGrid}.jsx`, `src/components/ui/Badge.jsx` (tom `primary`), `src/styles/index.css` (`.scrolling-wrapper`, `.card-shadow-hover`), `src/App.jsx` (rota `/cardapio`), `documentacao/ROADMAP_MIGRACAO.md`.
- **Origem:** `turquia_lanches_card_pio_production/code.html` (hero escuro, 5 categorias, combos com badge "Economize", "Mais Pedidos" com badges "Mais Pedido"/"Novo"/"Veggie", social proof omitido por decisão de escopo do plano — plano lista apenas filtro + grid).
- **Decisões:** `max-w-[1280px]` (corrigido do `1440px` local, conforme plano/Stitch); filtro de categorias com scroll horizontal (Mobile Rebirth V3.1) via `useState` local; botões "adicionar" **visuais apenas** (sem CartContext); preços demonstrativos `R$ --,--`; Badge estendido com tom `primary`; correções pós-revisão: âncora `#combos` adicionada, badge secondary com `text-on-background` (fidelidade Stitch), `role="group"` no filtro.
- **Build:** ✅ 52 módulos; CSS 24.69 kB; sem erros.
- **Status Git:** nada commitado/push; 0 HTMLs de produção modificados; `implementation_plan.md` intacto; checkpoint do Lote 4 aprovado.
- **Riscos:** preços mock; imagens hospedadas em `lh3.googleusercontent.com` (validadas no Lote 10).
- **Deliberadamente NÃO implementado:** Produto, Sacola, Checkout, Confirmação, Localização, CartContext, StickyCartBar mobile (previsto no plano, mas exige CartContext → Lote 6).

### Lote 5 — Detalhes do Produto `/produto/:id` — ✅ CONCLUÍDO
- **Objetivo:** criar a tela de Detalhes/Personalização do Produto (caso especial: **não existe HTML local** — o Stitch é a principal referência visual/UX).
- **Arquivos principais:** `src/pages/ProductDetails.jsx`, `src/components/product/{ProductHero,AddonsSelector,ObservationsField,AddToCartBar}.jsx`, `src/utils/format.js` (novo, `formatBRL` compartilhado), `src/data/menu.js` (estendido: `priceValue`, `allowedAddons`, `allowedRemovals`, `hasMeatPoint`, `meatPoints`, `addons`, `removals`), `src/components/product/ProductCard.jsx` (link → `/produto/:id`), `src/App.jsx` (rota `/produto/:id`).
- **Referências Stitch:** `73ceb944…` (Desktop), `1150c4b8…` (Mobile).
- **Componentes reutilizados:** Header, BottomNavBar, Footer (MainLayout), Button, Badge, QuantitySelector, ProductCard.
- **Decisões arquiteturais:** estado 100% local na tela (qty, ponto da carne, adicionais, remoções, observações) via `useState`/`useMemo`; preço calculado = `priceValue` + adicionais × qty; `formatBRL` extraído para `src/utils/format.js` (eliminou 4 duplicatas); reset de estado via `useEffect` ao trocar `product?.id`; barra `AddToCartBar` fixa no mobile (acima do BottomNavBar) e estática no desktop; aside `lg:sticky` apenas no desktop.
- **Lógica de personalização:** ponto da carne (radio, se `hasMeatPoint`), adicionais (checkboxes com preço, se `allowedAddons`), remoções (checkboxes, se `allowedRemovals`), observações (textarea), quantidade (QuantitySelector).
- **Cardápio → Produto:** `ProductCard` agora renderiza `Link` para `/produto/${product.id}` no card, título e botões "Adicionar" — aparência inalterada, apenas o comportamento de navegação foi adicionado.
- **ID inexistente:** tela "Produto não encontrado" com botão "Voltar ao Cardápio".
- **Limitações deliberadas (sem CartContext):** o payload é montado localmente e exibido apenas como feedback (`✓ Pronto para adicionar à sacola`); **não** há persistência global nem navegação para `/sacola`.
- **Correções pós-revisão:** `formatBRL` centralizado; reset de estado por produto; sticky responsivo corrigido (mobile: barra fixa `bottom-20`; desktop: aside `lg:sticky top-[104px]`).
- **Build:** ✅ 59 módulos; CSS 27.20 kB; sem erros.
- **Status Git:** nada commitado/push; 0 HTMLs de produção modificados; `implementation_plan.md` intacto; checkpoint do Lote 5 aprovado.
- **Riscos:** preços/opcionais demonstrativos (mock) — validar com o cliente no Lote 10; barra fixa mobile cobre conteúdo (mitigado com `pb-28 md:pb-0`).
- **Deliberadamente NÃO implementado:** CartContext, Sacola, Checkout, Confirmação, Localização, persistência de carrinho.

### Lote 6 — Sacola `/sacola` + `CartContext` — ✅ CONCLUÍDO
- **Objetivo:** implementar a Sacola real e o estado global do carrinho, conectando `Cardápio → Produto → CartContext → Sacola`.
- **Arquitetura do `CartContext`** (`src/contexts/CartContext.jsx`): `createContext` + `useReducer`; estado `{ items, deliveryType }` (default `'delivery'`); ações `ADD_ITEM` (mescla por `key`), `REMOVE_ITEM` (filtra por `key`), `UPDATE_QTY` (clamp `Math.max(1, qty)`), `CLEAR_CART`, `SET_DELIVERY`; expõe `addItem`, `removeItem`, `updateQty`, `clearCart`, `setDelivery`, `cartCount`, `cartTotal`. `useCart()` lança erro fora do `<CartProvider>`.
- **Formato dos itens:** `{ key, id, name, image, unitPrice, qty, meatPoint, addons[], removals[], observations }` — `unitPrice` = preço base + adicionais; personalizações salvas como **labels** (não ids) para exibição direta.
- **Chave de mesclagem (`signature`)**: `product.id + ponto da carne + adicionais + remoções + observações`. **Decisão deliberada:** itens idênticos com **observações diferentes nunca se mesclam** (cada um vira linha própria) — documentado para não ser "corrigido" por engano em lote futuro.
- **Fluxo Produto → Sacola:** `ProductDetails.handleAdd` monta o item completo (todas as escolhas preservadas) → `addItem(item)` → `navigate('/sacola')` imediatamente (UX do plano/Stitch). Ponto da carne só é gravado quando diferente do default `'ao-ponto'` (evita "Ao ponto" sem ação do usuário).
- **Regras de cálculo:** `cartTotal = Σ(unitPrice × qty)` no contexto (fonte única); subtotal/total exibidos na `CartSummary`; taxa de entrega "A calcular" (delivery) / "Grátis" (retirada) — valor real fica para o Lote 7; desconto fixo `- R$ 0,00` (mock).
- **Sacola** (`src/pages/Cart.jsx` + `src/components/cart/`): lista de itens (imagem, nome, personalizações, quantidade via `QuantitySelector` `min={1}`, remoção com `delete`), subtotal, toggle Entrega/Retirada (`SET_DELIVERY`), total, CTAs "Finalizar Pedido" (→ `/checkout`, **link placeholder**, sem implementação) e "Continuar Comprando", e estado vazio (`EmptyCartState` com CTA para `/cardapio`).
- **Componentes criados:** `CartItem.jsx`, `CartSummary.jsx`, `EmptyCartState.jsx`, `CartBadge.jsx` (badge de contagem reutilizado no Header e no BottomNavBar).
- **Integrações mínimas em páginas aprovadas (sem alteração visual):** `Header` (link `/sacola` + `CartBadge`), `BottomNavBar` (contador no item Pedidos), `App.jsx` (`CartProvider` envolvendo `BrowserRouter`/`MainLayout` — Header/BottomNavBar ficam dentro do provider; rota `/sacola`).
- **Referências Stitch:** `cf81049c…` (Desktop), `184cdd73…` (Mobile).
- **HTML local utilizado:** `turquia_lanches_sacola_production/code.html` (grid 12-col 8+4, CartItem com imagem lateral, resumo sticky, QuantitySelector `rounded-full`).
- **Correções pós-revisão:** (1) import morto `Link` removido do `ProductDetails`; (2) **violação das Rules of Hooks latente do Lote 5 corrigida** — todos os `useState`/`useEffect`/`useMemo` agora são declarados **antes** do early return de `!product` (o `useMemo` de `addonsTotal` estava após o return condicional); (3) `meatPoint` só gravado quando não-default (consistência com o resumo do produto).
- **Build:** ✅ 65 módulos; CSS 28.10 kB; JS 216.29 kB; sem erros.
- **Status Git:** nada commitado/push; 0 HTMLs de produção modificados; `implementation_plan.md` intacto (hash `98bc0141…`); checkpoint do Lote 6 aprovado (14 itens).
- **Deliberadamente NÃO implementado (próximos lotes):** Checkout (`/checkout`), Confirmação (`/confirmacao`), Localização (`/localizacao`), autenticação, backend, persistência em banco, pagamento real, valor real da taxa de entrega, StickyCartBar mobile do cardápio (exige CartContext → pode voltar no Lote 7).

### Lote 7 — Checkout `/checkout` — ✅ CONCLUÍDO
- **Objetivo:** criar o Checkout real integrado ao `CartContext`, com Entrega/Retirada, dados de endereço condicionais, pagamento e validação mínima — sem implementar a tela de Confirmação (Lote 8).
- **Arquivos criados:** `src/pages/Checkout.jsx`; `src/components/checkout/{CheckoutField,DeliverySelector,AddressForm,PaymentSelector,OrderSummaryPanel}.jsx` (CheckoutField é um helper interno de campo com erro inline — justifica-se pela reutilização em ~9 campos).
- **Arquivos modificados (mínimos):** `src/App.jsx` (rota `/checkout` via **layout routes**), `src/layouts/MainLayout.jsx` (troca `{children}` → `<Outlet/>` + prop `hideBottomNav`), `src/styles/index.css` (`.fill-icon`).
- **Referência HTML:** `turquia_lanches_checkout_production/code.html` — extraído: 2 colunas (form 8 / resumo 4), seções "Seus Dados", "Endereço de Entrega", "Forma de Pagamento" (radio cards PIX/Cartão/Dinheiro), "Observações", inputs com focus `#ae0011`, resumo sticky com taxa "A calcular" e CTA "Finalizar Pedido".
- **Referência Stitch:** `5027f9aa…` (Checkout Desktop — única referência; mobile adaptado responsivamente conforme o plano, sem criar interface diferente).
- **Componentes reutilizados:** `Header`/`Footer` (MainLayout), `EmptyCartState` (sacola vazia no checkout), `formatBRL`; `QuantitySelector`/`Button` não se aplicam aqui (CTA do checkout usa botão nativo — ver correções).
- **Integração com `CartContext`:** `items`, `cartTotal` e `setDelivery()` (SET_DELIVERY) — o resumo usa `cartTotal` do contexto **sem duplicar cálculo**; `DeliverySelector` (Entrega/Retirada no balcão) grava a preferência no contexto; endereço só aparece em Entrega.
- **Validação:** no submit — nome e telefone sempre obrigatórios; em Entrega, também CEP, Rua, Número, Bairro e Cidade; erros inline por campo (`role="alert"`), limpos ao digitar; sem backend/pagamento real. CTA "Finalizar Pedido" (`type="submit"`) navega para `/confirmacao` (rota ainda não implementada — cai no placeholder; a tela é o Lote 8).
- **Decisões arquiteturais:** (1) fluxo linear **sem BottomNavBar** (plano: "Sem BottomNavBar (fluxo de checkout linear)") → layout routes + prop `hideBottomNav` no `MainLayout`; (2) campos de endereço seguem o HTML local (CEP, Rua, Número, Complemento, Bairro, Cidade) — a lista do briefing citava "referência", mas o HTML usa "Cidade" e o plano não detalha campos: prevaleceu a regra "não inventar campos"; (3) campo **Troco** (só em Dinheiro) **não existe em nenhum HTML local** — implementado minimalista seguindo o design system e registrado aqui como decisão deliberada; (4) taxa de entrega mantida "A calcular" (Entrega) / "Grátis" (Retirada), igual à Sacola e ao HTML — nenhum valor de taxa foi definido no plano/Stitch local.
- **Correções pós-revisão:** (1) prop morto `onSubmit` removido do `OrderSummaryPanel` no `Checkout.jsx`; (2) **conflito de classes no CTA**: a base do `Button` (`font-label-bold`/`text-label-bold`) vence por ordem CSS os overrides (`font-headline-md`/`text-[20px]`), divergindo do HTML → CTA trocado por **botão nativo `type="submit"` com as classes exatas do HTML de produção** (Rubik 20px, `rounded-xl`, `hover:bg-on-primary-fixed-variant`).
- **Build:** ✅ 71 módulos; CSS 31.01 kB; JS 226.50 kB; sem erros.
- **Status Git:** nada commitado/push; remoto intacto; 0 HTMLs de produção modificados; `implementation_plan.md` intacto (hash `98bc0141…`); checkpoint do Lote 7 aprovado (19 itens).
- **Limitações conhecidas:** taxa de entrega sem valor (mock "A calcular"); pagamento apenas visual (sem gateway); sem persistência do formulário (recarregar perde os dados); observações da tela não são lidas pelo resumo/validação (apenas visual).
- **Deliberadamente NÃO implementado (próximos lotes):** Confirmação (`/confirmacao` — Lote 8), Localização (`/localizacao` — Lote 9), autenticação, backend, persistência, pagamento real, limpeza do carrinho após pedido.

### Lote 8 — Confirmação `/confirmacao` — ✅ CONCLUÍDO
- **Objetivo:** implementar a tela final do fluxo — Checkout → Confirmação — exibindo o pedido concluído a partir do estado real do `CartContext`, sem backend/WhatsApp real (estrutura apenas).
- **Arquivos criados:** `src/pages/Confirmation.jsx`; `src/components/confirmation/{SuccessIcon,OrderSummaryConfirm,WhatsAppButton}.jsx`.
- **Arquivos modificados (mínimos):** `src/contexts/CartContext.jsx` (estado `lastOrder` + ação `PLACE_ORDER` + `placeOrder()`), `src/pages/Checkout.jsx` (submit chama `placeOrder(...)` e navega para `/confirmacao`; campo Observações agora controlado), `src/App.jsx` (rota `/confirmacao` no layout `hideBottomNav`).
- **Referência HTML:** `turquia_lanches_confirma_o_production/code.html` — extraídos: círculo com logo (`SuccessIcon`), título display-xl "Pedido Recebido com Sucesso!", mensagem, card bento (nº do pedido + badge "Aguardando" + total + aviso "Assim que seu pedido for confirmado..."), seção "Dúvidas sobre o pedido?".
- **Referência Stitch:** `824e366e…` (Confirmação Production — única ref; mobile adaptado responsivamente, sem tela nova).
- **Componentes reutilizados:** Header/Footer (MainLayout com `hideBottomNav` — fluxo linear, HTML de confirmação não tem BottomNavBar), `Button` (guarda "Nenhum pedido encontrado"), `WhatsAppIcon` (exportado do `Button.jsx`), `formatBRL`.
- **Arquitetura de estado (snapshot do pedido):** solução mínima autorizada pelo briefing — `PLACE_ORDER` grava em `lastOrder` o snapshot `{ items, deliveryType, payment, cashAmount, observations, orderNumber, placedAt, total }` e **limpa a sacola na mesma ação** (reducer puro: `total = Σ(unitPrice × qty)`; `orderNumber`/`placedAt` gerados no `handleSubmit` do Checkout, fora do reducer). A confirmação lê `lastOrder` — o pedido não desaparece após o carrinho ser esvaziado; `cartCount` zera e o badge do Header some (UX correta). Sem Zustand/Redux/backend/persistência.
- **Fluxo Checkout → Confirmação:** `handleSubmit` (validação OK) → `placeOrder({ items, deliveryType, payment, cashAmount, observations, orderNumber, placedAt })` → `navigate('/confirmacao')`. Dispatch + navigate no mesmo handler (batched): `lastOrder` já está setado quando a Confirmação renderiza.
- **Conteúdo exibido (`OrderSummaryConfirm`):** `Pedido #XXXX` (nº demonstrativo gerado no checkout — sem backend), badge "Aguardando", lista de itens (nome × qty + resumo de personalização: ponto/adicionais/remoções/obs + linha `unitPrice × qty`), linhas "Entrega / Retirada" e "Pagamento" (com troco em Dinheiro) e "Observações" (quando houver), `Total do Pedido` em `price-lg` primary, e o aviso padrão. Guarda sem `lastOrder` (acesso direto/refresh): "Nenhum pedido encontrado" + CTA "Ver Cardápio".
- **Decisões deliberadas (documentadas):** (1) CTA primário do HTML "Acompanhar Pedido" (sem destino; semanticamente ligado ao acompanhamento/Localização) foi substituído por **"Voltar ao Início" → `/`** conforme comportamento definido no `implementation_plan.md` (Lote 8) — Localização é o Lote 9; (2) botão WhatsApp usa o **link real de produção** `https://shre.ink/turquiamarica` (âncora existente na Localização HTML); a montagem do texto do pedido via `wa.me` (prevista no plano) fica para a integração real (Lote 10) — apenas estrutura preparada; (3) linhas Entrega/Pagamento/Observações adicionadas ao card (o briefing pede "dados de entrega/retirada; forma de pagamento") usando **dados reais do snapshot** — nada inventado; (4) `placedAt` gravado para uso futuro ("estimativa de tempo" do plano) — não exibido (HTML não tem estimativa; badge "Aguardando" preservado).
- **Correções pós-revisão:** nenhum bug encontrado. Verificações: `CheckoutField` repassa `{...rest}` ao `<textarea>` (observações controladas chegam ao snapshot); reducer puro (random/time fora); total consistente com `cartTotal`; hooks em ordem (único `useCart` antes do early return em `Confirmation`; 5 `useState` antes do early return no `Checkout`).
- **Build:** ✅ 75 módulos; CSS 32.69 kB; JS 234.82 kB; sem erros.
- **Status Git:** nada commitado/push; remoto intacto; 0 HTMLs de produção modificados; `implementation_plan.md` intacto (hash `98bc0141…`); checkpoint do Lote 8 aprovado (16 itens).
- **Limitações conhecidas:** nº do pedido e status "Aguardando" são representações locais (sem backend); sem persistência — **recarregar `/confirmacao` perde o snapshot** (guard "Nenhum pedido encontrado"); WhatsApp sem texto formatado (apenas link de contato); itens do snapshot compartilham referência de objetos com o carrinho (seguro: o reducer nunca muta).
- **Deliberadamente NÃO implementado (próximos lotes):** Localização (`/localizacao` — Lote 9), integração WhatsApp real (wa.me com texto), backend/banco/pagamento real/autenticação, persistência de pedidos.

### Lote 9 — Localização `/localizacao` — ✅ CONCLUÍDO
- **Objetivo:** implementar a tela informativa de Endereço, Localização e Contato (não faz parte do fluxo linear do pedido).
- **Arquivos criados:** `src/pages/Location.jsx`; `src/components/location/{MapEmbed,ContactCard}.jsx`; `src/data/contact.js` (fonte única dos contatos reais — `WHATSAPP_URL`, `INSTAGRAM_URL`, `MAPS_LINK`).
- **Arquivos modificados (mínimos):** `src/App.jsx` (import + rota `/localizacao` no layout padrão, com BottomNavBar; comentário do placeholder genérico), `src/components/confirmation/WhatsAppButton.jsx` (apenas o import da URL passa a vir de `src/data/contact.js` — **renderização/lógica idênticas**, sem alterar a lógica do Lote 8).
- **Referência HTML:** `turquia_lanches_localiza_o_production/code.html` — extraídos: hero full-width com imagem do ambiente + overlay `inverse-surface/40` (título "Venha nos Visitar", parágrafo, CTAs "Peça Agora"/"Contato"), grid 2 colunas (`md:grid-cols-2`) com card de contato e mapa placeholder.
- **Referências Stitch:** `b4d2755a…` (Desktop), `4bf47c60…` (Mobile) — composição preservada em uma única implementação responsiva.
- **Componentes reutilizados:** Header (link "Localização" já existia em `NAV_LINKS` — preparado no Lote 2, aguardando a rota; agora funcional no desktop e no menu mobile), Footer (via MainLayout), `WhatsAppIcon` (exportado do `Button.jsx`), tokens do design system.
- **Rota:** `/localizacao` registrada no layout padrão (com BottomNavBar — o HTML da página tem bottom nav). **Nenhuma navegação paralela criada**: a navegação existente (Header) foi apenas "ativada" pela rota.
- **Conteúdo (dados 100% reais do HTML — nada inventado):** Endereço "Parque Nanci, Maricá/RJ" + link "Como Chegar" → `maps.app.goo.gl/QHAQCBvrACZZK5Ho9`; Horário "Em breve: horários oficiais" (o HTML **não define horários**); Telefone/WhatsApp "Disponível via WhatsApp" + botão verde → `shre.ink/turquiamarica` (link real de produção; sem `wa.me` novo); Instagram "@turquialanches" + botão → `instagram.com/turquialanches/`. Mapa = **imagem placeholder da referência** (zoom mockup decorativo) — o HTML não usa iframe/API de mapas e nenhum serviço externo novo foi adicionado.
- **Decisões deliberadas (documentadas):** (1) **`HoursTable` do plano NÃO foi criado** — o HTML não possui tabela de horários (apenas "Em breve"); criar um tabela inventaria dados comerciais, violando a regra; (2) CTA "Peça Agora" do hero usa `bg-primary` (design system/Stitch, alinhado com a correção do Lote 3) em vez de `bg-primary-container` do HTML local — divergência deliberada de consistência; (3) botão "Contato" do HTML (inerte) virou âncora `#contato` que rola até o card de contato — adaptação funcional mínima; (4) controles de zoom do mapa (botões inertes no HTML) viraram spans decorativos `aria-hidden` — evita controles falsos (acessibilidade); (5) **BottomNavBar mantém os 4 itens aprovados (Perfil)** — o HTML de localização tinha "Localização" no lugar de "Perfil", mas o modelo de navegação consolidado do app (Lote 2) foi preservado; Localização é acessível via Header em todas as páginas; (6) `WhatsAppButton` do Lote 8 inalterado (apenas a URL passou à fonte única).
- **Correções pós-revisão:** (1) verificada a existência do token `inverse-surface` no `tailwind.config.cjs` (hero overlay funciona — sem quebra silenciosa); (2) URL do WhatsApp duplicada (`WhatsAppButton`/`ContactCard`) → centralizada em `src/data/contact.js` (fonte única, preparada para a integração real do Lote 10); (3) CTA `bg-primary` registrado como decisão no roadmap.
- **Build:** ✅ 79 módulos; CSS 34.23 kB; JS 241.23 kB; sem erros.
- **Status Git:** nada commitado/push; remoto intacto; 0 HTMLs de produção modificados; `implementation_plan.md` intacto (hash `98bc0141…`); checkpoint do Lote 9 aprovado (22 itens).
- **Limitações conhecidas:** horários oficiais ainda não definidos ("Em breve" — depende de dados reais do cliente); mapa é placeholder ilustrativo (sem mapa interativo real — Lote 10 pode trocar por embed oficial se aprovado); WhatsApp apenas link de contato (sem texto formatado — Lote 10).
- **Deliberadamente NÃO implementado (próximos lotes):** Lote 10 (integração real WhatsApp com texto do pedido, mapa interativo oficial se aprovado, validação de imagens, QA ponta a ponta), backend, persistência, autenticação.

### Lote 10 — Finalização, QA Integral e Teste de Ponta a Ponta — ✅ CONCLUÍDO
- **Objetivo:** auditar, integrar, testar e corrigir o projeto inteiro, preservando tudo que foi aprovado nos Lotes 1–9. Sem criar novas páginas.
- **Auditoria estrutural:** build limpo (79 módulos, 0 warnings); todos os imports válidos (build comprova); sem `console.log` no código; `src/styles/main.css` removido (arquivo órfão da migração original — não importado por nenhum JSX/JS desde o Lote 1); `PagePlaceholder` mantido para rotas desconhecidas (`*`).
- **Auditoria Design System:** tokens `#ae0011`/`#fdc008`/`#fff8f6`/`#251913` íntegros no `tailwind.config.cjs`; classes utilitárias Tailwind (`bg-primary`, `text-on-surface`, etc.) usadas em todo o código; `max-w-[1280px]` como largura máxima em todas as páginas (Home, Cardápio, Produto, Sacola, Checkout, Confirmação, Localização); DM Sans (body/label) + Rubik (display/headline/price) corretos; `inverse-surface` presente (`#3b2d27`).
- **Auditoria funcional (conceitual):** `CartContext` com 6 ações (`ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR_CART`, `SET_DELIVERY`, `PLACE_ORDER`); fluxo Cardápio → Produto → Sacola → Checkout → Confirmação completo; `PLACE_ORDER` grava `lastOrder` (snapshot) e limpa a sacola na mesma ação — confirmação exibe os dados mesmo após o carrinho ser esvaziado; estado vazio tratado em Sacola, Checkout e Confirmação; produto inexistente tratado em `/produto/:id`.
- **Teste de navegação (conceitual):** 7 rotas registradas; Header navega para Cardápio, Localização, Sacola; BottomNavBar navega para Home, Cardápio, Sacola, Perfil (placeholder); Footer com links institucionais; `*` catch-all no final.
- **Responsividade:** mobile-first com breakpoints `md:`, `lg:`, `xl:`; `hideBottomNav` em Checkout e Confirmação (fluxo linear); barras fixas (BottomNavBar mobile, AddToCartBar mobile, Header sticky); BottomNavBar não duplica conteúdo (`pb-24 md:pb-16` no Footer).
- **Links/contatos:** fonte única em `src/data/contact.js` — `WHATSAPP_URL` (`shre.ink/turquiamarica`), `INSTAGRAM_URL` (`@turquialanches`), `MAPS_LINK` (Google Maps oficial); sem duplicação; sem `wa.me` novo; sem URLs inventadas.
- **Acessibilidade básica:** todos os `<img>` com `alt`; decorativos com `aria-hidden`; formulários com `<label htmlFor>` + `<input id>`; grupos de radio com `role="radiogroup"`; foco visível em inputs (checkout); semântica HTML (`<nav>`, `<main>`, `<header>`, `<footer>`). Footer placeholders (`href="#"`) são intencionais (páginas não implementadas — preservado dos Lotes 2).
- **Correções aplicadas:** `src/styles/main.css` removido (órfão — não importado desde o Lote 1, 0 risco).
- **Build:** ✅ 79 módulos; CSS 34.23 kB; JS 241.23 kB; **0 warnings**.
- **Status Git:** nada commitado/push; remoto intacto; 0 HTMLs de produção modificados; `implementation_plan.md` intacto (hash `98bc0141…`).
- **Checkpoint final:** 30 itens verificados — todos PASS.
- **Deliberadamente NÃO implementado (fora do escopo desta migração):** backend, banco de dados, autenticação, pagamento real, integração WhatsApp com texto formatado (`wa.me`), mapa interativo real, perfil do usuário, página Sobre Nós, página Avaliações, página Termos de Uso/Privacidade, testes unitários automatizados, persistência de formulário/checkout, valor real da taxa de entrega.

---

## 7. ESTADO FINAL DA MIGRAÇÃO

### Origem do projeto

- **Projeto:** Turquia Lanches / Turquia-Maricá (lanchonete real em Parque Nanci, Maricá/RJ).
- **Referência visual/UX:** Google Stitch (`projects/10254386617209499733`).
- **Base estrutural de código:** 7 HTMLs de produção locais (Homepage, Cardápio, Sacola, Checkout, Confirmação, Localização), preservados como referência.
- **Design System:** `sabor_e_tradi_o/DESIGN.md` (paleta Material You, tipografia Rubik + DM Sans, espaçamentos 8px-64px).

### Arquitetura final

| Camada | Tecnologia/Arquivo |
|:---|:---|
| Bundler | Vite 5 (`vite.config.js`) |
| Framework UI | React 18 (`src/main.jsx`) |
| Roteamento | React Router v6 (`src/App.jsx`) — 7 rotas + catch-all |
| Estilização | TailwindCSS 3 + `tailwind.config.cjs` (47 cores, tipografia completa) |
| Estado global | Context API + `useReducer` (`src/contexts/CartContext.jsx`) |
| Layout | `MainLayout.jsx` (Header + Outlet + Footer + BottomNavBar; prop `hideBottomNav`) |
| Dados mock | `src/data/menu.js` (5 categorias, 7+ produtos, opcionais) |
| Dados reais | `src/data/contact.js` (WhatsApp, Instagram, Google Maps) |
| Utilitários | `src/utils/format.js` (`formatBRL`) |
| Estilos | `src/styles/index.css` (Tailwind directives + classes utilitárias) |

### Rotas implementadas (7/7)

| Rota | Página | Lote | Layout | BottomNavBar |
|:---|:---|:---|:---|:---|
| `/` | Home | 3 | Padrão | ✅ |
| `/cardapio` | Menu | 4 | Padrão | ✅ |
| `/produto/:id` | ProductDetails | 5 | Padrão | ✅ |
| `/sacola` | Cart | 6 | Padrão | ✅ |
| `/checkout` | Checkout | 7 | `hideBottomNav` | ❌ (fluxo linear) |
| `/confirmacao` | Confirmation | 8 | `hideBottomNav` | ❌ (fluxo linear) |
| `/localizacao` | Location | 9 | Padrão | ✅ |

### Fluxo completo

```text
Home → Cardápio → Produto → Sacola → Checkout → Confirmação
   ↓                  ↓          ↓          ↓             ↓
Header links      Filtro     CartContext  Form/valid   Snapshot
Hero CTAs         Personal   ADICIONAR    PLACE_ORDER  lastOrder
                  navegação  navegação    navegação    sacola limpa
```

### Estrutura final de pastas (`src/`)

```
src/
├── components/
│   ├── cart/           CartItem, CartSummary, EmptyCartState, CartBadge
│   ├── checkout/       CheckoutField, DeliverySelector, AddressForm, PaymentSelector, OrderSummaryPanel
│   ├── confirmation/   SuccessIcon, OrderSummaryConfirm, WhatsAppButton
│   ├── home/           HeroSection, AmbienceSection, GallerySection, FoodHighlights, MenuPreviewSection
│   ├── layout/         Header, BottomNavBar, Footer
│   ├── location/       MapEmbed, ContactCard
│   ├── menu/           CategoryFilterBar, ProductGrid
│   ├── product/        ProductCard, CategoryCard, ProductHero, AddonsSelector, ObservationsField, AddToCartBar
│   └── ui/             Button, Badge, QuantitySelector
├── contexts/           CartContext.jsx
├── data/               menu.js, contact.js
├── layouts/            MainLayout.jsx
├── pages/              Home, Menu, ProductDetails, Cart, Checkout, Confirmation, Location
├── styles/             index.css
└── utils/              format.js
```

### Componentes compartilhados (~30)

| Categoria | Componentes |
|:---|:---|
| Layout | Header, BottomNavBar, Footer, MainLayout |
| UI | Button (4 variantes), Badge, QuantitySelector |
| Cart | CartItem, CartSummary, EmptyCartState, CartBadge |
| Checkout | CheckoutField, DeliverySelector, AddressForm, PaymentSelector, OrderSummaryPanel |
| Confirmação | SuccessIcon, OrderSummaryConfirm, WhatsAppButton |
| Home | HeroSection, AmbienceSection, GallerySection, FoodHighlights, MenuPreviewSection |
| Location | MapEmbed, ContactCard |
| Menu | CategoryFilterBar, ProductGrid |
| Product | ProductCard, CategoryCard, ProductHero, AddonsSelector, ObservationsField, AddToCartBar |

### Limitações conhecidas (não resolvidas nesta migração)

1. **Preços demonstrativos** — todos os valores usam `R$ --,--` (mocks); sem correspondência com preços reais.
2. **Horários oficiais** — Localização exibe "Em breve: horários oficiais" (o HTML de produção não define horários).
3. **Nº do pedido local** — gerado como `#XXXX` aleatório (sem backend/persistência). **Recarregar `/confirmacao` perde o snapshot.**
4. **WhatsApp sem texto** — contato apenas via link fixo `shre.ink/turquiamarica` (sem montagem do texto do pedido via `wa.me`).
5. **Mapa placeholder** — imagem ilustrativa (sem mapa interativo real — o HTML de produção também não usa iframe/API de mapas).
6. **Footer `href="#"`** — links de Termos de Uso, Privacidade, Trabalhe Conosco e Contato são placeholders (páginas não implementadas).
7. **Header `href="#"`** — links "Sobre Nós" e "Avaliações" são placeholders (páginas não implementadas).
8. **Taxa de entrega** — exibe "A calcular" (Entrega) / "Grátis" (Retirada) — sem valor real definido.
9. **Pagamento** — visual apenas (PIX/Cartão/Dinheiro — sem gateway de pagamento).
10. **Persistência** — sem backend, banco de dados, autenticação ou `localStorage`.
11. **Título da página** — SPA com um único `<title>` (Vite entry `index.html`); sem `react-helmet` para títulos por rota.

### Resultado final do build

```
✓ 79 modules transformed.
dist/index.html                   0.94 kB │ gzip:  0.49 kB
dist/assets/index-6la5TE2o.css   34.23 kB │ gzip:  6.31 kB
dist/assets/index-tu-UIOcT.js   241.23 kB │ gzip: 74.78 kB
```

**0 warnings. 0 erros.**

### Estado do Git

- **Nada commitado.** Nenhum commit foi feito durante a migração.
- **Nada enviado ao remoto.** O repositório `origin` (`https://github.com/lnpott/Turquia-Marica.git`) permanece exatamente como antes da migração.
- **HTMLs de produção intactos.** Nenhum dos 7 diretórios `*_production/` foi modificado.
- **`implementation_plan.md` intacto.** Hash idêntico ao commit-base (`98bc0141…`).
- **Novos arquivos (criados na migração, não commitados):** ~50 arquivos em `src/` (componentes, páginas, contexto, dados, utilitários, layouts, estilos).
- **Arquivos existentes modificados (não commitados):** `package.json`, `vite.config.js`, `tailwind.config.js` → `tailwind.config.cjs`, `postcss.config.js`, `index.html` (entry Vite), `.gitignore`, `src/styles/index.css`, `src/layouts/MainLayout.jsx`, `src/App.jsx`, `src/contexts/CartContext.jsx`, `src/pages/Checkout.jsx`, `documentacao/ROADMAP_MIGRACAO.md`.

### Próximos passos possíveis (fora do escopo desta migração)

1. **Preços reais** — substituir valores mock de `src/data/menu.js` pelos preços verdadeiros do restaurante.
2. **Horários oficiais** — atualizar `ContactCard.jsx` com os horários de funcionamento reais.
3. **WhatsApp com texto do pedido** — criar integração `wa.me` montando o texto dos itens confirmados.
4. **Mapa interativo real** — substituir a imagem placeholder por um embed real do Google Maps ou equivalente.
5. **Gateway de pagamento** — integrar PIX/Cartão real.
6. **Persistência de pedidos** — backend + banco de dados para histórico de pedidos reais.
7. **Páginas institucionais** — Sobre Nós, Avaliações, Termos de Uso, Privacidade, Contato.
8. **Autenticação** — login do usuário com histórico de pedidos.
9. **Títulos por rota** — `react-helmet` ou similar.
10. **Testes automatizados** — unitários (Jest/Vitest) e de integração.
11. **Deploy** — build de produção em Vercel, Netlify ou similar.

---

## 6. Regras permanentes

1. Não apagar HTMLs de referência.
2. Não substituir referências originais do Stitch.
3. Não implementar lotes futuros antecipadamente.
4. Não inventar UI quando existir referência local ou Stitch.
5. Toda página deve funcionar em Mobile e Desktop.
6. Toda alteração relevante deve ser validada com build.
7. Não fazer commit/push automaticamente.
8. Preservar rastreabilidade entre Stitch → HTML → React.
9. Alterações deliberadas devem ser documentadas (neste roadmap).
10. O roadmap deve ser atualizado ao final de cada lote.
