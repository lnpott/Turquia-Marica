# LIMPEZA DO REPOSITÓRIO — Turquia Lanches
> Auditoria realizada em 29/08/2026 via acesso direto ao `lnpott/Turquia-Marica@main`.
> Metodologia: fetch de cada arquivo via `raw.githubusercontent.com` + MD5 para detecção de duplicatas + leitura de imports para rastrear órfãos.
> **Regra invariável:** nenhuma remoção sem confirmar ausência de referência no código. Nenhum dado comercial inventado.

---

## 1. ESTADO ATUAL DO REPOSITÓRIO

### Stack verificada
| Item | Valor confirmado |
|------|-----------------|
| Framework | React 18 + Vite 8 + React Router 7 |
| CSS | Tailwind 3.3.5 + `src/styles/index.css` |
| Mapa | MapLibre GL 6.5 + `src/assets/map/liberty.json` |
| Testes | Vitest 4 (unitários) + Playwright 1.62 (E2E) |
| Deploy | Vercel (plano gratuito) → `turquia-marica.vercel.app` |
| Node | `22.x` (declarado em `package.json`) |
| Build atual | `npm run check` aprovado, 25/25 unitários, 40/40 E2E |

### Arquivos raiz relevantes
```
BEST_PLAN.MD                ← documento operacional vigente (MANTER)
README.md                   ← apresentação do repo (MANTER)
Roadmap_Mestre_CLAUDE.md    ← histórico arquitetural (candidato a mover)
ETAPA_60_PROMPTS.md         ← prompts já executados (candidato a arquivar)
vercel.json                 ← configuração de deploy (MANTER + otimizar)
package.json                ← dependências e scripts (MANTER)
vite.config.js              ← build config (MANTER)
tailwind.config.cjs         ← design system (MANTER)
eslint.config.js            ← linting (MANTER)
playwright.config.js        ← E2E produção (MANTER)
playwright.demo.config.js   ← E2E do modo demo/QA (MANTER)
vitest.config.js            ← unitários (MANTER)
postcss.config.js           ← PostCSS (MANTER)
index.html                  ← entry point (MANTER)
```

---

## 2. INVENTÁRIO COMPLETO DE ASSETS

### 2.1 Imagens de produto — `src/assets/images/products/`
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `X.jpg` | **873 KB** | Importado por `menu.js` — em uso, mas grosseiramente grande |
| `BATATA.jpg` | **864 KB** | Importado por `menu.js` — em uso, mas grosseiramente grande |
| `cebola.jpg` | **874 KB** | Importado por `menu.js` — em uso, mas grosseiramente grande |
| `tabua.jpg` | 206 KB | Importado por `menu.js` — **DUPLICATA** de `turquia-hamburguer-artesanal-01.jpg` (MD5 idêntico) |
| `PIZZA.jpg` | 134 KB | Importado por `menu.js` — **DUPLICATA** de `turquia-pizza-calabresa-01.jpg` (MD5 idêntico) |
| `TABUCAMA.jpg` | 139 KB | Importado por `menu.js` — em uso |
| `PASSA.jpg` | 190 KB | Importado por `menu.js` — em uso |
| `PIDOCE.jpg` | 174 KB | Importado por `menu.js` — em uso |
| `Baca.jpg` | 97 KB | Importado por `menu.js` — em uso |

### 2.2 Media pictures — `src/assets/media/pictures/`
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `turquia-hamburguer-artesanal-01.jpg` | 206 KB | Importado por `HeroSection.jsx` e `AboutSection.jsx` — em uso |
| `turquia-tabua-petiscos-chopp-01.jpg` | 187 KB | Importado por `HeroSection.jsx` e `AboutSection.jsx` — em uso |
| `turquia-pizza-calabresa-01.jpg` | 134 KB | Importado por `HeroSection.jsx` — em uso |
| `turquia-prato-vinho-01.jpg` | **170 KB** | **ÓRFÃO CONFIRMADO** — era slide 4, removido na Etapa 60; nenhum import encontrado |

