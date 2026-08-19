/* Identidade visual do iFood em SVG inline (leve, sem pacote externo).
   O "i" estilizado — ponto e haste com pé — em currentColor, para herdar a
   cor do contexto (botão primary, footer, etc.). Sempre decorativo
   (aria-hidden); o texto visível acompanha o ícone. */
function IconIfood({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ponto do "i" */}
      <circle cx="12" cy="5" r="2.6" fill="currentColor" />
      {/* Haste com pé (base do "i" do iFood) */}
      <path
        d="M9.2 10.4h5.6a.9.9 0 0 1 0 1.8h-1.8v5.6a3 3 0 0 1-6 0v-1a.9.9 0 0 1 1.8 0v1a1.2 1.2 0 0 0 2.4 0v-5.6H9.2a.9.9 0 0 1 0-1.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default IconIfood
