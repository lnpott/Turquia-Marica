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
| Experimentos | Analytics, avaliações, “aberto agora”, A/B e redesign ficam fora do escopo. |

## Etapas

| Etapa | Estado | Resultado esperado |
|---|---|---|
| 0. Documentação e governança | CONCLUÍDO | Plano vivo, roadmap vinculado e branch oficial registrada. |
| 1. Guardrails técnicos | EM EXECUÇÃO | Ferramentas e CI implementados; auditoria final pendente. |
| 2. Recuperação operacional | EM EXECUÇÃO | Rotas e dados honestos implementados; auditoria final pendente. |
| 3. Conteúdo e fotografias | EM EXECUÇÃO | Acervo provisório identificado e sinalizado; auditoria final pendente. |
| 4. Home e cardápio | EM EXECUÇÃO | Interface incremental implementada; auditoria final pendente. |
| 5. Localização e acessibilidade | EM EXECUÇÃO | Melhorias implementadas; auditoria final pendente. |
| 6. SEO estático | EM EXECUÇÃO | Metadados e arquivos de descoberta implementados; auditoria final pendente. |
| 7. Performance | EM EXECUÇÃO | Fontes locais, WebP e preload implementados; auditoria final pendente. |
| 8. Limpeza e conclusão | EM EXECUÇÃO | Arquivos organizados; validação e encerramento pendentes. |

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

- **Estado:** EM EXECUÇÃO — auditoria obrigatória após reinicialização.
- **Escopo implementado:** guardrails de qualidade, HTML estático para as três rotas, dados comerciais com status, canais inválidos desativados, conteúdo provisório sinalizado, Home e Cardápio sem ofertas inventadas, localização funcional, melhorias de teclado e foco, SEO por rota, limpeza de exports históricos e otimizações de imagens e fontes.
- **Performance implementada:** fontes locais WOFF2, imagens ativas em WebP com fallback JPEG, preload dos heróis e logo reduzido para 96×96.
- **Última evidência disponível antes do checkpoint:** `npm run check` aprovado, com ESLint, 3 testes unitários e build Vite; Lighthouse móvel do Cardápio com Performance 96, Acessibilidade 100, Boas Práticas 100, SEO 100, LCP 2,5 s, CLS 0 e TBT 30 ms.
- **Situação do aceite:** não validado neste commit. A execução final foi interrompida para reinicialização do computador por solicitação do usuário.
- **Próximo passo obrigatório:** auditar o diff completo e executar novamente `npm run check`, `npm run test:e2e`, `npm audit`, `git diff --check`, verificação HTTP/reload e inspeção visual antes de alterar qualquer etapa para `VALIDADO` ou `CONCLUÍDO`.
- **Limite:** nenhuma nova fase ou melhoria funcional deve começar antes dessa auditoria.
- **Rollback:** reverter o commit deste checkpoint na branch `BEST_ONE`.

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
