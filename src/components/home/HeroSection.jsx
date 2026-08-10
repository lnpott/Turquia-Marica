import Button from '../ui/Button'

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB23gN_xQ8eX1145_71mR01R65Qn7zBw3E8R9Nl4q5y1u1O7mJ7O5J57D2_95mD_P7U8f2Z3Kj5E5gYxO9w1vN6t8K9A6F_z4a4eZ4M0y0v9m2h9w6M7Qz_B2I1w9vX1X4S0v3fH0tQ1l4t_g_P0e2A8L3Q1G9F8c_U3B9d_C8J3d7V_t3E7P0b1A7L2H1G3F5J2B4Z5J8K7P0v_J6K3U4I_C3g2I9P4X_P9Q2A3'

function HeroSection() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden py-12 md:py-0 md:h-[819px]">
      <div className="absolute inset-0 w-full h-full bg-surface-container hidden md:block">
        <div
          className="bg-cover bg-center w-full h-full opacity-70 mix-blend-multiply"
          role="img"
          aria-label="Hero Image"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent hidden md:block"></div>
      <div className="relative z-10 w-full px-4 lg:px-20 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20 bg-background/50 backdrop-blur-sm p-8 rounded-2xl md:bg-transparent md:backdrop-blur-none md:p-0 overflow-hidden">
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl text-on-background mb-stack-tight drop-shadow-md">
            Fome de Leão?
            <br /> <span className="text-primary">Lanche Especial.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-loose max-w-lg font-medium bg-background/30 px-2 rounded">
            Sabor raiz, ingredientes frescos e aquele exagero que a gente ama. O melhor lanche da
            cidade te espera.
          </p>
          <div className="flex flex-col sm:flex-row gap-gutter w-full sm:w-auto">
            <Button
              to="/cardapio"
              size="lg"
              className="w-full sm:w-auto rounded-xl ambient-shadow"
            >
              <span className="material-symbols-outlined" data-weight="fill" aria-hidden="true">
                shopping_cart
              </span>
              PEÇA AGORA
            </Button>
            <Button
              to="/cardapio"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-surface-container-low text-primary rounded-xl"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                restaurant_menu
              </span>
              VER CARDÁPIO
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:hidden block">
          <img
            alt="Burger"
            className="w-full h-auto object-cover rounded-xl shadow-lg"
            src={HERO_IMAGE}
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
