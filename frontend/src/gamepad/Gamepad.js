import React, { Component } from 'react';
import GameActions from './GameActions';
import Blockly from 'node-blockly/browser';
import './BlocklyDef';
import { run, prepareDebug, singleStep, finishDebug } from './GamepadLogic';

const blocklyWorkspaceXml = {
    toolbox: "<xml><category name=\"Action\" colour=\"#935ba5\"></category></xml>",
    grid: {
        spacing: 20,
        length: 3,
        colour: '#FFF',
        snap: true
    },
    zoom: {
        startScale: 1.5,
    }
};

const gamepadStyle = {
    width: "100%",
    minHeight: "256px",
    display: "flex",
    flexDirection: "column"
};

const blocklyDivStyle = ({
    position: "absolute",
});

/**
 * The gamepad field which consists of a action bar and the blocklyDiv.
 */
class Gamepad extends Component {

    static workspace = null;

    constructor(props) {
        super(props);
        Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        Blockly.JavaScript.addReservedWords('highlightBlock');
        Blockly.JavaScript.addReservedWords('code');
    }

    componentDidMount() {
        Gamepad.workspace = Blockly.inject('blocklyDiv', blocklyWorkspaceXml);
        const blocklyArea = document.getElementById('blocklyArea');
        const blocklyDiv = document.getElementById('blocklyDiv');
        const onresize = function() {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            let element = blocklyArea;
            let x = 0;
            let y = 0;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent;
            } while (element);
            // Position blocklyDiv over blocklyArea.
            blocklyDiv.style.left = x + 'px';
            blocklyDiv.style.top = y + 'px';
            blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
            blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        };
        window.addEventListener('resize', onresize, false);
        onresize();
        Blockly.svgResize(Gamepad.workspace);
    }

    /**
     * Clear the coding workspace.
     */
    static clearWorkspace() {
        Gamepad.workspace.clear();
    }

    /**
     * Submit and run the code.
     */
    static submitWorkspace() {
        run(Blockly.JavaScript.workspaceToCode(Gamepad.workspace));
    }

    /**
     * handle debug start and stop
     */
    static debugWorkspace(debugging) {
        if (debugging) {
            prepareDebug(Blockly.JavaScript.workspaceToCode(Gamepad.workspace));
        }
        else {
            finishDebug();
        }
    }

    /**
     * Single step mode
     */
    static debugStep() {
        singleStep();
    }

    /**
     * Export the current blockly workspace
     * @returns {string}
     */
    static dumpWorkspace() {
        const xml = Blockly.Xml.workspaceToDom(Gamepad.workspace);
        return Blockly.Xml.domToText(xml);
    }

    /**
     * Load workspace from saved text in xml form
     * @param xml_text
     */
    static loadWorkspace(xml_text) {
        Gamepad.clearWorkspace();
        const xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, Gamepad.workspace);
    }

    /**
     * Return the score of the current workspace
     * @returns {number}
     */
    static getScore(standardSolution) {
        if (typeof standardSolution === 'string' && standardSolution.length > 0) {
            return parseInt(3 * standardSolution.length / (Gamepad.dumpWorkspace().length));
        }
        else {
            return 3;
        }
    }

    render() {
        return (
            <div style={gamepadStyle}>
                <GameActions
                    style={{flex: 1}}
                    clear={Gamepad.clearWorkspace}
                    submit={Gamepad.submitWorkspace}
                    debug={(debugging) => Gamepad.debugWorkspace(debugging)}
                    step={Gamepad.debugStep}
                />
                <div id="blocklyArea" style={{flex: 1}}>
                    <div id="blocklyDiv" style={blocklyDivStyle}/>
                </div>
            </div>
        );
    }
}

export default Gamepad;
