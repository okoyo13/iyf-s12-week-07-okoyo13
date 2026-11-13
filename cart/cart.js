// Shopping Cart State
const state = {
    products: [
        {
            id: 1,
            name: 'Laptop',
            price: 999,
            image: 'images/laptop.jpg',
        },
        {
            id: 2,
            name: 'Phone',
            price: 699,
            image: 'images/phone.jpg',
        },
        {
            id: 3,
            name: 'Headphones',
            price: 199,
            image: 'images/headphones.jpg',
        },
    ],

    cart: [],
};
// Add product to cart
function addToCart(productId) {
    const existing = state.cart.find((item) => item.productId === productId);

    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({
            productId,
            quantity: 1,
        });
    }

    saveCart();
    renderCart();
}
// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(state.cart));
}
// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
        state.cart = JSON.parse(savedCart);
    }
}
// Display available products
function renderProducts() {
    const productList = document.getElementById('product-list');

    productList.innerHTML = state.products
        .map(
            (product) => `
        <div class="product">
          <img src="${product.image}" alt="${product.name}" width="100">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <button type="button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `
        )
        .join('');

    productList.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            addToCart(Number(button.dataset.productId));
        });
    });
}
// Display cart items
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    let totalItems = 0;
    let totalPrice = 0;

    cartItems.innerHTML = state.cart
        .map((item) => {
            const product = state.products.find(
                (product) => product.id === item.productId
            );

            if (!product) {
                return '';
            }

            totalItems += item.quantity;
            totalPrice += product.price * item.quantity;

            return `
        <div class="cart-item">
          <span>${product.name} x ${item.quantity}</span>
          <span>$${product.price * item.quantity}</span>

          <button type="button" data-action="decrease" data-id="${product.id}">-</button>
          <button type="button" data-action="increase" data-id="${product.id}">+</button>
          <button type="button" data-action="remove" data-id="${product.id}">
  Remove
</button>
        </div>
      `;
        })
        .join('');

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice;

    cartItems.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = Number(button.dataset.id);
            if (button.dataset.action === 'increase') {
                updateQuantity(productId, 1);
            } else if (button.dataset.action === 'decrease') {
                updateQuantity(productId, -1);
            } else if (button.dataset.action === 'remove') {
                removeFromCart(productId);
            }
        });
    });
}
// Update product quantity
function updateQuantity(productId, change) {
    const item = state.cart.find((item) => item.productId === productId);

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        state.cart = state.cart.filter((item) => item.productId !== productId);
    }

    saveCart();
    renderCart();
}
// Remove product from cart
function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);

    saveCart();
    renderCart();
}
// Clear entire cart
function clearCart() {
    state.cart = [];

    saveCart();
    renderCart();
}
// Clear cart button
document.getElementById('clear-cart').addEventListener('click', clearCart);
// Initialize shopping cart
loadCart();
renderProducts();
renderCart();
