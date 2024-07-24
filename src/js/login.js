import { loadHeaderFooter, getParam } from "./utils.mjs";
import { login } from "./authorization.mjs";

loadHeaderFooter();

const redirect = getParam("redirect");

// This listens for click on the login form submit button.
document.querySelector("#login-submit").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  // The credentials are {email, password}.
  login({ email, password }, redirect);
});
