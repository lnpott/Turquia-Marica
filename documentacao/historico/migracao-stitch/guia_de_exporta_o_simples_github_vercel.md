# Guia de Exportação: Turquia Lanches → GitHub & Vercel

Este guia resume os passos necessários para levar o seu projeto do Stitch para um repositório profissional e colocá-lo no ar.

## 1. Exportação no Stitch
1. No menu superior, clique em **Export**.
2. Escolha o formato **ZIP**.
3. Selecione as **6 telas marcadas como (Production)**:
   - Homepage (Production)
   - Cardápio (Production)
   - Sacola (Production)
   - Checkout (Production)
   - Localização (Production)
   - Confirmação (Production)
4. Inclua os documentos técnicos gerados: `tailwind.config.js`, `package.json`, `main.css` e o `README.md`.

## 2. Preparação do Repositório (GitHub)
1. Crie um novo repositório no [GitHub](https://github.com/new).
2. Extraia o arquivo ZIP na sua máquina.
3. No terminal, dentro da pasta do projeto, execute:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit turquia lanches"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
   git push -u origin main
   ```

## 3. Publicação (Vercel)
1. Acesse o dashboard da [Vercel](https://vercel.com/dashboard).
2. Clique em **Add New > Project**.
3. Importe o repositório que você acabou de criar no GitHub.
4. Clique em **Deploy**. O Vercel detectará as configurações do Vite automaticamente.

## 4. Notas Importantes
- **Imagens:** Certifique-se de que as imagens exportadas estejam na pasta `/public/images`.
- **Links:** Os links internos já foram configurados para funcionar com as rotas relativas do projeto.
