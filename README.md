# Turquia Lanches

Site institucional e catálogo digital da **Turquia Lanches**, em Parque Nanci, Maricá/RJ. O projeto está evoluindo para uma plataforma própria de catálogo, preços e pedidos, com persistência obrigatória no Supabase e WhatsApp como canal complementar de contato.

**Produção:** https://turquia-marica.vercel.app/

## Documentação do projeto

| Arquivo | Responsabilidade |
|---|---|
| [GUIA.md](GUIA.md) | Estado confirmado do código e da infraestrutura atual |
| [ROADMAP.md](ROADMAP.md) | Fases, dependências, bloqueios e critérios de aceite |
| [AGENTS.md](AGENTS.md) | Regras globais para agentes de desenvolvimento |
| [documentacao/PLANO-IMPLANTACAO-CATALOGO-PEDIDOS.md](documentacao/PLANO-IMPLANTACAO-CATALOGO-PEDIDOS.md) | Arquitetura funcional e técnica da plataforma |
| [documentacao/DECISOES-PENDENTES.md](documentacao/DECISOES-PENDENTES.md) | Informações comerciais e operacionais que dependem da loja |
| [documentacao/AGENTS-TURQUIA-ADDENDUM.md](documentacao/AGENTS-TURQUIA-ADDENDUM.md) | Substituição proposta para as regras específicas Turquia no AGENTS existente |

## Estado atual

Auditoria de `main` em `18ab1eb` (22/11/2026). Detalhe em [GUIA.md](GUIA.md).

O site tem Home, vitrine, localização, contato e avaliações. Também tem rotas de sacola (`/sacola`), checkout (`/checkout`), confirmação (`/pedido/confirmado`) e admin (`/admin`), mais `POST /api/orders` no Supabase.

Isso não é catálogo oficial nem lançamento. `src/data/menu.js` ainda entra como fallback (nove itens, `R$ 29,90`, categorias em construção). Imagens de produto seguem provisórias em `documentacao/ASSETS.md`. Fases 2 a 8 do roadmap continuam sem aceite.

## Produto-alvo

- Portfólio institucional completo e atualizado.
- Catálogo ativo administrado com dados persistidos no Supabase.
- Preços oficiais e opcionais controlados no banco.
- Sacola e finalização de pedidos.
- Registro persistente de todos os pedidos no Supabase.
- Recalculo de preços e totais no servidor/banco.
- Após gravar o pedido, oferecer a opção de abrir o WhatsApp com resumo estruturado.
- Nenhuma confirmação de pagamento ou aceitação da loja sem evidência real.

## Princípios

1. Supabase é obrigatório para catálogo, preços e pedidos.
2. WhatsApp é canal de comunicação, não banco de dados nem prova de recebimento.
3. Nenhum pedido é considerado concluído sem persistência confirmada.
4. O frontend nunca é autoridade de preço, taxa ou total.
5. Dados comerciais não confirmados bloqueiam a publicação da funcionalidade correspondente.
6. Segredos de servidor nunca são enviados ao navegador ou versionados.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run check
npm run test:e2e
```

Na primeira execução de E2E, instale o Chromium:

```bash
npx playwright install chromium
```

## Fontes de verdade

- O código e a configuração real determinam o estado implementado.
- `GUIA.md` registra o estado atual verificado.
- `ROADMAP.md` define o futuro aprovado e as fases autorizadas.
- O plano técnico detalha como executar o roadmap.
- `documentacao/DECISOES-PENDENTES.md` lista decisões humanas ainda necessárias.
- Documentos históricos não autorizam reintroduzir funcionalidades ou dados antigos.
