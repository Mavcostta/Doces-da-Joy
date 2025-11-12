# Doces da Joy — Website Completo

Site profissional para loja de doces artesanais com funcionalidades avançadas de e-commerce.

## ✨ Funcionalidades Implementadas

### 🎨 Visual & UX

- ✅ **Animações suaves** — elementos aparecem conforme você scrolla (fade-in, slide-up)
- ✅ **Ícones Font Awesome** — WhatsApp, Instagram, carrinho, busca e mais
- ✅ **Botão "Voltar ao topo"** — aparece quando scrolla para baixo
- ✅ **Loading skeleton** — placeholder bonito enquanto produtos carregam
- ✅ **Galeria lightbox** — clicar nas imagens abre visualização em tela cheia
- ✅ **Hover effects** — animações suaves nos cards e botões

### 🛍️ Funcionalidades de E-commerce

- ✅ **Filtros no cardápio** — botões para filtrar "Todos", "Tortinhas" e "Cones"
- ✅ **Busca de produtos** — campo de pesquisa em tempo real
- ✅ **Mini carrinho** — badge mostrando quantos itens foram selecionados
- ✅ **Modal de detalhes** — clicar em "Ver" abre popup com info completa do produto
- ✅ **Avaliação por estrelas** — nos produtos (★★★★★)
- ✅ **Seletor de quantidade** — botões +/- para escolher quantos produtos encomendar
- ✅ **Adicionar ao carrinho** — sistema completo de carrinho de compras
- ✅ **Checkout via WhatsApp** — finalização automática com mensagem formatada

### 📱 Mobile & Responsivo

- ✅ Menu hamburguer funcional
- ✅ Layout adaptativo para todas as telas
- ✅ Touch-friendly (botões grandes, fácil navegação)

## 🚀 Como Usar

### Abrir Localmente

```powershell
cd "c:\Users\Vitória\repos-git\joy\doces-da-joy-prototype\static"
start index.html
```

Ou clique duas vezes no arquivo `index.html`.

## 📋 Estrutura de Arquivos

```
static/
├── index.html      # Página principal
├── styles.css      # Estilos completos
├── app.js          # Lógica JavaScript (carrinho, filtros, modal)
├── logo.jpeg       # Logo da marca
└── README.md       # Esta documentação
```

## 🎯 Principais Interações

### Navegação

- Clique nos links do menu para navegar entre seções
- Scroll suave automático

### Produtos

- **Ver detalhes**: Clique no botão "Ver" ou na imagem
- **Adicionar ao carrinho**: Clique no ícone 🛒 ou use o modal
- **Filtrar**: Use os botões "Todos", "Tortinhas", "Cones"
- **Buscar**: Digite no campo de busca

### Carrinho

- Clique no ícone 🛒 no header para abrir
- Ajuste quantidades com +/-
- Remove itens com o ícone 🗑️
- Finalize pelo WhatsApp

### Lightbox

- Clique em qualquer imagem de produto
- Pressione ESC ou clique fora para fechar

## 🛠️ Personalização

### Alterar Produtos

Edite o array `products` em `app.js`:

```javascript
const products = [
  {
    id: 1,
    name: "Seu Produto",
    price: 10.0,
    category: "tortinha", // ou 'cone'
    rating: 5,
    img: "url-da-imagem",
    description: "Descrição completa",
  },
  // ... mais produtos
];
```

### Alterar Número do WhatsApp

Substitua `5500000000000` pelo seu número (com DDI + DDD):

- Em `index.html` (links diretos)
- Em `app.js` (checkout do carrinho)

Exemplo: `5511999999999` (Brasil, SP, celular)

### Alterar Cores

Edite as variáveis CSS em `styles.css`:

```css
:root {
  --bg: #fff6f2; /* Fundo geral */
  --primary: #f6bdc0; /* Rosa principal */
  --accent: #6b3f2b; /* Marrom (texto) */
  --cta: #e67a7f; /* Rosa escuro (CTAs) */
  --muted: #9b9b9b; /* Cinza (secundário) */
}
```

## 📊 Dados dos Produtos (Exemplo)

| ID  | Nome                      | Preço   | Categoria | Rating     |
| --- | ------------------------- | ------- | --------- | ---------- |
| 1   | Tortinha de Morango       | R$ 8,50 | tortinha  | ⭐⭐⭐⭐⭐ |
| 2   | Cone Recheado Chocolate   | R$ 6,50 | cone      | ⭐⭐⭐⭐⭐ |
| 3   | Tortinha de Limão         | R$ 8,00 | tortinha  | ⭐⭐⭐⭐   |
| 4   | Tortinha de Chocolate     | R$ 9,00 | tortinha  | ⭐⭐⭐⭐⭐ |
| 5   | Cone Recheado Morango     | R$ 6,50 | cone      | ⭐⭐⭐⭐   |
| 6   | Tortinha de Doce de Leite | R$ 8,50 | tortinha  | ⭐⭐⭐⭐⭐ |

## 🔧 Próximas Melhorias Sugeridas

- [ ] Integração com Instagram feed
- [ ] Sistema de cupons de desconto
- [ ] Agendamento de entrega (calendário)
- [ ] Pagamento online (Stripe/Mercado Pago)
- [ ] Painel administrativo
- [ ] Sistema de avaliações (clientes podem avaliar)
- [ ] Newsletter (captura de emails)
- [ ] Blog de receitas
- [ ] PWA (app instalável)
- [ ] Rastreamento com Google Analytics

## 📞 Suporte

Precisa de ajuda para personalizar ou adicionar funcionalidades? Entre em contato!

---

**Desenvolvido com ❤️ para Doces da Joy**
