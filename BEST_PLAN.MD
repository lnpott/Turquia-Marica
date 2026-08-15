# BEST_PLAN — Implantação `BEST_ONE`

> **Registro operacional vigente.** Este arquivo controla etapas, estados, evidências e novas mudanças. O código e o Git atuais continuam sendo a fonte de verdade; o `Roadmap_Mestre_CLAUDE.md` permanece como histórico arquitetural.

## Controle

- **Branch oficial:** `BEST_ONE`
- **Baseline:** `d242ed12756e1aa02b3f4d8f502e5eba80f012f1`
- **Início:** 12/08/2026
- **Regra:** atualizar este documento no mesmo commit de cada lote.
- **Estados:** `NÃO INICIADO`, `BLOQUEADO`, `EM EXECUÇÃO`, `VALIDADO`, `CONCLUÍDO`.

## Baseline validada

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
| Imagens provisórias | Permitir somente como “Imagem ilustrativa”, com `alt` verdadeiro. |
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
| 9. Refinamento definitivo do design | CONCLUÍDO | Home, Cardápio e Localização implementados, auditados e aprovados com as ressalvas registradas; conteúdo e assets oficiais permanecem pendentes. |
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
- `BEST_ONE` sincronizada; nenhuma alteração em `main`.

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

### Ordem de execução recomendada

1. **Lote 11** (consistência Home ↔ Cardápio) — maior impacto visual, menor risco, já com solução clara.
2. **Lote 12** (BottomNavBar sobrepondo conteúdo) — bug real, independente do Lote 11, pode ser feito em paralelo ou logo em seguida.
3. **Lote 13** (auditoria Header/Footer/Localização) — preventivo; só vira trabalho de código se achar algo.
4. **Lote 15** (precisão semântica das imagens) — pode ser feito junto com o 13, é de baixo risco mas depende de acervo disponível.
5. **Lote 16** (regenerar og-image) — só ao final, depois que a aparência estabilizar.
6. **Lote 17** (tagline) — paralelo, não bloqueia nem é bloqueado pelos demais; corre em paralelo como pendência de decisão do cliente.
7. **Lote 14** — não é um lote de trabalho nosso; é a lista do que travar até o cliente responder.

---

### Plano de motion e interatividade — Lotes 18 a 25 (proposto por Claude)

> **Estado geral:** Lotes 18, 19, 20 e 23 CONCLUÍDOS; Lotes 21, 22, 24 e 25 NÃO INICIADOS. Mandato ampliado pelo responsável em 14/08/2026: impacto visual real prevalece sobre "menor mudança possível"; a única linha vermelha adicional é preservar o logo (`logo.jpg`/`logo-96.webp`) intocado. As linhas vermelhas anteriores (nenhum dado comercial inventado) continuam valendo.

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

- **Estado:** NÃO INICIADO.
- **Prioridade:** Média-alta.
- **Constatação:** não existe `IntersectionObserver` no projeto; todo conteúdo abaixo do Hero aparece de uma vez, em Home, Cardápio e Localização.
- **Implementação:** hook nativo baseado em `IntersectionObserver` (sem biblioteca nova); entrada sutil (fade + leve translação) nas seções, em cascata nos cards de categoria; dentro do bloco `prefers-reduced-motion` já existente, conteúdo aparece direto.
- **Fora de escopo:** qualquer biblioteca externa de animação.
- **Critério de aceite:** Lighthouse Performance não regride (baseline 96 mobile/Cardápio); `axe` sem violações; validado com `prefers-reduced-motion: reduce` ativo no sistema.

---

#### Lote 22 — Movimento ambiente no Hero

- **Estado:** NÃO INICIADO — decisão de direção pendente do responsável antes de codar.
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

