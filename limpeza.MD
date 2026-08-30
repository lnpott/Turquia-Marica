# LIMPEZA DO REPOSITÓRIO — Turquia Lanches

> **Tipo:** auditoria consolidada, plano e registro incremental de execução.
> **Revalidação:** 30/08/2026, branch `chore/limpeza-lote-1-preload`, PR #34.
> **Fontes comparadas:** inventário original de `limpeza.MD`, complemento do PR #33, relatório remoto fornecido pelo responsável, código, `BEST_PLAN.MD`, hashes e build locais.
> **Regra:** ausência do bundle não torna um arquivo descartável. Mídia original, evidência de QA e documentação só saem após retenção/backup e atualização das referências.

---

## 1. Conclusão executiva

Após o fechamento do Lote 1, o repositório tem **309 arquivos rastreados e 123,89 MiB**. Os dois maiores blocos continuam sendo:

| Área | Arquivos | Tamanho | Efeito atual |
|---|---:|---:|---|
| `documentacao/` | 203 | 63,61 MiB | Não entra no `dist`; pesa checkout e histórico. |
| `src/assets/media/videos/` | 2 | 50,02 MiB | Masters sem import; não entram no `dist`, mas o plano exige preservação dos originais. |
| `src/` restante | 63 | ~7,54 MiB | Código e assets; somente imports entram no bundle. |
| `public/` | 9 | 2,16 MiB | Copiado integralmente para `dist`. |

A limpeza correta tem dois objetivos diferentes:

1. **checkout/repositório:** tratar documentação histórica, evidências e masters com política de retenção;
2. **site entregue ao visitante:** otimizar os assets que aparecem no `dist`, especialmente três JPEGs de produto e arquivos residuais de `public/`.

Não é correto classificar todos os 114 MiB sem uso no runtime como “lixo”. Grande parte é fonte original ou evidência histórica. Também não é correto limitar a limpeza a ~2,44 MiB: isso ignora os maiores blocos, embora eles exijam backup e autorização.

---

## 2. Correções dos dois levantamentos anteriores

### Confirmado

- Stack: React 18, React Router 7, Vite 8, Tailwind 3, MapLibre 6, Vitest 4 e Playwright 1.62.
- Node `22.x` está declarado em `package.json`.
- `npm run check` passa com 25 testes unitários e build de ~11 MiB/42 arquivos.
- `hero-gallery.jpg` e `hero-gallery.webp` não têm import de runtime.
- `tabua.jpg` é binariamente idêntico a `turquia-hamburguer-artesanal-01.jpg`; `PIZZA.jpg` é idêntico a `turquia-pizza-calabresa-01.jpg`.
- `BATATA.jpg`, `X.jpg` e `cebola.jpg` entram no build com aproximadamente 0,86 MiB cada.
- Os dois vídeos em `src/assets/media/videos/` não têm import; os clips otimizados usados pelo Hero estão em `src/assets/media/hero/`.
- Há duplicatas exatas entre estados `after` e o `before` da etapa seguinte nas etapas 54–58.

### Corrigido

