import { Controller }from '../logic/Controller';
import { Base } from "../logic/Base";
import Blockly from 'node-blockly/browser';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let historyStep = 0;
let runTime = 0;

export async function move(op) {
    const thisRunTime = runTime;
    await sleep(500 * historyStep++);
    if (thisRunTime === Controller.getLevelTime())
    {
        Controller.controller.begin.task.add(new Base('sys', 'move_' + op));
        Controller.step();
    }
}

export function run(code) {
    Blockly.JavaScript.addReservedWords('code');
    historyStep = 0;
    runTime = Controller.getLevelTime();
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}