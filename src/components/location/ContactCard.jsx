import { Clock3, Instagram, MapPin, Phone } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'

function ContactCard() {
  return (
    <section id="contato" className="scroll-mt-24 border-2 border-on-surface bg-white p-5 shadow-[5px_5px_0_#251913] sm:p-7" aria-labelledby="contact-title">
      <div className="grid gap-7 md:grid-cols-[0.75fr_1.25fr] md:items-end">
        <div>
          <span className="section-eyebrow">Antes de sair</span>
          <h2 id="contact-title" className="display-balance font-headline-lg text-[34px] font-extrabold leading-none tracking-[-0.035em] text-on-surface md:text-[46px]">O essencial para chegar.</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
          A ficha no Google Maps e o perfil informado estão disponíveis. Horários, telefone e endereço completo continuam omitidos até confirmação.
        </p>
      </div>

      <dl className="mt-8 grid border-t-2 border-on-surface md:grid-cols-3">
        <div className="border-b border-outline-variant py-5 md:border-b-0 md:border-r md:pr-5">
          <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary"><MapPin className="h-4 w-4" aria-hidden="true" />Região informada</dt>
          <dd className="mt-2 font-headline-md text-xl font-extrabold text-on-surface">{BUSINESS_INFO.location.value}</dd>
          <dd className="mt-1 text-sm text-on-surface-variant">Confira a ficha no Google Maps antes de iniciar a rota.</dd>
        </div>
        <div className="border-b border-outline-variant py-5 md:border-b-0 md:border-r md:px-5">
          <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary"><Clock3 className="h-4 w-4" aria-hidden="true" />Horários</dt>
          <dd className="mt-2 font-bold text-on-surface">Ainda não confirmados</dd>
          <dd className="mt-1 flex items-center gap-2 text-sm text-on-surface-variant"><Phone className="h-4 w-4" aria-hidden="true" />Telefone também pendente</dd>
        </div>
        <div className="py-5 md:pl-5">
          <dt className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary"><Instagram className="h-4 w-4" aria-hidden="true" />Canal informado</dt>
          <dd className="mt-2 font-bold text-on-surface">{BUSINESS_INFO.channels.instagram.handle}</dd>
          <dd>
            <ChannelAction channel={BUSINESS_INFO.channels.instagram} className="mt-3 inline-flex min-h-11 items-center gap-2 border-2 border-on-surface bg-background px-4 py-2 text-sm font-extrabold text-on-surface transition-all duration-tactile ease-tactile hover:-translate-y-1 hover:bg-secondary-container active:scale-95">
              Abrir Instagram
            </ChannelAction>
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default ContactCard
