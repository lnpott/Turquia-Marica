# TURQUIA LANCHES — ARQUITETURA MESTRE, HISTÓRICO DE IMPLEMENTAÇÃO E ROADMAP

> **Plano operacional vigente:** as etapas, estados, dependências, evidências e novas mudanças são registradas em `BEST_PLAN.MD`. Este roadmap permanece como histórico arquitetural e documento de handoff. Em caso de divergência, prevalecem: código/Git atual → `BEST_PLAN.MD` → histórico deste roadmap.

> **Documento de handoff para agentes de desenvolvimento e continuidade do projeto.**
>
> Este documento descreve somente informações relevantes para que outro agente compreenda **como o projeto foi concebido, como chegou ao estado atual, quais decisões arquiteturais foram tomadas, o que já foi implementado, quais agentes/plataformas participaram do processo e quais são as próximas etapas autorizáveis**.
>
> **Regra de precedência:** o estado real do repositório/Git e o código existente prevalecem sobre qualquer descrição histórica deste documento. Antes de alterar código, audite o estado atual.

---

## 1. IDENTIDADE DO PROJETO

**Projeto:** Turquia Lanches  
**Localização de referência:** Maricá/RJ  
**Produto digital atual:** site institucional + catálogo/cardápio digital.  
**Canal transacional definido:** iFood. O site **não é o canal de pedidos**.

### Objetivo do site

O site foi concebido para:

- apresentar a marca;
- gerar desejo através de fotografia real;
- apresentar o cardápio e preços quando estes estiverem validados;
- apresentar localização, ambiente e informações institucionais;
- funcionar muito bem em mobile;
- conduzir o usuário para o canal oficial de pedido quando a URL do iFood estiver definida;
- preservar uma experiência visual artesanal/premium acessível.

### O que o site NÃO deve virar sem nova decisão

Não transformar o projeto em e-commerce próprio por iniciativa do agente.

Ficam fora do escopo atual, salvo autorização explícita:

- gateway de pagamento;
- pagamento real no site;
- backend transacional;
- autenticação;
- banco de dados;
- checkout comercial definitivo;
- sistema próprio de delivery;
- URL de iFood inventada;
- integração WhatsApp transacional sem conteúdo/regra oficial;
- PWA completo;
- novas bibliotecas ou framework sem necessidade comprovada.

O fluxo de `Carrinho → Checkout → Confirmação` existente é parte da migração técnica já realizada e não deve ser interpretado automaticamente como decisão de negócio de transformar o site em e-commerce.

---

# 2. MODELO OPERACIONAL ATUAL

## Canais oficiais de tecnologia

A operação digital atual deve permanecer simples:

### GitHub
Repositório principal do código-fonte.

Repositório conhecido no processo:

`lnpott/Turquia-Marica`

### Vercel
Plataforma atual de deploy/hosting do site.

**Plano pretendido atualmente:** Vercel gratuito.

O Vercel é o ambiente de publicação do projeto; o GitHub permanece como fonte de versionamento.

### Regra operacional

A arquitetura de infraestrutura atual deve permanecer deliberadamente enxuta:

**GitHub → Vercel → site publicado**

Não adicionar infraestrutura paga ou serviços externos sem necessidade e autorização.

---

# 3. PLATAFORMAS E FERRAMENTAS UTILIZADAS NO PROCESSO

## Google Notebook / NotebookLM

Foi utilizado na fase inicial de pesquisa e concepção estratégica.

A pesquisa consolidada serviu como base para:

- diagnóstico de marca;
- análise de mercado regional;
- benchmarking;
- referências de UX;
- referências de design;
- estratégia de SEO/local discovery;
- direção criativa;
- arquitetura inicial da homepage;
- prioridades da fase de produto.

O material de pesquisa consolidado apontou, entre outros princípios:

- fotografia real como elemento central;
- redução de fricção;
- experiência mobile-first;
- premium acessível;
- estética artesanal contemporânea;
- movimento contido;
- performance;
- forte associação entre Turquia Lanches + Maricá + Xis Gaúcho.