- **Estado:** NÃO INICIADO — obrigatório antes de fechar o bloco 18–23.
- **Prioridade:** Alta, sequencial aos demais.
- **Constatação:** motion mal implementado é a causa mais comum de regressão de Lighthouse (CLS/TBT) e de `prefers-reduced-motion` ignorado; baseline atual é Performance 96, Acessibilidade 100, Boas Práticas 100, SEO 100, LCP 2,5 s, CLS 0, TBT 30 ms.
- **Implementação:** reexecutar Lighthouse mobile nas três rotas e comparar contra a baseline; confirmar via `axe` que nenhum elemento interativo novo ficou sem `focus-visible`; validar manualmente, com `prefers-reduced-motion: reduce` ativo no sistema operacional, que todo motion dos Lotes 19–23 é desativado ou reduzido.
- **Fora de escopo:** qualquer mudança de código além de correções de performance encontradas na auditoria.
- **Critério de aceite:** métricas de baseline mantidas ou melhores; relatório registrado em `documentacao/qa/AUDITORIA_LOTES_18_23.md`.

---

#### Lote 25 — Fechamento: regenerar `og-image.png`

- **Estado:** NÃO INICIADO — último lote do bloco, só depois que a Home estabilizar com o motion aplicado.
- **Prioridade:** Baixa.
- **Constatação:** `public/og-image.png` foi regenerado no Lote 16 a partir da Home sem motion; a imagem estática de fallback social precisa continuar fiel ao layout final.
- **Implementação:** regenerar `og-image.png` uma única vez, no padrão do Lote 16 (1.200×630 px), a partir do estado final da Home.
- **Critério de aceite:** imagem reflete o layout final; validada em debugger de Open Graph.

---

### Ordem de execução recomendada — Lotes 18 a 25

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
## Plano de impacto visual e interação — Lotes 18 a 25 (proposto por Claude, autorizado por [responsável do projeto] em 14/08/2026, redirecionado em 14/08/2026)

> **Mandato explícito deste bloco, diferente dos anteriores:** o responsável autorizou priorizar impacto visual real ("ficar lindo de portfólio") mesmo que isso altere estrutura, componentes ou copy do projeto. A única restrição inegociável é preservar o arquivo de logo (`src/assets/images/brand/logo.jpg` / `logo-96.webp`) sem alteração de arte. Fora isso, este bloco tem liberdade maior que o princípio de "menor mudança possível" que regeu os Lotes 1–17.
>
> **Correção de foco (mesmo dia):** a primeira versão deste bloco tratava a repetição de badges "não disponível/ilustrativa" como causa principal da percepção de "site ruim". O responsável esclareceu que isso é secundário — o problema real é **falta de motion e de interatividade refinada**: nada convida o mouse, os botões não têm preenchimento/resposta ao passar por cima, não há nada "passando"/vivo na tela, o site não parece um produto de alto acabamento. Dados de preço/produto/endereço seguem propositalmente provisórios e não são o alvo deste bloco. O plano abaixo foi reescrito com esse foco.
>
> **O que NÃO muda:** não inventar preço, produto, endereço, telefone, horário ou URL de iFood — regra de integridade de conteúdo, não estética, permanece intacta.

### Diagnóstico consolidado (auditoria de código real, não só screenshot)

Inspeção de `Header.jsx`, `HeroSection.jsx`, `MenuHighlights.jsx`, `Home.jsx`, `Button.jsx`, `CategoryCard.jsx`, `Badge.jsx`, `index.css` e `tailwind.config.cjs` na branch `BEST_ONE` (commit `8d25666`).

**O que existe de motion hoje, em toda a base de código:**
- `page-fade-in` — fade de 260ms na troca de rota (`MainLayout`).
- `hero-kenburns` — zoom de 1 → 1.02 em 9s, aplicado uma vez, no Hero.
- Hovers pontuais e genéricos: `hover:-translate-y-1` em cards e botões, `hover:bg-primary-hover` no CTA do Header, `group-hover:scale-110` em `CategoryCard.jsx`.
- `transition-transform`/`transition-colors` aplicados isoladamente por componente, sem sistema de timing/easing compartilhado.

