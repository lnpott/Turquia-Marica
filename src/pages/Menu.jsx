import { ShoppingBag } from 'lucide-react'
import MenuCatalog from '../components/menu/MenuCatalog'
import UnavailableNotice from '../components/ui/UnavailableNotice'
import imgMenuHero from '../assets/images/menu/menu-hero.webp'
import imgMenuHeroFallback from '../assets/images/menu/menu-hero.jpg'
import { BUSINESS_INFO } from '../data/contact'
import ChannelAction from '../components/ui/ChannelAction'

function Menu() {
  return (
    <>
      <section className="editorial-grid bg-on-surface px-4 py-10 text-on-image md:px-margin-desktop md:py-16">
        <div className="mx-auto grid max-w-[1280px] items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div className="relative z-10">
            <span className="mb-5 inline-flex border-2 border-on-image bg-secondary-container px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-on-surface shadow-[3px_3px_0_#ae0011]">Cardápio Turquia</span>
            <h1 className="display-balance max-w-[11ch] font-display-xl-mobile text-[46px] font-extrabold leading-[0.92] tracking-[-0.05em] text-on-image md:text-[68px]">
              Veja o que está previsto.<span className="block text-secondary-container">Sem promessa vazia.</span>
            </h1>
            <p className="mt-6 max-w-xl border-l-4 border-primary pl-4 text-base leading-relaxed text-on-image/75 md:text-lg">
              A estrutura do futuro cardápio está aqui. Produtos, preços e pedidos continuam indisponíveis até confirmação oficial.
            </p>
            <a
              href="#categorias"
              className="mt-7 inline-flex min-h-12 items-center justify-center border-2 border-on-image bg-primary px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-on-primary shadow-[4px_4px_0_#fdc008] transition-transform hover:-translate-y-1"
            >
              Ver categorias previstas
            </a>
            <ChannelAction
              channel={BUSINESS_INFO.channels.ifood}
              icon={ShoppingBag}
              unavailableClassName="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-image/55"
            >
              iFood não disponível / em construção
            </ChannelAction>
          </div>
          <figure className="relative overflow-hidden border-2 border-on-image bg-background p-2 shadow-[8px_8px_0_#fdc008] md:rotate-1">
            <picture>
              <source srcSet={imgMenuHero} type="image/webp" />
              <img
                src={imgMenuHeroFallback}
                alt="Hambúrguer com batatas em cenário ilustrativo"
                width="512"
                height="279"
                className="aspect-[4/3] h-auto w-full object-cover"
                fetchpriority="high"
              />
            </picture>
            <figcaption className="absolute bottom-4 right-4 bg-secondary-container px-3 py-2 text-[9px] font-extrabold uppercase tracking-wide text-on-surface">Imagem ilustrativa</figcaption>
          </figure>
        </div>
      </section>

      <MenuCatalog />

      <section className="bg-background px-4 py-10 md:px-margin-desktop md:py-14">
        <UnavailableNotice
          className="mx-auto max-w-[1280px] border-2 border-on-surface bg-surface shadow-[4px_4px_0_#251913]"
          title="Produtos e preços não disponíveis"
          description="Esta área será atualizada quando o cardápio oficial for aprovado."
        />
      </section>
    </>
  )
}

export default Menu
