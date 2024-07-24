import { loginRequest } from "./externalServices.mjs";
import { showAlertMessage, removePreviousAlerts, setLocalStorage, getLocalStorage } from "./utils.mjs";
// Reference for jwt-decode
import { jwtDecode } from "jwt-decode";

const tokenKey = "savedToken";

export async function login(credentials, redirect = "/") {
    try {
        // The credentials are {email, password}.
        const getToken = await loginRequest(credentials);
        setLocalStorage(tokenKey, getToken);

        if (getToken) {
            redirect = "/orders/";
        }

        // If no redirect is provided, then the default redirect "/" will send the user home.
        window.location = redirect;
    }
    catch (error) {
        removePreviousAlerts();
        // Reference for try catch error message: https://www.w3schools.com/js/js_errors.asp
        // The loop is in case there is more than one error message.
        showAlertMessage(error.message.message);
    }
}

// This function can be imported for any page we want protected.
// If the token is valid, the page will be returned. Otherwise, the
// page will be redirected to the login page.
export function checkLogin() {
    // Get the token from localStorage.
    // This could also have been written this way:
    // const token = getLocalStorage("savedToken");
    const token = getLocalStorage(tokenKey);

    // This checks the validity of the token.
    // The function isTokenValid will return either true or false.
    const valid = isTokenValid(token);

    // If the token is NOT valid, do this:
    if (!valid) {
        // Reference for removing item from localStorage:
        // https://www.w3schools.com/jsref/met_storage_removeitem.asp
        localStorage.removeItem(tokenKey);

        // Get the current url from the browser.
        const currentUrl = window.location;
        console.log(currentUrl);
        
        // Redirect window.location.
        // Reference for location.pathname: 
        // https://www.w3schools.com/jsref/prop_loc_pathname.asp
        window.location = `/login/index.html?redirect=${url.pathname}`;
    }
    // If they are logged in, return the token.
    else {
        return token;
    }
}

function isTokenValid(token) {
    // Check to see if token was passed in.
    if (token) {
        // Decode the token.
        const decodedToken = jwtDecode(token);

        // Get the current date.
        const currentDate = new Date();

        // JWT expiration is in seconds.
        // The time from our current date is in milliseconds.
        // 1s = 1000 ms
        // This means token has expired:
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token has expired.");
            return false;
        }
        else {
            console.log("Token is valid.");
            return true;
        }
    }
    else {
        return false;
    }
}
