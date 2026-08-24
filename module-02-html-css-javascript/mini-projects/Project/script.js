
const state = {
    dishes: [],
    cart: [],
    search: "",
};

/* ===== DOM REFERENCES ===== */
const menuGrid = document.querySelector("#menu-grid");
const searchInput = document.querySelector("#search");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const checkoutBtn = document.querySelector("#checkout-btn");

/* ===== LOAD DATA ===== */
async function loadMenu() {
    try {
        menuGrid.innerHTML = `<p class="loading">⏳ Loading menu...</p>`;

        const response = await fetch("data/recipes.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

            state.dishes = data.recipes;

        render();
    } catch (error) {
        console.error(" Failed to load menu:", error);
        menuGrid.innerHTML = `<p class="error"> Could not load the menu. Please try again later.</p>`;
    }
}

function render() {
    renderMenu();
    renderCart();
    updateCheckoutButton();
}

function renderMenu() {
    const term = state.search.toLowerCase().trim();

    const filtered = state.dishes.filter((dish) =>
        dish.name.toLowerCase().includes(term)
    );


    if (filtered.length === 0) {
        menuGrid.innerHTML = `<p class="empty">🍽️ No dishes found. Try a different search.</p>`;
        return;
    }

    menuGrid.innerHTML = filtered
        .map(
            (dish) => {
                console.log("🍽️ Rendering dish:", dish.name, "price:", dish.price);
                return `
                <article class="dish" data-id="${dish.id}">
                    <span class="category">${dish.category || 'Dish'}</span>
                    <h3>${dish.name}</h3>
                    <p class="price">${dish.price || '0'} ETB</p>
                    <button class="add-btn">Add to Cart</button>
                </article>
            `;
            }
        )
        .join("");
}

function renderCart() {
    if (state.cart.length === 0) {
        cartItems.innerHTML = `<p class="cart-empty"> Your cart is empty. Start adding dishes!</p>`;
        cartTotal.innerHTML = "";
        return;
    }

    cartItems.innerHTML = state.cart
        .map(
            (item) => {
                const itemTotal = (item.price || 0) * item.qty;
                return `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-info">
                        <span class="item-qty">${item.qty}×</span>
                        <span class="item-name">${item.name}</span>
                    </div>
                    <div>
                        <span class="item-price">${itemTotal} ETB</span>
                        <button class="remove-btn" aria-label="Remove ${item.name}">✕</button>
                    </div>
                </div>
            `;
            }
        )
        .join("");

    const total = state.cart.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);
    
    
    cartTotal.innerHTML = `
      <span>Total</span>
      <span class="total-amount">${total} ETB</span>
    `;
}

function updateCheckoutButton() {
    checkoutBtn.disabled = state.cart.length === 0;
    checkoutBtn.textContent = state.cart.length === 0 ? "Cart is empty" : "📱 Checkout with TeleBirr";
}

searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
});


// "Add to Cart" on menu
menuGrid.addEventListener("click", (event) => {
    const addBtn = event.target.closest(".add-btn");
    if (!addBtn) return;

    const dishEl = addBtn.closest(".dish");
    const id = Number(dishEl.dataset.id);
    const dish = state.dishes.find((d) => d.id === id);
    if (!dish) return;

    

    const existing = state.cart.find((item) => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({
            id: dish.id,
            name: dish.name,
            price: dish.price || 0,
            qty: 1,
        });
    }

    saveCart();
    render();
});

// "Remove" on cart
cartItems.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".remove-btn");
    if (!removeBtn) return;

    const cartItemEl = removeBtn.closest(".cart-item");
    const id = Number(cartItemEl.dataset.id);

    state.cart = state.cart.filter((item) => item.id !== id);

    saveCart();
    render();
});

/* ===== PERSISTENCE ===== */
function saveCart() {
    try {
        localStorage.setItem("addisEatsCart", JSON.stringify(state.cart));
    } catch (error) {
        console.warn("Could not save cart:", error);
    }
}

function loadCart() {
    try {
        const saved = localStorage.getItem("addisEatsCart");
        if (saved) {
            state.cart = JSON.parse(saved);
            if (!Array.isArray(state.cart)) state.cart = [];
        }
    } catch (error) {
        console.warn("Could not load cart:", error);
        state.cart = [];
    }
}

/* ===== CHECKOUT ===== */
checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) return;
    const total = state.cart.reduce((sum, i) => sum + (i.price || 0) * i.qty, 0);
    alert("🛒 Your cart total is " + total + " ETB");
});

/* ===== INIT ===== */
async function init() {
    loadCart();
    await loadMenu();
    render();
}

// Boot the app
init();