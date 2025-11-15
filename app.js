// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");

  // Aguardar um mínimo de 1 segundo para mostrar a animação
  setTimeout(() => {
    loadingScreen.classList.add("hidden");

    // Remover do DOM após a transição
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 600);
  }, 1000);
});

// ===== DADOS DOS PRODUTOS =====
const products = [
  {
    id: 1,
    name: "Tortinha de Limão",
    price: 10.0,
    category: "tortinha",
    rating: 5,
    img: "imagens/limao.jpeg",
    description:
      "Base crocante de farofinha de bolacha, recheio cremoso de musse de limão siciliano e cobertura de ganache premium com raspas de limão.",
  },
  {
    id: 3,
    name: "Tortinha de Maracujá",
    price: 10.0,
    category: "tortinha",
    rating: 5,
    img: "imagens/maracuja.jpeg",
    description:
      "Deliciosa base de farofinha, recheio intenso de maracujá selecionado e finalização com ganache artesanal.",
  },
  {
    id: 4,
    name: "Tortinha de Oreo",
    price: 10.0,
    category: "tortinha",
    rating: 5,
    img: "imagens/oreo.jpeg",
    description:
      "Base crocante de farofinha, recheio irresistível de Oreo cremoso e cobertura de ganache de chocolate belga.",
  },
  {
    id: 2,
    name: "Ninho com Nutella",
    price: 14.0,
    category: "cone",
    rating: 5,
    img: "imagens/Coneninhocomnutella.jpeg",
    description:
      "Cone artesanal super crocante recheado com creme de leite ninho e deliciosa Nutella original.",
  },
  {
    id: 5,
    name: "Ninho com Morango",
    price: 14.0,
    category: "cone",
    rating: 5,
    img: "imagens/Coneninhocommorango.jpeg",
    description:
      "Cone crocante com creme de leite ninho e morangos frescos selecionados. Uma explosão de sabor!",
  },
  {
    id: 7,
    name: "Ferrero Rocher",
    price: 14.0,
    category: "cone",
    rating: 5,
    img: "imagens/Coneferrerorocher.jpeg",
    description:
      "Cone premium recheado com creme de avelã belga e bombons Ferrero Rocher. Sofisticação em cada mordida.",
  },
  {
    id: 8,
    name: "Brigadeiro com Morango",
    price: 14.0,
    category: "cone",
    rating: 5,
    img: "imagens/Conebrigadeirocommorango.jpeg",
    description:
      "Cone crocante com brigadeiro gourmet cremoso e morangos frescos. O clássico brasileiro reinventado.",
  },
  {
    id: 9,
    name: "Cone Oreo",
    price: 14.0,
    category: "cone",
    rating: 5,
    img: "imagens/Coneoreo.jpeg",
    description:
      "Cone artesanal recheado com creme de Oreo e pedaços crocantes do biscoito. Irresistível!",
  },
];

// ===== ESTADO DO CARRINHO =====
let cart = [];

// ===== RENDERIZAR PRODUTOS =====
function renderProducts(filter = "all", searchTerm = "") {
  const grid = document.getElementById("productsGrid");

  let filtered = products;

  // Filtrar por categoria
  if (filter !== "all") {
    filtered = filtered.filter((p) => p.category === filter);
  }

  // Filtrar por busca
  if (searchTerm) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Limpar grid
  grid.innerHTML = "";

  // Renderizar produtos
  filtered.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card fade-in";
    card.style.animationDelay = `${index * 0.1}s`;

    // Gerar estrelas de avaliação
    const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

    card.innerHTML = `
      <div class="product-image" onclick="openLightbox('${product.img}')">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <div class="image-overlay"><i class="fas fa-search-plus"></i></div>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <div class="rating" title="${product.rating} estrelas">${stars}</div>
        <div class="price">R$ ${product.price
          .toFixed(2)
          .replace(".", ",")}</div>
        <div class="actions">
          <button class="btn" onclick="openModal(${
            product.id
          })"><i class="fas fa-eye"></i> Ver</button>
          <button class="btn primary" onclick="quickAddToCart(${
            product.id
          })"><i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Ativar animações
  observeElements();
}

// ===== FILTROS =====
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(
      btn.dataset.filter,
      document.getElementById("productSearch").value
    );
  });
});

// ===== BUSCA =====
document.getElementById("productSearch")?.addEventListener("input", (e) => {
  const activeFilter =
    document.querySelector(".filter-btn.active").dataset.filter;
  renderProducts(activeFilter, e.target.value);
});

// ===== MODAL DE DETALHES =====
function openModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  document.getElementById("modalImage").src = product.img;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalPrice").textContent = `R$ ${product.price
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("modalDescription").textContent = product.description;

  const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
  document.getElementById(
    "modalRating"
  ).innerHTML = `<span class="rating">${stars}</span>`;

  document.getElementById("qtyInput").value = 1;

  const modal = document.getElementById("productModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Configurar botão adicionar ao carrinho
  document.getElementById("addToCartBtn").onclick = () => {
    const qty = parseInt(document.getElementById("qtyInput").value);
    addToCart(productId, qty);
    closeModal();
  };
}

function closeModal() {
  document.getElementById("productModal").classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelector(".modal-close")?.addEventListener("click", closeModal);
document.getElementById("productModal")?.addEventListener("click", (e) => {
  if (e.target.id === "productModal") closeModal();
});

// ===== CONTROLES DE QUANTIDADE =====
document.getElementById("qtyMinus")?.addEventListener("click", () => {
  const input = document.getElementById("qtyInput");
  if (input.value > 1) input.value = parseInt(input.value) - 1;
});

document.getElementById("qtyPlus")?.addEventListener("click", () => {
  const input = document.getElementById("qtyInput");
  if (input.value < 99) input.value = parseInt(input.value) + 1;
});

// ===== CARRINHO =====
function addToCart(productId, quantity = 1) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  updateCart();
  showCartNotification();
}

function quickAddToCart(productId) {
  addToCart(productId, 1);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function updateCartQty(productId, newQty) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQty;
      updateCart();
    }
  }
}

