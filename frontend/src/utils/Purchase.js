import axios from 'axios';
import { URL, PURCHASE} from '../config/api';
import {getCookie} from "./Auth";

export function purchase(VIPtype) {
    return axios
        .post(URL + PURCHASE, {
            token: getCookie('token'),
            VIPtype,
        })
        .then((response) => {
            return {OK: response.data.status === 'Successful'}
        })
}
