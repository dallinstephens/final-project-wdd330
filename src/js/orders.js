import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import currentOrders from "./currentOrders.mjs";

loadHeaderFooter();

const token = getLocalStorage("savedToken");
const selector = "#orders";
currentOrders(selector, token);
