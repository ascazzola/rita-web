'use strict';

Blockly.Robocode['controls_repeat_ext'] = function(block) {
  let repeats = '';
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    repeats = Blockly.Robocode.valueToCode(block, 'TIMES',
        Blockly.Robocode.ORDER_ASSIGNMENT) || '0';
  }
  let branch = Blockly.Robocode.statementToCode(block, 'DO');
  branch = Blockly.Robocode.addLoopTrap(branch, block.id);
  let code = '';
  const loopVar = Blockly.Robocode.nameDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  let endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.Robocode.nameDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'int ' + endVar + ' = int(' + repeats + ');\n';
  }
  if (branch) {
    branch += '\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' +
                        loopVar + ' < ' + repeats + ';' +
                        loopVar + '++) {\n' + branch + '}\n';
  return code;
};

Blockly.Robocode['controls_repeat'] =
    Blockly.Robocode['controls_repeat_ext'];

Blockly.Robocode['controls_whileUntil'] = function(block) {
  const until = block.getFieldValue('MODE') == 'UNTIL';
  let argument0 = Blockly.Robocode.valueToCode(block, 'BOOL',
      until ? Blockly.Robocode.ORDER_LOGICAL_NOT :
      Blockly.Robocode.ORDER_NONE) || 'false';
  let branch = Blockly.Robocode.statementToCode(block, 'DO');
  console.warn('robocode branch', branch);
  branch = Blockly.Robocode.addLoopTrap(branch, block);

  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Robocode['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw Error('Unknown flow statement.');
};
