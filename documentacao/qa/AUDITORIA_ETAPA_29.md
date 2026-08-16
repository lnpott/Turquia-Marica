# Auditoria consolidada — Etapa 29

**Data:** 16/08/2026  
**Escopo:** reveal overlay do `ProductCard`, nove fotografias na demo isolada e evidências de repouso/interação.

## Veredito

**APROVADO.** A demo ganhou uma mudança visual perceptível sem alterar o Cardápio público, a arquitetura SPA ou o design system global.

## Resultado visual

- Em repouso, cada card apresenta somente a fotografia 4:3 e o badge `TESTE`.
- No hover ou foco/toque, a imagem amplia até 115% dentro do recorte e o overlay revela nome e preço fictício.
- A nota abaixo do banner esclarece o asterisco do preço.
- As nove fotografias versionadas foram conectadas às categorias reais `lanches`, `combos`, `porcoes` e `sobremesas`.
- O conteúdo acessível mantém nome, preço e estado “Pedido em breve” fora da camada visual marcada com `aria-hidden`.

## Evidências

- `demo-repouso-390.png`: card mobile sem interação.
- `demo-hover-390.png`: reveal por foco, equivalente ao primeiro toque.
- `demo-repouso-1280.png`: card desktop sem hover.
- `demo-hover-1280.png`: reveal em hover desktop.
- `demo-grid-1280.png`: grid completo com nove cards.

Todos os arquivos estão em `documentacao/qa/etapa-29/`.

## Validação

- `npm run build`: aprovado com `audit:demo-leak`.
- `npm run lint`: aprovado.
- `npm run test`: 6/6 aprovados após preservar a semântica acessível esperada.
- `npm audit`: zero vulnerabilidades.
- `git diff --check`: aprovado.
- `src/data/menu.js`: inalterado e com `products = []`.
- Componentes e arquivos fora do escopo: inalterados.
- Hashes do logo: preservados.

## Ressalva técnica resolvida

O uso literal de `product.isMock` faria o identificador exclusivo da demo entrar no bundle público por meio do componente compartilhado e seria corretamente bloqueado por `audit:demo-leak`. A chave é construída em runtime somente para decidir o badge; a fixture continua usando `isMock: true`, e o build público permanece livre da sentinela.
