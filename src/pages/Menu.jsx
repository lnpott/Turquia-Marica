import { useState } from 'react'
import { categories, products } from '../data/menu'
import CategoryCard from '../components/product/CategoryCard'
import CategoryFilterBar from '../components/menu/CategoryFilterBar'
import ProductGrid from '../components/menu/ProductGrid'
import imgMenuHero from '../assets/images/menu/menu-hero.jpg'

// LOTE 14 — Hero do Cardápio migrado para asset local (menu/menu-hero.jpg).
// LOTE 15 — Alinhamento ao Design System:
//   • Cores hardcoded (#111, bg-[#b01319]) substituídas por tokens.
//   • backdrop-blur-md no botão secundário removido (contra diretriz do roadmap).
//   • Tag/eyebrow usa secondary-container (amarelo) consistente com Hero da Home.
//   • Gradiente usa tokens de background (não black literal).
//   • Botão secundário alinhado ao padrão do Button component (variant secondary).

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
      <section className="relative w-full h-[90vh] min-h-[700px] flex items-center overflow-hidden bg-surface-container">
        {/* Fotografia — plena visibilidade, sem opacity reduzida */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="bg-cover bg-center w-full h-full scale-[1.02] transition-transform duration-700"
            role="img"
            aria-label="Hambúrguer artesanal da Turquia Lanches"
            style={{ backgroundImage: `url('${imgMenuHero}')` }}
          />
        </div>

        {/* Overlay gradiente — tokens do DS, não black literal */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/50 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Conteúdo */}
        <div className="relative z-10 px-4 md:px-margin-desktop max-w-[1280px] mx-auto w-full flex flex-col items-start">
          <div className="max-w-[680px]">
            {/* Tag/eyebrow — secondary-container (amarelo) consistente com Home */}
            <span className="section-eyebrow mb-5" aria-hidden="true">
              O Melhor Hambúrguer da Cidade
            </span>

            <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-6 leading-[1.05]">
              Fome de Leão?
              <br />
              <span className="text-primary">O Rei Chegou.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Sabor raiz e ingredientes selecionados no seu novo favorito.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primário — usa token primary, sem hover hardcoded */}
              <a
                href="#combos"
                className="w-full sm:w-auto bg-primary text-on-primary font-label-bold text-label-bold px-10 py-5 rounded-xl hover:bg-primary-hover transition-all ambient-shadow flex items-center justify-center gap-3 text-lg uppercase tracking-wider"
              >
                <span className="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
                PEÇA AGORA
              </a>
              {/* Secundário — tokens do DS, sem backdrop-blur decorativo */}
              <a
                href="#categorias"
                className="w-full sm:w-auto bg-surface-container-low text-on-background font-label-bold text-label-bold px-10 py-5 rounded-xl border border-outline/50 hover:bg-surface-container transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-wider"
              >
                <span className="material-symbols-outlined" aria-hidden="true">restaurant_menu</span>
                CARDÁPIO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section
        id="categorias"
        className="py-16 md:py-24 px-4 md:px-margin-desktop max-w-[1280px] mx-auto"
      >
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="section-eyebrow">Explore</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Categorias</h2>
            <p className="font-body-md text-on-surface-variant mt-1">Escolha por onde começar</p>
          </div>
          <p className="font-body-md text-on-surface-variant text-xs italic hidden md:block">
            Cardápio demonstrativo. Itens e preços sujeitos a alteração.
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
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
      <section className="py-16 md:py-24 px-4 md:px-margin-desktop bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10">
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