**Importante:** o Notebook foi fonte de pesquisa/estratégia, não é atualmente parte da infraestrutura do site.

## ChatGPT

Atuou como:

- estrategista do produto;
- arquiteto de UX/UI;
- responsável pela análise dos resultados;
- responsável pelos briefings/prompts dos lotes;
- responsável pelas decisões de direção visual;
- auditor de escopo;
- auditor de arquitetura;
- orientador do processo Git;
- responsável pela consolidação do roadmap.

O ChatGPT não deve assumir que executou alterações diretamente no repositório quando elas foram realizadas pelo agente implementador.

## DeepSeek

Atuou como **agente implementador principal** durante o processo de desenvolvimento.

Fluxo adotado:

**ChatGPT analisa/define → DeepSeek implementa → DeepSeek executa build/QA/Git → resultado retorna para validação**

O DeepSeek foi responsável por implementar as mudanças solicitadas nos prompts, realizar auditorias locais, executar builds e reportar checkpoints detalhados.

### Regra importante para continuidade

Não reescrever ou alterar uma área apenas porque existe uma oportunidade de melhoria.

O projeto foi desenvolvido em lotes deliberados, com:

1. briefing;
2. implementação;
3. auditoria;
4. build;
5. QA;
6. checkpoint Git;
7. autorização de commit;
8. autorização de push.

Preservar esse método.

## Figma

Foi considerado durante o processo, mas **foi deixado de lado**.

O projeto atual não depende de Figma para sua arquitetura ou execução.

Não introduzir Figma como dependência de trabalho sem nova decisão.

## Chrome

Foi utilizado para QA visual e funcional real.

Os principais testes de viewport registrados incluem:

- desktop 1280×800;
- desktop 1440×900;
- mobile 375×667;
- mobile 390×844.

---

# 4. CONCEPÇÃO INICIAL

Antes da implementação, a estratégia foi construída a partir de pesquisa ampla de mercado, branding, UX e referências de design.

A direção consolidada foi:

> **identidade gaúcha vernacular reinterpretada como experiência digital contemporânea, artesanal e premium acessível.**

Princípios:

- comida deve parecer apetitosa imediatamente;
- fotografia real é prioridade;
- o design não pode esconder a comida;
- movimento deve complementar, não competir;
- mobile não deve ser apenas desktop comprimido;
- navegação deve ser simples;
- o site deve funcionar como descoberta/catalogação;
- o pedido pertence ao canal oficial de delivery.

---

# 5. ARQUITETURA TÉCNICA ATUAL

## Stack

O projeto atual utiliza:

- React;
- Vite;
- React Router;
- Tailwind CSS;
- CSS próprio em `src/styles/index.css`;
- Context API para estado do carrinho;
- assets locais em `src/assets/images/`.

Não foram adicionadas bibliotecas de animação para os efeitos implementados.

## Build de referência

Nos checkpoints recentes:

- Vite 5.4.21;
- 79 módulos;
- build sem warnings;
- build sem erros.

Os números de tamanho de CSS/JS variaram conforme as migrações de assets e refinamentos, portanto não tratá-los como contrato arquitetural.

---

# 6. ESTRUTURA FUNCIONAL

A aplicação é organizada aproximadamente nestas áreas:

```text
src/
├── assets/
│   └── images/
├── components/
│   ├── checkout/
│   ├── confirmation/
│   ├── home/
│   ├── layout/
│   ├── location/
│   ├── product/
│   └── ui/
├── contexts/
├── data/
├── layouts/
├── pages/
├── styles/
├── App.jsx
└── main.jsx
```

### Responsabilidades

`pages/`
- páginas/rotas principais.

`components/`
- componentes visuais e funcionais reutilizáveis.

`contexts/`
- estado compartilhado, especialmente carrinho.

`data/`
- dados de menu/produtos e conteúdo estruturado.

`layouts/`
- estrutura comum das páginas.

