import { reviews } from '../../data/reviews'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ReviewCard from './ReviewCard'

function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-[#faf7f2] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-margin-desktop">
        <SectionHeading eyebrow="Reviews · demonstração" title={<>Como a experiência <span className="text-primary">poderá ser contada.</span></>} description="Conteúdo demonstrativo — todas as avaliações abaixo são fictícias e existem apenas para validar o design antes de uma integração oficial." />
      </div>
      <Reveal>
        <ul className="scrolling-wrapper mx-auto mt-12 flex max-w-[1408px] snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-margin-desktop" aria-label="Avaliações fictícias de demonstração" tabIndex="0">
          {reviews.map((review) => (
            <li key={review.id} className="w-[85vw] max-w-[420px] shrink-0 snap-start">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

export default ReviewsSection
