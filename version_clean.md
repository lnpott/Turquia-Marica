# VERSION CLEAN — Plano de melhorias visuais, comerciais e técnicas

> **Tipo de documento:** plano de execução solicitado pelo responsável.
> **Estado:** PLANEJADO — nenhuma melhoria deste plano foi implementada nesta etapa.
> **Data do diagnóstico:** 22/08/2026.
> **Fonte de verdade:** código e Git atuais, `BEST_PLAN.MD`, relatórios em `documentacao/qa/` e dados comerciais confirmados em `src/data/`.
> **Relação com `BEST_PLAN.MD`:** este arquivo detalha somente a próxima versão de limpeza e evolução. Não substitui o histórico, os estados ou a governança do plano principal.

---

## 1. Objetivo

Preparar uma versão mais clara, confiável e orientada à conversão da Turquia Lanches, preservando a identidade editorial já aprovada e evitando um novo redesign.

A execução deve melhorar:

1. clareza e utilidade do cardápio em mobile, desktop, teclado e touch;
2. consistência entre conteúdo publicado, iFood e dados oficiais;
3. caminho entre interesse no produto e pedido;
4. confiança institucional e SEO local;
5. confiabilidade das avaliações, links e integrações externas;
6. performance após a reintrodução do MapLibre;
7. documentação e manutenção futura;
8. preparação técnica para receber as fotografias oficiais, sem bloquear as demais melhorias.

## 2. Limites e regras

### Incluído

- auditoria de conteúdo comercial já publicado;
- refinamento dos cards e CTAs;
- responsividade, acessibilidade e estados de interação;
- documentação vigente;
- testes da API de avaliações;
- métricas de conversão com escopo mínimo e privacidade;
- Lighthouse, orçamento de bundle e imagens responsivas;
- SEO local com dados comprovados;
- cabeçalhos de segurança;
- monitoramento e manutenção do mapa.

### Não incluído sem nova autorização

- novo redesign da marca ou da Home;
- troca de React, Vite, Tailwind ou MapLibre;
- checkout próprio, autenticação ou área do cliente;
- cadastro administrativo/CMS;
- PWA apenas por tendência;
- biblioteca nova de animação;
- informação comercial inferida;
- descrição, preço, promoção, pagamento, entrega ou produto inventado;
- substituição das fotografias antes do envio e aprovação do acervo oficial.

## 3. Estado inicial a confirmar antes da implementação

Antes de alterar runtime, executar e registrar:

1. `git status`, branch, remotes, PRs abertos e baseline de commit;
2. `npm ci` ou instalação reprodutível compatível com o lockfile;
3. `npm run check`;
4. `npm run test:e2e` em desktop e mobile;
5. Lighthouse mobile da Home em cache vazio;
6. screenshots integrais de 390 e 1280 px;
7. console, axe, teclado e overflow em 320, 390, 768, 1280 e 1440 px;
8. links vigentes de iFood, WhatsApp, Instagram e Maps;
9. resposta real ou fallback controlado de `/api/reviews`;
10. inventário de nomes, categorias, preços e imagens atualmente publicados.

Essa baseline será a referência de regressão. Falha preexistente deve ser registrada antes de qualquer correção.

---

# 4. Plano de execução por lotes

## Lote 1 — Auditoria comercial do cardápio

### Problema a resolver

O site publica produtos, categorias e preços, mas a próxima versão precisa comprovar que cada informação corresponde à fonte comercial vigente. A auditoria deve tratar especialmente nomes com aparência provisória, preços repetidos e categorias possivelmente genéricas.

### Passos

1. obter a fonte oficial aprovada: cardápio fornecido pelo responsável e/ou loja oficial do iFood;
2. montar matriz `item atual → fonte → decisão`;
3. validar nome, categoria, preço, disponibilidade e URL aplicável;
4. marcar divergências sem corrigi-las por inferência;
5. remover somente conteúdo comprovadamente provisório ou incorreto;
6. atualizar `src/data/menu.js` e testes diretamente afetados;
7. registrar fonte, data, confiança e decisão em QA;
8. gerar comparativo visual antes/depois.

### Critérios de aceite

