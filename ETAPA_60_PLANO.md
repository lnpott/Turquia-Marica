# Etapa 60 — Refinamento do carrossel Hero: substituição de slide e rebalanceamento narrativo

> **Estado:** PLANEJADO (25/08/2026) — aguardando autorização para execução.
> **Arquivo-alvo:** `src/components/home/HeroSection.jsx` — único arquivo a ser modificado.

---

## 1. Diagnóstico

O carrossel da Etapa 59 funciona corretamente (38/38 testes, build limpo, acessibilidade aprovada). O problema é de **curadoria**, não de código.

**Slides atuais:**

| # | Tipo | Arquivo | Headline |
|---|------|---------|----------|
| 1 | vídeo | `turquia-ambiente-hero.mp4` | "Um lugar para chegar e ficar" |
| 2 | foto | `turquia-hamburguer-artesanal-01.jpg` | "Fartura que reúne" |
| 3 | vídeo | `turquia-espaco-infantil-hero.mp4` | "Diversão para toda a família" |
| 4 | foto | `turquia-prato-vinho-01.jpg` | "Comida, chopp e bons encontros" ← **problema** |
| 5 | foto | `turquia-pizza-calabresa-01.jpg` | "Seu próximo sabor favorito" |

**Por que o slide 4 é o candidato:**
- Única foto com figura humana em cena e taça de vinho como elemento central
- Composição atípica para o perfil do estabelecimento (hamburgueria/petiscos/lanches)
- O vinho não é produto do cardápio confirmado

**Foto substituta disponível no repositório (não usada no carrossel):**
`src/assets/media/pictures/turquia-tabua-petiscos-chopp-01.jpg`

Por que é melhor:
- Representa diretamente o cardápio real (petiscos, tábua, chopp)
- Composição horizontal favorece o crop no desktop
- Mantém o conceito de "compartilhar" sem depender de figura humana central
- Alinhada ao princípio de honestidade radical: produto real, sem elemento fora do cardápio

---

## 2. Decisão de abordagem

**Substituição cirúrgica do slide 4.**

O que muda: apenas o array `SLIDES` dentro de `HeroSection.jsx` — um import e um objeto.

O que NÃO muda:
- Lógica do carrossel
- CSS (`index.css`)
- Demais 4 slides
- Testes estruturais
- Qualquer outro arquivo do projeto

---

## 3. Prompt para Codex / DeepSeek

```
Contexto: projeto React/Vite em src/components/home/HeroSection.jsx.
Altere SOMENTE este arquivo. Não execute build, testes, git ou qualquer outro comando.

PASSO 1 — Substituir o import:

Remova:
  import encontrosImage from '../../assets/media/pictures/turquia-prato-vinho-01.jpg'

Adicione no mesmo lugar:
  import petiscosImage from '../../assets/media/pictures/turquia-tabua-petiscos-chopp-01.jpg'

PASSO 2 — Substituir o objeto no array SLIDES:

Localize o objeto que contém src: encontrosImage e substitua-o integralmente por:

  {
    type: 'image',
    src: petiscosImage,
    alt: 'Tábua de petiscos e chopp gelado na Turquia Lanches',
    headline: 'Petisco, chopp e boa companhia',
    subheadline: 'A mesa certa para dividir o melhor da casa.',
    objectPosition: 'center 45%',
    duration: 5000,
  },

PASSO 3 — Verificação:
Confirme que nenhuma outra linha do arquivo foi alterada.
Reporte exatamente quais linhas foram modificadas.
```

---

## 4. Validação pós-execução

Executar na ordem:

```bash
npm run check          # lint + 24 testes unitários + build + audit:demo-leak
npm run test:e2e       # deve manter 38/38 Playwright desktop/mobile
git diff --check       # sem quebras de linha espúrias
```

Inspecionar visualmente o slide 4 substituído em **390 px** (mobile) e **1280 px** (desktop) antes de commitar.

Se o `objectPosition: 'center 45%'` não enquadrar bem o sujeito principal da foto, ajustar para `center 35%` ou `center 55%` conforme inspeção — isso não requer novo ciclo de aprovação, é ajuste de QA.

---

## 5. Critérios de aceite

- [ ] Import `turquia-prato-vinho-01.jpg` removido
- [ ] Import `turquia-tabua-petiscos-chopp-01.jpg` adicionado com nome `petiscosImage`
- [ ] Slide 4 com `src`, `alt`, `headline`, `subheadline` e `objectPosition` atualizados
- [ ] Slides 1, 2, 3 e 5 inalterados
- [ ] `npm run check` ✓
- [ ] `npm run test:e2e` 38/38 ✓
- [ ] Inspeção visual aprovada em mobile e desktop
- [ ] Commit atômico cobrindo somente `HeroSection.jsx`
- [ ] Entrada da Etapa 60 adicionada ao `BEST_PLAN.MD` após conclusão

---

## 6. O que fazer depois (não é escopo desta etapa)

Quando fotos horizontais profissionais forem fornecidas (pendência 14F do relatório final):
- Avaliar substituição dos vídeos verticais por versões widescreen no Hero desktop
- Não antecipar essa etapa sem o material em mãos
```
