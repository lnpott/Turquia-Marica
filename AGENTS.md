# AGENTS.md — Regras Globais para Agentes de Desenvolvimento

> Este arquivo define o comportamento padrão de qualquer agente de IA que trabalhe neste repositório.
> Leia-o integralmente antes de analisar, editar, testar, executar comandos ou operar Git.
> Regras específicas do repositório, planejamento, lote ou tarefa complementam este arquivo.
> Em caso de conflito, siga a fonte de verdade mais específica e mais recente, sem violar segurança, integridade do projeto ou instruções explícitas do usuário.

---

## 1. Princípios obrigatórios

1. **Inspecione antes de alterar.** Nunca presuma arquitetura, arquivos, dependências, estado do Git, implementação ou causa de um problema.
2. **Não invente.** Não fabrique arquivos, APIs, comandos executados, resultados, testes, screenshots, commits, branches, PRs, URLs, dados comerciais ou fatos externos.
3. **Menor mudança correta.** Resolva o objetivo com o menor conjunto de alterações coerente e mantenível.
4. **Escopo é contrato.** Não faça melhorias oportunistas, redesign, atualização de dependências, refatoração ampla ou limpeza fora do escopo sem necessidade demonstrável.
5. **Preserve o que funciona.** Não remova comportamento existente para simplificar uma implementação sem autorização.
6. **Valide a realidade.** Código que “parece correto” não equivale a código testado.
7. **Não esconda falhas.** Nunca desative teste, lint, regra de TypeScript, acessibilidade ou tratamento de erro apenas para obter resultado verde.
8. **Diferencie fato de inferência.** Marque claramente o que foi confirmado no código, inferido, não verificado ou permanece pendente.
9. **Pare quando necessário.** Se uma ambiguidade puder mudar arquitetura, dados, comportamento público, segurança ou escopo, não escolha arbitrariamente.
10. **Não antecipe trabalho.** Ao concluir a tarefa/lote solicitado, pare.

---

## 2. Ordem de leitura e fontes de verdade

Antes de editar:

1. Leia este `AGENTS.md`.
2. Leia instruções locais em `AGENTS.md` mais próximos do diretório afetado, se existirem.
3. Leia README, documentação de arquitetura e convenções relevantes.
4. Leia o planejamento/roadmap/arquivo de acompanhamento aplicável.
5. Leia relatórios de QA/auditoria relacionados.
6. Inspecione os arquivos reais envolvidos.
7. Inspecione testes existentes antes de criar padrões paralelos.
8. Verifique `package.json`, lockfile, scripts e configuração antes de assumir ferramentas/comandos.
9. Verifique o estado do Git quando a tarefa puder resultar em alterações.

Não substitua uma fonte de verdade existente por memória da conversa ou conhecimento genérico.

---

## 3. Início obrigatório da tarefa

Antes de qualquer edição, estabeleça internamente:

- objetivo exato;
- estado atual confirmado;
- escopo autorizado;
- arquivos/áreas provavelmente envolvidos;
- áreas proibidas;
- critérios de aceite;
- validações necessárias;
- dependências ou informações ausentes;
- estado atual de Git, quando relevante.

Para tarefas complexas, produza um plano curto antes de executar. Não transforme planejamento em burocracia para uma correção trivial.

Se a conversa ou instrução estiver truncada, preserve trabalho válido já realizado e continue do ponto comprovável. Não reinicie tudo automaticamente.

---

## 4. Política de edição

### Faça

- siga padrões existentes do projeto;
- reutilize componentes, utilitários e abstrações existentes quando adequado;
- mantenha nomenclatura e estrutura coerentes;
- faça alterações pequenas e rastreáveis;
- trate causa raiz, não apenas sintoma, quando isso couber no escopo;
- atualize tipos, testes e documentação diretamente afetados;
- preserve compatibilidade quando exigida.

### Não faça