function updateCart() {
  const badge = document.querySelector(".cart-badge");
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? "flex" : "none";

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    cartTotal.textContent = "R$ 0,00";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">R$ ${item.price
          .toFixed(2)
          .replace(".", ",")}</div>
      </div>
      <div class="cart-item-qty">
        <button onclick="updateCartQty(${item.id}, ${
        item.quantity - 1
      })"><i class="fas fa-minus"></i></button>
        <span>${item.quantity}</span>
        <button onclick="updateCartQty(${item.id}, ${
        item.quantity + 1
      })"><i class="fas fa-plus"></i></button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${
        item.id
      })"><i class="fas fa-trash"></i></button>
    </div>
  `
    )
    .join("");

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  cartTotal.textContent = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

  // Atualizar link do checkout
  const message = cart
    .map((item) => `${item.quantity}x ${item.name}`)
    .join("%0A");
  document.getElementById(
    "checkoutBtn"
  ).href = `https://wa.me/5511949992735?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20encomendar:%0A%0A${message}%0A%0ATotal:%20R$%20${totalPrice
    .toFixed(2)
    .replace(".", ",")}%0A%0AObrigada!%20😊`;
}

function showCartNotification() {
  // Animar badge
  const badge = document.querySelector(".cart-badge");
  if (badge) {
    badge.style.transform = "scale(1.3)";
    setTimeout(() => (badge.style.transform = "scale(1)"), 200);
  }

  // Mostrar toast
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  // Esconder após 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Toggle carrinho
document.querySelector(".cart-toggle")?.addEventListener("click", () => {
  document.getElementById("miniCart").classList.toggle("active");
});

document.querySelector(".close-cart")?.addEventListener("click", () => {
  document.getElementById("miniCart").classList.remove("active");
});

// ===== LIGHTBOX =====
function openLightbox(imageSrc) {
  document.getElementById("lightboxImage").src = imageSrc;
  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

document
  .querySelector(".lightbox-close")
  ?.addEventListener("click", closeLightbox);
document.getElementById("lightbox")?.addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== ANIMAÇÕES DE SCROLL =====
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in, .slide-up").forEach((el) => {
    observer.observe(el);
  });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  // Simular loading (remover skeleton)
  setTimeout(() => {
    renderProducts();
  }, 500);

  observeElements();

  // Menu Mobile Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
      mobileMenuToggle.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        mobileMenuToggle.classList.remove("active");
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        !mainNav.contains(e.target) &&
        !mobileMenuToggle.contains(e.target) &&
        mainNav.classList.contains("open")
      ) {
        mainNav.classList.remove("open");
        mobileMenuToggle.classList.remove("active");
      }
    });
  }

  // Contact Form Toggle
  const openFormBtn = document.getElementById("openFormBtn");
  const closeFormBtn = document.getElementById("closeFormBtn");
  const contactFormWrapper = document.getElementById("contactFormWrapper");

  if (openFormBtn && contactFormWrapper) {
    openFormBtn.addEventListener("click", () => {
      contactFormWrapper.classList.add("show");
      setTimeout(() => {
        contactFormWrapper.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    });
  }

  if (closeFormBtn && contactFormWrapper) {
    closeFormBtn.addEventListener("click", () => {
      contactFormWrapper.classList.remove("show");
    });
  }

  // Contact Form Submit
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const mensagem = document.getElementById("mensagem").value;

      const texto = `*Nova Encomenda!*%0A%0A*Nome:* ${encodeURIComponent(
        nome
      )}%0A*Telefone:* ${encodeURIComponent(
        telefone
      )}%0A*Mensagem:* ${encodeURIComponent(mensagem)}`;

      window.open(`https://wa.me/5511949992735?text=${texto}`, "_blank");

      // Reset form
      contactForm.reset();
      contactFormWrapper.classList.remove("show");
    });
  }
});
