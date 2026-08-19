# Auditoria independente — Lote 6 — Localização

## Veredito e fonte oficial

**Lote 6 — CONCLUÍDO — APROVADO COM RESSALVAS.**

A auditoria encontrou e utilizou exatamente o plano único `BEST_PLAN.MD` e o relatório permanente `documentacao/qa/AUDITORIA_LOCALIZACAO.md`. Nenhum plano, roadmap ou relatório paralelo foi criado.

## Rastreabilidade — 13/08/2026

| Papel | Commit | Autor | Mensagem | Resultado |
|---|---|---|---|---|
| Base | `fd96985` | Codex | `fix(menu): align provisional catalog with real utility` | Existe e antecede o lote. |
| Implementação | `4709438` | Codex | `feat(design): refine location around verified route` | Existe; contém código, testes, plano, relatório e quatro evidências. |
| Documentação | `63a321b` | Codex | `docs(plan): record lote 6 implementation evidence` | Existe; altera somente `BEST_PLAN.MD` e este relatório. |

O intervalo auditado foi `fd96985..63a321b`. Ele altera a Localização, testes e documentação/evidências. Não modifica componentes visuais da Home ou do Cardápio nem inicia outro lote. A árvore estava limpa na branch `work` antes da auditoria.

## Validade real do Google Maps

- **URL inicial:** `https://maps.app.goo.gl/QHAQCBvrACZZK5Ho9`.
- **Cadeia observada:** resposta `302` para uma URL `google.com/maps/place/...`, seguida por `200`.
- **Ficha final:** título codificado `Turquia Lanches - Parque Nanci`, place id `/g/11pxlg33_c` e coordenadas `-22.9219746,-42.8474819`.
- **Existência técnica do destino:** alta confiança; a URL curta e a ficha específica respondem.
- **Identidade provável do estabelecimento:** confiança média; nome e bairro coincidem, mas não houve confirmação independente de propriedade pela marca.
- **Localização regional:** confiança média/alta; o nome da ficha e o reverse geocoding do OpenStreetMap situam a coordenada em Parque Nanci, Maricá/RJ.
- **Precisão da entrada:** não confirmada. O reverse geocoding retorna um ponto próximo chamado “Ilha Nanci”, portanto não serve para afirmar fachada, entrada ou endereço comercial.
- **Confirmação oficial:** ausente. A ficha específica não prova, sozinha, que o estabelecimento controla o cadastro.
- **Desktop/mobile e início de rota:** a resolução HTTP foi reproduzida; a automação do navegador externo foi limitada pelo ambiente. O link é um `<a>` nativo e abre a ficha em nova aba, mas a etapa de iniciar direções dentro do Google Maps permanece uma ressalva, não uma confirmação oficial.

O destino não demonstrou ser uma referência regional genérica, porque a URL final contém uma ficha e place id específicos. Ainda assim, a auditoria removeu todas as promessas de “destino correto”, “rota exata”, “verificado” ou “oficial”.

## Matriz de fontes e honestidade

| Informação | Evidência | Confiança | Decisão final |
|---|---|---:|---|
| Turquia Lanches | `src/data/contact.js` e identidade do projeto | Alta como fonte interna vigente | Usar como marca. |
| Parque Nanci, Maricá/RJ | fonte interna, nome da ficha Maps e reverse geocoding OSM | Média/alta para região | Exibir como região informada, não endereço. |
| Ficha Maps | redirecionamento e place id específicos | Alta para existência técnica | Manter link; pedir conferência antes da rota. |
| `@turquialanches` | URL interna e resposta válida do Instagram oEmbed | Alta para existência técnica | Chamar de perfil/canal informado; não afirmar propriedade oficial. |
| Endereço, CEP, entrada | sem fonte oficial acessível | Ausente | Omitir; dizer “não confirmado”. |
| Horários e telefone/WhatsApp | dados internos indisponíveis, sem fonte oficial acessível | Ausente para valores | Não criar ação nem valor; dizer “não confirmados/pendente”. |
| Atendimento, retirada, entrega, estacionamento, acessibilidade e referência | nenhuma fonte confiável | Ausente | Omitir. |

