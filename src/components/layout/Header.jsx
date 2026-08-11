import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/brand/logo.jpg'
import { IFOOD_URL } from '../../data/contact'

// LOTE 14 — Logo migrado para asset local (src/assets/images/brand/logo.jpg).
const LOGO_URL = logo

const NAV_LINKS = [
  { label: 'Cardápio', to: '/cardapio' },
  { label: 'Sobre Nós', href: '/#sobre' },
  { label: 'Localização', to: '/localizacao' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const linkClasses =
    'font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all duration-200 hover:scale-105'

  return (
    <header className="w-full sticky top-0 z-50 bg-surface shadow-sm">
      <div className="flex justify-between items-center min-h-16 md:h-20 px-4 md:px-margin-desktop max-w-[1280px] mx-auto gap-3">
        <Link
          to="/"
          aria-label="Turquia Lanches - Início"
          className="text-primary hover:scale-105 transition-transform duration-200"
        >
          <img src={LOGO_URL} alt="Turquia Lanches Logo" className="h-11 md:h-12 w-auto object-cover" />
        </Link>

        <nav className="hidden md:flex gap-stack-loose items-center" aria-label="Navegação principal">
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to} className={linkClasses}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={linkClasses}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <a href={IFOOD_URL} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center min-h-11 rounded-lg bg-primary px-5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-hover">
            Peça agora
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden text-primary p-2 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Menu mobile"
          className="md:hidden bg-surface border-t border-outline-variant px-margin-mobile pb-6 pt-2 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={linkClasses}
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={linkClasses}>
                {link.label}
              </a>
            ),
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
