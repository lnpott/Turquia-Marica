# PLANO DE IMPLEMENTAÇÃO APROVADO
## Turquia Lanches — Migração HTML Estático → React/Vite
> **Projeto Stitch:** `projects/10254386617209499733`  
> **Workspace:** `turquia-lanches-app` | commit `9bccbf7`  
> **Status:** Somente planejamento. Nenhum arquivo será alterado até aprovação.

---

## Análise Comparativa: Local vs. Stitch

### Descobertas Críticas do Código Local

**O que existe e está CORRETO (preservar):**
- Design system "Sabor e Tradição" em `sabor_e_tradi_o/DESIGN.md` — paleta completa e perfeita.
- Token de cores nos HTMLs de produção (Sacola, Checkout, Confirmação, Localização) **coincidem exatamente** com o Stitch (primary `#ae0011`, secondary-container `#fdc008`, background `#fff8f6`).
- Configuração tipográfica: `Rubik` (display/headline/price) + `DM Sans` (body/label) — idêntica ao Stitch.
- Espaçamentos: `margin-desktop: 64px`, `margin-mobile: 20px`, `stack-loose: 32px`, `gutter: 16px` — já corretos.
- Estrutura visual do `<header>` (sticky, backdrop-blur, border-b, z-50) — pode ser extraído diretamente.
- `<nav>` BottomNavBar (mobile, fixed bottom) com 4 itens: Home, Cardápio, Pedidos, Perfil — estrutura já correta.
- Grid layout da Sacola (12 cols, `lg:col-span-8` + `lg:col-span-4`) — já alinhado com o Stitch.
- Componente `QuantitySelector` na Sacola (remove/add com borda `rounded-full`) — já perfeito, extrair direto.

**O que está DIVERGENTE (corrigir):**
- `tailwind.config.js` local usa paleta **incompleta** — falta `secondary-container`, `surface-container-low`, etc. Os HTMLs de produção têm a paleta correta embutida como config inline. Precisa ser consolidado.
- `src/styles/main.css` usa `@apply bg-primary` e `@apply bg-surface` mas o Tailwind local não define essas classes corretamente.
- `index.html` (Homepage) usa `primary-container` como botão primário — no Stitch, o botão é `bg-primary text-white`. Divergência de estilo nos CTAs da Home.
- O `tailwind.config.js` local define `body: ['Rubik']` como font-body, mas o Stitch e todos os HTMLs de produção usam `DM Sans` para body. **Erro que afeta toda a tipografia.**
- Cardápio local usa `max-w-[1440px]` mas o Stitch e demais páginas usam `max-w-[1280px]`. Inconsistência de largura máxima.
- `package.json` não tem `react`, `react-dom`, `react-router-dom`. Stack incompleta.

**O que precisa ser CRIADO do zero:**
- Toda a estrutura React (`src/main.jsx`, `src/App.jsx`, roteamento).
- Tela `/produto` — não existe HTML de produção local para Detalhes do Produto (apenas a tela no Stitch: `73ceb94452bb4dfdbad564b899651f44` e `1150c4b8a8154a41b58357cb0c81c5ca`).
- `CartContext` para estado global do carrinho.
- Dados do cardápio (`src/data/menu.js`) — todos os HTMLs têm preços como `R$ --,--` (demonstrativos).

---

## 1. Estrutura de Pastas Proposta (`src/`)