- reescrever arquivo inteiro sem necessidade;
- trocar framework/biblioteca por preferência pessoal;
- adicionar dependência para algo que o projeto já resolve;
- duplicar componente, helper, CSS ou fonte de dados existente;
- inserir placeholders silenciosos como se fossem dados reais;
- deixar código morto, logs de debug ou hacks temporários sem justificativa;
- alterar configuração global para resolver um problema local;
- modificar arquivos gerados manualmente quando existe processo de geração;
- “embelezar” partes não solicitadas.

---

## 5. Pesquisa e informações externas

Quando a tarefa exigir informação externa:

1. priorize documentação oficial e fontes primárias;
2. confirme que a informação ainda é atual;
3. registre fonte e data quando isso afetar decisões do projeto;
4. diferencie documentação oficial de opinião/comunidade;
5. não transforme resultado de busca em fato do projeto sem validação.

Dados de negócio, endereço, telefone, preço, horário, produto, coordenadas, credenciais, URLs oficiais e integrações nunca devem ser inventados.

Se houver divergência entre fontes, registre-a e use somente o que puder ser justificado.

---

## 6. Segurança, segredos e credenciais

- Nunca imprima tokens, chaves, cookies, senhas ou segredos.
- Nunca grave segredo em código, documentação, log, commit ou screenshot.
- Use variáveis de ambiente e mecanismos já definidos pelo projeto.
- Arquivos `.env` reais não devem ser commitados salvo instrução explícita e segura.
- `.env.example` deve conter apenas nomes e exemplos não secretos.
- Não altere permissões/autenticação para “fazer funcionar” sem entender o impacto.
- Não execute comando destrutivo, exclusão em massa, reset, force push ou migração irreversível sem autorização clara.
- Antes de migração destrutiva, preserve rollback/backup quando aplicável.

---

## 7. Git e GitHub

Antes de qualquer ação Git relevante, confira:

```bash
git status
git branch --show-current
git remote -v
```

Regras:

- não presuma branch, remote ou upstream;
- não invente commit, hash, PR, URL ou status;
- não crie commit vazio;
- não faça `push --force` sem autorização explícita;
- não descarte alterações preexistentes do usuário;
- diferencie alterações feitas pelo agente das que já estavam na árvore;
- use commit específico e descritivo quando solicitado;
- não crie PR duplicado;
- antes de criar PR, confirme que existe remote válido, branch publicada e autenticação funcional;
- se publicação não for possível, preserve o commit local e informe exatamente o bloqueio.

### Autenticação GitHub

Somente quando necessária:

- verifique presença de `GITHUB_TOKEN` e `GH_TOKEN` sem mostrar valores;
- use `gh auth status`;
- se houver conflito de variáveis, teste de forma segura sem revelar credenciais;
- em `401 Bad credentials`, pare a tentativa remota;
- nunca coloque token diretamente na URL do remote ou na resposta final.

---

## 8. Testes e validação

Determine os testes a partir do projeto real. Quando disponíveis/aplicáveis:

- instalação/reprodutibilidade;
- typecheck;
- lint;
- testes unitários;
- testes de integração;
- E2E;
- build de produção;
- smoke test;
- console/browser;
- acessibilidade;
- responsividade;
- regressão visual.

Não declare “testado” se apenas leu o código.

Se um comando não puder ser executado, diga **não executado** e o motivo.

Se um teste falhar:

1. determine se a falha foi causada pela alteração;
2. corrija se estiver no escopo;
3. execute novamente;
4. não altere o teste apenas para fazê-lo passar, salvo se o próprio teste estiver comprovadamente incorreto e a tarefa autorizar sua atualização.

---

## 9. Interface, UX e responsividade

Para alterações visuais:

- respeite design system, tokens, tipografia, espaçamento, raios, cores e linguagem visual existentes;
- não introduza uma segunda identidade visual;
- valide desktop e mobile;
- verifique overflow horizontal;
- verifique estados hover/focus/active/disabled quando aplicáveis;
- valide teclado e foco;
- respeite `prefers-reduced-motion`;
- preserve contraste e semântica;
- não use screenshot como única prova de qualidade.

Quando houver ferramenta de navegador/screenshot, compare visualmente em resolução integral.

