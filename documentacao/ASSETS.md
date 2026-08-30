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
| `src/assets/media/hero/turquia-ambiente-hero.mp4` | 720×1280 | Ambiente da casa | Slides do Hero e seção Sobre | Mídia real; clip otimizado sem áudio |
| `src/assets/media/hero/turquia-ambiente-poster.jpg` | 1280×720 | Poster do ambiente da casa | Fallback do vídeo de ambiente | Mídia real |
| `src/assets/media/hero/turquia-espaco-infantil-hero.mp4` | 720×1280 | Espaço infantil | Slides do Hero e seção Sobre | Mídia real; clip otimizado sem áudio |
| `src/assets/media/hero/turquia-espaco-infantil-poster.jpg` | 1280×720 | Poster do espaço infantil | Fallback do vídeo infantil | Mídia real |
| `src/assets/media/pictures/turquia-hamburguer-artesanal-01.jpg` | 1440×1080 | Tábua com hambúrguer, batatas e porções | Slide do Hero | Mídia real |
| `src/assets/media/pictures/turquia-tabua-petiscos-chopp-01.jpg` | 1440×1080 | Porção de petiscos | Slide do Hero e seção Sobre | Mídia real |
| `src/assets/media/pictures/turquia-pizza-calabresa-01.jpg` | 1350×1080 | Pizza servida na casa | Slide do Hero | Mídia real |
| `src/assets/images/hero/hero-fries.webp` | 410×512 | Batatas em material promocional | Categoria Porções | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/menu/menu-hero.webp` | 512×279 | Hambúrguer em cenário genérico | Categoria Lanches | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/menu/category-combos.webp` | 512×279 | Evento/premiação | Categoria Combos | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/menu/category-sobremesas.webp` | 410×512 | Cena de confeitaria | Categoria Sobremesas | Ilustrativo; JPEG mantido como fallback |
| `src/assets/images/location/pin-map.webp` | 96×96 | Pin da marca | Marcador do mapa vetorial | Marca aprovada |
| `src/assets/map/liberty.json` | — | Estilo e dados do mapa vetorial | Mapa da Localização | Ativo |
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
