// ------------------ GLOBAL SITE SCRIPT ------------------

// ✅ Site-wide data index for search
const SITE_INDEX = [];
function addToIndex(item, type, page, price) {
  SITE_INDEX.push({ item, type, page, price });
}

// ✅ Persistent cart
let cart = JSON.parse(localStorage.getItem("zoomtech_cart")) || [];

// ✅ Update cart icon count
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.innerText = cart.length;
}
document.addEventListener("DOMContentLoaded", updateCartCount);

// ✅ Add to Cart
function addToCart(item, price) {
  cart.push({ item, price });
  localStorage.setItem("zoomtech_cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${item} added to cart!`);
}

// ✅ Open Cart Modal
function openCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;
  modal.classList.add("active");
  renderCart();
}

// ✅ Close Cart Modal
function closeCart() {
  const modal = document.getElementById("cartModal");
  if (modal) modal.classList.remove("active");
}

// ✅ Render Cart Items
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalText = document.getElementById("cartTotal");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    totalText.textContent = "Total: $0";
    return;
  }

  let total = 0;
  cart.forEach((c, i) => {
    total += Number(c.price);
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${c.item} - $${c.price}</span>
      <button class="btn" style="background:red;" onclick="removeFromCart(${i})">×</button>
    `;
    cartItems.appendChild(div);
  });

  totalText.textContent = `Total: $${total.toFixed(2)}`;
}

// ✅ Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("zoomtech_cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// ✅ Checkout via WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let msg = "Hello Zoom Tech,%0A%0AI want to order:%0A";
  let total = 0;
  cart.forEach(c => {
    msg += `• ${c.item} - $${c.price}%0A`;
    total += Number(c.price);
  });
  msg += `%0ATotal: $${total}%0AThank you!`;

  const phone = "254795540536"; // Change this to your WhatsApp number
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

// ✅ Search Modal (same as before)
function openSearch() {
  const modal = document.getElementById("searchModal");
  if (modal) modal.style.display = "flex";
  const input = document.getElementById("globalSearchInput");
  if (input) input.focus();
}

function closeSearch() {
  const modal = document.getElementById("searchModal");
  if (modal) modal.style.display = "none";
}

function globalSearch() {
  const q = document.getElementById("globalSearchInput").value.toLowerCase();
  const results = SITE_INDEX.filter(
    i => i.item.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)
  );

  const container = document.getElementById("searchResults");
  if (!container) return;
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = "<p class='small'>No results found.</p>";
    return;
  }

  results.forEach(r => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h4>${r.item}</h4>
      <p>${r.type}</p>
      <p>Price: $${r.price}</p>
      <button class="btn" onclick="addToCart('${r.item}', ${r.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}
