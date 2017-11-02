import axios from 'axios';
import { URL, LOADTOOLBOX} from '../config/Api';
import Gamepad from "../gamepad/Gamepad";

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
            if (response.data.status === 'Successful')
                Gamepad.workspace.updateToolbox(response.data.toolbox);
        })
}