**O que não existe:**
- Nenhuma transição de sombra, brilho ou preenchimento animado em botões — o CTA principal (`bg-primary`) troca de cor no hover mas sem nenhuma sensação de profundidade ou resposta tátil além do deslocamento vertical.
- Nenhum zoom/parallax de imagem nos cards realmente usados. `CategoryCard.jsx`, que tem `group-hover:scale-110` bem construído, **está órfão — zero componentes o importam**. `MenuHighlights.jsx`, que é o componente de fato renderizado em Home e Cardápio, não tem nenhum tratamento de hover na imagem.
- Nenhum scroll-reveal — todo o conteúdo abaixo da dobra aparece estático, sem entrada quando o usuário rola a página.
- Nenhum micro-feedback em cliques (ripple, scale-down) fora do que resta em `Button.jsx` — também órfão, zero uso real.
- Nenhuma composição do tipo "algo passando" — o Hero é uma imagem estática única; não há nenhuma segunda camada de movimento ambiente (parallax leve, textura em deslocamento, contador, ticker, etc.).

**Achado estrutural relevante:** `src/components/ui/Button.jsx` e `src/components/product/CategoryCard.jsx` já têm hover states bem desenhados (scale, shadow, zoom de imagem, active:scale-95) mas **não são usados em nenhuma página real** — os componentes ativos (`HeroSection.jsx`, `MenuHighlights.jsx`, `Home.jsx`) reimplementam botões e cards com classes Tailwind cruas e motion mais pobre. Isso significa que parte do trabalho de "deixar o site chamativo" já foi pensado antes e nunca chegou a ser conectado — não é ausência de ideia, é ausência de fiação.

O acervo fotográfico (`src/assets/images/`) continua sendo genérico/stock até o Lote 14 (bloqueado); os lotes abaixo trabalham com o que existe hoje, mas o objetivo é que a fotografia atual pareça mais viva por causa do movimento e da resposta da interface, não por ser trocada.

---

### Lote 18 — Sistema de motion compartilhado (fundação)

- **Estado:** NÃO INICIADO
- **Prioridade:** Alta — pré-requisito técnico para os lotes seguintes; sem isso, cada componente reinventa timing/easing próprio e o resultado fica inconsistente.
- **Objetivo:** criar um pequeno conjunto de tokens de motion (duração, easing, distância de translação) em `tailwind.config.cjs`/`index.css`, para que hover, entrada de scroll e feedback de clique usem a mesma "física" em todo o site.
- **Implementação:**
  1. Definir 2–3 curvas de easing nomeadas (ex. `ease-premium` para hover — suave e rápida —, `ease-reveal` para entrada de scroll — mais lenta, com leve overshoot) como utilitário CSS reutilizável.
  2. Definir escala de duração padrão (`150ms` micro-interação de botão, `400–600ms` reveal de seção, `600–900ms` elementos maiores de Hero) documentada em comentário no `index.css`, no mesmo padrão de documentação já usado pelos Lotes 11/11.1/14.2 existentes no arquivo.
  3. Garantir `prefers-reduced-motion` cobrindo todo o novo sistema, seguindo o padrão já usado para `page-transition`/`hero-kenburns`.
- **Critério de aceite:** tokens definidos e documentados; nenhum componente alterado ainda neste lote (é só fundação).
- **Auditoria exigida:** `npm run check`; confirmação visual de que nada mudou ainda na tela (lote é infraestrutura).

---

### Lote 19 — Botões com preenchimento, profundidade e resposta ao hover/clique

- **Estado:** NÃO INICIADO
- **Prioridade:** Alta — é o pedido mais explícito ("botões com preenchimento ao passar o mouse").
- **Constatação:** o CTA primário do Hero (`bg-primary` com `hover:-translate-y-1`) e o botão do Header (`hover:bg-primary-hover`) trocam cor de forma abrupta e só deslocam verticalmente; `Button.jsx`, com `hover:scale-[1.02]`/`active:scale-95`/`hover:shadow-lg`, existe pronto mas está órfão.
- **Implementação:**
  1. Decidir (com preferência técnica registrada aqui): recuperar e conectar `Button.jsx` aos pontos de CTA reais (Hero, Header, Cardápio), ou portar seus estados de hover diretamente para as classes já usadas em `HeroSection.jsx`/`Header.jsx`/`MenuHighlights.jsx` — nesse caso removendo `Button.jsx` como código morto em vez de deixá-lo desconectado.
  2. Em todo botão preenchido (`bg-primary`), adicionar: preenchimento animado (ex. camada de cor que se expande do centro ou da base no hover, via `::before` com `transform: scaleX` ou `background-position` em gradiente), sombra que ganha profundidade (`shadow-[6px_6px_0_...]` crescendo a partir do offset atual de 4px), e `active:scale-95`/`active:translate-y-0` para feedback tátil de clique.
  3. Em todo botão outline/secundário (ex. "Como chegar"), inverter preenchimento no hover (borda vira fundo) em vez de só mudar de cor.
