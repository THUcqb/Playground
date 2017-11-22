import axios from 'axios';
import { URL, LOADLEVELINFO, SAVELEVELINFO, LOADLEVELSOLUTION} from '../config/api';
import { getCookie } from "./Auth";
import Gamepad from '../gamepad/Gamepad';
import {Scene} from '../Scene';

export function loadLevelsInfo() {
    return axios
        .post(URL + LOADLEVELINFO, {
            token: getCookie('token'),
        })
        .then(function (response) {
            return {OK: (response.data.status === 'Successful'), levelsInfo: response.data};
        })
}

export function loadLevelSolution(level) {
    return axios
        .post(URL + LOADLEVELSOLUTION, {
            token: getCookie('token'),
            level
        })
        .then(function (response) {
            if (response.data.status === 'Successful')
                Gamepad.loadWorkspace(response.data.solution);
        })
}

export function loadLevelStandardSolution() {
    return axios
        .post(URL + LOADLEVELSOLUTION, {
            token: getCookie('token'),
            level: Scene.singleton.state.nowLevel,
        })
        .then(function (response) {
            return {OK: response.data.status === 'Successful', solution: response.data.solution}
        })
}

export function saveLevelInfo(level) {
    return axios
        .post(URL + SAVELEVELINFO, {
            token: getCookie('token'),
            level,
            stars: Gamepad.getScore(),
            solution: Gamepad.dumpWorkspace(),
        })
        .then(function (response) {
            return {OK: (response.data.status === 'Successful')};
        })
}

