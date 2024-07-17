import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    // Intially was using <img src="${product.Image}"
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">    
      <img src="${product.Images.PrimaryMedium}"
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
    let products = await getProductsByCategory(category);
    // Reference for insertAdjacentText: https://javascript.info/modifying-document
    // elem.insertAdjacentText(where, text);
    let title = document.querySelector(".products h2");
    // Reference on how to capitalize the category:
    // https://sentry.io/answers/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript/#:~:text=The%20Solution&text=The%20toUpperCase()%20method%20converts,not%20alter%20the%20original%20string.
    // Inititally I had this, but the category was not capitalized: title.insertAdjacentText("beforeend", `: ${category}`);
    title.insertAdjacentText("beforeend", `: ${category[0].toUpperCase() + category.slice(1)}`);

    // console.log(products);
    // Reference for array filter(): https://www.w3schools.com/jsref/jsref_filter.asp
    // This filter gets only the 4 tents we need.
    // products = products.filter(item => item.Id !== "989CG" && item.Id !== "880RT");
    // render out the product list to the element
    // console.log(productCardTemplate);
    // console.log(element);
    // console.log(products);
    renderListWithTemplate(productCardTemplate, element, products);
}