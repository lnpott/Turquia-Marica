import { Home, MapPin, ShoppingBag, Utensils } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { BUSINESS_INFO } from '../../data/contact'

const ITEMS = [
  { label: 'Início', Icon: Home, to: '/' },
  { label: 'Cardápio', Icon: Utensils, to: '/cardapio' },
  { label: 'Pedir', Icon: ShoppingBag, unavailable: true },
  { label: 'Localização', Icon: MapPin, to: '/localizacao' },
]

const baseClasses = 'flex min-h-[52px] min-w-[64px] flex-col items-center justify-center px-2 py-1 text-[10px] font-bold transition-all duration-tactile ease-tactile active:scale-95'

function BottomNavBar() {
  return (
    <nav
      aria-label="Navegação inferior"
      className="mobile-nav-safe fixed inset-x-0 bottom-0 z-50 flex min-h-[72px] items-center justify-around bg-[#1a1008]/95 px-2 py-2 text-white shadow-[0_-1px_0_#3a2a1a] backdrop-blur-md md:hidden"
    >
      {ITEMS.map(({ label, Icon, to, unavailable }) =>
        unavailable ? (
          <span
            key={label}
            aria-disabled="true"
            title={BUSINESS_INFO.channels.ifood.note}
            className={`${baseClasses} cursor-not-allowed text-white/30`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {label}
          </span>
        ) : (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `${baseClasses} ${isActive ? 'text-secondary-container' : 'text-white/60'}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {label}
          </NavLink>
        ),
      )}
    </nav>
  )
}

export default BottomNavBar