- **Fora de escopo:** mudar texto/copy dos botões, mudar hierarquia de qual botão é primário/secundário.
- **Critério de aceite:** todo botão do site (Header, Hero, Cardápio, Localização, Footer) responde ao hover com pelo menos dois sinais simultâneos (cor/preenchimento + profundidade) e ao clique com feedback tátil; nenhuma regressão de contraste/acessibilidade; `Button.jsx` ou está em uso real, ou foi removido — nunca os dois estados ao mesmo tempo.
- **Auditoria exigida:** grep confirmando uso real de `Button.jsx` (ou sua remoção); captura em GIF ou sequência de screenshots do hover em pelo menos 3 botões-chave; teste de teclado (`:focus-visible` preservado).

---

### Lote 20 — Cards de categoria com zoom de imagem e elevação no hover

- **Estado:** NÃO INICIADO
- **Prioridade:** Alta — segundo pedido mais explícito ("imagem passando", "mouse responsivo ao passar em algo").
- **Constatação:** `CategoryCard.jsx` já resolveu isso (`group-hover:scale-110 transition-transform duration-500` na imagem, gradiente escurecendo a legenda) mas está órfão; o componente realmente usado, `MenuHighlights.jsx`, não tem nenhum tratamento de imagem no hover, só `hover:-translate-y-1` no card inteiro.
- **Implementação:**
  1. Portar o padrão de zoom de imagem de `CategoryCard.jsx` para dentro de `MenuHighlights.jsx` (que é o componente ativo em Home e Cardápio): imagem escala suavemente (`scale-105` a `scale-110`) dentro de um contêiner com `overflow-hidden`, sombra do card cresce, borda ganha destaque de cor no hover.
  2. Aplicar o mesmo tratamento a qualquer outro card de imagem clicável do site (se houver, revisar `ProductGrid.jsx`).
  3. Depois de portado e confirmado em uso, remover `CategoryCard.jsx` como código morto — não deixar duas implementações divergentes do mesmo padrão convivendo no repositório.
- **Critério de aceite:** todo card de categoria com imagem responde ao hover com zoom de imagem contido (sem vazar do card), elevação de sombra e transição suave (~400–500ms); zero código de card duplicado/órfão ao final do lote.
- **Auditoria exigida:** captura antes/depois do hover em desktop; confirmação de que `CategoryCard.jsx` foi removido ou passou a ser genuinamente usado (não os dois estados).

---

### Lote 21 — Scroll reveal (entrada de conteúdo ao rolar a página)

- **Estado:** NÃO INICIADO
- **Prioridade:** Alta — resolve a sensação de "página estática" abaixo da primeira dobra, que hoje nenhuma seção tem.
- **Constatação:** Home e Cardápio têm múltiplas seções (`FACTS`, `MenuHighlights`, "Sobre a casa") que aparecem inteiras e imóveis assim que a página carrega — nada acontece quando o usuário rola.
- **Implementação:**
  1. Implementar reveal de entrada (fade + leve translação, usando os tokens do Lote 18) disparado por `IntersectionObserver` nativo — **sem adicionar biblioteca nova** (`framer-motion`, `aos`, etc. ficam fora, coerente com a regra histórica de não introduzir dependências sem necessidade comprovada); React puro com hook custom é suficiente para este caso de uso.
  2. Aplicar em: cards de `MenuHighlights`, bloco de "Informações rápidas" (Home), bloco "Sobre a casa", cards de `Location`/`ContactCard`.
  3. Orquestrar entrada em cascata leve (stagger de ~60–80ms entre itens de uma mesma grade) em vez de todos os elementos aparecendo no mesmo instante.
  4. Respeitar `prefers-reduced-motion`: quando ativo, conteúdo aparece direto, sem observer/animação.
