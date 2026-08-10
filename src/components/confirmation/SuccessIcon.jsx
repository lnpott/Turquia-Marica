// Ícone de sucesso da confirmação — markup extraído 1:1 do HTML de produção
// (turquia_lanches_confirma_o_production/code.html): círculo com a logo oficial.
const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBeEwjyTO10L5prMO990a-z8hRn1s5Bj5MsO004AnzwvkHAAgmHCMxA-OpG6x_JFLJSwaLTPsK7JTEmyDqV9SKx67Kr560kMo_Ad3AG0FnSr_PuuVMm_Y13S3vLXNJUwH2AYDTEK0JXRKbIP63YWHN9dcA76PgupOcu64fILWPPSBrLCdOml1driBuegS-4INoTY5zKuMzlHPHl9cCyQHo_KrVL-CZl4E-8UwuNC8WOaYOemfB-DXW7Z7PdvW-yE-Q4-sY'

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
