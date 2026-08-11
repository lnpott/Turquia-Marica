// LOTE 14 — Assets locais (mesmas fotografias aprovadas dos HTMLs de produção).
// HIGHLIGHT_1 é a MESMA fotografia do ambiente do hero (hero-ambience.jpg) e do
// preview de cardápio (Super Burger) — duplicata real confirmada por MD5.
import imgHeroAmbience from '../../assets/images/hero/hero-ambience.jpg'
import imgHighlightSweet from '../../assets/images/home/highlight-sweet.jpg'

const HIGHLIGHT_1 = imgHeroAmbience
const HIGHLIGHT_2 = imgHighlightSweet

const ITEMS = [
  {
    src: HIGHLIGHT_1,
    alt: 'Destaque Salgado',
    title: 'Gigante do Sabor',
    description: 'Para saciar a fome de leão.',
  },
  {
    src: HIGHLIGHT_2,
    alt: 'Destaque Doce',
    title: 'Doce Tentação',
    description: 'A sobremesa que você merece.',
  },
]

function FoodHighlights() {
  return (
    <section className="w-full py-16 bg-surface px-4 lg:px-20">
      <div className="max-w-[1280px] mx-auto text-center mb-12">
        <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-primary mb-stack-tight">
          O Irresistível
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Preparados com maestria para despertar todos os seus sentidos.
        </p>
      </div>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {ITEMS.map((item) => (
          <div key={item.alt} className="relative rounded-2xl overflow-hidden shadow-2xl group h-[400px]">
            <img
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={item.src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white font-headline-lg mb-2 drop-shadow-md">{item.title}</h3>
              <p className="text-surface-container-low font-body-md drop-shadow-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FoodHighlights
