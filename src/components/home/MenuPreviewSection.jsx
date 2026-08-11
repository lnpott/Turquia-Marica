import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { products } from '../../data/menu'
import { formatBRL } from '../../utils/format'

const ITEMS = products.slice(0, 3)

function MenuPreviewSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-surface px-4 lg:px-20" id="cardapio">
      <div className="max-w-[1280px] mx-auto">

        {/* Cabeçalho com eyebrow e CTA de sacola */}
        <div className="flex justify-between items-end mb-10 pb-4 border-b border-outline-variant">
          <div>
            <span className="section-eyebrow">Cardápio</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              Escolha seus favoritos
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Faça seu pedido e receba em casa.
            </p>
          </div>
          <Button
            to="/sacola"
            variant="primary"
            size="md"
            className="hidden md:flex rounded-xl ambient-shadow"
          >
            <span className="material-symbols-outlined" data-weight="fill" aria-hidden="true">
              shopping_bag
            </span>
            Ver Sacola
          </Button>
        </div>

        {/* Cards horizontais — estrutura idêntica ao ProductCard do Cardápio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item) => (
            <Link
              key={item.id}
              to={`/produto/${item.id}`}
              aria-label={`Ver ${item.name}`}
              className="bg-surface-container-lowest rounded-xl p-4 card-shadow card-shadow-hover transition-all flex gap-4 items-center group border border-surface-variant"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0">
                <img
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-headline-md text-on-background text-lg leading-tight mb-1 truncate">
                  {item.name}
                </h4>
                <p className="font-price-lg text-primary text-lg">
                  {formatBRL(item.priceValue)}
                </p>
              </div>
              <span className="bg-surface-container text-primary w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                <span className="material-symbols-outlined" aria-hidden="true">add</span>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-12 flex justify-center">
          <Button to="/cardapio" size="lg" className="rounded-xl ambient-shadow">
            VER CARDÁPIO COMPLETO
          </Button>
        </div>

      </div>
    </section>
  )
}

export default MenuPreviewSection
