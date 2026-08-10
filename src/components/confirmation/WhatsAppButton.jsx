import { WhatsAppIcon } from '../ui/Button'
import { WHATSAPP_URL } from '../../data/contact'

// Botão de WhatsApp — verde da marca com ícone oficial (Design System: o botão
// de WhatsApp é sempre verde com o ícone da marca). Usa o link real de contato
// da produção (fonte única em src/data/contact.js). A montagem do texto do
// pedido via wa.me fica para a integração real (Lote 10) — decisão registrada
// no roadmap.

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-[#25D366] text-white font-headline-md px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-200 shadow-sm"
    >
      <WhatsAppIcon className="w-5 h-5 fill-current" />
      Falar no WhatsApp
    </a>
  )
}

export default WhatsAppButton
