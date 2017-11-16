import Blockly from 'node-blockly/browser';
import Interpreter from 'js-interpreter';
import { Controller }from '../logic/Controller';
import { Base } from "../logic/Base";
import Gamepad from './Gamepad';

/**
 * To stop adding things when map status reloaded.
 * @type {number}
 */
let runTime = 0;

/**
 * Move toward a function.
 * @param op
 */
export function move(op) {
    Controller.controller.begin.task.add(new Base('sys', 'move_' + op));
    Controller.step();
}

/**
 * Highlight the running block.
 * @param id
 */
function highlightBlock(id) {
    Gamepad.workspace.highlightBlock(id);
}

let interpreter = null;

function initApi(interpreter, scope) {
    // Add an API function for the move() block.
    let wrapper = function (op) {
        return interpreter.createPrimitive(move(op));
    };
    interpreter.setProperty(scope, 'move', interpreter.createNativeFunction(wrapper));

    // Add an API function for the highlightBlock(id) block.
    wrapper = function (id) {
        return interpreter.createPrimitive(highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
}

/**
 * step
 */
function autoStep(runTime) {
    if (runTime === Controller.getLevelTime() && interpreter.step()) {
        window.setTimeout(() => autoStep(runTime), 20);
    }
}

/**
 * Run the code from workspace
 * @param code
 */
export function run(code) {
    Blockly.JavaScript.addReservedWords('code');

    interpreter = new Interpreter(code, initApi);
    autoStep(Controller.getLevelTime());
}