A pesquisa web integrada retornou `401 Unauthorized`; isso foi tratado somente como limitação técnica. Diretórios e resultados repetidos não foram usados como confirmação.

## Afirmações auditadas

### Confirmadas

- A página usa somente marca, região parcial, ficha Maps e Instagram informado.
- Não há logradouro, número, CEP, horário, telefone, WhatsApp ou capacidade operacional inventados.
- O Maps é a ação principal, com links externos nativos e `target="_blank" rel="noopener noreferrer"`.
- `63a321b` contém somente documentação.
- Home e Cardápio não receberam ajustes estéticos no lote.

### Parcialmente confirmadas

- A ficha é específica e tecnicamente válida, mas não é uma confirmação oficial da entrada ou da propriedade do cadastro.
- O perfil do Instagram existe tecnicamente; o oEmbed não confirma que é canal oficial da empresa.
- “Como chegar” é útil para abrir a ficha, porém a etapa de iniciar uma rota e a precisão da entrada não puderam ser verificadas de ponta a ponta.

### Refutadas e corrigidas

- “Ponto oficial confirmado”, “destino correto/verificado”, “rota exata”, “área confirmada” e “canal oficial” excediam a evidência.
- A imagem anterior, embora chamada de ilustrativa, parecia um mapa real e podia transmitir precisão geográfica inexistente.
- No screenshot mobile original, a BottomNavBar cobria parte do painel de ação do mapa; “o conteúdo se move” não eliminava a interferência no estado capturado.

## Comparação visual em resolução integral

| Evidência | Antes | Implementação | Final auditado |
|---|---:|---:|---:|
| Mobile 390 px | 2.478 px | 2.470 px | 2.470 px |
| Desktop 1.280 px | 1.710 px | 1.502 px | 1.530 px |

- **Melhoria comprovada:** hierarquia e CTA são mais claros; a lista de ausências deixou de dominar; o bloco prático ficou compacto; desktop continua substancialmente menor que o antes.
- **Melhoria comprovada na auditoria:** a ilustração abstrata, com rótulo “não é um mapa”, remove a falsa aparência de ruas/entrada precisas.
- **Mudança neutra:** a altura mobile permaneceu praticamente igual ao antes; 2.470 px são aceitáveis porque incluem Header, Hero, área de orientação, bloco prático e Footer global, sem repetição de cards.
- **Ressalva:** não há fotografia/asset oficial nem mapa geográfico confirmado; o painel é orientação visual, não cartografia.
- **Coerência:** fundo quente, vermelho, amarelo, bordas e sombras permanecem alinhados aos lotes aprovados sem transformar a página em duplicação da Home.

A ordem final é **MARCA → LOCAL → ORIENTAÇÃO → CONTEXTO → AÇÃO**: marca no `h1`; Parque Nanci/Maricá aparecem no topo; CTA está na primeira dobra de 390 × 844; contexto e limitações vêm antes do bloco de informações.

## Imagem/representação clicável

A auditoria substituiu o arquivo cartográfico por uma ilustração abstrata em CSS/SVG de ícone, explicitamente rotulada **“Ilustração · não é um mapa”**. A área inteira continua sendo um único link nativo:

- possui nome acessível que informa ficha, estabelecimento, Google Maps e nova aba;
- não contém links aninhados;
- recebe foco visível em toda a moldura;
- funciona por mouse e teclado;
- usa `_blank`, `noopener` e `noreferrer`;
- não captura gesto ou rolagem;
- não depende de handler JavaScript próprio (embora a SPA inteira dependa de JavaScript para renderizar);
- repete o destino do CTA e Footer de forma compreensível: ação primária, affordance visual e navegação global.

## BottomNavBar

