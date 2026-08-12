import imgCombos from '../assets/images/menu/category-combos.webp'
import imgCombosFallback from '../assets/images/menu/category-combos.jpg'
import imgLanches from '../assets/images/menu/menu-hero.webp'
import imgLanchesFallback from '../assets/images/menu/menu-hero.jpg'
import imgPorcoes from '../assets/images/hero/hero-fries.webp'
import imgPorcoesFallback from '../assets/images/hero/hero-fries.jpg'
import imgBebidas from '../assets/images/hero/hero-gallery.webp'
import imgBebidasFallback from '../assets/images/hero/hero-gallery.jpg'
import imgSobremesas from '../assets/images/menu/category-sobremesas.webp'
import imgSobremesasFallback from '../assets/images/menu/category-sobremesas.jpg'

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
    image: imgBebidas,
    fallbackImage: imgBebidasFallback,
    imageAlt: 'Pessoas brindando com copos de cerveja em imagem ilustrativa',
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

// Produtos só entram nesta coleção depois de nome, composição, preço e foto
// serem aprovados. Assim, filtros e badges nunca prometem conteúdo fictício.
export const products = []

export const menuHighlights = categories.slice(0, 4)
