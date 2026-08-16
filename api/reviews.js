import process from 'node:process'
import { URL } from 'node:url'

const GOOGLE_PLACES_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'
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

  const url = new URL(GOOGLE_PLACES_DETAILS_URL)
  url.searchParams.set('place_id', placeId)
  url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews,url')
  url.searchParams.set('language', 'pt-BR')
  url.searchParams.set('reviews_sort', 'newest')
  url.searchParams.set('key', apiKey)

  try {
    const googleResponse = await globalThis.fetch(url, { signal: globalThis.AbortSignal.timeout(8000) })
    if (!googleResponse.ok) {
      return sendJson(response, 502, { error: 'GOOGLE_PLACES_HTTP_ERROR', status: googleResponse.status })
    }

    const data = await googleResponse.json()
    if (data.status !== 'OK') {
      return sendJson(response, 502, {
        error: 'GOOGLE_PLACES_ERROR',
        status: data.status ?? 'UNKNOWN_ERROR',
      })
    }

    const place = data.result ?? {}
    const reviews = (place.reviews ?? []).map((review, index) => ({
      id: `${review.time ?? 'review'}-${index}`,
      source: 'google',
      authorName: review.author_name ?? 'Cliente Google',
      rating: Number(review.rating) || null,
      text: review.text ?? '',
      dateLabel: review.relative_time_description ?? null,
      publishedAt: review.time ? new Date(review.time * 1000).toISOString() : null,
      sourceUrl: review.author_url ?? place.url ?? null,
      avatarUrl: review.profile_photo_url ?? null,
    })).filter((review) => review.text)

    return sendJson(response, 200, {
      place: {
        name: place.name ?? 'Turquia Lanches',
        rating: Number(place.rating) || null,
        totalRatings: Number(place.user_ratings_total) || 0,
        url: place.url ?? null,
      },
      reviews,
    })
  } catch (error) {
    const reason = error?.name === 'TimeoutError' ? 'GOOGLE_PLACES_TIMEOUT' : 'GOOGLE_PLACES_UNAVAILABLE'
    return sendJson(response, 502, { error: reason })
  }
}
