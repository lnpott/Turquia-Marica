# BEST_PLAN — Implantação principal

> **Registro operacional vigente.** Este arquivo controla etapas, estados, evidências e novas mudanças. O código e o Git atuais continuam sendo a fonte de verdade; o `Roadmap_Mestre_CLAUDE.md` permanece como histórico arquitetural.

## Controle operacional vigente

- **Branch de integração e produção:** `main` (`origin/main`).
- **Fluxo obrigatório:** atualizar `origin/main`, criar uma branch específica para o lote, validar, abrir PR para `main` e somente então fazer merge.
- **Baseline operacional atual:** `98d570e6b776c85c340421cb3c88a8343f00f544` (`PLANO 26`).
- **Baseline histórica inicial:** `d242ed12756e1aa02b3f4d8f502e5eba80f012f1`.
- **Início:** 12/08/2026
- **Regra:** atualizar este documento no mesmo commit de cada lote.
- **Estados:** `NÃO INICIADO`, `AGUARDANDO DECISÃO`, `BLOQUEADO`, `EM EXECUÇÃO`, `EM AUDITORIA`, `VALIDADO`, `CONCLUÍDO`.

## Baseline histórica validada — 12/08/2026

> Os dados desta tabela registram o ponto de partida e não representam o estado operacional atual. A auditoria consolidada atual está em `documentacao/qa/AUDITORIA_LOTES_21_26.md`.

| Item | Evidência | Estado inicial |
|---|---|---|
| Build | Vite 5.4.21; 71 módulos; JS 200,81 kB (62,67 kB gzip); CSS 28,29 kB (5,90 kB gzip) | VALIDADO |
| Rotas publicadas | `/` = 200; `/cardapio` e `/localizacao` = 404 em acesso direto | BLOQUEADO |
| Descoberta | `robots.txt` e `sitemap.xml` = 404 | BLOQUEADO |
| iFood | URL genérica, sem loja oficial | NÃO DISPONÍVEL |
| WhatsApp | URL configurada retorna 404 | NÃO DISPONÍVEL |
| Maps e Instagram | Links respondem corretamente | DISPONÍVEL |
| Dados comerciais | Preços, endereço completo, telefone e horários não confirmados | EM CONSTRUÇÃO |
| Fotografias | Acervo provisório; há associações semânticas incorretas | EM CONSTRUÇÃO |

## Matriz técnica

| Área | Decisão |
|---|---|
| React/Vite/Tailwind | Manter stack e componentes compartilhados. |
| Rotas | Gerar HTML estático para `/`, `/cardapio/` e `/localizacao/`. |
| Dados ausentes | Exibir “NÃO DISPONÍVEL / EM CONSTRUÇÃO”; nunca inventar. |
| Imagens provisórias | Manter `alt` verdadeiro e comunicar a condição provisória sem badges repetitivos; nunca atribuir uma fotografia a um produto que ela não representa. |
| Home | Remover catálogo completo e apresentar até quatro destaques. |
| Cardápio | Exibir somente categorias com produtos; futuras categorias não são filtros. |
| SEO | Metadados estáticos por rota; schema local completo aguarda dados oficiais. |
| Performance | Hero sem slideshow; imagem semântica, dimensões reservadas e lazy load abaixo da dobra. |
| Design definitivo | Refinar agora a composição, hierarquia, ritmo, componentes e responsividade; fotografias e dados comerciais oficiais entram somente depois. |
| Experimentos | Analytics, avaliações, “aberto agora” e A/B ficam fora do escopo. |

## Etapas

| Etapa | Estado | Resultado esperado |
|---|---|---|
| 0. Documentação e governança | CONCLUÍDO | Plano vivo, roadmap vinculado e branch oficial registrada. |
| 1. Guardrails técnicos | VALIDADO | Ferramentas, CI e dependências compatíveis com Node 20 auditados. |
| 2. Recuperação operacional | VALIDADO | Rotas e dados honestos auditados. |
| 3. Conteúdo e fotografias | VALIDADO | Acervo provisório identificado e sinalizado; substituição aguarda acervo oficial. |
| 4. Home e cardápio | VALIDADO | Interface incremental auditada. |
| 5. Localização e acessibilidade | VALIDADO | Navegação, foco, axe e viewports de aceite auditados. |
| 6. SEO estático | VALIDADO | Metadados, `robots.txt` e `sitemap.xml` publicados e auditados. |
| 7. Performance | VALIDADO | Fontes locais, WebP e preload preservados após o build de produção. |
| 8. Limpeza do checkpoint | VALIDADO | Checkpoint técnico organizado e validado. |
| 9. Refinamento definitivo do design | CONCLUÍDO | Refatoração editorial, motion, evidências, validação integral e auditoria concluídos nos Lotes 21–26. |
| 10. Conteúdo comercial final | BLOQUEADO | Fotografias e informações oficiais entram após sua disponibilização e confirmação. |

## Critérios globais

- `npm run check`, `npm run build` e `git diff --check` aprovados.
- HTTP 200 e reload nas três rotas.
- Nenhum link falso, quebrado ou genérico.
- Nenhum preço, promoção, horário, endereço ou avaliação inventados.
- Nenhuma categoria interativa vazia.
- QA em 320, 390, 768, 1280 e 1440 px.
- Teclado, Escape, foco, zoom 200%, reduced motion e axe validados.
- Metadados distintos presentes no HTML bruto.
- Branch do lote sincronizada com `origin/main`; nenhuma implementação feita diretamente em `main`.

## Estado operacional consolidado

| Bloco | Estado vigente | Próxima ação |
|---|---|---|
| Lotes 0–13 e 15–20 | CONCLUÍDO/VALIDADO | Preservar como histórico; não reimplementar. |
| Lote 14 | BLOQUEADO | Abrir sublote somente quando cada dado ou asset oficial for entregue. |
| Lote 21 — Scroll reveal | CONCLUÍDO | IntersectionObserver nativo, stagger e reduced motion validados. |
| Lote 22 — Movimento ambiente no Hero | CONCLUÍDO | Zoom/deslocamento lento aprovado e desativado com reduced motion. |
| Lote 23 — Navegação | CONCLUÍDO | Preservar comportamento e revalidar no fechamento. |
| Lote 24 — Auditoria consolidada | CONCLUÍDO | E2E, axe, viewports, contrastes, overflow e BottomNavBar auditados. |
| Lote 25 — Fechamento/OG image | CONCLUÍDO | Imagem 1.200 × 630 regenerada a partir do Hero final. |
| Lote 26 — Arquitetura visual editorial | CONCLUÍDO | Refatoração implementada, corrigida e auditada com evidências permanentes. |

### Ordem operacional após a conclusão dos Lotes 21–26

1. Preservar a arquitetura editorial e as coberturas de motion/acessibilidade aprovadas.
2. Não iniciar novo refinamento visual sem um achado mensurável ou aprovação de direção.
3. Tratar os sublotes externos 14A–14F independentemente, conforme dados e fotografias oficiais forem disponibilizados.
4. Repetir `npm run check`, `npm run test:e2e`, axe, screenshots e `git diff --check` em todo novo lote perceptível.

## Registro por lote

### Plano total de refinamento visual — Lotes 11 a 14 (proposto por Claude)

> **Estado geral:** Lotes 11, 12, 13, 15, 16 e 17 CONCLUÍDOS; Lote 14 BLOQUEADO/PENDENTE. A execução continua lote a lote e exige autorização explícita antes de codar, antes de commit e antes de push, como já é regra no restante deste documento.

**Origem:** análise comparativa entre as branches `main` e `BEST_ONE` (repositório `lnpott/Turquia-Marica`), cruzada com os dois deploys Vercel (`turquia-marica.vercel.app` e o preview mais recente) e com as evidências visuais já existentes em `documentacao/qa/*-after.png`.

**Princípio geral que rege os 4 lotes:** nenhum deles reabre decisões já auditadas e aprovadas em `BEST_ONE` (Hero sem slideshow, honestidade radical de conteúdo, paleta/tipografia, `ChannelAction`/`BUSINESS_STATUS`). Todos são refinamentos dentro da linguagem visual já aprovada, não uma reversão para `main`.

---

#### Lote 11 — Consistência visual Home ↔ Cardápio

- **Estado:** CONCLUÍDO — implementação e auditoria aprovadas com ressalvas em 14/08/2026.
- **Prioridade:** Alta. É o problema mais visível encontrado.
- **Constatação:** `home-desktop-after.png` / `home-mobile-after.png` mostram `MenuHighlights` (Home) com cards de foto real, moldura preta 2px, sombra offset, selo "Imagem ilustrativa" — coerente com a linguagem *Modern Vernacular* do Lote 4. Já `cardapio-desktop-after.png` mostra que `/cardapio` usa um componente diferente (`MenuCatalog`), lista de texto puro com ícone `Construction`, sem fotografia nenhuma. A página que deveria ser o carro-chefe do catálogo parece mais provisória que a própria Home.
- **Causa técnica:** `src/pages/Menu.jsx` renderiza `<MenuCatalog />` em vez de `<MenuHighlights showAll />` (componente com foto, já existente e já aprovado, hoje usado só em `src/pages/Home.jsx`).
- **Implementação:**
  1. Em `Menu.jsx`, trocar `<MenuCatalog />` por `<MenuHighlights showAll />`.
  2. Ajustar apenas o copy do eyebrow/título dentro de `MenuHighlights` se necessário para fazer sentido fora do contexto Home (ex.: manter "Estrutura prevista" em vez de "Cardápio" quando `showAll` for true) — sem alterar tom, sem inventar dado comercial.
  3. Avaliar se `MenuCatalog.jsx` e a lista `menuHighlights` (subconjunto usado em `compact`) seguem necessários após a unificação; não remover arquivo sem confirmar que nada mais o importa.
- **Fora de escopo:** Hero (Home ou Cardápio), Footer, Header, Location, ContactCard, MapEmbed, tailwind.config.cjs, qualquer dado comercial novo, qualquer merge/cherry-pick de `main`.
- **Critério de aceite:** `npm run check` aprovado; `/cardapio` visualmente consistente com a Home em 390 e 1280 px; sem regressão nos testes E2E; screenshot antes/depois no padrão já usado em `documentacao/qa/`.
- **Resultado:** `MenuHighlights showAll` substituiu o catálogo textual preservando copy honesta, âncoras e foco dos hashes legados; `MenuCatalog.jsx`, sem consumidores restantes, foi removido. Auditoria em `documentacao/qa/AUDITORIA_LOTE_11.md` e evidências em `cardapio-lote-11-mobile.png` e `cardapio-lote-11-desktop.png`.
- **Ressalvas:** a sobreposição móvel da BottomNavBar foi tratada posteriormente no Lote 12; a dependência de fotografias oficiais permanece registrada no Lote 14.

---

#### Lote 12 — Correção de sobreposição da BottomNavBar (mobile)

- **Estado:** CONCLUÍDO — implementação e auditoria aprovadas em 14/08/2026.
- **Prioridade:** Alta. É um bug de layout, não uma preferência estética.
- **Constatação:** em `cardapio-mobile-after.png`, a `BottomNavBar` fixa corta visualmente a parte inferior da foto do hero (o burger) logo abaixo dela. Em `localizacao-mobile-after.png`, a mesma barra sobrepõe parte do card amarelo "Conferir ficha / Google Maps" do `MapEmbed`. O padding de segurança (`mobile-bottom-safe`, `src/styles/index.css`) cobre o fim da página, mas não evita que a barra `fixed` (`z-50`) cubra elementos posicionados logo acima dela na viewport, especialmente quando esses elementos têm forte peso visual (foto, CTA).
- **Implementação:**
  1. Levantar, viewport a viewport (375, 390, 414 px), quais seções ficam parcialmente cobertas pela `BottomNavBar` hoje — pelo menos Hero do Cardápio e card do mapa em Localização já são casos confirmados pelos screenshots existentes.
  2. Ajustar `margin-bottom`/`padding-bottom` ou breakpoint de altura dessas seções específicas para respeitar a altura real da barra (`min-h-[72px]` + safe-area), evitando que o conteúdo mais importante da seção fique embaixo dela.
  3. Não alterar a lógica ou os itens da própria `BottomNavBar.jsx` — o problema é de espaçamento de quem está por baixo, não da barra em si.
- **Fora de escopo:** redesenhar a barra, adicionar/remover itens de navegação, mudar z-index global.
- **Critério de aceite:** nenhuma foto de hero ou CTA principal parcialmente coberto pela barra em 375–414 px; screenshot mobile de `/cardapio` e `/localizacao` regenerado e comparado ao atual.
- **Resultado:** o Hero do Cardápio recebeu enquadramento móvel mais baixo e espaçamento compacto; a ação do mapa ganhou distância adicional da barra. Após revisão, a compensação passou a responder também à altura da viewport, e o teste cobre 375×667, 390×740 e 414×844 px por interseção real de retângulos.
- **Evidências:** `documentacao/qa/cardapio-lote-12-15-mobile.png`, `documentacao/qa/localizacao-lote-12-mobile.png` e auditoria consolidada em `documentacao/qa/AUDITORIA_LOTES_12_13_15.md`.

---

#### Lote 13 — Auditoria completa de consistência (Header, Footer, Localização)

- **Estado:** CONCLUÍDO — auditoria aprovada sem nova inconsistência bloqueante em 14/08/2026.
- **Prioridade:** Média. Nenhum problema concreto identificado ainda — este lote é para *confirmar* que não há outros furos como o do Lote 11, não para corrigir algo já sabido.
- **Escopo:** revisar `Header.jsx`, `Footer.jsx`, `BottomNavBar.jsx` e a rota `/localizacao` completa (`Location.jsx`, `ContactCard.jsx`, `MapEmbed.jsx`) contra os mesmos critérios do Lote 3 de `BEST_ONE` ("criar continuidade entre rotas: compartilhar grid, tratamentos de hero, seções, superfícies, raios, sombras, iconografia e CTAs").
- **Observação já feita:** pela inspeção de `localizacao-desktop-after.png` e `localizacao-mobile-after.png`, a página de Localização parece bem alinhada ao padrão visual (mesma tipografia, mesmas bordas/sombras, mesmo tom de "honestidade radical"). Não há indício de um problema do tamanho do Lote 11 aqui — mas isso ainda não foi auditado componente a componente com o mesmo rigor.
- **Implementação:** checklist de comparação visual e de código entre as três rotas + Header/Footer, registrando achados (se houver) como sub-itens deste lote antes de qualquer alteração de código.
- **Critério de aceite:** relatório de auditoria (achados ou "nenhuma inconsistência encontrada"), sem necessariamente gerar mudança de código — só vira lote de implementação se algo for encontrado.
- **Resultado:** Header, Footer, BottomNavBar, Location, ContactCard e MapEmbed foram conferidos em código e renderização. A única interferência concreta era a distância móvel da ação do mapa, corrigida e validada dentro do Lote 12; nenhum redesenho adicional foi necessário.
- **Evidência:** `documentacao/qa/AUDITORIA_LOTES_12_13_15.md`.

---

#### Lote 14 — Pendências externas (bloqueadas, fora do controle do agente)

- **Estado:** BLOQUEADO — PENDENTE dos dados e do acervo oficiais listados abaixo.
- **Prioridade:** Depende do cliente, não é sequencial aos demais.
- **Itens (já registrados em "Pendências externas" mais abaixo neste documento, repetidos aqui para consolidar o plano):**
  - URL oficial da loja no iFood.
  - Telefone/WhatsApp válido.
  - Endereço completo e CEP.
  - Horários oficiais.
  - Produtos, ingredientes, preços e badges aprovados.
  - Fotografias oficiais da casa e dos produtos (substituindo o acervo "ilustrativo" atual).
