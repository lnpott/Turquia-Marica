import process from 'node:process'

const GOOGLE_PLACES_DETAILS_URL = 'https://places.googleapis.com/v1/places'
const CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

function sendJson(response, statusCode, payload) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', CACHE_CONTROL)
  return response.status(statusCode).json(payload)
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return sendJson(response, 405, { error: 'METHOD_NOT_ALLOWED' })
  }

  const placeId = process.env.GOOGLE_PLACE_ID
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!placeId || !apiKey) {
    return sendJson(response, 503, { error: 'REVIEWS_NOT_CONFIGURED' })
  }

  // Places API (New): o placeId vai no caminho da URL; autenticação pelo header
  // X-Goog-Api-Key; campos solicitados declarados no X-Goog-FieldMask.
  const url = `${GOOGLE_PLACES_DETAILS_URL}/${placeId}`

  try {
    const googleResponse = await globalThis.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,displayName,rating,userRatingCount,googleMapsUri',
        'Accept-Language': 'pt-BR',
      },
      body: JSON.stringify({ languageCode: 'pt-BR' }),
      signal: globalThis.AbortSignal.timeout(8000),
    })
    const data = await googleResponse.json()

    if (!googleResponse.ok) {
      globalThis.console.error('[api/reviews] Places API (New) HTTP error:', {
        status: googleResponse.status,
        message: data.error?.message,
      })
      return sendJson(response, 502, { error: 'GOOGLE_PLACES_HTTP_ERROR', status: googleResponse.status })
    }

    // A Places API (New) responde HTTP 200 mesmo em erro, com o campo `error` no body.
    if (data.error) {
      globalThis.console.error('[api/reviews] Places API (New) error:', {
        status: data.error.status,
        message: data.error.message,
      })
      return sendJson(response, 502, { error: 'GOOGLE_PLACES_ERROR', status: data.error.status })
    }

    const place = data ?? {}
    const reviews = (place.reviews ?? []).map((review, index) => {
      const reviewText = typeof review.text === 'object' && review.text !== null ? review.text.text : review.text
      return {
        id: `${review.name ?? 'review'}-${index}`,
        source: 'google',
        authorName: review.authorAttribution?.displayName ?? 'Cliente Google',
        rating: Number(review.rating) || null,
        text: reviewText ?? '',
        dateLabel: review.relativePublishTimeDescription ?? null,
        publishedAt: review.publishTime ?? null,
        sourceUrl: review.authorAttribution?.uri ?? place.googleMapsUri ?? null,
        avatarUrl: review.authorAttribution?.photoUri ?? null,
      }
    }).filter((review) => review.text)

    return sendJson(response, 200, {
      place: {
        name: place.displayName?.text ?? 'Turquia Lanches',
        rating: Number(place.rating) || null,
        totalRatings: Number(place.userRatingCount) || 0,
        url: place.googleMapsUri ?? null,
      },
      reviews,
    })
  } catch (error) {
    const reason = error?.name === 'TimeoutError' ? 'GOOGLE_PLACES_TIMEOUT' : 'GOOGLE_PLACES_UNAVAILABLE'
    return sendJson(response, 502, { error: reason })
  }
}
