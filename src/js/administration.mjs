import { loginRequest, getOrders } from "./externalServices.mjs";
import { showAlertMessage } from "./utils.mjs";

export default class Admin {
    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
    }
    async login(credentials, next) {
        try {
            this.token = await loginRequest(credentials);
            next();
        }
        catch (error) {
            showAlertMessage(error.message.message);
        }
    }
    showLogin() {
      // Add the html for the login form from a template.
      this.mainElement.innerHTML = loginFormTemplate();
      
      // This adds a listener for the login button.
      document.querySelector("login-submit").addEventListener("click", () => {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        // Reference for bind() function: https://www.w3schools.com/js/js_function_bind.asp
        this.login({ email, password }, this.showOrders.bind(this));
      });
    }
    async showOrders() {
      try {
        const orders = await getOrders(this.token);
        this.mainElement.innerHTML = orderTemplate();
        const ordersTbodyElement = document.querySelector("#orders tbody");

        // Reference for join() array: https://www.w3schools.com/jsref/jsref_join.asp
        // Example array.join(" and ") would put and between each string in the array.
        // Reference for .toLocalDateString: https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp
        // The table headers in orderTemplate are as follows:
        // Id, Date, #Items, Total
        ordersTbodyElement.innerHTML = orders.map( (order) => 
          `<tr>
              <td>${order.id}</td>
              <td>${new Date(order.Date).toLocaleDateString("en-US")}</td>
              <td>${items.length}</td>
              <td>${order.orderTotal}</td>
            </tr>`
        ).join("");
      }
      catch (error) {
        console.log(error)
      }
    }
}

function loginFormTemplate() {
  return `<h2>Login</h2>
  <section class="login-form">
    <form name="loginForm">
      <fieldset>
        <legend>Login Info</legend>
        <!-- Reference for input type email: https://www.w3schools.com/tags/att_input_type_email.asp -->
        <label>Username (email) <span class="starRequired">*</span><input type="email" name="email" id="email"
            required value="user1@email.com" /></label>
        <!-- Reference for input type password: https://www.w3schools.com/tags/att_input_type_password.asp -->
        <label>Password <span class="starRequired">*</span><input type="password" name="password" id="password"
            required value="user1" /></label>
      </fieldset>

      <a id="login-submit" type="submit">Login</a>
    </form>
  </section>`;
}

function orderTemplate() {
  return `<h2>Current Orders</h2>
  <table id="orders">
    <thead>
      <tr>
        <th>Id</th>
        <th>Date</th>
        <th>#Items</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody class="order-body"></tbody>
  </table>`;
}