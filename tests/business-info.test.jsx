import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Menu from '../src/pages/Menu'
import Location from '../src/pages/Location'
import ChannelAction from '../src/components/ui/ChannelAction'
import { BUSINESS_INFO, BUSINESS_STATUS } from '../src/data/contact'

describe('dados comerciais', () => {
  it('não expõe URLs genéricas ou quebradas para canais indisponíveis', () => {
    expect(BUSINESS_INFO.channels.ifood).toMatchObject({ status: BUSINESS_STATUS.UNAVAILABLE, url: null })
    expect(BUSINESS_INFO.channels.whatsapp).toMatchObject({ status: BUSINESS_STATUS.UNAVAILABLE, url: null })
  })

  it('renderiza canal indisponível sem criar link', () => {
    render(<ChannelAction channel={BUSINESS_INFO.channels.ifood}>iFood em construção</ChannelAction>)
    expect(screen.getByText('iFood em construção')).not.toHaveAttribute('href')
  })

  it('mostra o cardápio como construção sem preço fictício', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { level: 1, name: /veja o que está previsto.*sem promessa vazia/i })).toBeInTheDocument()
    const categories = screen.getByRole('list', { name: 'Categorias previstas' })
    expect(categories).toBeInTheDocument()
    expect(categories).toHaveTextContent(/não disponível \/ em construção/i)
    expect(within(categories).getAllByRole('listitem')).toHaveLength(5)
    expect(screen.queryByText(/R\$ --,--/)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /iFood/i })).not.toBeInTheDocument()
  })

  it('mantém a localização útil sem preencher dados não confirmados', () => {
    render(
      <MemoryRouter>
        <Location />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /como chegar/i })).toHaveAttribute('href', BUSINESS_INFO.channels.maps.url)
    expect(screen.getByRole('link', { name: /abrir a ficha turquia lanches/i })).toHaveAttribute('href', BUSINESS_INFO.channels.maps.url)
    expect(screen.getByText('Parque Nanci, Maricá/RJ')).toBeInTheDocument()
    expect(screen.getByText('Ainda não confirmados')).toBeInTheDocument()
    expect(screen.getByText('Ilustração · não é um mapa')).toBeInTheDocument()
    expect(screen.queryByText(/destino (confirmado|verificado)|rota exata/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/CEP|estacionamento|acessibilidade/i)).not.toBeInTheDocument()
  })
})