```
src/
├── assets/
│   └── images/          # Logo e assets locais (extraídos dos URLs do Stitch/Google)
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # TopNavBar (desktop + mobile hamburger)
│   │   ├── BottomNavBar.jsx    # NavBar mobile fixed bottom
│   │   └── Footer.jsx          # Footer padrão (4 colunas desktop)
│   │
│   ├── ui/
│   │   ├── Button.jsx          # Variantes: primary, secondary, ghost, whatsapp
│   │   ├── Badge.jsx           # "Economize", "Mais Vendido", "Novo"
│   │   ├── QuantitySelector.jsx # Input +/- com borda rounded-full
│   │   └── SectionTitle.jsx    # Título + subtítulo de seções
│   │
│   ├── product/
│   │   ├── ProductCard.jsx     # Card de produto (imagem topo, preço, add button)
│   │   ├── CategoryCard.jsx    # Card de categoria (imagem + overlay label)
│   │   └── CartItem.jsx        # Item na sacola (imagem lateral, qty, preço, delete)
│   │
│   └── cart/
│       ├── CartSummary.jsx     # Resumo do pedido (subtotal, taxa, total)
│       └── CartBadge.jsx       # Badge com contador no ícone do carrinho
│
├── contexts/
│   └── CartContext.jsx         # Estado global: items, addItem, removeItem, updateQty, total
│
├── data/
│   └── menu.js                 # Produtos, categorias, preços, descrições, imagens
│
├── layouts/
│   └── MainLayout.jsx          # Wrapper: Header + {children} + Footer + BottomNavBar
│
├── pages/
│   ├── Home.jsx                # /
│   ├── Menu.jsx                # /cardapio
│   ├── ProductDetails.jsx      # /produto/:id
│   ├── Cart.jsx                # /sacola
│   ├── Checkout.jsx            # /checkout
│   ├── Confirmation.jsx        # /confirmacao
│   └── Location.jsx            # /localizacao
│
└── styles/
    ├── index.css               # @tailwind base/components/utilities + :root vars
    └── components.css          # .ambient-shadow, .card-shadow, .scrolling-wrapper
```

---

## 2. Componentes Compartilhados

| Componente | Origem no HTML Local | Stitch Reference | Notas |
|:---|:---|:---|:---|
| `Header` | Todos os HTMLs (header sticky) | Todas as telas | Desktop nav pill + mobile hamburger |
| `BottomNavBar` | `index.html`, `sacola` code.html | Telas mobile | 4 itens: Home, Cardápio, Pedidos, Perfil. Active state via `useLocation()` |
| `Footer` | `index.html`, `sacola` code.html | Homepage Desktop | Grid 4 cols desktop, 1 col mobile |
| `Button` | Todos os HTMLs | Design System | Variantes: solid red, ghost, whatsapp green |
| `Badge` | Cardápio `code.html` (`Economize`) | Cardápio Desktop | `bg-secondary-container` rounded-full |
| `ProductCard` | Cardápio `code.html` (combos) | Cardápio Desktop/Mobile | Imagem + título + preço + add |
| `CategoryCard` | Cardápio `code.html` (categorias) | Cardápio Desktop | Imagem com overlay gradient |
| `CartItem` | Sacola `code.html` | Sacola Production | Imagem lateral, qty selector, delete |
| `QuantitySelector` | Sacola `code.html` (perfeito) | Sacola Mobile | `remove / count / add` com rounded-full |
| `CartSummary` | Sacola `code.html` (sticky right col) | Sacola Production | Subtotal, taxa, desconto, total, CTA |
| `CartBadge` | Não existe ainda | Cardápio Desktop | Bolha vermelha com count no ícone |

---

## 3. Mapeamento de Páginas

### `/` — Homepage

| Item | Valor |
|:---|:---|
| **HTML local de referência** | `index.html` (raiz do projeto) |
| **Tela Stitch Mobile** | `7ca30246...` (index.html - Mobile Rebirth V3.1) |
| **Tela Stitch Desktop** | `6bd252bd...` (Narrativa e Ritmo Desktop) |
| **Componentes compartilhados** | `Header`, `BottomNavBar`, `Footer` |
| **Componentes específicos** | `HeroSection`, `AmbienceSection`, `FoodHighlights`, `MenuPreviewSection` |
| **Comportamento** | Landing page editorial. `MenuPreviewSection` exibe 3 cards de produto com CTA para `/cardapio`. Botão "Peça Agora" → `/cardapio`. |

**Convergência local/Stitch:** Alta. Estrutura do hero, seções de galeria e prévia do menu já existem localmente. Principal divergência: CTA buttons (local usa `primary-container`, Stitch usa `bg-primary text-white`).

---

### `/cardapio` — Cardápio

