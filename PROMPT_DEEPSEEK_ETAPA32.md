# PROMPT — DeepSeek (psique v4) via Freebuff MCP
# Etapa 32 — Endereço, mapa e avaliações reais

> Entregar diretamente em `main`, sem PR. Commit único e atômico por tarefa.
> Atualizar `BEST_PLAN.MD` no mesmo commit.

---

## CONTEXTO OPERACIONAL

Repositório: `lnpott/Turquia-Marica`, branch `main`.
Arquivo de plano vivo: `BEST_PLAN.MD` (raiz do projeto).
Stack: React + Vite + Tailwind, deploy Vercel.
Baseline vigente: commit do PR #17 (`ff61b90`).

Regras ativas que você NÃO pode violar:
- Nenhum dado comercial inventado.
- `src/data/menu.js` público intocado (exceto se o plano autorizar explicitamente).
- Logo (`logo.jpg`, `logo-96.webp`) intocado — MD5 deve ser idêntico antes/depois.
- Nenhuma biblioteca nova instalada.
- `npm run check`, `npm run build`, `npm run lint`, `npm run test`, `npm audit --audit-level=high` e `git diff --check` devem passar ao final.
- Registrar esta etapa no `BEST_PLAN.MD` no mesmo commit.

---

## TAREFA 1 — Endereço e mapa corretos

### 1.1 — Endereço

Localize onde o endereço da loja está declarado no código. Pode estar em:
- `src/data/contact.js`
- `src/data/menu.js`
- `LocationSection.jsx`, `ContactCard.jsx`, `MapEmbed.jsx`, ou qualquer outro componente que exiba texto de endereço.

Substitua o endereço atual pelo endereço oficial:

```
R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160
```

Se o endereço aparecer em mais de um lugar, atualize todos.

### 1.2 — Mapa

Localize o componente de mapa (provavelmente `src/components/location/MapEmbed.jsx` ou similar).

O mapa deve apontar para o endereço oficial acima. Use este embed do Google Maps que resolve diretamente pelo endereço, sem coordenadas hardcodadas:

```html
<iframe
  src="https://maps.google.com/maps?q=R.+Canarinhos%2C+663+-+Parque+Nanci%2C+Maric%C3%A1+-+RJ%2C+24914-160&output=embed"
  width="100%"
  height="350"
  style="border:0;"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Localização Turquia Lanches"
/>
```

Se o componente já usa um src de iframe, troque apenas o valor de `src` pelo acima.
Se usa coordenadas ou Place ID como query, troque pela string de endereço acima.
Se o link de "abrir rota" (botão/CTA de navegação) aponta para uma URL de Maps, atualize-o para:

```
https://www.google.com/maps/search/?api=1&query=R.+Canarinhos%2C+663+-+Parque+Nanci%2C+Maric%C3%A1+-+RJ%2C+24914-160
```

---

## TAREFA 2 — Avaliações reais (substituir fixture fictícia)

### Contexto

A seção de avaliações (`ReviewsSection.jsx` ou similar) atualmente consome `/api/reviews` (Google Places API) e degrada para estado vazio se a API falhar.
O responsável forneceu 3 avaliações reais para substituir temporariamente os dados fictícios, enquanto a integração com a Places API não estiver validada no Vercel.

### O que fazer

Localize onde a `ReviewsSection` define seus dados de fallback ou onde `reviews.js` era importado.

Insira os 3 objetos abaixo como fallback estático (quando `/api/reviews` falhar ou não estiver configurado), OU como dados fixos se a seção não tiver integração real ainda.

**Atenção às notas:** NÃO coloque todos os campos em nota máxima. Use os valores exatos abaixo — já estão distribuídos de forma realista.

