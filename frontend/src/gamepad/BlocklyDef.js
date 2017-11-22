import Blockly from 'node-blockly/browser';

/**
 * Define the move forward/left/right/up/down statement.
 */
Blockly.Blocks['action_move'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("move")
            .appendField(new Blockly.FieldDropdown([["forward", "forward"], ["left","left"], ["right","right"], ["up","up"], ["down","down"]]), "OP");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Move operation");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['action_move'] = function(block) {
    let dropdown_op = block.getFieldValue('OP');
    return `move("${dropdown_op}");`;
};

/**
 * Define the turn left/right/up/down statement.
 */
Blockly.Blocks['action_turn'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("turn")
            .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"], ["up","up"], ["down","down"]]), "OP");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Turn operation");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['action_turn'] = function(block) {
    let dropdown_op = block.getFieldValue('OP');
    return `turn("${dropdown_op}");`;
};

/**
 * Check safe condition logic definition
 */
Blockly.Blocks['logic_safe'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("safe")
            .appendField(new Blockly.FieldDropdown([["forward","forward"], ["left","left"], ["right","right"], ["up","up"], ["down","down"]]), "OP");
        this.setOutput(true, null);
        this.setColour(210);
        this.setTooltip("Check safe operation");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['logic_safe'] = function(block) {
    let dropdown_op = block.getFieldValue('OP');
    return `check("${dropdown_op}");`;
};
