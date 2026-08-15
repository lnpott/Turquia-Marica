// DADOS FICTÍCIOS — uso exclusivo em QA visual isolado.
// Nunca importe este arquivo no fluxo público nem trate os valores como dados comerciais reais.
import demoBebidas from '../assets/demo/demo-bebidas.webp'
import demoCombos from '../assets/demo/demo-combos.svg'
import demoLanches from '../assets/demo/demo-lanches.webp'
import demoSobremesas from '../assets/demo/demo-sobremesas.webp'
import demoSemImagem from '../assets/demo/demo-sem-imagem.svg'

const mockProduct = (id, categoryId, name, description, price, image, imageAlt) => ({
  id: `demo-${id}`,
  categoryId,
  name,
  description,
  price,
  image,
  imageAlt,
  imageStatus: 'illustrative',
  isPlaceholder: true,
  isMock: true,
})

export const demoProducts = [
  mockProduct('lanche-curto', 'lanches', 'Mock X', 'Descrição fictícia curta.', 'R$ 0,00', demoLanches, 'Imagem fictícia de lanche para QA visual'),
  mockProduct('lanche-classico', 'lanches', 'Lanche demonstrativo clássico', 'Combinação inteiramente fictícia criada para avaliar duas linhas de descrição no card.', 'R$ 00,90', demoLanches, 'Imagem fictícia de lanche para QA visual'),
  mockProduct('lanche-longo', 'lanches', 'Lanche demonstrativo com um nome propositalmente muito longo', 'Texto fictício extenso para testar equilíbrio vertical, quebra de linha e alinhamento do preço e da ação quando o conteúdo ocupa três ou mais linhas dentro do componente.', 'R$ 000,00', demoLanches, 'Imagem fictícia de lanche para QA visual'),
  mockProduct('lanche-sem-imagem', 'lanches', 'Lanche mock sem fotografia', 'Caso-limite reservado para validar o tratamento visual da ausência de imagem.', 'Preço mock', demoSemImagem, 'Placeholder fictício que representa produto sem fotografia'),

  mockProduct('combo-individual', 'combos', 'Combo mock individual', 'Descrição fictícia de uma linha.', 'R$ 0,50', demoCombos, 'Imagem fictícia de combo para QA visual'),
  mockProduct('combo-duplo', 'combos', 'Combo demonstrativo para duas pessoas', 'Conteúdo fictício com nome médio e descrição suficiente para testar o ritmo editorial.', 'R$ 00,00', demoCombos, 'Imagem fictícia de combo para QA visual'),
  mockProduct('combo-familia', 'combos', 'Combo mock de nome extraordinariamente longo para validação', 'Nenhuma composição é real. Este texto existe para forçar múltiplas linhas e comparar a altura dos cards na grade responsiva.', 'R$ 000,90', demoCombos, 'Imagem fictícia de combo para QA visual'),
  mockProduct('combo-sem-imagem', 'combos', 'Combo mock sem imagem', 'Teste deliberado do estado visual sem mídia.', 'Preço mock', demoSemImagem, 'Placeholder fictício que representa produto sem fotografia'),

  mockProduct('bebida-curta', 'bebidas', 'Mock Cola', 'Bebida fictícia.', 'R$ 0,00', demoBebidas, 'Imagem fictícia de bebida para QA visual'),
  mockProduct('bebida-media', 'bebidas', 'Bebida demonstrativa gelada', 'Texto sem valor comercial para testar descrição intermediária.', 'R$ 00,50', demoBebidas, 'Imagem fictícia de bebida para QA visual'),
  mockProduct('bebida-longa', 'bebidas', 'Bebida mock com título longo e variação demonstrativa', 'Descrição deliberadamente longa para observar o comportamento do card em diferentes larguras e garantir alinhamento consistente na grade.', 'R$ 000,00', demoBebidas, 'Imagem fictícia de bebida para QA visual'),
  mockProduct('bebida-sem-imagem', 'bebidas', 'Bebida mock sem imagem', 'Caso fictício sem fotografia.', 'Preço mock', demoSemImagem, 'Placeholder fictício que representa produto sem fotografia'),

  mockProduct('sobremesa-curta', 'sobremesas', 'Mock Doce', 'Sobremesa fictícia.', 'R$ 0,90', demoSobremesas, 'Imagem fictícia de sobremesa para QA visual'),
  mockProduct('sobremesa-media', 'sobremesas', 'Sobremesa demonstrativa da casa', 'Nome e descrição são apenas dados de QA e não representam o cardápio.', 'R$ 00,00', demoSobremesas, 'Imagem fictícia de sobremesa para QA visual'),
  mockProduct('sobremesa-longa', 'sobremesas', 'Sobremesa mock com título propositalmente comprido', 'Texto fictício de três linhas ou mais para validar recorte, respiro, contraste e consistência de altura no último conjunto de cards.', 'R$ 000,50', demoSobremesas, 'Imagem fictícia de sobremesa para QA visual'),
  mockProduct('sobremesa-sem-imagem', 'sobremesas', 'Sobremesa mock sem foto', 'Estado sem imagem usado exclusivamente pela auditoria visual.', 'Preço mock', demoSemImagem, 'Placeholder fictício que representa produto sem fotografia'),
]