| Alegação anterior | Correção consolidada |
|---|---|
| “204 arquivos inúteis devem ser eliminados.” | Era amplo demais: incluía fontes originais únicas, toda a evidência visual e documentos ainda citados. Esses itens são candidatos a **retenção externa/deduplicação**, não remoção automática. |
| “`turquia-prato-vinho-01.jpg` pode sair com risco zero.” | Não entra no runtime, mas `BEST_PLAN.MD` manda preservar os oito JPEGs originais de `media/pictures`. Só pode sair do Git depois de backup recuperável. O mesmo vale para `turquia-hamburguer-camadas-01.jpg` e `turquia-pasteis-porcao-01.jpg`. |
| “Apagar todos os PNGs de QA.” | Incorreto sem política de retenção. Manter evidência final e viewports exigidos; deduplicar somente hashes iguais e atualizar as referências Markdown no mesmo commit. |
| “Apagar o `before` da Etapa 58 sem consequência.” | `BEST_PLAN.MD` cita os quatro arquivos `before`/`after` da Etapa 58. Qualquer remoção exige corrigir essa evidência primeiro. |
| “Remover `food-pattern-bg.png` diretamente.” | O CSS ainda referencia o PNG na linha de fallback. Remoção só é válida junto com a alteração dessa declaração ou com um fallback menor. |
| “`logo.jpg` é órfão eliminável.” | Não entra no runtime, mas é fonte de marca protegida e tem hash de integridade registrado no plano. Manter ou arquivar externamente; não apagar como órfão comum. |
| “Atualizar `menu.js` usando `../../assets/...`.” | A partir de `src/data/menu.js`, o caminho correto é `../assets/...`. |
| “40/40 E2E confirmados nesta auditoria.” | Esse número veio do relatório externo e não foi tratado como baseline local até nova execução. O baseline confirmado aqui é 25 unitários + build; E2E deve ser registrado pelo comando realmente executado. |
| “Vercel Image Optimization é simplesmente paga no plano gratuito.” | Afirmação comercial temporal e não necessária ao plano. Não adotar nem rejeitar serviço por essa frase; confirmar limites vigentes no painel/documentação antes de decidir. |
| “Headers de segurança têm risco zero.” | `nosniff` e `Referrer-Policy` são candidatos razoáveis, mas todo header precisa de preview. `X-Frame-Options: SAMEORIGIN` muda a possibilidade de embedding e não deve ser declarado sem impacto. |

---

## 3. Classificação correta dos arquivos

### 3.1 Remoção de alta confiança após busca final

Estes arquivos não têm consumidor de runtime e não são identificados como masters protegidos:

| Caminho | Bytes | Ação necessária no mesmo commit |
|---|---:|---|
| `src/assets/images/hero/hero-gallery.jpg` | 78.073 | **Executado no PR #34:** removido; catálogo ativo corrigido. |
| `src/assets/images/hero/hero-gallery.webp` | 42.149 | **Executado no PR #34:** removido; Bebidas permanece sem imagem. |
| `public/images/IFood_idvFPAKYIS_0.png` | 24.755 | **Executado:** removido sem referência ativa; `ICON_IFOOD.png` preservado em uso. |
| `.freebuff/project-id` | <1 KiB | **Executado no PR #34:** removido do índice com `git rm --cached`; arquivo local ignorado. |
| `.kilo/plans/1787353384286-map-vectorial-correcao-etapa-52.md` | ~8 KiB | **Executado no PR #34:** Etapa 52 confirmada no `BEST_PLAN.MD`; scratch removido e `.kilo/` ignorado. |

`public/images/IFood_idvFPAKYIS_1.svg` é uma fonte do ícone hoje inline em `IconIfoodGold.jsx`. Pode sair somente após confirmar que o SVG público não é necessário como fonte recuperável e atualizar o comentário que ainda o cita.

### 3.2 Remoção condicionada a backup externo

| Caminho/grupo | Tamanho | Condição |
|---|---:|---|
| `src/assets/media/videos/turquia-video-01.mp4` | 27,66 MiB | Backup externo com nome, hash e local de recuperação. |
| `src/assets/media/videos/turquia-video-02.mp4` | 22,36 MiB | Mesma condição. |
| Cinco JPEGs sem import em `src/assets/media/pictures/` | ~0,60 MiB | São mídia original protegida pelo `BEST_PLAN.MD`; arquivar antes de retirar do Git. |
| `documentacao/LOGO*.{jpg,png}` e `PIN_MAP.png` | 5,47 MiB | Fontes de alta resolução; backup e confirmação do responsável. |
| `src/assets/images/brand/logo.jpg` | 14 KiB | Fonte de marca com hash de integridade; manter ou arquivar, nunca apagar sem retenção. |

Os cinco JPEGs sem import são:

