import axios from 'axios';
import {URL, SAVEDIYMAP, GETDIYMAPS} from '../config/api';
import {getCookie} from "./Auth";

/**
 * Request the toolbox xml received as a string.
 * @returns {Promise.<T>}
 */
export function loadDIYMaps()
{
    return axios
        .post(URL + GETDIYMAPS, {
            token: getCookie("token"),
        })
        .then(function (response)
        {
            return {OK: (response.data.status === "Successful"), map: response.data.map};
        })
}

/**
 *
 * @param {String} name
 * @param {Map} map
 * @returns {Promise.<T>}
 */
export function saveDIYMap(name, map)
{
    return axios
        .post(URL + SAVEDIYMAP, {
            token: getCookie("token"),
            mapinfo: map.stringData(),
            mapname: name,
            solution: map.solution,
            mapid: map.id,
        })
        .then(function (response)
        {
            return {OK: (response.data.status === 'Successful')};
        })
}