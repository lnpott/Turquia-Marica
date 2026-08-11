import Button from '../ui/Button'
// LOTE 14 — Assets locais. ITEM_IMAGE_1 = fotografia do ambiente (hero-ambience.jpg,
// mesma do destaque 'Gigante do Sabor'); ITEM_IMAGE_2 = highlight-sweet.jpg.
// Duplicatas reais dos HTMLs de produção confirmadas por MD5.
import imgHeroAmbience from '../../assets/images/hero/hero-ambience.jpg'
import imgHighlightSweet from '../../assets/images/home/highlight-sweet.jpg'

const ITEM_IMAGE_1 = imgHeroAmbience
const ITEM_IMAGE_2 = imgHighlightSweet

const ITEMS = [
  { name: 'Super Burger', image: ITEM_IMAGE_1 },
  { name: 'Porção Mista', image: ITEM_IMAGE_2 },
  { name: 'Pizza Doce', image: ITEM_IMAGE_2 },
]

function MenuPreviewSection() {
  return (
    <section className="w-full py-16 bg-surface-container-low px-4 lg:px-20" id="cardapio">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-surface-variant pb-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Cardápio</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Escolha seus favoritos e faça seu pedido.
            </p>
          </div>
          <Button
            to="/sacola"
            variant="primary"
            size="md"
            className="hidden md:flex rounded-lg shadow-sm"
          >
            <span className="material-symbols-outlined" data-weight="fill" aria-hidden="true">
              shopping_bag
            </span>
            Ver Sacola
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
          {ITEMS.map((item) => (
            <div
              key={item.name}
              className="bg-surface-container-low rounded-lg p-4 shadow-sm border border-surface-variant flex gap-4 items-center group hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <img
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-headline-md text-on-surface text-lg">{item.name}</h4>
                <p className="text-primary font-price-lg text-xl mt-1">R$ --,--</p>
              </div>
              <button
                type="button"
                aria-label={`Adicionar ${item.name}`}
                className="bg-surface-container text-primary w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-on-primary transition-colors shrink-0"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  add
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button to="/cardapio" size="lg" className="rounded-lg ambient-shadow">
            VER CARDÁPIO COMPLETO
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MenuPreviewSection
