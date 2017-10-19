import React, { Component } from 'react';
import GameActions from './GameActions';
import Blockly from 'node-blockly/browser';

const toolbox = (
    <xml id="toolbox" style={{display: "none"}}>
        <category name="Logic" colour="%{BKY_LOGIC_HUE}">
            <block type="controls_if"/>
            <block type="logic_compare"/>
            <block type="logic_operation"/>
            <block type="logic_negate"/>
            <block type="logic_boolean"/>
            <block type="logic_null"/>
            <block type="logic_ternary"/>
        </category>
        <category name="Loops" colour="%{BKY_LOOPS_HUE}">
            <block type="controls_repeat_ext">
                <value name="TIMES">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="controls_whileUntil"/>
            <block type="controls_for">
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
                <value name="BY">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            <block type="controls_forEach"/>
            <block type="controls_flow_statements"/>
        </category>
        <category name="Math" colour="%{BKY_MATH_HUE}">
            <block type="math_number"/>
            <block type="math_arithmetic">
                <value name="A">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="B">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            <block type="math_single">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">9</field>
                    </shadow>
                </value>
            </block>
            <block type="math_trig">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">45</field>
                    </shadow>
                </value>
            </block>
            <block type="math_constant"/>
            <block type="math_number_property">
                <value name="NUMBER_TO_CHECK">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            <block type="math_round">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">3.1</field>
                    </shadow>
                </value>
            </block>
            <block type="math_on_list"/>
            <block type="math_modulo">
                <value name="DIVIDEND">
                    <shadow type="math_number">
                        <field name="NUM">64</field>
                    </shadow>
                </value>
                <value name="DIVISOR">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="math_constrain">
                <value name="VALUE">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
                <value name="LOW">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="HIGH">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            <block type="math_random_int">
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            <block type="math_random_float"/>
        </category>
        <category name="Text" colour="%{BKY_TEXTS_HUE}">
            <block type="text"/>
            <block type="text_join"/>
            <block type="text_append">
                <value name="TEXT">
                    <shadow type="text"/>
                </value>
            </block>
            <block type="text_length">
                <value name="VALUE">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_isEmpty">
                <value name="VALUE">
                    <shadow type="text">
                        <field name="TEXT"/>
                    </shadow>
                </value>
            </block>
            <block type="text_indexOf">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR">{}</field>
                    </block>
                </value>
                <value name="FIND">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_charAt">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR">{}</field>
                    </block>
                </value>
            </block>
            <block type="text_getSubstring">
                <value name="STRING">
                    <block type="variables_get">
                        <field name="VAR">{}</field>
                    </block>
                </value>
            </block>
            <block type="text_changeCase">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_trim">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_print">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_prompt_ext">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
        </category>
        <category name="Lists" colour="%{BKY_LISTS_HUE}">
            <block type="lists_create_with">
                <mutation items="0"/>
            </block>
            <block type="lists_create_with"/>
            <block type="lists_repeat">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">5</field>
                    </shadow>
                </value>
            </block>
            <block type="lists_length"/>
            <block type="lists_isEmpty"/>
            <block type="lists_indexOf">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR"/>
                    </block>
                </value>
            </block>
            <block type="lists_getIndex">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR">{}</field>
                    </block>
                </value>
            </block>
            <block type="lists_setIndex">
                <value name="LIST">
                    <block type="variables_get">
                        <field name="VAR">{}</field>
                    </block>
                </value>
            </block>
            <block type="lists_getSublist">
                <value name="LIST">
                    <block type="variables_get">
                        <field name="VAR">{}</field>
                    </block>
                </value>
            </block>
            <block type="lists_split">
                <value name="DELIM">
                    <shadow type="text">
                        <field name="TEXT">,</field>
                    </shadow>
                </value>
            </block>
            <block type="lists_sort"/>
        </category>
        <category name="Colour" colour="%{BKY_COLOUR_HUE}">
            <block type="colour_picker"/>
            <block type="colour_random"/>
            <block type="colour_rgb">
                <value name="RED">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
                <value name="GREEN">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
                <value name="BLUE">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            <block type="colour_blend">
                <value name="COLOUR1">
                    <shadow type="colour_picker">
                        <field name="COLOUR">#ff0000</field>
                    </shadow>
                </value>
                <value name="COLOUR2">
                    <shadow type="colour_picker">
                        <field name="COLOUR">#3333ff</field>
                    </shadow>
                </value>
                <value name="RATIO">
                    <shadow type="math_number">
                        <field name="NUM">0.5</field>
                    </shadow>
                </value>
            </block>
        </category>
        <sep/>
        <category name="Variables" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"/>
        <category name="Functions" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"/>
    </xml>
);

/**
 * The gamepad field consists of a action bar and the blocklyDiv.
 */
class Gamepad extends Component
{
    constructor(props)
    {
        super(props);
        this.resetWorkspace.bind(this);
        this.submitWorkspace.bind(this);
        this.viewWorkspaceCode.bind(this);
    }
    componentDidMount()
    {
        this.workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});
    }

    /**
     * Clear the coding workspace.
     */
    resetWorkspace()
    {
    //    TODO: clear the workspace.
    }

    /**
     * Submit and run the code.
     */
    submitWorkspace()
    {
    //    TODO: generate run the snake.
    }

    /**
     * View the code in specific language.
     */
    viewWorkspaceCode()
    {
        let code = Blockly.JavaScript.workspaceToCode(this.workspace);

    //  TODO: show the code properly.
        alert(code);
    }

    render()
    {
        return(
            <div className="Operation">
                <GameActions
                    reset={this.resetWorkspace}
                    submit={this.submitWorkspace}
                    view={this.viewWorkspaceCode}
                />
                <div id="blocklyDiv" style={{height: "70vh", width: "100%"}}/>
                {toolbox}
            </div>
        );
    }
}

export default Gamepad;
