import { Clock3, Instagram, MapPin, Phone } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'

function ContactCard() {
  return (
    <section id="contato" className="scroll-mt-24" aria-labelledby="contact-title">
      <div className="grid gap-7 md:grid-cols-[0.75fr_1.25fr] md:items-end">
        <div>
          <span className="section-eyebrow">Antes de sair</span>
          <h2 id="contact-title" className="display-balance font-headline-lg text-[34px] font-extrabold leading-none tracking-[-0.035em] text-on-surface md:text-[46px]">O essencial para chegar.</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
          A ficha no Google Maps e o perfil informado estão disponíveis. Horários, telefone e endereço completo continuam omitidos até confirmação.
        </p>
      </div>

      <dl className="mt-10 grid border-t border-[#e8e0d4] md:grid-cols-3">
        <div className="border-b border-[#e8e0d4] py-6 md:border-b-0 md:border-r md:pr-7">
          <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary"><MapPin className="h-4 w-4" aria-hidden="true" />Região informada</dt>
          <dd className="mt-2 font-headline-md text-xl font-extrabold text-on-surface">{BUSINESS_INFO.location.value}</dd>
          <dd className="mt-1 text-sm text-on-surface-variant">Confira a ficha no Google Maps antes de iniciar a rota.</dd>
        </div>
        <div className="border-b border-[#e8e0d4] py-6 md:border-b-0 md:border-r md:px-7">
          <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary"><Clock3 className="h-4 w-4" aria-hidden="true" />Horários</dt>
          <dd className="mt-2 font-bold text-on-surface">Ainda não confirmados</dd>
          <dd className="mt-1 flex items-center gap-2 text-sm text-on-surface-variant"><Phone className="h-4 w-4" aria-hidden="true" />Telefone também pendente</dd>
        </div>
        <div className="py-6 md:pl-7">
          <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary"><Instagram className="h-4 w-4" aria-hidden="true" />Canal informado</dt>
          <dd className="mt-2 font-bold text-on-surface">{BUSINESS_INFO.channels.instagram.handle}</dd>
          <dd>
            <ChannelAction channel={BUSINESS_INFO.channels.instagram} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm px-4 py-2 text-sm font-bold text-on-surface ring-1 ring-inset ring-on-surface/25 transition-all duration-tactile ease-tactile hover:bg-on-surface hover:text-white active:scale-[0.98]">
              Abrir Instagram
            </ChannelAction>
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default ContactCard
