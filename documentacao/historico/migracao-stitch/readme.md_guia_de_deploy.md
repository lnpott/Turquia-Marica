# Turquia Lanches - Guia de Deploy (GitHub & Vercel)

Este projeto foi preparado para ser um site estático de alta performance, utilizando **Tailwind CSS** e **Vite**.

## 🚀 Como subir para o GitHub

1. Crie um novo repositório no seu GitHub (ex: `turquia-lanches`).
2. No seu computador, abra a pasta com os arquivos exportados.
3. Inicialize o repositório e faça o push:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit turquia lanches"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/turquia-lanches.git
   git push -u origin main
   ```

## 🌐 Como hospedar no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub.
2. Clique em **"Add New"** > **"Project"**.
3. Importe o repositório `turquia-lanches`.
4. O Vercel detectará automaticamente as configurações do **Vite**.
5. Clique em **"Deploy"**.

## 📂 Estrutura de Arquivos
- `/public`: Imagens e assets estáticos.
- `/src`: Código fonte (HTML, CSS, JS).
- `tailwind.config.js`: Configurações de cores e fontes do Sabor e Tradição.
- `index.html`: Homepage.

---
*Desenvolvido com Sabor e Tradição.*