```js
const REVIEWS_FALLBACK = [
  {
    id: "review-001",
    source: "google",
    authorName: "Ana Monica Gonçalves",
    badge: "Local Guide · 95 avaliações · 510 fotos",
    rating: 5,
    ratings: { comida: 5, servico: 4, ambiente: 5 },
    text: "Recomendo, bebida gelada e barata, comida muito bem feita. E pra quem é Flamenguista em dia de jogo é tudo de bom — casa cheia e decorada.",
    date: "2026-07-16",
    sourceUrl: null,
    avatarUrl: null,
    isPlaceholder: false,
  },
  {
    id: "review-002",
    source: "google",
    authorName: "Andre Bezerra de Lima",
    badge: "Local Guide · 75 avaliações · 38 fotos",
    rating: 5,
    ratings: { comida: 5, servico: 5, ambiente: 4 },
    text: "Ótima experiência, lugar agitado e ao mesmo tempo familiar, uma variedade grande de produtos — tanto para beber quanto pra comer. As crianças também adoram os lanches. Indico a todos!",
    date: "2026-06-16",
    orderType: "Refeição no local",
    preco: "R$ 40–60",
    pratos: "Sanduíches",
    sourceUrl: null,
    avatarUrl: null,
    isPlaceholder: false,
  },
  {
    id: "review-003",
    source: "google",
    authorName: "Fernanda Leão de Lima",
    badge: "3 avaliações",
    rating: 5,
    ratings: { comida: 5, servico: 5, ambiente: 4 },
    text: "Ambiente familiar, preços justos, excelente comida. Andrielle, atendente nota 1000 — atenta, simpática e pronta para atender a todas as necessidades do cliente. Já ganhou uma fã!",
    date: "2026-06-16",
    orderType: "Refeição no local",
    preco: "+R$ 200",
    sourceUrl: null,
    avatarUrl: null,
    isPlaceholder: false,
  },
];
```

### Como integrar

**Cenário A — `ReviewsSection` já busca `/api/reviews`:**
No bloco de fallback do `fetch` (quando `ok === false` ou `catch`), em vez de retornar array vazio ou estado de erro, use `REVIEWS_FALLBACK` acima.

**Cenário B — `ReviewsSection` ainda usa dados estáticos:**
Substitua os dados estáticos atuais por `REVIEWS_FALLBACK` acima.

**Cenário C — a seção tem um arquivo separado de dados:**
Substitua o conteúdo por `REVIEWS_FALLBACK`, mantendo a mesma forma de exportação.

Em qualquer cenário: adapte os campos ao contrato que o componente `ReviewCard` já espera. Se o contrato tiver campos diferentes, mapeie — mas NÃO altere o layout visual do card.

Se `ReviewCard` exibe `ratings` individuais (comida/serviço/ambiente), conecte os campos `ratings.comida`, `ratings.servico` e `ratings.ambiente` de cada objeto acima.

Se `ReviewCard` exibe apenas `rating` global, use o campo `rating` (todos os três têm valor 5).

O componente deve continuar funcionando com e sem integração da Places API.

---

## SEQUÊNCIA DE EXECUÇÃO

1. Leia os arquivos relevantes antes de editar (não assuma o conteúdo).
2. Tarefa 1 primeiro (endereço + mapa).
3. Tarefa 2 em seguida (avaliações).
4. Rode `npm run check` e `npm run build`. Se houver erro, corrija antes de commitar.
5. Registre a etapa no `BEST_PLAN.MD`:

```md
## Etapa 32 — Endereço oficial, mapa e avaliações reais

- **Estado:** CONCLUÍDO
- **Data:** 16/08/2026
- **Executado por:** DeepSeek (psique v4) via Freebuff MCP, direto em `main`.
- **Tarefa 1:** endereço atualizado para `R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160`; iframe do mapa e link de rota atualizados para o endereço oficial.
- **Tarefa 2:** 3 avaliações reais inseridas como fallback estático em `ReviewsSection` (Ana Monica Gonçalves, Andre Bezerra de Lima, Fernanda Leão de Lima); notas distribuídas de forma realista (não todas no máximo).
- **Validação:** `npm run check`, `npm run build`, `npm run lint`, `npm run test`, `npm audit` e `git diff --check` aprovados.
- **Arquivos modificados:** [listar aqui os arquivos que você tocou]
```

6. Commit com mensagem:
```
feat(etapa-32): endereço oficial, mapa corrigido e avaliações reais
```

7. Push direto em `main`.

---

## O QUE NÃO FAZER

- Não altere `src/data/menu.js` (produtos públicos).
- Não toque em `logo.jpg` ou `logo-96.webp`.
- Não instale nenhuma dependência nova.
- Não altere o layout visual dos componentes — só os dados.
- Não invente horários, telefone, preço de produto ou qualquer dado não fornecido acima.
- Não abra PR — commit direto em `main`.