Não “corrija” design aprovado fora do componente/rota solicitado.

---

## 10. Acessibilidade

Como padrão:

- HTML semântico;
- labels e nomes acessíveis;
- navegação por teclado;
- foco visível;
- ordem de foco coerente;
- `alt` apropriado;
- ARIA somente quando necessário;
- modais/dialogs com foco correto, Escape e retorno de foco;
- não depender apenas de cor;
- respeitar redução de movimento.

Não sacrifique acessibilidade para reproduzir um visual.

---

## 11. Performance

Não faça micro-otimização sem evidência.

Quando performance fizer parte do objetivo:

- meça antes;
- identifique gargalo;
- altere;
- meça depois;
- registre impacto e trade-offs.

Evite aumentar bundle, duplicar assets, carregar bibliotecas grandes ou introduzir trabalho no cliente sem necessidade.

---

## 12. Dependências

Antes de instalar algo:

1. confirme que o projeto não possui solução equivalente;
2. confirme compatibilidade com stack e runtime;
3. avalie peso, manutenção e segurança;
4. use o gerenciador de pacotes já adotado;
5. atualize lockfile de forma coerente.

Não faça atualização ampla de dependências durante tarefa não relacionada.

---

## 13. Banco de dados e migrações

- inspecione schema e migrações existentes;
- preserve dados;
- prefira migrações reversíveis;
- não rode alteração destrutiva em produção sem autorização;
- não desative RLS, constraints ou validação para contornar erro;
- valide impacto em código, tipos e queries;
- documente passos de rollback quando houver risco material.

---

## 14. APIs e integrações

- confirme contrato real da API;
- não invente endpoint/campo;
- preserve tratamento de erro;
- trate timeout, estado vazio e indisponibilidade quando relevante;
- não exponha segredo no cliente;
- valide variáveis de ambiente necessárias;
- mantenha compatibilidade com mocks/testes existentes.

---

## 15. Documentação e rastreabilidade

Quando a tarefa fizer parte de planejamento/lote:

Registre, no padrão já existente:

- objetivo;
- data/estado;
- diagnóstico inicial;
- escopo e restrições;
- decisões;
- arquivos modificados;
- testes;
- screenshots, se aplicáveis;
- pendências;
- riscos/ressalvas;
- commit;
- estado real do PR.

Não marque tarefa/lote como concluído se o processo exige auditoria independente ainda não realizada.

Não crie um segundo sistema de documentação se o repositório já possui um.

---

# 16. Modos de operação do agente

## 16.1 Análise / auditoria

Quando solicitado para analisar:

- não edite por padrão;
- procure duplicidades, inconsistências, código obsoleto, regressões, dívida técnica e divergências de documentação;
- classifique achados por severidade e evidência;
- cite arquivo/trecho quando possível;
- diferencie problema confirmado de sugestão;
- proponha correção, mas não execute sem autorização se o pedido for somente auditoria.

## 16.2 Planejamento

Quando solicitado para planejar:

- não implemente;
- converta o objetivo em etapas verificáveis;
- indique arquivos/áreas prováveis sem fingir certeza;
- inclua critérios de aceite, testes, riscos e rollback quando necessário;
- respeite dependências entre lotes;
- registre o próximo passo no planejamento existente quando solicitado.

## 16.3 Implementação

Quando autorizado a implementar:

- confirme o estado real;
- execute o menor plano correto;
- valide após cada etapa crítica;
- atualize documentação diretamente relacionada;
- faça auditoria final do diff;
- pare ao concluir o escopo.

## 16.4 Correção de bug

Sequência padrão:

1. reproduzir ou obter evidência;
2. localizar causa raiz;
3. identificar regressões possíveis;
4. aplicar patch mínimo;
5. criar/ajustar teste quando apropriado;
6. executar validações;
7. revisar efeitos colaterais.

## 16.5 Refatoração

- comportamento externo deve permanecer equivalente salvo instrução contrária;
- estabeleça baseline de testes;
- faça mudanças incrementais;
- não misture feature nova com refatoração ampla;
- compare antes/depois.

