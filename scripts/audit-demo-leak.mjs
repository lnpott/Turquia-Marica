import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL, URL } from 'node:url'

export const DEFAULT_SENTINELS = ['visual-qa-demo', 'menu.demo', 'demo-lanche-curto', 'DADOS FICTÍCIOS — QA VISUAL', 'isMock', 'shortDescription', 'longDescription', 'imageUrl']
export const TEXT_EXTENSIONS = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.map'])

// Varre `directory` (caminho absoluto ou relativo, sempre STRING) e retorna a
// lista de vazamentos encontrados. `isPlaceholder` também pertence aos Reviews
// públicos legítimos; só é vazamento da demo quando aparece no mesmo artefato
// que uma sentinela demo. `relative()` recebe apenas paths válidos — o bug
// `relative(root.pathname, path)` (root já era string ⇒ root.pathname ===
// undefined) derrubava o build da Vercel com ERR_INVALID_ARG_TYPE.
export async function findLeaks(directory, { sentinels = DEFAULT_SENTINELS } = {}) {
  const leaks = []

  async function scan(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) await scan(path)
      else if (TEXT_EXTENSIONS.has(extname(entry.name))) {
        const content = await readFile(path, 'utf8')
        const demoSentinels = sentinels.filter((sentinel) => content.includes(sentinel))
        for (const sentinel of demoSentinels) leaks.push(`${relative(directory, path)}: ${sentinel}`)
        if (demoSentinels.length && content.includes('isPlaceholder')) {
          leaks.push(`${relative(directory, path)}: isPlaceholder (contexto demo)`)
        }
      }
    }
  }

  await scan(directory)
  return leaks
}

// Decide o desfecho do CLI. Retorna o exit code (0 = ok / demo esperada;
// 1 = vazamento no build público). `env`, `stdout` e `stderr` são injetáveis
// para teste sem processo filho.
export async function main(rootDir, { env = process.env, stdout = process.stdout, stderr = process.stderr } = {}) {
  const demoFlagActive = env.VITE_VISUAL_QA_DEMO === 'true'
  const isProduction = env.VERCEL_ENV === 'production'
  const leakIsExpected = demoFlagActive && !isProduction

  const leaks = await findLeaks(rootDir)
  if (leaks.length) {
    if (leakIsExpected) {
      stdout.write(`Demo visual incluída intencionalmente neste ambiente com a flag ativa:\n${leaks.join('\n')}\n`)
      return 0
    }
    stderr.write(`Build público contém artefatos do modo visual de QA:\n${leaks.join('\n')}\n`)
    return 1
  }
  stdout.write('Build público auditado: nenhum artefato da Etapa 28 encontrado.\n')
  return 0
}

// CLI: executa apenas quando o script é chamado diretamente.
// `fileURLToPath` (em vez de URL.pathname) evita o prefixo de drive duplicado
// (`C:\C:\...`) ao executar o script em máquinas Windows.
const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isCli) {
  const root = fileURLToPath(new URL('../dist/', import.meta.url))
  process.exitCode = await main(root)
}
