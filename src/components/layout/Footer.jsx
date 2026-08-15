import { Instagram, MapPin, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/brand/logo-96.webp'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'

const actionClasses = 'inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#c9b99a] transition-all duration-tactile ease-tactile hover:translate-x-1 hover:text-white active:scale-[0.98]'

function Footer() {
  return (
    <footer className="w-full bg-[#1a1008] pb-24 pt-16 text-white md:pb-16 md:pt-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-margin-mobile md:grid-cols-[1.4fr_0.8fr_1fr] md:px-margin-desktop">
        <div className="flex flex-col items-start gap-3">
          <Link to="/" aria-label="Turquia Lanches — início">
            <img src={logo} alt="Turquia Lanches" width="48" height="48" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
          </Link>
          <p className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#faf7f2]">Turquia Lanches.</p>
          <p className="max-w-sm font-body-md text-sm text-[#9a8a7a]">
            Catálogo institucional em atualização. Informações comerciais só serão publicadas após confirmação.
          </p>
          <p className="font-body-md text-sm text-[#9a8a7a]">© {new Date().getFullYear()} Turquia Lanches.</p>
        </div>

        <nav aria-label="Links do site" className="flex flex-col items-start gap-1">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a8a7a]">Navegue</p>
          <Link to="/cardapio" className={actionClasses}>Cardápio</Link>
          <Link to="/localizacao" className={actionClasses}>Localização</Link>
        </nav>

        <div className="flex flex-col items-start gap-1">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a8a7a]">Canais disponíveis</p>
          <ChannelAction channel={BUSINESS_INFO.channels.maps} icon={MapPin} className={actionClasses} />
          <ChannelAction channel={BUSINESS_INFO.channels.instagram} icon={Instagram} className={actionClasses} />
          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={ShoppingBag}
            className={actionClasses}
            unavailableClassName="inline-flex min-h-11 cursor-not-allowed items-center gap-2 text-sm text-[#6f6257] line-through"
          >
            iFood em construção
          </ChannelAction>
        </div>
      </div>
    </footer>
  )
}

export default Footer
