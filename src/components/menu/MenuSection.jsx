import { useMemo, useState } from 'react'
import { products as productsFallback } from '../../data/menu'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import UnavailableNotice from '../ui/UnavailableNotice'
import CategoryFilterBar from './CategoryFilterBar'
import ProductCard from '../product/ProductCard'
import { useCatalog } from '../../hooks/useCatalog'

function MenuSection({ items = productsFallback }) {
  const { categories, products: dynamicProducts } = useCatalog()
  const [activeCategory, setActiveCategory] = useState('todos')

  // Se o catálogo dinâmico carregar com sucesso, utiliza-o; caso contrário, utiliza a lista fallback
  const displayItems = (dynamicProducts && dynamicProducts.length > 0) ? dynamicProducts : items

  const availableCategories = useMemo(
    () => categories.filter((category) => displayItems.some((product) => product.categoryId === category.id)),
    [categories, displayItems]
  )

  const filteredProducts = activeCategory === 'todos'
    ? displayItems
    : displayItems.filter((product) => product.categoryId === activeCategory)

  return (
    <section id="cardapio" className="scroll-mt-24 bg-[#faf7f2]/[0.35] px-5 py-20 md:px-margin-desktop md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Cardápio"
          title={<>O produto é o <span className="text-primary">protagonista.</span></>}
          description="Conheça os produtos do nosso cardápio e encontre o seu favorito."
        />

        {displayItems.length === 0 ? (
          <Reveal className="mt-12">
            <UnavailableNotice
              className="rounded-sm border-[#e8e0d4] bg-white px-6 py-10"
              title="Produtos em confirmação"
              description="O cardápio oficial ainda não foi disponibilizado. Nenhum produto, preço ou pedido fictício será exibido."
            />
          </Reveal>
        ) : (
          <div className="mt-12">
            <CategoryFilterBar categories={availableCategories} active={activeCategory} onSelect={setActiveCategory} />
            <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
              {filteredProducts.map((product, index) => (
                <Reveal as="li" key={product.id} delay={index * 50}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default MenuSection
