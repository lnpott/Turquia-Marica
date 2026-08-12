import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Menu from '../src/pages/Menu'
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
    expect(screen.getByRole('heading', { level: 1, name: /cardápio em construção/i })).toBeInTheDocument()
    expect(screen.queryByText(/R\$ --,--/)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /iFood/i })).not.toBeInTheDocument()
  })
})
