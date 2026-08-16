// DADOS FICTÍCIOS — uso exclusivo em QA visual isolado (Etapa 28/29).
// Nunca importar no fluxo público nem tratar como dados comerciais reais.
import imgBaca from '../assets/images/products/Baca.jpg'
import imgBatata from '../assets/images/products/BATATA.jpg'
import imgCebola from '../assets/images/products/cebola.jpg'
import imgPassa from '../assets/images/products/PASSA.jpg'
import imgPidoce from '../assets/images/products/PIDOCE.jpg'
import imgPizza from '../assets/images/products/PIZZA.jpg'
import imgTabua from '../assets/images/products/tabua.jpg'
import imgTabucama from '../assets/images/products/TABUCAMA.jpg'
import imgX from '../assets/images/products/X.jpg'

const mockProduct = (id, categoryId, name, price, img) => ({
  id: `demo-${id}`,
  categoryId,
  name,
  shortDescription: 'Produto fictício para validação visual.',
  longDescription: 'Produto fictício para validação visual. Nenhum dado é real.',
  description: 'Produto fictício para validação visual.',
  price,
  imageUrl: img,
  image: img,
  imageAlt: `Foto fictícia de ${name} para QA visual`,
  imageStatus: 'illustrative',
  isPlaceholder: true,
  isMock: true,
})

export const demoProducts = [
  mockProduct('baca', 'lanches', 'Baca Burger', 'R$ 29,90', imgBaca),
  mockProduct('passa', 'lanches', 'Passa Burger', 'R$ 29,90', imgPassa),
  mockProduct('pizza', 'lanches', 'Pizza Teste', 'R$ 29,90', imgPizza),
  mockProduct('x', 'lanches', 'X-Turquia', 'R$ 29,90', imgX),
  mockProduct('tabua', 'combos', 'Tábua Mista', 'R$ 29,90', imgTabua),
  mockProduct('tabucama', 'combos', 'Tábua Cama', 'R$ 29,90', imgTabucama),
  mockProduct('batata', 'porcoes', 'Porção de Batata', 'R$ 29,90', imgBatata),
  mockProduct('cebola', 'porcoes', 'Rings de Cebola', 'R$ 29,90', imgCebola),
  mockProduct('pidoce', 'sobremesas', 'Pi Doce', 'R$ 29,90', imgPidoce),
]
