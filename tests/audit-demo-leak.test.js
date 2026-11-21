// @vitest-environment node
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, sep } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { DEFAULT_SENTINELS, findLeaks, main } from '../scripts/audit-demo-leak.mjs'

const quiet = { write() {} }

let tempDirs = []

async function makeFixture(files) {
  const dir = await mkdtemp(join(tmpdir(), 'audit-leak-'))
  tempDirs.push(dir)
  for (const [relativePath, content] of Object.entries(files)) {
    const fullPath = join(dir, relativePath)
    await mkdir(join(fullPath, '..'), { recursive: true })
    await writeFile(fullPath, content, 'utf8')
  }
  return dir
}

afterEach(async () => {
  await Promise.all(tempDirs.map((dir) => rm(dir, { recursive: true, force: true })))
  tempDirs = []
})

describe('scripts/audit-demo-leak.mjs', () => {
  it('não encontra vazamento quando o build é limpo', async () => {
    const dir = await makeFixture({ 'index.html': '<html>Turquia Lanches</html>' })
    expect(await findLeaks(dir)).toEqual([])
  })

  it('identifica vazamento normal de sentinela demo', async () => {
    const dir = await makeFixture({ 'assets/app.js': 'const x = "visual-qa-demo"' })
    const leaks = await findLeaks(dir)
    expect(leaks).toHaveLength(1)
    expect(leaks[0]).toContain('visual-qa-demo')
  })

  it('identifica isPlaceholder quando co-ocorre com sentinela demo exclusiva', async () => {
    const dir = await makeFixture({
      'assets/demo.js': 'VisualQaDemo, isPlaceholder: true, Produto fictício para validação visual',
    })
    const leaks = await findLeaks(dir)
    expect(leaks.some((leak) => leak.includes('isPlaceholder (contexto demo)'))).toBe(true)
  })

  it('não trata isPlaceholder isolado (Reviews públicos) como vazamento', async () => {
    const dir = await makeFixture({ 'assets/app.js': 'isPlaceholder: false' })
    expect(await findLeaks(dir)).toEqual([])
  })

  it('não marca bundle legítimo de catálogo/reviews como vazamento', async () => {
    const dir = await makeFixture({
      'assets/app.js': [
        'product.isMock&&renderBadge()',
        'isMock:!1',
        'isPlaceholder:!1',
        'shortDescription:e.short_description',
        'longDescription:e.long_description',
        'imageUrl:e.image_url',
      ].join(';'),
    })
    expect(await findLeaks(dir)).toEqual([])
  })

  it('detecta inclusão acidental do módulo de demonstração', async () => {
    const dir = await makeFixture({
      'assets/demo-chunk.js': [
        'import{demoProducts}from"./menu.demo"',
        'export function VisualQaDemo(){return "Produto fictício para validação visual"}',
      ].join('\n'),
    })
    const leaks = await findLeaks(dir)
    expect(leaks.some((leak) => leak.includes('menu.demo'))).toBe(true)
    expect(leaks.some((leak) => leak.includes('VisualQaDemo') || leak.includes('Produto fictício'))).toBe(true)
  })

  it('retorna paths relativos válidos, sem prefixo de drive duplicado (Windows/Linux)', async () => {
    const dir = await makeFixture({
      'assets/sub/pages.js': 'menu.demo sentinela',
    })
    const leaks = await findLeaks(dir)
    expect(leaks).toHaveLength(1)
    const path = leaks[0].split(':')[0]
    expect(path).not.toMatch(new RegExp(`[A-Za-z]:${sep}[A-Za-z]:`))
    expect(path).not.toContain(`${sep}${sep}`)
    expect(path.startsWith('assets')).toBe(true)
  })

  it('main() retorna 0 quando não há vazamento', async () => {
    const dir = await makeFixture({ 'index.html': '<html>ok</html>' })
    expect(await main(dir, { stdout: quiet, stderr: quiet })).toBe(0)
  })

  it('main() retorna 1 quando o build público vaza a demo', async () => {
    const dir = await makeFixture({ 'assets/app.js': 'visual-qa-demo' })
    expect(await main(dir, { stdout: quiet, stderr: quiet })).toBe(1)
  })

  it('main() retorna 0 quando a demo é esperada (flag ativa, fora de produção)', async () => {
    const dir = await makeFixture({ 'assets/app.js': 'visual-qa-demo isPlaceholder' })
    const env = { VITE_VISUAL_QA_DEMO: 'true', VERCEL_ENV: 'preview' }
    expect(await main(dir, { env, stdout: quiet, stderr: quiet })).toBe(0)
  })

  it('main() mantém a demo bloqueada em produção mesmo com a flag ativa', async () => {
    const dir = await makeFixture({ 'assets/app.js': 'visual-qa-demo' })
    const env = { VITE_VISUAL_QA_DEMO: 'true', VERCEL_ENV: 'production' }
    expect(await main(dir, { env, stdout: quiet, stderr: quiet })).toBe(1)
  })

  it('a sentinela padrão usa só identificadores exclusivos da demo', () => {
    expect(DEFAULT_SENTINELS).toEqual(
      expect.arrayContaining(['visual-qa-demo', 'menu.demo', 'VisualQaDemo', 'Produto fictício para validação visual']),
    )
    expect(DEFAULT_SENTINELS).not.toContain('isMock')
    expect(DEFAULT_SENTINELS).not.toContain('shortDescription')
    expect(DEFAULT_SENTINELS).not.toContain('longDescription')
    expect(DEFAULT_SENTINELS).not.toContain('imageUrl')
  })
})
