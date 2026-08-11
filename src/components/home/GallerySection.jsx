// LOTE 14 — Assets locais (mesmas fotografias aprovadas dos HTMLs de produção).
// IMAGE_1 é a MESMA fotografia da galeria do hero (hero-gallery.jpg) — duplicata
// real de conteúdo confirmada por MD5; asset único reutilizado.
import imgHeroGallery from '../../assets/images/hero/hero-gallery.jpg'
import imgGallery2 from '../../assets/images/home/gallery-2.jpg'
import imgGallery3 from '../../assets/images/home/gallery-3.jpg'

const IMAGE_1 = imgHeroGallery
const IMAGE_2 = imgGallery2
const IMAGE_3 = imgGallery3

const ITEMS = [
  {
    src: IMAGE_1,
    alt: 'Experiência 1',
    label: 'Alegria que Contagia',
    className: 'col-span-1 md:col-span-2 row-span-2',
  },
  { src: IMAGE_2, alt: 'Experiência 2', className: 'col-span-1 row-span-1' },
  { src: IMAGE_3, alt: 'Experiência 3', className: 'col-span-1 row-span-1' },
]

function GallerySection() {
  return (
    <section className="w-full py-16 bg-surface-container-low px-4 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-center text-primary mb-12">
          Momentos Turquia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] overflow-hidden">
          {ITEMS.map((item) => (
            <div
              key={item.alt}
              className={`${item.className} rounded-2xl overflow-hidden shadow-lg relative group`}
            >
              <img
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={item.src}
              />
              {item.label && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-headline-md font-bold">{item.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
