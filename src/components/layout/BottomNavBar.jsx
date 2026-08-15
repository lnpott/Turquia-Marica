import { Home, MapPin, MessageSquareText, Utensils } from 'lucide-react'
import useActiveSection from '../../hooks/useActiveSection'

const ITEMS = [
  { label: 'Início', Icon: Home, id: 'topo' },
  { label: 'Cardápio', Icon: Utensils, id: 'cardapio' },
  { label: 'Localização', Icon: MapPin, id: 'localizacao' },
  { label: 'Reviews', Icon: MessageSquareText, id: 'reviews' },
]

const baseClasses = 'flex min-h-[52px] min-w-[64px] flex-col items-center justify-center px-2 py-1 text-[10px] font-bold transition-all duration-tactile ease-tactile active:scale-95'

function BottomNavBar() {
  const activeSection = useActiveSection()
  return (
    <nav
      aria-label="Navegação inferior"
      className="mobile-nav-safe fixed inset-x-0 bottom-0 z-50 flex min-h-[72px] items-center justify-around bg-[#1a1008]/95 px-2 py-2 text-white shadow-[0_-1px_0_#3a2a1a] backdrop-blur-md md:hidden"
    >
      {ITEMS.map(({ label, Icon, id }) => {
        const isActive = activeSection === id
        return (
          <a key={label} href={`#${id}`} aria-current={isActive ? 'location' : undefined} className={`${baseClasses} ${isActive ? 'text-secondary-container' : 'text-white/60'}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
            {label}
          </a>
        )
      })}
    </nav>
  )
}

export default BottomNavBar