- nenhum nome de teste ou preço não confirmado no build público;
- categorias coerentes com os itens;
- zero conteúdo comercial inventado;
- filtros continuam retornando somente itens válidos;
- cardápio, iFood e testes concordam.

### Dependência humana

Confirmação do responsável sobre qualquer divergência não resolvida pelas fontes oficiais.

---

## Lote 2 — Cards claros em mobile, touch e teclado

### Problema a resolver

Nome e preço dependem hoje de um overlay revelado por hover/foco, e o card usa aparência clicável sem executar uma ação direta. Isso pode reduzir a descoberta em touch e criar expectativa incorreta de navegação.

### Passos

1. estabelecer baseline dos cards em 320, 390 e 1280 px;
2. manter nome e preço permanentemente visíveis em mobile/coarse pointer;
3. preservar reveal discreto no desktop somente se o conteúdo essencial continuar disponível;
4. remover `cursor-pointer`/foco do card caso ele permaneça não acionável;
5. se houver URL oficial por produto, transformar o card em link nativo com nome acessível claro;
6. se houver apenas URL geral, manter cards informativos e criar um CTA único após a grade;
7. revisar texto para leitor de tela, evitando prometer ação inexistente;
8. validar toque, teclado, foco, contraste, reduced motion e altura variável de nomes.

### Critérios de aceite

- nome e preço visíveis sem hover em mobile;
- elemento focável somente quando tiver ação;
- nenhuma informação exclusiva de cor ou animação;
- nenhuma mudança de layout ao carregar imagem;
- cards funcionais em teclado e touch.

---

## Lote 3 — Conversão após o cardápio

### Objetivo

Reduzir a distância entre o produto visto e o canal oficial de pedido.

### Passos

1. inserir após a grade um bloco editorial curto, sem criar nova identidade visual;
2. usar um único CTA oficial, por exemplo `Pedir no iFood`;
3. reutilizar `BUSINESS_INFO.channels.ifood` e o componente de botão existente;
4. não repetir CTA dentro de todos os cards sem URL específica;
5. garantir nome acessível, foco visível, estado ativo e nova aba segura;
6. verificar que BottomNavBar não cobre a ação em alturas curtas;
7. testar indisponibilidade futura do canal sem deixar botão quebrado.

### Critérios de aceite

- CTA aparece logo após a escolha, sem poluir a grade;
- destino é exatamente o canal oficial centralizado;
- uma única fonte de URL;
- sem sobreposição em mobile.

---

## Lote 4 — Atualização da documentação vigente

### Problema a resolver

O README ainda descreve arquitetura e dados comerciais anteriores. A versão limpa deve permitir que um novo mantenedor descubra o estado real sem percorrer todo o histórico.

### Passos

1. atualizar arquitetura de Home única e redirects por âncora;
2. documentar canais e estados vigentes sem duplicar valores desnecessariamente;
3. registrar MapLibre/OpenFreeMap, lazy load e fallback;
4. documentar `/api/reviews` e variáveis `GOOGLE_PLACE_ID`/`GOOGLE_MAPS_API_KEY` sem segredos;
5. documentar modo visual de QA e guard contra vazamento demo;
6. documentar comandos reais, browser do Playwright e limitações de certificado local;
7. adicionar no início de `BEST_PLAN.MD` um resumo curto do estado vigente, preservando o histórico abaixo;
8. revisar links e nomes de arquivos mencionados.

### Critérios de aceite

- README concorda com código, Vercel e testes;
- nenhum segredo ou valor sensível;
- `BEST_PLAN.MD` continua sendo o plano operacional canônico;
- este arquivo continua sendo apenas o plano da próxima versão.

---

## Lote 5 — Contrato e testes da API de avaliações

### Passos

1. criar testes unitários diretos para `api/reviews.js`;
2. cobrir método inválido e header `Allow`;
3. cobrir configuração ausente;
4. cobrir resposta válida, vazia e parcialmente preenchida;
5. cobrir timeout, erro HTTP e payload com erro;
6. validar normalização de nome, rating, texto, data e URL;
7. validar descarte de review sem texto;
8. validar `Cache-Control`;
9. manter teste E2E do frontend para API disponível e fallback;
10. revisar logs para não expor segredo ou payload pessoal desnecessário.

