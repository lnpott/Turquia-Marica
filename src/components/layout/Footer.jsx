import { Instagram, MapPin, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/brand/logo-96.webp'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'

const actionClasses = 'inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface hover:text-primary'

function Footer() {
  return (
    <footer className="mt-margin-desktop w-full bg-surface-container-highest pb-24 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-margin-mobile md:grid-cols-[1.3fr_1fr_1fr] md:px-margin-desktop">
        <div className="flex flex-col items-start gap-3">
          <Link to="/" aria-label="Turquia Lanches — início">
            <img src={logo} alt="Turquia Lanches" width="48" height="48" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
          </Link>
          <p className="max-w-sm font-body-md text-sm text-on-surface-variant">
            Catálogo institucional em atualização. Informações comerciais só serão publicadas após confirmação.
          </p>
          <p className="font-body-md text-sm text-on-surface-variant">© {new Date().getFullYear()} Turquia Lanches.</p>
        </div>

        <nav aria-label="Links do site" className="flex flex-col items-start gap-1">
          <p className="mb-1 font-label-bold text-sm uppercase tracking-wide text-on-surface">Navegue</p>
          <Link to="/cardapio" className={actionClasses}>Cardápio</Link>
          <Link to="/localizacao" className={actionClasses}>Localização</Link>
        </nav>

        <div className="flex flex-col items-start gap-1">
          <p className="mb-1 font-label-bold text-sm uppercase tracking-wide text-on-surface">Canais confirmados</p>
          <ChannelAction channel={BUSINESS_INFO.channels.maps} icon={MapPin} className={actionClasses} />
          <ChannelAction channel={BUSINESS_INFO.channels.instagram} icon={Instagram} className={actionClasses} />
          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={ShoppingBag}
            className={actionClasses}
            unavailableClassName="inline-flex min-h-11 cursor-not-allowed items-center gap-2 px-3 text-sm text-outline"
          >
            iFood em construção
          </ChannelAction>
        </div>
      </div>
    </footer>
  )
}

export default Footer