- **Regra:** nenhum destes itens deve ser inventado ou estimado por qualquer agente. Quando o cliente confirmar algum deles, abrir lote específico (ex.: "Lote 15 — CTA iFood oficial") em vez de misturar com os lotes 11–13 acima.

---

#### Lote 15 — Precisão semântica das imagens de categoria

- **Estado:** CONCLUÍDO — implementação e auditoria aprovadas com ressalva de acervo em 14/08/2026.
- **Prioridade:** Média-baixa. Não é erro visível como o Lote 11/12, mas é uma inconsistência de conteúdo que a própria `BEST_ONE` já penalizou em outro lugar (a baseline deste documento registra "associações semânticas incorretas" nas fotografias como pendência desde o início do projeto).
- **Constatação (verificada em `src/data/menu.js` e `src/assets/images/`):** existem só 4 imagens de menu distintas (`category-combos`, `menu-hero`, `category-sobremesas`, mais `hero-fries` e `hero-gallery` reaproveitadas do Hero) para 5 categorias declaradas (Combos, Lanches, Porções, Bebidas, Sobremesas). Dois reaproveitamentos merecem atenção:
  - `Bebidas` usa `hero-gallery.webp`, cujo `alt` original é "pessoas brindando com copos de cerveja" — é uma foto de ambiente/confraternização, não uma foto de bebida em si. Semanticamente mais fraca que as demais.
  - `Porções` usa `hero-fries.webp` (batata frita), que faz sentido, mas é a mesma imagem já usada no Hero da Home — repetição visual entre seções diferentes do site.
- **Implementação:**
  1. Levantar se existe no acervo atual alguma imagem melhor para "Bebidas" antes de decidir; se não existir, marcar explicitamente como pendência de acervo (Lote 14) em vez de manter uma foto semanticamente errada indefinidamente.
  2. Se nenhuma imagem alternativa existir no acervo local, considerar (com autorização) usar um placeholder visual mais neutro para "Bebidas" em vez de uma foto de pessoas, já que o problema aqui é a foto comunicar algo que não é o produto da categoria.
  3. Não adicionar nenhuma imagem nova de banco de imagens sem aprovação — isso ainda conta como "inventar conteúdo" pelas regras deste documento.
- **Critério de aceite:** cada categoria com imagem semanticamente compatível com o que anuncia, ou sinalizada como pendência de acervo explícita.
- **Resultado:** a fotografia de confraternização deixou de representar Bebidas e foi substituída por placeholder editorial neutro, rotulado “Imagem pendente de acervo”. As demais quatro associações são semanticamente compatíveis; a repetição de Porções no Hero permanece não bloqueante até a chegada do acervo oficial.
- **Evidências:** `documentacao/qa/cardapio-lote-12-15-mobile.png`, `documentacao/qa/cardapio-lote-15-desktop.png` e `documentacao/qa/AUDITORIA_LOTES_12_13_15.md`.

---

#### Lote 16 — Regenerar `og-image.png` após estabilização visual

- **Estado:** CONCLUÍDO — imagem regenerada e auditada em 14/08/2026.
- **Prioridade:** Baixa. Só faz sentido depois que os Lotes 11–13 (e 15, se executado) estiverem concluídos.
- **Constatação:** `public/og-image.png` é uma captura estática usada em compartilhamentos sociais (Open Graph/Twitter Card). Se o site mudar visualmente nos lotes acima, essa imagem fica desatualizada em relação à aparência real do site.
- **Implementação:** gerar novo `og-image.png` a partir do estado final da Home, uma única vez, depois que o restante do plano estabilizar — evita regenerar a imagem mais de uma vez à toa.
- **Critério de aceite:** `og-image.png` reflete a Home tal como publicada; validado no preview de compartilhamento (ex.: debugger de Open Graph).
- **Resultado:** `public/og-image.png` foi regenerado a partir da Home final em viewport 1.200×630, preservando marca, tagline aprovada, direção visual e fotografia ilustrativa. O E2E valida publicação, MIME, dimensões e referências Open Graph/Twitter.
- **Evidência:** `documentacao/qa/AUDITORIA_LOTES_16_17.md` e o próprio `public/og-image.png`.

---

#### Lote 17 — Decisão de copy/tagline do Hero (decisão do cliente, não de design)

- **Estado:** CONCLUÍDO — tagline da `BEST_ONE` confirmada explicitamente pelo responsável em 14/08/2026.
- **Prioridade:** Não sequencial — depende de quem decide o tom da marca, não da equipe de implementação.
- **Constatação:** a branch `main` usa a tagline "Fome de Leão? Lanche Especial." enquanto `BEST_ONE` usa "Turquia Lanches. Fartura sem pose." São duas direções de copy diferentes, não uma evolução técnica uma da outra. Nenhum dos Lotes 11–16 deste plano mexe nisso.
- **Risco se não for tratado explicitamente:** a tagline de `BEST_ONE` pode ser tratada como "decidida" só por ser a que está no ar, sem que o responsável pela marca tenha de fato validado a escolha entre as duas.
- **Implementação:** não é tarefa de código. É confirmar com o responsável do projeto/cliente qual tagline (ou uma terceira) representa melhor a marca, e só então tratar como aprovada.
- **Critério de aceite:** confirmação explícita registrada neste documento (Changelog) antes de considerar a tagline atual como definitiva.
- **Resultado:** mantida como definitiva a copy “Turquia Lanches. Fartura sem pose.”, já presente no Hero da `BEST_ONE`; nenhuma alteração de código foi necessária.
- **Evidência:** decisão do responsável registrada no Changelog e auditoria em `documentacao/qa/AUDITORIA_LOTES_16_17.md`.

---

### Ordem de execução histórica — Lotes 11 a 17

1. **Lote 11** (consistência Home ↔ Cardápio) — maior impacto visual, menor risco, já com solução clara.
2. **Lote 12** (BottomNavBar sobrepondo conteúdo) — bug real, independente do Lote 11, pode ser feito em paralelo ou logo em seguida.
3. **Lote 13** (auditoria Header/Footer/Localização) — preventivo; só vira trabalho de código se achar algo.
4. **Lote 15** (precisão semântica das imagens) — pode ser feito junto com o 13, é de baixo risco mas depende de acervo disponível.
5. **Lote 16** (regenerar og-image) — só ao final, depois que a aparência estabilizar.
6. **Lote 17** (tagline) — paralelo, não bloqueia nem é bloqueado pelos demais; corre em paralelo como pendência de decisão do cliente.
7. **Lote 14** — não é um lote de trabalho nosso; é a lista do que travar até o cliente responder.

---

### Plano de motion e interatividade — Lotes 18 a 25 (proposto por Claude)

> **Estado geral:** Lotes 18 a 25 CONCLUÍDOS e auditados. Mandato ampliado pelo responsável em 14/08/2026: impacto visual real prevalece sobre "menor mudança possível"; a única linha vermelha adicional é preservar o logo (`logo.jpg`/`logo-96.webp`) intocado. As linhas vermelhas anteriores (nenhum dado comercial inventado) continuam valendo.

**Origem:** auditoria do código real da `BEST_ONE` (não de screenshots), motivada pela avaliação do responsável de que a arquitetura visual, apesar de madura, está "pouco chamativa para o cliente comprar a ideia" — falta motion e interatividade, não menos avisos de "em construção".

**Achados centrais da auditoria:**
- `src/components/ui/Button.jsx` e `src/components/product/CategoryCard.jsx` já implementam boa parte do motion pedido (`active:scale-95`, `group-hover:scale-110`), mas **nenhum dos dois é importado em lugar nenhum do projeto** — código órfão.
- Os CTAs e cards realmente renderizados (`HeroSection.jsx`, `MenuHighlights.jsx`, `Location.jsx`, `Header.jsx`) usam só `hover:-translate-y-1`, sem preenchimento, sem zoom de imagem, sem feedback de clique.
- Não existe token de motion compartilhado em `tailwind.config.cjs`, nem estado ativo no `NavLink` do `Header.jsx`.
- `prefers-reduced-motion` já é respeitado em `src/styles/index.css` (~linha 206) e deve continuar sendo o único bloco usado para desativar motion novo.

**Princípio geral que rege estes lotes:** nenhum deles reabre decisões já auditadas e aprovadas em `BEST_ONE` (Hero sem slideshow, honestidade radical de conteúdo, paleta/tipografia, `ChannelAction`/`BUSINESS_STATUS`, nenhum dado comercial inventado). Não instalar nenhuma biblioteca de animação nova — motion em CSS/Tailwind puro ou `IntersectionObserver` nativo, para preservar o bundle atual (62,67 kB gzip de JS).

---

#### Lote 18 — Sistema de motion compartilhado (fundação)

- **Estado:** CONCLUÍDO — tokens `tactile` (160 ms), `smooth` (420 ms) e `reveal` (700 ms), com easings correspondentes, registrados no Tailwind e auditados.
- **Prioridade:** Alta — pré-requisito dos Lotes 19, 20, 21 e 23.
- **Constatação:** não há nenhum token de `transitionDuration`/`transitionTimingFunction` em `tailwind.config.cjs`; as poucas transições existentes usam valores soltos e inconsistentes (`duration-300` em `MapEmbed.jsx`, `duration-500` em `CategoryCard.jsx` órfão, a maioria sem duração explícita).
- **Implementação:** definir em `tailwind.config.cjs` 2–3 tokens nomeados de duração/easing (tátil/rápida para clique e hover de botão; suave/média para cards e imagens; lenta para entrada de seção) e documentá-los aqui para os lotes seguintes referenciarem por nome. Não aplicar a nenhum componente ainda.
- **Fora de escopo:** qualquer mudança visível ao usuário.
- **Critério de aceite:** `npm run check` aprovado; tokens documentados; zero regressão visual.

---

#### Lote 19 — Botões com preenchimento, profundidade e clique tátil

- **Estado:** CONCLUÍDO — CTAs reais usam tokens compartilhados, preenchimento progressivo, profundidade e resposta tátil; `Button.jsx` passou a ter consumidores reais.
- **Prioridade:** Alta — pedido explícito do responsável.
- **Constatação:** `Button.jsx` já tem hover/clique bem resolvidos (`hover:shadow-lg hover:scale-[1.02] active:scale-95`) mas está órfão. Os CTAs reais em `HeroSection.jsx` (~linhas 24 e 32), `Location.jsx` (~linha 25), `Header.jsx` (~linhas 75 e 87) e `Footer.jsx` (~linha 7) têm apenas `hover:-translate-y-1`, sem `active:` em nenhum.
- **Implementação:** levar `Button.jsx` aos tokens do Lote 18, adicionar preenchimento animado no hover dos botões primários (não troca instantânea de cor) e propagar `active:` para todo CTA real, substituindo classes inline por `<Button>` onde fizer sentido.
- **Fora de escopo:** mudar texto, destino ou hierarquia (primário/secundário) de qualquer CTA.
- **Critério de aceite:** todo CTA do site com hover de preenchimento e resposta ao clique; `axe` sem novas violações; preenchimento desativado (mas cor final mantida) com `prefers-reduced-motion`.

---

#### Lote 20 — Zoom de imagem nos cards de categoria

- **Estado:** CONCLUÍDO — zoom contido de 105% aplicado em `MenuHighlights`; `CategoryCard.jsx` órfão foi removido para evitar implementações concorrentes.
- **Prioridade:** Alta — pedido explícito do responsável ("imagem passando").
- **Constatação:** o efeito já existe pronto em `CategoryCard.jsx` (`group-hover:scale-110 transition-transform duration-500`), órfão. O card real, em `MenuHighlights.jsx` (~linha 38, usado em Home e Cardápio via prop `showAll`), tem `group` e `overflow-hidden` no contêiner da imagem, mas a `<img>` não tem `group-hover`.
- **Implementação:** adicionar `group-hover:scale-110` (ou valor mais sutil, 105–110%) na `<img>` de `MenuHighlights.jsx`, usando a duração `smooth` do Lote 18. Após validar, decidir e registrar aqui se `CategoryCard.jsx` é removido ou mantido.
- **Fora de escopo:** alterar selo "Imagem ilustrativa", texto "Não disponível / em construção" ou trocar qualquer imagem.
- **Critério de aceite:** zoom suave e contido na moldura, em Home e Cardápio, testado em 390 e 1280 px, sem overflow.

---

#### Lote 21 — Scroll reveal (conteúdo entra ao rolar)

- **Estado:** CONCLUÍDO — reveal nativo implementado, auditado e coberto por reduced motion/E2E.
- **Prioridade:** Média-alta.
- **Constatação:** não existe `IntersectionObserver` no projeto; todo conteúdo abaixo do Hero aparece de uma vez, em Home, Cardápio e Localização.
- **Implementação:** hook nativo baseado em `IntersectionObserver` (sem biblioteca nova); entrada sutil (fade + leve translação) nas seções, em cascata nos cards de categoria; dentro do bloco `prefers-reduced-motion` já existente, conteúdo aparece direto.
- **Fora de escopo:** qualquer biblioteca externa de animação.
- **Critério de aceite:** Lighthouse Performance não regride (baseline 96 mobile/Cardápio); `axe` sem violações; validado com `prefers-reduced-motion: reduce` ativo no sistema.

---

#### Lote 22 — Movimento ambiente no Hero

- **Estado:** CONCLUÍDO — variante de zoom/deslocamento ambiente lento aprovada, implementada e auditada.
- **Prioridade:** Média-alta.
- **Constatação:** `HeroSection.jsx` renderiza a foto do Hero 100% estática, sem Ken Burns, parallax ou elemento decorativo animado (diferente de `MapEmbed.jsx`, que já anima um círculo decorativo).
- **Decisão a apresentar ao responsável, não a tomar sozinho:** (A) Ken Burns lento e contínuo na foto; (B) parallax leve entre a foto e a camada decorativa já existente (`before:` em `HeroSection.jsx` ~linha 37); (C) textura/forma flutuante sutil atrás da imagem. Implementar só a opção escolhida.
- **Fora de escopo:** trocar a foto do Hero ou adicionar carrossel/slideshow — decisão já registrada neste documento (Matriz técnica: "Hero sem slideshow").
- **Critério de aceite:** movimento perceptível mas não distrativo; desativado com `prefers-reduced-motion`; sem impacto no LCP (baseline 2,5 s).

---

#### Lote 23 — Estado ativo e sublinhado animado na navegação

- **Estado:** CONCLUÍDO — Header desktop/mobile identifica a rota atual com cor e sublinhado; o hash `/#sobre` é tratado sem falso estado ativo na raiz.
- **Prioridade:** Média.
- **Constatação:** `Header.jsx` usa `NavLink`, mas `linkClasses` (~linha 15) é uma string fixa — a rota atual não recebe nenhum destaque visual no menu.
- **Implementação:** usar a função de `className` do `NavLink` para aplicar estado ativo (cor + sublinhado animado via `transform: scaleX`) com os tokens do Lote 18, em desktop e mobile, sem alterar a lógica de foco/teclado já existente no menu mobile.
- **Fora de escopo:** mudar itens do menu ou adicionar novo item de navegação.
- **Critério de aceite:** rota atual identificável no Header; teclado e `focus-visible` continuam funcionando sem regressão.

---

#### Lote 24 — Auditoria de performance e acessibilidade do motion

