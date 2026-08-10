import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BottomNavBar from '../components/layout/BottomNavBar'

// hideBottomNav: fluxos lineares (Checkout/Confirmação) não exibem a BottomNavBar
// mobile, conforme o implementation_plan.md (Lote 7).
function MainLayout({ hideBottomNav = false }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-on-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {!hideBottomNav && <BottomNavBar />}
    </div>
  )
}

export default MainLayout
