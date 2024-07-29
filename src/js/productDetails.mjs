import { getLocalStorage, setLocalStorage, showAlertMessage, removePreviousAlerts } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";

// Make the variable productDetails global so that multiple functions can use it in this file.
let productInfo = {};

document.querySelector("#quantity").value = 1;

export default async function productDetails(productId) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  const category = getLocalStorage("categoryInLocalStorage");
  productInfo = await findProductById(productId, category);
  // console.log(productInfo);

  // once we have the product details we can render out the HTML
  renderProductDetails();

  // add a listener to Add to Cart button
  // Reference for addEventListener: https://www.w3schools.com/jsref/met_element_addeventlistener.asp
  document.querySelector("#addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cartItems = getLocalStorage("cart");

  if (!cartItems) {
    cartItems = [];
  }

  let quantity = document.querySelector("#quantity").value;

  // Reference how to change a string to a number:
  // https://www.freecodecamp.org/news/how-to-convert-a-string-to-a-number-in-javascript/
  quantity = Number(quantity);

  // Reference on how to add key value pair to JSON object:
  // https://stackoverflow.com/questions/28527712/how-to-add-key-value-pair-in-the-json-object-already-declared
  productInfo["Quantity"] = quantity;
  console.log(productInfo);

  // This is to keep items from duplicated in the cart.
  // Reference for array findIndex(): https://www.w3schools.com/jsref/jsref_findindex.asp
  
  const index = cartItems.findIndex((cartItem) => cartItem.Id == productInfo.Id);

  // If index == -1, then that means that no match (no duplicate item) was found with findIndex().
  if (index == -1) {
    cartItems.push(productInfo);
  }
  // Run else statement if duplicate was found.
  else {
    cartItems[index]["Quantity"] = cartItems[index].Quantity + productInfo.Quantity;
  }

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

  removePreviousAlerts();
  // Show message to the user that the product has been added to the cart.
  showAlertMessage(`${productInfo.Name} added to cart!`);
}

function renderProductDetails() {
  // console.log(productInfo);
  document.querySelector("#productName").innerText = productInfo.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = productInfo.NameWithoutBrand;
  // document.querySelector("#productImage").src = productInfo.Image;
  document.querySelector("#productImage").src = productInfo.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = productInfo.Name;
  document.querySelector("#productFinalPrice").textContent = `$${productInfo.FinalPrice}`;
  document.querySelector("#productColorName").innerText = productInfo.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = productInfo.DescriptionHtmlSimple;
  // References for dataset: data-* attribute:
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
  // https://www.w3schools.com/tags/att_data-.asp
  document.querySelector("#addToCart").dataset.id = productInfo.Id;
}