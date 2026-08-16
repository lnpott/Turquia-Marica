// DADOS FICTÍCIOS — uso exclusivo em QA visual isolado (Etapa 28/29).
// Nunca importar no fluxo público nem tratar como dados comerciais reais.

const productImages = import.meta.glob(
  '../assets/images/products/*.jpg',
  { eager: false },
)

const resolveImage = (filename) =>
  productImages[`../assets/images/products/${filename}`]?.()
    .then((module) => module.default)

const mockProduct = (id, categoryId, name, price, filename) => ({
  id: `demo-${id}`,
  categoryId,
  name,
  shortDescription: 'Produto fictício para validação visual.',
  longDescription:
    'Produto fictício para validação visual. Nenhum dado é real.',
  description: 'Produto fictício para validação visual.',
  price,
  imageFilename: filename,
  resolveImage: () => resolveImage(filename),
  imageAlt: `Foto fictícia de ${name} para QA visual`,
  imageStatus: 'illustrative',
  isPlaceholder: true,
  isMock: true,
})

export const demoProducts = [
  mockProduct('baca', 'lanches', 'Baca Burger', 'R$ 29,90', 'Baca.jpg'),
  mockProduct('passa', 'lanches', 'Passa Burger', 'R$ 29,90', 'PASSA.jpg'),
  mockProduct('pizza', 'lanches', 'Pizza Teste', 'R$ 29,90', 'PIZZA.jpg'),
  mockProduct('x', 'lanches', 'X-Turquia', 'R$ 29,90', 'X.jpg'),
  mockProduct('tabua', 'combos', 'Tábua Mista', 'R$ 29,90', 'tabua.jpg'),
  mockProduct('tabucama', 'combos', 'Tábua Cama', 'R$ 29,90', 'TABUCAMA.jpg'),
  mockProduct('batata', 'combos', 'Porção de Batata', 'R$ 29,90', 'BATATA.jpg'),
  mockProduct('cebola', 'combos', 'Rings de Cebola', 'R$ 29,90', 'cebola.jpg'),
  mockProduct('pidoce', 'sobremesas', 'Pi Doce', 'R$ 29,90', 'PIDOCE.jpg'),
]
