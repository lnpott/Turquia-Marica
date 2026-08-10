import { NavLink } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import CartBadge from '../cart/CartBadge'

const ITEMS = [
  { label: 'Home', icon: 'home', to: '/' },
  { label: 'Cardápio', icon: 'restaurant_menu', to: '/cardapio' },
  { label: 'Pedidos', icon: 'shopping_cart', to: '/sacola' },
  { label: 'Perfil', icon: 'person', to: '/perfil' },
]

function BottomNavBar() {
  const { cartCount } = useCart()

  return (
    <nav
      aria-label="Navegação inferior"
      className="fixed bottom-0 w-full flex justify-around items-center py-3 px-margin-mobile md:hidden bg-surface shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-outline-variant z-50"
    >
      {ITEMS.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center rounded-full px-4 py-1 transition-transform duration-150 active:scale-110 ${
              isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant'
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
