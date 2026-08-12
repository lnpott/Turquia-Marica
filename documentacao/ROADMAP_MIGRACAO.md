# ROADMAP VIVO — Migração Turquia Lanches (HTML Estático → React/Vite)

> **Documentação operacional permanente da migração.** Atualizado ao final de cada lote.
> Qualquer agente futuro deve ler este arquivo antes de alterar o projeto.

> **Estado atual — 12/08/2026:** o Git real é a fonte de verdade. O projeto está sincronizado com `origin/main` no commit `951a53a` (`refactor(ui): route orders through iFood and unify home menu`), com working tree limpa e build aprovado. O produto atual é um catálogo institucional; pedidos são encaminhados externamente ao iFood. As rotas ativas são `/`, `/cardapio` e `/localizacao`. As seções que descrevem carrinho, checkout, confirmação e 7 rotas registram o histórico da migração e não representam a arquitetura atual.

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

### Lote 11 — Refinamento Visual, Imagens e Transições — ✅ CONCLUÍDO
- **Objetivo:** etapa separada de refinamento visual/UX (sem alterar a arquitetura dos Lotes 1–10): corrigir o uso de imagens (hero da Home), transições de navegação e revisão geral — mantendo rigorosamente o Design System "Sabor e Tradição" e a hierarquia de referências. Resultado = evolução natural, não redesign.
- **Problema encontrado (auditoria de imagens — 25 imagens, 7 páginas):**
  - Todas as imagens são **URLs externas** `lh3.googleusercontent.com/aida-public/…` (sem assets locais — não existe `public/` ou `src/assets/`).
  - **1 imagem quebrada: hero da Home.** A URL `AB6AXuB23gN…` (vinda das variantes `index.html_homepage_production_fixed`/`_final_audit`, base do Lote 3) retorna **HTTP 400**.
  - **O hero original e funcional é `AB6AXuCSbrOVTg…`** (HTTP 200), presente em `turquia_lanches_homepage_production/code.html` e `index.html_homepage_production/code.html` — **fonte #1 da hierarquia (HTML de produção local)**.
  - As 2 URLs "fabricadas" do `_fixed` também retornam 400 (nunca existiram). As demais **22 imagens respondem 200** (menu, cardápio, localização, logos — nenhuma outra correção necessária).
- **Solução adotada (hero):**
  - **Hero corrigido** para a imagem original de produção (HTTP 200) — em desktop (fundo) e mobile (`<img>` abaixo do texto, composição aprovada preservada).
  - **Fundo dinâmico elegante (desktop):** crossfade de 3 slides com imagens **já aprovadas nos HTMLs de produção** — hero original + Ambiente "Nosso Espaço" (`AB6AXuAjG-GFqX…`) + galeria "Momentos Turquia" (`AB6AXuC34jlT…`). Dwell confortável de 6s, crossfade suave de 1.6s, Ken Burns sutil (scale 1→1.05 em 7.2s). Atmosfera viva, não banner.
  - **Performance:** preload apenas da 1ª imagem (slides 2–3 só montados após `hydrated=true` no 1º efeito); altura fixa do hero (`min-h-[600px]`/`md:h-[819px]`) → **zero CLS**.
  - **`prefers-reduced-motion`:** o interval JS é desativado via `matchMedia` e as animações CSS (`.page-transition`, `.hero-kenburns`, scroll) via `@media` — usuários com menos movimento veem hero estático no slide 1.
- **Estratégia de transições (sem biblioteca nova):**
  - `MainLayout` usa `useLocation` + `key={location.pathname}` no wrapper do `<Outlet/>` → a cada rota, a classe `.page-transition` dispara a animação de entrada **fade 260ms**.
  - Aplica-se a **todas** as navegações: Header, BottomNavBar, CTAs, fluxo linear (Checkout/Confirmação) — sem duplicar páginas mobile/desktop, sem alterar URLs, sem quebrar histórico/back.
  - `window.scrollTo({ top: 0, behavior: 'instant' })` por pathname (comportamento padrão de SPA); âncoras `#combos`/`#categorias` não mudam pathname → não afetadas.
  - **Decisão técnica (documentada):** a transição é **fade-only** — o `translateY` foi removido porque qualquer `transform` no ancestral cria *containing block* para `position:fixed`, o que quebraria o `AddToCartBar` (`/produto/:id`). O briefing permitia apenas "fade".
