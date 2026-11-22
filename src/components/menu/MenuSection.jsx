import { useMemo, useState } from 'react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import UnavailableNotice from '../ui/UnavailableNotice'
import CategoryFilterBar from './CategoryFilterBar'
import ProductCard from '../product/ProductCard'
import { useCatalog } from '../../hooks/useCatalog'

function MenuSection({ items = null }) {
  const { categories, products, loading, error, status } = useCatalog()
  const [activeCategory, setActiveCategory] = useState('todos')
  const usingOverride = Array.isArray(items)
  const displayItems = usingOverride ? items : products

  const availableCategories = useMemo(
    () => categories.filter((category) => displayItems.some((product) => product.categoryId === category.id || product.category_id === category.id)),
    [categories, displayItems],
  )

  const filteredProducts = activeCategory === 'todos'
    ? displayItems
    : displayItems.filter((product) => product.categoryId === activeCategory || product.category_id === activeCategory)

  let notice = null
  if (!usingOverride && loading) {
    notice = { title: 'Carregando cardápio', description: 'Buscando categorias e preços no catálogo.' }
  } else if (!usingOverride && status === 'error') {
    notice = {
      title: 'Cardápio indisponível',
      description: 'Não foi possível ler o catálogo. Nenhum cardápio de demonstração será exibido no lugar.',
    }
  } else if (!usingOverride && displayItems.length === 0) {
    notice = {
      title: 'Produtos em confirmação',
      description: 'O cardápio oficial ainda não foi disponibilizado. Nenhum produto, preço ou pedido fictício será exibido.',
    }
  }

  return (
    <section id="cardapio" className="scroll-mt-24 bg-[#faf7f2]/[0.35] px-5 py-20 md:px-margin-desktop md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Cardápio"
          title={<>O produto é o <span className="text-primary">protagonista.</span></>}
          description="Conheça os produtos do nosso cardápio e encontre o seu favorito."
        />

        {notice ? (
          <Reveal className="mt-12">
            <UnavailableNotice
              className="rounded-sm border-[#e8e0d4] bg-white px-6 py-10"
              title={notice.title}
              description={error && status === 'error' ? notice.description : notice.description}
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
