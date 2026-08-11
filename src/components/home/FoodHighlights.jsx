// LOTE 14 — Assets locais.
// LOTE 15 — Refinamento visual: eyebrow sobre título, altura de card consistente
// com ProductCard (h-64/h-[340px]), overlay controlado (from-black/70 via-black/20),
// tipografia usa tokens do DS em vez de classes literais, sem group-hover:scale-110
// (muito agressivo — calibrado para scale-105 como no Cardápio).
import imgHeroAmbience from '../../assets/images/hero/hero-ambience.jpg'
import imgHighlightSweet from '../../assets/images/home/highlight-sweet.jpg'

const ITEMS = [
  {
    src: imgHeroAmbience,
    alt: 'Destaque — lanche salgado',
    title: 'Gigante do Sabor',
    description: 'Para saciar a fome de leão.',
  },
  {
    src: imgHighlightSweet,
    alt: 'Destaque — sobremesa',
    title: 'Doce Tentação',
    description: 'A sobremesa que você merece.',
  },
]

function FoodHighlights() {
  return (
    <section className="w-full py-20 md:py-28 bg-surface-container-low px-4 lg:px-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <span className="section-eyebrow justify-center">Destaques da Casa</span>
          <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-on-background mb-3">
            O Irresistível
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Preparados com maestria para despertar todos os seus sentidos.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.alt}
              className="relative rounded-2xl overflow-hidden shadow-xl group h-[280px] md:h-[340px]"
            >
              <img
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={item.src}
              />
              {/* Overlay calibrado: não apaga a foto, apenas garante legibilidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                <h3 className="text-on-image font-headline-md text-headline-md mb-1 drop-shadow-md">
                  {item.title}
                </h3>
                <p className="text-on-image/80 font-body-md text-body-md drop-shadow-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FoodHighlights
