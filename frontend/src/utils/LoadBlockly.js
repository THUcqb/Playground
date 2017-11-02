import axios from 'axios';
import { URL, LOADTOOLBOX} from '../config/Api';

/**
 * Request the toolbox xml received as a string.
 * @param level
 * @returns {Promise.<T>}
 */
export function loadToolbox(level) {
    return axios
        .post(URL + LOADTOOLBOX, {
            level,
        })
        .then(function (response) {
            return {OK: (response.data.status === 'successful'), toolbox: response.data.toolbox};
        })
}