### 2.3 Media hero — `src/assets/media/hero/`
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `turquia-ambiente-hero.mp4` | 994 KB | Importado por `HeroSection.jsx` e `AboutSection.jsx` — em uso |
| `turquia-espaco-infantil-hero.mp4` | 1,444 KB | Importado por `HeroSection.jsx` e `AboutSection.jsx` — em uso |
| `turquia-ambiente-poster.jpg` | 45 KB | Importado por `HeroSection.jsx` e `AboutSection.jsx` — em uso |
| `turquia-espaco-infantil-poster.jpg` | 144 KB | Importado por `HeroSection.jsx` e `AboutSection.jsx` — em uso |

### 2.4 Imagens hero — `src/assets/images/hero/`
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `hero-fries.webp` | 27 KB | Importado por `menu.js` — em uso |
| `hero-fries.jpg` | 64 KB | Fallback de `hero-fries.webp` em `menu.js` — em uso |
| `hero-gallery.webp` | 42 KB | Verificado presente; **verificar se tem import ativo** |
| `hero-gallery.jpg` | 77 KB | Verificado presente; **verificar se tem import ativo** |

### 2.5 Imagens de menu — `src/assets/images/menu/`
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `category-combos.webp` | 36 KB | Importado por `menu.js` — em uso |
| `category-combos.jpg` | 64 KB | Fallback — em uso |
| `category-sobremesas.webp` | 34 KB | Importado por `menu.js` — em uso |
| `category-sobremesas.jpg` | 72 KB | Fallback — em uso |
| `menu-hero.webp` | 31 KB | Importado por `menu.js` — em uso |
| `menu-hero.jpg` | 56 KB | Fallback — em uso |

### 2.6 Brand — `src/assets/images/brand/`
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `logo-96.webp` | 2,3 KB | Importado por `Header.jsx` — em uso |
| `logo.jpg` | 14 KB | **Verificar se tem import ativo** (pode ser órfão) |

### 2.7 Localização — `src/assets/images/location/`
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `pin-map.webp` | 8,5 KB | Usado por `MapEmbed.jsx` — em uso |

### 2.8 Mapa
| Arquivo | Tamanho | Situação |
|---------|---------|---------|
| `src/assets/map/liberty.json` | 45 KB | Estilo MapLibre — em uso |

---

## 3. DOCUMENTAÇÃO QA — INVENTÁRIO E CLASSIFICAÇÃO

### 3.1 Screenshots históricos (etapas 53–58) — 2,28 MB
Estas etapas trataram de refinamentos incrementais da placa de retorno RJ-106.
Os estados "before" de cada etapa são idênticos aos "after" da etapa anterior — **redundância total**.
A etapa 58 é o estado final do mapa antes do Hero carousel (Etapa 59).

| Pasta | Arquivos | Tamanho | Classificação |
|-------|---------|---------|---------------|
| `etapa-53/` | 3 (mapa-1280, mapa-390, localizacao-1280) | ~858 KB | Intermediário — **ELIMINÁVEL** |
| `etapa-54/` | 2 (mapa-1280, mapa-390) | ~208 KB | Intermediário — **ELIMINÁVEL** |
| `etapa-55/before-*` | 2 arquivos | ~243 KB | Duplicata de etapa-54/after — **ELIMINÁVEL** |
| `etapa-55/after-*` | 2 arquivos | ~209 KB | Intermediário — **ELIMINÁVEL** |
| `etapa-56/before-*` | 1 arquivo | ~122 KB | Duplicata de etapa-55/after — **ELIMINÁVEL** |
| `etapa-56/after-*` | 2 arquivos | ~207 KB | Intermediário — **ELIMINÁVEL** |
| `etapa-57/before-*` | 1 arquivo | ~121 KB | Duplicata de etapa-56/after — **ELIMINÁVEL** |
| `etapa-57/after-*` | 2 arquivos | ~209 KB | Intermediário — **ELIMINÁVEL** |
| `etapa-58/before-*` | 1 arquivo | ~122 KB | Duplicata de etapa-57/after — **ELIMINÁVEL** |
| `etapa-58/after-*` | 2 arquivos | ~209 KB | **MANTER** — estado final do mapa |

