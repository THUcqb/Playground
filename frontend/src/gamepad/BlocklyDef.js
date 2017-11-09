import Blockly from 'node-blockly/browser';

/**
 * Define the move left/right/up/down statemen:wt.
 * @type {{init: Blockly.Blocks.action_move.init}}
 */
Blockly.Blocks['action_move'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move")
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"], ["up","up"], ["down","down"]]), "OP");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Move operation");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['action_move'] = function(block) {
    let dropdown_op = block.getFieldValue('OP');
    // TODO: Assemble JavaScript into code variable.
    let code = 'move' + '("' + dropdown_op + '");\n';
    return code;
};