### Critérios de aceite

- handler exercitado sem depender da rede real;
- fallback continua exibindo conteúdo aprovado;
- falha externa não derruba a seção nem gera console error no cliente;
- cache e códigos HTTP documentados.

---

## Lote 6 — Métricas mínimas de conversão

### Decisão necessária antes de implementar

Escolher ferramenta compatível com privacidade, custo e infraestrutura existente. Não adicionar rastreamento automaticamente.

### Eventos propostos

- `click_ifood`;
- `click_whatsapp`;
- `click_maps`;
- `click_instagram`;
- contexto: Header, Hero, Cardápio, Localização ou Footer;
- classe de viewport, sem identificação pessoal.

### Passos

1. confirmar política de privacidade e necessidade de consentimento;
2. escolher solução existente ou first-party leve;
3. criar helper único para eventos;
4. instrumentar apenas links de conversão;
5. impedir envio de telefone, texto digitado, endereço IP explícito ou conteúdo de mensagem;
6. testar que falha do analytics nunca bloqueia navegação;
7. documentar eventos e retenção.

### Critérios de aceite

- navegação funciona com analytics bloqueado;
- nenhum dado pessoal no payload;
- eventos não duplicam por renderização React;
- relatório permite comparar origem dos cliques.

---

## Lote 7 — Performance e orçamento de assets

### Passos

1. reexecutar Lighthouse mobile após o MapLibre nas três entradas de navegação (`/`, `/#cardapio`, `/#localizacao`);
2. medir LCP, CLS, TBT, bundle inicial e carregamento eventual do mapa;
3. confirmar que MapLibre/worker continuam fora do caminho crítico do Hero;
4. medir cache vazio e cache quente;
5. criar orçamento baseado na baseline real para JS inicial, CSS, chunk do mapa e imagens;
6. falhar CI apenas em regressão material previamente acordada;
7. criar pipeline/documentação para AVIF, WebP e JPEG fallback;
8. adicionar `srcSet`/`sizes` onde houver ganho comprovado;
9. repetir Lighthouse e comparar antes/depois.

### Critérios de aceite

- CLS permanece zero ou sem regressão material;
- mapa continua lazy;
- nenhuma imagem desproporcional ao tamanho renderizado;
- orçamento protege o baseline sem bloquear mudanças justificadas.

---

## Lote 8 — SEO local e domínio

### Passos

1. confirmar domínio oficial e decisão de migração;
2. se aprovado, atualizar canonical, Open Graph, sitemap, robots, Vercel e redirects em uma única entrega;
3. criar JSON-LD de `LocalBusiness` ou subtipo adequado somente com campos confirmados;
4. usar nome, endereço, horários e canais da fonte única;
5. não publicar pagamento, acessibilidade, estacionamento, entrega ou faixa de preço sem confirmação;
6. validar JSON-LD em ferramenta apropriada;
7. testar redirects do domínio antigo e URLs compartilhadas.

### Critérios de aceite

- uma única URL canônica;
- metadados, sitemap e deploy concordam;
- schema contém somente dados comprovados;
- nenhum conflito entre conteúdo visível e estruturado.

---

## Lote 9 — Cabeçalhos de segurança

### Passos

1. inventariar todos os origins realmente usados;
2. adicionar `Content-Security-Policy-Report-Only` no Preview;
3. corrigir violações legítimas sem liberar curingas amplos;
4. adicionar `Referrer-Policy`, `X-Content-Type-Options` e `Permissions-Policy`;
5. definir `frame-ancestors` na CSP;
6. habilitar HSTS somente após confirmar HTTPS/domínio definitivo;
7. validar mapa, fontes, imagens, reviews, Preview e produção;
8. promover CSP para enforcement somente após auditoria.

### Critérios de aceite

- nenhum recurso legítimo bloqueado;
- sem `unsafe-eval` salvo necessidade comprovada;
- headers verificados no deploy real;
- rollback documentado no `vercel.json`.

---

## Lote 10 — Monitoramento e manutenção externa

### Passos

