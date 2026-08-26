import { Clock3, ExternalLink, Instagram, MapPin } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import MapEmbed from '../location/MapEmbed'
import ChannelAction from '../ui/ChannelAction'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function LocationSection() {
  return (
    <section id="localizacao" className="scroll-mt-24 bg-[#f0e7db]/[0.35] px-5 py-20 md:px-margin-desktop md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Localização"
          title={<>Perto do bairro.<span className="block text-primary">Perto de você.</span></>}
          description="Estamos no Parque Nanci, em Maricá. Veja nossa localização no mapa e abra a rota para chegar até a Turquia Lanches."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <Reveal className="min-w-0">
            <MapEmbed />
          </Reveal>
          <Reveal delay={100} className="flex flex-col justify-between rounded-xl bg-[#faf7f2]/90 p-6 ring-1 ring-[#d9cdbd] md:p-8">
            <div>
              <dl className="space-y-8">
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><MapPin className="h-4 w-4" aria-hidden="true" />Nosso endereço</dt>
                  <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-on-surface">{BUSINESS_INFO.location.value}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><Clock3 className="h-4 w-4" aria-hidden="true" />Horários</dt>
                  <dd className="mt-2 font-bold text-on-surface">{BUSINESS_INFO.hours.value}</dd>
                  <dd className="mt-1 text-sm font-medium text-on-surface/70">{BUSINESS_INFO.hours.closed}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><Instagram className="h-4 w-4" aria-hidden="true" />Siga-nos no Instagram</dt>
                  <dd className="mt-2">
                    <ChannelAction channel={BUSINESS_INFO.channels.instagram} className="inline-flex min-h-11 items-center gap-2 font-bold text-on-surface underline decoration-[#d9cdbd] underline-offset-4 transition-colors hover:text-primary">
                      {BUSINESS_INFO.channels.instagram.handle}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </ChannelAction>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
