import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("cart");

  // console.log(cartItems);
  // Reference for not null: https://www.geeksforgeeks.org/how-to-check-if-a-variable-is-not-null-in-javascript/
  // "if (cartItems)" means if cartItems in not null, do this.
  if (cartItems) {
  const cartPageParentElement = document.querySelector(".product-list");
  // console.log(cardItemTemplate);
  // console.log(cartPageParentElement);
  // console.log(cartItems);
  renderListWithTemplate(cardItemTemplate, cartPageParentElement, cartItems);
  const total = calculateCartTotal(cartItems);
  hideOrShowCartTotal(total)
  }
  // This else statement is run if cartItems is null.
  else {
    hideOrShowCartTotal(0);
  }
}

function hideOrShowCartTotal(total) {
  if (total > 0) {
    // Reference on how to remove a class: https://www.w3schools.com/howto/howto_js_remove_class.asp
    document.querySelector(".cart-footer").classList.remove("hide");
    // Reference on how to add a class: https://www.w3schools.com/howto/howto_js_add_class.asp
    document.querySelector(".cart-footer").classList.add("show");
    document.querySelector(".cart-total").innerText = `Total: $${total}`;
  }
  // This means the total is 0.
  else {
    // Reference on how to remove a class: https://www.w3schools.com/howto/howto_js_remove_class.asp
    document.querySelector(".cart-footer").classList.remove("show");
    // Reference on how to add a class: https://www.w3schools.com/howto/howto_js_add_class.asp
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cardItemTemplate(item) {
  // This code was used initially: src="${item.Image}"
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function calculateCartTotal(cartItems) {
  const arrayWithFinalPrices = cartItems.map((cartItem) => cartItem.FinalPrice);
  // console.log(arrayWithFinalPrices);
  // Reference on how to use array reduce(): https://www.w3schools.com/jsref/jsref_reduce.asp
  // Note: A initial value of 0 is added to prevent an error in the console.
  const total = arrayWithFinalPrices.reduce((sum, itemFinalPrice) => sum + itemFinalPrice, 0);
  // console.log(total);
  return total;
}