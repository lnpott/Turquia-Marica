import { Link } from 'react-router-dom'
import ContactCard from '../components/location/ContactCard'
import MapEmbed from '../components/location/MapEmbed'

// /localizacao — Lote 9. Migração do HTML de produção
// (turquia_lanches_localiza_o_production/code.html): hero com imagem de
// ambiente, card de contato (Endereço/Horário/WhatsApp/Instagram) e mapa
// placeholder. Página informativa — não faz parte do fluxo linear do pedido.
// A navegação já existia no Header (desktop + menu mobile) aguardando a rota.
const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC-p5nCTjtM9sND9Z3PzKBwiN2QYOYSewUO49zpQ9xYX_sgTte_IxLtrCbHyEQVg9_Ghw7lMZEsjPpY3BTxSkZxTX2q6yq9_wjekRYAtuacD0LAPry-LlYNiNG1Zbl7pZR8p8JdRV26UFjoEorPU3ws3l_Oo6tliT-T0OaLqtgVkKDQgqKvF857SwfokWueBcSFSHdtiqehia6YYMGjoODRQafM36ncDHMqHTe03ULCmmT5HkY6fFxmYkluPGUV0J-Fy9w'

function Location() {
  return (
    <main className="flex-grow">
      {/* Hero com imagem de ambiente */}
      <section className="w-full relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-inverse-surface/40 z-10 pointer-events-none" aria-hidden="true" />
        <img
          alt="Ambiente interno da Turquia Lanches"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          src={HERO_IMAGE}
        />
        <div className="relative z-20 h-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col justify-center items-start">
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
