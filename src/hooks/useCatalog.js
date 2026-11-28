import { useState, useEffect, useSyncExternalStore } from 'react'
import { getActiveCategories, getActiveProducts, getDeliveryZones } from '../services/catalog'
import { formatCents } from '../lib/money'
import { categories as localCategories, products as localProducts } from '../data/menu'

const PROVISIONAL_CENTS = 2990
const REMOTE_TIMEOUT_MS = 2500

/** Fotos provisórias do menu local, indexadas por id do produto. */
const localImageById = Object.fromEntries(
  localProducts
    .filter((product) => product.id && product.image)
    .map((product) => [
      product.id,
      { image: product.image, imageAlt: product.imageAlt || product.name },
    ]),
)

const localCategoryImageById = Object.fromEntries(
  localCategories
    .filter((category) => category.id && (category.image || category.fallbackImage))
    .map((category) => [
      category.id,
      {
        image: category.image || category.fallbackImage || null,
        fallbackImage: category.fallbackImage || null,
        imageAlt: category.imageAlt || category.name,
      },
    ]),
)

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
  const local = localImageById[product.id]
  const remoteImage = product.image_url || null
  return {
    ...product,
    categoryId: product.category_id,
    price: formatCents(product.price_cents),
    image: remoteImage || local?.image || null,
    imageAlt: product.image_alt || local?.imageAlt || product.name,
    priceProvisional: false,
  }
}

function mapRemoteCategory(category) {
  const local = localCategoryImageById[category.id]
  return {
    ...category,
    image: category.image_url || local?.image || null,
    fallbackImage: local?.fallbackImage || null,
    imageAlt: category.image_alt || local?.imageAlt || category.name,
  }
}

function withTimeout(promise, ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve({ timedOut: true })
    }, ms)
    promise
      .then((value) => {
        clearTimeout(timer)
        resolve({ timedOut: false, value })
      })
      .catch((error) => {
        clearTimeout(timer)
        resolve({ timedOut: false, error })
      })
  })
}

/** Estado compartilhado: uma carga para toda a app (home + sacola + checkout). */
const fallback = localCatalog()
let catalogState = {
  categories: fallback.categories,
  products: fallback.products,
  deliveryZones: [],
  loading: true,
  refreshing: false,
  error: null,
  provisional: true,
  status: 'ready',
}
const listeners = new Set()
let loadPromise = null

function emit() {
  listeners.forEach((listener) => listener())
}

function setCatalogState(patch) {
  catalogState = { ...catalogState, ...patch }
  emit()
}

async function fetchRemoteCatalog() {
  const [catRes, prodRes, zonesRes] = await Promise.all([
    getActiveCategories(),
    getActiveProducts(),
    getDeliveryZones(),
  ])

  const failure = catRes.error || prodRes.error
  if (failure) {
    return {
      categories: fallback.categories,
      products: fallback.products,
      deliveryZones: zonesRes.error ? [] : (zonesRes.data || []),
      error: failure,
      provisional: true,
    }
  }

  const remoteProducts = (prodRes.data || []).map(mapRemoteProduct)

  // Catálogo oficial é o Supabase. Sem produtos remotos, mantém o menu local.
  // Foto do banco prevalece; se vazia, reaproveita a do menu.js pelo mesmo id.
  if (remoteProducts.length === 0) {
    return {
      categories: fallback.categories,
      products: fallback.products,
      deliveryZones: zonesRes.error ? [] : (zonesRes.data || []),
      error: null,
      provisional: true,
    }
  }

  return {
    categories: (catRes.data || []).map(mapRemoteCategory),
    products: remoteProducts,
    deliveryZones: zonesRes.error ? [] : (zonesRes.data || []),
    error: null,
    provisional: false,
  }
}

function ensureCatalogLoaded() {
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    setCatalogState({ loading: true, refreshing: true })

    const result = await withTimeout(fetchRemoteCatalog(), REMOTE_TIMEOUT_MS)

    if (result.timedOut) {
      // Mantém vitrine local imediata; não bloqueia a UI.
      setCatalogState({
        loading: false,
        refreshing: false,
        provisional: true,
        error: new Error('Timeout ao consultar o catálogo remoto'),
        status: 'ready',
      })
      // Continua a promessa em background sem travar de novo a UI.
      fetchRemoteCatalog()
        .then((remote) => {
          setCatalogState({
            ...remote,
            loading: false,
            refreshing: false,
            status: remote.products.length === 0 ? 'empty' : 'ready',
          })
        })
        .catch(() => {
          setCatalogState({ loading: false, refreshing: false, status: 'ready' })
        })
      return catalogState
    }

    if (result.error) {
      setCatalogState({
        categories: fallback.categories,
        products: fallback.products,
        deliveryZones: [],
        loading: false,
        refreshing: false,
        error: result.error,
        provisional: true,
        status: 'ready',
      })
      return catalogState
    }

    const remote = result.value
    setCatalogState({
      ...remote,
      loading: false,
      refreshing: false,
      status: remote.products.length === 0 ? 'empty' : 'ready',
    })
    return catalogState
  })()

  return loadPromise
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return catalogState
}

/**
 * Prefere o catálogo do Supabase quando há produtos ativos.
 * Preço e lista vêm do banco; foto local preenche quando image_url está vazio.
 * Cache compartilhado evita refetch ao abrir a sacola.
 */
export function useCatalog() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    ensureCatalogLoaded()
  }, [])

  return state
}
