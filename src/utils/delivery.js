/**
 * Utilitários para validação de área de entrega e cálculo de taxa por raio.
 * Coordenadas da Loja física: R. Canarinhos, 663 - Parque Nanci, Maricá - RJ (-22.9238, -42.8252 aprox)
 */
export const STORE_COORDINATES = {
  lat: -22.9238,
  lng: -42.8252,
}

/**
 * Fórmula de Haversine para calcular distância esférica entre dois pontos (em km).
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371 // Raio da Terra em km
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

/**
 * Encontra a zona de entrega aplicável com base na distância em km.
 */
export function matchDeliveryZone(distanceKm, zones = []) {
  if (!zones || zones.length === 0) {
    // Zonas padrão caso o banco não responda
    if (distanceKm <= 3.0) return { feeCents: 500, description: 'Raio até 3 km' }
    if (distanceKm <= 6.0) return { feeCents: 800, description: 'Raio de 3 a 6 km' }
    if (distanceKm <= 10.0) return { feeCents: 1200, description: 'Raio de 6 a 10 km' }
    return null
  }

  const sortedZones = [...zones].sort((a, b) => a.max_radius_km - b.max_radius_km)
  for (const zone of sortedZones) {
    if (distanceKm <= Number(zone.max_radius_km)) {
      return {
        zoneId: zone.id,
        feeCents: zone.fee_cents,
        description: zone.description,
      }
    }
  }

  return null // Fora da área de cobertura
}
