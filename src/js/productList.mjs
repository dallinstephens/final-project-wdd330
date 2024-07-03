import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}"
        alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;   
}

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    // Notice that in the home index.html, the list will be inserted in '<ul class="product-list"></ul>'.
    // The selector in this case will be ".product-list".
    let element = document.querySelector(selector);
    // get the list of products
    let products = await getData(category);
    console.log(products);
    // Reference for array filter(): https://www.w3schools.com/jsref/jsref_filter.asp
    // This filter gets only the 4 tents we need.
    products = products.filter(item => item.Id !== "989CG" && item.Id !== "880RT");
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, products);
}