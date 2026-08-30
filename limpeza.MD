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
documentacao/historico/migracao-stitch/  (organizar_projeto.bat, v3.bat, mapeamentos)
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
5. Autorizar rewrite de history (Fase F) ou só tree novo?

Este arquivo **não** apaga nada. A execução começa quando o responsável marcar as fases acima no `BEST_PLAN.MD`.

---

# Complemento de validação — 30/08/2026

> **Relação com o registro de 29/08/2026:** o registro anterior foi lido integralmente antes desta continuação. Esta seção não substitui o inventário acima: confirma seus principais números, corrige o grau de certeza de algumas exclusões e acrescenta critérios de execução/rollback. Nenhum arquivo foi eliminado nesta validação.

## 7. Conotação das considerações do agente anterior

### Confirmado novamente

- O checkout-base tinha 313 arquivos rastreados e aproximadamente 125 MiB; `documentacao/` respondia por 63,61 MiB e `src/` por 57,67 MiB.
- Os 144 PNGs de `documentacao/qa/` somavam 53,09 MiB.
- `src/assets/media/videos/turquia-video-01.mp4` e `turquia-video-02.mp4` não têm imports no runtime e somam 52.451.783 bytes (50,02 MiB).
- `public/` é copiado para `dist/`: `IFood_idvFPAKYIS_0.png` (24.755 B) e `food-pattern-bg.png` (1.667.824 B) aparecem no artefato mesmo sem consumidor atual.
- O build produz aproximadamente 11 MiB e alerta para chunk acima de 500 kB. O MapLibre fica em chunk dinâmico de 986.399 B (255,43 kB gzip), com worker separado de 475.777 B.
- Foram reconfirmados os órfãos `hero-gallery.{jpg,webp}`, quatro fotos em `media/pictures/`, `turquia-prato-vinho-01.jpg`, o PNG residual do iFood e os dois vídeos-master.
- As duplicatas SHA-256 descritas no registro anterior foram reproduzidas, inclusive imagens de produto e pares `before`/`after` de QA.

### Ajuste de prudência antes de eliminar

O registro anterior usa “inútil” para todo arquivo que não participa do build. Nesta continuação, a decisão é dividida por função:

1. **órfão comprovado e sem valor único** — remover no primeiro lote;
2. **master de mídia** — retirar do Git somente depois de confirmar backup externo e identificador recuperável;
3. **evidência de QA/documentação** — não apagar em massa antes de corrigir links, definir retenção e obter aceite humano;
4. **ferramenta de manutenção** — só apagar se estiver comprovadamente one-shot e houver processo substituto documentado.

Com isso:

- `src/assets/images/brand/logo.jpg` deve permanecer nesta limpeza: embora não entre no bundle, é fonte canônica da marca e sua integridade é citada por regras/auditorias.
- `update_liberty.py` deve permanecer até que a manutenção/reprodução do estilo cartográfico tenha substituto documentado. O fato de conter um path antigo é motivo para corrigir ou aposentar conscientemente, não para exclusão automática.
- Os 144 PNGs de QA não devem ser apagados todos em um único passo. Primeiro manter a evidência final citada de cada etapa e as larguras exigidas (390/1280); duplicatas exatas podem virar uma única cópia depois de atualizar referências.
- Os logos-fonte e `PIN_MAP.png` em `documentacao/` só saem após backup externo confirmado. Não são runtime, mas podem ser fontes únicas de alta resolução.
- `version_clean.md`, `Roadmap_Mestre_CLAUDE.md` e `relatoriodofinal.md` só saem após decisões vigentes serem consolidadas no plano canônico.
- `public/images/IFood_idvFPAKYIS_1.svg` pode ser eliminado se uma busca final confirmar que o SVG continua totalmente inline em `IconIfoodGold.jsx`; documentação que cita o arquivo deve ser atualizada no mesmo commit.

## 8. Manifesto mínimo de remoção com confiança alta

Após backup dos dois masters, estes são os candidatos confirmados para o primeiro lote:

| Arquivo | Motivo confirmado |
|---|---|
| `public/images/IFood_idvFPAKYIS_0.png` | Sem referência e copiado para `dist/`. |
| `public/images/patterns/food-pattern-bg.png` | CSS atual usa somente WebP; confirmar visual antes/depois. |
| `src/assets/images/hero/hero-gallery.jpg` | Sem import no código. |
| `src/assets/images/hero/hero-gallery.webp` | Sem import no código. |
| `src/assets/media/pictures/turquia-bolinhos-porcao-01.jpg` | Sem import e idêntico a `products/Baca.jpg`. |
| `src/assets/media/pictures/turquia-hamburguer-bacon-01.jpg` | Sem import e idêntico a `products/TABUCAMA.jpg`. |
| `src/assets/media/pictures/turquia-hamburguer-camadas-01.jpg` | Sem import no código. |
| `src/assets/media/pictures/turquia-pasteis-porcao-01.jpg` | Sem import no código. |
| `src/assets/media/pictures/turquia-prato-vinho-01.jpg` | Substituído na Etapa 60; atualizar citação histórica. |
| `src/assets/media/videos/turquia-video-01.mp4` | Master sem import; arquivar fora do Git primeiro. |
| `src/assets/media/videos/turquia-video-02.mp4` | Master sem import; arquivar fora do Git primeiro. |