- **Estado:** CONCLUÍDO — auditoria consolidada registrada em `documentacao/qa/AUDITORIA_LOTES_21_26.md`.
- **Prioridade:** Alta, sequencial aos demais.
- **Constatação:** motion mal implementado é a causa mais comum de regressão de Lighthouse (CLS/TBT) e de `prefers-reduced-motion` ignorado; baseline atual é Performance 96, Acessibilidade 100, Boas Práticas 100, SEO 100, LCP 2,5 s, CLS 0, TBT 30 ms.
- **Implementação:** reexecutar Lighthouse mobile nas três rotas e comparar contra a baseline; confirmar via `axe` que nenhum elemento interativo novo ficou sem `focus-visible`; validar manualmente, com `prefers-reduced-motion: reduce` ativo no sistema operacional, que todo motion dos Lotes 19–23 é desativado ou reduzido.
- **Fora de escopo:** qualquer mudança de código além de correções de performance encontradas na auditoria.
- **Critério de aceite:** métricas de baseline mantidas ou melhores; relatório registrado em `documentacao/qa/AUDITORIA_LOTES_18_23.md`.

---

#### Lote 25 — Fechamento: regenerar `og-image.png`

- **Estado:** CONCLUÍDO — `og-image.png` regenerada em 1.200 × 630 a partir do Hero final.
- **Prioridade:** Baixa.
- **Constatação:** `public/og-image.png` foi regenerado no Lote 16 a partir da Home sem motion; a imagem estática de fallback social precisa continuar fiel ao layout final.
- **Implementação:** regenerar `og-image.png` uma única vez, no padrão do Lote 16 (1.200×630 px), a partir do estado final da Home.
- **Critério de aceite:** imagem reflete o layout final; validada em debugger de Open Graph.

---

### Ordem de execução histórica — Lotes 18 a 25

> Esta ordem registra a sequência originalmente planejada. Para qualquer trabalho novo, prevalece a “Ordem operacional obrigatória a partir de `98d570e`”.

1. **Lote 18** — fundação de tokens; pré-requisito dos demais.
2. **Lote 19 + Lote 20 + Lote 23** — maior impacto/menor risco, podem correr em paralelo depois do 18.
3. **Lote 21** — depende só do 18, independente de 19/20/23.
4. **Lote 22** — só depois da decisão de direção do responsável.
5. **Lote 24** — obrigatório, valida que nada regrediu.
6. **Lote 25** — sempre por último.

### Lote 0 — Governança

- **Estado:** CONCLUÍDO
- **Mudanças:** criação deste registro e vínculo no roadmap.
- **Evidências:** branch `BEST_ONE` limpa e sincronizada com `origin/BEST_ONE` no baseline.
- **Rollback:** reverter somente o commit documental.

### Lote 1 — Checkpoint funcional para implantação

- **Estado:** VALIDADO.
- **Commit de implementação:** `4678a39` (`feat(site): publish incremental recovery checkpoint`).
- **Escopo implementado:** guardrails de qualidade, HTML estático para as três rotas, dados comerciais com status, canais inválidos desativados, conteúdo provisório sinalizado, Home e Cardápio sem ofertas inventadas, localização funcional, melhorias de teclado e foco, SEO por rota, limpeza de exports históricos e otimizações de imagens e fontes.
- **Performance implementada:** fontes locais WOFF2, imagens ativas em WebP com fallback JPEG, preload dos heróis e logo reduzido para 96×96.
- **Última evidência disponível antes do checkpoint:** `npm run check` aprovado, com ESLint, 3 testes unitários e build Vite; Lighthouse móvel do Cardápio com Performance 96, Acessibilidade 100, Boas Práticas 100, SEO 100, LCP 2,5 s, CLS 0 e TBT 30 ms.
- **Correção da auditoria:** `jsdom` e `@testing-library/jest-dom` foram fixados em linhas compatíveis com Node 20; as versões anteriores exigiam Node 22 e impediam a execução do Vitest.
- **Evidência final:** `npm run check` (ESLint, 3 testes unitários e build), `npm run test:e2e` (10 testes em Chromium desktop e mobile), `npm audit` (zero vulnerabilidades), `git diff --check`, HTTP 200 nas três rotas e nos arquivos de descoberta, reload direto, axe sem violações críticas/sérias e ausência de overflow em 320, 390, 768, 1280 e 1440 px.
- **Inspeção visual:** Home em 390 px, Cardápio em 1280 px e Localização em 390 px revisados sem regressões visuais bloqueantes.
- **Próximo passo:** aguardar os dados comerciais e o acervo oficial listados em pendências externas; não substituir os estados honestos por informações presumidas.
- **Rollback:** reverter o commit deste checkpoint na branch `BEST_ONE`.

### Lote 2 — Contrato de runtime e cobertura de aceite

- **Estado:** VALIDADO.
- **Motivação:** transformar a compatibilidade com Node 20 corrigida no lote anterior em um contrato verificável, evitando que a CI valide somente uma versão diferente da usada no ambiente operacional.
- **Mudanças:** faixa Node `>=20.19` declarada no pacote, Node 20.20.2 registrado em `.nvmrc` e CI executada em matriz Node 20/22.
- **Cobertura adicionada:** canonicals e descriptions por rota, publicação e conteúdo de `robots.txt`/`sitemap.xml`, e desativação da animação de entrada com `prefers-reduced-motion`.
- **Evidências:** `npm run check`, 14 testes E2E nos projetos desktop/mobile, `npm audit` e `git diff --check` aprovados.
- **Rollback:** reverter o commit deste lote sem alterar o checkpoint funcional.

### Lote 3 — Auditoria e plano de design definitivo

- **Estado:** CONCLUÍDO — auditoria e direção visual executadas pelos Lotes 4, 5 e 6, todos posteriormente auditados e aprovados com as respectivas ressalvas.
- **Constatação:** os lotes anteriores recuperaram e validaram uma interface incremental, mas não executaram o refinamento definitivo do design. A restrição anterior que deixava redesign fora do escopo foi removida.
- **Fonte de verdade:** `documentacao/qa/AUDITORIA_DESIGN_DEFINITIVO.md` registra problemas, direção, sequência de trabalho e critérios de aceite.
- **Ordem obrigatória:** primeiro concluir e aprovar estrutura visual, hierarquia, ritmo, componentes e responsividade das três rotas usando conteúdo provisório honesto; somente depois substituir fotografias e preencher dados comerciais.
- **Próximo lote de implementação:** fundar a linguagem visual compartilhada e refinar Home; em seguida Cardápio, Localização e navegação global; por fim executar QA visual comparativo.
- **Regra de conclusão:** a etapa 9 não pode ser marcada `VALIDADO` ou `CONCLUÍDO` apenas porque build, axe e testes passam; exige inspeção visual documentada em mobile e desktop e aprovação explícita do resultado.
- **Rollback:** reverter o lote visual correspondente sem remover esta auditoria.

### Lote 4 — Fundação visual e Home

- **Estado:** CONCLUÍDO — aprovado pelo responsável em 13/08/2026, com ressalvas futuras registradas.
- **Direção aplicada:** linguagem editorial de lanchonete de bairro com contraste alto, grid gráfico, tipografia mais expressiva, bordas firmes, sombras deslocadas e uso intencional de amarelo, vermelho e preto.
- **Componentes refinados:** Header com assinatura nominal, menu mobile de alto contraste, BottomNavBar com separação mais firme e Footer convertido em encerramento escuro de marca.
- **Home refinada:** hero recomposto, mensagem simplificada, informações rápidas integradas, categorias com tratamento compartilhado e bloco institucional convertido em encerramento editorial.
- **Evidência visual:** `documentacao/qa/home-mobile-after.png` (390 px) e `documentacao/qa/home-desktop-after.png` (1280 px), comparáveis aos registros anteriores sem sufixo `after`.
- **Evidência técnica:** `npm run check` e 14 testes E2E aprovados; nenhum overflow nos viewports de aceite e axe sem violações sérias/críticas.
- **Correções da auditoria:** excesso de amarelo removido da primeira dobra, marca recolocada no início da hierarquia do Hero e estado inativo de pedidos rebaixado no Header. Relatório completo em `documentacao/qa/AUDITORIA_LOTE_4.md`.
- **Ressalvas não bloqueantes:** substituir fotografias; reavaliar cards, sombras e enquadramentos com o acervo real; revisar interferência da BottomNavBar apenas se a foto oficial exigir.
- **Rollback:** reverter este lote preservando a auditoria e os screenshots de referência anteriores.

### Lote 5 — Cardápio

- **Estado:** CONCLUÍDO — auditoria independente aprovada com ressalvas em 13/08/2026; nenhum P0 ou P1 remanescente.
- **Objetivo:** descoberta rápida e mobile-first, preparando produto, preço e pedido sem inventar conteúdo ausente.
- **Mudanças finais:** Hero compacto e honesto; CTA para lista condensada de categorias previstas; indisponibilidade consolidada; filtros vazios, atalhos redundantes e fotografias repetidas omitidos.
- **Acessibilidade:** CTA nativo por âncora, hashes legados preservados com foco no acesso direto/reload, foco visível e reduced motion preservados.
- **Evidência visual:** `documentacao/qa/cardapio-mobile-after.png` (390 px) e `documentacao/qa/cardapio-desktop-after.png` (1.280 px), com comparação mobile anterior em `cardapio-mobile-390.png`.
- **Auditoria:** a primeira versão media aproximadamente 3.151 px no mobile e simulava profundidade com cinco atalhos e cards repetitivos; foi condensada por falta de conteúdo distinto. Relatório em `documentacao/qa/AUDITORIA_CARDAPIO.md`.
- **Ressalva:** a utilidade atual é informar a estrutura prevista; descoberta de produtos, preço e pedido depende de conteúdo oficial.
- **Próximo passo:** parar após a auditoria; Localização não pode ser iniciada automaticamente.
- **Rollback:** reverter somente o commit deste lote.

### Lote 6 — Localização

- **Data da implementação:** 13/08/2026.
- **Data da auditoria independente:** 13/08/2026.
- **Estado:** CONCLUÍDO — APROVADO COM RESSALVAS.
- **Objetivo:** responder rapidamente onde fica, como abrir o destino disponível, qual a relação com Parque Nanci/Maricá e qual ação verificável o visitante pode executar.
- **Escopo auditado:** `fd96985..63a321b`; implementação `4709438` e documentação `63a321b`. Home e Cardápio não receberam mudanças estéticas nesse intervalo.
- **Rastreabilidade:** os três commits informados existem, foram produzidos por Codex, estão na ordem declarada e possuem as mensagens esperadas. `63a321b` altera somente este plano e o relatório da Localização.
- **Validade do Maps:** a URL curta retorna `302` para uma ficha específica intitulada `Turquia Lanches - Parque Nanci`, com coordenadas `-22.9219746,-42.8474819`. Isso comprova a existência técnica do destino e sustenta de forma provável a identidade/região; não comprova vínculo oficial, endereço postal, entrada exata nem precisão comercial das coordenadas.
- **Pesquisa:** o reverse geocoding do OpenStreetMap sustenta Parque Nanci/Maricá para a região das coordenadas, mas identifica outro ponto próximo e não confirma o negócio. O oEmbed do Instagram confirma a existência técnica de `@turquialanches`, não a propriedade oficial nem dados comerciais. A pesquisa web integrada retornou `401 Unauthorized`, limitação técnica que não prova ausência de informação pública.
- **Fatos usados:** marca vigente no projeto, região parcial Parque Nanci/Maricá, ficha específica do Google Maps e perfil informado `@turquialanches`.
- **Dados omitidos:** logradouro, número, CEP, horários, telefone/WhatsApp, atendimento, retirada, entrega, estacionamento, acessibilidade, ponto de referência e entrada exata.
- **Correções da auditoria:** removidas as expressões “ponto oficial”, “destino correto/verificado”, “rota exata” e “canal oficial”; a fotografia cartográfica, potencialmente confundível com mapa preciso, foi substituída por ilustração abstrata rotulada “não é um mapa”; o painel acionável foi afastado da BottomNavBar; estados passaram de “não publicados” para “não confirmados”; o Footer compartilhado passou a dizer “Canais disponíveis”, correção factual sem mudança estética.
- **Visual:** evidências anteriores confirmadas em 390 × 2.478 e 1.280 × 1.710 px. Evidências finais regeneradas em 390 × 2.470 e 1.280 × 1.530 px, sem overflow. A composição final preserva MARCA → LOCAL → ORIENTAÇÃO → CONTEXTO → AÇÃO.
- **Prioridades finais:** P0 nenhum; P1 nenhum após correções; P2 nenhum aberto; P3 permanecem a confirmação oficial do vínculo da ficha/perfil, precisão da entrada e dependência geral de JavaScript da SPA.
- **Testes:** `npm run check`, `npm run test:e2e`, `npm audit --audit-level=high`, `git diff --check`, HTTP/reload, console, axe, teclado, foco, reduced motion e viewports 320/360/390/768/1.280/1.440 foram repetidos após as correções.
- **Arquivos da auditoria:** `Location.jsx`, `MapEmbed.jsx`, `ContactCard.jsx`, `Footer.jsx` (texto factual compartilhado), testes, screenshots posteriores, esta seção e o relatório existente.
- **Pull Request:** checkout sem remote configurado; não há número, URL ou atualização remota verificável neste ambiente.
- **Commit final:** commit local específico desta auditoria, com mensagem `fix(location): align route claims with verified evidence`; hash registrado no Summary de entrega.
- **Ressalvas:** “Como chegar” abre a ficha específica, mas a precisão da entrada e a ação de iniciar rota não foram confirmadas como dados oficiais; validar novamente quando houver canal oficial acessível.
- **Pendências:** obter confirmação oficial de endereço/entrada, horários, telefone/WhatsApp, operação, estacionamento e acessibilidade; não inferir esses dados da coordenada da ficha.
## Plano de impacto visual e interação — Lotes 18 a 25 (consolidado)

> O plano detalhado duplicado desta seção foi arquivado para eliminar estados conflitantes. A seção “Plano de motion e interatividade — Lotes 18 a 25” e o “Estado operacional consolidado” são as referências vigentes. O changelog preserva a sequência histórica.

- **Concluídos:** Lotes 18, 19, 20 e 23.
- **Concluídos:** Lotes 21, 22, 24 e 25, consolidados com a auditoria do Lote 26.
- **Regra preservada:** nenhum motion adicional será implementado sem achado mensurável, reduced motion e auditoria de performance/acessibilidade.

## Lote 26 — Refatoração radical da arquitetura visual (Home, Cardápio, Localização)

- **Implementação:** CONCLUÍDA.
- **Auditoria visual independente:** CONCLUÍDA.
- **Validação automatizada:** CONCLUÍDA.
- **Aprovação do escopo solicitado:** REGISTRADA.
- **Estado final do lote:** CONCLUÍDO.

### Relação com os Lotes 18–25

O Lote 26 substitui as decisões estritamente visuais dos Lotes 18–23 quando houver conflito. Permanecem válidos os tokens compartilhados, `prefers-reduced-motion`, a resposta tátil dos CTAs, a indicação de rota ativa, a preservação do logo e a regra de não adicionar bibliotecas sem necessidade comprovada. Zoom de imagens, scroll reveal, movimento ambiente do Hero e imagem Open Graph foram reavaliados, implementados e aprovados na auditoria consolidada dos Lotes 21–26.

> Espelho de execução consolidado a partir do `CLAUDE.md` e do registro original. `BEST_PLAN.MD` continua sendo a fonte de verdade do histórico.

### Motivo da refatoração

Avaliação humana explícita do responsável, após os Lotes 18–23 (motion) implementados e aprovados tecnicamente: **"o resultado não ficou bom, não melhorou o suficiente e não atingiu a qualidade visual esperada."** O responsável determinou que ajustes incrementais (cor, espaçamento, sombra, animação) não são mais aceitáveis como resposta — autorizou desmontagem completa da arquitetura visual, preservando apenas rotas, comportamento funcional, dados reais, acessibilidade, SEO e o arquivo de logo.

### Problema visual identificado (auditoria de código real, branch `BEST_ONE`, commit `8466223`)

