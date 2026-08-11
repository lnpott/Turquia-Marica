// Dados de contato reais da Turquia Lanches — fonte única (evita divergência
// entre WhatsAppButton/ContactCard e centraliza para a integração real do
// Lote 10). Âncoras extraídas dos HTMLs de produção
// (turquia_lanches_localiza_o_production/code.html e confirmação).
export const WHATSAPP_URL = 'https://shre.ink/turquiamarica'
export const INSTAGRAM_URL = 'https://www.instagram.com/turquialanches/'
export const MAPS_LINK = 'https://maps.app.goo.gl/QHAQCBvrACZZK5Ho9'
// Destino único para todas as ações de pedido. Substituir por uma URL de loja
// específica do iFood quando ela estiver disponível, sem espalhar links pelo JSX.
export const IFOOD_URL = 'https://www.ifood.com.br/'
