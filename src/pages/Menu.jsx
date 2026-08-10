import { useState } from 'react'
import { categories, products } from '../data/menu'
import CategoryCard from '../components/product/CategoryCard'
import CategoryFilterBar from '../components/menu/CategoryFilterBar'
import ProductGrid from '../components/menu/ProductGrid'

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCKMe7rVacOeSdiq-hTkQxFOo8l4IbXg6jQKFyYwsAVIFZjxtjm06BNqGUFi1f7iCxTg7uFx-74Ik39JSC9_OlsO0cvPKWlRY_TCKbJhmezmExywHI82K-3IIvd8IpSKExtHI9fimbpayu2dvbGbo93jJmL45MhxpSJIto0ShUAtPrL-VezrvnwfsfDwQd8d10lbj5bb7CkrsdNRUvds95dSo68bwIWFDTeZ0A_JYX0wHE7Dj0DiDD89g'

function Menu() {
  const [activeCategory, setActiveCategory] = useState('todos')

  const filteredProducts =
    activeCategory === 'todos' ? products : products.filter((p) => p.category === activeCategory)

  const combos = filteredProducts.filter((p) => p.category === 'combos')
  const maisPedidos = filteredProducts.filter((p) => p.category !== 'combos')

  const showCombos = activeCategory === 'todos' || activeCategory === 'combos'
  const showMaisPedidos = activeCategory === 'todos' || activeCategory === 'lanches'

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[800px] flex items-center overflow-hidden bg-[#111]">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="bg-cover bg-center w-full h-full opacity-80 scale-105 transition-transform duration-500"
            role="img"
            aria-label="Hambúrguer artesanal"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto w-full flex flex-col items-start">
          <div className="max-w-[700px]">
            <span className="inline-block py-2 px-4 rounded-full bg-secondary-container text-on-background font-label-bold text-xs mb-8 tracking-widest uppercase">
              O MELHOR HAMBÚRGUER DA CIDADE
            </span>
            <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-white mb-8 leading-[1.05] drop-shadow-2xl font-extrabold">
              Fome de Leão?
              <br /> <span className="text-secondary-container">O Rei Chegou.</span>
            </h1>
            <p className="font-body-lg text-[22px] text-gray-100 mb-12 max-w-lg leading-relaxed drop-shadow-lg">
              Sabor raiz e ingredientes selecionados no seu novo hambúrguer favorito.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a
                href="#combos"
                className="w-full sm:w-auto bg-primary text-white font-label-bold text-label-bold px-12 py-6 rounded-lg hover:bg-[#b01319] transition-all ambient-shadow flex items-center justify-center gap-3 text-xl uppercase tracking-wider shadow-xl"
              >
                PEÇA AGORA
              </a>
              <a
                href="#categorias"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white font-label-bold text-label-bold px-12 py-6 rounded-lg border border-white/40 hover:bg-white/20 transition-all flex items-center justify-center gap-3 text-xl uppercase tracking-wider ambient-shadow"
              >
                CARDÁPIO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        id="categorias"
        className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto bg-white"
      >
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Categorias</h2>
            <p className="font-body-md text-on-surface-variant mt-2">Escolha por onde começar</p>
          </div>
          <p className="font-body-md text-primary text-xs italic mt-2 hidden md:block">
            Cardápio demonstrativo. Itens e preços sujeitos a alteração.
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <li
              key={category.id}
              className={category.id === 'sobremesas' ? 'md:hidden xl:block' : ''}
            >
              <CategoryCard category={category} onSelect={setActiveCategory} />
            </li>
          ))}
        </ul>
      </section>

      {/* Filter + Products */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <CategoryFilterBar
              categories={categories}
              active={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>

          {showCombos && (
            <ProductGrid
              id="combos"
              title="Combos Imperdíveis"
              subtitle="A experiência completa com o melhor custo-benefício"
              products={combos}
              note="*Itens e preços demonstrativos"
            />
          )}

          {showMaisPedidos && (
            <ProductGrid
              title="Mais Pedidos"
              subtitle="Os favoritos da galera"
              products={maisPedidos}
              note="*Preços sujeitos a alteração"
            />
          )}

          {!showCombos && !showMaisPedidos && (
            <p className="font-body-md text-on-surface-variant text-center py-12">
              Nenhum produto nesta categoria ainda.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default Menu