### 3.2 Screenshots recentes — 8,19 MB

| Pasta | Arquivos | Tamanho | Classificação |
|-------|---------|---------|---------------|
| `etapa-58/after-*` | 2 | 209 KB | **MANTER** — estado final do mapa |
| `etapa-59/` | 2 | ~1,28 MB | **MANTER** — evidência do Hero carousel |
| `etapa-60/` | 2 | ~1,32 MB | **MANTER** — evidência do slide 4 refinado |
| `etapa-61/` | 2 | **5,59 MB** | **MANTER** — evidência da adaptação Grok; mas os PNGs são enormes (3,38 MB + 2,21 MB) |

> **Nota sobre etapa-61:** as duas imagens somam 5,59 MB. São page-screenshots de página inteira, não capturas recortadas. Isso é válido como evidência, mas representa 54% do peso total de QA do repositório. Se o BEST_PLAN.MD já registra a aprovação como concluída, esses arquivos podem ser comprimidos localmente antes do próximo push.

### 3.3 Documentos de auditoria
| Arquivo | Tamanho | Classificação |
|---------|---------|---------------|
| `documentacao/qa/AUDITORIA_LOCALIZACAO.md` | 34 KB | **MANTER** — histórico de decisões de mapa |
| `documentacao/qa/AUDITORIA_LOTES_21_26.md` | 3,9 KB | **MANTER** — registro de QA |
| `documentacao/qa/AUDITORIA_ETAPA_61.md` | 3,4 KB | **MANTER** — auditoria independente recente |

### 3.4 Documentação raiz
| Arquivo | Situação |
|---------|----------|
| `BEST_PLAN.MD` | **MANTER na raiz** — documento operacional vigente |
| `README.md` | **MANTER na raiz** |
| `Roadmap_Mestre_CLAUDE.md` | Histórico arquitetural; pode ser movido para `documentacao/` |
| `ETAPA_60_PROMPTS.md` | Prompts de etapa já executada; pode ser movido para `documentacao/prompts/` |

---

## 4. PLANO DE LIMPEZA — PRIORIZADO

### PRIORIDADE 1 — Remoção segura, sem impacto no build (fazer em um commit)

#### 4.1 Asset órfão confirmado
```
src/assets/media/pictures/turquia-prato-vinho-01.jpg   (170 KB)
```
**Diagnóstico:** era slide 4 do Hero. Removido na Etapa 60 e substituído por `turquia-tabua-petiscos-chopp-01.jpg`. Nenhum `import` encontrado em nenhum JSX, JS, demo ou teste.
**Ação:** `git rm src/assets/media/pictures/turquia-prato-vinho-01.jpg`
**Risco:** zero. Confirmar com `git grep "turquia-prato-vinho"` antes de executar.

