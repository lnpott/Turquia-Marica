import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'

const demoFlagActive = process.env.VITE_VISUAL_QA_DEMO === 'true'
const isProduction = process.env.VERCEL_ENV === 'production'
const leakIsExpected = demoFlagActive && !isProduction

// `fileURLToPath` (em vez de `URL.pathname`) evita o prefixo de drive duplicado
// (`C:\C:\...`) ao executar o script em máquinas Windows.
const root = fileURLToPath(new URL('../dist/', import.meta.url))
const sentinels = ['visual-qa-demo', 'menu.demo', 'demo-lanche-curto', 'DADOS FICTÍCIOS — QA VISUAL', 'isMock', 'shortDescription', 'longDescription', 'imageUrl']
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.map'])
const leaks = []

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await scan(path)
    else if (textExtensions.has(extname(entry.name))) {
      const content = await readFile(path, 'utf8')
      const demoSentinels = sentinels.filter((sentinel) => content.includes(sentinel))
      for (const sentinel of demoSentinels) leaks.push(`${relative(root, path)}: ${sentinel}`)
      // `isPlaceholder` também pertence aos Reviews públicos da Etapa 27; só é
      // vazamento da Etapa 28 quando aparece no mesmo artefato que uma sentinela demo.
      if (demoSentinels.length && content.includes('isPlaceholder')) {
        leaks.push(`${relative(root.pathname, path)}: isPlaceholder (contexto demo)`)
      }
    }
  }
}

await scan(root)
if (leaks.length) {
  if (leakIsExpected) {
    process.stdout.write(`Demo visual incluída intencionalmente neste ambiente com a flag ativa:\n${leaks.join('\n')}\n`)
    process.exit(0)
  }
  process.stderr.write(`Build público contém artefatos do modo visual de QA:\n${leaks.join('\n')}\n`)
  process.exit(1)
}
process.stdout.write('Build público auditado: nenhum artefato da Etapa 28 encontrado.\n')
