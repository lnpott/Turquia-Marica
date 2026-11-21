# Turquia Lanches — Auditoria UX/UI, pesquisa internacional e roadmap

**Data:** 12 de agosto de 2026  
**Escopo auditado:** repositório `lnpott/Turquia-Marica`, branch `main`, commit `7ef691f`; produção em `https://turquia-marica.vercel.app`  
**Regra desta etapa:** análise e planejamento somente. Nenhuma alteração foi implementada no projeto.

---

## 1. Executive Summary

O projeto não deve ser refeito do zero. A base React + Vite + Tailwind é simples, compreensível e suficiente para um site institucional/cardápio que envia pedidos ao iFood. A arquitetura visual também já tem virtudes: paleta coerente com a marca, boa repetição de tokens, hierarquia razoável, navegação inferior mobile, foco visível, respeito a `prefers-reduced-motion` e componentes reutilizáveis.

O problema central não é falta de “design moderno”. É falta de verdade comercial e fechamento operacional. Hoje a interface promete um restaurante real, mas mostra imagens que não correspondem ao Turquia Lanches, preços `R$ --,--`, horário “em breve”, endereço incompleto, mapa ilustrativo e links de pedido para a homepage genérica do iFood. Isso destrói a confiança justamente nos primeiros dez segundos.

Há ainda um defeito técnico crítico confirmado em produção: `/cardapio` e `/localizacao` retornam HTTP 404 quando acessados diretamente. A navegação interna da SPA pode parecer funcionar, mas links compartilhados, recarregamento e rastreamento por mecanismos de busca falham.

Direção recomendada: **“Fartura de bairro, sem pose”**. O site deve parecer genuinamente Turquia Lanches: fotografia própria, porções abundantes, ambiente local, linguagem direta, vermelho da marca como ação, amarelo como acento, tipografia forte sem virar parque de diversões e informação comercial visível. A evolução deve ser incremental.

Prioridade real:

1. corrigir rotas públicas, links de pedido e informações comerciais;
2. substituir imagens falsas/genéricas por acervo real;
3. publicar cardápio enxuto com nomes, descrições e preços verdadeiros;
4. reduzir a repetição do cardápio na homepage;
5. completar SEO local, metadados, acessibilidade e performance;
6. somente depois experimentar textura, motion editorial ou composição mais ousada.

---

## 2. Metodologia de pesquisa

Foram usados cinco eixos:

- auditoria do repositório e do histórico Git;
- leitura dos componentes ativos, dados, tokens e assets;
- verificação HTTP da versão publicada;
- inspeção visual dos screenshots e do acervo de imagens;
- pesquisa web em galerias premiadas, sites comerciais reais e documentação normativa.

As referências foram separadas por utilidade: direção de arte, UX/conversão e equilíbrio. Prêmio foi tratado como evidência de reconhecimento estético, não como prova de conversão.

Fontes principais:

- [Awwwards — Food & Drink](https://www.awwwards.com/websites/food-drink/)
- [Awwwards — Hotel & Restaurant](https://www.awwwards.com/websites/hotel-restaurant/)
- [SiteInspire — Food & Drink](https://www.siteinspire.com/websites?categories=145)
- [One Page Love — menu sections](https://onepagelove.com/section/menu)
- [Google Web Vitals](https://web.dev/articles/vitals)
- [W3C WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- sites oficiais das marcas listadas no benchmark.

Limitações:

- não há dados analíticos, mapa de calor, funil ou entrevistas com clientes;
- não foi possível executar Lighthouse no ambiente de auditoria;
- o projeto parece recente demais para possuir dados públicos suficientes no CrUX;
- premiação só foi registrada quando a página da organização a confirmou;
- não se afirmou que uma referência “nunca ganhou prêmio”; apenas que foi selecionada por sua execução comercial, não por premiação confirmada.

---

## 3. Diagnóstico do Turquia Lanches atual

### Arquitetura ativa

O código atual tem três rotas reais:

- `/` — homepage, incluindo o componente completo de cardápio;
- `/cardapio` — cardápio com hero;
- `/localizacao` — informações e mapa ilustrativo;
- qualquer outra rota — placeholder genérico.

O projeto abandonou corretamente o fluxo interno de sacola/checkout em favor do iFood, mas ainda mantém dados e documentos legados que confundem a leitura do repositório.

### Teste dos primeiros 10 segundos

| Pergunta do visitante | Situação atual | Resultado |
|---|---|---|
| O que é? | Lanchonete/hamburgueria em Maricá é compreensível | Parcialmente aprovado |
| O que vende? | Cards sugerem hambúrguer, combos e outras categorias | Parcialmente aprovado |
| Quanto custa? | Preços exibidos como `R$ --,--` | Reprovado |
| Como pedir? | Muitos CTAs, mas todos levam à homepage genérica do iFood | Reprovado |
| Onde fica? | Só “Parque Nanci, Maricá/RJ” | Reprovado |
| Está aberto? | “Em breve: horários oficiais” | Reprovado |
| Posso confiar nas fotos? | Várias imagens não são da casa nem representam o produto | Reprovado |

### Estado por aspecto

| Aspecto | Decisão | Síntese |
|---|---|---|
| Stack React/Vite/Tailwind | Manter | Adequada ao escopo e barata de operar |
| Paleta vermelho/amarelo/creme | Manter e calibrar | Tem personalidade e conexão com a marca |
| Rubik + DM Sans | Manter no curto prazo | Legível; pode ganhar um display mais proprietário futuramente |
| Header e bottom navigation | Melhorar | Boa base, mas hash e estado ativo precisam ser robustos |
| Hero fotográfico | Melhorar | Estrutura funciona; fotografia e mensagem precisam ser reais |
| Homepage com cardápio completo | Substituir | Excesso de extensão e duplicação; usar seleção curada |
| Cards de produto | Melhorar | Componentização boa; conteúdo comercial é fictício/incompleto |
| Slideshow automático | Experimentar/manter com cautela | Movimento leve, mas só se houver três fotos realmente fortes |
| Mapa ilustrativo | Substituir | Não ajuda navegação real |
| Footer com links `#` | Remover ou implementar | Controles falsos reduzem confiança |
| Fluxo de sacola interno | Remover do produto ativo | A decisão iFood já foi tomada |
| Assets e HTMLs legados | Arquivar fora da raiz | Poluem a manutenção e induzem agentes a editar a versão errada |

---

## 4. Pontos fortes existentes

- Componentes claros: `Button`, `Badge`, `ProductCard`, `CategoryFilterBar`, `Header`, `Footer` e `BottomNavBar`.
- Fonte única para links em `src/data/contact.js`.
- Tokens de cor, tipografia e espaçamento centralizados no Tailwind.
- Alvos móveis em geral próximos ou acima de 44 px.
- Foco visível global.
- Motion reduzido quando o sistema pede menos animação.
- Imagens locais, evitando dependência de URLs temporárias do Stitch.
- Header sticky e navegação inferior mobile coerentes com uso de uma mão.
- Cards de categoria e chips permitem descoberta progressiva.
- Estrutura sem backend desnecessário e sem dependência de carrinho próprio.

Esses elementos devem ser preservados. O erro seria jogar fora a fundação para instalar um framework mais pesado só para parecer “novo”.

---

## 5. Problemas encontrados

### P0 — Funcionamento e conversão

1. **Deep links quebrados:** `/cardapio` e `/localizacao` retornam 404 em acesso direto. Falta regra de rewrite/fallback da SPA no deploy.
2. **iFood incorreto:** `IFOOD_URL` aponta para `https://www.ifood.com.br/`, não para a loja Turquia Lanches.
3. **Preços inexistentes:** todos os preços públicos usam placeholder, enquanto alguns “preços antigos” parecem reais. Isso pode soar enganoso.
4. **Informação local incompleta:** endereço, horário e telefone real não estão publicados.
5. **Fotografia falsa ou semanticamente errada:** arquivos nomeados como ambiente, combo, clássico e sobremesa mostram salgados, evento, futebol, skyline, vinhos ou produtos incompatíveis.

### P1 — Alta perda de qualidade

- Hero desktop usa imagens de aproximadamente 410×512 ou 512×279 ampliadas para áreas próximas de 1280×700: resolução insuficiente.
- Homepage inclui o cardápio completo após quatro seções, tornando a página muito longa e redundante.
- Categorias “Porções”, “Bebidas” e “Sobremesas” não têm produtos; o filtro leva a estados vazios.
- O clique em categoria muda o filtro, mas não aproxima o usuário dos resultados.
- A rota de hash `/\#cardapio` depende de comportamento não tratado explicitamente e pode não rolar corretamente em todos os caminhos.
- O mapa é uma imagem estática com controles decorativos; não oferece localização verificável.
- Textos genéricos (“melhor lanche da cidade”, “ingredientes selecionados”) não provam nada e soam intercambiáveis.

### P1 — SEO e compartilhamento

- só há `<title>` genérico;
- faltam meta description, canonical, Open Graph, Twitter Card e imagem social;
- não há JSON-LD `Restaurant`/`LocalBusiness`;
- não há `robots.txt` nem `sitemap.xml`;
- as três rotas compartilham o mesmo documento client-side;
- deep links 404 tornam indexação e compartilhamento frágeis.

### P2 — Acessibilidade e qualidade técnica

- imagens não têm `width`/`height`, `srcset`, `sizes` nem `loading="lazy"`;
- hero como `background-image` dificulta priorização do LCP;
- `alt` descreve conteúdo que a fotografia não mostra, pior que alt vazio;
- slideshow usa `tablist/tab` sem painéis e relações completas; a semântica pode ser simplificada;
- botão do menu mantém rótulo “Abrir menu” mesmo quando deveria “Fechar menu”;
- footer contém links falsos `href="#"`;
- ano do copyright está fixo em 2024;
- não existem testes automatizados nem script de lint;
- README afirma uma estrutura `/public` e `/src` que não corresponde ao estado real e traz instruções como se o repositório ainda não existisse.

### Observação de build

A instalação local não pôde ser validada porque o ambiente de execução redirecionou o cache do npm para uma pasta bloqueada e corrompeu downloads. Isso não foi classificado como defeito do código. O build publicado existe; a validação deve ser repetida em CI limpa.

---

## 6. Benchmark internacional

O benchmark útil não é “qual site parece mais caro”. É “qual decisão resolve melhor desejo, clareza e ação”. A seleção final cobre Brasil, Peru, Argentina, Reino Unido, Espanha, França, Irlanda, Japão, Austrália, Canadá/EUA.

| Referência | País | Segmento | Força principal | Lição para Turquia |
|---|---|---|---|---|
| [Patties](https://pattiesburger.com/) | Brasil | Smash burger independente | Voz humana e identidade consistente | Marca local pode soar autoral sem texto corporativo |
| [Bullguer](https://bullguer.com/) | Brasil | Smash burger | Cardápio e preços imediatamente legíveis | Clareza comercial vence excesso de efeitos |
| [Bembos](https://www.bembos.com.pe/) | Peru | Fast food local | Produto, ofertas e pedido | Adaptar sabores/linguagem ao mercado local |
| [Mostaza](https://www.mostazaweb.com.ar/menues/) | Argentina | Fast food | Categorias simples e visual de produto | Navegação direta para quem já está com fome |
| [Honest Burgers](https://www.honestburgers.co.uk/) | Reino Unido | Fast casual | Prova de produto + modos de pedido | Explicar por que é bom e oferecer ação concreta |
| [MOS Burger](https://www.mos.jp/inbound/en/) | Japão | Burger japonês | Diferenciação cultural visível | Produto local específico é mais forte que “premium” genérico |
| [Grill’d](https://grilld.com.au/) | Austrália | Burger casual | Proposta de valor e navegação de pedido/local | Marca e utilidade podem coexistir |
| [A&W](https://web.aw.ca/) | Canadá | Fast food | Produto reconhecível e localização | Ação comercial precisa estar sempre a um toque |
| [The One Burger BCN](https://www.awwwards.com/sites/the-one-burger-bcn) | Espanha | Burger independente | Conceito reduzido e memorável | Uma ideia forte é melhor que cinco slogans |
| [Burger & Sauce](https://www.awwwards.com/sites/burger-sauce) | Reino Unido | Burger | Identidade gráfica + fotografia | Repetir poucos códigos de marca com disciplina |
| [Les Burgers de Colette](https://www.awwwards.com/sites/les-burgers-de-colette) | França | Burger gourmet | Personalidade e apresentação | Refinamento não exige abandonar apetite |
| [Allta](https://onepagelove.com/allta) | Irlanda | Restaurante | Fotografia e interação editorial | Interação pode enriquecer menu, mas não esconder preço |

---

## 7. Grupo A — Excelência em Direção de Arte

### The One Burger BCN — Espanha

- **Fonte/reconhecimento:** Awwwards Honorable Mention, confirmado na página da premiação.
- **Excepcional:** conceito essencial, hero memorável, microinterações e disciplina visual.
- **Limitação:** rotação/efeitos podem atrasar a descoberta de preço e pedido.
- **Adaptar:** reduzir a homepage a uma ideia forte e repetível.
- **Não copiar:** 3D ou animação apenas para impressionar.

### Burger & Sauce — Reino Unido

- **Fonte/reconhecimento:** Awwwards Honorable Mention em 25/08/2020.
- **Excepcional:** preto, branco e dourado; fotografia ampla; tipografia clara; consistência.
- **Limitação:** linguagem visual sofisticada pode parecer genérica se desconectada do estabelecimento real.
- **Adaptar:** fotografia dominante e sistema cromático restrito.
- **Não copiar:** paleta ou estética premium literalmente.

### Les Burgers de Colette — França

- **Fonte/reconhecimento:** Awwwards Honorable Mention, 28/11/2024.
- **Excepcional:** combinação de gourmet, humor e acabamento.
- **Limitação:** franquia e contexto europeu diferem da lanchonete de bairro em Maricá.
- **Adaptar:** personalidade editorial nos títulos e detalhes.
- **Não copiar:** verniz “francês” ou composição distante do público local.

### Allta — Irlanda

- **Fonte:** One Page Love, destaque publicado em 14/10/2024.
- **Excepcional:** fotografia de alta resolução e menu interativo em cartões.
- **Limitação:** interação livre exige mais esforço e pode prejudicar tarefa objetiva.
- **Adaptar:** materialidade, enquadramento e ritmo editorial.
- **Não copiar:** menu experimental no fluxo principal mobile.

---

## 8. Grupo B — Excelência em UX e Conversão

### Bullguer — Brasil

O cardápio oficial publica nomes, ingredientes e preços em uma sequência simples. A página de unidade informa endereço, horário do salão, horário de delivery, telefone e como chegar. É menos “premiável”, mas muito mais útil para uma pessoa faminta.

**Adaptar:** categorias enxutas, preço junto do produto, página local completa.  
**Não copiar:** escala de operação nacional e aplicativo próprio.

### Bembos — Peru

Combina produtos culturalmente locais, ofertas e ação de delivery. A força não é minimalismo; é deixar clara a variedade e o caminho de compra.

**Adaptar:** linguagem regional e combos com função real.  
**Não copiar:** densidade promocional de rede grande.

### Mostaza — Argentina

Menu organizado por Mega, Frango, individuais, saladas, infantil, extras, café e sobremesas. A classificação atende intenção de compra.

**Adaptar:** taxonomia curta baseada no jeito que o cliente pede.  
**Não copiar:** número de categorias e promoções sem catálogo suficiente.

### MOS Burger — Japão

O site internacional apresenta de imediato sabores japoneses — tonkatsu, yakitori, tempura, matcha — e comunica diferenciação real.

**Adaptar:** provar o que torna a Turquia local e singular.  
**Não copiar:** estética japonesa ou organização voltada a turistas.

### Grill’d — Austrália

Mantém `Order`, `Menu` e `Find a Restaurant` como ações recorrentes, ao mesmo tempo que explica ingredientes naturais e posicionamento.

**Adaptar:** trio “ver cardápio / pedir / chegar”.  
**Não copiar:** discurso de saúde se não for verdade operacional.

### A&W — Canadá/EUA

Separa categorias, produtos em destaque, ofertas, localização e pedido. A utilidade é alta, embora o site carregue mais campanhas que um negócio local precisa.

**Adaptar:** produto reconhecível e CTA próximo.  
**Não copiar:** clube, app e campanhas complexas.

---

## 9. Grupo C — Equilíbrio Excepcional

### Honest Burgers — Reino Unido

É a referência mais útil. O site une apetite, origem dos ingredientes, personalidade, cardápio, opções alimentares e três modos claros: comer no local, retirar ou receber. A marca prova valor (“açougue próprio”, batatas preparadas diariamente) antes de pedir confiança.

**Para Turquia:** substituir adjetivos vagos por provas verdadeiras: tamanho, ingredientes, preparo, tradição, ambiente, produto campeão.  
**Não copiar:** narrativa de cadeia britânica ou funcionalidades de múltiplas unidades.

### Patties — Brasil

A linguagem parece escrita por uma pessoa real, o que reforça identidade. O site assume humor, história e visual nostálgico. É um bom antídoto contra textos genéricos produzidos por IA.

**Para Turquia:** voz própria de Maricá, calor humano e pequenas imperfeições intencionais.  
**Não copiar:** nostalgia americana, erros ou irreverência em excesso.

### Bullguer — Brasil

Equilibra marca reconhecível com menu, unidade, telefone, horário e preço. Não é a referência mais experimental; é uma das mais transferíveis.

**Para Turquia:** usar a estética para enquadrar informação, não substituí-la.  
**Não copiar:** arquitetura de rede com muitas unidades.

### The One Burger BCN — Espanha

Entra no Grupo C com ressalva: excelente síntese de marca e interface, porém efeitos precisam ser subordinados ao uso mobile. Serve como inspiração conceitual, não como modelo de conversão.

---

## 10. Sites premiados relevantes

| Projeto | Reconhecimento confirmado | Ensina | Não prova |
|---|---|---|---|
| The One Burger BCN | Awwwards Honorable Mention, 04/03/2024 | Conceito e microinteração | Conversão ou velocidade |
| Burger & Sauce | Awwwards Honorable Mention, 25/08/2020 | Identidade e fotografia | Clareza de preços atual |
| The Good Burger | Awwwards Honorable Mention, 05/03/2019 | Mundo visual underground | Simplicidade técnica; usa WebGL/PixiJS |
| Quay Restaurant | Awwwards Site of the Day | Fotografia e atmosfera | Adequação a lanchonete popular |
| Les Burgers de Colette | Awwwards Honorable Mention, 28/11/2024 | Branding e acabamento | Eficiência de pedido |
| Sliders Copenhagen | Awwwards Honorable Mention | Minimalismo e fotografia | Atualidade do fluxo comercial |

Conclusão crítica: usar premiações para aprender composição, fotografia, voz e ritmo; validar cardápio, localização e pedido em operações reais.

---

## 11. Sites excelentes selecionados pela execução comercial

- [Bullguer](https://bullguer.com/): preço, ingredientes e páginas de unidade.
- [Patties](https://pattiesburger.com/): voz de marca humana.
- [Honest Burgers](https://www.honestburgers.co.uk/): prova de qualidade e múltiplos modos de conversão.
- [Bembos](https://www.bembos.com.pe/): identidade local peruana e delivery.
- [Mostaza](https://www.mostazaweb.com.ar/menues/): taxonomia de menu.
- [MOS Burger](https://www.mos.jp/inbound/en/): diferenciação cultural de produto.
- [Grill’d](https://grilld.com.au/): proposta de valor + ação.
- [A&W Canada](https://web.aw.ca/): localização e produto.

Não se afirma ausência histórica de prêmio; apenas que a seleção foi baseada em utilidade comercial observável.

---

## 12. Padrões encontrados

1. **Desejo vem antes da decisão:** as melhores páginas mostram um produto real em escala dominante imediatamente antes ou junto do CTA.
2. **Preço reduz ansiedade:** menus comerciais eficientes não obrigam o usuário a sair do site para descobrir faixa de preço.
3. **Poucos produtos heroicos vencem catálogos falsos:** 3–6 campeões bem fotografados funcionam melhor que categorias vazias.
4. **Marca forte repete códigos:** cor, tipografia, linguagem e enquadramento se repetem; não há um efeito novo por seção.
5. **Negócio local precisa responder “aberto, onde e como”:** horário, endereço e pedido são parte do design.
6. **Autenticidade supera banco de imagem:** foto imperfeita da casa, bem tratada, gera mais confiança que fotografia impecável de produto alheio.
7. **Mobile prioriza decisão:** categorias horizontais, CTA sticky e cards densos; desktop expande narrativa e ambiente.
8. **Motion bom confirma estado:** hover, mudança de filtro, feedback de toque e transição curta. Motion ruim compete com fome e pressa.

---

## 13. Tendências 2025–2026

Fontes de tendência como [Figma](https://www.figma.com/resource-library/web-design-trends/), [Adobe](https://www.adobe.com/express/learn/blog/design-trends-2026) e [Wix](https://www.wix.com/blog/web-design-trends) convergem em tipografia expressiva, experiências mais táteis, maximalismo controlado e movimento. Isso é direção cultural, não regra funcional.

| Tendência | Classificação | Aplicação |
|---|---|---|
| Tipografia expressiva | Recomendada | Títulos curtos e próprios, sem prejudicar leitura |
| Fotografia imersiva | Recomendada | Produto e ambiente reais, responsivos |
| Layout editorial assimétrico | Recomendada | Galeria e histórias; não no cardápio principal |
| Textura tátil/analógica | Potencialmente útil | Papel, chapa, carimbo e grão em doses pequenas |
| Maximalismo controlado | Potencialmente útil | Um ponto de energia por viewport |
| Bento grid | Potencialmente útil | Benefícios/localização, se o conteúdo justificar |
| Microinterações | Recomendada | Filtro, CTA, foco e navegação |
| Scroll animation | Potencialmente útil | Reveal leve; sempre dispensável com reduced motion |
| Vídeo hero | Desnecessária agora | Falta acervo e aumenta custo/LCP |
| 3D/WebGL | Prejudicial | Sem retorno comercial proporcional |
| Parallax forte | Prejudicial | Movimento, bateria, náusea e manutenção |
| Navegação experimental | Prejudicial | A tarefa é descobrir e pedir rápido |
| Brutalismo integral | Desnecessária | Pode conflitar com apetite e legibilidade |

---

## 14. Tendências descartadas e justificativas

- **WebGL/3D de hambúrguer:** alto custo de JS, produção e manutenção; não resolve preço, localização ou autenticidade.
- **Vídeo autoplay:** exige captação profissional e versões responsivas; um JPEG borrado não vira cinema por milagre.
- **Cursor customizado:** ruim em acessibilidade e irrelevante no mobile.
- **Scroll hijacking:** atrapalha navegação rápida e leitores de tela.
- **Glassmorphism pesado:** blur consome renderização e reduz contraste.
- **Cardápio em PDF:** péssimo para mobile, SEO, atualização e acessibilidade.
- **Chatbot:** não há problema que justifique outro canal antes de endereço e horário corretos.

---

## 15. Estratégia de fotografia e apresentação gastronômica

### Plano de captação mínimo

1. hero horizontal 3:2 ou 16:9, 2400 px, produto campeão;
2. hero vertical 4:5, 1600×2000 px, pensado para mobile;
3. 6 produtos principais em enquadramento consistente;
4. 3 combos com composição e escala visíveis;
5. 4 fotos do ambiente, fachada, equipe e clientes autorizados;
6. 2 detalhes de preparo/ingrediente;
7. logo em SVG/PNG transparente.

### Direção

- luz lateral quente, contraste controlado;
- aproximação suficiente para revelar crosta, molho e textura;
- fundo real da casa ou cor da marca, não cenário genérico;
- mãos e contexto para transmitir escala;
- evitar excesso de props que não pertencem à operação;
- manter cor natural do alimento; saturação radioativa é propaganda de Chernobyl.

### Entrega web

- AVIF com fallback WebP/JPEG;
- variantes por largura (`srcset`);
- hero com `fetchpriority="high"` e dimensões reservadas;
- conteúdo abaixo da dobra com `loading="lazy"`;
- orçamento inicial: hero até ~180 KB mobile e ~300 KB desktop; cards ~60–100 KB cada, sujeito a teste visual.

---

## 16. Estratégia UX

Três intenções dominantes:

1. **Quero ver o que tem** → cardápio e preços;
2. **Quero pedir** → loja específica do iFood;
3. **Quero ir até aí** → endereço, horário e rota.

Todo componente deve servir pelo menos uma delas ou reforçar confiança. A homepage não precisa simular um aplicativo de delivery. Deve vender a experiência e encaminhar para a ação correta.

Regras:

- CTA primário “Pedir no iFood”; secundário “Ver cardápio”; terciário “Como chegar”;
- nunca esconder preço sob interação;
- mostrar 4–6 campeões na homepage;
- categoria sem produto não aparece;
- filtros preservam contexto e anunciam resultado para tecnologia assistiva;
- links externos deixam claro o destino;
- informação factual não usa “em breve” em produção.

---

## 17. Estratégia mobile

- header compacto com logo e ação de pedido;
- bottom bar com Início, Cardápio, Pedir e Localização;
- alvos mínimos de 44×44 px; WCAG 2.2 AA exige pelo menos 24×24 CSS px ou espaçamento equivalente, mas 44 px é meta de conforto;
- CTA de pedido sempre acessível sem cobrir conteúdo;
- categorias em chips horizontais com indicador de overflow;
- card de produto em uma coluna ou linha compacta, com imagem, nome, descrição curta e preço no mesmo bloco;
- hero de 70–80 svh no máximo, não uma muralha antes da informação;
- animação desativável e nunca essencial;
- mapa real abre aplicativo de mapas;
- telefone/WhatsApp copiável e clicável.

---

## 18. Estratégia de conversão

### Funil recomendado

`Descoberta → desejo → prova → preço → pedido/localização`

### Elementos

- produto campeão e faixa de preço acima da dobra;
- “mais pedidos” baseados em dado real do cliente;
- avaliações somente com fonte e permissão;
- link direto da loja no iFood com UTMs quando suportado;
- eventos analíticos: `view_menu`, `select_category`, `click_ifood`, `click_whatsapp`, `click_directions`, `view_location`;
- horário e status “aberto agora” só se calculados de fonte confiável;
- promoções com validade explícita.

Hipótese principal a testar: mostrar 4 produtos e preço inicial na homepage aumentará cliques qualificados no iFood mais que exibir o menu completo.

---

## 19. Arquitetura recomendada da homepage

| Seção | Objetivo | Mobile | Desktop | CTA |
|---|---|---|---|---|
| Header | Orientar e converter | Compacto | Navegação completa | Pedir |
| Hero | Identidade + desejo | Foto vertical, título curto | Foto horizontal editorial | Pedir / Ver cardápio |
| Faixa de utilidade | Responder rápido | Horário, bairro, rota | Mesmos dados em linha | Como chegar |
| Mais pedidos | Provar produto/preço | 4 cards compactos | Grid 4 ou carrossel sem dependência | Ver cardápio |
| Selo de fartura | Diferenciar | 2–3 fatos reais | Bloco editorial | Conheça a casa |
| Ambiente | Vender experiência | 1 foto + texto curto | Split editorial | Localização |
| Prova social | Confiança | 2–3 avaliações verificadas | Grade curta | Ver no Google |
| CTA final | Fechar decisão | Sticky/alto contraste | Bloco amplo | Pedir no iFood |
| Footer | Dados legais e locais | Enxuto | Expandido | WhatsApp/Maps |

Remover da homepage: catálogo completo, categorias vazias, links institucionais falsos e galerias com imagens promocionais contendo calendários/texto ilegível.

---

## 20. Estratégia recomendada para o cardápio

- rota própria e recarregável;
- hero curto ou nenhum hero em retorno recorrente;
- categorias reais: Combos, Hambúrgueres, Porções, Bebidas, Sobremesas — somente quando houver conteúdo;
- preço visível e atualizado;
- descrição com ingredientes reais e indicação de tamanho/quantidade;
- badges apenas se verificáveis: Mais pedido, Vegetariano, Apimentado;
- alergênicos essenciais ou aviso para consulta;
- botão por produto pode levar ao cardápio iFood, mas não deve fingir adicionar o item se o deep link do produto não existir;
- CTA sticky “Pedir no iFood” no mobile;
- não manter personalização de adicionais no site se o pedido termina no iFood.

---

## 21. Direção de arte

### Conceito: Fartura de bairro, sem pose

O Turquia deve parecer uma casa viva de Maricá, não uma rede turca genérica, um cassino esportivo ou um template de hamburgueria americana.

### Personalidade

- generosa;
- direta;
- calorosa;
- popular com acabamento;
- divertida sem infantilidade;
- local sem folclore artificial.

### Linguagem visual

- vermelho profundo da marca como ação e assinatura;
- amarelo quente como selo e destaque, não fundo dominante;
- creme quente para respirar;
- grafite para texto;
- fotografia real em escala ampla;
- textura de papel, chapa ou carimbo em áreas pequenas;
- títulos curtos com ritmo de cartaz;
- ícones simples e consistentes.

Por que pertence ao Turquia: a marca já tem vermelho/amarelo, discurso de fartura, ambiente social e herança local. A direção intensifica o que existe em vez de inventar luxo ou minimalismo estrangeiro.

---

## 22. Design system recomendado

### Cores

- `brand-red`: manter próximo de `#AE0011`/logo, validar em tela e impressão;
- `brand-red-hover`: tom mais escuro;
- `brand-yellow`: `#FDC008` como acento;
- `ink`: `#251913`;
- `cream`: `#FFF8F6`;
- `surface-warm`: `#FFF1EC`;
- `success/whatsapp`: verde oficial, apenas no canal WhatsApp.

### Tipografia

- curto prazo: Rubik 700/800 + DM Sans 400/500/700;
- médio prazo: testar uma fonte display condensada/licenciada com sotaque vernacular, mantendo DM Sans no corpo;
- escala fluida com `clamp()`; corpo mínimo 16 px.

### Componentes

- botão primário 48–52 px de altura;
- botão secundário com borda sólida, sem blur;
- cards com raio 12–16 px e sombra discreta;
- chips 40–44 px de altura;
- selo gráfico apenas para informação verdadeira;
- espaçamento baseado em 4/8 px;
- containers de 1200–1280 px.

### Motion

- 120–220 ms para feedback;
- 250–400 ms para entrada de seção;
- crossfade de hero somente se não piorar LCP e houver controle/pausa;
- sem deslocamentos grandes.

---

## 23. Performance

Metas oficiais de boa experiência no percentil 75: LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1, conforme [Google Web Vitals](https://web.dev/articles/vitals).

Riscos atuais:

- renderização client-side para todo conteúdo;
- hero em CSS background, descoberto após JS/CSS;
- fontes Google e Material Symbols como requisições adicionais;
- imagens sem dimensões responsivas;
- três slides hero carregáveis;
- JS publicado com aproximadamente 200 KB sem compressão observada na requisição de cabeçalho e CSS ~28 KB; medir gzip/brotli e execução real antes de concluir.

Ações:

- usar `<picture>`/`img` para LCP;
- gerar AVIF/WebP responsivo;
- definir largura/altura ou `aspect-ratio`;
- lazy-load abaixo da dobra;
- substituir Material Symbols por conjunto SVG pequeno ou subset;
- hospedar/subsetar fontes se necessário;
- evitar biblioteca de animação;
- configurar cache imutável de assets hasheados;
- instalar medição real ou Speed Insights após tráfego suficiente;
- orçamento: JS inicial ≤ 150 KB gzip como meta, não dogma.

---

## 24. Acessibilidade

Meta: WCAG 2.2 AA.

Manter:

- foco visível;
- HTML semântico;
- reduced motion;
- botões reais para filtros;
- alvos móveis generosos.

Corrigir:

- contraste de texto vermelho pequeno sobre fundos quentes deve ser medido;
- alt deve descrever a imagem real, não o papel esperado do arquivo;
- não usar links `#` falsos;
- implementar skip link;
- anunciar contagem/estado do filtro;
- garantir ordem de headings;
- menu mobile deve gerenciar foco, Escape e rótulo abrir/fechar;
- slideshow deve ter pausa ou ser simplificado;
- não depender apenas de cor para badge/filtro;
- testar zoom 200%, teclado e leitores NVDA/VoiceOver.

Referências: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

---

## 25. SEO e negócio local

### P0/P1

- corrigir 404 das rotas;
- título e description específicos por página;
- canonical;
- Open Graph com imagem 1200×630;
- `Restaurant`/`LocalBusiness` JSON-LD com nome, URL, logo, endereço completo, telefone, horário, `servesCuisine`, `sameAs`, mapa e faixa de preço verdadeira;
- `robots.txt` e sitemap;
- Google Business Profile verificado e consistente;
- NAP idêntico entre site, Google e redes;
- favicon e logo transparente corretos;
- página localização com texto útil de Parque Nanci/Maricá sem spam de palavras-chave.

Google informa que `LocalBusiness` pode comunicar horário, endereço e outras informações e deve ser validado no Rich Results Test. Marcação não garante rich result e deve refletir conteúdo visível. Fontes: [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Establish business details](https://developers.google.com/search/docs/appearance/establish-business-details), [Structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Não usar avaliações inventadas nem marcar no schema avaliações que não existem publicamente no site.

---

## 26. Matriz atual × proposta

| Atual | Problema/evidência | Princípio | Solução | Impacto | Esforço | Risco | Decisão |
|---|---|---|---|---|---|---|---|
| Rotas SPA | Deep links 404 confirmados | Acesso direto/indexação | Rewrite para `index.html` ou geração estática | Muito alto | Baixo | Baixo | Melhorar |
| iFood genérico | Sai da marca sem chegar à loja | Reduzir passos | URL oficial da unidade | Muito alto | Baixo | Baixo | Substituir |
| `R$ --,--` | Usuário não sabe faixa | Clareza comercial | Preços reais ou remover preço antigo | Muito alto | Médio | Médio | Substituir |
| Fotos genéricas | Conteúdo não corresponde ao alt/produto | Autenticidade | Ensaio próprio + matriz de assets | Muito alto | Médio/alto | Médio | Substituir |
| Home com menu completo | Página extensa e repetida | Progressive disclosure | 4–6 destaques + link completo | Alto | Médio | Baixo | Substituir |
| Categorias vazias | Filtro gera beco sem saída | Evitar estado inútil | Ocultar até haver produtos | Alto | Baixo | Baixo | Remover temporariamente |
| Mapa estático | Não orienta | Utilidade local | Embed leve ou imagem clicável real | Alto | Baixo | Baixo | Substituir |
| Paleta/tokens | Coerente e reutilizável | Consistência | Preservar e documentar | Alto | Baixo | Baixo | Manter |
| Bottom nav | Boa zona do polegar | Mobile first | Corrigir hash/estado ativo | Alto | Baixo | Baixo | Melhorar |
| Slideshow | Movimento sem acervo forte | Motion com propósito | Manter só após fotos reais | Médio | Baixo | Médio | Experimentar |
| SEO mínimo | Sem description/OG/schema | Descoberta local | Metadados e JSON-LD | Alto | Médio | Baixo | Melhorar |
| Links `#` | Controles falsos | Honestidade da interface | Implementar ou remover | Médio | Baixo | Baixo | Remover |

---

## 27. Backlog P0/P1/P2/P3

### P0 — Crítico

- corrigir rewrite/deep links;
- inserir URL específica do iFood;
- substituir/remover preços fictícios e antigos inconsistentes;
- publicar endereço, telefone e horário corretos;
- retirar imagens alheias ou semanticamente falsas;
- remover links falsos.

### P1 — Alto impacto

- produzir e integrar fotografia real responsiva;
- homepage com seleção curada do menu;
- completar produtos/categorias reais;
- mapa e rota reais;
- SEO local, OG e schema;
- melhorar navegação de hash;
- definir analytics de conversão;
- reorganizar repositório e arquivar exportações legadas.

### P2 — Refinamento

- estados de foco/hover/active completos;
- skip link, foco do menu e anúncio de filtros;
- imagens AVIF/WebP e `srcset`;
- tipografia fluida;
- revisão completa da voz de marca;
- footer real e ano dinâmico;
- testes unitários/E2E básicos;
- README atual.

### P3 — Experimental

- textura de carimbo/papel;
- display type mais vernacular;
- microanimação de selos;
- crossfade com fotos reais;
- teste A/B de hero produto versus ambiente;
- status de aberto agora baseado em horário confiável.

---

## 28. Roadmap técnico

### Etapa 0 — Congelamento de verdade comercial

- **Objetivo:** obter dados oficiais.
- **Componentes:** `contact.js`, `menu.js`, conteúdo.
- **Dependências:** cliente fornecer iFood, endereço, horário, telefone, produtos, preços e autorização de fotos.
- **Aceite:** planilha/fonte aprovada; nenhum placeholder.
- **Rollback:** manter branch atual; não publicar dados parciais.

### Etapa 1 — Recuperação operacional P0

- **Arquivos prováveis:** `vercel.json`, `contact.js`, `App.jsx`, footer.
- **Alterações:** rewrite SPA, URL iFood, remover links falsos e preços enganosos.
- **Testes:** acesso direto às 3 rotas; reload; links externos.
- **Aceite:** HTTP 200 e conteúdo correto em cada rota.
- **Rollback:** reverter commit isolado.

### Etapa 2 — Conteúdo e fotografia autênticos

- **Arquivos:** `src/assets/images`, `menu.js`, componentes Home/Menu.
- **Alterações:** matriz de assets, variantes responsivas, alt real.
- **Testes:** visual 360/390/768/1280/1440; ausência de distorção.
- **Aceite:** zero imagem alheia, ilegível ou desconectada.
- **Rollback:** manter pacote anterior versionado fora do bundle.

### Etapa 3 — Arquitetura da homepage

- **Arquivos:** `Home.jsx`, nova seção de destaques, componentes existentes.
- **Alterações:** remover menu integral da home, incluir utilidade local e seleção curada.
- **Testes:** navegação por teclado, hash, mobile thumb zones.
- **Aceite:** menu completo em um toque e pedido em até dois.
- **Rollback:** feature flag/componente antigo recuperável.

### Etapa 4 — Cardápio verdadeiro

- **Arquivos:** `Menu.jsx`, `menu.js`, cards/filtros.
- **Alterações:** categorias reais, preço, descrição, badges verificáveis.
- **Testes:** filtros, estado vazio impossível, leitura de tela.
- **Aceite:** 100% dos itens aprovados pelo cliente.
- **Rollback:** restaurar dataset anterior sem misturar versões.

### Etapa 5 — Localização e confiança

- **Arquivos:** `Location.jsx`, `ContactCard`, `MapEmbed`.
- **Alterações:** mapa real/clicável, NAP, horário e prova social verificada.
- **Testes:** Maps em Android/iOS/desktop; telefone/WhatsApp.
- **Aceite:** cliente chega ao destino com um toque.
- **Rollback:** link Maps simples.

### Etapa 6 — SEO, social e acessibilidade

- **Arquivos:** `index.html`, head por rota ou estratégia de pré-render, `robots.txt`, sitemap, schema.
- **Testes:** Rich Results, Lighthouse, axe, teclado, NVDA.
- **Aceite:** sem erro crítico; metadados distintos; sitemap acessível.
- **Rollback:** remover schema defeituoso sem afetar interface.

### Etapa 7 — Performance e observabilidade

- **Alterações:** imagem responsiva, preload LCP, subset de ícones/fontes, analytics.
- **Testes:** Lighthouse mobile, WebPageTest, bundle report, tráfego real.
- **Aceite:** metas CWV ou plano baseado em evidência de campo.
- **Rollback:** cada otimização em commit isolado.

### Etapa 8 — Refinamento e experimentos

- **Alterações:** textura, display, motion, testes A/B.
- **Dependência:** P0/P1 concluídos e baseline medido.
- **Aceite:** experimento melhora métrica definida sem regressão de CWV/WCAG.
- **Rollback:** flag ou remoção do módulo experimental.

---

## 29. Critérios de aceite globais

- `/`, `/cardapio` e `/localizacao` retornam 200 em acesso direto e reload.
- todos os CTAs de pedido abrem a loja correta.
- nenhum preço, horário, endereço, avaliação ou promoção é inventado.
- nenhuma categoria pública fica vazia.
- todas as imagens representam realmente o texto associado.
- navegação completa por teclado e foco visível.
- layout funcional de 320 px a 1440+ px.
- sem links `#` falsos.
- metadados e JSON-LD validados.
- sem erro crítico em axe/Lighthouse.
- LCP/INP/CLS medidos e acompanhados; meta 2,5 s/200 ms/0,1 no p75.
- decisões experimentais reversíveis.

---

## 30. Riscos e hipóteses a testar

| Hipótese/risco | Como validar |
|---|---|
| O público quer cardápio completo na home | Analytics + teste com destaques versus catálogo |
| iFood é o único canal ideal | Confirmar operação e custo; medir WhatsApp e iFood |
| “Fartura” é diferencial reconhecido | Entrevistas rápidas e análise de avaliações reais |
| Fotos de ambiente convertem | Teste hero produto versus ambiente |
| Preço no site permanece atualizado | Definir responsável e rotina mensal |
| Slideshow ajuda percepção | Medir interação e LCP; remover se indiferente |
| Texto vernacular agrada sem reduzir clareza | Teste com clientes locais |
| Google Business Profile está correto | Auditoria com proprietário e busca local |

Maior risco de projeto: sofisticar a interface antes de garantir um processo de atualização de preço, horário e imagens. Um site bonito com dado vencido vira mentiroso em alta resolução.

---

## 31. Conclusão e direção recomendada

O Turquia Lanches já possui uma fundação visual aproveitável. A próxima evolução não deve trocar React por outro framework nem importar mais uma tendência. Deve trocar simulação por autenticidade.

Manter a stack, a paleta, a componentização e a prioridade mobile. Corrigir imediatamente rotas, iFood e dados locais. Substituir todo asset que não pertença ao negócio. Transformar a homepage em narrativa curta com quatro a seis produtos reais, preço e prova; deixar o cardápio completo em rota própria; usar localização e horário como elementos de conversão; completar SEO local e acessibilidade. Só depois acrescentar textura e motion.

A referência mais útil não é um único site. É a combinação de:

- síntese conceitual de The One;
- clareza comercial do Bullguer;
- voz humana do Patties;
- prova de produto do Honest Burgers;
- diferenciação cultural do MOS Burger;
- disciplina de performance e acessibilidade das normas web.

Direção final: **uma lanchonete de Maricá com fartura, calor e identidade própria — rápida para quem quer pedir, convincente para quem quer conhecer e verdadeira em cada foto e informação.**

---

## Apêndice — Evidências técnicas do repositório

- [Repositório no GitHub](https://github.com/lnpott/Turquia-Marica)
- [App e rotas](https://github.com/lnpott/Turquia-Marica/blob/main/src/App.jsx)
- [Dados de contato/iFood](https://github.com/lnpott/Turquia-Marica/blob/main/src/data/contact.js)
- [Dados do cardápio](https://github.com/lnpott/Turquia-Marica/blob/main/src/data/menu.js)
- [Homepage](https://github.com/lnpott/Turquia-Marica/blob/main/src/pages/Home.jsx)
- [Cardápio](https://github.com/lnpott/Turquia-Marica/blob/main/src/pages/Menu.jsx)
- [Localização](https://github.com/lnpott/Turquia-Marica/blob/main/src/pages/Location.jsx)
- [Design tokens](https://github.com/lnpott/Turquia-Marica/blob/main/tailwind.config.cjs)
- [Metadados atuais](https://github.com/lnpott/Turquia-Marica/blob/main/index.html)

