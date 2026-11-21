# GUIA — Turquia Lanches (Maricá)

> **Documento canônico unificado** (atualizado em 21/11/2026 na branch `feat/sem-ifood`).  
> Substitui a necessidade de consultar múltiplos `.md` espalhados para entender o projeto atual.  
> Em caso de divergência: **código + Git da branch de trabalho > este GUIA > BEST_PLAN.MD > demais documentos**.

---

## 1. Identidade e objetivo

**Projeto:** Site institucional + catálogo da **Turquia Lanches**  
**Local:** Parque Nanci · Maricá/RJ  
**Produto digital:** presença de marca, desejo (fotografia/vídeo reais), cardápio e localização.  
**Canal de pedido:** **nenhum no site.** iFood foi removido do sistema (UI, dados, ícones e testes). O site **não é e-commerce**.

O site existe para:

- apresentar a marca com honestidade radical;
- mostrar ambiente e comida reais;
- informar cardápio (quando validado);
- facilitar localização e contato (WhatsApp, Instagram, Maps);

**Fora de escopo** (sem autorização explícita nova):

- reintroduzir iFood ou qualquer marketplace;
- checkout próprio, pagamento, autenticação, backend transacional;
- inventar dados comerciais (preço, horário, produto, telefone, WhatsApp, etc.);
- transformar o site em plataforma de delivery.

---

## 2. Fontes de verdade (ordem de precedência)

1. **Código + estado do Git** da branch `feat/sem-ifood` (ainda não é `main`)
2. **Este `GUIA.md`**
3. **`BEST_PLAN.MD`** — plano operacional vivo (etapas, estados, evidências)
4. **`AGENTS.md`** — regras obrigatórias para qualquer agente de IA
5. **`documentacao/ASSETS.md`** — catálogo de mídia ativa
6. Restante (relatórios de QA, limpeza, histórico) → consulta pontual

Nunca invente dado comercial. Nunca trate documento antigo como estado atual.

---

## 3. Stack atual

| Camada | Tecnologia |
|--------|------------|
| Runtime | React 18 + React Router 7 |
| Build | Vite 8 |
| Estilo | Tailwind CSS 3 + CSS próprio (`src/styles/index.css`) |
| Mapa | MapLibre GL (lazy) |
| Testes | Vitest + Testing Library + Playwright + axe-core |
| Node | 22.x (`engines` + `.nvmrc`) |
| Deploy | Vercel (`turquia-marica.vercel.app`) |
| CI | GitHub Actions `quality.yml` (PR + push em `main`) |

Dependências principais: `lucide-react`, `maplibre-gl`, `react-router-dom`.

---

## 4. Arquitetura atual

### Navegação

- **Home única** (`/`) com seções por âncora (`#cardapio`, `#localizacao`, etc.).
- Rotas legadas `/cardapio` e `/localizacao` redirecionam para as âncoras correspondentes.

### Hero

Carrossel híbrido de **5 slides** em `src/components/home/HeroSection.jsx`:

| # | Tipo | Mídia | Headline |
|---|------|-------|----------|
| 1 | vídeo | `turquia-ambiente-hero.mp4` | Um lugar para chegar e ficar |
| 2 | foto | `turquia-hamburguer-artesanal-01.jpg` | Fartura que reúne |
| 3 | vídeo | `turquia-espaco-infantil-hero.mp4` | Diversão para toda a família |
| 4 | foto | `turquia-tabua-petiscos-chopp-01.jpg` | Petisco e boa companhia |
| 5 | foto | `turquia-pizza-calabresa-01.jpg` | Seu próximo sabor favorito |

- Crossfade nativo, suporte a `prefers-reduced-motion`.
- Vídeos são clips otimizados (sem áudio) derivados de material real.

### Dados comerciais

**Fonte única:** `src/data/contact.js`

Estado vigente (não invente nem “complete”):

- **Localização:** AVAILABLE — `R. Canarinhos, 663 - Parque Nanci, Maricá - RJ, 24914-160`
- **Horários:** AVAILABLE — Terça a domingo · 17h às 00h (Segunda fechado)
- **Telefone:** UNAVAILABLE
- **iFood:** removido. Não existe `channels.ifood`, CTA, ícone nem asset público.
- **WhatsApp:** AVAILABLE — `https://wa.me/5521964699374`
- **Instagram:** AVAILABLE — `@turquialanches`
- **Maps:** AVAILABLE

Cardápio e preços: somente o que estiver validado em `src/data/menu.js`. Mock/demo fica isolado e protegido pelo `audit:demo-leak`.

### Mapa

MapLibre + estilo local (`src/assets/map/liberty.json`), carregamento sob demanda, marcador e contorno do Parque Nanci. Fallback textual e CTA de Maps oficiais existem.

---

