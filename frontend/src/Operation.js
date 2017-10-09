import React, { Component } from 'react';

class Operation extends Component
{
    render()
    {
        return(
            <div className="Operation">
            <h1>Operations</h1>
                <div id="blocklyDiv" style={{height: "70vh", width: "100%"}}></div>
                <xml id="toolbox" style={{display: "none"}}>
                  <block type="controls_if"></block>
                  <block type="logic_compare"></block>
                  <block type="controls_repeat_ext"></block>
                  <block type="math_number"></block>
                  <block type="math_arithmetic"></block>
                  <block type="text"></block>
                  <block type="text_print"></block>
                </xml>
            </div>
        );
    }
}

export default Operation;
