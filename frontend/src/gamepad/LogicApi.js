import { Controller }from '../logic/Controller';
import { Base } from "../logic/Base";
import Blockly from 'node-blockly/browser';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let historyStep = 0;

export async function move(op) {
    Controller.controller.begin.task.add(new Base('sys', 'move_' + op));
    await sleep(500 * historyStep++);
    Controller.step();
}

export function run(code) {
    Blockly.JavaScript.addReservedWords('code');
    historyStep = 0;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}