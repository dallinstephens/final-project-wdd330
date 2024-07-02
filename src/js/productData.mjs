function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    // same thing as "function(data) { return data; }"
    .then((data) => data);
}

export async function findProductById(id) {
  const products = await getData();
  // same thing as "function(item) { return item.Id === id; }"
  return products.find((item) => item.Id === id);
}