1. criar verificação agendada dos links oficiais;
2. monitorar status e latência de `/api/reviews`;
3. registrar ocorrência de fallback do mapa sem coletar dado pessoal;
4. criar script manual/agendado para comparar o TileJSON do OpenFreeMap;
5. validar versão, bounds e pontos do polígono do Parque Céu Aberto;
6. regenerar screenshots de 390 e 1280 px quando houver mudança de tile;
7. alertar sem atualizar geometria automaticamente;
8. exigir revisão humana antes de substituir snapshot cartográfico.

### Critérios de aceite

- falha externa detectável antes de reclamação do usuário;
- nenhuma geometria alterada automaticamente;
- histórico de versão e decisão preservado;
- alertas acionáveis, sem ruído diário.

---

# 5. Relatório de impacto visual direto

Esta seção descreve **o que o visitante verá** quando os lotes visuais forem implementados. Não afirma que as mudanças já estão no site.

## 5.1 Primeira dobra / Hero

### Mudança prevista

- nenhuma recomposição estrutural;
- manter marca, tagline, imagem, CTA de cardápio e CTA de localização;
- apenas validar que domínio/metadados e métricas não alterem o visual.

### Resultado esperado

O acesso inicial continuará reconhecível. A versão limpa não deve parecer um novo site nem reabrir o design aprovado.

## 5.2 Cardápio em mobile

### Mudança prevista

- nome e preço permanecerão visíveis sem depender de hover;
- área textual terá contraste estável sobre a fotografia;
- cards não acionáveis deixarão de parecer botões;
- toque não será necessário apenas para descobrir informação;
- foco aparecerá somente em controles que executem ação.

### Resultado esperado

Ao rolar a Home em 390 px, o visitante entenderá cada produto imediatamente. O cardápio ficará menos misterioso e mais útil, sem perder o tratamento editorial das imagens.

## 5.3 Cardápio em desktop

### Mudança prevista

- poderá manter zoom e reveal suave como refinamento;
- nome e preço não dependerão exclusivamente da animação;
- o grid e a identidade visual serão preservados;
- nenhuma nova biblioteca de motion.

### Resultado esperado

O desktop continuará expressivo, mas com conteúdo essencial mais previsível e acessível.

## 5.4 Final da grade

### Mudança prevista

- novo bloco curto de conversão;
- um botão vermelho oficial `Pedir no iFood`;
- espaçamento suficiente em relação à BottomNavBar mobile;
- sem repetir nove botões idênticos nos cards.

### Resultado esperado

Depois de ver os produtos, o usuário encontrará imediatamente o próximo passo. A ação comercial deixará de depender de voltar ao Header ou procurar o Footer.

## 5.5 Avaliações

### Mudança visual prevista

- nenhuma reformulação obrigatória;
- estados de loading, disponível, vazio e fallback deverão permanecer visualmente coerentes;
- se a fonte estiver indisponível, não haverá salto brusco ou seção quebrada;
- eventual link de origem só será exibido quando houver URL real.

### Resultado esperado

A seção parecerá estável mesmo durante indisponibilidade externa, sem inventar review ou mascarar a origem.

## 5.6 Localização e mapa

### Mudança visual prevista

- nenhuma alteração imediata no enquadramento aprovado;
- placa, pin, contorno e label permanecem como baseline;
- futuras mudanças do tile gerarão revisão, não atualização silenciosa;
- fallback textual e CTA continuam disponíveis.

### Resultado esperado

O mapa não deve mudar nesta versão sem evidência externa. A melhoria será principalmente de manutenção e detecção de regressão.

## 5.7 SEO, segurança e performance

### Mudança visual prevista

- nenhuma alteração perceptível quando tudo funciona;
- carregamento potencialmente mais rápido em mobile;
- menor risco de flashes, layout shift ou imagem excessivamente pesada;
- domínio próprio, se aprovado, aparecerá na barra do navegador e nos compartilhamentos;
- Open Graph e previews ficarão coerentes com a URL oficial.

### Resultado esperado

Mais confiança e velocidade sem adicionar elementos visuais desnecessários à página.

## 5.8 Fotografias oficiais

As fotos continuam como dependência externa separada. Quando forem entregues:

