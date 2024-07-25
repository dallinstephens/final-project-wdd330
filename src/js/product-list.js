import { loadHeaderFooter, getParam, setLocalStorage } from "./utils.mjs";
import productList from "./productList.mjs";

loadHeaderFooter();
const category = getParam("category");
setLocalStorage("categoryInLocalStorage", category);
productList(".product-list", category);
