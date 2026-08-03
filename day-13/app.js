// app.js
// Shared logic used by index.html, wishlist.html and cart.html
// We use localStorage so wishlist/cart data survives moving between pages.

// ---------- Helper functions to read/save data from localStorage ----------

function getWishlist() {
  let data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
}

function getCart() {
  let data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function saveCart(list) {
  localStorage.setItem("cart", JSON.stringify(list));
}

// ---------- 1) INDEX PAGE: show all products ----------

function displayProducts(data) {
  let productContainer = document.getElementById("productContainer");
  if (!productContainer) return; // only run this on index.html

  productContainer.innerHTML = "";

  data.forEach(product => {
    productContainer.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" style="height:180px; object-fit:cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <h6 class="text-success">₹${product.price}</h6>
            <button class="btn btn-outline-danger btn-sm mt-auto"
                    onclick="addToWishlist(${product.id})">
              ❤ Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// Add a product to the wishlist (called from index.html)
function addToWishlist(id) {
  let product = products.find(p => p.id === id);
  let wishlist = getWishlist();

  let alreadyInWishlist = wishlist.find(p => p.id === id);
  if (alreadyInWishlist) {
    alert(product.name + " is already in your wishlist!");
    return;
  }

  wishlist.push(product);
  saveWishlist(wishlist);
  alert(product.name + " added to wishlist!");
}

// ---------- 2) WISHLIST PAGE: show wishlist items ----------

function displayWishlist() {
  let wishlistContainer = document.getElementById("wishlistContainer");
  if (!wishlistContainer) return; // only run this on wishlist.html

  let wishlist = getWishlist();
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `<p class="text-muted">Your wishlist is empty.</p>`;
    return;
  }

  wishlist.forEach(product => {
    wishlistContainer.innerHTML += `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <span>${product.name} - ₹${product.price}</span>
        <button class="btn btn-success btn-sm" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

// Move a product from wishlist to cart (called from wishlist.html)
function addToCart(id) {
  let wishlist = getWishlist();
  let cart = getCart();

  let product = wishlist.find(p => p.id === id);

  cart.push(product);
  wishlist = wishlist.filter(p => p.id !== id);

  saveCart(cart);
  saveWishlist(wishlist);

  displayWishlist(); // refresh the wishlist page after moving item
}

// ---------- 3) CART PAGE: show cart items and place order ----------

function displayCart() {
  let cartContainer = document.getElementById("cartContainer");
  if (!cartContainer) return; // only run this on cart.html

  let cart = getCart();
  let cartTotal = document.getElementById("cartTotal");
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
    cartTotal.innerText = "";
    return;
  }

  cart.forEach(product => {
    total += product.price;
    cartContainer.innerHTML += `
      <div class="list-group-item">
        ${product.name} - ₹${product.price}
      </div>
    `;
  });

  cartTotal.innerText = "Total: ₹" + total;
}

// Place the order - ask for address before confirming (called from cart.html)
function placeOrder() {
  let cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty. Add some items before placing an order!");
    return;
  }

  let address = document.getElementById("addressInput").value;

  if (address.trim() === "") {
    alert("Address is required to place the order.");
    return;
  }

  alert("Order placed successfully!\nDelivery Address: " + address);

  // empty the cart after placing the order
  saveCart([]);
  document.getElementById("addressInput").value = "";
  displayCart();
}

// ---------- Run the correct function depending on which page we're on ----------

displayProducts(products);
displayWishlist();
displayCart();