| Item | Valor |
|:---|:---|
| **HTML local de referência** | `turquia_lanches_card_pio_production/code.html` |
| **Tela Stitch Mobile** | `a0c2d94e...` (cardapio.html - Mobile Rebirth V3.1) |
| **Tela Stitch Desktop** | `86a10f72...` (Cardápio Production - Final Audit) |
| **Componentes compartilhados** | `Header`, `BottomNavBar`, `Footer`, `CategoryCard`, `ProductCard`, `Badge` |
| **Componentes específicos** | `CategoryFilterBar`, `ProductGrid`, `StickyCartBar` (mobile) |
| **Comportamento** | Filtro de categorias horizontal scroll. Grid de produtos (1 col mobile, 2 cols md, 3 cols xl). Click em produto → `/produto/:id`. Add to cart → atualiza `CartContext`. |

**Convergência local/Stitch:** Alta. HTML local tem as 5 categorias (Combos, Lanches, Porções, Bebidas, Sobremesas), grid de combos e cards com badge "Economize". Divergência: `max-w-[1440px]` local vs `max-w-[1280px]` no Stitch.

---

### `/produto/:id` — Detalhes do Produto

| Item | Valor |
|:---|:---|
| **HTML local de referência** | **Não existe** |
| **Tela Stitch Desktop** | `73ceb944...` (Produto Desktop Refinado) |
| **Tela Stitch Mobile** | `1150c4b8...` (Produto Mobile Refinado) |
| **Componentes compartilhados** | `Header`, `BottomNavBar`, `Button`, `QuantitySelector` |
| **Componentes específicos** | `ProductHero`, `ProductCustomization`, `AddonsSelector`, `ObservationsField`, `AddToCartBar` |
| **Comportamento** | Recebe `id` do produto via URL params. Exibe imagem hero, descrição, seleção de opcionais (ponto da carne, adicionais), campo de observações, `QuantitySelector` e botão "Adicionar à Sacola" → atualiza `CartContext` e navega para `/sacola` ou retorna ao cardápio. |

**Convergência local/Stitch:** Baixa. Página não existe localmente. Deve ser construída **exclusivamente** a partir das telas `73ceb944` e `1150c4b8` do Stitch.

---

### `/sacola` — Sacola

| Item | Valor |
|:---|:---|
| **HTML local de referência** | `turquia_lanches_sacola_production/code.html` |
| **Tela Stitch Desktop** | `cf81049c...` (Sacola Production - Final Audit) |
| **Tela Stitch Mobile** | `184cdd73...` (Sacola Mobile UX Optimized) |
| **Componentes compartilhados** | `Header`, `BottomNavBar`, `Footer`, `CartItem`, `QuantitySelector`, `Button` |
| **Componentes específicos** | `CartSummary`, `EmptyCartState` |
| **Comportamento** | Lista itens do `CartContext`. `QuantitySelector` atualiza quantidade em tempo real. Botão delete remove item. `CartSummary` calcula e exibe subtotal + total. CTA "Finalizar Pedido" → `/checkout`. |

**Convergência local/Stitch:** Muito Alta. HTML local está praticamente idêntico ao Stitch. Grid 12 cols com 8+4 split, `CartItem` com imagem lateral, `QuantitySelector` rounded-full, `CartSummary` sticky — tudo correto e pode ser extraído diretamente.

---

### `/checkout` — Checkout

| Item | Valor |
|:---|:---|
| **HTML local de referência** | `turquia_lanches_checkout_production/code.html` |
| **Tela Stitch Desktop** | `5027f9aa...` (Checkout Desktop) |
| **Componentes compartilhados** | `Header`, `Button` |
| **Componentes específicos** | `DeliverySelector`, `AddressForm`, `PaymentSelector`, `OrderSummaryPanel` |
| **Comportamento** | Toggle Entrega/Retirada. Form de endereço (condicional — só aparece em Entrega). Seleção de pagamento (PIX, Cartão, Dinheiro). Painel lateral com resumo do pedido (extraído do `CartContext`). CTA "Confirmar Pedido" → `/confirmacao`. Sem BottomNavBar (fluxo de checkout linear). |

**Convergência local/Stitch:** Alta. HTML local tem estrutura de 2 colunas (form + summary), inputs com focus red, toggle de opções. Input focus `border-color: #ae0011` já correto.

---

### `/confirmacao` — Confirmação