```text
src/assets/media/pictures/turquia-bolinhos-porcao-01.jpg
src/assets/media/pictures/turquia-hamburguer-bacon-01.jpg
src/assets/media/pictures/turquia-hamburguer-camadas-01.jpg
src/assets/media/pictures/turquia-pasteis-porcao-01.jpg
src/assets/media/pictures/turquia-prato-vinho-01.jpg
```

Os dois primeiros têm cópia binariamente idêntica em `products/`; os três últimos são únicos e exigem atenção especial no backup.

### 3.3 Duplicatas que exigem alteração de import

| Remover depois | Fonte compartilhada a manter | Ganho no tree |
|---|---|---:|
| `src/assets/images/products/tabua.jpg` | `src/assets/media/pictures/turquia-hamburguer-artesanal-01.jpg` | 206.778 B |
| `src/assets/images/products/PIZZA.jpg` | `src/assets/media/pictures/turquia-pizza-calabresa-01.jpg` | 134.235 B |

Em `src/data/menu.js`, trocar os imports por:

```js
import imgPizza from '../assets/media/pictures/turquia-pizza-calabresa-01.jpg'
import imgTabua from '../assets/media/pictures/turquia-hamburguer-artesanal-01.jpg'
```

O texto alternativo descreve o item apresentado e pode permanecer; a troca de caminho não altera por si só a semântica do `imageAlt`.

### 3.4 QA e documentação histórica

`documentacao/qa/` contém 158 arquivos e 53,17 MiB. A decisão correta é **deduplicar com retenção**, não apagar a árvore inteira.

Duplicatas exatas confirmadas nas etapas 54–58:

```text
etapa-54/mapa-1280.png == etapa-55/before-mapa-1280.png
etapa-54/mapa-390.png  == etapa-55/before-mapa-390.png
etapa-55/after-mapa-1280.png == etapa-56/before-mapa-1280.png
etapa-55/after-mapa-390.png  == etapa-56/before-mapa-390.png
etapa-56/after-mapa-1280.png == etapa-57/before-mapa-1280.png
etapa-56/after-mapa-390.png  == etapa-57/before-mapa-390.png
etapa-57/after-mapa-1280.png == etapa-58/before-mapa-1280.png
etapa-57/after-mapa-390.png  == etapa-58/before-mapa-390.png
```

Política proposta:

1. manter o estado final 390/1280 de cada lote relevante;
2. manter evidências citadas por auditorias até atualizar os links;
3. para cada par de hash igual, escolher uma cópia canônica e apontar os documentos para ela;
4. compactar PNGs únicos somente com comparação visual e hash novo registrado;
5. opcionalmente armazenar o pacote completo fora do Git, com índice e checksum;
6. só então remover intermediários.

`documentacao/historico/` (35 arquivos, 4,22 MiB) e prompts concluídos podem ser arquivados, mas mover arquivos dentro do mesmo repositório não reduz bytes. Para ganhar espaço, é necessário backup externo + exclusão do tree, preservando no Git apenas um índice textual se desejado.

### 3.5 Arquivos condicionais de `public/`

- `public/images/patterns/food-pattern-bg.png` (1,59 MiB): não remover sozinho. Escolher entre fallback PNG otimizado ou WebP-only e alterar `src/styles/index.css` no mesmo commit.
- `public/images/patterns/food-pattern-bg.webp`: manter; é o fundo efetivamente preferido.
- `public/images/ICON_IFOOD.png`: manter; usado por `IconIfood.jsx`.
- fontes, `og-image.png`, `robots.txt` e `sitemap.xml`: manter.

---

## 4. Otimização do artefato entregue pela Vercel

### Prioridade de impacto ao visitante

