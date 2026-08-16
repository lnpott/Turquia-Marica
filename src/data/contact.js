export const BUSINESS_STATUS = Object.freeze({
  AVAILABLE: 'available',
  PARTIAL: 'partial',
  UNAVAILABLE: 'unavailable',
})

export const BUSINESS_INFO = Object.freeze({
  name: 'Turquia Lanches',
  location: {
    status: BUSINESS_STATUS.AVAILABLE,
    value: 'R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160',
    note: null,
  },
  hours: {
    status: BUSINESS_STATUS.UNAVAILABLE,
    value: null,
    note: 'Não disponível / em construção',
  },
  phone: {
    status: BUSINESS_STATUS.UNAVAILABLE,
    value: null,
    note: 'Não disponível / em construção',
  },
  channels: {
    ifood: {
      status: BUSINESS_STATUS.UNAVAILABLE,
      label: 'Pedir no iFood',
      url: null,
      note: 'Loja no iFood não disponível / em construção',
    },
    whatsapp: {
      status: BUSINESS_STATUS.UNAVAILABLE,
      label: 'WhatsApp',
      url: null,
      note: 'WhatsApp não disponível / em construção',
    },
    instagram: {
      status: BUSINESS_STATUS.AVAILABLE,
      label: 'Instagram',
      url: 'https://www.instagram.com/turquialanches/',
      handle: '@turquialanches',
    },
    maps: {
      status: BUSINESS_STATUS.AVAILABLE,
      label: 'Como chegar',
      url: 'https://www.google.com/maps/search/?api=1&query=R.+Canarinhos%2C+663+-+Parque+Nanci%2C+Maric%C3%A1+-+RJ%2C+24914-160',
    },
  },
})

export const IFOOD_URL = BUSINESS_INFO.channels.ifood.url
export const WHATSAPP_URL = BUSINESS_INFO.channels.whatsapp.url
export const INSTAGRAM_URL = BUSINESS_INFO.channels.instagram.url
export const MAPS_LINK = BUSINESS_INFO.channels.maps.url
