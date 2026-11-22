function activeOptions(product) {
  const groups = product.product_option_groups || []
  return groups.flatMap((group) =>
    (group.product_options || [])
      .filter((option) => option.status === 'active')
      .map((option) => ({ ...option, groupId: group.id })),
  )
}

/**
 * Recalcula a sacola a partir do catálogo atual.
 * Linhas guardam só id, quantidade e ids de opcional. Preço do cliente é ignorado.
 */
export function quoteCart(lines, products) {
  const byId = new Map((products || []).map((product) => [product.id, product]))
  const quoted = []
  const issues = []

  for (const line of lines || []) {
    const product = byId.get(line.productId)
    if (!product || (product.status && product.status !== 'active')) {
      issues.push({ productId: line.productId, code: 'unavailable' })
      quoted.push({
        productId: line.productId,
        name: line.productId,
        quantity: line.quantity,
        optionIds: line.optionIds || [],
        options: [],
        unitPriceCents: 0,
        lineCents: 0,
        unavailable: true,
      })
      continue
    }

    const optionIds = line.optionIds || []
    const catalogOptions = activeOptions(product)
    const options = []
    let optionCents = 0
    let optionFailed = false

    for (const optionId of optionIds) {
      const option = catalogOptions.find((entry) => entry.id === optionId)
      if (!option) {
        optionFailed = true
        issues.push({ productId: line.productId, code: 'option_unavailable', optionId })
        continue
      }
      options.push({ id: option.id, name: option.name, priceCents: option.price_cents })
      optionCents += option.price_cents
    }

    const quantity = line.quantity
    const lineCents = optionFailed ? 0 : (product.price_cents + optionCents) * quantity
    if (optionFailed) {
      quoted.push({
        productId: product.id,
        name: product.name,
        quantity,
        optionIds,
        options,
        unitPriceCents: product.price_cents,
        lineCents: 0,
        unavailable: true,
      })
      continue
    }

    quoted.push({
      productId: product.id,
      name: product.name,
      quantity,
      optionIds,
      options,
      unitPriceCents: product.price_cents,
      lineCents,
      unavailable: false,
    })
  }

  const sellable = quoted.filter((line) => !line.unavailable)
  return {
    lines: quoted,
    issues,
    subtotalCents: sellable.reduce((sum, line) => sum + line.lineCents, 0),
    totalItems: sellable.reduce((sum, line) => sum + line.quantity, 0),
  }
}