## 5. Comandos essenciais

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build          # inclui audit:demo-leak
npm run test:e2e
npm run check          # lint + test + build
```

Primeira execução de E2E local:

```bash
npx playwright install chromium
```

Sempre valide com `npm run check` antes de considerar uma mudança pronta.

---

## 6. CI/CD

- **CI:** GitHub Actions (`Quality`) em todo PR, push para `main` e `workflow_dispatch`.
- **CD:** Vercel publica a partir de `main` → [turquia-marica.vercel.app](https://turquia-marica.vercel.app).
- Segredos (`GOOGLE_PLACE_ID`, `GOOGLE_MAPS_API_KEY`) ficam **somente** no painel do Vercel. Nunca no repositório e nunca com prefixo `VITE_`.
- `VITE_VISUAL_QA_DEMO` permanece desligado em produção.

---

## 7. Decisão vigente — retirada do iFood

Branch de trabalho: **`feat/sem-ifood`**, criada a partir de `main`. `main` continua com o site antigo até o merge.

O que esta etapa faz:

| Superfície | Antes | Agora |
|------------|-------|-------|
| `src/data/contact.js` | `channels.ifood` + `IFOOD_URL` | canal e export removidos |
| Header (mobile e desktop) | botão “Pedir no iFood” | só Instagram e WhatsApp |
| Footer | wordmark iFood | Maps, Instagram, WhatsApp |
| Faixa “Informações rápidas” | card iFood | card WhatsApp |
| `ProductCard` | texto “Pedido via iFood” | só nome e preço |
| Assets | `IconIfood`, `IconIfoodGold`, `ICON_IFOOD.png`, SVG iFood | apagados |
| Testes | contratos que exigiam o link | contratos que exigem ausência de iFood |

O que esta etapa **não** faz:

- não inventa outro marketplace no lugar;
- não reescreve `BEST_PLAN.MD`, `documentacao/qa/` nem `limpeza.MD` (histórico);
- não muda cardápio, preços, Hero, mapa ou horários.

### Próximas melhorias (planejadas, não iniciadas)

Ordem sugerida, uma por PR a partir desta branch:

1. **Fechar a retirada** — `npm run check` + E2E verdes; merge de `feat/sem-ifood` em `main`.
2. **Limpeza de runtime** — lotes ainda abertos em `limpeza.MD` (duplicatas de foto, JPEGs grandes, masters de vídeo só depois de backup).
3. **Cardápio** — revisar nomes e preços já publicados contra a fonte que o responsável entregar. Sem fonte, não alterar `menu.js`.
4. **Performance** — Lighthouse mobile depois do MapLibre; imagens responsivas só onde o ganho for medido.
5. **Telefone e pagamento** — continuam fora até confirmação humana.

### Governança

1. Trabalhar em `feat/sem-ifood` (ou branch filha dela) até o merge.
2. Validar com `npm run check` e, se a UI mudar, `npm run test:e2e`.
3. PR para `main`.
4. Atualizar este `GUIA.md` no mesmo commit quando o estado do produto mudar.

---

## 8. Pendências reais (não inventar)

### Dados comerciais (Lote 14)

| Item | Estado |
|------|--------|
| Telefone oficial | UNAVAILABLE |
| Canal de pedido no site | Removido (sem iFood) |
| Catálogo completo + preços oficiais | Em construção / auditoria |
| Acervo fotográfico profissional completo (especialmente horizontal) | Pendente |
| Formas de pagamento oficiais | Não publicadas (não inventar) |

### Técnico / limpeza

- Plano de limpeza (`limpeza.MD`) — Lote 1 concluído; lotes restantes de otimização de assets e retenção histórica ainda abertos.
- Vídeos masters pesados e alguns JPEGs originais ainda no tree (backup externo antes de remover).
- Medição formal de Lighthouse pós-MapLibre e refinamentos de performance de imagem.

### Governança antiga (lotes em `main`)

O fluxo abaixo vale para lotes novos depois do merge:

1. Branch derivada de `origin/main`
2. Validação local (`check` + E2E quando aplicável)
3. PR para `main`
4. Atualização deste `GUIA.md` quando a mudança alterar o produto

`BEST_PLAN.MD` permanece como registro histórico das etapas anteriores. Não reabrir essas etapas para “tirar iFood do passado”.

---

## 9. Como trabalhar neste repositório

1. Leia este `GUIA.md` e o `AGENTS.md`.
2. Confirme o estado real do Git (`git status`, `HEAD`, `origin/main`).
3. Inspecione o código envolvido antes de propor mudança.
4. Não invente dados comerciais.
5. Faça a menor alteração correta possível.
6. Preserve o que já funciona.
7. Valide de verdade (não só “parece certo”).
8. Atualize documentação diretamente afetada.
9. Pare ao concluir o escopo autorizado.

Para agentes de IA: o `AGENTS.md` é obrigatório.

---

## 10. Documentos que permanecem

| Arquivo | Função atual |
|---------|--------------|
| `GUIA.md` | **Este arquivo** — handoff e visão atual |
| `AGENTS.md` | Regras de agentes |
| `BEST_PLAN.MD` | Plano operacional vivo + histórico de etapas |
| `README.md` | Entrada pública do repositório |
| `documentacao/ASSETS.md` | Catálogo de mídia ativa |
| `documentacao/qa/` | Evidências de auditoria |
| `limpeza.MD` | Plano de limpeza ainda parcialmente ativo |

Todo o resto em `documentacao/historico/` e prompts/snapshots antigos são **histórico**.

---

## 11. Princípio permanente

> **Honestidade radical.**  
> Só publique o que for confirmado.  
> Fotografia e vídeo reais primeiro.  
> Sem canal de pedido no site.  
> Código e Git mandam.

---

*Última atualização: 21/11/2026 — branch `feat/sem-ifood`. iFood retirado do sistema ativo. Plano das próximas melhorias está na seção 7.*