1. validar autoria e autorização de uso;
2. associar cada foto ao produto/ambiente correto;
3. evitar pessoas identificáveis sem consentimento;
4. gerar formatos e tamanhos responsivos;
5. preservar enquadramento seguro para mobile/desktop;
6. atualizar `alt` de acordo com o conteúdo real;
7. remover rótulos de fotografia ilustrativa somente onde a substituição for real;
8. comparar Lighthouse e screenshots após a troca.

---

# 6. Ordem recomendada e dependências

| Ordem | Lote | Dependência | Pode alterar visual? | Autorização adicional |
|---|---|---|---|---|
| 1 | Baseline | nenhuma | não | não |
| 2 | Auditoria comercial | fonte oficial | sim, se houver correção | aprovação de divergências |
| 3 | Cards mobile/teclado | resultado do cardápio | sim | aprovação visual |
| 4 | CTA após grade | iFood confirmado | sim | aprovação de copy |
| 5 | README/estado vigente | arquitetura confirmada | não | não |
| 6 | Testes de Reviews | contrato atual | não | não |
| 7 | Lighthouse/budget | baseline | indireto | limites acordados |
| 8 | Métricas | privacidade/ferramenta | não | decisão explícita |
| 9 | SEO/domínio | domínio e dados | previews/URL | decisão explícita |
| 10 | Segurança | origins inventariados | não | promoção de CSP |
| 11 | Monitoramento/mapa | integrações ativas | não | automação agendada |
| 12 | Fotos oficiais | acervo entregue | sim | aprovação do acervo |

## Regra de execução

Cada lote deve ser implementado, testado, auditado e revisado antes do próximo lote que dependa dele. Lotes técnicos independentes podem compartilhar PR somente quando o diff continuar pequeno e coerente; mudanças visuais não devem ser misturadas com segurança ou infraestrutura de alto risco.

---

# 7. Validação obrigatória para cada lote visual

1. `npm run lint`;
2. `npm run test`;
3. `npm run build` e `audit:demo-leak`;
4. `npm run test:e2e` desktop e mobile;
5. axe sem violações críticas/sérias;
6. console e page errors iguais a zero;
7. teclado, foco e ordem de navegação;
8. `prefers-reduced-motion: reduce`;
9. overflow em 320, 390, 768, 1280 e 1440 px;
10. screenshots integrais de 390 e 1280 px;
11. comparação antes/depois em resolução integral;
12. CTA não coberto pela BottomNavBar;
13. `git diff --check`;
14. revisão final de conteúdo e links;
15. atualização do QA e do estado no `BEST_PLAN.MD`.

# 8. Critérios globais para declarar a versão pronta

- cardápio comercialmente validado ou divergências removidas/bloqueadas;
- informação essencial visível em touch e teclado;
- caminho claro até o iFood;
- README e plano vigente coerentes;
- API de reviews coberta diretamente;
- E2E e axe aprovados;
- Lighthouse comparado contra baseline;
- nenhum vazamento do modo demo;
- nenhum dado inventado;
- nenhum segredo;
- screenshots mobile/desktop aprovados;
- PR revisado e checks remotos verdes;
- pendências externas explicitamente separadas do que foi concluído.

# 9. Rollback

Cada lote deve produzir commit específico. Em regressão:

1. reverter somente o commit do lote;
2. preservar dados comerciais válidos já confirmados;
3. restaurar screenshots baseline;
4. repetir check/E2E;
5. registrar causa e decisão;
6. não desativar teste, CSP, acessibilidade ou fallback para obter build verde.

# 10. Próxima decisão humana

Antes de implementar, o responsável deve aprovar:

1. início pelo **Lote 1 — Auditoria comercial do cardápio**;
2. fonte oficial a ser usada para nomes, categorias e preços;
3. direção dos cards mobile: legenda sempre visível e card informativo, ou link por produto quando houver URL específica;
4. texto final do CTA após a grade;
5. se métricas e domínio próprio entram nesta versão ou ficam para ciclo posterior.

Até essa aprovação, o estado permanece **PLANEJADO** e nenhuma mudança de runtime está autorizada por este documento.
