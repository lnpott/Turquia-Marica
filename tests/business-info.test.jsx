import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import HeroSection from '../src/components/home/HeroSection'
import LocationSection from '../src/components/home/LocationSection'
import MenuSection from '../src/components/menu/MenuSection'
import ReviewsSection from '../src/components/reviews/ReviewsSection'
import ChannelAction from '../src/components/ui/ChannelAction'
import { BUSINESS_INFO, BUSINESS_STATUS } from '../src/data/contact'
import { products } from '../src/data/menu'

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

  it('exibe os nove produtos no cardápio público', () => {
    expect(products).toHaveLength(9)
    render(<MenuSection />)
    expect(screen.getByRole('heading', { level: 2, name: /produto é o protagonista/i })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Filtrar por categoria' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(9)
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
    expect(screen.getByText('Prévia de localização')).toBeInTheDocument()
    expect(screen.getByText(/fotos de referência do local em breve/i)).toBeInTheDocument()
  })

  it('faz o botão Como chegar rolar até a localização', () => {
    const location = document.createElement('section')
    location.id = 'localizacao'
    location.scrollIntoView = vi.fn()
    document.body.appendChild(location)
    render(<MemoryRouter><HeroSection /></MemoryRouter>)

    fireEvent.click(screen.getByRole('link', { name: /como chegar/i }))
    expect(location.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    location.remove()
  })

  it('renderiza avaliações reais retornadas pela API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        place: { totalRatings: 42 },
        reviews: [{
          id: 'google-1',
          source: 'google',
          authorName: 'Cliente real',
          rating: 5,
          text: 'Ótima experiência.',
          dateLabel: 'há uma semana',
          sourceUrl: 'https://maps.google.com/',
        }],
      }),
    }))

    render(<ReviewsSection />)
    const list = await screen.findByRole('list', { name: 'Avaliações reais no Google' })
    expect(within(list).getByText('Cliente real')).toBeInTheDocument()
    expect(within(list).getByText(/ótima experiência/i)).toBeInTheDocument()
    expect(within(list).queryByText('Demonstração')).not.toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('degrada avaliações indisponíveis sem conteúdo fictício', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    render(<ReviewsSection />)
    await waitFor(() => expect(screen.getByText(/avaliações do google temporariamente indisponíveis/i)).toBeInTheDocument())
    expect(screen.queryByText(/cliente demonstrativo/i)).not.toBeInTheDocument()
    vi.unstubAllGlobals()
  })
})
