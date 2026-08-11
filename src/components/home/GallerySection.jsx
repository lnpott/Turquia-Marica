// LOTE 14 — Assets locais (mesmas fotografias aprovadas dos HTMLs de produção).
// LOTE 15 — Refinamento visual: eyebrow acima do título, grid editorial assimétrico
// com alturas fixas calibradas (350px/200px), caption única na imagem destaque,
// hover consistente com GallerySection do Cardápio (scale-105 / duration-500).
import imgHeroGallery from '../../assets/images/hero/hero-gallery.jpg'
import imgGallery2 from '../../assets/images/home/gallery-2.jpg'
import imgGallery3 from '../../assets/images/home/gallery-3.jpg'

function GallerySection() {
  return (
    <section className="w-full py-20 md:py-28 bg-surface px-4 lg:px-20">
      <div className="max-w-[1280px] mx-auto">

        {/* Cabeçalho da seção */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="section-eyebrow">Galeria</span>
            <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-on-background">
              Momentos Turquia
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant text-sm max-w-xs">
            Cada visita vira uma história. Venha escrever a sua.
          </p>
        </div>

        {/* Grid assimétrico: 1 coluna mobile, 3 colunas desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

          {/* Imagem destaque — 2 colunas, com caption */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden relative group h-[300px] md:h-[420px]">
            <img
              alt="Momentos na Turquia Lanches"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={imgHeroGallery}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 pointer-events-none">
              <span className="text-on-image font-headline-md font-bold drop-shadow-md">
                Alegria que Contagia
              </span>
            </div>
          </div>

          {/* Coluna lateral — 2 imagens empilhadas */}
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="rounded-2xl overflow-hidden relative group h-[200px] md:h-[202px]">
              <img
                alt="Ambiente Turquia Lanches"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={imgGallery2}
              />
            </div>
            <div className="rounded-2xl overflow-hidden relative group h-[200px] md:h-[202px]">
              <img
                alt="Turquia Lanches — detalhes"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={imgGallery3}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default GallerySection
