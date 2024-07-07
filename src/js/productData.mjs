// Reference for environment variable: https://byui-cit.github.io/wdd330/ponder/v3/team05.html
// This uses the environment variable set up in the .env file.
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

// export function getData(category = "tents") {
//   return fetch(`../json/${category}.json`)
//     .then(convertToJson)
//     // same thing as "function(data) { return data; }"
//     .then((data) => data);
// }

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

// export async function findProductById(id) {
//   const products = await getData();
//   // same thing as "function(item) { return item.Id === id; }"
//   return products.find((item) => item.Id === id);
// }