- **Microinterações (sutis, premium + artesanal):** `:focus-visible` global (outline 2px `--color-primary`) — foco acessível por teclado em toda a interface; `scroll-behavior: smooth` (guard reduced-motion) para âncoras; press feedback `active:scale` em `QuantitySelector` (+/−), `AddonsSelector`, `PaymentSelector` e `DeliverySelector`.
- **Revisão visual geral:** 7 páginas revisadas sem redesenho. Nenhuma divergência do Design System (tokens `#ae0011`/`#fdc008`/`#fff8f6`/`#251913`, DM Sans/Rubik, `max-w-[1280px]`, Header/BottomNavBar/Footer/Button/Badge/QuantitySelector e CartContext intocados).
- **Arquivos alterados (7):** `src/components/home/HeroSection.jsx` (hero corrigido + crossfade), `src/layouts/MainLayout.jsx` (transição + scroll top), `src/styles/index.css` (keyframes, focus-visible, smooth scroll, reduced-motion), `src/components/ui/QuantitySelector.jsx`, `src/components/product/AddonsSelector.jsx`, `src/components/checkout/PaymentSelector.jsx`, `src/components/checkout/DeliverySelector.jsx` (press feedback).
- **Correções pós-revisão (code review):** (1) **conflito `opacity-70` + `opacity-0`** nos slides — a ordem de cascade do Tailwind faria todos os slides visíveis → `opacity-70` removido da base e mantido só na condição ativa; (2) `transform` retido por `animation-fill-mode: both` quebraria `position:fixed` → fade-only; (3) `scrollTo` suave competindo com a transição → `behavior: 'instant'`.
- **QA / validação:** build ✅ 79 módulos; CSS 35.96 kB; JS 242.75 kB; **0 warnings**. **Verificação real no navegador (Chrome):** Home carrega sem erros de console; hero com imagem carregando (sem quebra); título "Fome de Leão?" presente; navegação Home → `/cardapio` OK; **zero imagens 400/404**. `git diff --check` limpo; 0 HTMLs de produção modificados; `implementation_plan.md` intacto (hash `98bc0141…`); `CartContext` e `package.json` inalterados (sem regressão, sem dependência nova).
- **Status Git:** **SEM COMMIT / SEM PUSH** — 7 arquivos modificados em working tree; remoto intacto.
- **Pendências (recomendações, fora deste lote):** heróis do Cardápio e Localização já estão com imagens válidas (200); imagens de produto continuam mock (validação com o cliente); migrar imagens externas frágeis para asset local/CDN próprio permanece recomendado (decisão de negócio).

### Lote 11.1 — Correção Visual do Hero Dinâmico — ✅ CONCLUÍDO
- **Objetivo:** corrigir a direção visual do Hero da Home (funcionalidade técnica OK do Lote 11, mas o resultado ficou ruim: imagens do fundo muito obscurecidas/lavadas). Princípio definido: **FOTOGRAFIA PRIMEIRO, OVERLAY APENAS O NECESSÁRIO PARA LEGIBILIDADE**.
- **Problema identificado:** a foto de fundo parecia "uma mancha escura" atrás do conteúdo; o usuário não conseguia apreciar comida/ambiente/textura.
- **Causa encontrada (composição herdada fielmente do HTML de produção):**
  1. `mix-blend-multiply` nos slides sobre `bg-surface-container` — escurecia a foto inteira e, no crossfade, duas imagens multiplicadas → aparência escura durante a troca;
  2. `opacity-70` na imagem — foto a 70%;
  3. gradiente full-hero `from-background via-background/80` (80% de `#fff8f6` quase branco) — lavava a fotografia por inteiro.
- **Solução adotada (divergência deliberada e documentada do HTML de referência, autorizada pelo briefing como melhoria UX justificada):**
  - Removidos `mix-blend-multiply` e `opacity-70` → slides em **plena opacidade** (`opacity-100` ativo / `opacity-0` inativo, mutuamente exclusivos via ternário — sem conflito de cascade);
  - Gradiente **localizado** apenas atrás do bloco textual (lado esquerdo): `from-background/70 via-background/20 to-transparent` + `pointer-events-none` + `aria-hidden` — a fotografia permanece nítida na área central/direita;
  - **Enquadramento configurável por slide** (`backgroundPosition` na config `SLIDES`) — auditado visualmente: burger (slide 1) `center`, ambiente (slide 2) `center`, galeria (slide 3) `center` — os 3 confirmados bem compostos no navegador real, sem cortar o elemento principal;
  - **Crossfade limpo:** 1.6s, alpha blend puro (sem blend mode) — verificado no navegador que o meio da transição NÃO lava nem escurece;
  - **Ken Burns quase imperceptível:** scale 1.05 → **1.02**, duration 7200ms → **9000ms**, `ease-in-out` — movimento dá vida sem destruir o enquadramento;
  - `drop-shadow-sm` adicionado ao parágrafo (legibilidade sobre a foto); CTA/título/posição de texto inalterados (contraste resolvido pela composição, não escondendo a foto).
