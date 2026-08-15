import { useEffect, useRef, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import logo from '../../assets/images/brand/logo-96.webp'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'
import useActiveSection from '../../hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'Cardápio', id: 'cardapio' },
  { label: 'Sobre nós', id: 'sobre' },
  { label: 'Localização', id: 'localizacao' },
  { label: 'Reviews', id: 'reviews' },
]

const linkClasses = (isActive) =>
  `nav-link inline-flex min-h-11 items-center px-3 font-body-md text-sm font-medium transition-colors duration-tactile ease-tactile after:transition-transform after:duration-smooth after:ease-smooth hover:text-primary active:scale-95 ${isActive ? 'nav-link-active text-primary' : 'text-on-surface-variant'}`

function Header() {
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const activeSection = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined

    const firstLink = menuRef.current?.querySelector('a')
    firstLink?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = [...(menuRef.current?.querySelectorAll('a') ?? []), toggleRef.current].filter(Boolean)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf7f2]/95 shadow-[0_1px_0_#e8e0d4] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[1280px] items-center justify-between gap-3 px-4 md:h-[76px] md:px-margin-desktop">
        <a href="#topo" aria-label="Turquia Lanches — início" className="flex items-center gap-3 rounded-lg focus-visible:outline-offset-4">
          <img src={logo} alt="Turquia Lanches" width="48" height="48" className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12" />
          <span className="hidden font-headline-md text-base font-extrabold uppercase leading-none tracking-[-0.03em] text-on-surface sm:block">Turquia<br/><span className="text-primary">Lanches</span></span>
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={`#${link.id}`} aria-current={activeSection === link.id ? 'location' : undefined} className={linkClasses(activeSection === link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={ShoppingBag}
            className="cta-fill-primary hidden min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-on-primary transition-all duration-tactile ease-tactile hover:shadow-lg active:scale-95 md:inline-flex"
            unavailableClassName="hidden min-h-11 cursor-not-allowed items-center gap-2 px-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant/70 md:inline-flex"
          >
            Pedidos em breve
          </ChannelAction>
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-primary transition-all duration-tactile ease-tactile hover:bg-surface-container-low active:scale-90 md:hidden"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="menu-mobile"
          ref={menuRef}
          aria-label="Menu mobile"
          className="flex min-h-[calc(100svh-64px)] flex-col gap-3 bg-[#1a1008]/98 px-margin-mobile pb-8 pt-8 text-white md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={`#${link.id}`} onClick={() => setMenuOpen(false)} aria-current={activeSection === link.id ? 'location' : undefined} className={linkClasses(activeSection === link.id)}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

export default Header
