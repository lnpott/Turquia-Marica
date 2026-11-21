import { lazy, Suspense } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmedPage from './pages/OrderConfirmedPage'
import AdminPage from './pages/AdminPage'
import { CartProvider } from './contexts/CartContext'

const visualQaDemoEnabled = import.meta.env.VITE_VISUAL_QA_DEMO === 'true'
const VisualQaDemo = visualQaDemoEnabled ? lazy(() => import('./pages/demo/VisualQaDemo')) : null

function PagePlaceholder() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-stack-loose px-margin-mobile py-margin-desktop text-center"
      style={{ minHeight: '60vh' }}
    >
      <h1 className="font-headline-lg text-headline-lg text-primary">Turquia Lanches</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">A página que você procurou não existe.</p>
      <Link to="/" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-6 py-3 font-label-bold text-on-primary hover:bg-primary-hover">Voltar ao início</Link>
    </section>
  )
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Navigate replace to="/#cardapio" />} />
            <Route path="/localizacao" element={<Navigate replace to="/#localizacao" />} />
            <Route path="/sacola" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/pedido/confirmado" element={<OrderConfirmedPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {visualQaDemoEnabled ? (
              <Route path="/visual-qa-demo" element={<Suspense fallback={null}><VisualQaDemo /></Suspense>} />
            ) : null}
            <Route path="*" element={<PagePlaceholder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
