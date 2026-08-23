# Etapa 52 — Correção do mapa: restaurar mapa vetorial MapLibre + correções

## Objetivo

Restaurar o mapa vetorial **MapLibre GL** (estado do commit `321e256`, o último em que o mapa estava próximo do ideal, segundo o responsável) e aplicar três correções solicitadas:

1. **Contorno do parque** — a linha vermelha que circula o "Parque Céu Aberto Parque Nanci" cruza a área (anel com aresta interna cortando o polígono).
2. **Label do parque** — posicionar o nome mais abaixo da área e destacá-lo mais.
3. **Enquadramento do mapa** — Pin da localidade **não** no centro, mas mais para baixo (terço inferior), revelando e destacando o **Retorno da rodovia (RJ-106)**, que hoje quase não aparece e não é destacado.

**Contexto:** as Etapas 49–51 substituíram o mapa vetorial por iframe OSM (decisão superada). O working tree atual contém uma reversão parcial e inconsistente (re-adiciona `maplibre-gl ^4.7.1` sem lockfile, CSS órfão, e reverte o bbox do iframe) — nada disso deve ser aproveitado como base; o trabalho parte do HEAD limpo e restaura a implementação MapLibre de `321e256`.

## Autorização do responsável (21/08/2026)

O responsável solicitou explicitamente: **registrar a Etapa 52 no `BEST_PLAN.MD` como próxima etapa, commitar e fazer push**. Autorização registrada para as ações finais do lote (documentação + commit + push). Ver seção "Registro e Git".

## Estado do Git (confirmado antes de aplicar)

- `git fetch origin main --prune` executado: **local `main` == `origin/main` == `899a5e1`**.
- **PULL: NÃO necessário** (sincronizado; nada a receber).
- **PUSH: autorizado pelo responsável após o commit** (nenhum commit local à frente de `origin/main` antes de começar).
- Working tree sujo (3 arquivos não commitados: `package.json`, `src/components/location/MapEmbed.jsx`, `src/styles/index.css`) — **serão sobrescritos/descartados** pela restauração correta.

## Arquivos-fonte (fontes de verdade)

- `321e256:src/components/location/MapEmbed.jsx` — implementação MapLibre completa (lazy loading, pin, fallback, CTA, atribuição).
- `321e256:tests/business-info.test.jsx` e `321e256:tests/e2e/site.spec.js` — contrato de testes do mapa vetorial (role=img, sem iframe, sem bloqueio OSM).
- `src/assets/map/liberty.json` (estado atual do HEAD) — base para as correções: já contém `park-nanci-contour` (fonte GeoJSON `parque-nanci-area` A+B), `poi-park-nanci` ("Parque\nNanci"), `highway-name-rj106`, `park_outline` removido (Etapa 50).
- `src/assets/images/location/pin-map.webp` — presente no repo.
- Assets MapLibre (worker CSS etc.): `maplibre-gl@^6.4.0` (versão usada em `321e256`/Etapa 44; **não** `^4.7.1`).

## Passos

### 1. Restaurar dependência e código MapLibre

- `package.json` + `package-lock.json`: adicionar `maplibre-gl: ^6.4.0` (instalar com o gerenciador do projeto; lockfile coerente).
- `src/components/location/MapEmbed.jsx`: restaurar a implementação MapLibre de `321e256` (arquivo integral), mantendo comentários, lazy loading via IntersectionObserver, `?qa=1` para `preserveDrawingBuffer`, fallback de erro e CTA "Abrir rota".
- `src/styles/index.css`: restaurar `.map-embed-canvas`, `.map-embed-canvas .maplibregl-canvas` e `.map-pin-marker` (conferir conteúdo idêntico ao de `321e256`; remover qualquer resíduo do iframe OSM que não seja usado).

### 2. Correção 1 — contorno do parque sem linha cruzando

- `src/assets/map/liberty.json` → fonte `parque-nanci-area`: o anel do polígono B tem uma aresta que corta o interior (vértice `-42.84802079,-22.92307133` → `-42.84737169,-22.92218692` → ...), gerando a linha que cruza a área.
- Corrigir a **ordem dos vértices** para que cada anel siga o contorno externo real sem arestas internas, ou re-extrair a geometria dos tiles via `querySourceFeatures` (mesma técnica da reabertura da Etapa 48, script `extract-park-rings.mjs`).
- **Proibido inventar geometria**: qualquer coordenada vem dos tiles reais. Nenhuma área nova é desenhada.
- Aceite visual: linha vermelha contorna o parque sem cruzar o interior (inspeção de pixels).

### 3. Correção 2 — label do parque mais abaixo e destacado

