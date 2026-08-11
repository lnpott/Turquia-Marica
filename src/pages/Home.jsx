import HeroSection from '../components/home/HeroSection'
import AmbienceSection from '../components/home/AmbienceSection'
import GallerySection from '../components/home/GallerySection'
import FoodHighlights from '../components/home/FoodHighlights'
import MenuPreviewSection from '../components/home/MenuPreviewSection'

function TrustStrip() {
  const items = [
    ['location_on', 'Maricá · RJ'],
    ['schedule', 'Pedido rápido'],
    ['delivery_dining', 'Entrega ou retirada'],
  ]

  return (
    <section aria-label="Informações do atendimento" className="brand-stripe px-4 py-3">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm font-bold text-on-primary">
        {items.map(([icon, label]) => (
          <div key={label} className="flex items-center justify-center gap-2 min-h-10">
            <span className="material-symbols-outlined text-lg" aria-hidden="true">{icon}</span>
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <AmbienceSection />
      <GallerySection />
      <FoodHighlights />
      <MenuPreviewSection />
      {/* Spacer */}
      <div className="h-stack-loose md:h-margin-desktop" />
    </>
  )
}

export default Home