1. Converter `BATATA.jpg`, `X.jpg` e `cebola.jpg` para formatos/dimensões adequados e atualizar o componente para entregar fontes responsivas. Eles somam ~2,61 MiB no `dist`.
2. **Executado no PR #34:** preload de `hero-fries.webp` substituído pelo poster do primeiro slide, `turquia-ambiente-poster.jpg`; medição de LCP continua pendente.
3. Unificar as duas duplicatas de produto por import compartilhado.
4. Tratar o PNG de fundo de 1,59 MiB com fallback coerente.
5. Medir o mapa antes de alterar a biblioteca: MapLibre já é lazy, embora o chunk de 986,39 KiB gere aviso de tamanho.

### `vercel.json`

Manter o cache imutável de `/assets/*`, pois os nomes gerados pelo Vite têm hash. Em PRs separados e sempre em preview:

- avaliar cache apropriado para `/images/*`, `/fonts/*`, `robots.txt`, `sitemap.xml` e `og-image.png`; não tornar HTML nem API imutáveis;
- validar que o catch-all da SPA não mascara `/api/reviews`;
- avaliar `X-Content-Type-Options` e `Referrer-Policy` com teste funcional;
- decidir conscientemente se o site pode ou não ser incorporado antes de adicionar `X-Frame-Options` ou CSP `frame-ancestors`;
- confirmar no painel a versão Node e qualquer limite do plano; não codificar suposição comercial no repositório.

Uma `.vercelignore` pode ajudar deploys feitos por CLI, mas não substitui retirar arquivos do tree/histórico quando o fluxo começa por checkout Git. Verificar a semântica vigente na documentação oficial antes de criar o arquivo.

---

## 5. Plano de execução em lotes

### Lote 0 — baseline e retenção

1. Confirmar branch, remote, PRs abertos e working tree.
2. Executar `npm ci`, `npm run check`, `npm run test:e2e` e `npm run test:e2e:demo`.
3. Guardar tamanho e lista de `dist`, Lighthouse mobile e smoke de `/api/reviews` no preview.
4. Criar backup externo dos vídeos, fotos originais, logos-fonte e, se autorizado, QA completo; registrar checksums e local de recuperação.
5. Definir quais evidências 390/1280 devem permanecer no Git.

### Lote 1 — órfãos de alta confiança

- Remover somente os itens de 3.1 após busca final.
- Atualizar `documentacao/ASSETS.md`, comentários e `.gitignore` no mesmo commit.
- Não incluir originais, QA ou conversão de imagens neste lote.

### Lote 2 — duplicatas de runtime

- Trocar os dois imports de `menu.js` pelos caminhos corretos `../assets/media/...`.
- Remover `tabua.jpg` e `PIZZA.jpg` de `products/`.
- Executar build, E2E e inspeção visual do cardápio em 390/1280.

### Lote 3 — performance percebida

- Recodificar as três imagens grandes, corrigir preload e tratar o fallback do padrão.
- Comparar bytes, waterfall, LCP e qualidade visual antes/depois.
- Não aguardar necessariamente fotos oficiais para comprimir bytes atuais; apenas evitar trabalho desproporcional em acervo provisório.

### Lote 4 — retenção histórica

- Atualizar referências dos pares de QA duplicados para uma cópia canônica.
- Preservar finais 390/1280 e auditorias textuais.
- Arquivar externamente e remover do tree somente o conjunto autorizado.
- Tratar prompts/exports/metadados de agente em commit separado.

### Lote 5 — configuração Vercel

- Fazer preview com cache, segurança e rewrite propostos.
- Testar Home, âncoras, mapa, reviews, estáticos e `/api/reviews`.
- Confirmar headers com `curl -I` no preview antes de promover.

### Lote 6 — histórico Git opcional

Apagar no HEAD não elimina blobs antigos. Reescrita com `git filter-repo`/BFG é migração destrutiva: exige autorização específica, backup, coordenação, force-push controlado e reclone de todos os colaboradores. Não faz parte da limpeza comum.

---

## 6. Critérios de aceite e rollback

Para cada lote:

