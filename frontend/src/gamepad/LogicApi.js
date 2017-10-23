import { Controller }from '../logic/Controller';
import { Base } from "../logic/Base";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let historyStep = 0;

export async function move(op) {
    Controller.controller.begin.task.add(new Base('sys', 'move_' + op));
    await sleep(300 * historyStep++);
    Controller.controller.step();
}

export function reset() {
    historyStep = 0;
    Controller.controller.init();
}

export default function run(code) {
    // Blockly.JavaScript.addReservedWords('code');
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}