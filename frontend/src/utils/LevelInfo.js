import axios from 'axios';
import { URL, LOADLEVELINFO, SAVELEVELINFO, LOADLEVELSOLUTION} from '../config/api';
import { getCookie } from "./Auth";
import Gamepad from '../gamepad/Gamepad';

export function loadLevelsInfo() {
    return axios
        .post(URL + LOADLEVELINFO, {
            token: getCookie('token'),
        })
        .then(function (response) {
            return {OK: (response.data.status === 'Successful'), levelsInfo: response.data};
        })
}

export function loadLevelSolution(level, ifLoad) {
    return axios
        .post(URL + LOADLEVELSOLUTION, {
            token: getCookie('token'),
            level,
        })
        .then(function (response) {
            if (response.data.status === 'Successful' && ifLoad)
                Gamepad.loadWorkspace(response.data.solution);
            return {OK: response.data.status === 'Successful', solution: response.data.solution, stdSolution: response.data.standard}
        })
}

export function saveLevelInfo(level, stars) {
    return axios
        .post(URL + SAVELEVELINFO, {
            token: getCookie('token'),
            level,
            stars,
            solution: Gamepad.dumpWorkspace(),
        })
        .then(function (response) {
            return {OK: (response.data.status === 'Successful')};
        })
}

