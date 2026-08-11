import imgHeroAmbience from '../../assets/images/hero/hero-ambience.jpg'

// LOTE 15 — Refinamento visual.
// Antes: py-16 flat, h-[400px] fixo, sem eyebrow, sem separação visual.
// Agora: seção dividida em 2 colunas com proporção editorial (55/45),
// eyebrow sobre título, altura responsiva da imagem, borda-radius do DS (rounded-2xl).

function AmbienceSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-surface-container-low px-4 lg:px-20">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

        {/* Texto */}
        <div className="w-full md:w-[45%] order-2 md:order-1">
          <span className="section-eyebrow">Nosso Espaço</span>
          <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-on-background mb-4">
            Um lugar feito
            <br />
            <span className="text-primary">para você curtir.</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Ambiente aconchegante, ideal para reunir a galera, assistir ao jogo e aproveitar
            momentos inesquecíveis. Nossa casa é a sua casa, com aquele clima que só a Turquia
            Lanches tem.
          </p>
        </div>

        {/* Imagem */}
        <div className="w-full md:w-[55%] order-1 md:order-2">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              alt="Ambiente interno da Turquia Lanches"
              className="w-full h-[300px] md:h-[420px] object-cover"
              src={imgHeroAmbience}
            />
            {/* Etiqueta flutuante — reforça identidade sem cobrir a foto */}
            <div className="absolute bottom-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
              Maricá · RJ
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AmbienceSection