#### 4.2 Screenshots de QA intermediários (etapas 53–57 + before de 58)
```
documentacao/qa/etapa-53/                     (~858 KB, 3 arquivos)
documentacao/qa/etapa-54/                     (~208 KB, 2 arquivos)
documentacao/qa/etapa-55/before-mapa-1280.png (~122 KB)
documentacao/qa/etapa-55/before-mapa-390.png  (~87 KB)
documentacao/qa/etapa-55/after-mapa-1280.png  (~122 KB)
documentacao/qa/etapa-55/after-mapa-390.png   (~87 KB)
documentacao/qa/etapa-56/before-mapa-1280.png (~122 KB)
documentacao/qa/etapa-56/after-mapa-1280.png  (~121 KB)
documentacao/qa/etapa-56/after-mapa-390.png   (~86 KB)
documentacao/qa/etapa-57/before-mapa-1280.png (~121 KB)
documentacao/qa/etapa-57/after-mapa-1280.png  (~122 KB)
documentacao/qa/etapa-57/after-mapa-390.png   (~87 KB)
documentacao/qa/etapa-58/before-mapa-1280.png (~122 KB)
```
**Diagnóstico:** etapas de refinamento incremental da placa de retorno (Etapas 53–58). O estado final relevante está nos `after-*` da etapa-58, que devem ser preservados. Os estados intermediários e os "before" (que são duplicatas dos "after" anteriores) são eliminável sem perda de evidência.
**Ação:** `git rm -r documentacao/qa/etapa-53 documentacao/qa/etapa-54` e remoção seletiva dos `before-*` das etapas 55–58 e dos `after-*` das etapas 55–57.
**Ganho:** ~2,27 MB fora do repositório git.
**Risco:** nenhum impacto em build ou testes. O BEST_PLAN.MD já documenta o resultado final de cada etapa em texto.

#### Ganho estimado da Prioridade 1
| Item | Ganho |
|------|-------|
| `turquia-prato-vinho-01.jpg` | ~170 KB |
| Screenshots QA intermediários | ~2.270 KB |
| **Total P1** | **~2,44 MB** |

---

### PRIORIDADE 2 — Organização de documentos na raiz (sem impacto em build)

#### 4.3 Mover documentos de processo para `documentacao/`
```
ETAPA_60_PROMPTS.md   → documentacao/prompts/ETAPA_60_PROMPTS.md
Roadmap_Mestre_CLAUDE.md → documentacao/Roadmap_Mestre_CLAUDE.md
```
**Diagnóstico:** `ETAPA_60_PROMPTS.md` já está marcado como "executado e validado em 25/08/2026 — não reexecutar". Não tem função operacional na raiz. `Roadmap_Mestre_CLAUDE.md` é histórico arquitetural; o documento operacional vigente é `BEST_PLAN.MD`.
**Ação:** `git mv` de ambos. Atualizar qualquer referência (verificar se BEST_PLAN.MD os referencia por caminho).
**Risco:** baixo, mas exige verificação de referências cruzadas antes.

---

### PRIORIDADE 3 — Consolidação de duplicatas (exige alteração em `menu.js`)

#### 4.4 Duplicatas de imagens confirmadas por MD5
```
src/assets/images/products/tabua.jpg   (MD5: ba808ac0)
≡ src/assets/media/pictures/turquia-hamburguer-artesanal-01.jpg
```
```
src/assets/images/products/PIZZA.jpg   (MD5: b6d74a9e)
≡ src/assets/media/pictures/turquia-pizza-calabresa-01.jpg
```
**Diagnóstico:** `menu.js` importa os arquivos de `images/products/`; `HeroSection.jsx` e `AboutSection.jsx` importam os de `media/pictures/`. O conteúdo é binariamente idêntico — são o mesmo arquivo em dois lugares.
**Ação para eliminar a duplicata:**
1. Atualizar `src/data/menu.js` para importar de `../../assets/media/pictures/turquia-hamburguer-artesanal-01.jpg` em vez de `../../assets/images/products/tabua.jpg`, e idem para PIZZA.
2. Após build sem erros, executar `git rm src/assets/images/products/tabua.jpg src/assets/images/products/PIZZA.jpg`.
**Ganho:** ~340 KB eliminados do repositório.
**Risco:** médio — exige PR dedicado; não misturar com P1. O `alt` do `imageAlt` no menu.js deve ser revisado se o arquivo de referência mudar.

---

### PRIORIDADE 4 — Otimização de imagens grandes (exige conversão local)