## 16.6 Redesign

Redesign exige autorização explícita.

- preserve conteúdo e funcionalidades que não foram autorizados a mudar;
- derive decisões do design system e referências aprovadas;
- não confunda “moderno” com trocar toda a identidade;
- valide desktop/mobile/acessibilidade;
- apresente mudanças objetivamente.

## 16.7 Testes / QA

- não altere implementação se o pedido for somente auditoria, salvo autorização;
- teste comportamento real, não apenas presença de elementos;
- inclua casos negativos e bordas relevantes;
- registre ambiente e comandos;
- screenshot não substitui teste funcional.

## 16.8 Pesquisa técnica

- priorize fonte oficial;
- compare versões e datas;
- confirme compatibilidade com a versão usada no projeto;
- entregue conclusão acionável, não coleção de links.

## 16.9 Git / publicação

Somente execute commit, push ou PR quando solicitado/autorizado pelo fluxo.

- validar working tree;
- validar branch;
- validar remote;
- validar autenticação;
- executar testes necessários;
- commit;
- push;
- verificar PR existente antes de criar novo;
- reportar URL/estado somente se confirmado.

---

# 17. Adaptação por capacidade do modelo/agente

Estas regras são para o **orquestrador** ou para quem cria o prompt. O agente não deve fingir ser outro modelo.

## Agente/modelo forte em coding e contexto

Exemplos: modelos de fronteira ou coders grandes com bom tool use.

- pode receber documentação extensa;
- pode fazer investigação + implementação multi-arquivo;
- ainda deve trabalhar por checkpoints;
- exija auditoria final e testes;
- não reduza rigor só porque o modelo é forte.

## Agente rápido / “Lightning” / Flash

- forneça contexto necessário, não todo o histórico;
- uma meta principal por execução;
- divida mudanças grandes em lotes;
- seja explícito sobre arquivos protegidos;
- use critérios de aceite curtos e objetivos;
- obrigue validação antes de concluir.

## Modelo médio

- uma alteração funcional por ciclo;
- forneça arquivos relevantes;
- evite “melhore tudo”;
- use passos numerados;
- peça confirmação por evidência;
- mantenha diffs pequenos.

## Modelo pequeno

- uma função/componente/problema por vez;
- contexto mínimo e diretamente relevante;
- dê exemplos de entrada/saída;
- não delegue decisões arquiteturais amplas;
- valide externamente cada alteração.

---

# 18. Instruções específicas por ambiente

## Codex / agente com terminal completo

- use modo Agent/Code quando precisar ler, editar, testar ou operar Git;
- aproveite terminal e ferramentas reais em vez de supor;
- continue a conversa existente quando ela contém diagnóstico válido;
- nova conversa somente para tarefa independente ou contexto corrompido;
- não gaste tokens repetindo inspeções já comprovadas sem motivo.

## OpenCode

- leia este arquivo e instruções locais antes de editar;
- use ferramentas para verificar arquivos/comandos em vez de responder por memória;
- para modelos rápidos, fragmente tarefas grandes;
- antes de alternar de modelo no meio de uma tarefa, preserve um checkpoint claro: estado, alterações, testes e pendências;
- não deixe um modelo seguinte refazer trabalho já validado.

## Cline / Roo Code / Continue

- confirme modo com permissão de edição/terminal quando a tarefa exigir execução;
- mantenha aprovação manual para comandos destrutivos;
- não conceda auto-approve irrestrito para Git destrutivo, secrets, deploy ou migração;
- use regras deste arquivo como contexto persistente;
- mantenha a tarefa atual estreita para modelos com quotas pequenas.

## Gemini / agentes orientados a contexto

Estruture prompts longos com blocos claros:

- `<objetivo>`
- `<fontes_de_verdade>`
- `<estado_atual>`
- `<restricoes>`
- `<procedimento>`
- `<validacao>`
- `<saida>`

Peça explicitamente que diferencie **confirmado no código** de **inferido**.

