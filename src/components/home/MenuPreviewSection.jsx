import Button from '../ui/Button'

const ITEM_IMAGE_1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ3iQi-EWDhu3rLpYNp6uTwhn2IZay6QSfSv4zrHg4GnUWZ7p9bMCiE3q8vMwuCoN7ogMkYufWUTob22Oorw0rottDEfgXmjOJ1VmHzZRdJjo-MrFw5xQyjU23lXo8ibNA0eFy9lwHZgHLMP9LUgJGQhf0EW66dxohW7gZxoYAmAkP9p8FFtOKvKdLO7n3HPZNQC1QQMgBVCuueHC-KKD6n9ID0iOnEinRccouvbGnOZTPGZZFWfiMLxbb5ru2hx0ijZg'
const ITEM_IMAGE_2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCzXtRqwUtOyOXW_Lbfs7cyeiXKWFUQo_M-zXpaPzrEEftx06s0ILBuWqVpVnY_QtD2vmbmT-LHc6CtE12scYJ6VGCte36V-FwH5HItyIXz_-J-d3wvi6bdARDGcDHfLO14S1FC6cAGa2CvzZ5xR-1yHS3__qy3Sjo4hWZ9vsgluZVKtHZn-ASFFblFVdgqv36zR9c09qlo0cfyKj_Z8f-AZAvqM5O2yCtPeZ4kJfC0uKmAwIBBqMvzm0El3MTaGyTtDv0'

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
