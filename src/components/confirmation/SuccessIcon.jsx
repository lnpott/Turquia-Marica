// Ícone de sucesso da confirmação — markup extraído 1:1 do HTML de produção
// (turquia_lanches_confirma_o_production/code.html): círculo com a logo oficial.
// LOTE 14 — Logo migrada para asset local (mesma fotografia do Header/Footer).
import logo from '../../assets/images/brand/logo.jpg'

const LOGO_URL = logo

function SuccessIcon() {
  return (
    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg border-4 border-surface-container-highest mb-6 mx-auto bg-surface-container-low flex items-center justify-center">
      <img
        alt="Turquia Lanches Logo"
        className="w-full h-full object-cover"
        src={LOGO_URL}
      />
    </div>
  )
}

export default SuccessIcon
