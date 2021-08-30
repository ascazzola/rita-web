Blockly.Robocode['controls_if'] = function(block) {
  // If/elseif/else condition.
  let n = 0;
  let argument = Blockly.Robocode.valueToCode(block, 'IF' + n,
      Blockly.Robocode.ORDER_NONE) || 'false';
  let branch = Blockly.Robocode.statementToCode(block, 'DO' + n);
  if (branch) {
    branch += '\n';
  }
  let code = 'if (' + argument + ') {\n' + branch;

  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Robocode.valueToCode(block, 'IF' + n,
        Blockly.Robocode.ORDER_NONE) || 'false';
    branch = Blockly.Robocode.statementToCode(block, 'DO' + n);
    if (branch) {
      branch += '\n';
    }
    code += '} else if (' + argument + ') {\n' + branch;
  }
  if (block.elseCount_) {
    branch = Blockly.Robocode.statementToCode(block, 'ELSE');
    if (branch) {
      branch += '\n';
    }
    code += '} else {\n' + branch;
  }
  code += '}\n';
  return code;
};

Blockly.Robocode['logic_compare'] = function(block) {
  // Comparison operator.
  const OPERATORS = {
    'EQ': '', // a.equals(b)
    'NEQ': '!', // !a.equals(b)
    'LT': '<', //  a.compareTo(b) < 0
    'LTE': '<=', //  a.compareTo(b) <= 0
    'GT': '>', //  a.compareTo(b) > 0
    'GTE': '>=', //  a.compareTo(b) >= 0
  };

  const FLIPOPERATORS = {
    '': '',
    '!': '!',
    '<': '>',
    '<=': '>=',
    '>': '<',
    '>=': '<=',
  };
  let operator = OPERATORS[block.getFieldValue('OP')];
  let code = '';
  let argument0 = Blockly.Robocode
      .valueToCode(block, 'A', Blockly.Robocode.ORDER_RELATIONAL);

  let argument1 = Blockly.Robocode
      .valueToCode(block, 'B', Blockly.Robocode.ORDER_RELATIONAL);

  if (argument0.slice(-14) === '.cloneObject()' ) {
    argument0 = argument0.slice(0, -14);
    if (argument1.slice(-14) === '.cloneObject()' ) {
      argument1 = argument1.slice(0, -14);
    }
  } else if (argument1.slice(-14) === '.cloneObject()' ) {
    operator = FLIPOPERATORS[operator];
    const temp = argument0;
    argument0 = argument1.slice(0, -14);
    argument1 = temp;
  }

  if (!argument0) {
    argument0 = '""';
  } else {
    argument0 = 'Var.valueOf(' + argument0 + ')';
    Blockly.Robocode.provideVarClass();
  }
  if (!argument1) {
    argument1 = '""';
  }
  if (operator === '' || operator === '!') {
    code = operator + argument0 + '.equals(' + argument1 + ')';
  } else {
    code = argument0 + '.compareTo(' + argument1 + ') ' + operator + ' 0';
  }
  return [code, Blockly.Robocode.ORDER_RELATIONAL];
};

Blockly.Robocode['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  const operator = (block.getFieldValue('OP') == 'AND') ? ' && ' : ' || ';
  const order = (operator == 'and') ? Blockly.Robocode.ORDER_LOGICAL_AND :
      Blockly.Robocode.ORDER_LOGICAL_OR;
  let argument0 = Blockly.Robocode.valueToCode(block, 'A', order);
  let argument1 = Blockly.Robocode.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    const defaultArgument = (operator == ' && ') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  const code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Robocode['logic_negate'] = function(block) {
  // Negation.
  const argument0 = Blockly.Robocode.valueToCode(block, 'BOOL',
      Blockly.Robocode.ORDER_LOGICAL_NOT) || 'true';
  const code = '!(' + argument0 + ')';
  return [code, Blockly.Robocode.ORDER_LOGICAL_NOT];
};

Blockly.Robocode['logic_boolean'] = function(block) {
  // Boolean values true and false.
  const code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Robocode.ORDER_ATOMIC];
};

Blockly.Robocode['logic_null'] = function(_) {
  // Null data type.
  return ['null', Blockly.Robocode.ORDER_ATOMIC];
};

Blockly.Robocode['logic_ternary'] = function(block) {
  // Ternary operator.
  const valueIf = Blockly.Robocode.valueToCode(block, 'IF',
      Blockly.Robocode.ORDER_CONDITIONAL) || 'false';
  const valueThen = Blockly.Robocode.valueToCode(block, 'THEN',
      Blockly.Robocode.ORDER_CONDITIONAL) || 'null';
  const valueElse = Blockly.Robocode.valueToCode(block, 'ELSE',
      Blockly.Robocode.ORDER_CONDITIONAL) || 'null';
  const code = valueIf + ' ? ' + valueThen + ' : ' + valueElse;
  return [code, Blockly.Robocode.ORDER_CONDITIONAL];
};
