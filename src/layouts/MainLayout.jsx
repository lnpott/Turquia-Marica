import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BottomNavBar from '../components/layout/BottomNavBar'

// hideBottomNav: fluxos lineares (Checkout/Confirmação) não exibem a BottomNavBar
// mobile, conforme o implementation_plan.md (Lote 7).
function MainLayout({ hideBottomNav = false }) {
  const location = useLocation()

  // LOTE 11 — Toda navegação recomeça no topo (comportamento padrão de SPA).
  // 'instant' evita o scroll suave global (scroll-behavior: smooth) para a
  // navegação não competir com a transição de página. Âncoras internas
  // (#combos/#categorias) não mudam o pathname, então não são afetadas.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-background text-on-background">
      <Header />
      <main className="flex-1">
        {/* key força a remontagem a cada mudança de rota, disparando a animação
            de entrada .page-transition (fade + deslocamento sutil, ~260ms) em
            TODAS as navegações: Header, BottomNavBar, CTAs e fluxo linear. */}
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      {!hideBottomNav && <BottomNavBar />}
    </div>
  )
}

export default MainLayout
