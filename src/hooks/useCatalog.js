import { useState, useEffect } from 'react'
import { getActiveCategories, getActiveProducts, getDeliveryZones } from '../services/catalog'
import { formatCents } from '../lib/money'

/**
 * Catálogo público vem só do Supabase.
 * Falha ou lista vazia não é substituída por menu.js.
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
        setError(null)
        const [catRes, prodRes, zonesRes] = await Promise.all([
          getActiveCategories(),
          getActiveProducts(),
          getDeliveryZones(),
        ])

        if (!isMounted) return

        const failure = catRes.error || prodRes.error || zonesRes.error
        if (failure) {
          setCategories([])
          setProducts([])
          setDeliveryZones([])
          setError(failure.message || 'CATALOG_UNAVAILABLE')
          return
        }

        setCategories(catRes.data || [])
        setProducts(
          (prodRes.data || []).map((product) => ({
            ...product,
            categoryId: product.category_id,
            price: formatCents(product.price_cents),
            image: product.image_url || null,
            imageAlt: product.image_alt || product.name,
            isMock: false,
          })),
        )
        setDeliveryZones(zonesRes.data || [])
      } catch (err) {
        if (!isMounted) return
        setCategories([])
        setProducts([])
        setDeliveryZones([])
        setError(err.message || 'CATALOG_UNAVAILABLE')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadCatalog()

    return () => {
      isMounted = false
    }
  }, [])

  let status = 'ready'
  if (loading) status = 'loading'
  else if (error) status = 'error'
  else if (products.length === 0) status = 'empty'

  return { categories, products, deliveryZones, loading, error, status }
}
