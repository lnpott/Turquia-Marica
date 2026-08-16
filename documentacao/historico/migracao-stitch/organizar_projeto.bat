web application/stitch/projects/10254386617209499733/screens/e60ca3b8e70c48c0a821767f1bf78bcb
@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo   Turquia Lanches - Organizador de Projeto
echo ==========================================
echo.

:: 1. Criar estrutura de pastas
echo [+] Criando estrutura de pastas...
if not exist "src" mkdir "src"
if not exist "src\styles" mkdir "src\styles"
if not exist "public" mkdir "public"
if not exist "public\images" mkdir "public\images"
if not exist "documentacao" mkdir "documentacao"
if not exist "documentacao\design" mkdir "documentacao\design"

:: 2. Renomear e Mover Telas Principais
echo [+] Organizando arquivos HTML...

:: Homepage (Prioridade para code.html conforme solicitado)
if exist "code.html" (
    move "code.html" "index.html"
) else if exist "index.html (Homepage Production).html" (
    move "index.html (Homepage Production).html" "index.html"
)

:: Cardápio
if exist "Turquia_Lanches_-_Cardapio_(Production).html" (
    move "Turquia_Lanches_-_Cardapio_(Production).html" "cardapio.html"
)

:: Sacola
if exist "Turquia_Lanches_-_Sacola_(Production).html" (
    move "Turquia_Lanches_-_Sacola_(Production).html" "sacola.html"
)

:: Checkout
if exist "Turquia_Lanches_-_Checkout_(Production).html" (
    move "Turquia_Lanches_-_Checkout_(Production).html" "checkout.html"
)

:: Localização
if exist "Turquia_Lanches_-_Localizacao_(Production).html" (
    move "Turquia_Lanches_-_Localizacao_(Production).html" "localizacao.html"
)

:: Confirmação
if exist "Turquia_Lanches_-_Confirmacao_(Production).html" (
    move "Turquia_Lanches_-_Confirmacao_(Production).html" "confirmacao.html"
)

:: 3. Organizar Documentação e Design
echo [+] Movendo arquivos de design para /documentacao/design...
if exist "design.md" move "design.md" "documentacao\design\"
if exist "screen.png" move "screen.png" "documentacao\design\"

:: 4. Organizar Arquivos de Configuração e Estilos
echo [+] Organizando configurações e estilos...

if exist "src_styles_main.css" move "src_styles_main.css" "src\styles\main.css"
if exist "tailwind.config.js_turquia_lanches.txt" move "tailwind.config.js_turquia_lanches.txt" "tailwind.config.js"
if exist "package.json_turquia_lanches.json" move "package.json_turquia_lanches.json" "package.json"
if exist "readme.md_guia_de_deploy.md" move "readme.md_guia_de_deploy.md" "README.md"

:: 5. Mover imagens para a pasta correta
echo [+] Movendo imagens para /public/images...
move *.jpg "public\images\" 2>nul
move *.png "public\images\" 2>nul

echo.
echo ==========================================
echo   PROJETO ORGANIZADO COM SUCESSO!
echo ==========================================
echo Estrutura 'turquia-marica' pronta para Vercel/GitHub.
echo.
pause