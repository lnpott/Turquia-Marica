import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import process from 'node:process'
import { URL } from 'node:url'

const root = new URL('../dist/', import.meta.url)
const sentinels = ['__visual-qa', 'menu.demo', 'demo-lanche-curto', 'DADOS FICTÍCIOS — QA VISUAL', 'isMock']
const textExtensions = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.map'])
const leaks = []

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await scan(path)
    else if (textExtensions.has(extname(entry.name))) {
      const content = await readFile(path, 'utf8')
      for (const sentinel of sentinels) {
        if (content.includes(sentinel)) leaks.push(`${relative(root.pathname, path)}: ${sentinel}`)
      }
    }
  }
}

await scan(root.pathname)
if (leaks.length) {
  process.stderr.write(`Build público contém artefatos do modo visual de QA:\n${leaks.join('\n')}\n`)
  process.exit(1)
}
process.stdout.write('Build público auditado: nenhum artefato da Etapa 28 encontrado.\n')