#### 4.5 Imagens de produto acima de 800 KB
```
src/assets/images/products/X.jpg       873 KB
src/assets/images/products/BATATA.jpg  864 KB
src/assets/images/products/cebola.jpg  874 KB
```
**Diagnóstico:** três JPEGs de produto com peso acima de 800 KB cada. Vite os inclui no bundle sem compressão adicional por padrão. Para contexto: os clips de vídeo do Hero (derivados de 52 MB originais) ficaram em ~1 MB cada com otimização. Essas três imagens somam 2,6 MB.
**Ação recomendada:** gerar versões WebP com `cwebp -q 80` ou `sharp`, manter JPG como fallback, e atualizar `menu.js` para seguir o padrão `WebP + fallback` já adotado para as categorias.
**Ganho estimado:** redução de 60–75% → economia de ~1,5–2 MB no bundle.
**Risco:** médio — requer conversão local + PR dedicado. Imagens de produto estão marcadas como "acervo provisório" no `menu.js`, portanto a otimização de assets definitivos deve aguardar a entrega das fotos oficiais.

---

## 5. OTIMIZAÇÕES NO VERCEL

### 5.1 `vercel.json` — estado atual
```json
{
  "cleanUrls": true,
  "redirects": [...],
  "rewrites": [...],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```
O cache imutável para `/assets/*` está correto — Vite adiciona hash de conteúdo em todos os assets buildados.

### 5.2 Adições recomendadas ao `vercel.json`

#### Cache para arquivos estáticos de configuração
```json
{
  "source": "/robots.txt",
  "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400" }]
},
{
  "source": "/sitemap.xml",
  "headers": [{ "key": "Cache-Control", "value": "public, max-age=86400" }]
}
```

#### Headers de segurança básicos (sem custo, sem breaking change)
```json
{
  "source": "/(.*)",
  "headers": [
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
  ]
}
```
**Justificativa:** não requerem plano pago; melhoram score em auditorias de segurança (Lighthouse, Observatory); sem impacto em funcionalidade.

### 5.3 O que NÃO adicionar (plano gratuito)
| Feature | Motivo para não adicionar |
|---------|--------------------------|
| Vercel Image Optimization | Feature paga; o projeto já usa WebP nativo |
| Edge Functions | Sem backend — fora do escopo |
| Analytics | Fora do escopo; envolve decisão de produto |
| ISR / SSR | Stack é SPA pura; sem necessidade |

### 5.4 Node version
`package.json` declara `"node": "22.x"` mas o projeto roda em Node 22 com Vite 8. Verificar se o Vercel Project Settings está configurado para Node 22 em Settings → General → Node.js Version. Se estiver em 18 ou 20, atualizar para 22.

---

## 6. CHECKLIST DE EXECUÇÃO

### Branch: `chore/limpeza-repositorio`

#### Passo 1 — Preparação
```bash
git checkout main
git pull origin main
git checkout -b chore/limpeza-repositorio
```

#### Passo 2 — Remoção do asset órfão (P1)
```bash
# Confirmar ausência de referências
git grep "turquia-prato-vinho"
# Se retornar vazio:
git rm src/assets/media/pictures/turquia-prato-vinho-01.jpg
```

#### Passo 3 — Remoção de screenshots intermediários (P1)
```bash
git rm -r documentacao/qa/etapa-53
git rm -r documentacao/qa/etapa-54
git rm documentacao/qa/etapa-55/before-mapa-1280.png
git rm documentacao/qa/etapa-55/before-mapa-390.png
git rm documentacao/qa/etapa-55/after-mapa-1280.png
git rm documentacao/qa/etapa-55/after-mapa-390.png
git rm documentacao/qa/etapa-56/before-mapa-1280.png
git rm documentacao/qa/etapa-56/after-mapa-1280.png
git rm documentacao/qa/etapa-56/after-mapa-390.png
git rm documentacao/qa/etapa-57/before-mapa-1280.png
git rm documentacao/qa/etapa-57/after-mapa-1280.png
git rm documentacao/qa/etapa-57/after-mapa-390.png
git rm documentacao/qa/etapa-58/before-mapa-1280.png
# Manter: documentacao/qa/etapa-58/after-*.png (estado final do mapa)
```