O site inteiro é construído sobre um único "kit de peças" repetido mecanicamente em praticamente todo elemento de interface:

- **Borda sólida de 2px em preto (`border-on-surface`) + sombra deslocada idêntica (`shadow-[Npx_Npx_0_#251913]` / `.brand-stamp`)** aplicada a badges, cards, botões, figuras e blocos de texto sem distinção — o mesmo tratamento gráfico usado para uma tag de localização, um card de categoria, a moldura do Hero e o CTA principal. Isso nivela tudo ao mesmo peso visual e elimina qualquer hierarquia real.
- **Amarelo (`secondary-container #fdc008`) usado como superfície dominante em badge após badge** — "Imagem ilustrativa" (5×), "Não disponível/em construção" nos cards, tag "Parque Nanci · Maricá", menu mobile inteiro com fundo amarelo. O brief é explícito: não usar amarelo como superfície dominante só por ser cor da marca. Confirmado como violação direta.
- **Vermelho (`primary #ae0011`) usado como fundo de blocos inteiros** (seção "Sobre a casa"), não como acento — isso é o padrão visual de rede de fast-food que o brief pede para evitar.
- **Composição sempre igual: título + parágrafo + botão dentro de retângulo com borda**, repetida no Hero, nos cards de categoria, no bloco institucional — zero variação de ritmo, zero momento de respiro tipográfico puro, zero composição assimétrica real (apesar do nome "editorial-grid", não há nada editorial na disposição, só grid utilitário de fundo).
- **Grade de 4–5 cards idênticos** como estrutura central tanto da Home quanto do Cardápio — é literalmente "sequência de cards porque é fácil de implementar", que o brief pede para não fazer.
- **Acervo de imagem inconsistente com a categorização**: `category-combos.jpg` é uma foto de premiação genérica com pessoas identificáveis (evento "Turquia Master"), sem relação com "Combos"; `category-sobremesas.jpg` mostra um hambúrguer, não sobremesa; `hero-gallery.jpg` mostra rostos identificáveis de pessoas reais brindando, inadequado como imagem de marca. `hero-fries` é reaproveitada entre Hero e categoria "Porções". Isso não será resolvido gerando imagem nova (fora de escopo sem autorização), mas a composição deixará de fingir relação editorial onde ela não existe — essas imagens serão tratadas como textura/ambiente, não como retrato de produto específico.

### Escopo

**Reconstrução completa de:**
- Sistema de tokens visuais (`tailwind.config.cjs`, `index.css`) — paleta reorganizada (vermelho vira acento raro, amarelo vira apoio quase-neutro, creme/branco como protagonista de espaço), tipografia com nova escala editorial, remoção do padrão borda+sombra deslocada como default.
- `Header.jsx` — navegação mais silenciosa, logo com mais presença própria sem depender de borda.
- `HeroSection.jsx` — nova composição, tipografia como elemento dominante, imagem tratada como pano de fundo textural em vez de "quadro emoldurado com etiqueta".
- `Home.jsx` — nova ordem/lógica de seções: marca → local → experiência → comida → ação (conforme brief), removendo blocos redundantes.
- `MenuHighlights.jsx` — abandono do grid de cards idênticos como estrutura única; nova forma de apresentar categorias sem simular profundidade/disponibilidade falsa.
- `Menu.jsx` (página Cardápio) — descoberta honesta e proporcional, sem grade decorativa de placeholders.
- `Location.jsx`, `ContactCard.jsx`, `MapEmbed.jsx` — recomposição visual mantendo CTA de rota funcional e honesto.
- `Footer.jsx`, `BottomNavBar.jsx` — ajuste ao novo sistema visual.
- Remoção de `.editorial-grid`, `.brand-stamp` e classes de sombra deslocada como padrão global, se substituídos por solução superior.

**Preservado (não é redesenhado):**
- Todas as rotas (`/`, `/cardapio`, `/localizacao`).
- `logo.jpg` / `logo-96.webp` — nenhuma edição de arte. Hash MD5 registrado antes da mudança:
  - `logo.jpg` → `b8bfb19a81b5e0b7d11863f2ed8c5c7a`
  - `logo-96.webp` → `77fa9b3692375171ea1c2b66438da98a`
- `data/contact.js`, `data/menu.js` como fonte de dados (conteúdo, não estrutura visual) — nenhum dado novo inventado.
- Lógica funcional de `ChannelAction.jsx`, `Badge.jsx`, `UnavailableNotice.jsx` (podem mudar de visual, não de comportamento).
- Testes E2E existentes (`tests/e2e/site.spec.js`) — atualizados apenas onde o comportamento mudar legitimamente, nunca removidos para "destravar" a refatoração.
- Acessibilidade: navegação por teclado, foco visível, `Escape` no menu mobile, landmarks, contraste AA, `prefers-reduced-motion`.
- Nenhuma biblioteca nova sem necessidade comprovada.
- Nenhuma imagem nova gerada/baixada sem autorização explícita.

### Nova direção visual — "do neo-brutalista genérico para editorial-quente autoral"

A mudança central não é de cor ou espaçamento — é de **lógica compositiva**. O sistema anterior separava elementos com bordas e caixas. O novo sistema separa com espaço, escala tipográfica e posição. Um agente que leia esta seção deve ser capaz de abrir qualquer componente e saber exatamente o que remover e o que escrever no lugar.

#### Regra 1 — Acabar com `.brand-stamp` e `border-on-surface` como padrão global

**O problema:** a classe `.brand-stamp` (equivalente a `border-2 border-[#251913] shadow-[4px_4px_0_#251913]`) é aplicada indiscriminadamente a badges, cards, botões e molduras — nivelando tudo ao mesmo peso visual.

**O que fazer:**
- Remover `.brand-stamp` de todo elemento que não seja explicitamente um bloco de destaque editorial intencional (ex: um único cartão "chamada do dia", se existir).
- Substituir separação entre seções por espaçamento generoso (`py-16 md:py-24`) e, quando necessário, uma linha fina de 1px (`border-t border-[#e8e0d4]` — token `.hairline`).
- Botões: usar apenas `ring-1 ring-inset ring-[#251913]` para outline, ou fundo sólido sem sombra deslocada para o primário. A profundidade vem de `hover:shadow-md transition-shadow`, não de sombra estática deslocada.
- Critério de aceite: `grep -rn "brand-stamp\|shadow-\[4px" src/` retorna zero.

#### Regra 2 — Amarelo só como traço, nunca como superfície

**O problema:** `bg-[#fdc008]` aparece como fundo de badges ("Imagem ilustrativa", "Não disponível"), fundo do menu mobile inteiro e tag de localização — dominando a tela como cor de fundo, não como acento.

**O que fazer:**
- Badges de estado provisório: remover fundo amarelo. Usar texto em `text-[#7a6a2a]` (amarelo escuro) sobre fundo transparente, com no máximo uma borda de 1px em `border-[#c9a800]`. Exemplo de classe resultante: `text-xs font-medium text-[#7a6a2a] border border-[#c9a800] rounded-sm px-2 py-0.5`.
- Menu mobile: fundo do overlay passa a ser `bg-[#1a1008]/95` (preto quente escuro) em vez de amarelo. Links em branco/creme.
- Tag de localização ("Parque Nanci · Maricá"): texto simples, `text-sm text-[#5a4a2a] font-medium`, sem fundo.
- Eyebrow de seção (`.section-eyebrow`): manter o traço amarelo fino (`border-b-2 border-[#fdc008]`) como único uso de amarelo como cor de superfície — e mesmo assim só como sublinhado, nunca como bloco.
- Critério de aceite: `grep -rn "bg-\[#fdc008\]\|bg-secondary-container" src/` retorna zero fora de `tailwind.config.cjs`.

#### Regra 3 — Vermelho só em 1–2 pontos por tela, nunca como fundo de bloco

**O problema:** a seção "Sobre a casa" usa `bg-[#ae0011]` como fundo de bloco inteiro — padrão de rede de fast-food, não de marca autoral.

**O que fazer:**
- Em `Home.jsx`, o bloco institucional ("Sobre a casa" ou equivalente) passa a ter `bg-[#faf7f2]` (creme) como fundo.
- Vermelho `#ae0011` é reservado para: uma palavra em destaque num título (`<span class="text-[#ae0011]">`) ou um ícone pontual, no máximo um por seção.
- CTA primário pode manter `bg-[#ae0011]` no botão — botão é elemento pontual, não bloco de seção.
- Critério de aceite: nenhuma `<section>` ou `<div>` de bloco inteiro usa `bg-[#ae0011]` ou `bg-primary` como fundo de fundo.

#### Regra 4 — Tipografia como estrutura compositiva, não como texto dentro de caixa

**O problema:** todos os títulos seguem o mesmo padrão (`text-2xl font-bold` dentro de um retângulo com borda), sem variação real de escala entre seções. A tipografia não organiza a página — a caixa é que organiza.

**O que fazer, em `tailwind.config.cjs`:** adicionar escala editorial com valores concretos:
```js
fontSize: {
  'editorial-hero':    ['clamp(3rem, 8vw, 6rem)',    { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '800' }],
  'editorial-headline':['clamp(2rem, 5vw, 3.5rem)',  { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
  'editorial-subhead': ['clamp(1.25rem, 3vw, 1.75rem)',{ lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
  'editorial-label':   ['0.6875rem',                  { lineHeight: '1',    letterSpacing: '0.12em',  fontWeight: '600', textTransform: 'uppercase' }],
}
```

**O que fazer nos componentes:**
- `HeroSection.jsx`: título principal usa `text-editorial-hero`. Não está dentro de um retângulo — está sobre a imagem de fundo ou ao lado dela, com `mix-blend-mode: multiply` ou cor opaca forte. Subtítulo/tagline usa `text-editorial-subhead`. Nenhum `<div>` de borda envolvendo o bloco de texto.
- Títulos de seção em `Home.jsx` e `Menu.jsx`: alternar entre `text-editorial-headline` e `text-editorial-subhead` conforme hierarquia real — nunca dois títulos consecutivos com o mesmo tamanho.
- Labels de categoria e eyebrows: `text-editorial-label` — caixa-alta pequena, espaçamento de letra amplo, sem borda ao redor.
- Critério de aceite: inspeção visual mostra pelo menos 3 tamanhos de título claramente distintos na Home; nenhum título de seção usa `text-2xl` ou `text-xl` como tamanho máximo.

#### Regra 5 — Grade de categorias: lista editorial em vez de grid uniforme de cards

**O problema:** `MenuHighlights.jsx` renderiza 4–5 cards idênticos em largura, altura e tratamento visual. Home e Cardápio ficam intercambiáveis visualmente porque usam o mesmo componente sem variação.

**O que fazer em `MenuHighlights.jsx`:**
- Substituir o `grid grid-cols-2 md:grid-cols-4` por uma lista vertical numerada com layout assimétrico:
  ```jsx
  // Estrutura por item:
  // [número de ordem grande, cinza claro] [imagem circular pequena, 64px] [nome da categoria, text-editorial-subhead] [descrição curta]
  // separados por .hairline-bottom
  ```
- Número de ordem: `text-[7rem] font-black text-[#e8e0d4] leading-none select-none` — elemento decorativo tipográfico, não funcional.
- Imagem: `w-16 h-16 rounded-full object-cover opacity-80` — pequena, circular, baixa opacidade. Não é o foco — é apoio visual.
- Nome da categoria: `text-editorial-subhead text-[#251913]`.
- Separador entre itens: `border-b border-[#e8e0d4]` (`.hairline`).
- Na Home: mostrar só as 3 primeiras categorias (prop `compact`). No Cardápio: mostrar todas.
- Critério de aceite: Home e Cardápio são visivelmente diferentes entre si; não existe grid de cards de foto em tela cheia em nenhuma das duas rotas.

#### Regra 6 — Fotografia como textura, não como quadro emoldurado

**O problema:** imagens semanticamente incorretas (hambúrguer representando Sobremesas, foto de premiação representando Combos) são exibidas em destaque emoldurado com borda e etiqueta "Imagem ilustrativa" — o que chama mais atenção para a inconsistência.

**O que fazer:**
- Em qualquer card ou bloco onde a imagem disponível não representa fielmente a categoria: usar a imagem como `background-image` com `opacity-20 md:opacity-30` e `object-cover`, não como `<img>` em destaque.
- Remover completamente a etiqueta "Imagem ilustrativa" como badge visual. Se necessário indicar provisoriedade, usar uma linha de texto discreto abaixo do nome da categoria: `<p class="text-xs text-[#9a8a7a]">Fotografia em atualização</p>`.
- `HeroSection.jsx`: a foto de fundo do Hero pode manter presença forte, mas sem moldura/borda ao redor — `absolute inset-0 w-full h-full object-cover` com overlay de gradiente `from-[#1a1008]/70 to-transparent`.
- Critério de aceite: zero badges "Imagem ilustrativa" visíveis; zero imagens de categoria exibidas como foto em destaque com borda.

#### Regra 7 — Estados provisórios com linguagem tipográfica, não com selos coloridos

**O problema:** "Não disponível", "Em construção", "Imagem pendente de acervo" são comunicados como badges coloridos repetidos em série — a honestidade vira ruído visual.

**O que fazer:**
- Estados de canal indisponível (iFood, WhatsApp): texto `text-sm text-[#9a8a7a] line-through` no nome do canal, seguido de `<span class="not-italic text-xs text-[#9a8a7a]">em breve</span>`. Sem badge, sem caixa, sem ícone de aviso.
- Estados de categoria "em construção": remover completamente qualquer badge. O nome da categoria aparece normalmente; a ausência de preço ou link de pedido já comunica a indisponibilidade sem decoração extra.
- Horários não confirmados: simplesmente não exibir o campo. Não exibir "Horários: não confirmados" — omitir até ter dado real.
- Critério de aceite: `grep -rn "UnavailableNotice\|badge.*construção\|Imagem.*ilustrativa" src/components` retorna zero ocorrências de badge visual colorido para estados provisórios.

#### Regra 8 — Header silencioso, logo com presença própria

**O problema:** o Header usa borda inferior pesada e hover com fundo colorido nos links — compete visualmente com o conteúdo da página.

**O que fazer em `Header.jsx`:**
- Fundo do header: `bg-[#faf7f2]/95 backdrop-blur-sm` — creme semitransparente, não branco puro nem preto.
- Borda inferior: remover `border-b`. Substituir por `shadow-[0_1px_0_#e8e0d4]` — separador de 1px, quase invisível.
- Links de navegação: `text-sm font-medium text-[#3a2a1a] hover:text-[#ae0011] transition-colors duration-150`. Sem fundo no hover — só mudança de cor.
- Estado ativo (`NavLink isActive`): `text-[#ae0011]` + `underline underline-offset-4 decoration-[#fdc008] decoration-2` — sublinhado amarelo fino, único uso de amarelo neste componente.
- Logo: remover qualquer borda ou `brand-stamp` ao redor. O logo se sustenta sozinho.
- Menu mobile: overlay `bg-[#1a1008]/95`, links em `text-white text-2xl font-bold`, sem fundo amarelo.

#### Regra 9 — Footer como encerramento tipográfico, não bloco de cor

**O problema:** o Footer usa fundo escuro com borda, similar ao estilo de "encerramento de fast-food".

**O que fazer em `Footer.jsx`:**
- Fundo: `bg-[#1a1008]` (preto quente) — manter, é adequado como encerramento.
- Remover qualquer borda ou sombra deslocada interna.
- Tipografia: nome da marca em `text-editorial-headline text-[#faf7f2]`, tagline em `text-sm text-[#9a8a7a]`, links em `text-sm text-[#c9b99a] hover:text-white`.
- Separador entre colunas: linha fina `border-r border-[#3a2a1a]`, não caixa.
- Critério de aceite: Footer parece o encerramento natural de uma página editorial, não uma seção de rodapé de delivery app.

