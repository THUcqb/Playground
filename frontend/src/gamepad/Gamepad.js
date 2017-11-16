import React, { Component } from 'react';
import GameActions from './GameActions';
import Blockly from 'node-blockly/browser';
import './BlocklyDef';
import { run } from './LogicApi';
import MessageBar from '../utils/MessageBar';

/**
 * The gamepad field which consists of a action bar and the blocklyDiv.
 */
class Gamepad extends Component {

    static workspace = null;

    constructor(props) {
        super(props);
        Gamepad.clearWorkspace.bind(this);
        Gamepad.submitWorkspace.bind(this);
        Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        Blockly.JavaScript.addReservedWords('highlightBlock');
    }

    componentDidMount() {
        Gamepad.workspace = Blockly.inject('blocklyDiv', {
            toolbox: "<xml><category name=\"Action\" colour=\"#935ba5\"></category></xml>",
            grid: {spacing: 20,
                    length: 3,
                    colour: '#ccc',
                    snap: true},
            zoom:
                {controls: true,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2},

        });
    }

    /**
     * Clear the coding workspace.
     */
    static clearWorkspace() {
        Gamepad.workspace.clear();
    }

    /**
     * View the code converted from blockly in the workspace.
     */
    static viewWorkspace() {
        let code = Blockly.JavaScript.workspaceToCode(Gamepad.workspace);
        MessageBar.show(code);
    }

    /**
     * Submit and run the code.
     */
    static submitWorkspace() {
        window.LoopTrap = 1000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
        run(Blockly.JavaScript.workspaceToCode(Gamepad.workspace));
    }

    /**
     * Single step mode
     */
    static singleStep() {

    }

    /**
     * Export the current blockly workspace
     * @returns {string}
     */
    static dumpWorkspace() {
        let xml = Blockly.Xml.workspaceToDom(Gamepad.workspace);
        let xml_text = Blockly.Xml.domToText(xml);
        return xml_text;
    }

    /**
     * Load workspace from saved text in xml form
     * @param xml_text
     */
    static loadWorkspace(xml_text) {
        Gamepad.clearWorkspace();
        let xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, Gamepad.workspace);
    }

    /**
     * Return the score of the current workspace
     * @returns {number}
     */
    static getScore() {
        return 1;
    }

    render() {
        return (
            <div className="Operation">
                <GameActions
                    clear={Gamepad.clearWorkspace}
                    view={Gamepad.viewWorkspace}
                    submit={Gamepad.submitWorkspace}
                    step={Gamepad.singleStep}
                />
                <div id="blocklyDiv" style={{height: "70vh", width: "100%"}}/>
            </div>
        );
    }
}

export default Gamepad;
