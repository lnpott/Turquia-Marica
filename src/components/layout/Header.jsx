import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import CartBadge from '../cart/CartBadge'

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCrW6vjwO7C27w9Sp86Xkk8v5qPBbn_yes3aPV7uEiAhlcJoGSEthPqEkfAjkxoSUvSEn-ojRG3TE6EJKvH9O2TpG3L4CqHW1dMWzDi2_3NH7aYrkPUuktvKU3BkA5q7ZAr2M7xZ7r4CgpCa7Pn_bCI2eYiVnMR1qBMKUUvPNdG6tRXwxY9qciTuTNxA4RLxasJXmzrjIpmTr0sKT1KeBzHFvxp7QqFCFN9R86YXa_Hh3zq5-gpq9Xu89YrWfN-LZG36Nk'

const NAV_LINKS = [
  { label: 'Cardápio', to: '/cardapio' },
  { label: 'Sobre Nós', href: '#' },
  { label: 'Localização', to: '/localizacao' },
  { label: 'Avaliações', href: '#' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount } = useCart()

  const linkClasses =
    'font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all duration-200 hover:scale-105'

  return (
    <header className="w-full sticky top-0 z-50 bg-surface shadow-sm">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto">
        <Link
          to="/"
          aria-label="Turquia Lanches - Início"
          className="text-primary hover:scale-105 transition-transform duration-200"
        >
          <img src={LOGO_URL} alt="Turquia Lanches Logo" className="h-10 w-auto object-cover" />
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

        <div className="flex items-center gap-2">
          <Link
            to="/sacola"
            aria-label={`Sacola com ${cartCount} itens`}
            className="relative text-primary p-2 hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              shopping_bag
            </span>
            <CartBadge count={cartCount} />
          </Link>
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
