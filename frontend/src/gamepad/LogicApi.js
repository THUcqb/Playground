import { Controller }from '../logic/Controller';
import { Base } from "../logic/Base";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let historyStep = 0;

export async function move(op) {
    Controller.controller.begin.task.add(new Base('sys', 'move_' + op));
    await sleep(500 * historyStep++);
    console.log(op);
    //  TODO: move the await to painter if paint continuously.
    Controller.controller.step();
}

export function reset() {
    historyStep = 0;
    //  Controller.controller = new Controller();
    //  TODO: properly reset the map.
}

export default function run(code) {
    // Blockly.JavaScript.addReservedWords('code');
    reset();
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}