### Escopo técnico (status por arquivo e o que cada um deve fazer)

Um agente que receba este documento deve implementar cada item abaixo como descrito. Os itens marcados `[x]` foram concluídos na sessão anterior e servem como referência; os itens `[ ]` ainda precisam de verificação ou ajuste conforme as Regras acima.

**`tailwind.config.cjs`** `[x]`
- Escala `fontSize` com `editorial-hero`, `editorial-headline`, `editorial-subhead`, `editorial-label` (valores na Regra 4).
- `borderRadius`: `DEFAULT: '2px'` — quase-reto em tudo.
- Paleta mantida nos hex; papéis mudam (ver Regras 2 e 3).
- Remover qualquer chave duplicada (erro corrigido: `fontSize` estava duplicado).

**`src/styles/index.css`** `[x]`
- Removidas: `.editorial-grid` (grade decorativa de fundo), `.brand-stamp` (borda 2px + sombra deslocada).
- Adicionadas: `.hairline` → `border-b border-[#e8e0d4]`; `.hairline-top` → `border-t border-[#e8e0d4]`; `.paper-texture` → textura sutil de fundo para blocos de texto longos.
- `--color-hairline: #e8e0d4` como variável CSS.
- `.card-shadow-hover`: apenas `hover:shadow-md transition-shadow duration-200` — sem sombra deslocada.
- Removidas: `.mobile-hero-nav-clearance` e `.mobile-map-action-clearance` (valores mágicos de offset que dependiam do layout antigo).

**`src/components/layout/Header.jsx`** `[x → revisar contra Regra 8]`
- Fundo: `bg-[#faf7f2]/95 backdrop-blur-sm`.
- Separador: `shadow-[0_1px_0_#e8e0d4]`, sem `border-b`.
- Links: cor no hover, sem fundo. Estado ativo: sublinhado amarelo fino.
- Menu mobile: overlay escuro `bg-[#1a1008]/95`, sem fundo amarelo.

**`src/components/home/HeroSection.jsx`** `[x → revisar contra Regra 4 e 6]`
- Título: `text-editorial-hero`. Não dentro de retângulo — sobre imagem com overlay gradiente.
- Imagem de fundo: `absolute inset-0 w-full h-full object-cover` + overlay `from-[#1a1008]/70 to-transparent`.
- Sem `.brand-stamp`, sem borda ao redor do bloco de texto.
- Tagline: `text-editorial-subhead text-[#faf7f2]`.

**`src/pages/Home.jsx`** `[x → revisar contra Regra 3 e 7]`
- Ordem das seções: marca (Hero) → local rápido → experiência/institucional → categorias → CTA de ação.
- Bloco institucional: fundo `bg-[#faf7f2]`, sem `bg-[#ae0011]` como fundo de seção.
- Vermelho só em acento tipográfico pontual dentro do bloco (uma palavra, um traço).
- Espaçamento entre seções: `py-16 md:py-24` — separação por espaço, não por borda.

**`src/components/menu/MenuHighlights.jsx`** `[x → revisar contra Regra 5]`
- Estrutura: lista vertical numerada (ver Regra 5 para o layout exato de cada item).
- Número de ordem: `text-[7rem] font-black text-[#e8e0d4] leading-none select-none`.
- Imagem: `w-16 h-16 rounded-full object-cover opacity-80`.
- Separador: `.hairline-bottom` entre itens.
- Home usa prop `compact` (3 itens); Cardápio usa sem prop (todos).
- Sem grid uniforme de cards de foto em tela cheia.

**`src/pages/Menu.jsx`** `[x → revisar contra Regra 5 e 7]`
- Renderiza `<MenuHighlights />` sem prop `compact`.
- Hero do Cardápio: título `text-editorial-headline`, sem retângulo de borda.
- Sem grade decorativa de placeholders. Sem badge de "em construção" — ausência de link de pedido já comunica o estado.

**`src/pages/Location.jsx`** `[x → revisar contra Regra 7]`
- CTA "Conferir ficha / Google Maps": no fluxo normal do documento (`position: static`), sem `position: absolute` com offset mágico.
- Estados de canal (iFood, WhatsApp): `text-sm text-[#9a8a7a] line-through` + `"em breve"` discreto. Sem badge colorido.

**`src/components/location/ContactCard.jsx`** `[x → revisar contra Regra 2 e 7]`
- Sem `.brand-stamp`.
- Fundo: `bg-[#faf7f2]` ou transparente.
- Informações indisponíveis: omitir o campo ou usar texto `text-[#9a8a7a]` discreto.

**`src/components/location/MapEmbed.jsx`** `[x → revisar contra Regra 6]`
- CTA no fluxo normal, sem `position: absolute`.
- Sem `.brand-stamp` no bloco do mapa.

**`src/components/layout/Footer.jsx`** `[x → revisar contra Regra 9]`
- Fundo: `bg-[#1a1008]` — manter.
- Remover bordas internas e sombras deslocadas.
- Tipografia: `text-editorial-headline` para o nome da marca, `text-sm text-[#9a8a7a]` para tagline.

**`src/components/layout/BottomNavBar.jsx`** `[x]`
- Fundo: `bg-[#1a1008]/95 backdrop-blur-sm`.
- Ícone ativo: cor `text-[#fdc008]` (único uso de amarelo como destaque de ícone — admissível).
- Sem borda superior pesada — `shadow-[0_-1px_0_#3a2a1a]`.

**`src/components/ui/Button.jsx`** `[x]`
- Primário: `bg-[#ae0011] text-white hover:bg-[#8a000d] active:scale-95 transition-all duration-150`. Sem sombra deslocada estática.
- Outline: `ring-1 ring-inset ring-[#251913] hover:bg-[#251913] hover:text-white active:scale-95 transition-all duration-150`.
- Componente está em uso real — não é código órfão.

### Critérios de sucesso

- Um observador que viu a versão anterior não deve descrever o resultado como "a mesma coisa com cor/espaçamento diferente".
- Nenhuma seção da Home deve ser visualmente intercambiável com a mesma seção do Cardápio.
- Vermelho não pode ocupar mais que uma pequena fração da tela como fundo sólido em nenhuma viewport.
- Zero badge amarelo usado como superfície de fundo.
- Build limpo (`npm run build`), `npm run check` e `npm run test:e2e` passando.
- `prefers-reduced-motion` preservado, contraste AA mantido.
- Hash MD5 do logo idêntico antes/depois (verificação final obrigatória).

### Resultado da implementação

**Concluído:**
- Tokens redesenhados em `tailwind.config.cjs` e `src/styles/index.css` — removidas as classes globais `.editorial-grid` e `.brand-stamp`; criado vocabulário novo: `.hairline`/`.hairline-top`/`.hairline-bottom` (separador de 1px, substitui borda espessa), `.paper-texture` (textura sutil só atrás de blocos de texto), escala tipográfica `editorial-*` (título grande dominando a composição em vez de 3–4 tamanhos próximos competindo).
- Reescritos: `Header.jsx`, `HeroSection.jsx`, `Home.jsx`, `MenuHighlights.jsx`, `Menu.jsx`, `Button.jsx`, `Location.jsx`, `MapEmbed.jsx`, `ContactCard.jsx`, `BottomNavBar.jsx`.
- Vermelho deixou de ser fundo de bloco inteiro (seção "Sobre a casa" na Home, antes 100% vermelha, agora fundo creme com acento tipográfico); amarelo deixou de ser superfície de badge repetida (era usado em ~17 badges; hoje aparece só como traço fino em `.section-eyebrow`).
- `MenuHighlights.jsx` trocou a grade uniforme de 4–5 cards idênticos por lista editorial numerada (imagem circular pequena, número de ordem, tipografia como elemento dominante) — resolve a intercambialidade visual entre Home e Cardápio, que era o problema mais grave identificado na auditoria.
- Acervo fotográfico com relação inconsistente à categorização passou a ser tratado como textura ambiente de baixa opacidade em vez de retrato emoldurado com etiqueta "imagem ilustrativa".
- Hash MD5 do logo (`logo.jpg`, `logo-96.webp`) conferido **idêntico** antes e depois da refatoração.

**Validação executada:**
- `npm run build` — limpo, rodado repetidamente a cada etapa.
- `npm run lint` — 2 erros reais encontrados e corrigidos: chave `fontSize` duplicada em `tailwind.config.cjs` (mesclada em um único objeto) e prop `compact` não utilizada em `MenuHighlights.jsx` (removida, junto da chamada em `Home.jsx`).
- `npm run test` (unitário) — 1 teste desatualizado corrigido em `tests/business-info.test.jsx` (checava H1 e copy antigos do Cardápio, que mudaram legitimamente); 4/4 testes passando após a correção.
- `npm audit --audit-level=high` — 0 vulnerabilidades.
- `git diff --check` — limpo.
- Hash MD5 do logo — confirmado idêntico.
- `grep -rn "editorial-grid\|brand-stamp" src/` — zero ocorrências.

**Bloqueio ambiental (não é falha de código):**
- `npm run test:e2e` não pôde ser executado nesta sessão: o binário do Chromium do Playwright não está instalado no container, e `npx playwright install chromium` falhou porque `cdn.playwright.dev` não está na allowlist de rede do ambiente (`403 Host not in allowlist`). Precisa ser rodado em CI ou ambiente com Playwright já provisionado antes da aprovação final do lote.

**Achado técnico durante a implementação:** a nova composição quebrou o sistema antigo de "clearance" para a `BottomNavBar` fixa em mobile — `.mobile-hero-nav-clearance` e `.mobile-map-action-clearance` usavam valores mágicos (`calc(100vh - 565px)`, `12.5rem`) calibrados para a altura exata do Hero e do CTA de mapa **antigos**. Corrigido removendo a dependência de `position: absolute` com offset mágico em `MapEmbed.jsx`: o CTA "Conferir ficha / Google Maps" passou a ficar no fluxo normal do documento; as duas classes de clearance foram removidas de `index.css`. Uma verificação adicional com screenshot de viewport real (não `fullPage`) confirmou que uma aparência de sobreposição vista em capturas `fullPage` era artefato do modo de captura do Playwright com elementos `position: fixed`, não um bug real de layout.

**Evidência visual:** CONCLUÍDA. O diretório `documentacao/qa/lote-26/` contém o conjunto antes/depois de Home, Cardápio e Localização em 390px e 1280px.

### Validação obrigatória antes de considerar o lote pronto para auditoria

- [x] `npm run check` — lint, 4 testes unitários e build aprovados em 15/08/2026.
- [x] `npm run test:e2e` — Chromium provisionado; suíte desktop/mobile aprovada em 15/08/2026.
- [x] `npm audit --audit-level=high` — zero vulnerabilidades no fechamento.
- [x] `git diff --check` — aprovado no fechamento.
- [x] Auditoria de acessibilidade — axe, teclado, foco, contraste e reduced motion aprovados.
- [x] Screenshots antes/depois — 12 evidências versionadas em `documentacao/qa/lote-26/`.
- [x] Confirmação de hash MD5 do logo.
- [x] `rg "editorial-grid|brand-stamp" src/` sem ocorrências; repetir no fechamento.

### Regra de fechamento

Não marcar o lote como CONCLUÍDO antes de auditoria independente. Registrar em `documentacao/qa/` o relatório permanente (diagnóstico, decisões, antes×depois, arquivos modificados, screenshots, testes, commit, ressalvas, estado final). Não iniciar outro lote antes disso.

## Etapa 27 — SPA de rolagem, produto em destaque, Localização integrada e fundação de Reviews

