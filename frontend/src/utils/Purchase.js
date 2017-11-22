import axios from 'axios';
import { URL, PURCHASE} from '../config/api';
import {getCookie} from "./Auth";

export function purchase(VIPType) {
    return axios
        .post(URL + PURCHASE, {
            token: getCookie('token'),
            VIPType,
        })
        .then((response) => {
            return {OK: response.data.status === 'Successful'}
        })
}
