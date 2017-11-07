import React, { Component } from 'react';
import GameActions from './GameActions';
import Blockly from 'node-blockly/browser';
import './BlocklyDef';
import { run } from './LogicApi';

/**
 * The gamepad field which consists of a action bar and the blocklyDiv.
 */
class Gamepad extends Component {

    static workspace = null;

    constructor(props) {
        super(props);
        this.clearWorkspace.bind(this);
        this.submitWorkspace.bind(this);
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
    clearWorkspace() {
        Gamepad.workspace.clear();
    }

    /**
     * View the code converted from blockly in the workspace.
     */
    viewWorkspace() {
        alert(Blockly.JavaScript.workspaceToCode(Gamepad.workspace));
    }

    /**
     * Submit and run the code.
     */
    submitWorkspace() {
        window.LoopTrap = 1000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
        run(Blockly.JavaScript.workspaceToCode(Gamepad.workspace));
    }

    render() {
        return (
            <div className="Operation">
                <GameActions
                    clear={this.clearWorkspace}
                    view={this.viewWorkspace}
                    submit={this.submitWorkspace}
                />
                <div id="blocklyDiv" style={{height: "70vh", width: "100%"}}/>
            </div>
        );
    }
}

export default Gamepad;