| Item | Valor |
|:---|:---|
| **HTML local de referência** | `turquia_lanches_confirma_o_production/code.html` |
| **Tela Stitch Desktop** | `824e366e...` (Confirmação Production) |
| **Componentes compartilhados** | `Header`, `Button` |
| **Componentes específicos** | `SuccessAnimation`, `OrderSummaryConfirm`, `WhatsAppButton` |
| **Comportamento** | Exibe nº do pedido, estimativa de tempo, resumo dos itens. Botão WhatsApp abre link `wa.me/` com o pedido formatado em texto. CTA "Voltar ao Início" → `/`. Após navegar aqui, `CartContext` deve ser limpo. |

**Convergência local/Stitch:** Média. HTML local tem a estrutura básica mas falta a integração real com o CartContext para exibir os itens confirmados.

---

### `/localizacao` — Localização

| Item | Valor |
|:---|:---|
| **HTML local de referência** | `turquia_lanches_localiza_o_production/code.html` |
| **Tela Stitch Desktop** | `b4d2755a...` (Localização Production) |
| **Tela Stitch Mobile** | `4bf47c60...` (Localização e Contato Mobile) |
| **Componentes compartilhados** | `Header`, `BottomNavBar`, `Footer`, `Button` |
| **Componentes específicos** | `MapEmbed`, `ContactCard`, `HoursTable`, `WhatsAppButton` |
| **Comportamento** | Endereço: Parque Nanci, Maricá/RJ. Horário de funcionamento. Mapa Google Maps embed. Botões de contato direto (WhatsApp, telefone). |

**Convergência local/Stitch:** Alta. HTML local bem estruturado. Principal ajuste: componentizar os cards de informação.

---

## 4. Estratégia de Estado

### Decisão: Context API (sem Zustand)

**Justificativa técnica:**
- O fluxo de estado é linear e previsível: o carrinho é criado no `/cardapio`, incrementado em `/produto`, exibido em `/sacola`, lido em `/checkout` e limpo em `/confirmacao`.
- Não há subscriptions paralelas, middlewares de logging ou estado assíncrono complexo que justifiquem Zustand.
- Context API com `useReducer` é suficiente e não adiciona dependência ao `package.json`.

### Estrutura do `CartContext`

```jsx
// Estado
{
  items: [{ id, name, image, price, qty, addons, observations }],
  deliveryType: 'delivery' | 'pickup'
}

// Ações (useReducer)
ADD_ITEM      → adiciona ou incrementa qty
REMOVE_ITEM   → remove por id
UPDATE_QTY    → atualiza qty (min 1)
CLEAR_CART    → limpa após confirmação
SET_DELIVERY  → salva preferência de entrega/retirada

// Seletores (useMemo)
cartTotal     → soma de (price * qty) por item
cartCount     → soma de qty de todos os itens
```

**Páginas que consomem o contexto:**
- `ProductDetails.jsx` → `addItem()`
- `Cart.jsx` → `items`, `removeItem()`, `updateQty()`, `cartTotal`
- `Checkout.jsx` → `items`, `cartTotal`, `setDelivery()`
- `Confirmation.jsx` → `items`, `clearCart()`
- `Header.jsx` / `BottomNavBar.jsx` → `cartCount` (badge)

---

## 5. Responsividade

### Estratégia: Mobile-First, uma única aplicação

A responsividade é gerenciada via breakpoints Tailwind (`md:`, `lg:`), **não** via duas rotas separadas.

| Breakpoint | Comportamento |
|:---|:---|
| `< 768px` (mobile) | 1 coluna. `BottomNavBar` visível. `Header` simplificado com logo + hamburger. |
| `>= 768px` (tablet/desktop) | `BottomNavBar` oculto (`md:hidden`). `Header` com nav horizontal. Grids expandem para múltiplas colunas. |
| `>= 1280px` | `max-w-[1280px]` centralizado com `mx-auto`. Paddings laterais: `px-margin-desktop` (64px). |

### Referências visuais por página e breakpoint

