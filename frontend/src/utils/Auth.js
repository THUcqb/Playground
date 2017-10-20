import axios from 'axios';
import _ from 'lodash';
import store from './store';
import { setToken } from '../actions'
import { URL, SIGNIN, SIGNUP } from '../config/Api';

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
      if (response.data.status === 'successful')
        store.dispatch(setToken(response.data.token));
      return {OK: (response.data.status === 'successful')};
    })
/*
    .catch(function (error) {
      // raise different exception if due to invalid credentials
      if (_.get(error, 'response.status') === 400) {
        throw new InvalidCredentialsException(error);
      }
      throw error;
    });
*/
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
            return {OK: (response.data.status === 'successful')}
        });
}

export function loggedIn() {
  return store.getState().token == null;
}