Foram inspecionados 320 × 568, 360 × 640, 390 × 844, 390 × 664 e 640 × 360. A barra fixa tem 72 px. No screenshot original de 390 × 844, ela cruzava o painel inferior da representação. O painel foi elevado somente no mobile e, no estado final de 390 × 844, termina 15 px antes do início da barra. Em alturas menores, a barra pode cruzar a área decorativa enquanto o painel ainda está abaixo da dobra; após rolagem, o painel e o conteúdo final podem ser exibidos integralmente. O `main` e o Footer mantêm área inferior de segurança, e nenhum texto crítico ou foco termina permanentemente coberto.

## Acessibilidade, responsividade e rotas

- Viewports 320, 360, 390, 768, 1.280 e 1.440 px: sem overflow horizontal, corte de texto ou sobreposição crítica.
- Teclado: ordem lógica, foco visível, links nativos e menu mobile fecha com `Escape` devolvendo foco.
- Semântica: um `h1` com a marca, `h2` no bloco prático, `main`, navegações nomeadas e lista descritiva.
- Axe: nenhuma violação séria/crítica nas três rotas.
- Reduced motion: transições/animações principais são desativadas pela regra global já existente.
- Console: zero erros nas rotas auditadas.
- `/`, `/cardapio/`, `/localizacao/`, `/robots.txt` e `/sitemap.xml`: HTTP 200, acesso direto e reload preservados; Home e Cardápio foram verificados somente contra regressões.

## Cobertura dos testes

Os testes verificam URL exata do Maps, `_blank`/`noopener`, marca no `h1`, região parcial, Instagram, ausência de dados inventados, representação inequivocamente ilustrativa, ausência de linguagem de precisão exagerada e separação do painel em relação à BottomNavBar. A suíte compartilhada cobre metadados, acesso direto, axe, console, reduced motion, menu mobile e overflow.

Limite identificado: parte das asserções compara a interface com constantes do próprio repositório; elas comprovam consistência/regressão, não autenticidade externa. A autenticidade foi avaliada separadamente pela cadeia de redirecionamento e matriz de fontes.

## Problemas por prioridade

- **P0:** nenhum.
- **P1 corrigido:** linguagem apresentava ficha provável como destino oficial/correto e imagem realista podia sugerir precisão geográfica.
- **P2 corrigido:** painel visual parcialmente coberto pela BottomNavBar em 390 × 844; nomenclatura “publicado/confirmado/oficial” não refletia o nível de evidência.
- **P3 aberto:** vínculo oficial da ficha e perfil, precisão da entrada, iniciação de rota dentro do serviço externo e funcionamento sem JavaScript da SPA não estão comprovados.

## Correções e arquivos alterados na auditoria

- `src/pages/Location.jsx`: reduz o grau de certeza e orienta conferência do destino.
- `src/components/location/MapEmbed.jsx`: elimina mapa possivelmente enganoso, explicita ilustração, melhora nome acessível e afasta ação da BottomNavBar.
- `src/components/location/ContactCard.jsx`: troca afirmações oficiais/exatas por estados informados e não confirmados.
- `src/components/layout/Footer.jsx`: “Canais confirmados” passa a “Canais disponíveis”; correção factual compartilhada, sem mudança estética.
- `tests/business-info.test.jsx` e `tests/e2e/site.spec.js`: cobrem honestidade, link, ilustração e interferência da navegação inferior.
- `documentacao/qa/localizacao-mobile-after.png` e `documentacao/qa/localizacao-desktop-after.png`: evidências finais regeneradas.
- `BEST_PLAN.MD` e este relatório: estado e rastreabilidade da auditoria.

## Testes finais e Git

Os comandos e resultados finais são registrados no Summary da entrega após a última execução. A árvore deve terminar limpa na branch `work`.

## Pull Request e commit

`git remote -v` não retorna remote neste checkout. Portanto não foi possível identificar, consultar ou atualizar um Pull Request real; nenhum número ou URL remotos são afirmados aqui. O commit local específico usa a mensagem `fix(location): align route claims with verified evidence`; o hash final é registrado no Summary.