`styles/`
- CSS global e sistema visual ativo.

`assets/images/`
- imagens próprias/localizadas utilizadas pelo projeto.

---

# 7. ROTAS ATUAIS CONHECIDAS

As rotas validadas durante a migração incluem:

```text
/
 /cardapio
 /produto/combo-master
 /sacola
 /checkout
 /confirmacao
 /localizacao
```

### Comportamento importante

A navegação entre páginas possui transição visual por fade.

O `MainLayout` utiliza mudança de chave baseada no pathname para disparar a transição.

O objetivo é manter:

- URLs;
- histórico;
- navegação existente;
- posição de elementos `fixed`;

sem introduzir uma biblioteca de animação.

---

# 8. ARQUITETURA DO HERO

O Hero é uma das áreas mais importantes do projeto.

## Desktop

Desktop utiliza:

- 3 slides;
- crossfade;
- dwell de aproximadamente 6 segundos;
- fade de aproximadamente 1,6 segundo;
- Ken Burns extremamente sutil;
- fotografia em plena visibilidade;
- gradiente localizado principalmente na região necessária para legibilidade do texto;
- enquadramento individual por slide;
- altura controlada para evitar CLS.

### Fotografias

Os três slides principais são:

1. `hero/hero-fries.jpg`
2. `hero/hero-ambience.jpg`
3. `hero/hero-gallery.jpg`

## Mobile

Mobile possui composição própria.

Não deve ser tratado como desktop comprimido.

O conceito aprovado é:

- fotografia full-bleed;
- imagem de fries como fundo;
- texto alinhado à base;
- scrim/gradiente localizado na base;
- sem caixa translúcida pesada;
- sem `backdrop-blur` decorativo;
- sem fotografia redundante abaixo do texto;
- navegação mobile preservada;
- movimento reduzido para manter legibilidade/performance.

### Problema histórico importante

O Hero anteriormente sofria com:

- `mix-blend-multiply`;
- opacidade excessiva;
- gradiente cobrindo a fotografia inteira;
- aparência de "mancha";
- perda da fotografia;
- caixa translúcida no mobile.

Essas soluções foram explicitamente removidas.

**Princípio permanente:**

> FOTOGRAFIA PRIMEIRO.

A comida deve ser visualmente desejável antes de o usuário perceber a sofisticação do layout.

---

# 9. TEXTO PRINCIPAL DO HERO

Texto atualmente trabalhado:

> “Sabor raiz, ingredientes frescos e aquele exagero que a gente ama. O melhor lanche da cidade te espera.”

Este texto foi identificado posteriormente como um ponto visualmente problemático quando sobreposto à fotografia.

Qualquer novo refinamento deve priorizar:

- contraste;
- posição do texto;
- área de respiro;
- não esconder o assunto principal da fotografia;
- leitura imediata;
- equilíbrio entre texto e imagem.

Não resolver o problema simplesmente aumentando o escurecimento da fotografia.

---

# 10. IMAGENS E ASSETS

Uma das mudanças arquiteturais importantes foi migrar as imagens externas para assets locais.

Antes:

`lh3.googleusercontent.com/aida-public/...`

Depois:

```text
src/assets/images/
```

### Organização atual

```text
src/assets/images/
├── brand/
├── hero/
├── home/
├── location/
└── menu/
```

### Assets principais

```text
brand/logo.jpg

hero/hero-fries.jpg
hero/hero-ambience.jpg
hero/hero-gallery.jpg

home/gallery-2.jpg
home/gallery-3.jpg
home/highlight-sweet.jpg

location/map.png

menu/category-bebidas.jpg
menu/category-combos.jpg
menu/category-lanches.jpg
menu/category-sobremesas.jpg
menu/menu-hero.jpg
menu/product-combo-classico.jpg
menu/product-combo-galera.jpg
menu/product-futuro-turquia.jpg
```

No checkpoint do Lote 14:

