/**
 * Distância em km. A taxa não mora aqui: sem zona vinda do banco, não há preço.
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function sortDeliveryZones(zones = []) {
  return [...zones].sort((a, b) => Number(a.max_radius_km) - Number(b.max_radius_km))
}

/**
 * `selector` é o id da zona ou uma distância em km.
 * Lista vazia nunca inventa taxa.
 */
export function matchDeliveryZone(selector, zones = []) {
  if (!zones || zones.length === 0 || selector == null || selector === '') return null

  if (typeof selector === 'string') {
    const zone = zones.find((entry) => entry.id === selector && entry.active !== false)
    if (!zone) return null
    return {
      zoneId: zone.id,
      feeCents: zone.fee_cents,
      description: zone.description,
      maxRadiusKm: Number(zone.max_radius_km),
    }
  }

  const distanceKm = Number(selector)
  if (!Number.isFinite(distanceKm) || distanceKm < 0) return null

  const sortedZones = sortDeliveryZones(zones.filter((zone) => zone.active !== false))
  for (const zone of sortedZones) {
    if (distanceKm <= Number(zone.max_radius_km)) {
      return {
        zoneId: zone.id,
        feeCents: zone.fee_cents,
        description: zone.description,
        maxRadiusKm: Number(zone.max_radius_km),
      }
    }
  }

  return null
}