| Página | Referência Mobile (Stitch) | Referência Desktop (Stitch) |
|:---|:---|:---|
| Homepage | `7ca30246` | `6bd252bd` |
| Cardápio | `a0c2d94e` | `86a10f72` |
| Produto | `1150c4b8` | `73ceb944` |
| Sacola | `184cdd73` | `cf81049c` |
| Checkout | *(sem referência mobile — usar desktop adaptado)* | `5027f9aa` |
| Confirmação | *(sem referência mobile — usar desktop adaptado)* | `824e366e` |
| Localização | `4bf47c60` | `b4d2755a` |

---

## 6. Sequência de Implementação em Lotes

---

### LOTE 1 — Infraestrutura React/Vite

**Objetivo:** Transformar o repositório num projeto React funcional sem quebrar nada existente.

**Arquivos a criar/modificar:**
- `MODIFICAR` `package.json` → adicionar `react`, `react-dom`, `react-router-dom`
- `MODIFICAR` `vite.config.js` → criar arquivo com plugin `@vitejs/plugin-react`
- `CRIAR` `src/main.jsx` → entry point React
- `CRIAR` `src/App.jsx` → `<BrowserRouter>` + `<Routes>`
- `CRIAR` `index.html` (root) → substituir pelo `<div id="root">` padrão Vite/React
- `MANTER` todo o resto intacto

---

### LOTE 2 — Design System e Componentes Globais

**Objetivo:** Consolidar a paleta correta em `tailwind.config.js` e criar os componentes de layout.

**Arquivos a criar/modificar:**
- `MODIFICAR` `tailwind.config.js` → paleta completa do `sabor_e_tradi_o/DESIGN.md`
- `MODIFICAR` `src/styles/index.css` → `@tailwind` directives + `.ambient-shadow`, `.card-shadow`
- `CRIAR` `src/layouts/MainLayout.jsx`
- `CRIAR` `src/components/layout/Header.jsx`
- `CRIAR` `src/components/layout/BottomNavBar.jsx`
- `CRIAR` `src/components/layout/Footer.jsx`
- `CRIAR` `src/components/ui/Button.jsx`
- `CRIAR` `src/components/ui/Badge.jsx`
- `CRIAR` `src/components/ui/QuantitySelector.jsx`

---

### LOTE 3 — Homepage (`/`)

**Referências:** `index.html` local + Stitch `7ca30246` e `6bd252bd`

**Arquivos a criar/modificar:**
- `CRIAR` `src/pages/Home.jsx`
- `CRIAR` `src/components/home/HeroSection.jsx`
- `CRIAR` `src/components/home/AmbienceSection.jsx`
- `CRIAR` `src/components/home/GallerySection.jsx`
- `CRIAR` `src/components/home/MenuPreviewSection.jsx`

---

### LOTE 4 — Cardápio (`/cardapio`)

**Referências:** `turquia_lanches_card_pio_production/code.html` + Stitch `a0c2d94e` e `86a10f72`

**Arquivos a criar/modificar:**
- `CRIAR` `src/data/menu.js` — dados mock dos produtos e categorias
- `CRIAR` `src/pages/Menu.jsx`
- `CRIAR` `src/components/product/CategoryCard.jsx`
- `CRIAR` `src/components/product/ProductCard.jsx`
- `CRIAR` `src/components/menu/CategoryFilterBar.jsx`
- `CRIAR` `src/components/menu/ProductGrid.jsx`

---

### LOTE 5 — Detalhes do Produto (`/produto/:id`) + Personalização

**Referências:** Stitch `73ceb944` (desktop) e `1150c4b8` (mobile) — **criação do zero**

**Arquivos a criar:**
- `CRIAR` `src/pages/ProductDetails.jsx`
- `CRIAR` `src/components/product/ProductHero.jsx`
- `CRIAR` `src/components/product/AddonsSelector.jsx`
- `CRIAR` `src/components/product/ObservationsField.jsx`
- `CRIAR` `src/components/product/AddToCartBar.jsx`

---

### LOTE 6 — Sacola (`/sacola`) + CartContext

**Referências:** `turquia_lanches_sacola_production/code.html` + Stitch `cf81049c` e `184cdd73`

