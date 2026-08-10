import Button from '../ui/Button'

function EmptyCartState() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-stack-loose px-margin-mobile py-margin-desktop text-center"
      style={{ minHeight: '60vh' }}
    >
      <span className="material-symbols-outlined text-6xl text-outline" aria-hidden="true">
        shopping_bag
      </span>
      <h1 className="font-headline-lg text-headline-lg text-on-surface">Sua sacola está vazia</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
        Explore nosso cardápio e escolha seus favoritos. O melhor lanche da cidade te espera!
      </p>
      <Button to="/cardapio" size="lg">
        Ver Cardápio
      </Button>
    </section>
  )
}

export default EmptyCartState
