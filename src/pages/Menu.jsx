import { ShoppingBag } from 'lucide-react'
import MenuHighlights from '../components/menu/MenuHighlights'
import UnavailableNotice from '../components/ui/UnavailableNotice'
import imgMenuHero from '../assets/images/menu/menu-hero.webp'
import imgMenuHeroFallback from '../assets/images/menu/menu-hero.jpg'
import { BUSINESS_INFO } from '../data/contact'
import ChannelAction from '../components/ui/ChannelAction'

function Menu() {
  return (
    <>
      <section className="bg-surface-container-low px-4 py-12 md:px-margin-desktop md:py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-2">
          <div>
            <span className="section-eyebrow">Cardápio Turquia</span>
            <h1 className="font-display-xl-mobile text-display-xl-mobile text-on-background md:font-display-xl md:text-display-xl">Cardápio em construção</h1>
            <p className="mt-5 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              Estamos confirmando produtos, ingredientes e preços. Nenhum valor provisório será apresentado como oferta.
            </p>
            <ChannelAction
              channel={BUSINESS_INFO.channels.ifood}
              icon={ShoppingBag}
              unavailableClassName="mt-6 inline-flex min-h-12 cursor-not-allowed items-center gap-2 rounded-xl border border-dashed border-outline bg-surface px-6 py-3 font-label-bold text-on-surface-variant"
            >
              iFood não disponível / em construção
            </ChannelAction>
          </div>
          <figure className="overflow-hidden rounded-2xl border-8 border-surface bg-surface shadow-xl">
            <picture>
              <source srcSet={imgMenuHero} type="image/webp" />
              <img
                src={imgMenuHeroFallback}
                alt="Hambúrguer com batatas em cenário ilustrativo"
                width="512"
                height="279"
                className="aspect-[16/9] h-auto w-full object-cover"
                fetchPriority="high"
              />
            </picture>
            <figcaption className="bg-on-surface px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-on-image">Imagem ilustrativa</figcaption>
          </figure>
        </div>
      </section>

      <MenuHighlights showAll />

      <section className="px-4 pb-4 md:px-margin-desktop">
        <UnavailableNotice
          className="mx-auto max-w-[1280px]"
          title="Produtos e preços não disponíveis"
          description="Esta área será atualizada quando o cardápio oficial for aprovado."
        />
      </section>
    </>
  )
}

export default Menu
