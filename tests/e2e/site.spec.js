import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const canonical = 'https://turquia-marica.vercel.app/'

async function expectNoBlockingAxe(page) {
  const results = await new AxeBuilder({ page }).analyze()
  const blocking = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact))
  expect(blocking).toEqual([])
}

test('Home única carrega com metadados, seções e acessibilidade', async ({ page }) => {
  const consoleErrors = []
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
  const response = await page.goto('/', { waitUntil: 'networkidle' })
  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle(/Turquia Lanches \| Lanches/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical)
  for (const id of ['cardapio', 'sobre', 'localizacao', 'reviews']) await expect(page.locator(`#${id}`)).toHaveCount(1)
  await expect(page.locator('a[href="#"]')).toHaveCount(0)
  await expect(page.locator('a[href="https://www.ifood.com.br/"]')).toHaveCount(0)
  await expectNoBlockingAxe(page)
  expect(consoleErrors).toEqual([])
})

test('Hero híbrido preserva CTAs e reproduz somente o vídeo ativo', async ({ page }) => {
  await page.goto('/')
  const hero = page.getByRole('region', { name: 'Experiências na Turquia Lanches' })
  await expect(hero.locator('[data-slide-type="video"]')).toHaveCount(2)
  await expect(hero.locator('[data-slide-type="image"]')).toHaveCount(3)
  await expect(hero.getByRole('link', { name: 'Ver cardápio' })).toHaveAttribute('href', '/cardapio')
  await expect(hero.getByRole('link', { name: 'Como chegar' })).toHaveAttribute('href', '#localizacao')

  const videos = hero.locator('video')
  await expect(videos.first()).toHaveJSProperty('muted', true)
  await expect(videos.first()).toHaveAttribute('playsinline', '')
  await expect(videos.first()).not.toHaveAttribute('controls')
  await expect.poll(async () => videos.first().evaluate((video) => !video.paused)).toBe(true)
  expect(await videos.evaluateAll((items) => items.filter((video) => !video.paused).length)).toBe(1)

  const indicators = hero.getByRole('button', { name: /mostrar cena/i })
  await expect(indicators).toHaveCount(5)
  for (const indicator of await indicators.all()) {
    const box = await indicator.boundingBox()
    expect(box?.width).toBeGreaterThanOrEqual(44)
    expect(box?.height).toBeGreaterThanOrEqual(44)
  }
  await indicators.nth(3).click()
  await expect(hero).toHaveAttribute('data-active-slide', '3')

  await page.locator('#cardapio').scrollIntoViewIfNeeded()
  await expect.poll(async () => videos.evaluateAll((items) => items.every((video) => video.paused))).toBe(true)
})

test('rotas legadas usam fallback SPA e preservam a âncora', async ({ page }) => {
  for (const [path, hash] of [['/cardapio', '#cardapio'], ['/localizacao', '#localizacao']]) {
    const response = await page.goto(path, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(new RegExp(`/${hash}$`))
    await expect(page.locator(hash)).toBeFocused()
  }
})

test('navegação por âncora mantém a Home montada e atualiza o estado ativo', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  const hero = page.locator('.hero-carousel')
  const heroHandle = await hero.elementHandle()
  const navigation = page.getByRole('navigation', { name: 'Navegação principal' })

  await navigation.getByRole('link', { name: 'Cardápio' }).click()
  await expect(page).toHaveURL(/\/#cardapio$/)
  expect(await heroHandle?.evaluate((node) => node.isConnected)).toBe(true)
  await expect(navigation.getByRole('link', { name: 'Cardápio' })).toHaveAttribute('aria-current', 'location')

  await navigation.getByRole('link', { name: 'Localização' }).click()
  await expect(page).toHaveURL(/\/#localizacao$/)
  await expect(navigation.getByRole('link', { name: 'Localização' })).toHaveAttribute('aria-current', 'location')
})

test('rolagem manual destaca a seção com maior área visível', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: 'Navegação principal' })
  for (const [id, label] of [['sobre', 'Sobre nós'], ['reviews', 'Reviews']]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded()
    await expect(navigation.getByRole('link', { name: label })).toHaveAttribute('aria-current', 'location')
  }
})

test('header mobile mantém os canais de contato visíveis e acessíveis', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    const channels = page.getByRole('navigation', { name: 'Canais de contato' })
    const links = [
      channels.getByRole('link', { name: 'Pedir no iFood' }),
      channels.getByRole('link', { name: 'Iniciar conversa no WhatsApp da Turquia Lanches' }),
      channels.getByRole('link', { name: 'Instagram da Turquia Lanches — @turquialanches' }),
    ]

    await expect(channels).toBeVisible()
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveCount(0)
    await expect(page.getByRole('navigation', { name: 'Menu mobile' })).toHaveCount(0)
    for (const link of links) {
      await expect(link).toBeVisible()
      const box = await link.boundingBox()
      expect(box.width).toBeGreaterThanOrEqual(44)
      expect(box.height).toBeGreaterThanOrEqual(44)
    }
  }
})

