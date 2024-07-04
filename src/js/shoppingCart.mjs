import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("cart");

  // console.log(cartItems);
  const cartPageParentElement = document.querySelector(".product-list");
  // console.log(cardItemTemplate);
  // console.log(cartPageParentElement);
  // console.log(cartItems);
  renderListWithTemplate(cardItemTemplate, cartPageParentElement, cartItems);
}

function cardItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
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