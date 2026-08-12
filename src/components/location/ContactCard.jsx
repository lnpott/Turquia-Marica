import { Clock3, Instagram, MapPin, Phone } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import ChannelAction from '../ui/ChannelAction'
import UnavailableNotice from '../ui/UnavailableNotice'

function ContactCard() {
  return (
    <section id="contato" className="scroll-mt-24 rounded-2xl bg-white p-5 shadow-lg sm:p-7" aria-labelledby="contact-title">
      <h2 id="contact-title" className="font-headline-lg text-headline-lg text-primary">Informações da casa</h2>

      <div className="mt-7 space-y-7">
        <div>
          <h3 className="flex items-center gap-2 font-headline-md text-xl text-on-surface">
            <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
            Localização
          </h3>
          <p className="mt-2 font-body-lg text-on-surface">{BUSINESS_INFO.location.value}</p>
          <p className="mt-1 text-sm text-on-surface-variant">{BUSINESS_INFO.location.note}</p>
          <ChannelAction
            channel={BUSINESS_INFO.channels.maps}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg font-label-bold text-primary hover:underline"
          />
        </div>

        <hr className="border-outline-variant" />
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-headline-md text-xl text-on-surface">
            <Clock3 className="h-5 w-5 text-primary" aria-hidden="true" />
            Horário de funcionamento
          </h3>
          <UnavailableNotice compact description={BUSINESS_INFO.hours.note} />
        </div>

        <hr className="border-outline-variant" />
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-headline-md text-xl text-on-surface">
            <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
            Telefone / WhatsApp
          </h3>
          <UnavailableNotice compact description={BUSINESS_INFO.phone.note} />
        </div>

        <hr className="border-outline-variant" />
        <div>
          <h3 className="flex items-center gap-2 font-headline-md text-xl text-on-surface">
            <Instagram className="h-5 w-5 text-primary" aria-hidden="true" />
            Instagram
          </h3>
          <p className="mt-2 text-on-surface-variant">{BUSINESS_INFO.channels.instagram.handle}</p>
          <ChannelAction
            channel={BUSINESS_INFO.channels.instagram}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-label-bold text-on-primary hover:bg-primary-hover"
          >
            Abrir Instagram
          </ChannelAction>
        </div>
      </div>
    </section>
  )
}

export default ContactCard
