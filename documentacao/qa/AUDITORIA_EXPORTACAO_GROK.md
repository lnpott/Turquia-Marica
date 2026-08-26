# Auditoria da exportação do Grok

**Data da análise:** 26/08/2026  
**Repositório analisado:** <https://github.com/lnpott/shadow-sky-sky-orbit>  
**Commit analisado:** `f20a268` (`Export from Grok`)  
**Escopo:** comparação técnica e visual com a branch `work` de `Turquia-Marica`, sem incorporar código da exportação.

## Conclusão executiva

A exportação não é uma continuação direta deste projeto. Ela recria o site em outra
stack (React 19, TanStack Start/Router, Tailwind 4, TypeScript e infraestrutura de
banco/autenticação), enquanto o projeto vigente usa React 18, React Router, Vite e
Tailwind 3. Um merge, cherry-pick ou substituição integral aumentaria muito o risco e
traria dependências, migrações e scripts sem necessidade demonstrada para o site.

O conceito visual exportado é bom como referência, mas a maior parte das soluções já
existe, com implementação mais madura, na branch atual: hero com mídia mista,
filtros de cardápio, avaliações em trilho horizontal, navegação ativa, CTA móvel,
dados comerciais centralizados e tratamento de redução de movimento.

Há **duas ideias que merecem um lote próprio**, sem copiar a arquitetura do Grok:

1. transformar os indicadores do hero em controles acionáveis, preservando pausa de
   mídia, visibilidade da página, `IntersectionObserver` e redução de movimento da
   implementação atual;
2. substituir o carrossel de placeholders da seção “Sobre a casa” por uma composição
   editorial com o acervo oficial já presente no projeto, após aprovação visual e
   validação em 390 px e 1280 px.

Nenhuma dessas ideias foi implementada nesta auditoria, porque ambas alteram UI e o
pedido atual foi de análise. Elas devem ser executadas somente após autorização do
lote correspondente.

## Comparação confirmada

| Área | Exportação do Grok | Projeto atual | Decisão |
| --- | --- | --- | --- |
| Arquitetura | TanStack Start/Router, React 19, Tailwind 4, TypeScript, Nitro, PGlite, autenticação e migrações | SPA Vite/React 18, React Router, Tailwind 3 e API serverless de avaliações | **Não importar.** A troca não resolve uma necessidade do produto e amplia muito a superfície técnica. |
| Hero | Quatro cenas, indicadores clicáveis e montagem simples somente da mídia ativa em vídeo | Cinco cenas, imagem de poster + vídeo, preload gradual, pausa fora da viewport/aba, duração por cena e `prefers-reduced-motion` | **Aproveitar apenas a ideia dos indicadores clicáveis**, reimplementada localmente. |
| Cardápio | Lista de produtos e descrições fixa no bundle | Dados separados e modo de demonstração protegido contra vazamento no build de produção | **Não copiar dados.** Preservar a separação e a auditoria contra conteúdo demonstrativo. |
| Sobre | Colagem de dois vídeos e uma foto do acervo | Placeholder editorial em carrossel, apesar de o acervo oficial já estar disponível | **Candidato forte para lote visual**, usando os componentes e assets atuais. |
| Avaliações | Três avaliações abreviadas e fixas | API com fallback estático fornecido pelo responsável e estados de carregamento/indisponibilidade | **Não importar.** A solução atual preserva mais contexto e trata falhas. |
| Localização | `iframe` externo e card de dados | Mapa MapLibre lazy, não interativo, com marcador e instrução de retorno | **Não importar.** A implementação atual é mais específica e já foi auditada. |
| Navegação móvel | Dois CTAs comerciais fixos | Barra inferior com quatro destinos, seção ativa e safe area | **Não substituir.** Trata-se de outra decisão de navegação, não de correção isolada. |
| Estado aberto/fechado | Calculado uma vez no cliente a partir do horário | Horários confirmados exibidos sem inferência de estado em tempo real | **Não importar como está.** Exigiria regra temporal testada e atualização durante a sessão. |

