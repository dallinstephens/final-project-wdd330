import { getLocalStorage } from "./utils.mjs";
import { checkoutInExternalServices } from "./externalServices.mjs"

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    finalPriceTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    initiate: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSubtotal();
    },
    calculateItemSubtotal: function() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        const itemSubtotalElement = document.querySelector(
            this.outputSelector + " #item-subtotal"
        );

        const numberOfItemsElement = document.querySelector(
            this.outputSelector + " #number-of-items"
        );

        numberOfItemsElement.innerText = this.list.length;
        
        // calculate the total of all the items in the cart
        const finalPriceAmounts = this.list.map((item) => item.FinalPrice);
        this.finalPriceTotal = (finalPriceAmounts.reduce((sum, itemFinalPrice) => sum + itemFinalPrice)).toFixed(2);
        itemSubtotalElement.innerText = "$" + this.finalPriceTotal;

        this.calculateOrderTotal();
    },
    calculateOrderTotal: function() {
        // calculate the shipping and tax amounts. Then use them along with the cart total to figure out the order total
        // Reference: https://byui-cit.github.io/wdd330/ponder/v3/team06.html
        // Tax: Use 6% for sales tax.
        // Shipping: Use $10 for the first item plus $2 for each additional item for shipping.
        
        this.tax = (this.finalPriceTotal * 0.06).toFixed(2);
        this.shipping = (10 + (2 * (this.list.length - 1))).toFixed(2);

        // Reference for parseFloat(): https://www.w3schools.com/jsref/jsref_parsefloat.asp
        // parseFloat() is used to change a change a string into a number. 
        // parseFloat() is needed because toFixed() in the code above changed the numbers into a string.
        this.orderTotal = (parseFloat(this.finalPriceTotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2);

        // display the totals.
        this.displayOrderTotals();
    },
    displayOrderTotals: function() {
        // once the totals are all calculated, display them in the order summary page
        const shippingElement = document.querySelector(this.outputSelector + " #shipping");
        const taxElement = document.querySelector(this.outputSelector + " #tax");
        const orderTotalElement = document.querySelector(this.outputSelector + " #order-total");

        shippingElement.innerText = "$" + this.shipping;
        taxElement.innerText = "$" + this.tax;
        orderTotalElement.innerText = "$" + this.orderTotal;
    },
    checkout: async function (form) {
        // The formDataToJSON function is used to make a key value pair, 
        // where each name in the form is a key and each input from the 
        // user is the value.
        const json = formDataToJSON(form);
        // This adds the order date, order total, tax, shipping, and 
        // simplified package items to the json object variable.
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        // console.log(json);
        try {
            // This passes the json as they payload to the checkoutInExternalServices function in externalServices.mjs.
            const response = await checkoutInExternalServices(json);
            console.log(response); // Example output: {orderId: 1923, message: 'Order Placed'}
        }
        catch (error) {
            console.log(error);
        }
    },
};

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function(value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

// The function packageItems takes the items currently stored in the cart (localStorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process.
    // Array.map would be perfect for this.
    const simplifiedItems = items.map((item) => {
        // console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

export default checkoutProcess;