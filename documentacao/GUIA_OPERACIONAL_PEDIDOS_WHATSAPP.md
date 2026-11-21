# Guia Operacional: Atendimento de Pedidos via WhatsApp — Turquia Lanches

> **Documento Operacional de Apoio ao Balcão e Atendimento**  
> **Canal:** WhatsApp Oficial (+55 21 96469-9374)  
> **Origem dos Pedidos:** Site Oficial Turquia Lanches (`/#pedido`)  
> **Objetivo:** Padronizar o atendimento rápido aos pedidos diretos vindos do site, garantindo excelente experiência ao cliente, confirmação segura de pagamentos e agilidade na entrega.

---

## 1. Como o Pedido Chega no WhatsApp

Quando o cliente clica em **"Enviar Pedido pelo WhatsApp"** no site, uma mensagem estruturada é enviada automaticamente para o número oficial da loja.

### Exemplo de Mensagem Recebida:

```text
🍔 *NOVO PEDIDO — TURQUIA LANCHES*
----------------------------------------
*Cliente:* Carlos Oliveira
*Telefone:* (21) 98765-4321
*Tipo:* 🛵 Entrega (Delivery)
*Endereço:* Rua das Gaivotas, 120, Apto 201
*Bairro:* Parque Nanci
*Ponto de ref.:* Próximo à praça principal
----------------------------------------
📋 *ITENS:*
• 1x Baca Burger (R$ 29,90)
   _Obs: Ponto bem passado, sem picles_
• 1x Porção de Batata (R$ 29,90)
----------------------------------------
*Subtotal:* R$ 59,80
*Taxa de entrega:* A combinar com atendente
*Pagamento:* Pix (chave enviada na confirmação)
----------------------------------------
_Pedido enviado pelo site oficial da Turquia Lanches_
```

---

## 2. Roteiro Passo a Passo para o Atendente (Script de Resposta)

O tempo de resposta no WhatsApp é o fator número 1 para evitar que o cliente desista ou vá para o iFood. A meta é responder em **menos de 3 minutos**.

### Passo 1: Confirmar o Pedido e Informar a Taxa de Entrega
Envie a mensagem de confirmação inicial:

> *"Olá, [Nome do Cliente]! 👋 Muito obrigado pelo seu pedido na Turquia Lanches!*  
> *Já estamos separando seus itens aqui no balcão.*  
>  
> *🛵 Taxa de entrega para o [Bairro]: R$ [X,00]*  
> *💰 Total com entrega: R$ [Subtotal + Taxa]*  
> *⏱️ Previsão de entrega: entre [35 e 50] minutos."*

---

### Passo 2: Cobrança do Pagamento

#### Se o cliente escolheu **Pix**:
Envie a chave Pix oficial imediatamente:
> *"Para agilizar o preparo na chapa, você pode fazer o Pix para a nossa chave:*  
> *📱 Chave Pix: `[INSIRA_AQUI_A_CHAVE_PIX_DA_LOJA]` (Nome: Turquia Lanches)*  
> *Assim que fizer, basta me enviar o comprovante por aqui!"*

#### Se escolheu **Cartão (Débito/Crédito)**:
> *"Perfeito! O motoboy levará a maquininha de cartão no momento da entrega."*

#### Se escolheu **Dinheiro**:
> *"Confirmado! Levaremos o seu troco para [Valor informado pelo cliente]."*

---

### Passo 3: Envio para a Produção
Assim que o pagamento for confirmado (ou a forma de pagamento no ato for validada):
1. Imprima ou anote a comanda para a chapa/cozinha com as observações do cliente.
2. Avise o cliente: *"Pedido já está na chapa! Logo que o motoboy sair para entrega, te aviso por aqui. 🍔🚀"*

---

### Passo 4: Notificação de Despacho
Quando o motoboy sair com a bag:
> *"Seu pedido acabou de sair para entrega com nosso motoboy! Bom apetite e obrigado pela preferência!"*

---

## 3. Gestão das Taxas de Entrega por Bairro (Maricá)

Como o formulário do site deixa a taxa como *"A combinar com o atendente"*, mantenha uma tabela rápida afixada no balcão:

| Bairro de Destino | Estimativa de Taxa Sugerida | Tempo Médio |
|---|---|---|
| **Parque Nanci** (Bairro da Loja) | R$ 3,00 a R$ 5,00 (ou Grátis acima de R$ 60) | 25 a 35 min |
| **Itapeba** | R$ 6,00 a R$ 8,00 | 35 a 45 min |
| **Centro de Maricá** | R$ 7,00 a R$ 9,00 | 35 a 50 min |
| **Araçatiba** | R$ 8,00 a R$ 10,00 | 40 a 50 min |
| **São José do Imbassaí** | R$ 10,00 a R$ 14,00 | 45 a 60 min |
| **Retirada no Balcão** | **R$ 0,00 (Grátis)** | 20 a 30 min |

---

## 4. Estratégia de Migração: Tirando Clientes do iFood

Para cada pedido que ainda sair pelo iFood, coloque uma etiqueta ou flyer na embalagem:

```
┌────────────────────────────────────────────────────────┐
│  🍔 GOSTOU DO LANCHE DA TURQUIA LANCHES?              │
│                                                        │
│  Peça direto pelo nosso site sem taxas extras:         │
│  👉 www.turquialanches.com.br                          │
│                                                        │
│  Use o canal direto e ganhe atendimento mais rápido!   │
│  Ou chame no WhatsApp: (21) 96469-9374                 │
└────────────────────────────────────────────────────────┘
```

---

## 5. Instruções Técnicas para o Dono (Atualização e Publicação)

### 5.1 Como Publicar as Mudanças em Produção (Merge do PR #40)
O código já está validado e o teste de qualidade automatizado passou com sucesso no GitHub Actions:
- Acesse o link do Pull Request: **https://github.com/lnpott/Turquia-Marica/pull/40**
- Clique no botão verde **"Merge pull request"** e confirme com **"Confirm merge"**.
- O deploy em produção é atualizado automaticamente.

### 5.2 Como Alterar Preços e Produtos no Futuro
Quando os preços reais ou novas fotos forem disponibilizados:
- Arquivo de produtos: `src/data/menu.js`.
- As fotos locais ficam armazenadas em `src/assets/images/products/`.
- Basta atualizar o nome, preço ou imagem no arquivo e fazer commit.
