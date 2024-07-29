// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a parameter from the URL
// Reference to team 2 instructor's solution: 
// https://github.com/matkat99/sleepoutside/blob/v3-team2/src/js/utils.mjs
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const parameter = urlParams.get(param);
  return parameter;
}

// This is used to render all the html from a template function that takes in a list, a list of products in this case.
// The parameter "list" in this case is "products" from productList.mjs.
export function renderListWithTemplate(templateFunction, parentElement, list, position = "afterbegin", clear = "true") {
  if (clear) {
    parentElement.innerHTML = "";   
  }
  // "list" in this case is "products"
  // "templateFunction" in this case is "productCardTemplate"
  // Reference for array map(): https://www.w3schools.com/jsref/jsref_map.asp
  const htmlStrings = list.map(templateFunction);
  // Reference for array join(): https://www.w3schools.com/jsref/jsref_join.asp
  // Example of array join():
  // const fruits = ["Banana", "Orange", "Apple", "Mango"];
  // let text = fruits.join(" and ");
  // document.getElementById("demo").innerHTML = text;
  // Result: Banana and Orange and Apple and Mango
  // join("") removes the comma, so for example:
  // let text = fruits.join("");
  // document.getElementById("demo").innerHTML = text;
  // Result: BananaOrangeAppleMango
  // Reference for insertAdjacentHTML: https://javascript.info/modifying-document
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// This is used to render the header and footer on each of the html pages.
// There is no need for a loop.
export async function renderWithTemplate(templateFunction, parentElement, data, callback, position = "afterbegin", clear = "true") {
  if (clear) {
    parentElement.innerHTML = "";   
  }

  // templateFunction in this case is headerTemplateFunction or footerTemplateFunction
  const htmlString = await templateFunction(data);

  // Reference for insertAdjacentHTML: https://javascript.info/modifying-document 
  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  // Reference on currying: https://www.geeksforgeeks.org/what-is-currying-function-in-javascript/
  return async function() {
    const response = await fetch(path);

    // Reference for response ok property: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
    // console.log(response.ok); // returns true if successful
    if (response.ok) {
      // Reference for .text(): https://developer.mozilla.org/en-US/docs/Web/API/Response/text
      const html = await response.text();
      return html;
    }
  }
}

export async function loadHeaderFooter() {
  // Load the header and footer templates in from our partials.
  const headerTemplateFunction = loadTemplate("/partials/header.html");
  const footerTemplateFunction = loadTemplate("/partials/footer.html");

  // Grab the header and footer elements out of the DOM.
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  // Render the header and footer.
  await renderWithTemplate(headerTemplateFunction, headerElement);
  await renderWithTemplate(footerTemplateFunction, footerElement);

  let numberOfCartItemsElement = document.querySelector(".number-of-cart-items");  

  let numberOfCartItems = getLocalStorage("numberOfCartItems");

  if (numberOfCartItems > 0) {
    numberOfCartItemsElement.textContent = numberOfCartItems;

    // Reference for add DOM class:
    // https://www.w3schools.com/howto/howto_js_add_class.asp
    numberOfCartItemsElement.classList.add("show");

    // Reference for remove DOM class:
    // https://www.w3schools.com/howto/howto_js_remove_class.asp
    numberOfCartItemsElement.classList.remove("hide");
  }
  else {    
    // Reference for add DOM class:
    // https://www.w3schools.com/howto/howto_js_add_class.asp
    numberOfCartItemsElement.classList.add("hide");
  
    // Reference for remove DOM class:
    // https://www.w3schools.com/howto/howto_js_remove_class.asp
    numberOfCartItemsElement.classList.remove("show");
  }
}

// Reference for help on showAlertMessage function: https://github.com/matkat99/sleepoutside/blob/v3-team7/src/js/utils.mjs
export function showAlertMessage(message, scroll = true) {
  const mainElement = document.querySelector("main");

  const alertElement = document.createElement("div");

  alertElement.classList.add("alert-message");

  alertElement.innerHTML = `${message} <span class="delete-message">X</span>`;

  // Reference for prepend() DOM element: https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
  mainElement.prepend(alertElement);

  alertElement.addEventListener("click", function(event) {
   // Reference for event target in JavaScript: https://www.w3schools.com/jsref/event_target.asp
    // event.target.tagName could also be used
    // Reference for className: https://stackoverflow.com/questions/11026056/getting-the-class-of-the-element-that-fired-an-event-using-jquery
    if (event.target.className == "delete-message") {
      // Reference for removeChild() DOM element: https://www.w3schools.com/jsref/met_node_removechild.asp
      mainElement.removeChild(this);
    }
  });

  // Reference for window scrollTo(): https://www.w3schools.com/jsref/met_win_scrollto.asp
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

// Remove previous alerts.
export function removePreviousAlerts() {
  const alertElements = document.querySelectorAll(".alert-message");

  const mainElement = document.querySelector("main");

  // Reference for forEach(): https://www.w3schools.com/jsref/jsref_foreach.asp
  alertElements.forEach( alertElement => mainElement.removeChild(alertElement) ); 
}