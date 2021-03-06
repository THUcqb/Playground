import React, { Component } from 'react';
import Blockly from 'node-blockly/browser';
import Dialog from 'material-ui/Dialog';
import {Scene} from '../Scene';

const blocklySolutionWorkspaceXml= {
    readOnly: true,
    grid: {
        spacing: 20,
        length: 3,
        colour: '#FFF',
        snap: true
    },
    zoom: {
        startScale: 1.2,
    }
};

const blocklySolutionDivStyle = ({
    position: "absolute",
    height: 240,
    width: 240,
});

/**
 * The show solution field which consists of only one blocklyDiv.
 */
class GamepadSolutionDialog extends Component {

    componentDidUpdate() {
        if (this.props.open)
        {
            this.workspace = Blockly.inject('blocklySolutionDiv', blocklySolutionWorkspaceXml);
            const xml = Blockly.Xml.textToDom(Scene.singleton.nowStdSolution);
            Blockly.Xml.domToWorkspace(xml, this.workspace);
        }
    }

    render() {
        return (
            <Dialog open={this.props.open}
                    onRequestClose={this.props.handleCloseSolution}
            >
                <div id="blocklySolutionDiv" style={blocklySolutionDivStyle}/>
            </Dialog>
        );
    }
}

export default GamepadSolutionDialog;