- **Critério de aceite:** rolar a Home e o Cardápio do topo ao fim mostra conteúdo entrando de forma orquestrada, não tudo estático; zero dependência nova no `package.json`; `prefers-reduced-motion` testado e funcional.
- **Auditoria exigida:** gravação/sequência de screenshots do scroll; `npm run check`; confirmação de que `package.json` não ganhou nenhuma dependência nova.

---

### Lote 22 — Camada de movimento ambiente no Hero

- **Estado:** NÃO INICIADO
- **Prioridade:** Média-alta — é o elemento de "algo chamativo passando na tela" que hoje não existe fora do Ken Burns único.
- **Constatação:** o Hero tem uma única imagem estática com Ken Burns sutil; não há nenhuma segunda camada de movimento que dê sensação de vitalidade/ambiente.
- **Implementação (avaliar as opções abaixo com captura de protótipo antes de decidir qual seguir — não implementar as três):**
  1. **Parallax leve** entre a foto do Hero e o texto/CTA sobre ela ao rolar a página (a foto se move a uma velocidade ligeiramente diferente do texto), usando `transform: translateY` calculado a partir do scroll — nativo, sem lib.
  2. **Textura em movimento** no `editorial-grid` de fundo (já existente como grid de linhas finas) — deslocamento contínuo extremamente sutil (`background-position` animado) para dar sensação de ambiente vivo sem competir com a fotografia.
  3. **Micro-flutuação** no elemento de moldura do Hero (`brand-stamp`, já rotacionado -3deg) — leve oscilação de rotação/posição em loop lento, reforçando o tratamento "colado/fotografia física" que o design já sugere.
