# limpeza.MD — Inventário, plano de limpeza e otimização Vercel

> **Tipo:** plano de higiene do repositório e do deploy. **Não executa exclusão.**
> **Data desta auditoria:** 29/08/2026.
> **Fonte auditada:** branch `main` em [lnpott/Turquia-Marica](https://github.com/lnpott/Turquia-Marica/tree/main), commit `4d576e3f07d27e843b58636f3d1bd2c22735237d`.
> **Escopo:** working tree completo (313 arquivos versionados, ~124 MB sem `.git`). Runtime, testes e governança **não** são apagados neste plano.
> **Regra:** nenhum arquivo abaixo foi removido nesta passagem. Exclusão só após aprovação explícita, commit atômico por fase e `npm run check` verde.

---

## 0. Relação com registros anteriores

**Não existia `limpeza.md` / `limpeza.MD` no repositório.** Esta é a primeira ficha dedicada a lastro de arquivos e ao peso do clone/build na Vercel.

Documentos vizinhos já lidos, para não contradizer trabalho anterior:

| Arquivo | O que o agente anterior registrou | Conotação desta auditoria |
|---|---|---|
| [`version_clean.md`](version_clean.md) | Relatório consultivo de 22/08/2026: lotes visuais/comerciais (cardápio, CTA, SEO, CSP, Lighthouse). Lote 7 pede orçamento de bundle e imagens responsivas, **sem inventário de arquivos a apagar**. | Complementar, não concorrente. A higiene aqui é pré-requisito do Lote 7: o orçamento de assets só fecha depois de tirar lastro. Não atribui estado aos lotes daquele arquivo. |
| [`BEST_PLAN.MD`](BEST_PLAN.MD) (Fase 4 — Higiene) | Já apontou: `hero-gallery.{jpg,webp}` órfão; `documentacao/ASSETS.md` defasado (`location/map.png` removido, `hero-gallery` ainda como “Bebidas”); incluir `.freebuff/` no `.gitignore`. | **Confirmado e ampliado.** `hero-gallery` continua sem import no runtime. `ASSETS.md` ainda lista `hero-gallery` e `map.png`. `.freebuff/` segue versionado. Esta ficha cobre o restante (~116 MB) que aquela fase não quantificou. |
| [`BEST_PLAN.MD`](BEST_PLAN.MD) (mídias do Hero) | “Os arquivos originais serão preservados” (`turquia-video-01.mp4` / `turquia-video-02.mp4`). | Preservar **fora do Git** (Drive/backup). Versionar 50 MB de masters no mesmo repo que a Vercel clona a cada deploy **não** é preservação útil: os clips de ~6 s já estão em `src/assets/media/hero/`. |
| [`documentacao/ASSETS.md`](documentacao/ASSETS.md) | Catálogo de assets “ativos”. | **Desatualizado.** Ainda trata `hero-gallery` como categoria Bebidas e `location/map.png` como ativo. O Hero atual usa `src/assets/media/hero/*` e `src/assets/media/pictures/*`. Atualizar **depois** da limpeza, não antes. |
| [`README.md`](README.md) | Ainda descreve “três entradas HTML estáticas” e rotas `/cardapio/` e `/localizacao/` com HTML próprio. | Fora do escopo de apagar arquivos, mas é lastro documental: o runtime é SPA + redirects/rewrites no `vercel.json`. Corrigir no mesmo PR da Fase D (docs). |

Nada do que segue reabre redesign, troca de stack, CMS ou dados comerciais.

---

## 1. Diagnóstico quantitativo

| Região | Tamanho | Arquivos | Entra no `dist` da Vercel? | Papel |
|---|---:|---:|---|---|
| Working tree (sem `.git`) | **124,0 MB** | 313 | parcial | clone Git a cada build |
| `documentacao/` | **63,6 MB** | 203 | não | QA histórico, logos-fonte, Stitch |
| `documentacao/qa/` | **53,2 MB** | 158 (144 PNG) | não | screenshots de etapas 11–61 |
| `src/` | **57,7 MB** | 67 | só o que é `import`ado | app + masters de vídeo |
| `src/assets/media/videos/` | **50,0 MB** | 2 | **não** (zero imports) | originais de 60–87 s |
| `src/assets/media/hero/` | 2,5 MB | 4 | sim | clips + posters do carrossel |
| `public/` | 2,2 MB | 10 | **sim, cópia integral** | fontes, OG, padrão, ícones |
| `tests/` + configs | <0,1 MB | — | não | CI / qualidade |
| Markdown na raiz | ~0,3 MB | 8 | não | governança e prompts |

**Conclusão:** ~93% do working tree não participa do site publicado. A Vercel, no Git integration, **clona o repositório inteiro** antes do `vite build`. `.vercelignore` não enxuga esse clone; só a exclusão (ou Git LFS fora do app) reduz tempo de checkout, I/O do build e risco de teto de upload.

O `dist` publicado é outro recorte: Vite empacota **somente imports**. Os 50 MB de MP4 originais **não** vão para o CDN. Já `public/` é copiado inteiro — inclusive PNG de 1,6 MB que o CSS moderno nunca baixa.

---

## 2. O que a Vercel realmente serve hoje

### 2.1 Entra no deploy (`dist` / `public`)

- Tudo em `public/` (incluindo lastro).
- Assets `import`ados em `src/` (JSX/CSS): clips do Hero, posters, fotos do carrossel, cardápio, logo-96, pin, `liberty.json`, MapLibre (lazy).
- Função `api/reviews.js`.
- `index.html` gerado.

### 2.2 Não entra no `dist`, mas pesa o clone

- `documentacao/` (~64 MB).
- `src/assets/media/videos/*.mp4` (~50 MB).
- Planos, prompts, `.kilo/`, `.freebuff/`, `update_liberty.py`.
- Testes e Playwright (legítimos para CI; irrelevantes no artefato).

### 2.3 Problemas de runtime (não são “arquivo inútil”, mas incham o que o visitante baixa)

| Item | Evidência | Impacto |
|---|---|---|
| `BATATA.jpg` 844 KB, `X.jpg` 853 KB, `cebola.jpg` 854 KB | `src/data/menu.js` importa JPEG cru | cards do cardápio; pior LCP da grade |
| Mesmo JPEG importado **duas vezes** | SHA idêntico: `tabua.jpg` ≡ `turquia-hamburguer-artesanal-01.jpg`; `PIZZA.jpg` ≡ `turquia-pizza-calabresa-01.jpg` | Vite emite dois hashes; o browser baixa duas vezes |
| `food-pattern-bg.png` 1,63 MB em `public/` | `index.css` declara PNG e depois WebP (47 KB) | arquivo publicado; clientes WebP não usam, mas o clone/CDN carrega o PNG |
| Preload errado no `index.html` | `hero-fries.webp` é categoria Porções, **não** o LCP do Hero | compete com o poster/vídeo real do carrossel |
| Cache-Control só em `/assets/*` | `vercel.json` | `og-image.png`, fontes, padrão e `ICON_IFOOD.png` ficam sem `immutable` |

---

## 3. Arquivos inúteis — lista para eliminar

Prioridade: **P0** = lastro pesado sem referência de runtime; **P1** = órfão confirmado no código; **P2** = duplicata ou fonte já extraída; **P3** = docs/prompts/ferramentas de uma etapa.

### P0 — Fora do runtime, dominam o clone (~103 MB)

#### A. Vídeos-master (50,02 MB) — **eliminar do Git; guardar backup externo**

| Arquivo | Tamanho | Por que é inútil no repo |
|---|---:|---|
| `src/assets/media/videos/turquia-video-01.mp4` | 27,7 MB | Nenhum `import`. O Hero/About usam o clip `turquia-ambiente-hero.mp4` (995 KB). |
| `src/assets/media/videos/turquia-video-02.mp4` | 22,4 MB | Idem; clip `turquia-espaco-infantil-hero.mp4` (1,41 MB) já extraído. |

GitHub alerta a partir de 50 MB/arquivo; estes já são 28/22 MB e inflacionam **todo** `git clone` da Vercel.

#### B. `documentacao/qa/` (53,17 MB, 144 PNG + 14 MD)

Screenshots de regressão visual das etapas 11–61, incluindo duplicatas byte-a-byte (ex.: `cardapio-mobile-390.png` ≡ `lote-26/cardapio-mobile-before.png`). Não são lidas pelo build, pela Vercel nem pelos testes automatizados.

**Eliminar a árvore de PNG.** Os 14 `AUDITORIA_*.md` podem:

- ir junto (histórico já está no Git); ou
- ser condensados num único `documentacao/qa/INDICE.md` se o responsável quiser índice textual.

Pastas inteiras:

```
documentacao/qa/etapa-27/
documentacao/qa/etapa-28/
documentacao/qa/etapa-29/
documentacao/qa/etapa-47/          (~6,9 MB, before/after × 6 viewports)
documentacao/qa/etapa-52/ … etapa-61/ e etapa-61-correcoes/
documentacao/qa/lote-26/
documentacao/qa/*.png              (raiz: cardapio-*, home-*, localizacao-*, etapa44-*)
```

#### C. Logos-fonte em `documentacao/` (5,47 MB)

O site usa `src/assets/images/brand/logo-96.webp` (2,3 KB) e o pin `src/assets/images/location/pin-map.webp` (8,4 KB).

| Arquivo | Tamanho | Nota |
|---|---:|---|
| `documentacao/LOGO_VAR.png` | 1,7 MB | fonte; não importado |
| `documentacao/LOGO_WALL.png` | 1,4 MB | fonte; não importado |
| `documentacao/PIN_MAP.png` | 1,3 MB | já derivado em `pin-map.webp` |
| `documentacao/LOGO_FULL.png` | 1,1 MB | fonte; não importado |
| `documentacao/LOGO1.jpg` | 14 KB | duplicata informal do logo |

Mover para backup externo (mesmo pacote dos MP4 masters). Não precisam estar no repo de produção.

#### D. `documentacao/historico/` (4,22 MB)

Exports Stitch, HTML morto, assets provisórios, `.bat` Windows:

```
documentacao/historico/exports-html/     (~3,8 MB: code.html + screen.png de 9 telas)
documentacao/historico/assets-provisorios/
ocumentacao/historico/migracao-stitch/  (organizar_projeto.bat, v3.bat, mapeamentos)
documentacao/historico/implementation_plan.md
```

O próprio README já classifica essa pasta como “fora do runtime”.

#### E. `documentacao/design/screen.png` (633 KB)

SHA idêntico a `documentacao/historico/exports-html/index.html_homepage_production/screen.png`. Manter só `documentacao/design/DESIGN.md` se ainda for referência de tokens.

---

### P1 — Órfãos no runtime (confirmado: zero import em `src/`, `tests/`, `index.html`)

| Arquivo | Tamanho | Evidência |
|---|---:|---|
| `src/assets/images/hero/hero-gallery.jpg` | 76 KB | Já listado na Fase 4 do `BEST_PLAN.MD`. `ASSETS.md` ainda o cita como Bebidas; `menu.js` usa `image: null` em Bebidas. |
| `src/assets/images/hero/hero-gallery.webp` | 42 KB | Idem. |
| `src/assets/images/brand/logo.jpg` | 14 KB | Runtime usa só `logo-96.webp`. O JPEG só aparece em prompts/planos (hash MD5). |
| `src/assets/media/pictures/turquia-prato-vinho-01.jpg` | 167 KB | Removido do Hero na etapa 60; import morto. |
| `src/assets/media/pictures/turquia-hamburguer-bacon-01.jpg` | 136 KB | SHA = `TABUCAMA.jpg` (já no cardápio). Sem import próprio. |
| `src/assets/media/pictures/turquia-hamburguer-camadas-01.jpg` | 136 KB | Sem import. |
| `src/assets/media/pictures/turquia-bolinhos-porcao-01.jpg` | 95 KB | SHA = `Baca.jpg`. Sem import próprio. |
| `src/assets/media/pictures/turquia-pasteis-porcao-01.jpg` | 94 KB | Sem import. |
| `public/images/IFood_idvFPAKYIS_0.png` | 24 KB | Nenhum `src` aponta para este PNG. |
| `public/images/IFood_idvFPAKYIS_1.svg` | 1 KB | Paths **inlinados** em `IconIfoodGold.jsx`. O arquivo público é residual. |
| `update_liberty.py` | 3 KB | Script one-shot com path Windows (`C:\Users\lnpot\...`). `liberty.json` já está no repo. |
| `.kilo/plans/1787353384286-map-vectorial-correcao-etapa-52.md` | 8 KB | Scratch de agente. |
| `.freebuff/project-id` | <1 KB | Metadado de ferramenta; incluir `.freebuff/` no `.gitignore` (já pedido no `BEST_PLAN.MD`). |

**Pictures que DEVEM permanecer** (imports reais em `HeroSection.jsx` / `AboutSection.jsx`):

- `turquia-hamburguer-artesanal-01.jpg`
- `turquia-tabua-petiscos-chopp-01.jpg`
- `turquia-pizza-calabresa-01.jpg`

---

### P2 — Publicado à toa ou duplicado no bundle

| Arquivo | Tamanho | Ação |
|---|---:|---|
| `public/images/patterns/food-pattern-bg.png` | **1,63 MB** | Fallback do CSS. O WebP tem 47 KB. Ou comprimir o PNG para <80 KB, ou aceitar só WebP (cobertura atual). **Não deixar 1,6 MB em `public/`.** |
| `src/assets/images/products/tabua.jpg` | 202 KB | Conteúdo idêntico a `turquia-hamburguer-artesanal-01.jpg`. Unificar import (um módulo, dois usos) **antes** de apagar um dos paths. |
| `src/assets/images/products/PIZZA.jpg` | 131 KB | Idêntico a `turquia-pizza-calabresa-01.jpg`. Mesma unificação. |
| `src/assets/images/products/{BATATA,X,cebola}.jpg` | ~850 KB cada | **Não são órfãos** — estão no cardápio. Converter para WebP (~30–80 KB) e JPEG leve de fallback. Isso é otimização, não exclusão cega. |

JPEG+WebP de menu (`category-combos`, `category-sobremesas`, `menu-hero`, `hero-fries`) **são usados** (`menu.js` importa os dois). Manter o par até haver pipeline AVIF; só então dropar o JPEG.

---

### P3 — Markdown e prompts de etapa (poucos KB, ruído na raiz)

Não bloqueiam a Vercel. Sujar o root e confundir agentes.

| Arquivo | Tamanho | Destino sugerido |
|---|---:|---|
| `ETAPA_60_PROMPTS.md` | 3 KB | apagar (etapa concluída) |
| `PROMPT_DEEPSEEK_ETAPA32.md` | 8 KB | apagar |
| `Roadmap_Mestre_CLAUDE.md` | 26 KB | mover para `documentacao/historico/` **se** o histórico for mantido; senão apagar após o `BEST_PLAN.MD` cobrir o estado vigente |
| `relatoriodofinal.md` | 13 KB | idem |
| `version_clean.md` | 20 KB | **manter** até os lotes visuais serem absorvidos ou recusados no `BEST_PLAN.MD` |
| `BEST_PLAN.MD` | 247 KB | **não apagar.** É a fonte operacional. Pode ser arquivado/resumido noutro ciclo, com autorização. |
| `AGENTS.md` / `README.md` | — | **não apagar.** |

Auditorias textuais em `documentacao/qa/AUDITORIA_*.md` e `documentacao/ROADMAP_MIGRACAO.md` / `Relatorio_Auditoria_Pesquisa_Turquia_Lanches.md`: opcional. Não pesam. Se a pasta `qa/` perder os PNG, esses MD ficam órfãos de evidência visual — ou saem juntos, ou ganham um índice.

---

### Não apagar (falso positivo)

| Item | Por quê |
|---|---|
| `src/pages/demo/`, `src/data/menu.demo.js`, `playwright.demo.config.js`, `scripts/audit-demo-leak.mjs` | Guardrail de QA. `VITE_VISUAL_QA_DEMO` já impede vazamento no build canônico. |
| `tests/`, `playwright.config.js`, `vitest.config.js`, `.github/workflows/quality.yml` | CI. |
| `api/reviews.js` | Produção. |
| Clips `src/assets/media/hero/*.mp4` + posters | Hero e About. |
| `src/assets/map/liberty.json` | estilo MapLibre (lazy). |
| `public/fonts/*`, `public/og-image.png`, `public/robots.txt`, `public/sitemap.xml` | runtime/SEO. |
| `public/images/ICON_IFOOD.png` | `IconIfood.jsx` (Header). |
| `public/images/patterns/food-pattern-bg.webp` | fundo global. |
| `vercel.json`, `package.json`, lockfile, configs de lint/tailwind/vite | build. |

---

## 4. Plano de execução (após aprovação)

Uma fase = um commit. Não misturar exclusão de 50 MB com conversão de JPEG do cardápio.

### Fase 0 — Backup e baseline (obrigatória)

1. Confirmar branch, remote e que não há PR aberto dependente dos PNG de QA.
2. Copiar para fora do Git (Drive/zip):
   - `src/assets/media/videos/`
   - `documentacao/LOGO_*.png`, `PIN_MAP.png`
   - opcional: `documentacao/qa/` se quiser arquivo morto
3. `npm run check` e anotar o hash do `dist`.
4. Registrar no `BEST_PLAN.MD` que a higiene foi **autorizada** (este arquivo não governa estado).

### Fase A — Tirar os 50 MB de vídeo-master (maior ganho Vercel)

- Apagar `src/assets/media/videos/` inteiro.
- Grep: nenhum import a atualizar (já confirmado).
- Commit: `chore: remove unused source videos from git`.

**Ganho:** ~50 MB no clone de **cada** deploy.

### Fase B — Esvaziar `documentacao/` de binários

- Apagar PNG/JPG de `documentacao/qa/`, `documentacao/historico/`, `documentacao/design/screen.png`, logos-fonte.
- Decidir se os `AUDITORIA_*.md` ficam.
- Apagar `documentacao/historico/exports-html/` e `migracao-stitch/`.
- Commit: `chore: drop historical QA binaries from the repo`.

**Ganho:** ~63 MB.

### Fase C — Órfãos de `src/` e `public/`

- Apagar lista P1.
- Remover `food-pattern-bg.png` **depois** de confirmar que o CSS pode ficar só com WebP, ou substituir por PNG <80 KB.
- Unificar duplicatas SHA (um import compartilhado para Hero + cardápio).
- Atualizar `documentacao/ASSETS.md`.
- `.gitignore`: `.freebuff/`, `.kilo/`.
- Apagar `update_liberty.py`, `.kilo/`, `.freebuff/`.
- Commit: `chore: remove orphan assets`.

### Fase D — Docs da raiz + README

- Apagar prompts de etapa.
- Corrigir README (SPA, âncoras, não “três HTMLs”).
- Preload do `index.html`: trocar `hero-fries.webp` pelo poster LCP real (`turquia-ambiente-poster.jpg`) ou remover o preload.
- Commit: `docs: align README and drop spent prompts`.

### Fase E — Otimização Vercel (não é delete; é o que o visitante sente)

1. Converter `BATATA.jpg` / `X.jpg` / `cebola.jpg` (e o restante do cardápio) para WebP + JPEG leve; `srcSet`/`sizes` nos cards.
2. Headers de cache também para `/images/:path*`, `/fonts/:path*`, `/og-image.png`.
3. Revisar o rewrite catch-all `"/(.*)" → /index.html` para **não** interceptar `/api/*` (hoje a função serverless costuma ganhar, mas o catch-all é frágil).
4. Acrescentar `.vercelignore` mesmo assim (protege `vercel` CLI e reduz upload residual):

```
documentacao
tests
playwright.config.js
playwright.demo.config.js
*.md
!README.md
.kilo
.freebuff
update_liberty.py
src/assets/media/videos
```

5. Workflow `quality.yml` dispara só em `BEST_ONE`. Se a produção é `main`, incluir `main` no `on.push.branches`.
6. Medir Lighthouse mobile da Home em cache vazio **depois** das fases A–E, contra a baseline da Fase 0.

### Fase F — (Opcional) Git history

Apagar arquivos no commit **não** encolhe o `.git` antigo. Para o clone da Vercel ficar leve de verdade:

- ou `git filter-repo` / BFG nos paths P0 (force-push; **só com autorização** e backup); ou
- repositório fresco a partir do tree limpo.

Sem rewrite, deploys novos ainda clonam blobs históricos até o GitHub GC. Vale a pena só se o responsável aceitar force-push.

---

## 5. Estimativa de resultado

| Cenário | Working tree | Clone Vercel | `dist` público |
|---|---:|---:|---|
| Hoje | ~124 MB | ~124 MB + pack | inclui PNG 1,6 MB + JPEGs 850 KB |
| Após A+B+C (sem rewrite de history) | **~8 MB** | tree novo ~8 MB; history ainda gordo | some PNG 1,6 MB e órfãos de `public/` |
| Após E (WebP do cardápio) | ~8 MB | idem | cards ~10× menores |
| Após F (history rewrite) | ~8 MB | clone raso ~8 MB | igual |

Redução de tree: **~116 MB (93%)**, sendo 50 MB (vídeos) + 53 MB (QA PNG) + 5 MB (logos) + 4 MB (histórico) + 1,6 MB (PNG de padrão) os blocos.

---

## 6. Critérios de aceite de cada fase

- `npm run lint && npm run test && npm run build` (ou `npm run check`) verde.
- `npm run audit:demo-leak` continua no `build`.
- Home, cardápio, mapa, reviews, Header/Footer, iFood/WhatsApp visuais intactos.
- Hero ainda troca slides (2 vídeos + 3 fotos).
- Fundo `food-pattern-bg.webp` visível.
- `/api/reviews` não reescrito para `index.html`.
- Nenhum `import` quebrado (grep dos basenames apagados = zero em `src/`).
- Screenshots 390 e 1280 da Home iguais em estrutura (não em hash de PNG de QA antigo).

---

## 7. Rollback

- Fases A–D: `git revert` do commit da fase.
- Masters de vídeo/logo: restaurar do backup da Fase 0, **não** do Git se a Fase F tiver reescrito history.
- Não desligar teste, audit de demo-leak ou a função de reviews para “passar o build”.

---

## 8. Próxima decisão humana

Antes de qualquer `git rm`:

1. Autorizar **Fase A** (vídeos-master para fora do Git)?
2. Autorizar **Fase B** (PNG de QA / histórico / logos-fonte)?
3. Os `AUDITORIA_*.md` ficam ou saem com os PNG?
4. `food-pattern-bg.png`: comprimir ou remover (WebP-only)?
5. Aut rewrite de history (Fase F) ou só tree novo?

Este arquivo **não** apaga nada. A execuCão começa quando o responsável marcar as fases acima no `BEST_PLAN.MD`.
