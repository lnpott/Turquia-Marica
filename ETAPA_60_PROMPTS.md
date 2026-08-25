# Etapa 60 — Prompts de Execução

> Prompts prontos para execução da Etapa 60 (substituição cirúrgica do slide 4 do carrossel Hero).
> O plano completo, diagnóstico e critérios de aceite estão em `BEST_PLAN.MD`.
> **Não execute mais de um agente simultaneamente nesta etapa.**
> **Estado:** executado e validado em 25/08/2026. Os prompts abaixo permanecem somente como registro; não reexecutar.

---

## SEÇÃO: DEEPSEEK

Se você é o DeepSeek, siga exclusivamente as instruções abaixo.

```
Você é um agente de implementação. Altere SOMENTE o arquivo abaixo. Não execute build,
testes, git ou qualquer outro comando. Não altere nenhum outro arquivo do projeto.

ARQUIVO: src/components/home/HeroSection.jsx

PASSO 1 — Substituir o import.
Localize esta linha exata:
  import encontrosImage from '../../assets/media/pictures/turquia-prato-vinho-01.jpg'
Substitua por:
  import petiscosImage from '../../assets/media/pictures/turquia-tabua-petiscos-chopp-01.jpg'

PASSO 2 — Substituir o objeto no array SLIDES.
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

PASSO 3 — Verificação final.
Confirme que nenhuma outra linha do arquivo foi alterada.
Reporte exatamente quais linhas foram modificadas (número de linha antes e depois).
```

---

## SEÇÃO: CODEX

Se você é o Codex, siga exclusivamente as instruções abaixo.

```
Task: surgical edit to a single React component file.

Repository: local React/Vite project.
Target file: src/components/home/HeroSection.jsx
Constraint: modify ONLY this file. Do not run any commands (no build, no tests, no git).

Step 1 — Replace import.
Find:
  import encontrosImage from '../../assets/media/pictures/turquia-prato-vinho-01.jpg'
Replace with:
  import petiscosImage from '../../assets/media/pictures/turquia-tabua-petiscos-chopp-01.jpg'

Step 2 — Replace slide object inside the SLIDES array.
Find the object containing src: encontrosImage and replace it entirely with:
  {
    type: 'image',
    src: petiscosImage,
    alt: 'Tábua de petiscos e chopp gelado na Turquia Lanches',
    headline: 'Petisco, chopp e boa companhia',
    subheadline: 'A mesa certa para dividir o melhor da casa.',
    objectPosition: 'center 45%',
    duration: 5000,
  },

Step 3 — Verify.
Confirm no other lines were changed.
Report the exact line numbers modified.
```

---

## SEÇÃO: VALIDAÇÃO PÓS-EXECUÇÃO

Independente do agente usado, executar na ordem:

```bash
npm run check        # lint + 24 testes unitários + build + audit:demo-leak
npm run test:e2e     # deve manter 38/38 Playwright desktop/mobile
git diff --check
```

Inspecionar visualmente o slide 4 em **390 px** e **1280 px** antes de commitar.
Se `objectPosition: 'center 45%'` não enquadrar bem o sujeito, ajustar para `center 35%` ou `center 55%` conforme inspeção — não requer novo ciclo de aprovação.
