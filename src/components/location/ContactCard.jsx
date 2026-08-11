import { WhatsAppIcon } from '../ui/Button'
import { WHATSAPP_URL, INSTAGRAM_URL, MAPS_LINK } from '../../data/contact'

// Card de contato — extraído 1:1 do HTML de produção
// (turquia_lanches_localiza_o_production/code.html). Nenhum dado foi inventado:
// endereço "Parque Nanci, Maricá/RJ", horário "Em breve: horários oficiais"
// (o HTML NÃO define horários), WhatsApp com o link real de produção
// (shre.ink/turquiamarica — sem wa.me novo; integração real fica no Lote 10) e
// Instagram oficial @turquialanches. URLs em src/data/contact.js (fonte única).

function ContactCard() {
  return (
    <div
      id="contato"
      className="bg-surface-container-lowest rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_15px_rgba(37,25,19,0.12)] flex flex-col gap-stack-loose hover:shadow-[0_8px_25px_rgba(37,25,19,0.15)] transition-shadow duration-300"
    >
      {/* Endereço */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-tight flex items-center gap-unit">
          <span className="material-symbols-outlined" aria-hidden="true">
            location_on
          </span>
          Endereço
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface">Parque Nanci, Maricá/RJ</p>
        <a
          className="mt-4 text-primary font-label-bold text-label-bold flex items-center gap-unit hover:underline"
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          Como Chegar
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            arrow_forward
          </span>
        </a>
      </div>

      <hr className="border-outline-variant" />

      {/* Horário de funcionamento */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-tight flex items-center gap-unit">
          <span className="material-symbols-outlined" aria-hidden="true">
            schedule
          </span>
          Horário de Funcionamento
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Em breve: horários oficiais</p>
      </div>

      <hr className="border-outline-variant" />

      {/* Telefone / WhatsApp */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-tight flex items-center gap-unit">
          <span className="material-symbols-outlined" aria-hidden="true">
            call
          </span>
          Telefone / WhatsApp
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">Disponível via WhatsApp</p>
        <a
          className="bg-[#25D366] text-white font-label-bold text-label-bold px-4 py-2 rounded shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 w-full md:w-auto"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="w-5 h-5 fill-current" />
          Chamar no WhatsApp
        </a>
      </div>

      <hr className="border-outline-variant" />

      {/* Instagram */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-tight flex items-center gap-unit">
          <span className="material-symbols-outlined" aria-hidden="true">
            photo_camera
          </span>
          Siga-nos no Instagram
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">@turquialanches</p>
        <a
          className="bg-primary text-white font-label-bold text-label-bold px-4 py-2 rounded shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 w-full md:w-auto"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver Instagram
        </a>
      </div>
    </div>
  )
}

export default ContactCard