- **Restrição:** qualquer opção escolhida deve manter `FOTOGRAFIA PRIMEIRO" — o movimento nunca pode escurecer, desfocar ou disputar atenção com a foto principal; violação disso é regressão, não refinamento.
- **Critério de aceite:** uma opção escolhida e aprovada explicitamente antes do commit; Hero perceptivelmente "vivo" sem comprometer legibilidade do texto ou nitidez da foto; `prefers-reduced-motion` desativa o efeito.
- **Auditoria exigida:** vídeo curto ou GIF do efeito em ação; teste em 375–414px mobile confirmando que não introduz scroll horizontal nem jank de performance.

---

### Lote 23 — Navegação e links com resposta refinada

- **Estado:** NÃO INICIADO
- **Prioridade:** Média.
- **Constatação:** links do Header (`NAV_LINKS`) e do Footer usam `hover:bg-surface-container-low hover:text-primary` — funcional, mas sem nenhum movimento (ex. sublinhado animado, indicador de página ativa com transição).
- **Implementação:**
  1. Adicionar sublinhado/indicador animado (`transform: scaleX` a partir do centro ou borda) nos links do Header ativados no hover, reservando o estado "página atual" (`NavLink` já expõe `isActive`) com tratamento visual distinto e permanente, não só hover.
  2. Aplicar padrão coerente ao menu mobile (`menu-mobile`) e ao `BottomNavBar`, que hoje trocam de cor de forma abrupta ao navegar.
- **Critério de aceite:** navegação inteira (desktop, mobile, bottom bar) com transições consistentes de hover/estado ativo; foco de teclado (`:focus-visible`) preservado em todos os pontos.
- **Auditoria exigida:** captura de cada superfície de navegação com o novo tratamento; teste de teclado completo (Tab, Shift+Tab, Escape no menu mobile).

---

### Lote 24 — Auditoria de performance e acessibilidade do novo motion

- **Estado:** NÃO INICIADO
- **Prioridade:** Alta — obrigatória antes de considerar os Lotes 18–23 fechados; motion mal implementado é o risco mais concreto deste bloco (jank, CLS, fadiga visual, ou quebra de acessibilidade).
- **Objetivo:** confirmar que o conjunto de novas animações não degradou performance nem acessibilidade.
- **Implementação/checklist:**
  1. Repetir a suíte de testes já usada nos lotes anteriores: `npm run check`, `npm run test:e2e`, `npm audit --audit-level=high`, `git diff --check`.
  2. Lighthouse mobile em Home e Cardápio, comparando contra a baseline já registrada no Lote 1 (Performance 96, CLS 0, TBT 30ms) — qualquer queda relevante é motivo para simplificar antes de aprovar o lote.
  3. Confirmar `prefers-reduced-motion` desativando corretamente cada novo efeito (Lotes 19–23), um por um.
  4. Confirmar zero dependência nova no `package.json` (todo o motion deste bloco é CSS + IntersectionObserver nativo).
  5. Revisar se a quantidade total de movimento simultâneo na tela não ultrapassa o "movimento perceptível, mas nunca protagonista" já registrado como princípio no roadmap histórico — ler novamente a seção 12 do `Roadmap_Mestre_CLAUDE.md` antes de aprovar.
- **Critério de aceite:** nenhuma regressão de Lighthouse/CLS/TBT; `prefers-reduced-motion` cobrindo 100% do motion novo; zero dependência nova.
- **Auditoria exigida:** relatório com números de antes/depois, não impressão subjetiva.

---

### Lote 25 — Consistência final e regeneração de `og-image.png`

- **Estado:** NÃO INICIADO
- **Prioridade:** Baixa — fechamento, só ao final.
- **Implementação:** checklist comparativo entre as quatro rotas (mesmo espírito do Lote 13) confirmando que o novo motion está aplicado de forma consistente em todo o site, não só em Home/Hero; regenerar `og-image.png` (processo do Lote 16) se a Home mudou visualmente o suficiente para desatualizar a imagem social.
- **Critério de aceite:** relatório de auditoria; `og-image.png` atualizado se necessário.

---

### Ordem de execução recomendada

1. **Lote 18** (fundação de motion) — pré-requisito técnico, sem tela nova ainda.
2. **Lote 19** (botões) — pedido explícito, maior visibilidade imediata.
3. **Lote 20** (cards de categoria) — pedido explícito, reaproveita trabalho já existente e órfão.
4. **Lote 21** (scroll reveal) — resolve a sensação de página estática abaixo da dobra.
5. **Lote 22** (movimento ambiente do Hero) — maior risco/maior recompensa; exige aprovação de qual variante seguir antes de codar.
6. **Lote 23** (navegação) — polimento, pode rodar em paralelo ao 21/22.
7. **Lote 24** (auditoria de performance/acessibilidade) — obrigatório antes de fechar o bloco.
8. **Lote 25** (fechamento/og-image) — só ao final.

### Regra de execução mantida deste bloco

Mesmo com o mandato de maior liberdade visual, a metodologia de execução do projeto continua valendo: implementar lote a lote, rodar `npm run check`/`npm run build`, gerar evidência visual desktop+mobile (idealmente com captura do próprio hover/motion, não só do estado estático), registrar resultado e ressalvas aqui, e aguardar autorização explícita antes de commit e antes de push. "Liberdade para mudar mais" não significa "liberdade para pular auditoria" — e motion mal auditado é justamente o tipo de mudança que pode piorar performance/acessibilidade sem ninguém perceber até tarde.

## Lote 26 — Refatoração radical da arquitetura visual (Home, Cardápio, Localização)

- **Estado:** EM EXECUÇÃO — implementação concluída, aguardando auditoria independente e testes E2E (bloqueados por ambiente, ver abaixo)

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

Abandono do padrão "caixa com borda preta de 2px + sombra deslocada + badge amarelo" como linguagem repetida em toda a interface. Nova lógica:

1. **Vermelho como acento raro e proposital**, nunca fundo de bloco inteiro — reservado a 1–2 elementos por tela no máximo (uma palavra em destaque, um traço, um ícone), reforçando que é usado para chamar atenção pontual, não para pintar seções.
2. **Amarelo rebaixado a apoio quase-neutro** — usado em traços finos, sublinhados, pontos de pontuação visual; nunca mais como fundo sólido de badge ou menu inteiro.
3. **Creme/branco como protagonista do espaço** — respiro generoso substitui borda como forma de separar elementos; hierarquia por tamanho tipográfico e posição, não por caixa.
4. **Tipografia como elemento central da composição**, não decoração dentro de caixa — títulos grandes podem cruzar sobre imagens, ocupar assimetricamente o layout, criar ritmo por variação de escala real (não os mesmos 2–3 tamanhos repetidos).
5. **Fotografia tratada como textura ambiente quando não é fiel ao conteúdo** (caso do acervo atual) — em vez de emoldurada com etiqueta "imagem ilustrativa", integrada de forma que a composição não prometa uma relação editorial que a imagem não cumpre.
6. **Cards, quando usados, variam de tamanho/proporção entre si** (grid assimétrico) em vez de grade uniforme repetida — evita a sensação de "catálogo de e-commerce" que o brief pede para não parecer.
7. **Estados provisórios ("não disponível", "em construção") comunicados com linguagem tipográfica própria e discreta**, não como selo colorido repetido — a honestidade do conteúdo permanece; a forma de comunicá-la muda.

### Escopo técnico (status por arquivo)

**Fundação de tokens (concluído):**
- [x] `tailwind.config.cjs` — nova escala tipográfica editorial (`editorial-hero`, `editorial-headline`, etc.), `borderRadius` reduzido a quase-reto (2px), mantendo paleta de cor existente (papéis é que mudam, não os hex).
- [x] `src/styles/index.css` — removidas `.editorial-grid` e `.brand-stamp` como classes globais; adicionadas `.paper-texture`, `.hairline`, `.hairline-top`, `.hairline-bottom` como novo vocabulário de separação; `--color-hairline` adicionado como token; `.card-shadow-hover` suavizado.
- [x] `src/components/layout/Header.jsx` — recomposto (logo com mais presença própria, navegação silenciosa, removida borda em hover de link).

**Concluído na execução:**
- [x] `src/components/home/HeroSection.jsx` — removido `.brand-stamp`; nova composição tipográfica dominante, imagem como textura de fundo.
- [x] `src/pages/Home.jsx` — seções reordenadas (marca → local → experiência → comida → ação); bloco vermelho de fundo total removido.
- [x] `src/components/menu/MenuHighlights.jsx` — grid uniforme substituído por lista editorial numerada (imagem circular pequena, número de ordem, tipografia dominante); `.editorial-grid` residual removido; prop `compact` não utilizada removida.
- [x] `src/pages/Menu.jsx` — recomposto com nova lógica, mantendo descoberta honesta e proporcional.
- [x] `src/pages/Location.jsx`, `src/components/location/ContactCard.jsx`, `src/components/location/MapEmbed.jsx` — recompostos, CTA de rota funcional e honesto mantido; `.editorial-grid` residual removido.
- [x] `src/components/layout/Footer.jsx`, `src/components/layout/BottomNavBar.jsx` — ajustados ao novo sistema visual.
- [x] `src/components/ui/Button.jsx` — reescrito com tokens compartilhados; passou a ter consumidores reais.
- [x] `grep -rn "editorial-grid\|brand-stamp" src/` — zero ocorrências confirmado.

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

**Evidência visual:** screenshots antes/depois (Home, Cardápio, Localização; desktop 1280px e mobile 390px) gerados e copiados para `documentacao/qa/lote-26/`.

### Validação obrigatória antes de considerar o lote pronto para auditoria

- [ ] `npm run check`
- [ ] `npm run test:e2e` (bloqueado por ambiente — rodar em CI)
- [ ] `npm audit --audit-level=high`
- [ ] `git diff --check`
- [ ] Auditoria de acessibilidade (teclado, foco, contraste)
- [ ] Screenshots antes/depois — Home, Cardápio, Localização — mobile (390px) e desktop (1280px)
- [ ] Confirmação de hash MD5 do logo
- [ ] `grep -rn "editorial-grid\|brand-stamp" src/` retornando vazio

### Regra de fechamento

Não marcar o lote como CONCLUÍDO antes de auditoria independente. Registrar em `documentacao/qa/` o relatório permanente (diagnóstico, decisões, antes×depois, arquivos modificados, screenshots, testes, commit, ressalvas, estado final). Não iniciar outro lote antes disso.

## Pendências externas

- URL oficial da loja no iFood.
- Telefone/WhatsApp válido.
- Endereço completo e CEP.
- Horários oficiais.
- Produtos, ingredientes, preços e badges aprovados.
- Fotografias oficiais da casa e dos produtos.

## Changelog

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