- 16 assets;
- 16 necessários;
- 0 órfãos;
- 0 duplicados por MD5;
- todos carregando no build;
- nenhuma dependência restante de `lh3...` em `src`.

---

# 11. DESIGN SYSTEM

O projeto possui Design System documentado fora do código principal.

Referências:

```text
sabor_e_tradi_o/DESIGN.md
tailwind.config.cjs
src/styles/index.css
```

Direção visual consolidada:

- vermelho/laranja como cores de apetite;
- neutros para equilíbrio;
- tipografia forte;
- fotografia real;
- estética artesanal contemporânea;
- premium acessível;
- movimento contido;
- espaços e hierarquia suficientes para evitar poluição.

Não alterar identidade cromática, tipografia ou framework apenas por preferência pessoal.

---

# 12. MICROINTERAÇÕES E MOTION

Implementações aprovadas:

- fade entre páginas;
- smooth scroll para âncoras;
- `focus-visible` global;
- feedback de pressionamento em controles;
- Ken Burns sutil;
- crossfade do Hero.

Componentes que receberam press feedback durante o processo:

- `QuantitySelector`;
- `AddonsSelector`;
- `PaymentSelector`;
- `DeliverySelector`.

### Acessibilidade

`prefers-reduced-motion` foi considerado no Hero.

Não adicionar animações excessivas.

A filosofia é:

> movimento perceptível, mas nunca protagonista.

---

# 13. MODELO DE NEGÓCIO DIGITAL

Esta é uma decisão arquitetural e de produto importante.

## Site

O site funciona como:

**catálogo + presença institucional + descoberta da marca.**

Serve para:

- mostrar comida;
- mostrar cardápio;
- mostrar ambiente;
- mostrar localização;
- reforçar marca;
- preparar o usuário para pedir.

## Pedido

O pedido deve ocorrer:

**iFood**

A URL oficial do iFood ainda deve ser confirmada antes de criar CTA definitivo.

### Não fazer

Não inventar:

- URL de iFood;
- loja;
- integração;
- checkout;
- pagamento;
- API.

Quando a URL oficial estiver disponível, o CTA poderá ser ajustado.

---

# 14. CARDÁPIO

O cardápio do site não deve ser interpretado como e-commerce definitivo.

Função:

- apresentar categorias;
- apresentar produtos;
- apresentar preços quando validados;
- gerar desejo;
- orientar o consumidor;
- eventualmente encaminhar ao iFood.

Preços e opcionais ainda podem estar em estado de mock/validação, conforme o estado real do repositório.

---

# 15. FLUXO DE CARRINHO

O projeto possui `CartContext`.

Durante a migração foram implementados:

- gerenciamento do carrinho;
- `lastOrder`;
- `PLACE_ORDER`;
- `placeOrder`.

Também existem páginas:

- Sacola;
- Checkout;
- Confirmação.

Isso deve ser tratado como **estrutura herdada da migração**, não como autorização para transformar o site em plataforma de venda própria.

---

# 16. LOCALIZAÇÃO

Existe rota `/localizacao`.

Há:

- `Location.jsx`;
- `MapEmbed.jsx`;
- `ContactCard.jsx`;
- `src/assets/images/location/map.png`.

Mapa real/interativo continua como possível fase futura.

Não introduzir Google Maps API sem necessidade e sem autorização.

---

# 17. HISTÓRICO DOS LOTES

## Lotes anteriores — fundação

A primeira fase estabeleceu a migração da estrutura existente para uma aplicação React/Vite, preservando o Design System e os HTMLs de produção como referência.

O histórico Git contém, entre outros:

```text
5430d6f
ecb1271
9bccbf7
7cbfff9
62c7fbb
a1ae7b6
66ac14b
b71b843
39532c4
1ccb210
```

Os hashes devem ser tratados como histórico real do repositório, não como ordem de trabalho inferida somente pelos números dos lotes.

---

## Lotes 1–6 — fundação da migração

A fase inicial concentrou:

- estrutura React;
- Vite;
- componentes;
- navegação;
- Design System;
- base do cardápio;
- produtos;
- estado inicial do carrinho;
- estrutura de páginas.