test('BottomNavBar navega por âncoras e acompanha a seção', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: 'Navegação inferior' })
  await navigation.getByRole('link', { name: 'Localização' }).click()
  await expect(page).toHaveURL(/\/#localizacao$/)
  await expect(navigation.getByRole('link', { name: 'Localização' })).toHaveAttribute('aria-current', 'location')
})

test('cardápio público exibe os produtos publicados, com filtro e sem dados fictícios', async ({ page }) => {
  await page.goto('/#cardapio')
  const section = page.locator('#cardapio')
  // Estado atual (Etapa 29): nove produtos publicados com preço e filtro por categoria.
  await expect(section.getByRole('group', { name: 'Filtrar por categoria' })).toHaveCount(1)
  await expect(section.locator('article')).toHaveCount(9)
  await expect(section.getByText('R$ 29,90').first()).toBeVisible()
  // Nenhum dado demonstrativo nem pedido fictício.
  await expect(section.getByText('R$ 00,00')).toHaveCount(0)
  await expect(section.getByText(/em construção|em confirmação/i)).toHaveCount(0)
  await expect(section.locator('a[href*="ifood"]')).toHaveCount(0)
})

test('Localização aparece uma vez, com mapa vetorial, CTA único e dados oficiais', async ({ page }) => {
  await page.goto('/#localizacao')
  const section = page.locator('#localizacao')
  await expect(section).toHaveCount(1)
  await expect(section.locator('a[href="https://www.google.com/maps/search/?api=1&query=R.+Canarinhos%2C+663+-+Parque+Nanci%2C+Maric%C3%A1+-+RJ%2C+24914-160"]')).toHaveCount(1)
  await expect(section.getByText('R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160')).toHaveCount(1)
  await expect(section.getByText('Terça a domingo · 17h às 00h')).toHaveCount(1)
  await expect(section.getByText('Segunda · Fechado')).toHaveCount(1)
  await expect(section.getByText('Nosso endereço')).toHaveCount(1)
  await expect(section.getByText('Siga-nos no Instagram')).toHaveCount(1)
  await expect(section.getByText('Não disponível / em construção')).toHaveCount(0)
  await expect(section.locator('iframe')).toHaveCount(0)
  const map = section.getByRole('img', { name: /mapa da região do parque nanci.+retorno km 25 da rj-106/i })
  await expect(map).toBeVisible()
  await map.scrollIntoViewIfNeeded()
  await expect(section.getByText('Retorno KM 25')).toBeVisible({ timeout: 15_000 })
  const returnMarker = section.locator('.maplibregl-marker.map-return-marker[data-map-role="return"]')
  await expect(returnMarker).toHaveCount(1)
  const returnArrow = returnMarker.locator('svg[data-map-role="return-anchor"]')
  await expect(returnArrow).toBeVisible()
  const [arrowBox, labelBox] = await Promise.all([returnArrow.boundingBox(), returnMarker.getByText('Retorno KM 25').boundingBox()])
  expect(arrowBox).not.toBeNull()
  expect(labelBox).not.toBeNull()
  expect(arrowBox.y + arrowBox.height).toBeLessThan(labelBox.y)
  const [mapBox, markerBox] = await Promise.all([map.boundingBox(), returnMarker.boundingBox()])
  expect(mapBox).not.toBeNull()
  expect(markerBox).not.toBeNull()
  expect(markerBox.x).toBeGreaterThanOrEqual(mapBox.x)
  expect(markerBox.y).toBeGreaterThanOrEqual(mapBox.y)
  expect(markerBox.x + markerBox.width).toBeLessThanOrEqual(mapBox.x + mapBox.width)
  expect(markerBox.y + markerBox.height).toBeLessThanOrEqual(mapBox.y + mapBox.height)
  await expect(section.getByText(/CEP|estacionamento|acessibilidade|rota exata/i)).toHaveCount(0)
})

test('Reviews exibem dados reais da API quando disponíveis', async ({ page }) => {
  await page.route('**/api/reviews', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        place: { totalRatings: 42, name: 'Turquia Lanches' },
        reviews: [
          { id: 'g1', source: 'google', authorName: 'Cliente Real', rating: 5, text: 'Ótima experiência!', dateLabel: 'há uma semana', sourceUrl: 'https://maps.google.com/' },
        ],
      }),
    })
  )
  await page.goto('/#reviews')
  const list = page.locator('#reviews').getByRole('list', { name: 'Avaliações reais no Google' })
  await expect(list).toBeVisible()
  await expect(list.getByRole('article')).toHaveCount(1)
  await expect(list.getByText('Cliente R.')).toBeVisible()
  await expect(list.getByText(/ótima experiência/i)).toBeVisible()
})

