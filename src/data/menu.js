// Dados do Cardápio — extraídos de turquia_lanches_card_pio_production/code.html
// Preços demonstrativos (R$ --,--), conforme os HTMLs de produção.
// `priceValue` (número, demonstrativo) é usado apenas para o cálculo local de
// personalização na tela de Produto (Lote 5); `price` continua sendo o texto exibido.
//
// LOTE 14 — Assets localizados: todas as imagens migradas de
// lh3.googleusercontent.com/aida-public para src/assets/images (assets próprios),
// preservando exatamente as fotografias aprovadas dos HTMLs de produção.
// Obs.: várias URLs originais apontavam para a MESMA fotografia (duplicatas reais
// de conteúdo, confirmadas por MD5) — por isso um mesmo asset é reutilizado
// (ex.: combos == combo-master; lanches == turquia-master == clássico).

// Opcionais (ponto da carne) e adicionais/remoções — valores demonstrativos,
// inspirados na experiência de lanchonete. A ser validado com o cliente.

import imgCategoryCombos from '../assets/images/menu/category-combos.jpg'
import imgCategoryLanches from '../assets/images/menu/category-lanches.jpg'
import imgCategoryPorcoes from '../assets/images/home/highlight-sweet.jpg'
import imgCategoryBebidas from '../assets/images/menu/category-bebidas.jpg'
import imgCategorySobremesas from '../assets/images/menu/category-sobremesas.jpg'
import imgComboClassico from '../assets/images/menu/product-combo-classico.jpg'
import imgComboGalera from '../assets/images/menu/product-combo-galera.jpg'
import imgFuturoTurquia from '../assets/images/menu/product-futuro-turquia.jpg'

export const meatPoints = [
  { id: 'mal-passado', label: 'Mal passado' },
  { id: 'ao-ponto', label: 'Ao ponto' },
  { id: 'bem-passado', label: 'Bem passado' },
]

export const addons = [
  { id: 'cheddar', label: 'Cheddar Extra', price: 4.5 },
  { id: 'bacon', label: 'Bacon Extra', price: 5 },
  { id: 'ovo', label: 'Ovo', price: 3 },
  { id: 'onion-rings', label: 'Onion Rings', price: 6 },
  { id: 'batata-extra', label: 'Batata Extra', price: 7 },
]

export const removals = [
  { id: 'cebola', label: 'Cebola' },
  { id: 'tomate', label: 'Tomate' },
  { id: 'alface', label: 'Alface' },
  { id: 'picles', label: 'Picles' },
  { id: 'maionese', label: 'Maionese' },
]

export const categories = [
  {
    id: 'combos',
    name: 'Combos',
    image: imgCategoryCombos,
  },
  {
    id: 'lanches',
    name: 'Lanches',
    image: imgCategoryLanches,
  },
  {
    id: 'porcoes',
    name: 'Porções',
    image: imgCategoryPorcoes,
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    image: imgCategoryBebidas,
  },
  {
    id: 'sobremesas',
    name: 'Sobremesas',
    image: imgCategorySobremesas,
  },
]

export const products = [
  {
    id: 'combo-master',
    name: 'Combo Master',
    category: 'combos',
    badge: 'Economize',
    oldPrice: 'R$ 62,90',
    price: 'R$ --,--',
    priceValue: 49.9,
    includes: ['1x Turquia Master', '1x Fritas M Crocante', '1x Refrigerante 350ml'],
    allowedAddons: ['cheddar', 'bacon', 'batata-extra'],
    allowedRemovals: ['cebola', 'picles'],
    image: imgCategoryCombos,
  },
  {
    id: 'combo-classico',
    name: 'Combo Clássico',
    category: 'combos',
    badge: 'Economize',
    oldPrice: 'R$ 49,90',
    price: 'R$ --,--',
    priceValue: 39.9,
    includes: ['1x Clássico Turquia', '1x Fritas M Crocante', '1x Refrigerante 350ml'],
    allowedAddons: ['cheddar', 'bacon', 'batata-extra'],
    allowedRemovals: ['cebola', 'picles'],
    image: imgComboClassico,
  },
  {
    id: 'combo-galera',
    name: 'Combo Galera',
    category: 'combos',
    badge: 'Economize',
    oldPrice: 'R$ 89,90',
    price: 'R$ --,--',
    priceValue: 69.9,
    includes: ['2x Clássico Turquia', '1x Porção Batata G', '1x Refrigerante 600ml'],
    allowedAddons: ['cheddar', 'bacon', 'batata-extra'],
    allowedRemovals: ['cebola', 'picles'],
    image: imgComboGalera,
  },
  {
    id: 'turquia-master',
    name: 'Turquia Master',
    category: 'lanches',
    badge: 'Mais Pedido',
    price: 'R$ --,--',
    priceValue: 32.9,
    description:
      'Hambúrguer artesanal preparado com ingredientes selecionados e o toque especial da casa.',
    hasMeatPoint: true,
    allowedAddons: ['cheddar', 'bacon', 'ovo', 'onion-rings'],
    allowedRemovals: ['cebola', 'tomate', 'alface', 'picles', 'maionese'],
    image: imgCategoryLanches,
  },
  {
    id: 'frango-crocante',
    name: 'Frango Crocante',
    category: 'lanches',
    badge: 'Novo',
    price: 'R$ --,--',
    priceValue: 28.9,
    description:
      'Opção crocante e saborosa, acompanhada de vegetais frescos e molho artesanal.',
    hasMeatPoint: true,
    allowedAddons: ['cheddar', 'bacon', 'ovo', 'onion-rings'],
    allowedRemovals: ['cebola', 'tomate', 'alface', 'picles', 'maionese'],
    image: imgComboGalera,
  },
  {
    id: 'classico-turquia',
    name: 'Clássico Turquia',
    category: 'lanches',
    price: 'R$ --,--',
    priceValue: 24.9,
    description: 'O clássico da casa com carne suculenta, queijo derretido e salada fresca.',
    hasMeatPoint: true,
    allowedAddons: ['cheddar', 'bacon', 'ovo', 'onion-rings'],
    allowedRemovals: ['cebola', 'tomate', 'alface', 'picles', 'maionese'],
    image: imgCategoryLanches,
  },
  {
    id: 'futuro-turquia',
    name: 'Futuro Turquia',
    category: 'lanches',
    badge: 'Veggie',
    price: 'R$ --,--',
    priceValue: 29.9,
    description:
      'Deliciosa opção vegetariana com blend artesanal e acompanhamentos exclusivos.',
    allowedAddons: ['cheddar', 'bacon', 'ovo', 'onion-rings'],
    allowedRemovals: ['cebola', 'tomate', 'alface', 'picles', 'maionese'],
    image: imgFuturoTurquia,
  },
]
