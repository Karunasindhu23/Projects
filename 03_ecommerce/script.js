document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 499 },
    { id: 2, name: "Product 2", price: 299 },
    { id: 3, name: "Product 3", price: 999 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const rupeeSymbol = "\u20B9";

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - ${rupeeSymbol}${product.price}</span>
    <button data-id = ${product.id}>Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const selectedProduct = products.find((item) => item.id === productId);
      //  console.log(selectedProduct);
      addToCart(selectedProduct);
    }
  });

  function addToCart(selectedProduct) {
    cart.push(selectedProduct);
    // console.log(selectedProduct);
    saveCart()
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
      emptyCartMessage.classList.remove("hidden");
      cartTotal.classList.add("hidden");
      return;
    }
    emptyCartMessage.classList.add("hidden");
    cartTotal.classList.remove("hidden");

    let total = 0;

    cart.forEach((item, index) => {
      const cartProduct = document.createElement("div");
      cartProduct.classList.add("product");
      cartProduct.innerHTML = `
        <span>${item.name} - ${rupeeSymbol}${item.price}</span>
        <button data-index = "${index}">Remove</button>
      `;
      cartItems.appendChild(cartProduct);
      total += item.price;
    });
    totalPrice.textContent = `${rupeeSymbol}${total}`;
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = parseInt(e.target.getAttribute("data-index"));
      cart.splice(index, 1);
      saveCart()
      renderCart();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cart = [];
    alert("Checkout Succesfully");
    saveCart()
    renderCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
