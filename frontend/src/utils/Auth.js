import axios from 'axios';
import { URL, SIGNIN, SIGNUP, GETINFO } from '../config/api';

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

/**
 * The sign in function. Called when the user press the sign in button.
 * @param username
 * @param password
 * @returns {Promise.<T>}
 */
export function signin(username, password) {
    return axios
        .post(URL + SIGNIN, {
            username,
            password,
        })
        .then(function (response) {
            return {OK: (response.data.status === 'Successful'), token: response.data.token};
        })
}

/**
 * The sign up function.
 * @param username
 * @param password
 * @param phonenumber
 * @param email
 */
export function signup(username, password, phonenumber, email) {
    return axios
        .post(URL + SIGNUP, {
            username,
            password,
            phonenumber,
            email,
        })
        .then((response) => {
            return {OK: (response.data.status === 'Successful')}
        });
}

export function getInfoWithCookies(token) {
    return axios
        .post(URL + GETINFO, {
            token
        })
        .then((response) => {
            return {
                OK: (response.data.status === 'Successful'),
                username: response.data.username,
                phonenumber: response.data.phonenumber,
                email: response.data.email,
            }
        })

}

export function getCookie(cookiename)
{
    // Get name followed by anything except a semicolon
    let cookieString=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,"") : "");
}
