import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNavBar from '../components/layout/BottomNavBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1))
        if (target) {
          target.scrollIntoView({ block: 'start' })
          target.setAttribute('tabindex', '-1')
          target.focus({ preventScroll: true })
          return
        }
      }
      window.scrollTo({ top: 0, behavior: 'auto' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return (
    <div className="brand-pattern flex min-h-screen flex-col text-on-background">
      <a href="#conteudo-principal" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo-principal" className="mobile-bottom-safe flex-1 md:pb-0" tabIndex="-1">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default MainLayout
