# Addendum de regras de agentes — Turquia Lanches

> Este arquivo é um complemento para o `AGENTS.md` existente.
> Não substituir o conteúdo global de `AGENTS.md` por este addendum.
> Na aplicação do pacote, substituir a seção específica “Perfil especial — Turquia Lanches” do `AGENTS.md` por estas regras, preservando todas as demais seções globais.

## Perfil especial — Turquia Lanches

- Tratar `main` como base de referência quando a tarefa assim determinar; criar branch nova a partir do `main` atualizado.
- Ler `AGENTS.md`, `GUIA.md`, `ROADMAP.md` e o plano técnico antes de alterar o projeto.
- `GUIA.md` descreve o estado implementado; `ROADMAP.md` descreve o futuro. Não apresentar plano como funcionalidade existente.
- Supabase é obrigatório para catálogo, preços e pedidos.
- Todo pedido finalizado deve ser persistido no Supabase antes de exibir confirmação ou oferecer WhatsApp.
- WhatsApp é canal complementar; não é banco, confirmação de envio, aceite da loja ou pagamento.
- O navegador não é autoridade de preço, taxa ou total.
- O backend deve validar catálogo atual, disponibilidade, opcionais e valores.
- Pedido, itens e opcionais devem ser persistidos atomicamente, com snapshots de nome/preço.
- Nunca expor `SUPABASE_SERVICE_ROLE_KEY`, tokens ou segredos em `VITE_*`, bundle, Git, logs ou respostas.
- Ativar e testar RLS em todas as tabelas expostas.
- Visitantes não podem ler ou enumerar pedidos de terceiros.
- Não liberar escrita pública irrestrita em tabelas de pedidos.
- Não inventar preço, produto, adicional, taxa, área de entrega, prazo, modalidade, horário, pagamento, telefone ou política comercial.
- Dados comerciais pendentes estão em `documentacao/DECISOES-PENDENTES.md`.
- Imagens classificadas como ilustrativas em `documentacao/ASSETS.md` não podem ser apresentadas como fotografia real do produto.
- Não criar painel administrativo próprio antes de demonstrar necessidade; o primeiro processo pode usar Supabase Dashboard com acesso restrito.
- Trabalhar em uma fase do `ROADMAP.md` por PR.
- Inspecionar o estado real do Git, código, dependências e testes antes de editar.
- Validar `npm run check`, `npm run test:e2e` e testes específicos da integração.
- Testar RLS com perfil anônimo e privilegiado; testar tentativa de leitura cruzada de pedidos.
- Atualizar `GUIA.md` quando o presente mudar; atualizar `ROADMAP.md` apenas com progresso comprovado.
- Nunca declarar pedido aceito, enviado ou pago por inferência de interface.
- Reportar arquivos, testes, falhas, branch, commit, push e PR somente quando comprovados.
- Ao concluir a fase autorizada, parar.

## Regra de ouro do produto

**Catálogo oficial no Supabase → preço validado no servidor → pedido persistido atomicamente → confirmação verdadeira → WhatsApp opcional.**