#### Passo 4 — Validação obrigatória antes de commit
```bash
npm run check          # lint + 25 unitários + build
npm run test:e2e       # 40/40 Playwright
git diff --check
```
**Critério de aceite:** resultados idênticos ao baseline (25/25 unitários, 40/40 E2E). Qualquer regressão indica que um arquivo removido ainda era referenciado.

#### Passo 5 — Commit e PR
```bash
git add -A
git commit -m "chore: remove orphaned asset and redundant QA screenshots (P1 cleanup)"
git push origin chore/limpeza-repositorio
# Abrir PR para main
```

#### Passo 6 — Organização de docs na raiz (P2, PR separado)
```bash
git checkout -b chore/organizar-docs-raiz
mkdir -p documentacao/prompts
git mv ETAPA_60_PROMPTS.md documentacao/prompts/ETAPA_60_PROMPTS.md
git mv Roadmap_Mestre_CLAUDE.md documentacao/Roadmap_Mestre_CLAUDE.md
# Verificar e atualizar referências em BEST_PLAN.MD se existirem
npm run check  # build deve permanecer limpo
git commit -m "chore: move executed prompts and historical roadmap to documentacao/"
git push origin chore/organizar-docs-raiz
```

#### Passo 7 — Consolidação de duplicatas (P3, PR separado e distinto)
Abrir task separada. Requer edição de `src/data/menu.js`, testes visuais dos itens afetados e validação E2E completa.

#### Passo 8 — Atualizar BEST_PLAN.MD
Registrar esta limpeza como Etapa 62 (ou sublote de encerramento) com evidências do ganho de tamanho.

---

## 7. RESUMO DO GANHO TOTAL ESPERADO

| Prioridade | Ação | Ganho estimado | Risco |
|-----------|------|----------------|-------|
| P1 | Asset órfão + screenshots intermediários | **~2,44 MB** | Zero |
| P2 | Reorganização de docs raiz | 0 bytes (organização) | Baixo |
| P3 | Consolidar duplicatas de produto | ~340 KB | Médio (exige PR dedicado) |
| P4 | Converter 3 imagens grandes para WebP | ~1,5–2 MB | Médio (aguardar acervo oficial) |
| Vercel | Headers de segurança + cache robots/sitemap | — (performance/segurança) | Zero |
| **Total P1+P3** | | **~2,78 MB** | — |

---

## 8. O QUE NÃO TOCAR

| Item | Motivo |
|------|--------|
| `src/assets/map/liberty.json` | Estilo do MapLibre — em uso e crítico |
| `src/assets/images/location/pin-map.webp` | Marcador do mapa — em uso |
| `src/assets/media/hero/*.mp4` e posters | Hero carousel — em uso e derivados otimizados |
| `src/pages/demo/VisualQaDemo.jsx` + `menu.demo.js` | Infraestrutura de QA visual protegida por `VITE_VISUAL_QA_DEMO` |
| `scripts/audit-demo-leak.mjs` | Auditoria de vazamento de dados demo — parte do `npm run build` |
| `playwright.demo.config.js` | Config E2E do modo demo |
| Qualquer arquivo em `documentacao/qa/etapa-58/after-*` | Estado final aprovado do mapa |
| `documentacao/qa/etapa-59/` a `etapa-61/` | Evidências das etapas mais recentes |
| `documentacao/qa/*.md` | Histórico de decisões |
| `BEST_PLAN.MD` | Documento operacional vigente — nunca mover da raiz |

---

*Documento gerado em 29/08/2026 via auditoria remota de `lnpott/Turquia-Marica@main`.*
*Fonte de verdade: repositório e código reais. Este documento não substitui validação local antes de cada remoção.*
