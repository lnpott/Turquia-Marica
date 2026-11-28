import { useState, useEffect } from 'react'
import { getActiveCategories, getActiveProducts, getDeliveryZones } from '../services/catalog'
import { formatCents } from '../lib/money'
import { categories as localCategories, products as localProducts } from '../data/menu'

const PROVISIONAL_CENTS = 2990

function localCatalog() {
  return {
    categories: localCategories,
    products: localProducts.map((product) => ({
      ...product,
      price_cents: PROVISIONAL_CENTS,
      price: product.price || formatCents(PROVISIONAL_CENTS),
      status: 'active',
      image: product.image || null,
      imageAlt: product.imageAlt || product.name,
      priceProvisional: true,
    })),
  }
}

function mapRemoteProduct(product) {
  return {
    ...product,
    categoryId: product.category_id,
    price: formatCents(product.price_cents),
    image: product.image_url || null,
    imageAlt: product.image_alt || product.name,
    priceProvisional: false,
  }
}

/**
 * Prefere o catálogo do Supabase quando ele traz produtos com foto.
 * Falha de conexão, catálogo vazio ou sem fotos usa vitrine provisória (menu.js).
 */
export function useCatalog() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [deliveryZones, setDeliveryZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [provisional, setProvisional] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadCatalog() {
      const fallback = localCatalog()
      try {
        setLoading(true)
        setError(null)
        const [catRes, prodRes, zonesRes] = await Promise.all([
          getActiveCategories(),
          getActiveProducts(),
          getDeliveryZones(),
        ])

        if (!isMounted) return

        const failure = catRes.error || prodRes.error
        if (failure) {
          // Fail-open para a vitrine: mostra menu local provisório em vez de "indisponível".
          setCategories(fallback.categories)
          setProducts(fallback.products)
          setDeliveryZones(zonesRes.error ? [] : (zonesRes.data || []))
          setProvisional(true)
          setError(failure)
          return
        }

        const remoteProducts = (prodRes.data || []).map(mapRemoteProduct)
        const hasPhoto = remoteProducts.some((product) => product.image)

        if (remoteProducts.length === 0 || !hasPhoto) {
          setCategories(fallback.categories)
          setProducts(fallback.products)
          setDeliveryZones(zonesRes.error ? [] : (zonesRes.data || []))
          setProvisional(true)
          return
        }

        setCategories(catRes.data || [])
        setProducts(remoteProducts)
        setDeliveryZones(zonesRes.error ? [] : (zonesRes.data || []))
        setProvisional(false)
      } catch (loadError) {
        if (!isMounted) return
        setCategories(fallback.categories)
        setProducts(fallback.products)
        setDeliveryZones([])
        setProvisional(true)
        setError(loadError)
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
  else if (products.length === 0) status = 'empty'
  else if (error && provisional) status = 'ready'
  else if (error) status = 'error'

  return { categories, products, deliveryZones, loading, error, status, provisional }
}
