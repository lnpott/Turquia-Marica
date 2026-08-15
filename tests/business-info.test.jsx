import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LocationSection from '../src/components/home/LocationSection'
import MenuSection from '../src/components/menu/MenuSection'
import ReviewsSection from '../src/components/reviews/ReviewsSection'
import ChannelAction from '../src/components/ui/ChannelAction'
import { BUSINESS_INFO, BUSINESS_STATUS } from '../src/data/contact'
import { products } from '../src/data/menu'
import { reviews } from '../src/data/reviews'

const demoProduct = {
  id: 'fixture-product',
  categoryId: 'lanches',
  name: 'Produto demonstrativo de teste',
  description: 'Fixture isolada, nunca publicada como conteúdo comercial.',
  price: 'R$ 00,00',
  image: '/fixture.webp',
  imageAlt: 'Imagem demonstrativa de teste',
  imageStatus: 'illustrative',
  isPlaceholder: true,
}

describe('dados comerciais e demonstrativos', () => {
  it('não expõe URLs genéricas ou quebradas para canais indisponíveis', () => {
    expect(BUSINESS_INFO.channels.ifood).toMatchObject({ status: BUSINESS_STATUS.UNAVAILABLE, url: null })
    expect(BUSINESS_INFO.channels.whatsapp).toMatchObject({ status: BUSINESS_STATUS.UNAVAILABLE, url: null })
  })

  it('renderiza canal indisponível sem criar link', () => {
    render(<ChannelAction channel={BUSINESS_INFO.channels.ifood}>iFood em construção</ChannelAction>)
    expect(screen.getByText('iFood em construção')).not.toHaveAttribute('href')
  })

  it('mantém o cardápio público vazio e honesto', () => {
    expect(products).toEqual([])
    render(<MenuSection />)
    expect(screen.getByRole('heading', { level: 2, name: /produto é o protagonista/i })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/produtos em confirmação/i)
    expect(screen.queryByRole('group', { name: 'Filtrar por categoria' })).not.toBeInTheDocument()
    expect(screen.queryByText(/R\$/)).not.toBeInTheDocument()
  })

  it('valida o layout preenchido apenas com fixture injetada', () => {
    render(<MenuSection items={[demoProduct]} />)
    expect(screen.getByRole('group', { name: 'Filtrar por categoria' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: demoProduct.name })).toBeInTheDocument()
    expect(screen.getByText(demoProduct.price)).toBeInTheDocument()
    expect(screen.getByText('Pedido em breve')).not.toHaveAttribute('href')
  })

  it('integra localização sem duplicar o CTA de rota', () => {
    render(<LocationSection />)
    const mapLink = screen.getByRole('link', { name: /abrir rota no google maps/i })
    expect(mapLink).toHaveAttribute('href', BUSINESS_INFO.channels.maps.url)
    expect(screen.getAllByText(BUSINESS_INFO.location.value)).toHaveLength(1)
    expect(screen.getAllByText(BUSINESS_INFO.hours.note)).toHaveLength(1)
    expect(screen.getByText('Ilustração · não é um mapa')).toBeInTheDocument()
  })

  it('expõe reviews somente como placeholders visíveis', () => {
    expect(reviews.every((review) => review.isPlaceholder && review.sourceUrl === null)).toBe(true)
    render(<ReviewsSection />)
    const list = screen.getByRole('list', { name: 'Avaliações fictícias de demonstração' })
    expect(within(list).getAllByText('Demonstração')).toHaveLength(reviews.length)
    expect(screen.getByText(/todas as avaliações abaixo são fictícias/i)).toBeInTheDocument()
    expect(within(list).queryByRole('link')).not.toBeInTheDocument()
  })
})
