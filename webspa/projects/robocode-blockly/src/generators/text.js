'use strict';

Blockly.Robocode['text'] = function(block) {
  // Text value.
  const code = Blockly.Robocode.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Robocode.ORDER_ATOMIC];
};

Blockly.Robocode['text_length'] = function(block) {
  // String length.
  const argument0 = Blockly.Robocode.valueToCode(block, 'VALUE',
      Blockly.Robocode.ORDER_NONE) || '""';
  return [argument0 + '.length()', Blockly.Robocode.ORDER_FUNCTION_CALL];
};

Blockly.Robocode['text_isEmpty'] = function(block) {
  // Is the string null?
  const argument0 = Blockly.Robocode.valueToCode(block, 'VALUE',
      Blockly.Robocode.ORDER_NONE) || '""';
  const code = argument0 + '.isEmpty()';
  return [code, Blockly.Robocode.ORDER_LOGICAL_NOT];
};

Blockly.Robocode['text_indexOf'] = function(block) {
  // Search the text for a substring.
  // Should we allow for non-case sensitive???
  const operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  const argument0 = Blockly.Robocode.valueToCode(block, 'FIND',
      Blockly.Robocode.ORDER_NONE) || '""';
  const argument1 = Blockly.Robocode.valueToCode(block, 'VALUE',
      Blockly.Robocode.ORDER_MEMBER) || '""';
  const code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.Robocode.ORDER_MEMBER];
};


Blockly.Robocode['text_trim'] = function(block) {
  // Trim spaces.
  const OPERATORS = {
    'LEFT': '.replaceAll("^\\\\s+", "")',
    'RIGHT': '.replaceAll("\\\\s+$", "")',
    'BOTH': '.trim()',
  };
  const operator = OPERATORS[block.getFieldValue('MODE')];
  const argument0 = Blockly.Robocode.valueToCode(block, 'TEXT',
      Blockly.Robocode.ORDER_MEMBER) || '""';
  const code = argument0 + operator;
  return [code, Blockly.Robocode.ORDER_MEMBER];
};