Parte dessa base já estava commitada antes dos Lotes 7–10.

---

## Lotes 7–10

Consolidados no commit:

```text
a1ae7b6
feat: complete checkout confirmation and location flows
```

Incluiu:

- Checkout;
- Confirmação;
- Localização;
- `lastOrder`;
- `PLACE_ORDER`;
- `placeOrder`;
- `contact.js`;
- componentes de confirmação;
- componentes de localização;
- remoção de `src/styles/main.css`, confirmado como órfão.

---

## Lote 11

Commit:

```text
66ac14b
feat: refine visual experience and image transitions
```

Incluiu:

- correção do Hero;
- crossfade;
- transições de página;
- microinterações;
- `focus-visible`;
- smooth scroll;
- Ken Burns inicial;
- refinamento visual.

---

## Lote 11.1

Refinamento crítico do Hero.

Problema:

A fotografia estava excessivamente obscurecida/lavada.

Causa:

- `mix-blend-multiply`;
- `opacity-70`;
- gradiente full-hero;
- composição que escondia a fotografia.

Correção:

- fotografia em plena opacidade;
- gradiente localizado;
- enquadramento individual;
- crossfade limpo;
- Ken Burns quase imperceptível.

---

## Lote 12

Auditoria estratégica.

Decisões registradas:

- site = catálogo/institucional;
- pedidos = iFood;
- não criar e-commerce próprio;
- fotografia real;
- premium acessível;
- gaúcho contemporâneo;
- artesanal digital;
- motion contido;
- performance como requisito.

Também registrou prioridades futuras.

---

## Lote 13

Consolidação visual do Hero.

Foi uma auditoria de confirmação.

Nenhuma alteração adicional de código foi considerada necessária.

Validado:

- desktop;
- mobile;
- ciclo completo do Hero;
- navegação Home → Cardápio;
- ausência de 400/404;
- ausência de erros de console.

---

## Lote 14

Migração das imagens externas para assets locais.

Commit:

```text
1ccb210
feat: migrate images to local assets and refine mobile hero
```

Incluiu:

- 16 assets locais;
- substituição das URLs externas;
- organização dos assets;
- migração de componentes;
- migração de dados do menu;
- refinamento do Hero mobile.

---

## Lote 14.1

Refinamento específico do Hero mobile.

Problema:

O mobile parecia um desktop comprimido e apresentava uma caixa translúcida pesada.

Correção:

- fundo full-bleed;
- fotografia de fries;
- scrim na base;
- texto na base;
- remoção de card translúcido;
- remoção de fotografia redundante;
- mobile com composição própria.

Desktop foi preservado.

---

# 18. ÚLTIMO ESTADO GIT REGISTRADO (HISTÓRICO)

Último checkpoint fornecido:

```text
HEAD:
1ccb21088f538e7000a1ffe9771992dbe9a5b850

origin/main:
39532c40939c7fb126734e709061c98179b521b1

Estado:
ahead 1

Working tree:
limpa após o commit do Lote 14/14.1
```

O push desse commit estava aguardando autorização no último estado explicitamente fornecido.

**Antes de qualquer novo trabalho, verificar o Git real.**

Não presumir que esse estado ainda seja atual.

## Estado atual verificado — 12/08/2026

```text
HEAD:         951a53a8f994186b4282b7ee3e488eaa56ff2b01
origin/main:  951a53a8f994186b4282b7ee3e488eaa56ff2b01
Estado:       sincronizado (ahead 0, behind 0)
Working tree: limpa
```

Commit atual: `951a53a refactor(ui): route orders through iFood and unify home menu`.

Esse commit redefine o escopo atual: o site é catálogo institucional e os pedidos são encaminhados externamente ao iFood. O checkout próprio, carrinho, confirmação e detalhes transacionais foram removidos da aplicação ativa. As rotas atuais são `/`, `/cardapio` e `/localizacao`; o restante da migração permanece documentado como histórico.

