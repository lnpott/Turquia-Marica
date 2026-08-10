const AMBIENCE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAjG-GFqXqQ9Q0kWexmiN6naXR6z3rSm5B0hUaGx5mLhSMWgRnZspdzwJzj_2YAf11HYAkFNQk8pjfHbKDJftwXh5oVNrXpvl8VUOmg0EefNbuM4v-1vZKb3ccXmokyXxerfr4qXPZd-Q5r7HUFpxtTbpmaJjaAvAYX3OY6K1vxHvLvypOFvHFnZEKMZGrV8aL8hgP-6b42OfuXCw9el8c4dgKvvbMHRMacvez3KJBNa3lmCOk24grNaV2aV_0IgptC-oY'

function AmbienceSection() {
  return (
    <section className="w-full py-16 bg-surface px-4 lg:px-20">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-stack-loose">
        <div className="w-full md:w-1/2">
          <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-primary mb-stack-tight">
            Nosso Espaço
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-loose">
            Venha conhecer um ambiente aconchegante, ideal para reunir os amigos, assistir ao jogo
            do seu time e aproveitar momentos inesquecíveis. Nossa casa é a sua casa, com aquele
            clima que só a Turquia Lanches tem.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            alt="Nosso Espaço"
            className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            src={AMBIENCE_IMAGE}
          />
        </div>
      </div>
    </section>
  )
}

export default AmbienceSection
