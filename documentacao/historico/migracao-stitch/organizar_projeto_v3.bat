@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo   Turquia Lanches - Organizador v3.0
echo   Preparacao para GitHub ^& Vercel
echo ==========================================
echo.

:: 1. Criar estrutura de pastas profissional
echo [+] Criando estrutura de pastas...
if not exist "src" mkdir "src"
if not exist "src\styles" mkdir "src\styles"
if not exist "public" mkdir "public"
if not exist "public\images" mkdir "public\images"
if not exist "documentacao" mkdir "documentacao"
if not exist "documentacao\design" mkdir "documentacao\design"

:: 2. Renomear e Mover Telas de Producao (Set Final Auditado)
echo [+] Organizando arquivos HTML finais...

:: Homepage (Final Audit)
if exist "index.html (Homepage Production) - Final Audit.html" (
    move "index.html (Homepage Production) - Final Audit.html" "index.html"
) else if exist "index.html (Homepage Production) - Final Audit" (
    move "index.html (Homepage Production) - Final Audit" "index.html"
)

:: Cardapio
if exist "Turquia_Lanches_-_Cardapio_(Production).html" (
    move "Turquia_Lanches_-_Cardapio_(Production).html" "cardapio.html"
) else if exist "Turquia_Lanches_-_Cardapio_(Production)" (
    move "Turquia_Lanches_-_Cardapio_(Production)" "cardapio.html"
)

:: Sacola
if exist "Turquia_Lanches_-_Sacola_(Production).html" (
    move "Turquia_Lanches_-_Sacola_(Production).html" "sacola.html"
) else if exist "Turquia_Lanches_-_Sacola_(Production)" (
    move "Turquia_Lanches_-_Sacola_(Production)" "sacola.html"
)

:: Checkout
if exist "Turquia_Lanches_-_Checkout_(Production).html" (
    move "Turquia_Lanches_-_Checkout_(Production).html" "checkout.html"
) else if exist "Turquia_Lanches_-_Checkout_(Production)" (
    move "Turquia_Lanches_-_Checkout_(Production)" "checkout.html"
)

:: Localizacao
if exist "Turquia_Lanches_-_Localizacao_(Production).html" (
    move "Turquia_Lanches_-_Localizacao_(Production).html" "localizacao.html"
) else if exist "Turquia_Lanches_-_Localizacao_(Production)" (
    move "Turquia_Lanches_-_Localizacao_(Production)" "localizacao.html"
)

:: Confirmacao
if exist "Turquia_Lanches_-_Confirmacao_(Production).html" (
    move "Turquia_Lanches_-_Confirmacao_(Production).html" "confirmacao.html"
) else if exist "Turquia_Lanches_-_Confirmacao_(Production)" (
    move "Turquia_Lanches_-_Confirmacao_(Production)" "confirmacao.html"
)

:: 3. Organizar Documentacao e Design
echo [+] Movendo documentacao para /documentacao/design...
if exist "design.md" move "design.md" "documentacao\design\"
if exist "screen.png" move "screen.png" "documentacao\design\"
if exist "instrucoes_organizacao.md" move "instrucoes_organizacao.md" "documentacao\"

:: 4. Arquivos de Configuracao e Estilos
echo [+] Organizando configuracoes e estilos...

if exist "src_styles_main.css" move "src_styles_main.css" "src\styles\main.css"
if exist "main.css" move "main.css" "src\styles\main.css"
if exist "tailwind.config.js_turquia_lanches.txt" move "tailwind.config.js_turquia_lanches.txt" "tailwind.config.js"
if exist "package.json_turquia_lanches.json" move "package.json_turquia_lanches.json" "package.json"
if exist "README.md" (
    echo [!] README.md ja esta na raiz.
) else if exist "readme.md_guia_de_deploy.md" (
    move "readme.md_guia_de_deploy.md" "README.md"
)

:: 5. Mover imagens para a pasta correta
echo [+] Movendo imagens para /public/images...
move *.jpg "public\images\" 2>nul
move *.png "public\images\" 2>nul
move *.jpeg "public\images\" 2>nul

echo.
echo ==========================================
echo   PROJETO ORGANIZADO COM SUCESSO! (v3.0)
echo ==========================================
echo Sua estrutura 'turquia-marica' esta pronta.
echo.
echo Proximos passos:
echo 1. git init
echo 2. git add .
echo 3. git commit -m "feat: producao consolidada v3.0"
echo 4. git push origin main
echo.
pause