---

# 19. ROADMAP DE PRODUTO

## Prioridade 1 — conteúdo e fotografia reais

Continuar substituindo conteúdo provisório por conteúdo oficial.

Prioridade:

1. imagens reais;
2. fotos reais de produtos;
3. preços reais;
4. descrições reais;
5. informações oficiais.

A infraestrutura de assets locais já foi iniciada.

---

## Prioridade 2 — Hero

Resolver definitivamente a composição do texto:

> “Sabor raiz, ingredientes frescos e aquele exagero que a gente ama. O melhor lanche da cidade te espera.”

O problema deve ser tratado como composição visual, não apenas como contraste.

Avaliar:

- posição;
- largura máxima;
- quantidade de linhas;
- hierarquia;
- relação com o assunto da foto;
- scrim;
- alinhamento;
- CTA.

Não degradar a fotografia para salvar o texto.

---

## Prioridade 3 — preços reais

Substituir mocks pelos preços oficiais.

Não inventar valores.

---

## Prioridade 4 — CTA iFood

Quando houver URL oficial:

- atualizar CTA do Cardápio;
- atualizar CTA principal se aplicável;
- abrir o canal correto;
- não criar checkout próprio.

---

## Prioridade 5 — WhatsApp

Possível evolução:

- contato;
- mensagem contextual;
- eventualmente conteúdo do pedido, se houver regra operacional real.

Não inventar formato operacional.

---

## Prioridade 6 — mapa

Substituir placeholder por solução real somente quando houver necessidade.

---

## Prioridade 7 — SEO local

Após domínio de produção e informações oficiais:

- Schema `Restaurant`;
- `PostalAddress`;
- dados locais;
- Google Business Profile;
- associação semântica entre Turquia Lanches, Maricá e Xis Gaúcho.

---

# 20. IDEIAS FUTURAS — NÃO AUTORIZADAS AUTOMATICAMENTE

Podem ser avaliadas posteriormente:

- PWA;
- backend;
- banco;
- autenticação;
- persistência;
- pagamento;
- integração oficial com iFood;
- WhatsApp dinâmico;
- Google Maps API;
- Instagram;
- avaliações;
- schema avançado;
- novas páginas;
- redesign;
- nova identidade cromática;
- nova fonte;
- biblioteca de animação.

Estas são **possibilidades**, não tarefas autorizadas.

---

# 21. REGRAS DE IMPLEMENTAÇÃO

Outro agente deve seguir estas regras:

### 1. Auditar antes de alterar

Executar:

- `git status`;
- histórico;
- diff;
- build;
- inspeção dos arquivos relevantes.

### 2. Não confiar cegamente em checkpoints antigos

Os relatórios podem descrever estados anteriores.

O Git atual é a fonte de verdade.

### 3. Não alterar escopo silenciosamente

Se o lote é sobre Hero, não modificar carrinho.

Se é sobre assets, não redesenhar o cardápio.

### 4. Não inventar conteúdo

Nunca inventar:

- preço;
- endereço;
- horário;
- telefone;
- URL de iFood;
- produto;
- fotografia;
- informação comercial.

### 5. Não inventar assets

Usar assets existentes ou previamente aprovados.

### 6. Build obrigatório

Toda alteração relevante deve terminar com build.

### 7. QA visual real

Quando a mudança for visual, testar desktop e mobile.

### 8. Git seletivo

Commit somente o que pertence ao lote auditado.

### 9. Push separado

Commit e push são operações distintas.

### 10. Não fazer operações destrutivas

Sem autorização explícita:

- `reset`;
- `rebase`;
- `amend`;
- squash;
- remoção ampla;
- alteração de histórico.

---

# 22. CRITÉRIOS DE QUALIDADE

Antes de considerar um lote concluído:

