import { Instagram, MapPin } from 'lucide-react'
import logo from '../../assets/images/brand/logo-96.webp'
import { BUSINESS_INFO, BUSINESS_STATUS } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'
import IconIfoodGold from '../ui/IconIfoodGold'
import IconWhatsApp from '../ui/IconWhatsApp'

const actionClasses = 'inline-flex min-h-11 items-center gap-3 rounded-md px-2 text-sm font-medium text-[#d9c8a8] transition-colors duration-tactile ease-tactile hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf72] active:scale-[0.98]'

function Footer() {
  return (
    <footer className="w-full bg-[#1a1008] pb-[calc(6rem+env(safe-area-inset-bottom))] pt-14 text-white md:pb-16 md:pt-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-margin-mobile md:grid-cols-[minmax(0,1.35fr)_minmax(17rem,0.8fr)] md:items-start md:gap-20 md:px-margin-desktop">
        <div className="flex flex-col items-start">
          <a href="#topo" aria-label="Turquia Lanches — início" className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4cf72]">
            <img src={logo} alt="Turquia Lanches" width="96" height="96" className="h-16 w-16 rounded-full object-cover sm:h-[72px] sm:w-[72px] md:h-24 md:w-24" loading="lazy" />
          </a>
          <p className="mt-5 text-3xl font-extrabold tracking-[-0.05em] text-[#faf7f2] md:text-4xl">Turquia Lanches.</p>
          <p className="mt-2 font-body-md text-sm text-[#d9c8a8]">Parque Nanci · Maricá</p>
          {BUSINESS_INFO.hours.value ? <p className="mt-1 font-body-md text-sm text-[#d9c8a8]">{BUSINESS_INFO.hours.value}</p> : null}
          <p className="mt-7 font-body-md text-sm text-[#b7a68b]">© {new Date().getFullYear()} Turquia Lanches.</p>
        </div>

        <div className="border-t border-white/15 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-1">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b7a68b]">Onde encontrar</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
          <ChannelAction channel={BUSINESS_INFO.channels.maps} icon={MapPin} className={actionClasses} />
          <ChannelAction channel={BUSINESS_INFO.channels.instagram} icon={Instagram} className={actionClasses} />
          <ChannelAction channel={BUSINESS_INFO.channels.ifood} icon={IconIfoodGold} iconClassName="h-5 w-auto shrink-0" className={`${actionClasses} text-[#f4cf72]`} />
          {BUSINESS_INFO.channels.whatsapp.status === BUSINESS_STATUS.AVAILABLE && BUSINESS_INFO.channels.whatsapp.url ? (
            <ChannelAction channel={BUSINESS_INFO.channels.whatsapp} icon={IconWhatsApp} className={actionClasses} />
          ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
