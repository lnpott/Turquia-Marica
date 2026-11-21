import { useState, useEffect } from 'react'
import { getActiveCategories, getActiveProducts, getDeliveryZones } from '../services/catalog'
import { categories as fallbackCategories, products as fallbackProducts } from '../data/menu'

/**
 * Hook para carregar o catálogo dinâmico via Supabase,
 * com fallback gracioso e transparente para o acervo estático caso offline.
 */
export function useCatalog() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [deliveryZones, setDeliveryZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadCatalog() {
      try {
        setLoading(true)
        const [catRes, prodRes, zonesRes] = await Promise.all([
          getActiveCategories(),
          getActiveProducts(),
          getDeliveryZones(),
        ])

        if (!isMounted) return

        if (catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data)
        } else {
          setCategories(fallbackCategories)
        }

        if (prodRes.data && prodRes.data.length > 0) {
          // Mapeia os dados do Supabase mantendo compatibilidade de apresentação
          const mapped = prodRes.data.map((p) => {
            const fallbackMatch = fallbackProducts.find((fp) => fp.id === p.id)
            return {
              ...p,
              categoryId: p.category_id,
              price: `R$ ${(p.price_cents / 100).toFixed(2).replace('.', ',')}`,
              image: p.image_url || fallbackMatch?.image || null,
              resolveImage: fallbackMatch?.resolveImage || null,
              imageAlt: p.image_alt || fallbackMatch?.imageAlt || p.name,
              isMock: false,
            }
          })
          setProducts(mapped)
        } else {
          setProducts(fallbackProducts)
        }

        if (zonesRes.data) {
          setDeliveryZones(zonesRes.data)
        }
      } catch (err) {
        if (!isMounted) return
        setError(err)
        setCategories(fallbackCategories)
        setProducts(fallbackProducts)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  return { categories, products, deliveryZones, loading, error }
}
