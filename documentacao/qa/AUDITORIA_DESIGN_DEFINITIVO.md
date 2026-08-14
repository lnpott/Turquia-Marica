# Auditoria para o refinamento definitivo do design

## Veredito

O design definitivo **não foi realizado** nos lotes anteriores. O que existe é um checkpoint funcional, responsivo e acessível, mas ainda com aparência de interface provisória. Passar em build, testes, axe e Lighthouse não equivale a aprovação visual.

Esta auditoria torna o refinamento visual a próxima prioridade. Fotografias oficiais, preços, horários, telefone e demais informações comerciais não bloqueiam o trabalho: até a aprovação do design, devem continuar representados por conteúdo provisório claramente sinalizado.

## Escopo auditado

- screenshots de Home em 390 e 1280 px;
- screenshot de Cardápio em 390 px;
- screenshot de Localização em 1280 px;
- implementação atual de layout, páginas, componentes e CSS;
- direção *Modern Vernacular* descrita no Design System;
- registros e restrições do `BEST_PLAN.MD`.

## Achados prioritários

### 1. Direção visual pouco expressiva

A paleta está presente, mas a composição ainda parece um template montado com blocos independentes. Falta uma linguagem proprietária que conecte energia de lanchonete de bairro, fartura e acabamento digital. O uso repetido de fundos muito claros, cards brancos e bordas suaves reduz a personalidade prometida pelo Design System.

### 2. Home sem narrativa visual contínua

O hero tem boa legibilidade, porém a fotografia isolada em um card inclinado compete pouco com a grande área vazia. A faixa amarela rompe o fluxo abruptamente. Categorias e bloco institucional parecem seções de sistemas diferentes, com excesso de espaço sem função e pouca progressão entre promessa, cardápio, prova de identidade e ação.

### 3. Cardápio com aparência de lista provisória

No mobile, o hero, a navegação inferior fixa e a grade vertical geram uma página longa e repetitiva. Os cards tratam categorias distintas com a mesma densidade e não estabelecem uma arquitetura preparada para nome, descrição, preço e disponibilidade. A categoria sem fotografia produz um vazio que evidencia o estado provisório.

### 4. Localização visualmente desconectada

O grande bloco vermelho cria impacto, mas não conversa suficientemente com a linguagem da Home. O cartão de informações concentra muitos divisores e avisos, enquanto o mapa funciona como outro card genérico. A hierarquia entre destino, rota e dados auxiliares precisa ser mais direta.

### 5. Navegação e rodapé sem acabamento final

Header desktop, menu mobile, barra inferior e rodapé cumprem a função, mas ainda não formam um sistema visual coeso. Estados indisponíveis recebem destaque excessivo em alguns contextos. O rodapé ocupa muita altura no mobile e repete informações sem criar um encerramento de marca forte.

### 6. Validação anterior insuficiente para design

As evidências anteriores comprovam estabilidade técnica e ausência de regressões bloqueantes. Elas não medem qualidade de composição, consistência entre páginas, personalidade, ritmo ou desejo. A etapa visual foi, portanto, incorretamente tratada como encerrada.

## Direção obrigatória

1. **Preservar a identidade:** vermelho, amarelo, preto, tipografia forte e caráter local permanecem; não criar uma estética genérica de aplicativo de delivery.
2. **Compor antes de decorar:** estabelecer grid, hierarquia, ritmo e narrativa antes de adicionar efeitos.
3. **Usar contraste com intenção:** reservar vermelho e amarelo para momentos de marca e ação, evitando faixas ou avisos que fragmentem a leitura.
4. **Preparar conteúdo real sem depender dele:** componentes devem aceitar textos curtos/longos, preços, indisponibilidade e imagens ausentes sem perder qualidade.
5. **Reduzir repetição:** consolidar avisos de construção e diminuir o peso visual de informações indisponíveis.
6. **Criar continuidade entre rotas:** compartilhar grid, tratamentos de hero, seções, superfícies, raios, sombras, iconografia e CTAs.
7. **Mobile não é desktop empilhado:** recompor hierarquia, ordem, densidade e navegação para telas estreitas.

## Plano de implementação

### Fase A — Fundação visual

- revisar tokens de cor, tipografia, espaçamento, largura, raios e sombras;
- definir grid e padrões editoriais compartilhados;
- refinar Header, menu mobile, BottomNavBar, Footer, botões, avisos e estados de foco;
- documentar componentes e evitar estilos pontuais divergentes.

### Fase B — Home definitiva

- recompor hero com maior presença de marca e melhor relação texto/imagem;
- substituir a faixa de fatos por uma solução integrada à narrativa;
- reorganizar categorias para comunicar fartura sem simular produtos confirmados;
- transformar o bloco institucional em encerramento editorial de marca;
- revisar ritmo completo da primeira dobra ao rodapé.

### Fase C — Cardápio definitivo

- definir arquitetura visual escalável para categorias e futuros produtos;
- criar placeholders intencionais, sem áreas vazias ou fotografias semanticamente incorretas;
- reduzir repetição de avisos e preparar estados de disponibilidade;
- revisar navegação e densidade mobile.

### Fase D — Localização definitiva

- alinhar hero e superfícies à linguagem compartilhada;
- priorizar “Como chegar” e o mapa;
- simplificar a apresentação de dados indisponíveis;
- garantir boa composição com ou sem endereço e horário completos.

### Fase E — QA e aprovação visual

- capturar Home, Cardápio e Localização em 390 e 1280 px;
- conferir também 320, 768 e 1440 px;
- comparar screenshots antes/depois e registrar decisões;
- verificar estados hover, focus, active, disabled e reduced motion;
- repetir `npm run check`, `npm run test:e2e`, axe e `git diff --check`;
- manter a etapa aberta até aprovação visual explícita.

## Critérios de aceite do design

- as três rotas parecem partes inequívocas da mesma marca;
- a Home possui narrativa, hierarquia e ritmo claros em mobile e desktop;
- o Cardápio parece intencional mesmo sem produtos, preços ou fotos oficiais;
- a Localização prioriza a rota sem transformar ausências em protagonistas;
- não há blocos vazios, repetições desnecessárias ou espaços sem função;
- navegação, botões, cards, avisos e rodapé compartilham o mesmo acabamento;
- o resultado continua utilizável a 200% de zoom, por teclado e com movimento reduzido;
- screenshots antes/depois estão registradas;
- a aprovação visual é explícita e separada da aprovação técnica.

## Fora desta etapa

- troca pelas fotografias oficiais;
- preenchimento de preços, ingredientes, horários, telefone, WhatsApp e endereço completo;
- ativação do iFood;
- avaliações, promoções, analytics e testes A/B.

Esses itens entram somente depois do aceite do design, sem impedir o redesenho agora.
