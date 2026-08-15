import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', title: /Turquia Lanches \| Lanches/, canonical: 'https://turquia-marica.vercel.app/' },
  { path: '/cardapio/', title: /Cardápio em construção/, canonical: 'https://turquia-marica.vercel.app/cardapio/' },
  { path: '/localizacao/', title: /Localização \| Turquia Lanches/, canonical: 'https://turquia-marica.vercel.app/localizacao/' },
]

for (const route of routes) {
  test(`${route.path} carrega diretamente com metadados e acessibilidade`, async ({ page }) => {
    const consoleErrors = []
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    const response = await page.goto(route.path, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(route.title)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/)
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('a[href="#"]')).toHaveCount(0)
    await expect(page.locator('a[href="https://www.ifood.com.br/"]')).toHaveCount(0)

    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact))
    expect(blocking).toEqual([])
    expect(consoleErrors).toEqual([])
  })
}

test('menu mobile abre, fecha com Escape e devolve o foco', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Abrir menu' })
  await toggle.click()
  await expect(page.getByRole('navigation', { name: 'Menu mobile' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Menu mobile' })).toBeHidden()
  await expect(toggle).toBeFocused()
})

test('arquivos de descoberta são publicados e referenciam somente rotas válidas', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain('Sitemap: https://turquia-marica.vercel.app/sitemap.xml')

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  for (const route of routes) expect(xml).toContain(`<loc>${route.canonical}</loc>`)
})

test('imagem social publicada mantém o formato Open Graph', async ({ request, page }) => {
  const response = await request.get('/og-image.png')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toBe('image/png')
  const image = await response.body()
  expect(image.readUInt32BE(16)).toBe(1200)
  expect(image.readUInt32BE(20)).toBe(630)

  await page.goto('/')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://turquia-marica.vercel.app/og-image.png')
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', 'https://turquia-marica.vercel.app/og-image.png')
})

test('reduced motion desativa as animações principais', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.page-transition')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.cta-fill-primary').first()).toHaveCSS('transition-duration', '0s')
  const underlineDuration = await page.locator('.nav-link').first().evaluate((link) => getComputedStyle(link, '::after').transitionDuration)
  expect(underlineDuration, 'sublinhado não deve animar com movimento reduzido').toBe('0s')
  await expect(page.locator('.hero-ambient')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.reveal').first()).toHaveCSS('transition-duration', '0s')
})

test('scroll reveal entra ao rolar e o Hero mantém movimento ambiente', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.hero-ambient')).not.toHaveCSS('animation-name', 'none')
  const section = page.locator('#cardapio .reveal').first()
  await section.scrollIntoViewIfNeeded()
  await expect(section).toHaveClass(/reveal-visible/)
})

test('navegação destaca a rota atual no desktop e no menu mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/cardapio/')
  const desktopNavigation = page.getByRole('navigation', { name: 'Navegação principal' })
  await expect(desktopNavigation.getByRole('link', { name: 'Cardápio' })).toHaveClass(/nav-link-active/)
  await expect(desktopNavigation.getByRole('link', { name: 'Localização' })).not.toHaveClass(/nav-link-active/)

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  const mobileNavigation = page.getByRole('navigation', { name: 'Menu mobile' })
  await expect(mobileNavigation.getByRole('link', { name: 'Cardápio' })).toHaveClass(/nav-link-active/)

  await page.goto('/')
  const aboutLink = page.locator('nav[aria-label="Navegação principal"] a', { hasText: 'Sobre nós' })
  await expect(aboutLink).not.toHaveClass(/nav-link-active/)
  await page.goto('/#sobre')
  await expect(aboutLink).toHaveClass(/nav-link-active/)
})

test('CTAs e imagens usam os tokens compartilhados de motion', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Ver cardápio' })).toHaveCSS('transition-duration', '0.16s')
  const categoryImage = page.locator('#cardapio img').first()
  await expect(categoryImage).toHaveCSS('transition-duration', '0.42s')
  await categoryImage.locator('..').hover()
  await expect(categoryImage).not.toHaveCSS('transform', 'none')
})