## Achados por prioridade

### Alta — não integrar a exportação como repositório/branch de código

O commit do Grok é um scaffold completo e independente, não um diff sobre este
repositório. Além das mudanças de framework, ele adiciona banco, autenticação,
migrações, servidor Nitro, PWA e dezenas de dependências de UI que não são consumidas
pelo site apresentado. A estratégia segura é tratar o repositório como referência
visual descartável e portar somente ideias aprovadas, em patches pequenos.

### Média — controles do hero são uma melhoria aproveitável

Na exportação, cada indicador é um `button` que permite escolher a cena. No projeto
atual, os indicadores são itens informativos sem ação. A interação é útil, mas não se
deve copiar o componente do Grok: a versão vigente possui controles de ciclo de vida
e mídia que seriam perdidos. Um lote local deve adicionar botões com nome acessível,
estado atual, clique/teclado e reinício previsível do temporizador, além de manter a
experiência estática quando `prefers-reduced-motion` estiver ativo.

### Média — composição de mídia na seção “Sobre” é uma boa direção visual

A exportação demonstra que os vídeos do salão e do espaço infantil, combinados com
uma fotografia real, comunicam melhor a casa que placeholders. Como esses arquivos já
existem no projeto vigente, a ideia pode ser adaptada sem trazer assets ou
dependências externas. Ainda assim, a mudança é perceptível, requer autorização de
design, decisão sobre autoplay e validação de performance, acessibilidade e redução
de movimento.

### Alta — preservar as proteções de dados e conteúdo do projeto atual

A exportação concentra produtos, descrições, links, endereço, horários, coordenadas
e avaliações em um único arquivo. Parte desses valores coincide com dados já
confirmados no projeto, mas isso não torna o arquivo uma nova fonte de verdade. Os
nomes e descrições de produtos não incluem origem ou marcação de demonstração, e as
avaliações foram abreviadas. Não se deve copiar esses registros de volta.

### Baixa — tipografia e acabamento são referência, não patch

Fraunces, paleta mais escura, raios maiores e superfícies suaves formam uma identidade
visual diferente da direção atual. Adotá-los isoladamente criaria inconsistência;
adotá-los em conjunto seria redesign. Podem permanecer como referência para uma
decisão futura do responsável, sem alteração técnica agora.

## Próximos lotes propostos

### Lote A — Indicadores interativos do hero

- Alterar somente `HeroSection.jsx` e estilos/testes diretamente relacionados.
- Preservar autoplay, posters, preload, pausa fora da viewport, aba oculta e redução
  de movimento.
- Validar mouse, teclado, leitor de tela, troca de cena e temporizador.
- Registrar screenshots em 390 px e 1280 px.

### Lote B — Mídia oficial na seção “Sobre a casa”

- Substituir placeholders somente com assets oficiais já versionados.
- Reutilizar o tratamento de vídeo e redução de movimento existente; não adicionar
  biblioteca.
- Medir impacto no carregamento e evitar autoplay simultâneo fora da viewport.
- Validar 390 px e 1280 px, overflow, foco, contraste e console.

## Validação desta auditoria

- Clonagem rasa do repositório externo e confirmação do commit `f20a268`.
- Leitura do scaffold, `package.json`, componentes do site, fonte de dados e CSS da
  exportação.
- Comparação com `package.json`, componentes equivalentes, fontes de dados, plano e
  relatórios de QA do projeto atual.
- Inspeção em resolução original do screenshot desktop exportado
  (`screenshots/app-builder-built.png`, 1280 × 800).
- Nenhum código ou asset da exportação foi incorporado.

## Riscos e pendências

- O repositório externo deve permanecer separado; não há relação de histórico Git que
  permita um PR automático dele para este repositório.
- Os dois lotes propostos dependem de autorização explícita por alterarem comportamento
  e apresentação.
- A auditoria não valida a origem comercial dos dados do Grok; ela deliberadamente
  preserva as fontes de verdade já registradas neste projeto.