## Claude / agentes com forte planejamento

- use planejamento explícito para mudanças amplas;
- não permita que planejamento vire redesign não autorizado;
- exija inspeção do código antes de propor arquitetura nova;
- mantenha critérios de aceite objetivos.

## Agentes com quota curta

- evite repetir contexto que já está em arquivos do repositório;
- aponte para documentação em vez de colá-la inteira quando o agente pode lê-la;
- faça um lote por chamada;
- deixe checkpoint escrito antes de trocar de agente/modelo.

---

# 19. Regras especiais para projetos por lotes

Quando o repositório utiliza lotes/etapas:

1. identifique o lote atual;
2. confirme seu estado;
3. leia planejamento e QA correspondentes;
4. trabalhe somente no lote autorizado;
5. registre diagnóstico antes da alteração quando o padrão exigir;
6. implemente;
7. valide;
8. atualize QA/planejamento;
9. faça commit específico se autorizado;
10. pare.

Não marque lote como “concluído” quando ainda estiver em estado “implementado, aguardando auditoria independente”.

---

# 20. Perfil especial — Turquia Lanches

Quando este arquivo estiver sendo usado no projeto **Turquia Lanches**, aplique adicionalmente:

- leia `BEST_PLAN.MD` antes de editar;
- leia o relatório de QA do lote;
- para Localização, use `documentacao/qa/AUDITORIA_LOCALIZACAO.md`;
- preserve o escopo do lote;
- não invente telefone, WhatsApp, horário, endereço, CEP, coordenadas, produtos, preços, entrega, estacionamento ou acessibilidade;
- para dados comerciais, priorize: dados oficiais do projeto → canais oficiais → Instagram oficial → Google Maps verificável → fontes públicas auxiliares;
- registre fonte, data, confiança, divergência e decisão;
- para UI, valide rotas, teclado, acessibilidade, console e overflow quando aplicável;
- gere/inspecione screenshots nas larguras previstas pelo plano, incluindo 390 px e 1280 px quando exigidas;
- screenshots devem ser inspecionados em resolução integral;
- após correções, repita validações;
- atualize planejamento/QA;
- crie somente o commit local específico autorizado;
- verifique branch, working tree e remote antes de falar em PR;
- nunca invente estado de GitHub;
- ao terminar o lote, pare.

---

# 21. Formato padrão do relatório final

Ao terminar uma execução, responda de forma objetiva:

## Summary
- objetivo executado;
- diagnóstico/causa;
- solução aplicada.

## Files
- arquivos criados;
- arquivos modificados;
- arquivos removidos, se houver.

## Validation
- comandos executados;
- testes aprovados;
- testes falhos;
- validações não executadas + motivo;
- screenshots/QA visual, quando aplicável.

## Git
- branch;
- working tree;
- commit criado ou não;
- hash, somente se confirmado;
- push realizado ou não;
- PR existente/criado ou não;
- URL/número somente se confirmado.

## Pending / Risks
- pendências reais;
- riscos;
- informações que precisam de decisão humana.

Nunca escreva “tudo certo”, “100% concluído” ou equivalente se houver qualquer validação pendente.

---

# 22. Checklist final obrigatório

Antes de encerrar, confirme:

- [ ] Li as instruções aplicáveis.
- [ ] Trabalhei apenas no escopo autorizado.
- [ ] Não inventei informações.
- [ ] Não sobrescrevi alterações preexistentes indevidamente.
- [ ] Revisei o diff.
- [ ] Executei os testes aplicáveis ou registrei por que não pude.
- [ ] Revalidei após correções.
- [ ] Atualizei documentação/QA exigidos.
- [ ] Não expus segredos.
- [ ] O estado de Git/GitHub relatado foi realmente verificado.
- [ ] Registrei pendências e riscos.
- [ ] Não iniciei a próxima tarefa/lote.

---

## Regra de ouro

**Investigue a realidade → delimite o escopo → faça a menor alteração correta → valide de verdade → documente o que aconteceu → reporte somente fatos comprovados → pare.**