- `git diff --check` sem erros;
- lint, unitários, build e auditoria demo aprovados;
- E2E de produção e demo aprovados ou bloqueio ambiental registrado, sem inventar contagem;
- manifesto de arquivos removidos sem referência residual;
- screenshots 390/1280 inspecionadas quando houver impacto visual;
- console, teclado, axe e overflow sem regressão;
- preview Vercel com API, redirects e headers verificados quando houver configuração;
- tamanho antes/depois registrado;
- backup verificado antes de remover qualquer original/evidência.

Rollback normal: `git revert <commit-do-lote>`. Se houver rewrite de histórico, usar o backup/mirror definido no Lote 0; não depender do histórico já reescrito.

---

## 7. Não remover

- `BEST_PLAN.MD`, `AGENTS.md`, `README.md` e lockfile;
- testes, configurações de Playwright/Vitest/ESLint e workflow de qualidade;
- `src/pages/demo/`, `src/data/menu.demo.js` e `scripts/audit-demo-leak.mjs`;
- `api/reviews.js`;
- `src/assets/map/liberty.json` e `pin-map.webp`;
- clips/posters em `src/assets/media/hero/`;
- as três fotos atualmente importadas pelo Hero/About;
- `logo-96.webp`, fontes públicas, OG, robots e sitemap;
- qualquer original ou evidência sem backup/decisão de retenção.

---

## 8. Decisões humanas pendentes

1. Onde serão guardados os masters, fotos originais e logos-fonte, com checksum e responsável?
2. Quais evidências finais de QA devem permanecer no Git?
3. O PNG de fundo continuará como fallback otimizado ou o suporte será WebP-only?
4. A produção acompanha `main` ou `BEST_ONE` para fins de CI?
5. Haverá apenas limpeza do tree ou também migração destrutiva do histórico?

## 9. Execução e auditoria do Lote 1 + preload — 30/08/2026

- **Estado:** Lote 1 implementado e auditado; aguardando revisão humana e merge.
- **Executado:** remoção de `hero-gallery.{jpg,webp}`; `.freebuff/` retirado do índice e preservado localmente; scratch `.kilo/` removido após confirmar a consolidação da Etapa 52; regras adicionadas ao `.gitignore`; catálogo de assets alinhado ao Hero/mapa atuais; preload trocado pelo poster inicial; PNG público residual do iFood removido sem afetar `ICON_IFOOD.png`.
- **Correção da auditoria:** dimensões do catálogo registradas na orientação visual (largura×altura), respeitando EXIF dos JPEGs verticais.
- **Inventário intermediário do primeiro commit de implementação:** 310 arquivos rastreados, 129.930.065 bytes (123,91 MiB); o fechamento abaixo registra a quinta remoção do lote.
- **Referências:** zero ocorrências ativas de `hero-gallery` em `src/`, `tests/`, `index.html` e `documentacao/ASSETS.md`; menções históricas foram preservadas.
- **Validação:** `npm run check` aprovado (lint, 25/25 unitários, build e `audit:demo-leak`); CI do PR aprovado, incluindo Playwright 40/40; `git diff --check` aprovado.
- **Preview Vercel:** Home respondeu 200; HTML publicou preload hasheado de `turquia-ambiente-poster.jpg`; poster respondeu 200 com `image/jpeg` e cache imutável; `/api/reviews` alcançou a função e respondeu JSON 502 `GOOGLE_PLACES_UNAVAILABLE`, confirmando que o catch-all não a mascarou e registrando a indisponibilidade externa.
- **Fechamento do Lote 1:** todos os órfãos de alta confiança autorizados foram tratados; a remoção final reduziu o índice de 310 para 309 arquivos e eliminou mais 24.755 bytes de asset público.
- **Pendente no plano:** Lotes 0, 2, 3, 4, 5 e 6, além da medição de LCP/Network do preload. Por isso, **o plano de limpeza não está finalizado e este arquivo não deve ser arquivado ainda**.

**Estado geral:** Lote 1 fechado e auditado; plano geral ativo até concluir ou deliberadamente encerrar os demais lotes.
