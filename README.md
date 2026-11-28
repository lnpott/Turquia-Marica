# Turquia Lanches

Site institucional e plataforma de pedidos da **Turquia Lanches** (Parque Nanci, Maricá/RJ).

**Produção:** https://turquia-marica.vercel.app/  
**Repo:** https://github.com/lnpott/Turquia-Marica  
**Vercel:** `turquia-marica` · **Supabase:** `turquia-lanches` (`sxpsewnfgpkppqivzvcc`)

## Documentação (só o que importa)

| Arquivo | Uso |
|---|---|
| [GUIA.md](GUIA.md) | Estado real do código e infra |
| [ROADMAP.md](ROADMAP.md) | Fases e critérios de aceite |
| [AGENTS.md](AGENTS.md) | Regras para agentes |
| [documentacao/REGISTRO-OPERACIONAL.md](documentacao/REGISTRO-OPERACIONAL.md) | **O que foi / não foi** (atualizar a cada sessão) |
| [documentacao/APPLY-RPC-SUPABASE.md](documentacao/APPLY-RPC-SUPABASE.md) | SQL para aplicar no Supabase de produção |
| [documentacao/PROXIMOS-PASSOS.md](documentacao/PROXIMOS-PASSOS.md) | Sequência operacional |
| [documentacao/CHECKLIST-LANCAMENTO.md](documentacao/CHECKLIST-LANCAMENTO.md) | Checklist de lançamento |
| [documentacao/OPERACAO-ADMIN.md](documentacao/OPERACAO-ADMIN.md) | Uso do `/admin` |
| [documentacao/DECISOES-PENDENTES.md](documentacao/DECISOES-PENDENTES.md) | Decisões comerciais D1–D10 |
| [documentacao/ASSETS.md](documentacao/ASSETS.md) | Notas de assets |

`documentacao/historico/` **não** é fonte de verdade (exports e migração antigos).

## Estado verificado (28/11/2026)

| Item | Status |
|---|---|
| `main` | SHA `ba653d62` (#52 orders/grants no código) |
| Produção Vercel | READY em `main` / #52 |
| `POST /api/orders` em produção | **HTTP 500 `RPC_FAILED`** — RPC/grants **não** confirmados no Supabase remoto |
| `ADMIN_TOKEN` na Vercel | **Criado** (3 ambientes) |
| Reviews GET | Na branch `chore/ops-desbloqueio-proxima-fase` (ainda não em `main`) |
| Preços/fotos oficiais | **Não** (seed R$ 29,90) |

Detalhe: `documentacao/REGISTRO-OPERACIONAL.md`.

## Princípios

1. Supabase obrigatório para catálogo, preços e pedidos.
2. WhatsApp não é banco nem prova de aceite/pagamento.
3. Pedido só existe depois de persistido.
4. Frontend nunca é autoridade de preço.
5. Segredos de servidor nunca no Git nem com prefixo `VITE_`.

## Comandos

```bash
npm install && npm run check && npm run test:e2e
```