- build PASS;
- zero warnings novos;
- zero erros;
- `git diff --check` limpo;
- zero segredos;
- zero artefatos;
- zero dependências inesperadas;
- imagens carregando;
- rotas funcionando;
- mobile validado;
- desktop validado;
- acessibilidade preservada;
- `prefers-reduced-motion` respeitado quando houver movimento;
- escopo do lote comprovado.

---

# 23. ARQUITETURA DE DECISÃO

A filosofia do projeto pode ser resumida assim:

```text
PESQUISA
   ↓
ChatGPT analisa e define direção
   ↓
Briefing / prompt do lote
   ↓
DeepSeek implementa
   ↓
Build + QA + auditoria
   ↓
Checkpoint Git
   ↓
ChatGPT valida estratégia/escopo
   ↓
Commit autorizado
   ↓
Push autorizado
   ↓
Vercel publica
```

O Google Notebook/NotebookLM alimenta principalmente a camada de pesquisa e estratégia.

GitHub mantém o código e histórico.

Vercel publica o resultado.

---

# 24. BRIEFING MESTRE PARA NOVO AGENTE

Use este bloco como contexto inicial de um novo agente:

> Você está assumindo o projeto Turquia Lanches.
>
> O projeto é uma aplicação React/Vite publicada no Vercel, com código versionado no GitHub. O modelo atual é **site institucional + catálogo/cardápio**, não e-commerce. O canal de pedidos será o **iFood**, somente quando a URL oficial estiver disponível.
>
> O projeto foi concebido a partir de pesquisa estratégica consolidada em Google Notebook/NotebookLM. O ChatGPT atua como estrategista, arquiteto, auditor e responsável pelos briefings. O DeepSeek atuou como agente implementador, executando as mudanças propostas nos briefings, builds, QA e checkpoints Git.
>
> O Figma foi considerado durante o processo, mas não faz parte da operação atual.
>
> A infraestrutura atual deve permanecer simples: **GitHub como repositório + Vercel gratuito como deployer/hosting**.
>
> A aplicação usa React, Vite, React Router, Tailwind CSS, CSS próprio e Context API. Não introduza novas bibliotecas sem justificativa.
>
> A fotografia real é prioridade. O Hero desktop possui 3 imagens em crossfade, com Ken Burns extremamente sutil. O mobile possui composição própria full-bleed. Não obscureça a fotografia para tornar texto legível; resolva problemas através de composição, posição, largura, tipografia e scrim localizado.
>
> As imagens principais já foram migradas de URLs externas para assets locais em `src/assets/images/`.
>
> O Design System existente deve ser preservado.
>
> O projeto trabalha por lotes. Antes de qualquer alteração:
>
> 1. audite o Git real;
> 2. leia o código atual;
> 3. identifique o escopo;
> 4. não altere áreas não relacionadas;
> 5. implemente somente o necessário;
> 6. execute build;
> 7. faça QA;
> 8. produza checkpoint;
> 9. aguarde autorização para commit;
> 10. aguarde autorização separada para push.
>
> Nunca invente preço, conteúdo comercial, URL de iFood, endereço, horário, produto ou integração.
>
> O próximo refinamento conhecido é melhorar a composição visual do texto do Hero:
>
> “Sabor raiz, ingredientes frescos e aquele exagero que a gente ama. O melhor lanche da cidade te espera.”
>
> O objetivo é fazer o texto coexistir com a fotografia sem transformar a imagem em fundo escuro, lavado ou ilegível.
>
> Antes de afirmar qualquer estado do projeto, confira o Git e o código reais.

---

# 25. REGRA FINAL DE CONTINUIDADE

Este documento é um **mapa de arquitetura e histórico**, não um substituto do repositório.

Em qualquer retomada:

1. verificar `git status`;
2. verificar `HEAD` e `origin/main`;
3. verificar último commit;
4. verificar working tree;
5. revisar o código relacionado à tarefa;
6. só então propor o próximo lote.

**Não presumir que um lote foi commitado ou enviado apenas porque aparece como concluído neste documento.**

**Código + Git atual > checkpoint antigo > memória do agente.**

---

## FIM DO DOCUMENTO