**Arquivos a criar:**
- `CRIAR` `src/contexts/CartContext.jsx`
- `CRIAR` `src/pages/Cart.jsx`
- `CRIAR` `src/components/cart/CartItem.jsx`
- `CRIAR` `src/components/cart/CartSummary.jsx`
- `CRIAR` `src/components/cart/EmptyCartState.jsx`
- `MODIFICAR` `src/components/layout/Header.jsx` → integrar `CartBadge`
- `MODIFICAR` `src/components/layout/BottomNavBar.jsx` → integrar `cartCount`

---

### LOTE 7 — Checkout (`/checkout`)

**Referências:** `turquia_lanches_checkout_production/code.html` + Stitch `5027f9aa`

**Arquivos a criar:**
- `CRIAR` `src/pages/Checkout.jsx`
- `CRIAR` `src/components/checkout/DeliverySelector.jsx`
- `CRIAR` `src/components/checkout/AddressForm.jsx`
- `CRIAR` `src/components/checkout/PaymentSelector.jsx`
- `CRIAR` `src/components/checkout/OrderSummaryPanel.jsx`

---

### LOTE 8 — Confirmação (`/confirmacao`)

**Referências:** `turquia_lanches_confirma_o_production/code.html` + Stitch `824e366e`

**Arquivos a criar:**
- `CRIAR` `src/pages/Confirmation.jsx`
- `CRIAR` `src/components/confirmation/SuccessIcon.jsx`
- `CRIAR` `src/components/confirmation/WhatsAppButton.jsx`
- `CRIAR` `src/components/confirmation/OrderSummaryConfirm.jsx`

---

### LOTE 9 — Localização (`/localizacao`)

**Referências:** `turquia_lanches_localiza_o_production/code.html` + Stitch `b4d2755a` e `4bf47c60`

**Arquivos a criar:**
- `CRIAR` `src/pages/Location.jsx`
- `CRIAR` `src/components/location/MapEmbed.jsx`
- `CRIAR` `src/components/location/ContactCard.jsx`
- `CRIAR` `src/components/location/HoursTable.jsx`

---

### LOTE 10 — Integração e Testes

**Objetivo:** Validar o fluxo completo de ponta a ponta.

**Ações:**
- Verificar navegação: `/` → `/cardapio` → `/produto/:id` → `/sacola` → `/checkout` → `/confirmacao`
- Verificar que `CartContext` persiste entre rotas e é limpo após `/confirmacao`
- Testar `BottomNavBar` active state em todas as páginas mobile
- Validar responsividade nos breakpoints `md` e `lg`
- Verificar que imagens do Google (URLs `lh3.googleusercontent.com/aida-public/`) carregam corretamente
- Confirmar que `<title>` de cada página está correto

---

## 7. Regra Fundamental de Migração

> [!IMPORTANT]
> **O HTML/CSS existente É a fonte de referência — não descarte, extraia.**  
> A estratégia é: **leia o HTML → identifique o componente → extrai o JSX → conecte ao estado**.  
> O Stitch é a referência visual para casos onde o HTML local diverge ou não existe (ex: `/produto`).  
> Nenhuma reconstrução visual do zero é necessária ou autorizada — cada decisão de markup deve ter uma âncora no HTML local ou no Stitch.

---

## Resumo de Arquivos por Categoria

| Categoria | Preservar | Modificar | Criar |
|:---|:---|:---|:---|
| Config | `sabor_e_tradi_o/DESIGN.md`, `mapeamento_de_rotas*.json`, `mapeamento_de_nomes*.md` | `tailwind.config.js`, `package.json`, `vite.config.js` | — |
| Referência | Todos os `*/code.html` e `*/screen.png` | — | — |
| Styles | — | `src/styles/index.css` | `src/styles/components.css` |
| Entry point | — | `index.html` (root) | `src/main.jsx`, `src/App.jsx` |
| Layout | — | — | `src/layouts/MainLayout.jsx`, `src/components/layout/*.jsx` |
| UI | — | — | `src/components/ui/*.jsx` |
| Páginas | — | — | `src/pages/*.jsx` (7 páginas) |
| Componentes | — | — | ~20 componentes específicos |
| Estado | — | — | `src/contexts/CartContext.jsx` |
| Dados | — | — | `src/data/menu.js` |
