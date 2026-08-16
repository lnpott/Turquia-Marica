# Guia de Organização do Projeto - Turquia Maricá

Este guia explica como utilizar o script automatizado para preparar seu projeto para o GitHub e Vercel.

## 🚀 Como rodar o script

1. **Baixe o ZIP** do projeto no Stitch selecionando todas as telas de produção e arquivos de configuração.
2. **Extraia o conteúdo** na pasta local do seu projeto (ex: `turquia-marica`).
3. **Copie o arquivo** `organizar_projeto.bat` para a raiz desta pasta.
4. **Clique duas vezes** no arquivo `.bat` para executá-lo.
5. O script irá renomear os arquivos, criar as pastas necessárias e organizar tudo automaticamente.

## 📂 Nova Estrutura de Pastas

Após rodar o script, seu projeto terá a seguinte estrutura profissional:

- `/` (Raiz): Arquivos principais (`index.html`, `package.json`, `tailwind.config.js`, `README.md`).
- `/public/images`: Todas as fotos de produtos, ambiente e o logo da marca.
- `/src/styles`: O arquivo `main.css` com as configurações do Tailwind.
- `/documentacao/design`: Arquivos `design.md` e `screen.png` para referência de estilo.

## 📤 Como fazer o Push para o GitHub

Com a estrutura organizada, abra o terminal na pasta do projeto e execute:

```bash
git init
git add .
git commit -m "feat: estrutura de produção organizada para turquia-marica"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
git push -u origin main
```

## 🌐 Deploy no Vercel

1. Acesse o dashboard da Vercel.
2. Importe o novo repositório criado.
3. A Vercel detectará automaticamente as configurações do Vite/Tailwind.
4. Clique em **Deploy**.

---
*Dica: Certifique-se de que o arquivo `index.html` esteja na raiz para que o site carregue corretamente.*