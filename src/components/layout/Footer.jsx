import { Link } from 'react-router-dom'

const FOOTER_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBhKNWDSy7IWQ-5EfTb3aLKzMV3Ia7MSL43-o62nqsMs69UjQDi6G-NFheSNaiL62F2MrubvDqHUXMGKMQENI_sN7urUQzCh4s432zsgY7IfHr8eX7P16uTx0MEsuXm85kQMj4PDm1pLEIqekPA-M_3oiihqLIL1u-OvzB6LUL9uasAD9LaaZ_q3jAabQQPPqemz4O_UtbMwNSJFKmG3Cc_wd-Fyz9kwgSuNbq4pBe_utK55UVfI2jT7KNVVU6bmefPgjY'

const LINK_CLASSES =
  'font-body-md text-body-md text-on-surface-variant hover:text-primary transition-all duration-300 hover:underline'

const USEFUL_LINKS = [
  { label: 'Termos de Uso', href: '#' },
  { label: 'Privacidade', href: '#' },
]

const INSTITUTIONAL_LINKS = [
  { label: 'Trabalhe Conosco', href: '#' },
  { label: 'Contato', href: '#' },
]

function Footer() {
  return (
    <footer className="w-full py-16 pb-24 md:pb-16 bg-surface-container-highest mt-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-loose px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto items-start">
        <div className="flex flex-col gap-stack-tight">
          <Link to="/" aria-label="Turquia Lanches - Início" className="text-primary">
            <img src={FOOTER_LOGO} alt="Turquia Lanches Logo" className="h-10 w-auto object-cover" />
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant">
            © 2024 Turquia Lanches. O sabor da tradição em cada mordida.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-bold text-on-surface">Links Úteis</h4>
          <nav className="flex flex-col gap-2" aria-label="Links úteis">
            {USEFUL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={LINK_CLASSES}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-bold text-on-surface">Institucional</h4>
          <nav className="flex flex-col gap-2" aria-label="Institucional">
            {INSTITUTIONAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={LINK_CLASSES}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-body-md text-body-md text-on-surface-variant opacity-70">
            * Itens e preços demonstrativos.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
