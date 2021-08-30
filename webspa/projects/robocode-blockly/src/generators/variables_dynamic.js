'use strict';

Blockly.Robocode['variables_get_dynamic'] = function(block) {
  const code = Blockly.Robocode.nameDB_
      .getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return [code, Blockly.Robocode.ORDER_ATOMIC];
};

Blockly.Robocode['variables_set_dynamic'] = function(block) {
  const value = Blockly.Robocode.valueToCode(block, 'VALUE',
      Blockly.Robocode.ORDER_NONE) || '0';
  const varName = Blockly.Robocode.nameDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);
  return `${varName} = ${value};\n`;
};