- **Comportamento desktop:** fotografia ocupa o hero inteiro (`md:h-[819px]`), plenamente visível, com gradiente localizado apenas à esquerda; texto e CTAs legíveis.
- **Comportamento mobile:** composição aprovada **preservada** (título + CTAs + burger estático abaixo do texto, **sem slideshow** por simetria); imagem em plena visibilidade; legibilidade do card mantida (`bg-background/50 backdrop-blur-sm`).
- **Referências utilizadas:** imagens originais de produção (hero `AB6AXuCSbrOVTg…` HTTP 200 — fonte #1; ambiente `AB6AXuAjG-GFqX…`; galeria `AB6AXuC34jlT…`) — nenhuma imagem nova, nenhuma URL fabricada, nenhum stock image.
- **Decisão estética:** RESTAURANTE ARTESANAL PREMIUM — "TEM COMIDA AQUI": a fotografia tem presença e é reconhecível mesmo sob o texto.
- **QA visual (navegador real Chrome):**
  - Ciclo completo de 4 verificações: burger → ambiente → galeria → retorno ao burger — **todas PASS**;
  - Meio do crossfade: nítido, sem lavar/escurecer — **PASS**;
  - Enquadramento dos 3 slides: bem compostos, sem cortes estranhos — **PASS**;
  - Mobile (375×667): título + CTAs + burger estático visível e claro — **PASS**;
  - Zero erros de console; zero imagens 400/404 — **PASS**.
- **Acessibilidade/performance preservados:** `prefers-reduced-motion` (interval JS desativado via `matchMedia` + `animation: none` no CSS) → hero estático e legível no slide 1; zero CLS (`min-h-[600px]`/`md:h-[819px]` mantidos); preload apenas da 1ª imagem; sem bibliotecas novas; sem JS desnecessário.
- **Arquivos alterados (2):** `src/components/home/HeroSection.jsx`, `src/styles/index.css`.
- **Build:** ✅ 79 módulos; CSS 36.01 kB; JS 242.86 kB; **0 warnings**.
- **Status Git:** **SEM COMMIT / SEM PUSH** — 2 arquivos modificados em working tree; HTMLs de produção intactos (0 modificados); `implementation_plan.md` intacto (hash `98bc0141…`); rotas inalteradas (7); nenhum Lote 12 antecipado; `CartContext`/`package.json`/demais páginas intactos.
- **Pendências (fora deste lote):** continua pendente a migração das imagens externas para asset local/CDN próprio (prioridade #1 da fase de produto); imagens de produto continuam mock.

### Lote 12 — Auditoria Estratégica e Direção Visual — ✅ CONCLUÍDO
- **Documento estratégico utilizado:** "Relatório Estratégico Integrado: Projeto Turquia Lanches" (diagnóstico de marca, análise de mercado do Polo do Parque Nanci, benchmarking UX 2025-2026, direção criativa, wireframe estrutural da Homepage). **Fonte de DIREÇÃO, não autorização de implementação em massa** — regra do próprio lote: absorver → comparar → identificar conflitos → corrigir só o necessário e seguro → registrar.
- **Princípios estratégicos absorvidos (registrados como direção):** identidade vernacular gaúcha reinterpretada como "premium acessível"; fotografia real com protagonismo (Real-World Imagery); hierarquia visual e menos fricção (Hick's Law); mobile-first; storytelling da marca; desempenho em conexões 4G; SEO local (desambiguação algorítmica do nome "Turquia/Maricá" — DJ Marica, Marcia alla Turca, Ciprian Marica — endereçável no futuro via GBP + Schema).
- **DECISÃO DE NEGÓCIO (registro oficial):**
  - **O SITE NÃO É O CANAL DE PEDIDOS.** Propósito atual: apresentar marca/espaço/cardápio/produtos e preços, despertar desejo, orientar localização, fortalecer presença digital e **conduzir o usuário ao negócio físico**.
  - **Modelo atual: catálogo digital + presença institucional/local. Canal transacional futuro: iFood. E-commerce próprio fora do escopo atual.**
  - O fluxo Carrinho → Checkout → Confirmação pertence à **migração técnica já realizada** e NÃO será expandido como e-commerce próprio. **NÃO apagado** (sem autorização explícita para remoção). Nenhuma integração iFood criada (sem URL oficial fornecida — não inventar link).
- **Distinção catálogo × e-commerce (Cardápio):** o Cardápio deve continuar como **CATÁLOGO/MENU DE APRESENTAÇÃO** — navegar categorias, ver produtos/preços, abrir detalhes, conhecer opções — **sem sensação de checkout obrigatório**. O CTA atual (cards → `/produto/:id` → personalização → sacola) foi **analisado à luz da decisão e MANTIDO** (é a experiência de apresentação/detalhe herdada da migração; não será redirecionado ao iFood neste lote; qualquer mudança de CTA para canal de pedido exigirá a URL oficial).
- **Dívida arquitetural registrada (Produto/Detalhes):** "O modelo transacional atual (personalização + CartContext + sacola) foi herdado da migração para preservar o fluxo original; o modelo comercial final deverá ser reavaliado quando o canal oficial de pedidos for definido." — sem nova arquitetura agora.
- **Auditoria visual do Hero (navegador real Chrome, desktop + mobile):**
  - Fotografia nítida e visível como FOTOGRAFIA REAL (não mancha/fundo lavado/textura subordinada) — **PASS**;
  - Título, subtítulo e CTAs legíveis — **PASS**;
  - Texto não cobre o assunto principal (foto visível ao redor do bloco textual) — **PASS**;
  - Meio do crossfade: limpo, sem preto/branco/flash — **PASS**;
  - Slides 2 (ambiente) e 3 (galeria): bem enquadrados, sem cortes de pessoas/comida — **PASS**;
  - Ken Burns sutil (quase imperceptível) — **PASS**;
  - Mobile (375×667): composição estática aprovada, sem slideshow, imagem clara — **PASS**;
  - Zero erros de console; zero imagens 400/404 — **PASS**.
  - **Conclusão da auditoria:** o resultado do Lote 11.1 já atende a direção "FOTOGRAFIA PRIMEIRO / overlay mínimo / transição editorial discreta" — **nenhuma alteração de código necessária neste lote** (preservado integralmente).
- **Auditoria da Homepage como um todo (seções):** Hero, Nosso Espaço, Momentos Turquia, O Irresistível, Cardápio (preview) e Footer — ritmo vertical, espaçamento, hierarquia, equilíbrio vermelho/amarelo/neutros, tipografia, fotografia e CTAs consistentes com marca artesanal premium acessível; **sem problemas evidentes que exijam correção** (não houve redesenho, conforme a regra do lote).
- **Navegação validada no navegador (7 rotas):** `/` ✓, `/cardapio` ✓, `/produto/combo-master` (Cardápio → Produto) ✓, `/sacola` (estado vazio) ✓, `/checkout` (estado vazio) ✓, `/confirmacao` (guarda "Nenhum pedido encontrado") ✓, `/localizacao` ✓ — todas sem erros de console.
- **Direção criativa pós-migração (registrada como princípios, NÃO tarefas autorizadas):**
  - **Fotografia real** — prioridade máxima para fotos reais da marca (nunca stock genérico);
  - **Premium acessível** — nem genérico de lanchonete, nem sofisticado desconectado;
  - **Gaúcho contemporâneo** — personalidade/linguagem/generosidade visual/produto, não clichês;
  - **Artesanal digital** (futuro, somente com assets reais/coerentes) — stickers, doodles, texturas sutis, elementos de embalagem, micro-ilustrações;
  - **Motion** — movimento comunica qualidade, não chama atenção para si;
  - **Performance** — toda animação respeita `prefers-reduced-motion`, lazy loading, CLS e mobile performance.
- **Deliberadamente NÃO implementado (registrado como fases futuras possíveis):** PWA; backend; banco de dados; autenticação; gateway; pagamento real; integração iFood; WhatsApp dinâmico; Google Maps API; Instagram feed; Schema markup; avaliações externas; novas páginas institucionais; redesign completo; mudança de identidade cromática; nova fonte; troca de framework; nova biblioteca de animação. (Todos constam como candidatos futuros na seção de próximos passos da fase de produto.)
- **Alterações efetivamente realizadas neste lote:** nenhuma em código — apenas auditoria (build + navegador real + git) e **registro documental no ROADMAP**. O working tree continua com as alterações dos Lotes 11 e 11.1 (hero corrigido + transições + microinterações).
- **Checkpoint:** build ✅ 0 erros/0 warnings; `git diff --check` limpo; nenhum `console.log` novo; nenhum segredo; nenhum HTML de produção alterado; `implementation_plan.md` intacto (hash `98bc0141…`); `CartContext` e `package.json` intactos; 7 rotas validadas no navegador.
- **Status Git:** **SEM COMMIT / SEM PUSH** — working tree com alterações dos Lotes 11, 11.1 e deste roadmap; remoto intacto (HEAD = origin/main = `b71b843`).
- **Próximos candidatos de refinamento (registrados, aguardando autorização):** definir CTA do Cardápio quando houver URL oficial do iFood; migração de imagens para assets locais; fotografia real de produto; Schema/GBP para SEO local (quando o domínio de produção existir).

### Lote 13 — Consolidação Visual do Hero + Preparação da Fase de Produto — ✅ CONCLUÍDO (auditoria de confirmação)
- **Objetivo:** consolidar o Hero da Home como a principal peça visual da marca, **sem redesign** — confirmar por auditoria em navegador real que a solução do Lote 11.1 entrega **FOTOGRAFIA PRIMEIRO** (fotografia reconhecível, nítida e desejável antes de qualquer efeito).
- **Auditoria das imagens do Hero (3 slides):**
  - Hero `AB6AXuCSbrOVTg…` (batatas fritas close-up) → **HTTP 200**; presente em `turquia_lanches_homepage_production/code.html` e `index.html_homepage_production/code.html` (fonte #1);
  - Ambiente `AB6AXuAjG-GFqX…` (brinde com cervejas/ambiente) → **HTTP 200**; presente no HTML auditado;
  - Galeria `AB6AXuC34jlT…` → **HTTP 200**; presente no HTML auditado.
  - **Nenhuma URL fabricada/quebrada; nenhuma versão `_fixed`/`_final_audit` quebrada em uso; nenhum stock image.** Migração para assets locais permanece etapa separada da fase de produto (não feita).
- **Auditoria visual real (navegador Chrome):**
  - **Desktop 1280×800:** slide 1 (batatas fritas) nítido e desejável, título/CTAs legíveis, texto NÃO cobre o assunto principal, gradiente localizado atrás do texto (não cobre a foto toda) — **PASS**;
  - **Desktop 1440×900:** fotografia nítida, sem quebra de layout — **PASS**;
  - **Ciclo completo:** slide 1 → 2 → 3 → retorno ao 1, transições suaves **sem flash preto/branco** no meio do crossfade — **PASS**;
  - **Enquadramento individual:** slide 1 (fries bem enquadrado), slide 2 (brinde/ambiente bem focado), slide 3 (bem composto) — nenhum slide visualmente pior que os outros — **PASS**;
  - **Mobile 375×667:** título, descrição, CTAs e burger estático abaixo do texto — tudo visível, com BottomNavBar — **PASS**;
  - **Mobile 390×844:** hero correto + navegação "VER CARDÁPIO" → `/cardapio` com categorias — **PASS**;
  - Zero erros de console; zero imagens 400/404 — **PASS**.
- **Navegação Home → Cardápio:** CTA "VER CARDÁPIO" navega para `/cardapio` com URL correta, categorias renderizando e scroll-to-top; transição de página (fade 260ms do MainLayout) preservada — **sem animação duplicada, sem salto brusco** (já funcionando — não alterado).
- **Conclusão da auditoria:** **NENHUM problema encontrado** — o Hero está APROVADO e **nenhuma alteração de código foi realizada neste lote** (regra: corrigir somente com evidência visual/funcional clara; não fazer redesign por preferência).
- **Performance confirmada:** zero CLS (alturas fixas); zero flash branco/preto no crossfade; preload apenas da 1ª imagem; sem novas dependências; bundle inalterado.
- **Acessibilidade preservada:** `prefers-reduced-motion` (hero estático + sem Ken Burns); `alt` adequado; `aria-hidden` em decorativos; foco por teclado; CTAs acessíveis.
- **Regra de negócio reconfirmada e registrada:** SITE = catálogo + presença institucional + descoberta da marca; PEDIDO = iFood quando o canal oficial estiver definido. Não foi criado checkout comercial novo, pagamento real, backend de pedidos, nem URL de iFood inventada; o fluxo de carrinho/checkout existente permanece preservado (migração técnica) sem expansão.
- **Arquivos alterados neste lote:** nenhum em código — **apenas este registro documental** no ROADMAP (working tree permanece com Lote 11.1 + documentação dos Lotes 11.1/12/13).
- **Checkpoint:** build ✅ 79 módulos · CSS 36.01 kB · JS 242.86 kB · **0 warnings/erros**; `git diff --check` limpo; QA navegador 100% PASS; sem `console.log` novo; sem segredos; HTMLs de produção intactos (0); `implementation_plan.md` intacto (hash `98bc0141…`); `CartContext`/`package.json`/rotas intactos.
- **Status Git:** **SEM COMMIT / SEM PUSH** — HEAD = origin/main = `b71b843`; working tree com 3 arquivos modificados (Lote 11.1 + docs).
- **Pendências reais (fase de produto, aguardando autorização):** preços reais; WhatsApp com texto do pedido; mapa real; definição do CTA do Cardápio quando houver URL oficial do iFood; SEO local (Schema/GBP) quando houver domínio de produção. *(A prioridade #1 — migração de imagens para assets locais — foi executada no Lote 14.)*

### Lote 14 — Migração e Organização dos Assets de Imagem — ✅ CONCLUÍDO
- **Objetivo:** eliminar a dependência externa de `lh3.googleusercontent.com/aida-public/…` migrando todas as imagens para assets próprios/localizados do projeto, **sem alterar o design aprovado** (zero redesign).
- **Auditoria (Etapa 1):** catalogadas **23 URLs de imagem únicas** usadas nas 7 páginas — todas oriundas dos HTMLs de produção (fonte #1), todas `image/jpeg` (mapa = PNG), dimensões 320–512px. Nenhuma URL fabricada, nenhum stock, nenhuma variante `_fixed`/`_final_audit`.
- **Deduplicação real (Etapa 2, por MD5):** várias URLs distintas apontavam para a **MESMA fotografia** nos HTMLs de produção — confirmado por hash e eliminado: 3 logos idênticas (Header/Footer/SuccessIcon → `brand/logo.jpg`); ambiente do hero == destaque "Gigante do Sabor" == hero da Localização == "Super Burger" do preview (→ `hero/hero-ambience.jpg`); `category-lanches` == `turquia-master` == `clássico-turquia`; `category-combos` == `combo-master`; `combo-galera` == `frango-crocante`; `highlight-sweet` == `category-porcoes`. **23 URLs → 16 arquivos físicos únicos (0 duplicatas por MD5).**
- **Estrutura criada (Etapa 3):** `src/assets/images/{hero,home,menu,brand,location}/` — 16 assets:
  - `hero/` → hero-fries.jpg, hero-ambience.jpg, hero-gallery.jpg (exatamente as 3 fotografias aprovadas do Hero);
  - `home/` → gallery-2.jpg, gallery-3.jpg, highlight-sweet.jpg;
  - `menu/` → category-{combos,lanches,bebidas,sobremesas}.jpg, menu-hero.jpg, product-{combo-classico,combo-galera,futuro-turquia}.jpg;
  - `brand/` → logo.jpg; `location/` → map.png.
- **Componentes atualizados (12):** `src/data/menu.js` (8 imports), `src/components/home/{HeroSection,AmbienceSection,GallerySection,FoodHighlights,MenuPreviewSection}.jsx`, `src/components/layout/{Header,Footer}.jsx`, `src/components/confirmation/SuccessIcon.jsx`, `src/components/location/MapEmbed.jsx`, `src/pages/{Location,Menu}.jsx` — todos agora importam os assets locais via Vite (hasheados no build).
- **Hero intacto:** as 3 fotografias aprovadas (fries, ambiente, galeria) importadas de `hero/`; composição, ordem, duração (6s), crossfade (1.6s), Ken Burns (1.02/9s), enquadramento `center`, `prefers-reduced-motion`, preload da 1ª imagem e mobile estático **inalterados**.
- **Bug encontrado e corrigido durante QA:** o `<img>` mobile do hero ainda referenciava `HERO_IMAGE` (constante removida na migração) → `ReferenceError` que derrubava a app. Corrigido para `imgHeroFries` (asset local). Rebuild + reteste → PASS.
- **QA navegador real (Chrome):** Home desktop (ciclo completo dos 3 slides, crossfade limpo, imagens locais carregando, zero 404), Home mobile 375×667 (burger local claro), Cardápio (hero + categorias + produtos), Produto (`combo-master`), Sacola (vazio), Checkout (vazio), Confirmação (guarda + logo), Localização (hero + contato + mapa) — **todas PASS, zero erros de console, zero imagens quebradas**.
- **Build:** ✅ 79 módulos · CSS 36.01 kB · JS **234.53 kB** (reduziu de 242.86 kB — URLs longas substituídas por imports) · **0 warnings / 0 erros** · 16 imagens no `dist/assets`.
- **Referências externas restantes:** **0 em src/** (único match restante é um comentário explicativo em `menu.js`); `contact.js` mantém apenas URLs de contato (WhatsApp/Instagram/Maps — não são imagens).
- **Status Git:** **SEM COMMIT / SEM PUSH** — 12 arquivos modificados + 16 novos (`src/assets/images/`) em working tree; HTMLs de produção intactos (0); `implementation_plan.md` intacto (hash `98bc0141…`); `CartContext`/`package.json`/rotas intactos; `git diff --check` limpo.
- **Limitações/observações:** assets mantidos na qualidade original (JPEG 320–512px, sem compressão agressiva para não alterar percepção); a deduplicação preserva o byte exato da fotografia original (mesmo MD5 da URL de origem); nenhuma biblioteca nova adicionada; site permanece catálogo/institucional (sem e-commerce/backend/pagamento).

### Lote 14.1 — Auditoria e Refinamento do Hero Desktop + Mobile — ✅ CONCLUÍDO
- **Objetivo:** reavaliar o Hero mobile DO ZERO em navegador real (não assumir que a composição atual estava correta) e corrigir a legibilidade do texto sobre a fotografia — preservando o desktop aprovado e o princípio **FOTOGRAFIA PRIMEIRO**.
- **Como o Hero mobile estava (antes):** bloco textual dentro de **caixa translúcida pesada** (`bg-background/50 backdrop-blur-sm p-8 rounded-2xl`) sobre fundo vazio + **imagem estática em largura total ABAIXO do texto** (`<img>` do fries). A primeira dobra ficava longa e densa (~13 elementos visíveis: header, título, parágrafo, 2 CTAs empilhados, imagem gigante, seção seguinte parcialmente visível), com sensação de "desktop espremido" — os auditores descreveram a caixa como "boxed/pesada" e a imagem redundante como concorrência visual (a foto ainda trazia texto embutido "crocante por fora, cremosa por dentro", competindo com o título).
- **Problemas encontrados (auditoria real Chrome — 1280×800, 1440×900, 375×667, 390×844):**
  - **Desktop:** NENHUM — fotografia nítida, gradiente localizado à esquerda, texto/CTAs legíveis, texto não cobre o assunto principal, crossfade limpo (sem flash no meio), slides 2–3 bem enquadrados, retorno ao slide 1 OK. **Aprovado e INTOCADO.**
  - **Mobile:** caixa de texto pesada ("aparência de card" — vetado pelo briefing), primeira dobra longa/densa, imagem redundante abaixo do texto, composição sem intenção própria.
  - **Falso positivo descartado:** agentes relataram "links de navegação desktop no topo no mobile" — verificado por código que o `Header` React usa hambúrguer (`md:hidden`) e o `BottomNavBar` existe; relato incorreto, nenhuma ação necessária (Header/BottomNavBar fora do escopo do Hero).
- **Decisão (Opção C — composição mobile própria, ESTÁTICA):** a mesma fotografia aprovada (fries) virou o **fundo full-bleed do hero mobile** (como o HTML de produção original, que exibia a foto de fundo também no mobile), com **scrim gradiente localizado na base** (`from-background/90 via-background/55 to-transparent`, densidade máxima atrás do texto, dissolvendo até transparência no topo — sem cobrir a foto, sem aparência de card) e **texto alinhado à base** (`items-end md:items-center`). **Removida** a caixa `bg-background/50 backdrop-blur-sm rounded-2xl` e o `<img>` redundante abaixo do texto — a primeira dobra agora é: header → foto full-bleed nítida → título/proposta → CTAs, tudo em ~1 dobra. Sem imagem nova, sem stock, sem URL fabricada.
- **Mobile estático vs dinâmico (A/B/C avaliados):** Opção A (estático antigo) descartada por evidência visual (primeira dobra densa, caixa pesada). Opção B (crossfade mobile igual ao desktop) **descartada**: performance mobile e legibilidade primeiro (diretriz do Lote 12 + seção Performance deste briefing); uma fotografia estática excelente vence um slideshow que compete com o texto na primeira dobra. Opção C (composição própria estática, mesma foto aprovada) **adotada** — resultado visualmente superior validado em navegador.
- **Os 3 slides no mobile:** mobile usa o slide 1 (fries) como fundo estático; slides 2–3 (ambiente/brinde, galeria) continuam exclusivos do crossfade desktop (coerência sem duplicação de efeitos).
- **Alterações de código:** somente `src/components/home/HeroSection.jsx` — (1) nova camada de fundo mobile `md:hidden` com `imgHeroFries` (`backgroundPosition: center`, `role="img"` + `aria-label`); (2) scrim mobile `md:hidden` na base (gradiente localizado, `pointer-events-none` + `aria-hidden`); (3) seção `items-end md:items-center` (texto à base no mobile); (4) removidas as classes de caixa do container textual e o `<img>` mobile redundante; (5) comentário de decisão documentado no topo do arquivo. `src/styles/index.css` **inalterado** (não foi necessário tocar em Ken Burns/transições).
- **Comportamento desktop:** crossfade 3 slides, 6s, 1.6s, Ken Burns 1.02/9s, gradiente esquerdo, `md:h-[819px]`, `prefers-reduced-motion` e preload da 1ª imagem — **tudo inalterado**.
- **Comportamento mobile:** fundo full-bleed estático + scrim base + texto à base; `prefers-reduced-motion` naturalmente preservado (sem animação no mobile); zero CLS (`min-h-[600px]` mantido); sem preload adicional.
- **QA navegador real (Chrome):**
  - **375×667:** foto full-bleed nítida, título/CTAs legíveis sobre o scrim, gradiente apenas na base (topo da foto limpo), enquadramento do prato/batatas correto, primeira dobra curta e limpa, sem imagem duplicada — **PASS**;
  - **390×844:** mesma composição, hierarquia clara (título → proposta → foto apetitosa → CTA), altura ideal — **PASS**;
  - **Desktop 1280×800:** crossfade 3 slides confirmado, gradiente esquerdo, CTAs legíveis — **PASS**;
  - **Desktop 1440×900:** fotografia nítida, texto legível, gradiente atrás do texto — **PASS**;
  - Zero erros de console; zero imagens 400/404 (assets locais) — **PASS**.
- **Isolamento/regressão:** `HeroSection` é importado **somente** por `src/pages/Home.jsx` — nenhuma outra rota consome o componente (regressão impossível por esta alteração); roteamento intocado; navegação Home → Cardápio já validada nos Lotes 13/14 sem alteração de rotas. (Agente de navegação do browser-use indisponível nesta execução; coberto por evidência de código + build + auditorias anteriores.)
- **Build:** ✅ 79 módulos · CSS 36.45 kB · JS 234.70 kB · **0 warnings / 0 erros**.
- **Arquivos alterados neste lote (1):** `src/components/home/HeroSection.jsx`. `src/styles/index.css` intocado.
- **Status Git:** **SEM COMMIT / SEM PUSH** — working tree acumula o Lote 14 (12 arquivos + 16 assets) + este Hero (HeroSection.jsx) + roadmap; HEAD = origin/main = `39532c4`; HTMLs de produção intactos (0); `implementation_plan.md` intacto (hash `98bc0141…`); `CartContext`/`package.json`/rotas intactos; `git diff --check` limpo.
- **Decisão registrada:** mobile = composição própria estática (Opção C), alinhada ao HTML de produção original (foto de fundo no mobile) e à direção "premium acessível + artesanal" — sem e-commerce, sem novas imagens, sem alteração no restante do sistema.

### Lote 14.2 — Correção Pontual do Texto do Hero — ✅ CONCLUÍDO
- **Objetivo:** fazer o texto de apoio ("Sabor raiz, ingredientes frescos e aquele exagero que a gente ama. O melhor lanche da cidade te espera.") parecer parte de uma composição editorial/premium sobre a fotografia — **sem redesign, sem alterar imagens/slideshow/crossfade/Ken Burns/rotas**. Conteúdo do texto intacto (proibido novo copywriting).
- **Problema encontrado:**
  1. O parágrafo tinha um **chip/painel translúcido** (`bg-background/30 px-2 rounded`) atrás do texto — exatamente o tipo de "caixa sobre a foto" vetado pelo briefing;
  2. `max-w-lg` (512px) era largo demais no mobile (375/390px) → quebras de linha irregulares;
  3. **Problema de contraste do título**: auditores visuais (390×844) relataram "título marrom escuro sobre fundo escuro". Análise geométrica objetiva (tokens: display-xl-mobile 36px/lh 1.1, body-lg 18px/lh 1.6, stack-tight 8px, stack-loose 32px, gutter 16px, Button lg ≈48px) calculou o bloco textual em **~366px da base** — com o scrim em h-1/2 (300px) e mesmo h-[60%] (360px), o **título ficava ACIMA da zona densa do scrim**, dependendo do recorte da fotografia (inconsistente entre 375 e 390).
- **Solução adotada (somente HeroSection.jsx + index.css):**
  - Removido o chip `bg-background/30 px-2 rounded` (parágrafo agora direto sobre a fotografia, apenas `drop-shadow-sm` para legibilidade);
  - Largura de leitura mobile reduzida: `max-w-[300px] md:max-w-lg` — quebras naturais e foto visível nas laterais;
  - Quebra de linhas editorial via `text-wrap: pretty` (CSS nativo, sem dependência): classe `.hero-tagline` adicionada em `src/styles/index.css`;
  - **Scrim mobile ajustado para cobrir todo o bloco textual**: `h-[70%]` `bg-gradient-to-t from-background/95 via-background/85 to-background/35` — densidade máxima atrás de título/texto/CTAs com **piso suave de 35%** no topo do scrim (sem borda dura, sem painel sólido); a fotografia permanece **totalmente nítida no topo do hero** (acima de 70%).
  - Desktop: preservado integralmente (slideshow, Ken Burns, gradiente esquerdo localizado, enquadramento) — única mudança foi a remoção do mesmo chip do parágrafo (consistência editorial) e o `hero-tagline`.
- **QA navegador real (Chrome):**
  - **375×667:** título e parágrafo perfeitamente legíveis sem caixa/chip; foto de batatas nítida no topo; botões legíveis e espaçados; primeira dobra limpa — **PASS**;
  - **390×844:** idem — contraste resolvido pelo scrim h-[70%]; gradiente NÃO cobre o topo (foto nítida); zero erros — **PASS**;
  - **Desktop 1280×800:** parágrafo legível sobre o gradiente esquerdo, sem chip; gradiente localizado à esquerda com foto visível à direita; **crossfade confirmado** (fries → brinde após 7s) — **PASS**;
  - Zero erros de console; zero imagens quebradas (assets locais) — **PASS**.
  - *Nota de QA:* agentes de screenshot do browser-use são subjetivos/inconsistentes (mesmo layout avaliado ora "perfeitamente legível" ora "contraste deficiente"); a decisão final foi baseada em **análise geométrica determinística** (posição do título vs. zona densa do scrim calculada a partir dos tokens), com confirmação visual em ambos os viewports.
- **`prefers-reduced-motion`:** preservado — mobile já é estático; o intervalo do crossfade desktop continua desativado via `matchMedia`; Ken Burns desativado via `@media` (regras intactas no index.css).
- **Arquivos alterados (2):** `src/components/home/HeroSection.jsx` (parágrafo + scrim + comentário documental), `src/styles/index.css` (`.hero-tagline`). Nenhum outro arquivo, componente, asset, rota, CartContext, menu ou package.json alterado.
- **Build:** ✅ 79 módulos · CSS 36.08 kB · JS 234.65 kB · **0 warnings / 0 erros**.
- **Status Git:** **SEM COMMIT / SEM PUSH** — 2 arquivos modificados no working tree; HEAD = origin/main = `1ccb210`; HTMLs de produção intactos (0); `implementation_plan.md` intacto (hash `98bc0141…`); `git diff --check` limpo; sem `console.log`; sem dependências novas.

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

### Estado do Git histórico da migração

- **Atualização pós-Lote 10:** a migração foi commitada e enviada ao remoto após o Lote 10 — commit `a1ae7b6` ("feat: complete checkout confirmation and location flows", push para `origin/main` autorizado pelo usuário).
- **Lote 11 (refinamento visual):** commit `66ac14b` ("feat: refine visual experience and image transitions", 8 arquivos) criado e **enviado a `origin/main`** (push autorizado). HEAD = origin/main = `66ac14b`; working tree limpa.
- **Durante a migração (Lotes 1–10):** nada foi commitado até o commit autorizado; o remoto foi alterado apenas pelo push autorizado de `a1ae7b6`.
- **HTMLs de produção intactos.** Nenhum dos 7 diretórios `*_production/` foi modificado.
- **`implementation_plan.md` intacto.** Hash idêntico ao commit-base (`98bc0141…`).
- **Novos arquivos (criados na migração, não commitados):** ~50 arquivos em `src/` (componentes, páginas, contexto, dados, utilitários, layouts, estilos).
- **Arquivos existentes modificados (não commitados):** `package.json`, `vite.config.js`, `tailwind.config.js` → `tailwind.config.cjs`, `postcss.config.js`, `index.html` (entry Vite), `.gitignore`, `src/styles/index.css`, `src/layouts/MainLayout.jsx`, `src/App.jsx`, `src/contexts/CartContext.jsx`, `src/pages/Checkout.jsx`, `documentacao/ROADMAP_MIGRACAO.md`.

### Fase de produto — próximos passos priorizados (pós-Lote 11, fora do escopo da migração)

Lista priorizada definida com o usuário (não é um lote formal; ordem de valor de produto):

1. **Imagens próprias/localizadas** — remover a dependência das URLs externas `lh3.googleusercontent.com/aida-public/…` (25 imagens em 7 páginas): baixar/otimizar para `public/` e atualizar os componentes para assets locais.
2. **Preços e dados reais** — substituir os mocks `R$ --,--` de `src/data/menu.js` pelos valores verdadeiros do restaurante.
3. **WhatsApp real do pedido** — montar a mensagem do pedido automaticamente a partir da sacola/checkout via `wa.me` (estrutura já preparada no Lote 8; link real `shre.ink/turquiamarica` em `src/data/contact.js`).
4. **Mapa real** — substituir o placeholder por embed Google Maps ou alternativa (sem SDK/serviço externo novo sem necessidade).
5. **Persistência do pedido** — backend/banco (ex.: Supabase) para pedidos e histórico.
6. **Pagamento real** — PIX/cartão via gateway.
7. **SEO e títulos por rota** — `react-helmet` ou similar + meta tags por rota.
8. **Testes automatizados** — unitários (Vitest/Jest) + E2E (Playwright).
9. **Deploy/produção definitivo** — Vercel (ou similar).

Outros itens registrados: horários oficiais ("Em breve" na Localização), páginas institucionais (Sobre Nós, Avaliações, Termos, Privacidade, Contato), autenticação, taxa de entrega real.

### Skills avaliadas para a fase de produto (via `npx skills find` — NENHUMA instalada)

| Área | Skill | Instalações | Fonte |
|:---|:---|:---|:---|
| Deploy Vercel | `vercel-labs/agent-skills@deploy-to-vercel` | 106K | **Oficial Vercel** ⭐ |
| SEO | `addyosmani/web-quality-skills@seo` | 38.7K | **Addy Osmani / Google Chrome** ⭐ |
| Testes E2E | `bobmatnyc/claude-mpm-skills@playwright-e2e-testing` | 2.7K | comunidade |
| Testes React | `affaan-m/ecc@react-testing` | 3.1K | comunidade |
| WhatsApp | `claude-office-skills/skills@whatsapp-automation` | 5.3K | comunidade |
| WhatsApp | `gokapso/agent-skills@integrate-whatsapp` | 3.4K | comunidade |
| **Figma** | `heygen-com/hyperframes@figma` | 77.4K | comunidade |
| **Figma** | `figma/mcp-server-guide@figma-use` / `@implement-design` | ~6K | **Oficial Figma** ⭐ |
| **Figma** | `openai/skills@figma-implement-design` | 5K | OpenAI |

- **Figma:** úteis para implementar designs React a partir de arquivos/mockups Figma (caso o cliente forneça um design novo em Figma, em vez do Stitch).
- **Supabase:** skills comunitárias encontradas são fracas (<300 instalações) — usar as skills oficiais `supabase`/`supabase-postgres-best-practices` já pré-carregadas no ambiente do agente.
- ⭐ = fontes oficiais/respeitáveis (prioridade na instalação). Skills comunitárias não são auditadas.

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
