import { NavLink } from 'react-router-dom'
import { IFOOD_URL } from '../../data/contact'

const ITEMS = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Cardápio', icon: 'restaurant_menu', to: '/#cardapio' },
  { label: 'Pedir', icon: 'delivery_dining', external: true },
  { label: 'Contato', icon: 'location_on', to: '/localizacao' },
]

function BottomNavBar() {
  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed bottom-0 left-0 right-0 min-h-[72px] flex justify-around items-center py-2 px-2 mobile-nav-safe md:hidden bg-surface shadow-[0_-4px_10px_rgba(37,25,19,0.12)] border-t border-outline-variant z-50"
    >
      {ITEMS.map((item) => item.external ? (
        <a key={item.label} href={IFOOD_URL} target="_blank" rel="noreferrer" className="flex min-w-[64px] min-h-[52px] flex-col items-center justify-center rounded-xl px-2 py-1 text-primary transition-colors active:scale-95">
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="font-label-bold text-[10px]">{item.label}</span>
        </a>
      ) : <NavLink
          key={item.label}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex min-w-[64px] min-h-[52px] flex-col items-center justify-center rounded-xl px-2 py-1 transition-colors duration-150 active:scale-95 ${
              isActive ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'text-on-surface-variant'
            }`
          }
        >
          <span className="relative">
            <span className="material-symbols-outlined">{item.icon}</span>
          </span>
          <span className="font-label-bold text-[10px]">{item.label}</span>
        </NavLink>)}
    </nav>
  )
}

export default BottomNavBar
