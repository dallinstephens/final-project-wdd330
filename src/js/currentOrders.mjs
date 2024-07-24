import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
    try {
      const orders = await getOrders(token);
      const tbodyElement = document.querySelector(`${selector} tbody`);
  
      // Reference for join() array: https://www.w3schools.com/jsref/jsref_join.asp
      // Example array.join(" and ") would put and between each string in the array.
      // Reference for .toLocalDateString: https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp
      // The table headers in orderTemplate are as follows:
      // Id, Date, #Items, Total
      tbodyElement.innerHTML = orders.map( order => orderTemplate(order)).join("");
    }
    catch (error) {
      window.location = "/";
      console.log(error);
    }
}

function orderTemplate(order) {
  // Reference for cannot read typeerror length:
  // https://rollbar.com/blog/javascript-typeerror-cannot-read-property-length-of-undefined-in-javascript/
  try {
    return `<tr>
      <td>${order.id}</td>
      <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
      <td>${order.items.length}</td>
      <td>$${order.orderTotal}</td>
    </tr>`;
  }
  catch {
    return `<tr>
      <td>${order.id}</td>
      <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
      <td>0</td>
      <td>$${order.orderTotal}</td>
    </tr>`;    
  }
}