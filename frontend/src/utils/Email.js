import axios from 'axios';
import {
    URL,
    EMAILACTIVATEREQUEST,
    EMAILACTIVATESUBMIT,
    EMAILRETRIEVEREQEUST,
    EMAILRETRIEVESUBMIT
} from '../config/api';
import { getCookie } from "./Auth";

export function emailActivateRequest() {
    return axios
        .post(URL + EMAILACTIVATEREQUEST, {
            token: getCookie('token'),
        });
}

export function emailActivateSubmit(code) {
    return axios
        .post(URL + EMAILACTIVATESUBMIT, {
            token: getCookie('token'),
            code
        })
}

export function emailRetrieveRequest(username, email) {
    return axios
        .post(URL + EMAILRETRIEVEREQEUST, {
            username,
            email
        });
}

export function emailRetrieveSubmit(username, code) {
    return axios
        .post(URL + EMAILRETRIEVESUBMIT, {
            username,
            code
        })
}
