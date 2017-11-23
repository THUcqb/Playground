import axios from 'axios';
import { URL, SHAREGENERATELINK, SHAREGETCONTEXT } from '../config/api';
import { getCookie } from "./Auth";
import {Controller} from "../logic/Controller";
import {Scene} from "../Scene";
import {Base} from '../logic/Base';
import Gamepad from "../gamepad/Gamepad";

export function shareGenerateLink() {
    const currentMapType = Controller.getLastType();

    const postData = {
        token: getCookie('token'),
        type: currentMapType,
    };
    if (currentMapType === 'common') {
        postData['level'] = Scene.singleton.state.nowLevel;
    }
    else {
        postData['mapid'] = Base.bmap.id;
    }

    return axios
        .post(URL + SHAREGENERATELINK, postData)
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
            if (response.data.status === "Successful")
            {
                Gamepad.loadWorkspace(response.data.solution);
                if (response.data.level === undefined) {
                    Scene.singleton.handleChooseSharedLevel(response.data.mapinfo);
                }
                else {
                    Scene.singleton.handleChooseLevel(response.data.level);
                }
            }
            return {
                OK: response.data.status === "Successful",
                owner: response.data.owner,
                mapname: response.data.mapname,
            }
        })
}

