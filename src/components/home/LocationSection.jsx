import { Clock3, ExternalLink, Instagram, MapPin, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '../../data/contact'
import MapEmbed from '../location/MapEmbed'
import Button from '../ui/Button'
import ChannelAction from '../ui/ChannelAction'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function LocationSection() {
  return (
    <section id="localizacao" className="scroll-mt-24 bg-[#f0e7db] px-5 py-20 md:px-margin-desktop md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Localização"
          title={<>Perto do bairro.<span className="block text-primary">Perto de você.</span></>}
          description="Confira a ficha disponível no Google Maps antes de iniciar a rota. Informações ainda não confirmadas permanecem claramente sinalizadas."
        />

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:gap-14">
          <Reveal><MapEmbed /></Reveal>
          <Reveal delay={100} className="flex flex-col justify-between border-t border-[#d9cdbd] pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div>
              <dl className="space-y-8">
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><MapPin className="h-4 w-4" aria-hidden="true" />Região informada</dt>
                  <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-on-surface">{BUSINESS_INFO.location.value}</dd>
                  <dd className="mt-1 text-sm text-on-surface/65">{BUSINESS_INFO.location.note}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><Clock3 className="h-4 w-4" aria-hidden="true" />Horários</dt>
                  <dd className="mt-2 font-bold text-on-surface">{BUSINESS_INFO.hours.value ?? BUSINESS_INFO.hours.note}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary"><Instagram className="h-4 w-4" aria-hidden="true" />Canal disponível</dt>
                  <dd className="mt-2">
                    <ChannelAction channel={BUSINESS_INFO.channels.instagram} className="inline-flex min-h-11 items-center gap-2 font-bold text-on-surface underline decoration-[#d9cdbd] underline-offset-4 transition-colors hover:text-primary">
                      {BUSINESS_INFO.channels.instagram.handle}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </ChannelAction>
                  </dd>
                </div>
              </dl>
            </div>

            <Button href={BUSINESS_INFO.channels.maps.url} target="_blank" rel="noopener noreferrer" variant="editorialPrimary" size="lg" className="mt-10 w-full sm:w-fit">
              <Navigation className="h-5 w-5" aria-hidden="true" />
              Abrir rota no Google Maps
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
