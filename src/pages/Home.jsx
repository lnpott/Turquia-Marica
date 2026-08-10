import HeroSection from '../components/home/HeroSection'
import AmbienceSection from '../components/home/AmbienceSection'
import GallerySection from '../components/home/GallerySection'
import FoodHighlights from '../components/home/FoodHighlights'
import MenuPreviewSection from '../components/home/MenuPreviewSection'

function Home() {
  return (
    <>
      <HeroSection />
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
