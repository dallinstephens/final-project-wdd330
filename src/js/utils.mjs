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
  // join("") removes the comma
  // Reference for insertAdjacentHTML  
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}