test('Reviews usam fallback real, sem marcas fictícias, quando a API falha', async ({ page }) => {
  await page.route('**/api/reviews', (route) =>
    route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'REVIEWS_NOT_CONFIGURED' }) })
  )
  await page.goto('/#reviews')
  const section = page.locator('#reviews')
  const list = section.getByRole('list', { name: 'Avaliações reais no Google' })
  await expect(list).toBeVisible()
  await expect(list.getByRole('article')).toHaveCount(3)
  await expect(list.getByText('Ana G.')).toBeVisible()
  await expect(list.getByText('Andre L.')).toBeVisible()
  await expect(list.getByText('Fernanda L.')).toBeVisible()
  // Nenhuma marca fictícia remanescente nem links de fonte indevidos.
  await expect(section.getByText(/fictícias|demonstração/i)).toHaveCount(0)
  await expect(list.getByRole('link')).toHaveCount(0)
  await expect(page.locator('[itemprop="review"], [itemtype*="schema.org/Review"]')).toHaveCount(0)
})

test('descoberta publica somente a Home canônica', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  const sitemap = await request.get('/sitemap.xml')
  const xml = await sitemap.text()
  expect(xml.match(/<loc>/g)).toHaveLength(1)
  expect(xml).toContain(`<loc>${canonical}</loc>`)
  expect(xml).not.toContain('cardapio')
  expect(xml).not.toContain('localizacao')
})

test('build público não disponibiliza a rota visual de QA', async ({ page }) => {
  await page.goto('/__visual-qa')
  await expect(page.getByRole('heading', { name: 'Turquia Lanches' })).toBeVisible()
  await expect(page.getByText('A página que você procurou não existe.')).toBeVisible()
  await expect(page.getByText(/Dados fictícios — QA visual isolado/i)).toHaveCount(0)
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0)
})

test('imagem social mantém formato Open Graph', async ({ request, page }) => {
  const response = await request.get('/og-image.png')
  const image = await response.body()
  expect(response.status()).toBe(200)
  expect(image.readUInt32BE(16)).toBe(1200)
  expect(image.readUInt32BE(20)).toBe(630)
  await page.goto('/')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${canonical}og-image.png`)
})

test('reduced motion desativa animações e mantém conteúdo visível', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.page-transition')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.hero-carousel')).toHaveAttribute('data-motion', 'reduced')
  await expect(page.locator('.hero-carousel')).toHaveAttribute('data-active-slide', '0')
  await expect(page.locator('.reveal').first()).toHaveCSS('transition-duration', '0s')
  await expect(page.locator('#reviews')).toBeVisible()
})

test('vídeos da casa reagem à mudança dinâmica de reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const about = page.locator('#sobre')
  await about.scrollIntoViewIfNeeded()
  const videos = about.locator('video')
  await expect(videos).toHaveCount(2)
  await expect.poll(async () => videos.evaluateAll((items) => items.some((video) => !video.paused))).toBe(true)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(async () => videos.evaluateAll((items) => items.every((video) => video.paused))).toBe(true)
})

test('scroll reveal e motion ambiente funcionam sem biblioteca', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero-carousel')).toHaveAttribute('data-motion', 'full')
  await expect(page.locator('.hero-carousel__slide--active .hero-carousel__media').first()).not.toHaveCSS('animation-name', 'none')
  const reveal = page.locator('#reviews .reveal').first()
  await reveal.scrollIntoViewIfNeeded()
  await expect(reveal).toHaveClass(/reveal-visible/)
})

test('CTA da Localização não é coberto pela navegação inferior', async ({ page }) => {
  for (const viewport of [{ width: 375, height: 667 }, { width: 390, height: 740 }, { width: 414, height: 844 }]) {
    await page.setViewportSize(viewport)
    await page.goto('/#localizacao')
    const action = await page.getByRole('link', { name: /abrir rota no google maps/i }).boundingBox()
    const navigation = await page.getByRole('navigation', { name: 'Navegação inferior' }).boundingBox()
    expect(action).not.toBeNull()
    expect(navigation).not.toBeNull()
    const overlaps = action.y < navigation.y + navigation.height && action.y + action.height > navigation.y
    expect(overlaps, `${viewport.width}x${viewport.height}`).toBe(false)
  }
})

test('não há overflow horizontal nos viewports de aceite', async ({ page }) => {
  for (const width of [320, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }))
    expect(dimensions.content, `${width}px`).toBeLessThanOrEqual(dimensions.viewport)
  }
})

test('header sem overflow de texto nos viewports de aceite', async ({ page }) => {
  for (const width of [375, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const overflows = await page.evaluate(() => {
      const header = document.querySelector('header.sticky')
      if (!header) return { error: 'header não encontrado' }
      return [...header.querySelectorAll('a,button')]
        .filter((el) => el.getBoundingClientRect().width > 0)
        .filter((el) => el.scrollWidth > el.clientWidth + 1)
        .map((el) => ({ label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30), client: el.clientWidth, scroll: el.scrollWidth }))
    })
    expect(overflows, `overflow no header em ${width}px`).toEqual([])
  }
})
