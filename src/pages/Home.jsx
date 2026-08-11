import HeroSection from '../components/home/HeroSection'
import AmbienceSection from '../components/home/AmbienceSection'
import GallerySection from '../components/home/GallerySection'
import FoodHighlights from '../components/home/FoodHighlights'
import Menu from './Menu'

function Home() {
  return (
    <>
      <HeroSection />
      <div id="sobre"><AmbienceSection /></div>
      <GallerySection />
      <FoodHighlights />
      <div id="cardapio"><Menu showHero={false} /></div>
    </>
  )
}

export default Home
