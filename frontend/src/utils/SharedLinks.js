import axios from 'axios';
import { URL, SHAREGENERATELINK, SHAREGETCONTEXT } from '../config/api';
import { getCookie } from "./Auth";

export function shareGenerateLink() {
    //TODO://type = Controller.gettype//mapid = ..

    return axios
        .post(URL + SHAREGENERATELINK, {
            token: getCookie('token'), type: 'common', level: 1, // mapid: id,// level: id,
        })
        .then(function (response) {
            return {OK: (response.data.status === 'Successful'), link: response.data.link};
        })
}

export function shareGetContext(sharedCode) {
    return axios
        .post(URL + SHAREGETCONTEXT, {
            token: getCookie('token'),
            link: sharedCode
        })
        .then(function (response) {
            //TODO: load the map
            if (response.data.status === "Successful")
            {
                // Gamepad.loadWorkspace(response.data.solution);
                // Controller.somehowload(response.data.mapinfo);
            }
            return {
                OK: response.data.status === "Successful", owner: response.data.owner,
                level: response.data.level, mapname: response.data.mapname,
            }
        })
}


