import imgCombos from '../assets/images/menu/category-combos.webp'
import imgCombosFallback from '../assets/images/menu/category-combos.jpg'
import imgLanches from '../assets/images/menu/menu-hero.webp'
import imgLanchesFallback from '../assets/images/menu/menu-hero.jpg'
import imgPorcoes from '../assets/images/hero/hero-fries.webp'
import imgPorcoesFallback from '../assets/images/hero/hero-fries.jpg'
import imgSobremesas from '../assets/images/menu/category-sobremesas.webp'
import imgSobremesasFallback from '../assets/images/menu/category-sobremesas.jpg'
import imgBaca from '../assets/images/products/Baca.jpg'
import imgPassa from '../assets/images/products/PASSA.jpg'
import imgPizza from '../assets/images/products/PIZZA.jpg'
import imgX from '../assets/images/products/X.jpg'
import imgTabua from '../assets/images/products/tabua.jpg'
import imgTabucama from '../assets/images/products/TABUCAMA.jpg'
import imgBatata from '../assets/images/products/BATATA.jpg'
import imgCebola from '../assets/images/products/cebola.jpg'
import imgPidoce from '../assets/images/products/PIDOCE.jpg'

// O acervo atual é provisório. Nenhuma imagem abaixo representa um produto
// específico ou uma fotografia oficial da casa.
export const categories = [
  {
    id: 'combos',
    name: 'Combos',
    status: 'construction',
    image: imgCombos,
    fallbackImage: imgCombosFallback,
    imageAlt: 'Composição ilustrativa de lanche e acompanhamento',
  },
  {
    id: 'lanches',
    name: 'Lanches',
    status: 'construction',
    image: imgLanches,
    fallbackImage: imgLanchesFallback,
    imageAlt: 'Hambúrguer com batatas em cenário ilustrativo',
  },
  {
    id: 'porcoes',
    name: 'Porções',
    status: 'construction',
    image: imgPorcoes,
    fallbackImage: imgPorcoesFallback,
    imageAlt: 'Porção de batatas fritas em imagem ilustrativa',
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    status: 'construction',
    image: null,
    fallbackImage: null,
    imageAlt: null,
  },
  {
    id: 'sobremesas',
    name: 'Sobremesas',
    status: 'construction',
    image: imgSobremesas,
    fallbackImage: imgSobremesasFallback,
    imageAlt: 'Mesa de confeitaria em imagem ilustrativa',
  },
]

export const products = [
  { id: 'baca', categoryId: 'lanches', name: 'Baca Burger', price: 'R$ 29,90', image: imgBaca, imageAlt: 'Baca Burger' },
  { id: 'passa', categoryId: 'lanches', name: 'Passa Burger', price: 'R$ 29,90', image: imgPassa, imageAlt: 'Passa Burger' },
  { id: 'pizza', categoryId: 'lanches', name: 'Pizza Teste', price: 'R$ 29,90', image: imgPizza, imageAlt: 'Pizza' },
  { id: 'x-turquia', categoryId: 'lanches', name: 'X-Turquia', price: 'R$ 29,90', image: imgX, imageAlt: 'X-Turquia' },
  { id: 'tabua', categoryId: 'combos', name: 'Tábua Mista', price: 'R$ 29,90', image: imgTabua, imageAlt: 'Tábua Mista' },
  { id: 'tabucama', categoryId: 'combos', name: 'Tábua Cama', price: 'R$ 29,90', image: imgTabucama, imageAlt: 'Tábua Cama' },
  { id: 'batata', categoryId: 'combos', name: 'Porção de Batata', price: 'R$ 29,90', image: imgBatata, imageAlt: 'Porção de batata' },
  { id: 'cebola', categoryId: 'combos', name: 'Rings de Cebola', price: 'R$ 29,90', image: imgCebola, imageAlt: 'Rings de cebola' },
  { id: 'pidoce', categoryId: 'sobremesas', name: 'Pi Doce', price: 'R$ 29,90', image: imgPidoce, imageAlt: 'Pi Doce' },
]

export const menuHighlights = categories.slice(0, 4)
