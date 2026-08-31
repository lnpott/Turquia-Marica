import { Instagram } from 'lucide-react'
import logo from '../../assets/images/brand/logo-96.webp'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'
import IconIfood from '../ui/IconIfood'
import IconWhatsApp from '../ui/IconWhatsApp'
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
  const activeSection = useActiveSection()

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf7f2]/95 shadow-[0_1px_0_#e8e0d4] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[1280px] items-center justify-between gap-3 px-4 md:h-[76px] md:px-margin-desktop">
        <a href="#topo" aria-label="Turquia Lanches — início" className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-offset-4">
          <img src={logo} alt="Turquia Lanches" width="48" height="48" className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12" />
          <span className="hidden font-headline-md text-base font-extrabold uppercase leading-none tracking-[-0.03em] text-on-surface lg:block">Turquia<br/><span className="text-primary">Lanches</span></span>
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={`#${link.id}`} aria-current={activeSection === link.id ? 'location' : undefined} className={linkClasses(activeSection === link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="ml-auto flex items-center gap-2 max-[359px]:gap-1 md:hidden" aria-label="Canais de contato">
          <ChannelAction
            channel={BUSINESS_INFO.channels.instagram}
            icon={Instagram}
            aria-label="Instagram da Turquia Lanches — @turquialanches"
            iconOnly
            iconClassName="h-6 w-6 shrink-0"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-on-surface transition-all duration-tactile ease-tactile hover:bg-surface-container-low hover:text-primary active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
          <ChannelAction
            channel={BUSINESS_INFO.channels.whatsapp}
            icon={IconWhatsApp}
            aria-label="Iniciar conversa no WhatsApp da Turquia Lanches"
            iconOnly
            iconClassName="h-6 w-6 shrink-0"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-on-surface transition-all duration-tactile ease-tactile hover:bg-surface-container-low hover:text-primary active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={IconIfood}
            aria-label="Pedir no iFood"
            iconOnly
            iconClassName="h-6 w-6 shrink-0"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-on-primary transition-all duration-tactile ease-tactile active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ChannelAction
            channel={BUSINESS_INFO.channels.instagram}
            icon={Instagram}
            aria-label="Instagram da Turquia Lanches — @turquialanches"
            iconOnly
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-on-surface transition-all duration-tactile ease-tactile hover:bg-surface-container-low hover:text-primary active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
          <ChannelAction
            channel={BUSINESS_INFO.channels.whatsapp}
            icon={IconWhatsApp}
            aria-label="WhatsApp da Turquia Lanches"
            iconOnly
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-on-surface transition-all duration-tactile ease-tactile hover:bg-surface-container-low hover:text-primary active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
          <ChannelAction
            channel={BUSINESS_INFO.channels.ifood}
            icon={IconIfood}
            aria-label="Pedir no iFood"
            className="cta-fill-primary inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-sm font-bold text-on-primary transition-all duration-tactile ease-tactile hover:shadow-lg active:scale-95 lg:w-auto lg:gap-2 lg:px-5"
            unavailableClassName="inline-flex min-h-11 cursor-not-allowed items-center gap-2 px-3 text-xs font-bold uppercase tracking-wide text-on-surface-variant/70"
          >
            <span className="hidden lg:inline">Pedir no iFood</span>
          </ChannelAction>
        </div>
      </div>
    </header>
  )
}

export default Header
