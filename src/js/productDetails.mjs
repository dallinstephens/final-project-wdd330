import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

// Make the variable productDetails global so that multiple functions can use it in this file.
let productInfo = {};    

export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  productInfo = await findProductById(productId);

  // once we have the product details we can render out the HTML
  renderProductDetails();

  // add a listener to Add to Cart button
  // Reference for addEventListener: https://www.w3schools.com/jsref/met_element_addeventlistener.asp
  document.querySelector("#addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  setLocalStorage("cart", productInfo);
}

function renderProductDetails() {
  // console.log(productInfo);
  document.querySelector("#productName").innerText = productInfo.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = productInfo.NameWithoutBrand;
  document.querySelector("#productImage").src = productInfo.Image;
  document.querySelector("#productImage").alt = productInfo.Name;
  document.querySelector("#productFinalPrice").textContent = `$${productInfo.FinalPrice}`;
  document.querySelector("#productColorName").innerText = productInfo.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = productInfo.DescriptionHtmlSimple;
  // References for dataset: data-* attribute:
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
  // https://www.w3schools.com/tags/att_data-.asp
  document.querySelector("#addToCart").dataset.id = productInfo.Id;
  
}