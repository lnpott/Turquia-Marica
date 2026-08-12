export const BUSINESS_STATUS = Object.freeze({
  AVAILABLE: 'available',
  PARTIAL: 'partial',
  UNAVAILABLE: 'unavailable',
})

export const BUSINESS_INFO = Object.freeze({
  name: 'Turquia Lanches',
  location: {
    status: BUSINESS_STATUS.PARTIAL,
    value: 'Parque Nanci, Maricá/RJ',
    note: 'Endereço completo em construção',
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
      url: 'https://maps.app.goo.gl/QHAQCBvrACZZK5Ho9',
    },
  },
})

export const IFOOD_URL = BUSINESS_INFO.channels.ifood.url
export const WHATSAPP_URL = BUSINESS_INFO.channels.whatsapp.url
export const INSTAGRAM_URL = BUSINESS_INFO.channels.instagram.url
export const MAPS_LINK = BUSINESS_INFO.channels.maps.url
