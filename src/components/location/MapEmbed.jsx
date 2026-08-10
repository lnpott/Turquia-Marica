// Mapa — preserva a solução exata da referência (turquia_lanches_localiza_o_production/code.html):
// imagem placeholder em estilo mapa, SEM iframe/API/SDK de mapas (o HTML de produção não usa
// nenhum serviço externo de mapas). Os controles de zoom são mockup visual (no HTML são
// <button> inertes) — renderizados como spans decorativos com aria-hidden para não criar
// controles falsos (adaptação de acessibilidade documentada no roadmap).
const MAP_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCWRLF0VJGlxjHtClCnpJ3XaKC-YjuYJ8fcm8DANaxTt3Mnb9bLWJgFBlJh_qWlmpZ6u347i3zLqvmwEx8I2JIwqlbNtJ7reYu5ViRwTEKZZ4qjfZLRHsuxZfPekzGXGCooBas30X6dnwYgI3kbwUqXnfIuPKFIP2vnQ26xh5BC8IBQob6gQ2x1SPNpNEyCYyEJRxl7Lkjt2SAJiZK8F9M-HYCgHf7kfG8jbds2u5WpUQNwGDqXkvtqrQ'

function MapEmbed() {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(37,25,19,0.12)] min-h-[400px] relative group">
      <img
        src={MAP_IMAGE}
        alt="Mapa ilustrativo da localização da Turquia Lanches em Maricá/RJ"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      {/* Overlay interativo (referência) */}
      <div
        className="absolute inset-0 bg-surface/10 group-hover:bg-transparent transition-colors duration-300"
        aria-hidden="true"
      />
      {/* Mockup de controles de zoom do mapa (decorativo) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2" aria-hidden="true">
        <span className="w-10 h-10 bg-white rounded shadow flex items-center justify-center text-on-surface">
          <span className="material-symbols-outlined">add</span>
        </span>
        <span className="w-10 h-10 bg-white rounded shadow flex items-center justify-center text-on-surface">
          <span className="material-symbols-outlined">remove</span>
        </span>
      </div>
    </div>
  )
}

export default MapEmbed
