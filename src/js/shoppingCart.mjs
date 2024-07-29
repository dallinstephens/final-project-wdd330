import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("cart");

  // console.log(cartItems);
  // Reference for not null: https://www.geeksforgeeks.org/how-to-check-if-a-variable-is-not-null-in-javascript/
  // "if (cartItems)" means if cartItems in not null, do this.
  if (cartItems.length > 0) {
    const cartPageParentElement = document.querySelector(".product-list");
    // console.log(cardItemTemplate);
    // console.log(cartPageParentElement);
    // console.log(cartItems);
    renderListWithTemplate(cardItemTemplate, cartPageParentElement, cartItems);
    const total = calculateCartTotal(cartItems);
    hideOrShowCartTotal(total);
    deleteItemUponClick();
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
    document.querySelector(".cart-total").innerText = `Total: $${total.toFixed(2)}`;
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
    <a href="#" class="delete-item">Delete</a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">${item.Quantity} X $${item.FinalPrice}</p>
    <p class="cart-card__price">$${(item.Quantity * item.FinalPrice).toFixed(2)}</p>
  </li>`;
}

function calculateCartTotal(cartItems) {
  const arrayWithFinalPrices = cartItems.map((cartItem) => cartItem.Quantity * cartItem.FinalPrice);
  // console.log(arrayWithFinalPrices);
  // Reference on how to use array reduce(): https://www.w3schools.com/jsref/jsref_reduce.asp
  // Note: A initial value of 0 is added to prevent an error in the console.
  const total = arrayWithFinalPrices.reduce((sum, itemFinalPrice) => sum + itemFinalPrice, 0);
  // console.log(total);
  return total;
}

function deleteItemUponClick() {
  let productListElement = document.querySelector(".product-list");

  // Reference for addEventListener: https://www.w3schools.com/jsref/met_element_addeventlistener.asp
  productListElement.addEventListener("click", function(event) {
  // Reference for event target in JavaScript: https://www.w3schools.com/jsref/event_target.asp
    // event.target.tagName could also be used
    // Reference for className: https://stackoverflow.com/questions/11026056/getting-the-class-of-the-element-that-fired-an-event-using-jquery

    if (event.target.className == "delete-item") {
      // Reference on how to get index of nth element:
      // https://stackoverflow.com/questions/54737958/get-index-of-child-elements-with-event-listener-in-javascript
      var nodes = document.querySelectorAll('.delete-item');
      let index = [].indexOf.call(nodes, event.target);
      console.log(index);
      let cartItems = getLocalStorage("cart");
      // Reference to remove item at certain index using splice:
      // https://www.w3schools.com/jsref/jsref_splice.asp
      cartItems.splice(index, 1);

      setLocalStorage("cart", cartItems);

      let numberOfCartItemsElement = document.querySelector(".number-of-cart-items");
      
      // Reference for array map function:
      // https://www.w3schools.com/jsref/jsref_map.asp
      // Reference for array reduce function:
      // https://www.w3schools.com/jsref/jsref_reduce.asp
      let numberOfCartItems = cartItems.reduce( (total, cartItem) => total + cartItem.Quantity, 0);
      
      setLocalStorage("numberOfCartItems", numberOfCartItems);
    
      numberOfCartItemsElement.textContent = numberOfCartItems;
    
      // Reference for add DOM class:
      // https://www.w3schools.com/howto/howto_js_add_class.asp
      numberOfCartItemsElement.classList.add("show");
    
      // Reference for remove DOM class:
      // https://www.w3schools.com/howto/howto_js_remove_class.asp
      numberOfCartItemsElement.classList.remove("hide");

      // Reference for getting DOM nth-of-type:
      // https://stackoverflow.com/questions/41848550/how-to-select-nth-element-of-the-same-type
      let clickedLiElement = document.querySelector(`li:nth-of-type(${index + 1})`);

      // Reference for removeChild() DOM element: https://www.w3schools.com/jsref/met_node_removechild.asp
      if (index >= 0) {
        productListElement.removeChild(clickedLiElement);
      }

      shoppingCart();
    }    
  });
}