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
- **Context API + `useReducer`** para o carrinho (`src/contexts/CartContext.jsx`) — **implementado no Lote 6** (ações `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR_CART`, `SET_DELIVERY`).
- **Estrutura `src/`:**
  - `src/components/layout/` → Header, BottomNavBar, Footer
  - `src/components/ui/` → Button, Badge, QuantitySelector
  - `src/components/home/` → seções da Homepage
  - `src/components/product/` → ProductCard, CategoryCard, ProductHero, AddonsSelector, ObservationsField, AddToCartBar
  - `src/components/menu/` → CategoryFilterBar, ProductGrid
  - `src/components/cart/` → CartItem, CartSummary, EmptyCartState, CartBadge
  - `src/components/checkout/` → CheckoutField, DeliverySelector, AddressForm, PaymentSelector, OrderSummaryPanel
  - `src/layouts/MainLayout.jsx` → Header + {children/Outlet} + Footer + BottomNavBar (prop `hideBottomNav` para fluxos lineares)
  - `src/pages/` → Home, Menu, ProductDetails, Cart, Checkout (demais páginas nos próximos lotes)
  - `src/data/` → `menu.js` (dados mock)
  - `src/utils/` → `format.js` (formatBRL)
  - `src/contexts/`, `src/styles/` (index.css, main.css)
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
| Confirmação | `/confirmacao` | 8 | PENDENTE | `turquia_lanches_confirma_o_production/code.html` | `824e366e…` | — | CartContext (limpeza) | — |
| Localização | `/localizacao` | 9 | PENDENTE | `turquia_lanches_localiza_o_production/code.html` | `b4d2755a…`, `4bf47c60…` | — | — | — |

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

### Lotes seguintes — ⏳ PENDENTES
- Lote 8 — Confirmação `/confirmacao`.
- Lote 9 — Localização `/localizacao`.
- Lote 10 — Integração e testes de ponta a ponta.

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
