const HIGHLIGHT_1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ3iQi-EWDhu3rLpYNp6uTwhn2IZay6QSfSv4zrHg4GnUWZ7p9bMCiE3q8vMwuCoN7ogMkYufWUTob22Oorw0rottDEfgXmjOJ1VmHzZRdJjo-MrFw5xQyjU23lXo8ibNA0eFy9lwHZgHLMP9LUgJGQhf0EW66dxohW7gZxoYAmAkP9p8FFtOKvKdLO7n3HPZNQC1QQMgBVCuueHC-KKD6n9ID0iOnEinRccouvbGnOZTPGZZFWfiMLxbb5ru2hx0ijZg'
const HIGHLIGHT_2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCzXtRqwUtOyOXW_Lbfs7cyeiXKWFUQo_M-zXpaPzrEEftx06s0ILBuWqVpVnY_QtD2vmbmT-LHc6CtE12scYJ6VGCte36V-FwH5HItyIXz_-J-d3wvi6bdARDGcDHfLO14S1FC6cAGa2CvzZ5xR-1yHS3__qy3Sjo4hWZ9vsgluZVKtHZn-ASFFblFVdgqv36zR9c09qlo0cfyKj_Z8f-AZAvqM5O2yCtPeZ4kJfC0uKmAwIBBqMvzm0El3MTaGyTtDv0'

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
