import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.initiate("cart", ".checkout-summary");

// listening for click on the form submit button
document.querySelector("#checkout-submit").addEventListener("click", (e) => {
  e.preventDefault();

  var myForm = document.forms[0];
  var checkStatus = myForm.checkValidity();
  myForm.reportValidity();

  // This passed the form into the checkout function in the variable checkoutProcess:
  if (checkStatus) {
    checkoutProcess.checkout(document.forms["checkout"]);
  }
});
