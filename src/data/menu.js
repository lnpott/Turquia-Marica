// Dados do Cardápio — extraídos de turquia_lanches_card_pio_production/code.html
// Preços demonstrativos (R$ --,--), conforme os HTMLs de produção.
// `priceValue` (número, demonstrativo) é usado apenas para o cálculo local de
// personalização na tela de Produto (Lote 5); `price` continua sendo o texto exibido.

// Opcionais (ponto da carne) e adicionais/remoções — valores demonstrativos,
// inspirados na experiência de lanchonete. A ser validado com o cliente no Lote 10.

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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBZT1arX5fC74emf-K1TWo_l67JNowod6DIfVbSrt_o-wV6pJWUl1uE1UW4ZlXfalevtoNEb63Epcqn1NxqUnlcUfw-9atdXKrSm0rvzXUSm8cg-3sqVzPVx3FWwF_DAMatxl8qW9V3us6SXAlm7wx9uO_YE6KC4_PVGOsCGs1p1YL2y5absMkynxFRkE_okLihAsJCUQb26mmp2Shzu2cJAdmypWcnvHJG9eI-3VLaYuWkye8MSQPpw',
  },
  {
    id: 'lanches',
    name: 'Lanches',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzTdZc9WRJtdXXtzQ_EXiJ3cR1T-26aJO0EHrZUi_TNU2G1rO3RWoY6-RcffZnmB3jNcIombAQ3EfOTbOV-kkF9oTmFqKUWQtnsUIW83dA9AH7YhVYKtfpyv4S0zY0rHuy1yWryexIPCtiL7hXOXSPC1RT7rl-e2thrqL7FenpjbOwJ0MHE4UV1cplA4EEi3K4QVi4RaFaWiwUsDgB-thcjhNCEHSw1SrcgUNL0Ql8rbicSH34O5tLCDvx3U9YZJ72U4w',
  },
  {
    id: 'porcoes',
    name: 'Porções',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7vgCNXw84YNT3dw5iOhLOEXKPkXg8L2hjh_o5vX53SS7lSk-Y4QYZttJf8CDofdfPb1U31mZSNskQkuIQQFAU0sKio7b1mKgTLdsmOsz2wE9Rw6305rSBo4J_TKyvTO5i_N34c7WGjiFp4CAihhLbdF7TtG5ebWhg1ZwVOby8DPLri950H89yh5L5YrovmG_bEKg6HOIrTzYvRmv0MK6YCS89WUuD5jKvBZJOaL9AXx-PR2NbTssaDovLUTVTYVZEi_8',
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOEbva4uEWr1fZ6mzYfJNS3pVwm82JZqjh0jqkRBWNihGOHU3iF3P5qjSH8Q5DwXsYKZJTyFY5BL-K5Ffd7H6GWp5gtwd4sPPWDhyEoT20RgVr11_WDKkVYGJolA9e7jfh_zYj93jqIbzTsxV_FcRFS6L4N2Lc9W5wT60wMsUhL4c2eTndR7DLnb0Wccp3kVAixSYHpsNdfccaMI8EU6lcs7N9mNjhdjvwz1unvSkRNzFoGVTI-qFSkg',
  },
  {
    id: 'sobremesas',
    name: 'Sobremesas',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyIzSFjXP0HNGSqNmK6HTMNH_6Rd6qhM5avifitOC2gp0cttDAqXAjzEtdAz8TabvEHCWHW49qR8h0GnPIlzq5hIhThbUpwtGCy4ytTosala8fMUZ2qr67SH6XDX_8Bp7ezjwnrDEIIApW00wr6zQsMQFlpXQy0Na_woc7M751GbwW2g-r-lJLIKn5c1fZBzKbniJ_VD6_UYoY1rftM2wyRbAKREy2YZNKhenuN3fdtVQozap8tTVje5I3uJ9CewKqCGM',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBZT1arX5fC74emf-K1TWo_l67JNowod6DIfVbSrt_o-wV6pJWUl1uE1UW4ZlXfalevtoNEb63Epcqn1NxqUnlcUfw-9atdXKrSm0rvzXUSm8cg-3sqVzPVx3FWwF_DAMatxl8qW9V3us6SXAlm7wx9uO_YE6KC4_PVGOsCGs1p1YL2y5absMkynxFRkE_okLihAsJCUQb26mmp2Shzu2cJAdmypWcnvHJG9eI-3VLaYuWkye8MSQPpw',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGJ6K_MX6-kkG0IJlVBxy3R0es7ybG9MABmXj8b6E5XTHTDMeekVepjynoKW_nW2WEhrFWE52ODsLlCMAwJr0G-RO0sXJFbRTB3LISRM10d0wpBkkDbcTj0iQHSr5uxk6Y4heeTJgRq25EWL_gAJ790p8N9O2pEXKmRSjjPhvq3bGvtYAnb9c0mKxoKo97ldfnzw0UJJA-4TZBojh_-FQp8m0Z7Y8r9PyakSNQI4z5cumS8cu2JmxRgg',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfdIRvDJlb1nTxDA3M0awkFzsjGE8T-st14e21HZONIK75cHr8aU5FitIQywuBZ7zZO0BuBUXF2elsWfFKif4WLptNDehJJk0yOlZs09Kvnu3c89WuFEyIROPlIahoE3T1xtoH5Unj21b7f9N9SOlYn3w-kZzpJukUbBklWND467cS_X6pC7Av2Awhtg6uF_MWc9mrHmLCJz4a_f0KCzDeGR0Dx9PDE1adL2MtIOjFiCFS3V21NzKGqw',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTq-DWg6CD52uTbzhcwycM9XGBz9DRE_jZ8fdPnW6pdkl9Qe04BPd1y0Ww7Tg1yWHsVHwPIXhLWbps_8JmWY0nA9PzGe13yuvSHeb0ADe8q2BqF73Q2BHel83ifEmhFlweX4Ib3a1hV8pueVTwd1VB_Cn7tf-6ElpagUNWOSlgHhy2x2YrruFh00wbtdvDG6wvqA-SHdfKi0NvjVS8OVhLaB6cjLEPkIOHzJlz7Cv1FVMGCy33rdB3FXcMpZPn98BjUuw',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfdIRvDJlb1nTxDA3M0awkFzsjGE8T-st14e21HZONIK75cHr8aU5FitIQywuBZ7zZO0BuBUXF2elsWfFKif4WLptNDehJJk0yOlZs09Kvnu3c89WuFEyIROPlIahoE3T1xtoH5Unj21b7f9N9SOlYn3w-kZzpJukUbBklWND467cS_X6pC7Av2Awhtg6uF_MWc9mrHmLCJz4a_f0KCzDeGR0Dx9PDE1adL2MtIOjFiCFS3V21NzKGqw',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgE7a_AMe904ogC-FpadXVh67dR08g2qi8o4Txs1T8KO9iHz5sYvt9TXDbFMglDbGHl-vwuWLv4VVEdxofBcLiQxjMqrHHkBpy9Xe1weLteIZ7F1QC6N6cfvf4ZV-LzL-7WQ65WBLmUCx4D8zNf4SACuVVI7No8SNG-ARO6RjWizggc9TtMg6UyilovU_ImhtIBwz4HLd4L_e4IVduDZ1Eiy3ffg93ZnwDQffzjQeutCI_Icx9JXTPnBX9NYK7t3wZ87w',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8hFmjTvtA_pLvcY8CKcvxHRdHAkYVM-19RonYJRcpWj967mAQQUGY0J75abYwW_Ed45zBdi_hge4yxABgcjp4mRfDyX3baVpGvySdWRXY7H2Tc8VvP2GnH8gN61LpV0X8IkGps9y-9Bl0qJYUnW7iCO4E2Kx1j3x836c5Vlz2N5jM8tn7e7qrCBVRgnp5pfHIoYRqGhxYXVtytlIpbvbw6mcG7EYnGhmCJJApDHg9zz4gb9ZDfWLX4g',
  },
]
