import { Link } from 'react-router-dom'
import ContactCard from '../components/location/ContactCard'
import MapEmbed from '../components/location/MapEmbed'
import imgHeroAmbience from '../assets/images/hero/hero-ambience.jpg'

// /localizacao — Lote 9. Migração do HTML de produção
// (turquia_lanches_localiza_o_production/code.html): hero com imagem de
// ambiente, card de contato (Endereço/Horário/WhatsApp/Instagram) e mapa
// placeholder. Página informativa — não faz parte do fluxo linear do pedido.
// A navegação já existia no Header (desktop + menu mobile) aguardando a rota.
// LOTE 14 — Hero migrado para asset local. A fotografia do ambiente da
// Localização é a MESMA do hero da Home (duplicata real confirmada por MD5).
const HERO_IMAGE = imgHeroAmbience

function Location() {
  return (
    <main className="flex-grow">
      {/* Hero com imagem de ambiente */}
      <section className="w-full relative h-[58svh] min-h-[360px] md:min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-inverse-surface/40 z-10 pointer-events-none" aria-hidden="true" />
        <img
          alt="Ambiente interno da Turquia Lanches"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src={HERO_IMAGE}
        />
        <div className="relative z-20 h-full max-w-[1280px] mx-auto px-4 md:px-margin-desktop flex flex-col justify-center items-start">
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-primary drop-shadow-md mb-stack-tight">
            Venha nos Visitar
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary/90 drop-shadow-md max-w-2xl mb-stack-loose">
            O verdadeiro sabor da tradição em um ambiente acolhedor. Sinta a energia e experimente
            os melhores lanches da região.
          </p>
          <div className="flex gap-gutter flex-wrap">
            <Link
              to="/cardapio"
              className="bg-primary text-on-primary font-headline-md px-6 py-3 rounded shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 text-center"
            >
              Peça Agora
            </Link>
            {/* No HTML o botão "Contato" era inerte — aqui vira âncora para o card
                de contato (adaptação funcional mínima documentada no roadmap). */}
            <a
              href="#contato"
              className="bg-surface text-primary font-headline-md px-6 py-3 rounded shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Contato
            </a>
          </div>
        </div>
      </section>

      {/* Informações e mapa */}
      <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-2 gap-stack-loose items-start">
        <ContactCard />
        <MapEmbed />
      </section>
    </main>
  )
}

export default Location
