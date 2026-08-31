import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import HeroSection from '../src/components/home/HeroSection'
import LocationSection from '../src/components/home/LocationSection'
import MenuSection from '../src/components/menu/MenuSection'
import ReviewsSection from '../src/components/reviews/ReviewsSection'
import MapEmbed from '../src/components/location/MapEmbed'
import ChannelAction from '../src/components/ui/ChannelAction'
import Header from '../src/components/layout/Header'
import Footer from '../src/components/layout/Footer'
import Home from '../src/pages/Home'
import { BUSINESS_INFO, BUSINESS_STATUS, IFOOD_URL } from '../src/data/contact'
import { products } from '../src/data/menu'
import mapStyle from '../src/assets/map/liberty.json'

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
  it('mantém o ciclo completo do hero e reinicia o timer após seleção manual', () => {
    vi.useFakeTimers()
    try {
      const { container } = render(<MemoryRouter><HeroSection /></MemoryRouter>)
      const hero = container.querySelector('.hero-carousel')
      expect(hero).toHaveAttribute('data-active-slide', '0')

      fireEvent.click(screen.getByRole('button', { name: /mostrar cena 4/i }))
      expect(hero).toHaveAttribute('data-active-slide', '3')

      act(() => vi.advanceTimersByTime(4999))
      expect(hero).toHaveAttribute('data-active-slide', '3')
      act(() => vi.advanceTimersByTime(1))
      expect(hero).toHaveAttribute('data-active-slide', '4')
      act(() => vi.advanceTimersByTime(5000))
      expect(hero).toHaveAttribute('data-active-slide', '0')
    } finally {
      vi.useRealTimers()
    }
  })

  it('mantém retorno, contorno e label do parque no vermelho da marca', () => {
    const layer = (id) => mapStyle.layers.find((item) => item.id === id)
    const parkFeatures = mapStyle.sources['parque-nanci-area'].data.features

    expect(layer('road-trunk-return').paint['line-color']).toBe('#ae0011')
    expect(layer('park-nanci-contour').paint).toMatchObject({
      'line-color': '#ae0011',
      'line-width': 1,
    })
    expect(layer('poi-park-nanci').paint['text-color']).toBe('#ae0011')
    expect(layer('poi-park-nanci').layout).toMatchObject({
      'text-offset': [0, 1.3],
      'text-size': 17,
    })
    expect(parkFeatures).toHaveLength(1)
    expect(parkFeatures[0].geometry.coordinates[0]).toHaveLength(14)
  })

  it('publica iFood oficial e WhatsApp oficial com URL', () => {
    expect(BUSINESS_INFO.channels.ifood).toMatchObject({
      status: BUSINESS_STATUS.AVAILABLE,
      url: 'https://www.ifood.com.br/delivery/marica-rj/turquia-lanches-parque-nanci',
    })
    expect(BUSINESS_INFO.channels.whatsapp).toMatchObject({
      status: BUSINESS_STATUS.AVAILABLE,
      url: 'https://wa.me/5521964699374',
    })
  })

  it('publica horários oficiais (terça a domingo; segunda fechado)', () => {
    expect(BUSINESS_INFO.hours).toMatchObject({
      status: BUSINESS_STATUS.AVAILABLE,
      value: 'Terça a domingo · 17h às 00h',
      closed: 'Segunda · Fechado',
    })
  })

  it('renderiza canal disponível (WhatsApp) criando link correto', () => {
    render(<ChannelAction channel={BUSINESS_INFO.channels.whatsapp}>WhatsApp</ChannelAction>)
    const link = screen.getByRole('link', { name: 'WhatsApp' })
    expect(link).toHaveAttribute('href', 'https://wa.me/5521964699374')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
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
    expect(screen.getByText('Pedido via iFood')).toBeInTheDocument()
  })

  it('integra localização com endereço, horários e CTA único de rota', () => {
    render(<LocationSection />)
    const mapLink = screen.getByRole('link', { name: /abrir rota no google maps/i })
    expect(mapLink).toHaveAttribute('href', BUSINESS_INFO.channels.maps.url)
    expect(screen.getAllByText(BUSINESS_INFO.location.value)).toHaveLength(1)
    expect(screen.getAllByText(BUSINESS_INFO.hours.value)).toHaveLength(1)
    expect(screen.getAllByText(BUSINESS_INFO.hours.closed)).toHaveLength(1)
    expect(screen.getByText('Nosso endereço')).toBeInTheDocument()
    expect(screen.getByText('Siga-nos no Instagram')).toBeInTheDocument()
    expect(screen.getByText(/estamos no parque nanci, em maricá/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /mapa da região do parque nanci.+retorno km 25 da rj-106/i })).toBeInTheDocument()
    expect(screen.queryByText(/fotos de referência do local em breve/i)).not.toBeInTheDocument()
    expect(screen.queryByText('Região informada')).not.toBeInTheDocument()
    expect(screen.queryByText('Canal disponível')).not.toBeInTheDocument()
  })

  it('o mapa vetorial não usa iframe e mantém o CTA de rota', () => {
    render(<MapEmbed />)
    // O CTA está sempre presente, em qualquer estado do mapa
    const link = screen.getByRole('link', { name: /abrir rota no google maps/i })
    expect(link).toHaveAttribute('href', BUSINESS_INFO.channels.maps.url)
    // Arquitetura nova: container acessível (role=img) em vez de iframe
    expect(screen.getByRole('img', { name: /mapa da região do parque nanci.+retorno km 25 da rj-106/i })).toBeInTheDocument()
    // O callout visual só aparece depois do evento load do MapLibre.
    expect(screen.queryByText('Retorno KM 25')).not.toBeInTheDocument()
    expect(document.querySelector('iframe')).toBeNull()
    expect(document.querySelector('a[href*="openstreetmap.org/export/embed"]')).toBeNull()
  })

  it('Header expõe iFood real, WhatsApp e Instagram, sem "Pedidos em breve"', () => {
    render(<MemoryRouter><Header /></MemoryRouter>)
    for (const ifoodLink of screen.getAllByRole('link', { name: 'Pedir no iFood' })) {
      expect(ifoodLink).toHaveAttribute('href', IFOOD_URL)
      expect(ifoodLink).toHaveAttribute('target', '_blank')
    }
    for (const whatsappLink of screen.getAllByRole('link', { name: /whatsapp da turquia lanches/i })) {
      expect(whatsappLink).toHaveAttribute('href', BUSINESS_INFO.channels.whatsapp.url)
    }
    for (const instagramLink of screen.getAllByRole('link', { name: /instagram da turquia lanches/i })) {
      expect(instagramLink).toHaveAttribute('href', BUSINESS_INFO.channels.instagram.url)
    }
    expect(screen.queryByText('Pedidos em breve')).not.toBeInTheDocument()
  })

  it('Header mobile alinha canais à direita na ordem Instagram, WhatsApp e iFood', () => {
    render(<MemoryRouter><Header /></MemoryRouter>)
    const channels = screen.getByRole('navigation', { name: 'Canais de contato' })
    const links = within(channels).getAllByRole('link')
    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'Instagram da Turquia Lanches — @turquialanches',
      'Iniciar conversa no WhatsApp da Turquia Lanches',
      'Pedir no iFood',
    ])
    expect(channels).toHaveClass('ml-auto')
    expect(channels).toHaveClass('md:hidden')
  })

  it('liga os fatos rápidos da Home a iFood, Instagram e horário confirmado', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    const facts = screen.getByRole('region', { name: 'Informações rápidas' })
    const ifood = within(facts).getByRole('link', { name: 'Pedir no iFood' })
    const instagram = within(facts).getByRole('link', { name: 'Instagram da Turquia Lanches — @turquialanches' })
    const hours = within(facts).getByRole('link', { name: 'Ver horário e localização' })

    expect(ifood).toHaveAttribute('href', IFOOD_URL)
    expect(ifood).toHaveAttribute('target', '_blank')
    expect(within(ifood).getByText('iFood')).toHaveClass('text-[#EA1D2C]')
    expect(instagram).toHaveAttribute('href', BUSINESS_INFO.channels.instagram.url)
    expect(within(instagram).getByText('@turquialanches')).toBeInTheDocument()
    expect(hours).toHaveAttribute('href', '#localizacao')
    expect(within(hours).getByText(BUSINESS_INFO.hours.value)).toBeInTheDocument()
    expect(within(facts).queryByText('Só publicamos dados confirmados')).not.toBeInTheDocument()
    expect(within(facts).queryByText('Disponíveis pelo iFood')).not.toBeInTheDocument()
  })

  it('Footer lista Maps, Instagram, iFood e WhatsApp, sem "iFood em construção"', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /como chegar|abrir rota/i })).toHaveAttribute('href', BUSINESS_INFO.channels.maps.url)
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', BUSINESS_INFO.channels.instagram.url)
    expect(screen.getByRole('link', { name: 'Pedir no iFood' })).toHaveAttribute('href', IFOOD_URL)
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', BUSINESS_INFO.channels.whatsapp.url)
    expect(screen.queryByText('iFood em construção')).not.toBeInTheDocument()
  })

  it('configura o Hero híbrido com vídeos silenciosos, fotografias e CTAs estáveis', () => {
    render(<MemoryRouter><HeroSection /></MemoryRouter>)
    const hero = screen.getByRole('region', { name: /experiências na turquia lanches/i })
    expect(hero).toHaveAttribute('data-active-slide', '0')
    expect(hero.querySelectorAll('[data-slide-type="video"]')).toHaveLength(2)
    expect(hero.querySelectorAll('[data-slide-type="image"]')).toHaveLength(3)
    for (const video of hero.querySelectorAll('video')) {
      expect(video.muted).toBe(true)
      expect(video).toHaveAttribute('playsinline')
      expect(video).not.toHaveAttribute('controls')
      expect(video).toHaveAttribute('poster')
    }
    expect(screen.getByRole('link', { name: /ver cardápio/i })).toHaveAttribute('href', '/cardapio')
    expect(screen.getByRole('link', { name: /como chegar/i })).toHaveAttribute('href', '#localizacao')
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
    expect(within(list).getByText('Cliente R.')).toBeInTheDocument()
    expect(within(list).getByText(/ótima experiência/i)).toBeInTheDocument()
    expect(within(list).queryByText('Demonstração')).not.toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('usa o fallback estático de avaliações reais quando a API falha', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    render(<ReviewsSection />)
    const list = await screen.findByRole('list', { name: 'Avaliações reais no Google' })
    expect(within(list).getAllByRole('article')).toHaveLength(3)
    expect(within(list).getByText('Ana G.')).toBeInTheDocument()
    expect(within(list).getByText('Andre L.')).toBeInTheDocument()
    expect(within(list).getByText('Fernanda L.')).toBeInTheDocument()
    expect(within(list).queryByText(/cliente demonstrativo/i)).not.toBeInTheDocument()
    vi.unstubAllGlobals()
  })
})
