import { ShoppingBag } from 'lucide-react'
import MenuHighlights from '../components/menu/MenuHighlights'
import UnavailableNotice from '../components/ui/UnavailableNotice'
import imgMenuHero from '../assets/images/menu/menu-hero.webp'
import imgMenuHeroFallback from '../assets/images/menu/menu-hero.jpg'
import { BUSINESS_INFO } from '../data/contact'
import ChannelAction from '../components/ui/ChannelAction'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

function Menu() {
  return (
    <>
      <section className="bg-[#1a1008] px-5 py-14 text-white md:px-margin-desktop md:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="relative z-10">
            <span className="section-eyebrow section-eyebrow-on-dark">Cardápio Turquia</span>
            <h1 className="display-balance max-w-[10ch] text-[clamp(3.3rem,8vw,7.2rem)] font-extrabold leading-[0.86] tracking-[-0.065em] text-white">
              Comida farta.<span className="block text-secondary-container">Informação honesta.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              A estrutura do futuro cardápio está aqui. Produtos, preços e pedidos continuam indisponíveis até confirmação oficial.
            </p>
            <Button
              href="#categorias"
              variant="editorialPrimary"
              size="md"
              className="mt-8 text-sm font-extrabold"
            >
              Ver categorias previstas
            </Button>
            <ChannelAction
              channel={BUSINESS_INFO.channels.ifood}
              icon={ShoppingBag}
              unavailableClassName="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-image/55"
            >
              iFood não disponível / em construção
            </ChannelAction>
          </div>
          <figure className="menu-hero-visual relative -order-1 overflow-hidden rounded-sm bg-white/5 md:order-none">
            <picture>
              <source srcSet={imgMenuHero} type="image/webp" />
              <img
                src={imgMenuHeroFallback}
                alt="Hambúrguer com batatas em cenário ilustrativo"
                width="512"
                height="279"
                className="aspect-[4/3] h-auto w-full object-cover opacity-80 transition-transform duration-[12s] ease-linear hover:scale-105"
                fetchpriority="high"
              />
            </picture>
            <figcaption className="absolute bottom-4 right-4 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">Fotografia ilustrativa</figcaption>
          </figure>
        </div>
      </section>

      <MenuHighlights showAll />

      <Reveal as="section" className="bg-[#faf7f2] px-5 py-10 md:px-margin-desktop md:py-16">
        <UnavailableNotice
          className="mx-auto max-w-[1280px] border-y border-[#e8e0d4] bg-transparent"
          title="Produtos e preços não disponíveis"
          description="Esta área será atualizada quando o cardápio oficial for aprovado."
        />
      </Reveal>
    </>
  )
}

export default Menu