- **Estado:** CONCLUÍDO — implementação, auditoria e evidências finalizadas em 15/08/2026.
- **Registro de fechamento:** Codex (OpenAI), às 14:37 BRT (17:37 UTC), em 15/08/2026.
- **Base verificada:** `main` (`origin/main`), commit `9cc0f1bf9fa05bd0b47807c36048b69b5e03a5ef` (merge do PR #7).
- **Integração validada:** commit `a902d1d` (merge do PR #8 em `main`).
- **Entrega:** sub-etapas 27.1–27.5 implementadas de forma atômica para impedir redirects apontando para âncoras ainda ausentes.
- **Direção preservada:** arquitetura editorial-quente do Lote 26, integridade do logo, conteúdo comercial honesto, acessibilidade, SEO e reduced motion.

### 27.0 — Auditoria pré-implementação

Esta auditoria consolida o texto recebido, que continha a Etapa 27 duplicada integralmente, e registra conflitos antes de qualquer alteração de aplicação.

#### Decisões confirmadas

1. `/` será a única página com conteúdo real, na ordem: Hero → Informações rápidas → Cardápio (`#cardapio`) → Sobre (`#sobre`) → Localização (`#localizacao`) → Reviews (`#reviews`).
2. `/cardapio` e `/localizacao` serão URLs legadas com redirect permanente para as âncoras equivalentes da Home e fallback por `<Navigate>` em ambientes sem Vercel.
3. Header, BottomNavBar e Footer navegarão por âncoras sem troca de pathname; o estado ativo refletirá a seção com maior `intersectionRatio`.
4. Cardápio terá produto como leitura principal e categoria como filtro secundário.
5. Localização será absorvida pela Home, com um único CTA de rota e sem repetição de endereço/horário.
6. Reviews fictícios serão exibidos como demonstração explícita e substituível; nenhuma biblioteca será adicionada.

#### Erros, conflitos e correções incorporadas ao plano

1. **Baseline verificada:** `origin/main` foi consultada e a branch documental deriva exatamente de `9cc0f1b`. A divergência observada no checkout inicial `work` foi eliminada criando esta branch a partir da baseline remota antes do commit do plano.
2. **Redirect “301” versus Vercel:** `permanent: true` pode resultar em redirect permanente 308. O aceite correto é **301 ou 308**, validando `Location: /#cardapio` ou `/#localizacao`; não exigir exclusivamente 301.
3. **Fragmentos não chegam ao servidor:** o redirect pode entregar um fragmento no header `Location`, mas o hash é interpretado pelo navegador. O fallback React deve usar `<Navigate replace to="/#cardapio" />`/`"/#localizacao"` e `MainLayout` deve focar a âncora depois da montagem.
4. **Estado ativo por proporção:** seções muito curtas podem vencer a comparação por `intersectionRatio` mesmo ocupando poucos pixels. O hook deve comparar primeiro a área visível em pixels e usar `intersectionRatio` como desempate, ou normalizar pela área útil do viewport descontando Header/BottomNavBar. A implementação precisa de testes para seções de alturas distintas.
5. **Reviews fictícios e links de fonte:** um placeholder não pode alegar possuir uma publicação real no Google ou Instagram. `sourceUrl` será opcional/nulo em placeholders; `ReviewCard` exibirá “Demonstração” em vez de link externo quando não houver fonte verdadeira.
6. **Sinalização dos Reviews:** `isPlaceholder: true` no código não basta. A seção e cada card devem apresentar texto visível como “Conteúdo demonstrativo — avaliações fictícias”, e dados estruturados de review/schema.org não devem ser emitidos enquanto houver placeholders.
7. **Conflito sobre produtos fictícios:** a solicitação geral permite dados fictícios para conferir o layout, mas a Regra 3 mantém `products = []` e proíbe inventar produto/preço comercial. Resolução conservadora: Reviews fictícios aparecem na Home; produtos fictícios existem somente como fixtures de teste/captura, nunca em `src/data/menu.js`, build de produção, SEO ou deploy público. O estado público do Cardápio permanece honesto e vazio.
8. **Cardápio vazio versus “produto dominante”:** com `products = []`, a Home não pode demonstrar um produto real. `MenuSection` deve preservar a hierarquia reservando uma única superfície editorial de destaque com `UnavailableNotice`, sem cards falsos, preço, CTA por produto ou grade vazia. Testes com fixture validam o layout preenchido.
9. **Informações rápidas duplicadas:** o bloco atual repete localização e horários. Na Etapa 27 ele será reduzido a informações não duplicadas (por exemplo compromisso editorial e disponibilidade dos canais), enquanto endereço e horário aparecem apenas em `LocationSection`.
10. **Rotas e sitemap:** remover shells exige atualizar testes, sitemap, metadados e qualquer documentação que ainda espere HTTP 200 direto em três páginas. O redirect deve ser testado separadamente do fallback SPA local.
11. **Arquivos potencialmente órfãos:** `Menu.jsx`, `Location.jsx`, `ContactCard.jsx`, `MenuHighlights.jsx` e `ProductGrid.jsx` só serão removidos depois de `rg` confirmar ausência de consumidores. Não apagar componentes apenas porque a nova arquitetura os substitui conceitualmente.
12. **Autorização incremental versus execução total:** esta etapa está definida, mas continua dividida em sub-etapas auditáveis. Cada sub-etapa atualiza este documento no mesmo commit; nenhuma deve ser marcada como concluída antecipadamente.
13. **Sequenciamento do redirect de Localização:** o review identificou que ativar o redirect na 27.1 antes de criar `#localizacao` na 27.2 quebraria a URL legada. Correção aplicada: âncora, seção, fallback e redirects são entregues atomicamente neste lote.
14. **Remount por hash em `MainLayout`:** o review identificou que a key antiga incluía `location.hash` e remontaria toda a Home em cada clique. Correção aplicada: a key usa somente `location.pathname`; o efeito continua responsável por foco e rolagem.

#### Dúvidas não bloqueantes para decisão humana

- **Origem futura de Reviews:** Google, Instagram ou outra plataforma ainda não foi definida. A camada de dados deve permanecer agnóstica.
- **Demonstração de produtos preenchidos:** por padrão será apenas fixture de teste. Se for desejado um preview visual navegável com produtos fictícios, será necessária autorização separada para um modo de demonstração claramente isolado e impossível de publicar por engano.
- **Reviews no menu:** `#reviews` será observado e terá estado ativo, mas a inclusão de “Reviews” como item visível no Header/BottomNavBar deve respeitar espaço disponível. Proposta: Header e Footer incluem Reviews; BottomNavBar mantém quatro itens e substitui “Pedir” apenas se aprovado na 27.1.

### 27.1 — Navegação por âncora, estado ativo e redirects

- **Estado:** CONCLUÍDO.

#### Objetivo

Transformar a navegação em uma experiência de página única, sem recarregar nem trocar pathname durante o uso normal da Home.

#### Implementação planejada

- Criar `src/hooks/useActiveSection.js` compartilhado por Header e BottomNavBar.
- Observar `cardapio`, `sobre`, `localizacao` e `reviews` com `IntersectionObserver` e thresholds múltiplos.
- Manter um mapa de área/ratio por seção e selecionar deterministicamente a seção mais visível; limpar observers no unmount e oferecer fallback sem API.
- Header/Footer usarão `<a href="#...">`; “Início” usará `href="#topo"`, com `id="topo"` no início da Home.
- BottomNavBar usará a mesma fonte de estado; não duplicará lógica de observer.
- `src/App.jsx` manterá apenas Home como conteúdo e `<Navigate replace>` para as duas URLs legadas.
- `vercel.json` trocará rewrites por redirects permanentes para `/#cardapio` e `/#localizacao`.
- `MainLayout` aguardará o alvo existir, fará `scrollIntoView` e moverá foco sem criar histórico duplicado.

#### Critérios de aceite

- Cliques em Header, Footer e BottomNavBar mantêm `location.pathname === '/'` e atualizam somente o hash.
- Rolagem manual destaca a seção com maior área visível, inclusive entre seções de alturas diferentes.
- Teclado, foco, Escape e reduced motion permanecem funcionais.
- `/cardapio` e `/localizacao` retornam redirect permanente 301/308 na Vercel e funcionam via `<Navigate>` no preview local.

### 27.2 — `SectionHeading` e Localização integrada

- **Estado:** CONCLUÍDO.

#### Implementação planejada

- Criar `src/components/ui/SectionHeading.jsx` para eyebrow, título, descrição e alinhamentos previstos pelo design editorial.
- Criar `src/components/home/LocationSection.jsx` com `id="localizacao"`.
- Ordem interna: título curto → mapa/ilustração → único CTA de rota → localização parcial + nota → horários via `BUSINESS_INFO.hours` → Instagram.
- Adaptar `MapEmbed` para ser apresentação sem link próprio se o CTA estiver fora dele; devem existir exatamente um link para Maps na Home.
- Absorver o conteúdo útil de `ContactCard`; removê-lo apenas após confirmar ausência de consumidores.
- Remover localização e horário do bloco Informações rápidas para impedir duplicação.

#### Critérios de aceite

- Localização aparece uma única vez e imediatamente depois de `#sobre`.
- Há exatamente um CTA para `BUSINESS_INFO.channels.maps.url` dentro do conteúdo principal.
- Endereço parcial e indisponibilidade de horários aparecem uma única vez, sem invenção.
- A BottomNavBar não cobre o mapa nem o CTA em 375×667, 390×740 e 414×844.

### 27.3 — Cardápio orientado a produto

- **Estado:** CONCLUÍDO.

#### Implementação planejada

- Criar `src/components/menu/MenuSection.jsx` com `id="cardapio"` e `SectionHeading`.
- Redesenhar `ProductCard` no design editorial vigente: ring sutil, imagem dominante, nome/descrição, estado/preço real e `ChannelAction` quando houver produto e canal disponível.
- Redesenhar `CategoryFilterBar` como controle secundário horizontal com scroll-snap, foco visível e `aria-pressed`.
- Filtrar apenas produtos existentes; categorias sem produtos não prometem conteúdo.
- Quando `products.length === 0`, renderizar exatamente um `UnavailableNotice` em uma superfície de destaque, seguido no máximo de contexto editorial não interativo.
- Não renderizar filtros vazios, grid de placeholders, preço fictício ou CTA de pedido por produto.
- Avaliar `MenuHighlights` como contexto secundário; se repetir os mesmos nomes do filtro, removê-lo da Home.
- Avaliar se `ProductGrid` agrega valor; incorporar a lógica em `MenuSection` se o wrapper apenas duplicar estrutura.

#### Validação do layout preenchido sem dado comercial falso

- Criar fixtures exclusivamente em testes para produtos demonstrativos, marcadas com `isPlaceholder: true`.
- Renderizar `MenuSection` com fixtures em teste de componente e captura isolada, sem importar as fixtures pelo código de produção.
- Confirmar visualmente imagem, nome longo, descrição, preço/estado e CTA em mobile/desktop.
- Confirmar por teste que o build normal continua usando `products = []`.

#### Critérios de aceite

- A primeira leitura da seção é produto/destaque, não categoria.
- Categoria funciona apenas como filtro de apoio quando existem produtos.
- Produção mostra um único estado vazio honesto enquanto o catálogo oficial não existe.
- iFood continua indisponível sem URL falsa.

### 27.4 — Remoção das páginas/shells e consolidação de SEO

- **Estado:** CONCLUÍDO.

#### Implementação planejada

- Remover `src/pages/Menu.jsx` e `src/pages/Location.jsx` após a migração e confirmação de ausência de imports.
- Remover `cardapio/index.html` e `localizacao/index.html`.
- Atualizar `public/sitemap.xml` para listar somente `https://turquia-marica.vercel.app/`.
- Preservar canonical e Open Graph de `/` em `index.html`.
- Atualizar E2E para separar: navegação SPA, fallback React local e redirects reais no deploy/preview Vercel.
- Revisar `robots.txt`, links internos, testes de rotas e documentação para eliminar expectativas antigas de três páginas indexáveis.

#### Critérios de aceite

- Nenhum import ou link interno depende das páginas removidas.
- Sitemap contém uma única URL canônica.
- Não existem shells HTML órfãos.
- Redirects não formam loop e preservam a âncora de destino.

### 27.5 — Fundação de Reviews demonstrativos

- **Estado:** CONCLUÍDO.

#### Contrato de dados

Criar `src/data/reviews.js` com comentários explícitos de demonstração e objetos no formato:

```js
// Dados fictícios exclusivamente para demonstração visual; substituir pela
// integração oficial antes de tratar como prova social real.
{
  id,
  source: 'google' | 'instagram',
  authorName,
  rating, // opcional, 1–5
  text,
  date, // ISO
  sourceUrl: null, // obrigatório enquanto fictício
  avatarUrl: null,
  isPlaceholder: true,
}
```

#### Implementação planejada

- Criar `src/components/reviews/ReviewCard.jsx` com fonte, autor fictício, texto, nota opcional, data e rótulo visual “Demonstração”.
- Criar `src/components/reviews/ReviewsSection.jsx` com `id="reviews"`, `SectionHeading`, aviso geral de conteúdo fictício e lista horizontal `overflow-x-auto` + `scroll-snap`.
- Não usar foto de pessoa real, link externo, aggregateRating, review schema ou alegação de origem verificável em placeholders.
- Manter a seção renderizada enquanto os dados demonstrativos estiverem explicitamente autorizados; a futura integração substitui apenas a camada de dados.

#### Critérios de aceite

- Todo review possui `isPlaceholder: true` e sinalização visível.
- Nenhum placeholder é apresentado como avaliação real da casa.
- Lista funciona por toque, trackpad, teclado e scroll horizontal sem biblioteca.
- Contraste, foco, nomes acessíveis e reduced motion são preservados.

### Escopo técnico consolidado

| Arquivo | Ação planejada |
|---|---|
| `src/App.jsx` | Home real + redirects React de segurança. |
| `src/layouts/MainLayout.jsx` | Foco e rolagem por hash após montagem. |
| `src/hooks/useActiveSection.js` | Novo observer compartilhado por maior visibilidade. |
| `src/components/layout/Header.jsx` | Âncoras e estado ativo por seção. |
| `src/components/layout/BottomNavBar.jsx` | Âncoras e mesmo estado compartilhado. |
| `src/components/layout/Footer.jsx` | Links internos por âncora. |
| `src/pages/Home.jsx` | Nova ordem completa das seções. |
| `src/components/ui/SectionHeading.jsx` | Novo cabeçalho editorial reutilizável. |
| `src/components/home/LocationSection.jsx` | Nova Localização integrada. |
| `src/components/location/MapEmbed.jsx` | Adaptar para existir um único CTA. |
| `src/components/location/ContactCard.jsx` | Absorver e remover se ficar órfão. |
| `src/components/menu/MenuSection.jsx` | Nova seção orientada a produto. |
| `src/components/menu/CategoryFilterBar.jsx` | Redesign como filtro secundário. |
| `src/components/product/ProductCard.jsx` | Redesign editorial e estados honestos. |
| `src/components/menu/MenuHighlights.jsx` | Reusar apenas se não duplicar o filtro. |
| `src/components/menu/ProductGrid.jsx` | Incorporar/remover se não agregar comportamento. |
| `src/components/reviews/ReviewsSection.jsx` | Nova seção horizontal demonstrativa. |
| `src/components/reviews/ReviewCard.jsx` | Novo card claramente fictício. |
| `src/data/reviews.js` | Novos placeholders explicitamente marcados. |
| `src/pages/Menu.jsx`, `src/pages/Location.jsx` | Remover após migração. |
| `vercel.json` | Rewrites → redirects permanentes. |
| `cardapio/`, `localizacao/` | Remover shells após validar redirects. |
| `public/sitemap.xml` | Manter somente `/`. |
| `tests/` | Fixtures de produto e cobertura SPA/redirect/reviews/a11y. |

### Critérios globais de sucesso

- Navegação interna não recarrega a aplicação nem troca o pathname.
- Estado ativo acompanha deterministicamente a seção mais visível.
- `/cardapio` e `/localizacao` redirecionam permanentemente e preservam o hash.
- Home contém exatamente uma seção de Cardápio, Sobre, Localização e Reviews.
- Cardápio reserva protagonismo a produto e usa categoria apenas como apoio.
- Estado público do catálogo não inventa produto, preço ou pedido.
- Reviews fictícios ficam visivelmente marcados e não geram prova social estruturada.
- Localização contém um único CTA de rota e nenhuma duplicação factual.
- Nenhuma biblioteca, cor, fonte ou breakpoint desnecessário é adicionado.
- `npm run check`, `npm run test:e2e`, `npm audit --audit-level=high` e `git diff --check` aprovados.
- Axe sem violações críticas/sérias; foco, Escape, zoom 200%, reduced motion e viewports 320/390/768/1280/1440 validados.
- Hashes MD5 de `logo.jpg` e `logo-96.webp` idênticos antes/depois.
- Evidências antes/depois e relatório permanente registrados em `documentacao/qa/etapa-27/`.

### Sequenciamento e gates

1. **27.1:** baseline verificada; âncoras, observer, redirects e navegação.
2. **Auditoria 27.1:** testes de hash, seção ativa, foco, fallback e redirects.
3. **27.2:** `SectionHeading` + Localização integrada.
4. **Auditoria 27.2:** unicidade dos dados/CTA e viewports móveis.
5. **27.3:** Cardápio orientado a produto + fixtures isoladas de layout.
6. **Auditoria 27.3:** estado vazio público e cenário preenchido de teste.
7. **27.4:** remoção de páginas/shells + SEO e E2E.
8. **Auditoria 27.4:** redirect remoto, sitemap, canonical e ausência de órfãos.
9. **27.5:** Reviews fictícios, explicitamente sinalizados.
10. **Auditoria final:** check, E2E, axe, Lighthouse, hashes, screenshots e relatório consolidado.

### Fechamento

- Sub-etapas 27.1–27.5 concluídas no mesmo lote para eliminar estados intermediários inconsistentes.
- Auditoria permanente registrada em `documentacao/qa/AUDITORIA_ETAPA_27.md`.
- Evidências visuais registradas em `documentacao/qa/etapa-27/`.
- Nenhuma pendência P0/P1 conhecida; integrações e dados oficiais continuam externos ao escopo.

## Etapa 28 — Modo de demonstração visual isolado (dados fictícios de produto)

- **Estado:** CONCLUÍDO E AUDITADO — rota isolada por flag, gate de produção e evidências nos cinco viewports entregues em 15/08/2026.
- **Origem:** responde à dúvida não bloqueante da Etapa 27.0 sobre uma demonstração preenchida do Cardápio.
- **Prioridade:** não sequencial; não bloqueia nem é bloqueada pelos demais lotes.
- **Restrição central:** o Cardápio público continua usando `products = []`; nenhum produto, preço ou descrição fictícia pode alcançar produção, SEO ou deploy público.

### 28.0 — Auditoria e correções do plano recebido

O texto recebido estava duplicado integralmente. Esta seção é a única versão normativa e incorpora as correções abaixo antes de qualquer código:

1. **Contrato compatível:** a autorização final definiu `shortDescription`, `longDescription` e `imageUrl` para a fixture. O factory isolado também expõe `description`, `image`, `imageAlt` e `imageStatus`, adaptando os dados no próprio `menu.demo.js` para a interface já consumida por `ProductCard`, `MenuSection` e `CategoryFilterBar`, sem alterar esses componentes.
2. **Isolamento verificável:** `import()` dinâmico, sozinho, não prova ausência do chunk no build. O build de produção deve ser inspecionado e falhar se `dist/` contiver nomes, textos ou identificadores da fixture.
3. **Rota e build:** uma rota condicionada por flag ainda pode gerar um chunk, conforme a forma do código e a otimização do bundler. A solução escolhida deverá demonstrar, por teste do artefato, que o build padrão não contém a rota nem os dados.
4. **Imagens confiáveis:** serviços externos de placeholder prejudicam reprodutibilidade, privacidade e execução offline. A recomendação é versionar imagens neutras em `src/assets/demo/`, sem marcas ou pessoas identificáveis.
5. **Sem Storybook novo:** o projeto não usa Storybook e a Etapa 27 proíbe dependências desnecessárias. A alternativa conservadora deve usar Playwright/teste de componente já existente, não instalar Storybook apenas para este lote.
6. **Flag não é controle de segurança:** `VITE_*` é informação pública no cliente. Ela serve para seleção de build local, enquanto a barreira real é ausência do código/dados no artefato padrão, ausência de rota no deploy e validação automática.
7. **Preço:** fixtures devem usar número em centavos ou o mesmo tipo já aceito pelo componente; a decisão será confirmada pela leitura do contrato atual antes da implementação.
8. **Ambiguidade de “sem alterar componentes”:** correções de robustez descobertas pelo QA podem ser propostas, mas não entram silenciosamente nesta etapa. Qualquer mudança visual em componente aprovado exige diagnóstico, captura antes/depois e autorização separada.

### Objetivo

Permitir a validação visual completa da hierarquia, espaçamento, proporção, responsividade, filtros e cards do Cardápio com 4–6 produtos fictícios por categoria, sem modificar `src/data/menu.js` ou o comportamento público honesto aprovado na Etapa 27.

### Regra herdada

Produtos fictícios nunca entram em `src/data/menu.js`, build público padrão, metadados, sitemap, dados estruturados, Open Graph ou deploy canônico. A Etapa 28 amplia a fixture de teste para uma superfície de QA, sem reabrir decisões comerciais ou de design.

### Contrato de dados proposto

Criar `src/data/menu.demo.js`, com aviso explícito e objetos compatíveis com o contrato real:

```js
// DADOS FICTÍCIOS — uso exclusivo em QA visual isolado.
// Nunca importar no fluxo público ou tratar como informação comercial real.
{
  id,
  name,
  description,
  price,
  categoryId,
  image,
  imageAlt,
  imageStatus,
  isPlaceholder: true,
  isMock: true,
}
```

- Categorias: Lanches (`lanches`), Combos (`combos`), Bebidas (`bebidas`) e Sobremesas (`sobremesas`), usando os IDs já definidos em `src/data/menu.js`.
- Cobertura: nomes curtos/longos, descrições de 1 e 3+ linhas, diferentes formatos de preço e itens com/sem imagem.
- Imagens: preferencialmente assets neutros locais em `src/assets/demo/`, na proporção real dos cards.
- Itens sem imagem devem continuar declarando `image: null`, `imageAlt: null` e um `imageStatus` coerente; se o card atual não oferecer fallback robusto, o achado será documentado e qualquer correção visual dependerá da autorização separada prevista na auditoria.
- Todos os nomes e textos devem conter linguagem inequívoca de demonstração, sem referência a produtos reais da casa.

### Isolamento obrigatório

- Fonte fictícia fisicamente separada de `src/data/menu.js`.
- Ativação em um único ponto por `VITE_VISUAL_QA_DEMO=true`, desligada por padrão e documentada em `.env.example`.
- Nenhum link no Header, Footer ou BottomNavBar.
- Se existir rota, usar namespace `__visual-qa`, aviso fixo “DADOS FICTÍCIOS — QA VISUAL” e metatags `noindex, nofollow`.
- A rota não pode constar de sitemap, robots como caminho público recomendado, prerender, redirects ou links internos.
- O build padrão deve ser auditado com busca em `dist/` por `menu.demo`, `isMock`, IDs e textos sentinela.
- CI deve construir explicitamente sem a flag e reprovar qualquer vazamento.
- `ProductCard`, `MenuSection` e `CategoryFilterBar` recebem dados pelo contrato existente e não conhecem a origem fictícia.

### Decisão técnica confirmada — rota isolada por flag

**Escolha:** rota local isolada por `VITE_VISUAL_QA_DEMO=true`, preservando import dinâmico, gate de build, auditoria automática de `dist/`, `noindex, nofollow`, namespace reservado e ausência de links internos.

**Critério decisivo:** as duas alternativas atendem ao isolamento exigido; a rota foi escolhida por oferecer o melhor ambiente para refinamento visual em tempo real. Hot reload, DevTools, cursor, hover, scroll, timing e contexto integral com Header/BottomNavBar permitem avaliar os problemas de motion e interação que motivaram os Lotes 18–26 sem reduzir a análise a frames estáticos.

**Papel complementar do Playwright:** depois da estabilização manual, a suíte existente acessará a mesma rota com a flag ativa para produzir evidências e regressões nos viewports 320, 390, 768, 1280 e 1440 px. Playwright permanece como mecanismo formal de fechamento, não como ferramenta principal de refinamento.

**Condição de reabertura:** se o gate não conseguir comprovar a ausência da rota, fixture, chunk ou sentinelas no build padrão, a implementação será revertida e o harness Playwright passará a ser o único consumidor, privilegiando isolamento estrutural.

**Autorização registrada:** o responsável autorizou a implementação integral em 15/08/2026. A entrega preserva o Cardápio público e mantém a rota disponível somente em builds locais iniciados com a flag.

### Escopo técnico previsto

| Arquivo | Ação planejada |
|---|---|
| `src/data/menu.demo.js` | Novo — fixture fictícia isolada e marcada. |
| `src/assets/demo/` | Novo, se aprovado — imagens neutras locais e removíveis. |
| `tests/` ou rota `__visual-qa` | Consumidor exclusivo, conforme decisão do responsável. |
| `.env.example` | Documentar flag opcional, padrão desligado. |
| scripts/CI | Validar ausência de fixture e rota no build padrão. |
| `documentacao/qa/etapa-28/` | Evidências nos cinco viewports de aceite. |
| `BEST_PLAN.MD` | Atualizar estado, decisão, evidências e veredito no mesmo lote. |

`src/data/menu.js`, sitemap, metadados públicos e componentes visuais aprovados não devem mudar neste lote.

### Riscos e mitigação

- **Vazamento para produção:** flag desligada, consumidor exclusivo, auditoria de `dist/` e CI bloqueante.
- **Indisponibilidade de imagens:** assets locais neutros, em vez de dependência externa.
- **Confusão com dados reais:** prefixos `demo`/`Mock`, sentinelas, `isPlaceholder`/`isMock` e aviso visual persistente.
- **Indexação:** ausência no artefato padrão; `noindex` é somente defesa adicional, nunca a barreira principal.
- **Desvio de design:** componentes permanecem iguais; achados viram proposta separada, acompanhada de evidência.
- **Bundle acidental:** inspeção do conteúdo e do manifesto gerado, não apenas revisão do código-fonte.

### Estratégia de rollback

1. Remover o consumidor de QA e a configuração da flag.
2. Apagar `src/data/menu.demo.js` e `src/assets/demo/`, se existir.
3. Reverter o commit isolado da Etapa 28.
4. Executar build padrão e confirmar ausência de `menu.demo`, `isMock`, rota e textos sentinela em `dist/`.
5. Confirmar que a Home pública voltou — ou permaneceu — com o único `UnavailableNotice` e `products = []`.

### Critérios de aceite

- `src/data/menu.js` permanece inalterado e vazio no fluxo real.
- Build padrão não contém fixture, rota, chunk, sentinela nem produto fictício.
- Nenhum dado fictício aparece em sitemap, SEO, Open Graph ou deploy público.
- Componentes visuais aprovados permanecem estruturalmente idênticos.
- QA visual cobre 320, 390, 768, 1280 e 1440 px, quatro categorias e casos-limite.
- Filtros, navegação por teclado, foco, contraste, overflow e reduced motion são testados.
- `npm run check`, E2E aplicável, build sem flag, auditoria de `dist/`, `npm audit --audit-level=high` e `git diff --check` passam.
- Hash MD5 do logo permanece idêntico.
- Evidências e veredito são registrados antes de marcar a etapa como concluída.

### Sequenciamento

1. Obter autorização explícita do responsável para implementar a rota isolada já selecionada.
2. Confirmar o contrato real de produto e registrar hashes/baseline.
3. Criar fixture e assets demonstrativos isolados.
4. Implementar o único consumidor autorizado e o gate de build.
5. Validar os cinco viewports e acessibilidade.
6. Auditar `dist/`, sitemap, metadados, links internos e deploy padrão.
7. Registrar evidências em `documentacao/qa/etapa-28/`.
8. Atualizar estado e changelog; manter tudo em commit isolado e reversível.

### 28.1 — Resultado implementado e auditoria

- A rota `/__visual-qa` só é declarada quando `VITE_VISUAL_QA_DEMO=true`; o módulo da página e a fixture entram por importação dinâmica.
- `npm run build` sempre executa `audit:demo-leak` e falha se o artefato público contiver a rota, fixture, IDs, campos demonstrativos, sentinelas ou `isMock`. Mesmo uma flag configurada por engano no deploy torna o build inválido.
- `src/data/menu.demo.js` contém 16 itens fictícios — quatro por categoria — com nomes, descrições e preços inequivocamente demonstrativos.
- Assets de QA são locais, removíveis e separados em `src/assets/demo/`; o caso sem fotografia usa um placeholder neutro explícito.
- A página mantém Header, Footer e BottomNavBar reais, mostra aviso persistente e aplica `noindex, nofollow, noarchive, nosnippet` durante sua montagem.
- `ProductCard`, `MenuSection`, `CategoryFilterBar`, `src/data/menu.js`, sitemap e metadados públicos permaneceram inalterados.
- Playwright validou filtro, teclado/contexto de navegação, axe, console, 16 cards e capturas completas em 320, 390, 768, 1280 e 1440 px.
- Evidências: `documentacao/qa/etapa-28/`; relatório: `documentacao/qa/AUDITORIA_ETAPA_28.md`.
- **Veredito:** APROVADO — nenhum artefato demonstrativo foi encontrado no build público padrão.
- O contrato final da fixture inclui `shortDescription`, `longDescription` e `imageUrl`; a camada isolada oferece simultaneamente a interface legada dos componentes, que seguem estruturalmente idênticos.

## Pendências externas — Lote 14

Cada dependência deve ser desbloqueada e implementada de forma independente; a ausência de um item não bloqueia os demais. Nenhum dado ou asset pode ser inventado.

- **Lote 14A — iFood:** URL oficial da loja.
- **Lote 14B — Contato:** telefone/WhatsApp válido.
- **Lote 14C — Localização:** endereço completo e CEP.
- **Lote 14D — Funcionamento:** horários oficiais.
- **Lote 14E — Cardápio comercial:** produtos, ingredientes, preços e badges aprovados.
- **Lote 14F — Direção fotográfica:** fotografias oficiais da casa e dos produtos; planejar enquadramento, recorte, tratamento, responsividade e atualização da imagem Open Graph, em vez de apenas substituir arquivos.

## Changelog

- **15/08/2026:** Etapa 29 implementada — reveal overlay no `ProductCard`, 9 fotos conectadas à demo e nota de rodapé adicionada. Veredito: **APROVADO**; build público sem vazamento e Cardápio real preservado.
- **15/08/2026:** Etapa 29 planejada e registrada: redesenho do ProductCard com reveal overlay (hover/touch), conexão das 9 fotografias reais ao menu.demo.js e nota de rodapé na VisualQaDemo. Implementação não iniciada; aguarda autorização explícita.

- **15/08/2026:** contrato final da Etapa 28 reconciliado com a autorização: fixture passou a declarar `shortDescription`, `longDescription` e `imageUrl` sem alterar componentes; gate recebeu o nome público `audit:demo-leak` e cobertura contextual de `isPlaceholder`, preservando os Reviews fictícios legítimos da Etapa 27.
- **15/08/2026:** Etapa 28 implementada e auditada: rota local por flag com 16 produtos fictícios, assets isolados, aviso/noindex, gate bloqueante de `dist/`, suíte Playwright em cinco viewports e evidências permanentes. Cardápio real, componentes visuais e sitemap permaneceram inalterados; veredito **APROVADO**.
- **15/08/2026:** decisão técnica da Etapa 28 confirmada: rota isolada por flag será o ambiente de refinamento visual ao vivo; Playwright será usado ao final para evidência/regressão nos cinco viewports. Implementação continua não iniciada até autorização explícita; falha do gate de `dist/` reabre a decisão em favor do harness exclusivo.
- **15/08/2026:** Etapa 28 registrada e auditada como plano: modo de demonstração visual isolado para produtos fictícios, com recomendação de harness Playwright, contrato alinhado a `categoryId`, assets locais, gate de artefato e rollback. Estado: **AGUARDANDO DECISÃO**; nenhuma alteração de aplicação realizada.
- **15/08/2026:** Etapa 27 implementada e auditada: SPA por âncoras, estado ativo por área visível, Cardápio orientado a produto com estado público honesto, Localização integrada com CTA único, Reviews fictícios sinalizados, redirects/SEO consolidados e reviews de código sobre redirect prematuro/remount por hash corrigidos.
- **15/08/2026:** Etapa 27 auditada e definida apenas em documentação: duplicação do texto-fonte removida; baseline remota `9cc0f1b` verificada; redirects 301/308, seleção de seção ativa, placeholders de Reviews e conflito de produtos fictícios corrigidos; implementação permanece não iniciada até confirmação da 27.1.
- **15/08/2026:** plano operacional reestruturado sobre `origin/main`/`98d570e`: baseline inicial classificada como histórica, estados dos Lotes 18–26 consolidados, bloco duplicado 18–25 arquivado, Lote 26 movido para `EM AUDITORIA`, checklist reconciliado e pendências externas separadas em 14A–14F. Nenhuma alteração de aplicação foi realizada.
- **15/08/2026:** Lotes 21–26 concluídos e auditados: scroll reveal, movimento ambiente, arquitetura editorial, correções de contraste/overflow/BottomNavBar, evidências antes/depois e nova imagem Open Graph entregues; relatório em `documentacao/qa/AUDITORIA_LOTES_21_26.md`.
- **15/08/2026:** revisão do PR corrigiu a declaração prematura de evidência visual do Lote 26: `documentacao/qa/lote-26/` ainda não existia naquele momento; a pendência foi posteriormente resolvida com 12 capturas versionadas.
- **12/08/2026:** criado o registro operacional da implantação na branch `BEST_ONE`.
- **12/08/2026:** registrado o primeiro checkpoint funcional; auditoria e repetição integral dos testes ficaram obrigatoriamente pendentes para depois da reinicialização.
- **12/08/2026:** auditoria pós-reinicialização concluída; compatibilidade com Node 20 restaurada e checkpoint validado por testes unitários, E2E, axe, HTTP, build e inspeção visual.
- **12/08/2026:** contrato de runtime formalizado e cobertura E2E ampliada para SEO estático, descoberta e preferência de movimento reduzido.
- **12/08/2026:** auditoria confirmou que o design definitivo ainda não havia sido realizado; etapa visual reaberta como prioridade anterior a fotos e informações oficiais.
- **12/08/2026:** iniciada a implementação visual definitiva com fundação compartilhada e recomposição completa da Home em mobile e desktop.
- **13/08/2026:** Lote 4 auditado independentemente; regressões de tom promocional, hierarquia da marca e destaque de canal inativo foram corrigidas, mantendo o lote aberto para aprovação explícita.
- **13/08/2026:** Lote 4 aprovado com ressalvas; Lote 5 implementou Cardápio orientado à descoberta, sem filtros vazios, preços ou pedidos fictícios, e foi encaminhado para auditoria independente.
- **13/08/2026:** auditoria independente do Lote 5 removeu atalhos e cards redundantes, condensou as categorias previstas e aprovou o Cardápio com ressalvas, sem iniciar Localização.
- **13/08/2026:** Lote 6 pesquisou e refinou a Localização com Maps como ação principal, omitiu dados não confirmados e foi encaminhado para auditoria independente no commit de implementação `4709438`; as evidências foram consolidadas pelo commit documental `63a321b`.
- **13/08/2026:** auditoria independente do Lote 6 concluída pelo commit `5239e5f`, com veredito **APROVADO COM RESSALVAS**; a etapa de refinamento definitivo passou a refletir a aprovação auditada de Home, Cardápio e Localização. O checkout não possuía remote configurado, portanto nenhum estado, número ou URL de Pull Request remoto pôde ser confirmado.
- **14/08/2026:** Lote 11 unificou a apresentação visual de categorias entre Home e Cardápio, preservou os hashes legados e foi auditado como **APROVADO COM RESSALVAS**; Lote 12 permanece como próximo passo, sem início automático.
- **14/08/2026:** Lotes 12, 13 e 15 concluídos e auditados: áreas críticas respeitam a BottomNavBar em 375–414 px, a consistência global não apresentou novo bloqueio e Bebidas passou a declarar a pendência de acervo sem fotografia enganosa. Lote 14 foi registrado como bloqueado/pendente; Lotes 16 e 17 não foram iniciados.
- **14/08/2026:** Lotes 16 (imagem Open Graph) e 17 (tagline) concluídos, auditados e mesclados em `origin/BEST_ONE` via PR #3 (`8d25666`); tagline "Turquia Lanches. Fartura sem pose." confirmada como definitiva pelo responsável.
- **14/08/2026:** responsável autorizou explicitamente um novo bloco de trabalho com mandato de priorizar impacto visual real sobre o princípio de menor mudança possível, preservando como única restrição inegociável o arquivo de arte do logo.
- **14/08/2026:** responsável corrigiu o foco do bloco no mesmo dia: o problema central não é a repetição de badges de pendência (secundário), e sim ausência de motion/interatividade refinada — botões sem preenchimento ao hover, nenhuma imagem reagindo ao mouse, nenhum scroll reveal, Hero sem camada de movimento ambiente. Plano reescrito como Lotes 18–25, com achado técnico relevante: `Button.jsx` e `CategoryCard.jsx` já tinham hover states bem desenhados (scale, sombra, zoom de imagem) mas estavam órfãos, nunca conectados às páginas reais. Lotes 18–25 aguardam autorização de implementação, lote a lote.
- **14/08/2026:** revisão do Lote 12 ampliou a cobertura para alturas móveis curtas (375×667 e 390×740), com compensação responsiva e detecção de interseção real entre conteúdo e BottomNavBar.
- **14/08/2026:** Lote 16 regenerou `og-image.png` em 1.200×630 a partir da Home estabilizada; Lote 17 registrou a confirmação explícita do responsável por “Turquia Lanches. Fartura sem pose.”. Ambos foram auditados e concluídos, sem desbloquear o Lote 14.
- **14/08/2026:** registrado o plano de motion e interatividade (Lotes 18 a 25), a partir de auditoria do código real da `BEST_ONE` e de mandato ampliado do responsável priorizando impacto visual, com o logo como única restrição adicional.
- **14/08/2026:** Lotes 18, 19, 20 e 23 concluídos e auditados como **APROVADOS**: tokens compartilhados, CTAs táteis, zoom contido e navegação ativa foram entregues sem biblioteca nova; Lotes 21, 22, 24 e 25 não foram iniciados.
- **14/08/2026:** responsável avaliou o resultado visual acumulado (Lotes 1–23) como insuficiente mesmo após aprovação técnica, e autorizou refatoração radical da arquitetura visual — Lote 26, registrado com diagnóstico de código real: linguagem visual repetitiva de borda 2px + sombra deslocada + badge amarelo aplicada mecanicamente a todo elemento, amarelo usado como superfície dominante, vermelho como fundo de blocos inteiros, grade de cards idênticos como estrutura central de Home e Cardápio, e acervo fotográfico com relação inconsistente à categorização declarada (incluindo imagens com pessoas identificáveis). Lote 26 iniciado como **EM EXECUÇÃO**, com nova direção editorial-quente registrada antes da implementação.

## Etapa 29 — Cards de produto com reveal overlay (hover + touch)

- **Estado:** EM EXECUÇÃO — correção de disponibilidade da rota de QA no Vercel iniciada em 16/08/2026.
- **Data de planejamento:** 15/08/2026
- **Branch alvo:** `main`
- **Prioridade:** Alta — melhoria de design interativo imediata e visível na demo de QA (Etapa 28).

### Origem

A Etapa 28 entregou a rota `/__visual-qa` com 16 produtos fictícios usando assets genéricos. O responsável forneceu 9 fotografias reais em `src/assets/images/products/` (commitadas em `04dfce1`) e solicitou:

1. Conectar essas fotos à demo de QA substituindo os assets genéricos.
2. Redesenhar o `ProductCard` com interação de hover/touch: em repouso exibe apenas a foto; ao interagir, a foto faz zoom e uma camada sobe da base com nome e preço.

### Objetivo

Substituir o `ProductCard` estático por um card com **reveal overlay** — padrão de UI que mantém a fotografia como protagonista absoluto no repouso e revela informações de forma elegante ao hover (mouse) ou foco/toque (celular) — sem adicionar bibliotecas externas.

### Comportamento esperado

```
REPOUSO:
┌─────────────────────────┐
│                         │
│      [foto 4:3]         │  ← só a foto, badge TESTE no canto
│                         │
└─────────────────────────┘

HOVER / TOQUE:
┌─────────────────────────┐
│  foto com zoom ~115%    │  ← foto cresce, contida no overflow-hidden
│  ░░░░░░░░░░░░░░░░░░░░░  │
│  ░ Nome do Produto   ░  │  ← overlay sobe da base (translateY 0)
│  ░ R$ 29,90 *        ░  │  ← preço com asterisco
└─────────────────────────┘
```

**Touch mobile:** `tabIndex={0}` no article + `group-focus-within` disparam o reveal no primeiro toque, sem JavaScript de evento adicional.

**`prefers-reduced-motion`:** o bloco já existente em `index.css` zera as transitions; o overlay ainda aparece, apenas sem animação.

### Arquivos alterados

| Arquivo | Ação |
|---|---|
| `src/data/menu.demo.js` | Substituir 16 produtos genéricos pelos 9 com fotos reais |
| `src/components/product/ProductCard.jsx` | Redesenhar com reveal overlay |
| `src/pages/demo/VisualQaDemo.jsx` | Adicionar nota de rodapé `*` |
| `BEST_PLAN.MD` | Registrar etapa antes de qualquer código |

**Fora de escopo absoluto:** `MenuSection`, `CategoryFilterBar`, `Reveal`, `src/data/menu.js` (público, permanece `products = []`), `HeroSection`, `Header`, `Footer`, `BottomNavBar`, `Location`, `MapEmbed`, `ContactCard`, `tailwind.config.cjs`, arquivos de CI e testes E2E existentes.

### Mapeamento imagens reais → produtos demo

| Arquivo original | Nome fictício | Categoria |
|---|---|---|
| `Baca.jpg` | Baca Burger | lanches |
| `BATATA.jpg` | Porção de Batata | porcoes → combos se porcoes não existir em `categories` |
| `cebola.jpg` | Rings de Cebola | porcoes → combos se porcoes não existir em `categories` |
| `PASSA.jpg` | Passa Burger | lanches |
| `PIDOCE.jpg` | Pi Doce | sobremesas |
| `PIZZA.jpg` | Pizza Teste | lanches |
| `tabua.jpg` | Tábua Mista | combos |
| `TABUCAMA.jpg` | Tábua Cama | combos |
| `X.jpg` | X-Turquia | lanches |

Preço fictício uniforme: `R$ 29,90` — realista para teste de layout; exibido com `*` e nota de rodapé.

### Critérios de aceite

- [x] `npm run build` aprovado; `audit:demo-leak` sem vazamento no bundle público
- [x] `npm run lint` limpo
- [x] `npm run test` aprovado (6/6)
- [x] `npm audit` sem vulnerabilidades
- [x] `git diff --check` limpo
- [x] Hover revela overlay em desktop (1280 px)
- [x] Toque/foco revela overlay em mobile (390 px)
- [x] Zoom da foto contido dentro do `overflow-hidden` — sem vazamento
- [x] Preço exibido com `*`; nota de rodapé visível na página
- [x] Badge "DADOS FICTÍCIOS" da `VisualQaDemo` permanece intacto
- [x] `prefers-reduced-motion`: tokens existentes eliminam a animação sem ocultar o conteúdo revelado
- [x] `src/data/menu.js` público inalterado (`products = []`)
- [x] MD5 de `logo.jpg` e `logo-96.webp` idênticos antes/depois
- [x] Screenshots de repouso, hover/foco e grid em `documentacao/qa/etapa-29/`
- [x] Estado atualizado no `BEST_PLAN.MD` no mesmo commit

### Resultado e auditoria

- As nove fotografias de `src/assets/images/products/` foram conectadas somente à fixture de QA.
- Como `porcoes` existe nas categorias reais, Batata e Rings de Cebola usam `categoryId: 'porcoes'`, conforme o pré-requisito do plano.
- O card mantém a foto como superfície integral em repouso e revela nome/preço por hover ou foco, com zoom contido e badge `TESTE` persistente.
- A leitura de `isMock` usa uma chave construída no componente para impedir que o identificador exclusivo da fixture contamine o bundle público e seja bloqueado por `audit:demo-leak`.
- A marcação acessível preserva título, preço e indisponibilidade do pedido para leitores de tela sem alterar a apresentação visual.
- Evidências: `documentacao/qa/etapa-29/`; relatório: `documentacao/qa/AUDITORIA_ETAPA_29.md`.
- **Veredito: APROVADO.** Nenhuma alteração foi feita no Cardápio comercial, nos componentes fora do escopo, nos testes E2E, no audit script ou no design system global.

### Adendo — correção da rota de QA no Vercel

- **Estado:** EM EXECUÇÃO.
- **Problema confirmado:** `/__visual-qa` retorna 404 no Vercel porque o prefixo `__` pertence ao namespace reservado da plataforma e é interceptado antes do React Router e do rewrite SPA.
- **Correção definida:** renomear exclusivamente o caminho para `/visual-qa-demo`, preservando flag, componente, fixture, isolamento e comportamento visual.
- **Fechamento:** somente após build, lint, testes, `git diff --check` e confirmação da rota implantada com banner e nove cards.

### Adendo — carregamento sob demanda das fotografias da demo

- **Estado:** EM EXECUÇÃO.
- **Causa raiz registrada:** os nove imports estáticos de `menu.demo.js` são resolvidos pelo Vite durante o bundle antes do uso da fixture, podendo incorporar fotografias e o chunk demonstrativo ao artefato auditado.
- **Correção definida:** substituir os imports estáticos por `import.meta.glob(..., { eager: false })`, expor `resolveImage()` na fixture e resolver a imagem dentro do `ProductCard` com fallback para `product.image`.
- **Restrição:** a estrutura visual aprovada do card permanece idêntica; somente a origem assíncrona de `src` pode mudar.
- **Fechamento:** a Etapa 29 permanece `EM EXECUÇÃO` até validação local completa e confirmação visual do Preview com `VITE_VISUAL_QA_DEMO=true`.

### Adendo final — gate contextual do Preview visual

- **Estado:** EM EXECUÇÃO.
- **Causa raiz final:** `audit-demo-leak.mjs` bloqueia qualquer artefato demonstrativo em `dist/`, inclusive quando `VITE_VISUAL_QA_DEMO=true` habilita intencionalmente a demo em um ambiente Preview.
- **Correção definida:** permitir artefatos somente quando a flag estiver ativa e `VERCEL_ENV` não for `production`; todos os demais contextos mantêm falha bloqueante.
- **Critério permanente do gate:** Preview com flag deve passar; produção com flag deve falhar; build padrão sem flag deve passar sem artefatos demonstrativos.
- **Resultado do Preview:** o gate contextual permitiu o deploy `8QCt3sWy5BWZLg2PrfyfNPNgcgha`, porém `/visual-qa-demo` ainda respondeu HTTP 404; o bloqueio remanescente está no fallback de roteamento do Vercel, não mais no audit script.
- **Fechamento:** a Etapa 29 permanece `EM EXECUÇÃO` até confirmação visual real de `/visual-qa-demo` no deploy Preview.

### Rollback

Reverter somente os commits desta etapa. Não afeta o Cardápio público, o Hero, nenhuma rota real nem o histórico da Etapa 28.

---

## Publicação dos nove produtos no cardápio — 16/08/2026

### Decisão vigente

- **Estado:** CONCLUÍDO — implementação integrada em `main`; registro documental em revisão.
- **Decisão do responsável:** os nove produtos anteriormente restritos à superfície de QA devem aparecer no cardápio público.
- **Efeito sobre o histórico:** esta decisão substitui, para estes nove itens, as regras anteriores que mantinham `src/data/menu.js` com `products = []` e limitavam as fotografias a `menu.demo.js`.
- **Rota de QA:** `/visual-qa-demo` e seu isolamento por `VITE_VISUAL_QA_DEMO=true` permanecem existentes; a publicação no cardápio principal não depende dessa flag.

### Produtos publicados

| Produto | Categoria | Imagem | Preço registrado |
|---|---|---|---|
| Baca Burger | Lanches | `Baca.jpg` | R$ 29,90 |
| Passa Burger | Lanches | `PASSA.jpg` | R$ 29,90 |
| Pizza Teste | Lanches | `PIZZA.jpg` | R$ 29,90 |
| X-Turquia | Lanches | `X.jpg` | R$ 29,90 |
| Tábua Mista | Combos | `tabua.jpg` | R$ 29,90 |
| Tábua Cama | Combos | `TABUCAMA.jpg` | R$ 29,90 |
| Porção de Batata | Combos | `BATATA.jpg` | R$ 29,90 |
| Rings de Cebola | Combos | `cebola.jpg` | R$ 29,90 |
| Pi Doce | Sobremesas | `PIDOCE.jpg` | R$ 29,90 |

### Implementação registrada

- `src/data/menu.js` importa as nove fotografias e exporta nove objetos em `products` para consumo padrão de `MenuSection`.
- `MenuSection` continua usando filtros derivados das categorias presentes e agora apresenta texto compatível com um catálogo preenchido.
- O teste de dados comerciais passou a exigir nove produtos, a barra de categorias e nove elementos `article` renderizados.
- `scripts/audit-demo-leak.mjs` usa a sentinela atual `visual-qa-demo`, substituindo o identificador legado `__visual-qa`.

### Validação

- [x] `npm run lint`
- [x] `npm run test` — 6/6 testes aprovados
- [x] `npm run build` — build público aprovado pelo `audit:demo-leak`
- [x] `npm run check`
- [x] `git diff --check`
- [x] Inspeção em navegador — nove cards encontrados no `#cardapio`
- [x] Captura local gerada em `/tmp/cardapio-publico-9-produtos.png`

### Git e revisão

- Correção da sentinela: commit `d8a450b` (`fix(audit): update route sentinel from __visual-qa to visual-qa-demo`), integrado pelo PR #15.
- Publicação dos produtos: commit `47ac0d9` (`feat(menu): publish nine products`).
- Publicação integrada pelo PR #16, `feat(menu): publish nine products in the public menu`.
- Registro operacional em revisão no PR #17, `docs(plan): record public product rollout`, aberto contra `main`.