- `src/assets/map/liberty.json` → camada `poi-park-nanci`:
  - Empurrar o label para **baixo da área** (aumentar `layout.text-offset` em y e/ou ajustar `text-anchor`), de modo que o texto fique abaixo do polígono, não sobre o interior.
  - Destacar mais: aumentar `layout.text-size` (ex.: 13 → 15), manter/endurecer halo (`paint.text-halo-width` ex.: 2 → 3) e `text-allow-overlap: true` preservado.
- Aceite visual: "Parque Nanci" legível e abaixo da área verde em 390 e 1280 px.

### 4. Correção 3 — enquadramento (pin no terço inferior) + Retorno da RJ-106

- `MapEmbed.jsx`:
  - Deslocar `MAP_CENTER` para o **norte** do pin (ex.: `[-42.8479579, ~-22.9185]`) e/ou reduzir `MAP_ZOOM` (ex.: 14.2 → ~13.8–14.0) para que o pin fique no terço inferior do frame e a RJ-106 (com o Retorno, ao norte) entre no enquadramento.
  - Calibrar com capturas reais em 390 e 1280 px; registrar os valores finais.
- `src/assets/map/liberty.json` → **destacar o Retorno**: primeiro **identificar nos tiles** a feature do Retorno (via `queryRenderedFeatures`/`querySourceFeatures`: classe trunk/ramp/`link` da RJ-106 na região), depois estilizar o trecho real (ex.: camada dedicada com cor/largura de destaque ou reforço do `highway-name-rj106`). **Sem geometria inventada** — somente estilo sobre features existentes.

### 5. Testes (contrato MapLibre)

- `tests/business-info.test.jsx`: restaurar a asserção do mapa vetorial de `321e256` (`role=img`, sem iframe, sem link de embed OSM). Demais testes intactos.
- `tests/e2e/site.spec.js`: remover o `beforeEach` que bloqueia tráfego OSM e voltar a `waitUntil: 'networkidle'` (MapLibre não gera tráfego externo persistente); restaurar o teste de Localização para o contrato vetorial (sem iframe, `role=img` visível). Conferir diff com `321e256`.

### 6. Validação

- [ ] `npm install` (lockfile coerente, `maplibre-gl@^6.4.0`)
- [ ] `npm run lint`
- [ ] `npm run test` (testes unitários verdes)
- [ ] `npm run build` (+ `audit:demo-leak` sem vazamento)
- [ ] `npm run check`
- [ ] `npm run test:e2e` (36/36, desktop + mobile, axe sem críticas/sérias)
- [ ] `npm audit --audit-level=high` (0 vulnerabilidades)
- [ ] `git diff --check`
- [ ] MD5 do logo idêntico (`b8bfb19a…` / `77fa9b36…`)
- [ ] Screenshots 390 e 1280 px em `documentacao/qa/etapa-52/` comprovando: contorno sem cruzamento, label abaixo da área, pin no terço inferior, Retorno RJ-106 visível/destacado
- [ ] Contraste AA, foco visível, `prefers-reduced-motion` preservados

### 7. Registro e Git

- Registrar **Etapa 52** no `BEST_PLAN.MD` como próxima etapa (objetivo, decisão de reverter Etapas 49–51, arquivos, correções, validação, ressalvas) **no mesmo commit**.
- **Commit específico e descritivo.**
- **Push autorizado pelo responsável** (21/08/2026). Governança padrão (branch + PR) permanece como recomendação documental, mas o push direto foi autorizado para este lote, a critério do executor — similar às Etapas 50/51.

## Fora de escopo

- Dados comerciais, fotografias, review, iFood/WhatsApp/Instagram (não relacionados ao mapa).
- Alterar CTA "Abrir rota", atribuição legal, Header/Footer/BottomNavBar.
- Introduzir bibliotecas além do `maplibre-gl` já usado em `321e256`.
- Refatorar o `liberty.json` além das correções acima.

## Riscos

- **Geometria do parque**: se os anéis corretos não forem reproduzíveis dos tiles atuais (snapshot pode mudar), registrar a limitação e manter o anel mais fiel disponível; não desenhar área aproximada inventada.
- **Retorno RJ-106**: se não houver feature dedicada de "Retorno" nos tiles, destacar o trecho real da trunk próximo ao ponto identificado e documentar a decisão.
- **Regressão de bundle**: `maplibre-gl` volta ao bundle lazy (chunk separado, fora do inicial) — conferir que o lazy loading do `321e256` é preservado.

## Rollback

Reverter o commit único da Etapa 52 (retorna ao iframe OSM de `899a5e1`); ou, se aprovado em PR, reverter o merge.
