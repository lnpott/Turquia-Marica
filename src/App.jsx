import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

// Placeholder temporário para rotas ainda não implementadas
// (Confirmação e Localização).
function PagePlaceholder() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-stack-loose px-margin-mobile py-margin-desktop text-center"
      style={{ minHeight: '60vh' }}
    >
      <h1 className="font-headline-lg text-headline-lg text-primary">Turquia Lanches</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
        Esta página será implementada nos próximos lotes.
      </p>
    </section>
  )
}

// CartProvider envolve toda a árvore: Header e BottomNavBar exibem o contador
// e as páginas (Produto → Sacola → Checkout) compartilham o mesmo estado global.
//
// Layout routes: o fluxo linear do Checkout (Lote 7) não exibe a BottomNavBar
// mobile, conforme o implementation_plan.md.
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            <Route path="/sacola" element={<Cart />} />
            <Route path="*" element={<PagePlaceholder />} />
          </Route>
          <Route element={<MainLayout hideBottomNav />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
