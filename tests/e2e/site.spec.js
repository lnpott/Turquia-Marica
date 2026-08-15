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
  const hero = page.locator('.hero-ambient')
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

test('menu mobile fecha por âncora e por Escape com foco restaurado', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Abrir menu' })
  await toggle.click()
  const mobile = page.getByRole('navigation', { name: 'Menu mobile' })
  await mobile.getByRole('link', { name: 'Reviews' }).click()
  await expect(mobile).toBeHidden()
  await expect(page).toHaveURL(/\/#reviews$/)
  await toggle.click()
  await page.keyboard.press('Escape')
  await expect(mobile).toBeHidden()
  await expect(toggle).toBeFocused()
})

test('BottomNavBar navega por âncoras e acompanha a seção', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: 'Navegação inferior' })
  await navigation.getByRole('link', { name: 'Localização' }).click()
  await expect(page).toHaveURL(/\/#localizacao$/)
  await expect(navigation.getByRole('link', { name: 'Localização' })).toHaveAttribute('aria-current', 'location')
})

test('cardápio público mantém estado vazio único e sem comércio fictício', async ({ page }) => {
  await page.goto('/#cardapio')
  const section = page.locator('#cardapio')
  await expect(section.getByRole('status')).toHaveCount(1)
  await expect(section.getByRole('group', { name: 'Filtrar por categoria' })).toHaveCount(0)
  await expect(section.getByText(/R\$/)).toHaveCount(0)
  await expect(section.locator('a[href*="ifood"]')).toHaveCount(0)
})

test('Localização aparece uma vez, com um único CTA de rota e dados honestos', async ({ page }) => {
  await page.goto('/#localizacao')
  const section = page.locator('#localizacao')
  await expect(section).toHaveCount(1)
  await expect(section.locator('a[href="https://maps.app.goo.gl/QHAQCBvrACZZK5Ho9"]')).toHaveCount(1)
  await expect(section.getByText('Parque Nanci, Maricá/RJ')).toHaveCount(1)
  await expect(section.getByText('Não disponível / em construção')).toHaveCount(1)
  await expect(section.getByText('Ilustração · não é um mapa')).toBeVisible()
  await expect(section.getByText(/CEP|estacionamento|acessibilidade|rota exata/i)).toHaveCount(0)
})

test('Reviews são inequivocamente fictícios e não possuem links de fonte', async ({ page }) => {
  await page.goto('/#reviews')
  const section = page.locator('#reviews')
  await expect(section.getByText(/todas as avaliações abaixo são fictícias/i)).toBeVisible()
  const list = section.getByRole('list', { name: 'Avaliações fictícias de demonstração' })
  await expect(list.getByText('Demonstração', { exact: true })).toHaveCount(3)
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
  await expect(page.locator('.hero-ambient')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.reveal').first()).toHaveCSS('transition-duration', '0s')
  await expect(page.locator('#reviews')).toBeVisible()
})

test('scroll reveal e motion ambiente funcionam sem biblioteca', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero-ambient')).not.toHaveCSS('animation-name', 'none')
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
