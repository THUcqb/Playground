import Blockly from 'node-blockly/browser';
import Interpreter from 'js-interpreter';
import { Controller }from '../logic/Controller';
import { Base } from "../logic/Base";
import Gamepad from './Gamepad';
import { Scene } from '../Scene';

/**
 * Move toward a function.
 * @param op
 */
export function move(op) {

    if (String(op) === 'forward') {
        Controller.controller.begin.task.add(new Base('sys', 'move'));
    }
    else {
        Controller.controller.begin.task.add(new Base('sys', 'move_' + op));
    }

    Controller.step();
}

export function turn(op) {

    Controller.controller.begin.task.add(new Base('sys', 'turn_' + op));
    
    Controller.step();
}

export function check(op)
{

    if (Base.run_state.cur.check(Base.run_state.tr_check(op)) === "runnable") 
    {
        return true;
    }

    return false;
}


let highlighting = false;

/**
 * Highlight the running block.
 * @param id
 */
function highlightBlock(id) {
    highlighting = true;
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
 * automatic executing
 */
function autoStep(runTime) {
    if (runTime === Controller.getLevelTime() && interpreter.step()) {
        while (!highlighting && interpreter.step())
            ;
        highlighting = false;
        window.setTimeout(() => autoStep(runTime), 1000);
    }
}

/**
 * Run the code from workspace
 * @param code
 */
export function run(code) {
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

    interpreter = new Interpreter(code + 'highlightBlock("xxx");', initApi);
    Scene.handleRestart();
    autoStep(Controller.getLevelTime());
}

/**
 * Execute single step
 * @returns {boolean} - if nothing to run, return false
 */
export function singleStep() {
    //  Increase step granularity.
    while (!highlighting && interpreter.step())
        ;
    highlighting = false;
    return interpreter.step();
}

export function prepareDebug(code) {
    interpreter = new Interpreter(code + 'highlightBlock("xxx");', initApi);
    Scene.handleRestart();
    //  Move highlight to the first block
    singleStep();
}

export function finishDebug(code) {
    Scene.handleRestart();
}