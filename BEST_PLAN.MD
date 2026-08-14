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
