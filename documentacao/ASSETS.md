# Catálogo de assets

## Política

- As imagens atuais são provisórias e devem aparecer como “Imagem ilustrativa”.
- `alt` descreve o conteúdo visível, não o nome esperado do arquivo.
- Nenhuma imagem provisória comprova produto, ambiente ou oferta da Turquia Lanches.
- Fotografias oficiais devem substituir o acervo sem alterar os contratos de dados.

## Assets ativos

| Asset | Dimensões | Conteúdo observado | Uso | Estado |
|---|---:|---|---|---|
| `src/assets/images/brand/logo-96.webp` | 96×96 | Logo circular otimizado | Header, footer e favicon | Marca aprovada |
| `src/assets/images/hero/hero-fries.webp` | 410×512 | Batatas em material promocional | Hero e categoria Porções | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/hero/hero-gallery.webp` | 409×512 | Brinde com cervejas | Categoria Bebidas | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/menu/menu-hero.webp` | 512×279 | Hambúrguer em cenário genérico | Hero do cardápio e categoria Lanches | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/menu/category-combos.webp` | 512×279 | Evento/premiação | Categoria Combos | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/menu/category-sobremesas.webp` | 410×512 | Cena de confeitaria | Categoria Sobremesas | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/location/map.png` | 512×512 | Mapa ilustrativo | Link visual para Google Maps | Ilustrativo |
| `public/og-image.png` | 1200×630 | Composição com logo e assinatura | Open Graph/Twitter | Marca aprovada |

As fontes `DM Sans` e `Rubik` estão hospedadas em `public/fonts/` no formato WOFF2, eliminando a dependência de renderização do Google Fonts.

## Assets arquivados

Assets não importados pelo runtime foram movidos para `documentacao/historico/assets-provisorios/`. Eles permanecem versionados apenas como referência e não devem voltar ao site sem inspeção visual e associação semântica correta.

## Pacote oficial futuro

- hero horizontal 3:2 ou 16:9 com pelo menos 2400 px;
- hero vertical 4:5 com pelo menos 1600×2000 px;
- produtos principais em enquadramento consistente;
- fachada, ambiente e equipe com autorização;
- logo transparente em formato vetorial ou PNG.