## Pendências reais

- confirmação oficial da ficha Maps e da entrada correta;
- endereço postal/CEP;
- horários e telefone/WhatsApp;
- modalidades de atendimento, retirada/entrega;
- estacionamento e acessibilidade;
- confirmação oficial do vínculo de `@turquialanches`;
- revalidar CTA e dados quando houver fonte oficial acessível.

---

## Etapa 47 — Labels dedicadas do mapa (RJ-106 e parque) — 19/08/2026

### Veredito

**IMPLEMENTADO — AGUARDANDO AUDITORIA INDEPENDENTE** (padrão do repositório: não declarar lote concluído sem auditoria).

### Fonte de verdade dos dados (tiles OpenFreeMap)

A região foi inspecionada por `querySourceFeatures` nos tiles carregados (sem Overpass/Nominatim — bloqueados com 504/406/403):

| Feature | Evidência nos tiles | Confiança |
|---|---|---|
| RJ-106 | presente em `transportation_name` (`class: trunk`, `name: "Rodovia Amaral Peixoto"`, `ref: "RJ-106"`) | Alta |
| Parque | **não existe polígono `park` em nenhum tile da região**; existe POI `class: park`, `name: "Parque Céu Aberto Parque Nanci"`, ponto `-42.846444,-22.921886` | Alta |
| Shield existente | exibe o `ref` ("RJ-106") via `highway-shield-non-us` | Alta |

Decisão cartográfica: nenhuma geometria inventada. A label do parque aponta para o POI real; o nome "Parque Céu Aberto Parque Nanci" é o atributo do próprio tile.

### Implementação

- `liberty.json`: novas camadas `highway-name-rj106` (symbol, `symbol-placement: line`, filter `ref == RJ-106` + `class == trunk`, `text-color #ae0011` com halo) e `poi-park-nanci` (symbol, filter `name == 'Parque Céu Aberto Parque Nanci'`, `text-color #3d5c2a`, `text-ignore-placement: true`).
- Posicionamento: **as duas camadas foram movidas para o FIM do array de layers**. Confirmado por teste dinâmico que, neste style, camadas `symbol` só renderizam na carga quando estão no fim da pilha (após `label_country_1`); em qualquer posição anterior `queryRenderedFeatures` retornava 0.
- A shield existente exibe o ref "RJ-106"; a nova camada exibe o nome. Não há duplicação visual de texto idêntico — é a combinação convencional ref + nome.

### Evidências

- `queryRenderedFeatures` (produção `npm run build`): `highway-name-rj106` → 1 feature e `poi-park-nanci` → 1 feature em todos os viewports de aceite (375/390/768/1024/1280/1440).
- Análise de pixels por screenshot (amostragem programática, resolução integral):
  - Parque: **0 px** de texto esverdeado no `before/map-1280.png` → **364 px** no `after/map-1280.png`.
  - Canvas isolado (somente fundo + labels): texto esverdeado na região projetada do POI (cores antialiased ≈ `110,132,94` a `116,137,100`) e 102 px vermelhos do rótulo RJ-106.
  - Teste de controle com camada literal (`text-color: #ff0000`) confirmou que glifos pintam no canvas (1272 px), validando a metodologia de leitura por screenshot sobre `readPixels`.
- Screenshots: `documentacao/qa/etapa-47/before/` e `documentacao/qa/etapa-47/after/` (375–1440).

### Limitação declarada

- O agente não inspeciona imagens visualmente; as evidências de "aparece no mapa" são programáticas (pixels + `queryRenderedFeatures`). A leitura via `readPixels` de buffer WebGL mostrou-se não confiável e foi substituída por análise do PNG capturado.
- O parque é exibido como POI nomeado, **não** como polígono/área — sem geometria oficial disponível nos tiles, qualquer área desenhada seria inventada.
