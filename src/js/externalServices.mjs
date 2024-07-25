// Reference for environment variable: https://byui-cit.github.io/wdd330/ponder/v3/team05.html
// This uses the environment variable set up in the .env file.
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(response) {
  // This converts our response body to JSON before checking to see if it is okay.
  // The variable jsonResponse is the body of the response from the server that we converted to JSON.
  const jsonResponse = await response.json();

  if (response.ok) {
    return jsonResponse;
  } else {
      throw { name: "servicesError", message: jsonResponse };
    // throw new Error("Bad Response");
  }
}

// THIS IS USED IF HAVE A SERVER TO GET THE PRODUCT DATA:
// export async function getProductsByCategory(category) {
//   const response = await fetch(baseURL + `products/search/${category}`);
//   const data = await convertToJson(response);
//   return data.Result;
// }

// THIS IS USED TO GET PRODUCTS FROM A FILE ON MY SYSTEM:
export function getProductsByCategory(category) {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    // same thing as "function(data) { return data; }"
    .then((data) => data);
}

// THIS WAS USED TO GET PRODUCTS FROM A FILE ON MY SYSTEM
// DURING THE EARLY TEAM ACTIVITIES:
// export function getData(category = "tents") {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     // same thing as "function(data) { return data; }"
//     .then((data) => data);
// }

// THIS IS USED IF HAVE A SERVER TO GET THE PRODUCT DATA:
// export async function findProductById(id) {
//   const response = await fetch(baseURL + `product/${id}`);
//   const product = await convertToJson(response);
//   return product.Result;
// }

// THIS WAS USED TO GET PRODUCTS FROM A FILE ON MY SYSTEM
// DURING THE EARLY TEAM ACTIVITIES:
// export async function findProductById(id) {
//   const products = await getData();
//   // same thing as "function(item) { return item.Id === id; }"
//   return products.find((item) => item.Id === id);
// }

// THIS IS USED TO GET PRODUCTS FROM A FILE ON MY SYSTEM:
export async function findProductById(id, category) {
  // THIS WAS THE ORIGINAL IN THE EARLY TEAM ACTIVITIES:
  // const products = await getData();
  const products = await getProductsByCategory(category);
  // same thing as "function(item) { return item.Id === id; }"
  return products.find((item) => item.Id === id);
}

export async function checkoutInExternalServices(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  
    },
    body: JSON.stringify(payload)
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

// The credentials are {email, password}.
export async function loginRequest(credentials) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  // Does accessToken come from the module called jwt-decode?
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  console.log(response);
  return response;
}