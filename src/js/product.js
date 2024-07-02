import { getParam } from "./utils.mjs";
// Reference when no "{ }" are used on import with one item, default is needed on the exported function:
// https://www.freecodecamp.org/news/difference-between-default-and-named-exports-in-javascript/#:~:text=In%20JavaScript%2C%20a%20default%20export,using%20the%20export%20default%20syntax.
import productDetails from "./productDetails.mjs";

// Example: product_pages/index.html?product=880RR
// const productId = getParam("product");
// Notice "product=880RR" in URL.
// productId = "880RR"
const productId = getParam("product");
// console.log(productId);
productDetails(productId);