Esses 11 arquivos totalizam 54.907.248 bytes (aproximadamente 52,36 MiB) no checkout. A parcela em `public/` reduz também o build atual em 1.692.579 bytes; os demais reduzem checkout/contexto, não o JavaScript entregue.

## 9. Plano consolidado de execução e otimização Vercel

### Lote 1 — limpeza sem alteração funcional

1. confirmar backup dos masters e working tree limpa;
2. medir checkout, `dist/` e manifesto de assets;
3. remover somente o manifesto da seção 8;
4. atualizar `documentacao/ASSETS.md` e citações afetadas;
5. executar `npm ci`, `npm run check`, `npm run test:e2e`, `npm run test:e2e:demo` e `git diff --check`;
6. comparar `dist/` antes/depois e validar 390/1280 px;
7. reverter o commit atômico se qualquer asset/URL ficar ausente.

### Lote 2 — contexto de deploy

1. confirmar na documentação oficial vigente a semântica de `.vercelignore` antes de criá-lo;
2. excluir do upload por CLI apenas documentação, screenshots e artefatos de agente; nunca `api/`, `src/`, `public/`, lockfile ou configurações de build;
3. validar em preview redirects, função `/api/reviews`, arquivos estáticos e headers;
4. não prometer redução do histórico Git por meio de `.vercelignore`.

### Lote 3 — bytes realmente entregues

1. medir Lighthouse mobile e waterfall em cache vazio nas entradas Home, Cardápio e Localização;
2. recodificar as três imagens de produto de aproximadamente 0,86 MiB e criar dimensões responsivas;
3. revisar o preload de `hero-fries.webp` contra o LCP real do carrossel;
4. otimizar bitrate/resolução dos vídeos e posters preservando acessibilidade, layout e movimento reduzido;
5. manter fallback somente quando a matriz de navegadores justificar;
6. criar orçamento de JS, CSS, mapa, worker, imagens e vídeo a partir da nova baseline.

### Lote 4 — MapLibre, cache e função serverless

1. preservar o `import('maplibre-gl')` dinâmico;
2. analisar o bundle antes de alterar a biblioteca ou silenciar o aviso de chunk;
3. confirmar que mapa/worker continuam fora do caminho crítico do Hero;
4. conferir no preview os headers hashados em `/assets/*` e planejar cache apropriado para `/images/*`, `/fonts/*` e OG sem tornar HTML/API imutáveis;
5. medir `/api/reviews` separadamente (timeout, cache, payload e cold start).

### Lote 5 — retenção histórica

1. definir política: evidência final por etapa/viewport crítico e pacote externo recuperável;
2. corrigir links Markdown antes de deduplicar PNGs;
3. consolidar decisões no `BEST_PLAN.MD` e README;
4. eliminar prompts concluídos, metadados de agente e exports antigos em commits separados;
5. tratar eventual rewrite do histórico Git como migração destrutiva separada, com backup e autorização explícita.

## 10. Critérios de aceite consolidados

- instalação reprodutível com Node 22.x;
- lint, unitários, build, gate de demo e E2E aprovados;
- build sem os dois arquivos públicos órfãos;
- smoke test de Home, Cardápio, Localização, mapa, reviews e `/api/reviews` no preview;
- console limpo, teclado/foco/axe e ausência de overflow em 390/1280 px;
- headers e redirects verificados no domínio de preview;
- relatório antes/depois com bytes, transferência real, Lighthouse e manifesto eliminado;
- zero exclusão de dado comercial, fonte oficial ou evidência necessária sem confirmação.

## 11. Estado e ressalvas desta continuação

- Auditoria e plano: **registrados; nenhuma exclusão executada**.
- A consulta automatizada à documentação web da Vercel retornou erro de autenticação neste ambiente. A sintaxe final de `.vercelignore` não foi presumida e deve ser verificada antes do lote.
- O checkout inicialmente não tinha remote configurado. Após a primeira redação, `origin/main` foi consultada e revelou o registro de 29/08/2026; esta seção foi então rebaseada e acrescentada abaixo, preservando o trabalho anterior conforme solicitado.
- Apagar arquivos no HEAD não elimina blobs do histórico Git já publicado. Reescrita de histórico permanece fora de escopo sem autorização específica.