test('cardápio apresenta categorias previstas sem filtros ou pedidos falsos', async ({ page }) => {
  await page.goto('/cardapio/')
  await expect(page.getByRole('group', { name: 'Filtrar por categoria' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Ver categorias previstas' })).toHaveAttribute('href', '#categorias')
  await expect(page.getByRole('list', { name: 'Categorias previstas' }).getByRole('listitem')).toHaveCount(5)

  await expect(page.locator('a[href*="ifood"]')).toHaveCount(0)
  await expect(page.getByRole('list', { name: 'Categorias previstas' }).getByText('Conteúdo em confirmação')).toHaveCount(5)
  await expect(page.locator('#categorias img')).toHaveCount(4)
  await expect(page.getByText('Imagem pendente de acervo')).toHaveCount(1)
})

test('hashes legados das categorias mantêm acesso direto e foco', async ({ page }) => {
  for (const category of ['combos', 'lanches', 'porcoes', 'bebidas', 'sobremesas']) {
    await page.goto('about:blank')
    const response = await page.goto(`/cardapio/#categoria-${category}`, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page.locator(`#categoria-${category}`)).toBeFocused()
    expect(new URL(page.url()).hash).toBe(`#categoria-${category}`)
    const reload = await page.reload({ waitUntil: 'networkidle' })
    expect(reload?.status()).toBe(200)
    await expect(page.locator(`#categoria-${category}`)).toBeFocused()
  }
})

test('localização oferece ficha externa sem exagerar a precisão dos dados', async ({ page }) => {
  await page.goto('/localizacao/')
  const mapLinks = page.locator('a[href="https://maps.app.goo.gl/QHAQCBvrACZZK5Ho9"]')
  await expect(mapLinks).toHaveCount(3)
  for (const link of await mapLinks.all()) {
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
    await expect(link).toHaveAttribute('rel', /noreferrer/)
  }

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Turquia Lanches')
  await expect(page.getByRole('link', { name: /abrir a ficha turquia lanches/i })).toBeVisible()
  await expect(page.getByText('Ilustração · não é um mapa')).toBeVisible()
  await expect(page.getByText('Parque Nanci, Maricá/RJ')).toBeVisible()
  await expect(page.getByText('Ainda não confirmados')).toBeVisible()
  await expect(page.getByText('Telefone também pendente')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Abrir Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/turquialanches/')
  await expect(page.getByText(/destino (confirmado|verificado)|rota exata/i)).toHaveCount(0)
  await expect(page.getByText(/CEP|estacionamento|acessibilidade|retirada|entrega/i)).toHaveCount(0)
})

test('ação visual da localização não fica coberta pela navegação inferior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/localizacao/')
  const actionBox = await page.getByText('Conferir ficha').locator('..').boundingBox()
  const navigationBox = await page.getByRole('navigation', { name: 'Navegação inferior' }).boundingBox()

  expect(actionBox).not.toBeNull()
  expect(navigationBox).not.toBeNull()
  const overlapsNavigation = actionBox.y < navigationBox.y + navigationBox.height
    && actionBox.y + actionBox.height > navigationBox.y
  expect(overlapsNavigation).toBe(false)
})

test('heróis e ação de localização respeitam a navegação inferior móvel', async ({ page }) => {
  for (const { width, height } of [
    { width: 375, height: 667 },
    { width: 390, height: 740 },
    { width: 414, height: 844 },
  ]) {
    await page.setViewportSize({ width, height })

    await page.goto('/cardapio/')
    const heroImage = await page.locator('main figure').first().boundingBox()
    const menuNavigation = await page.getByRole('navigation', { name: 'Navegação inferior' }).boundingBox()
    expect(heroImage).not.toBeNull()
    expect(menuNavigation).not.toBeNull()
    const heroOverlapsNavigation = heroImage.y < menuNavigation.y + menuNavigation.height
      && heroImage.y + heroImage.height > menuNavigation.y
    expect(heroOverlapsNavigation, `Hero do Cardápio em ${width}x${height}px`).toBe(false)

    await page.goto('/localizacao/')
    const mapAction = await page.getByText('Conferir ficha').locator('..').boundingBox()
    const locationNavigation = await page.getByRole('navigation', { name: 'Navegação inferior' }).boundingBox()
    expect(mapAction).not.toBeNull()
    expect(locationNavigation).not.toBeNull()
    const actionOverlapsNavigation = mapAction.y < locationNavigation.y + locationNavigation.height
      && mapAction.y + mapAction.height > locationNavigation.y
    expect(actionOverlapsNavigation, `Ação da Localização em ${width}x${height}px`).toBe(false)
  }
})

test('não há overflow horizontal nos viewports de aceite', async ({ page }) => {
  for (const width of [320, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(route.path)
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }))
      expect(dimensions.content, `${route.path} em ${width}px`).toBeLessThanOrEqual(dimensions.viewport)
    }
  }
})
