import { NavLink } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import CartBadge from '../cart/CartBadge'

const ITEMS = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Cardápio', icon: 'restaurant_menu', to: '/cardapio' },
  { label: 'Pedidos', icon: 'shopping_cart', to: '/sacola' },
  { label: 'Contato', icon: 'location_on', to: '/localizacao' },
]

function BottomNavBar() {
  const { cartCount } = useCart()

  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed bottom-0 left-0 right-0 min-h-[72px] flex justify-around items-center py-2 px-2 mobile-nav-safe md:hidden bg-surface shadow-[0_-4px_10px_rgba(37,25,19,0.12)] border-t border-outline-variant z-50"
    >
      {ITEMS.map((item) => (
        <NavLink
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
            {item.to === '/sacola' && <CartBadge count={cartCount} />}
          </span>
          <span className="font-label-bold text-[10px]">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNavBar
