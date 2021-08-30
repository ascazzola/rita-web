'use strict';

// If any new block imports any library, add that library name here.
Blockly.Robocode.addReservedWords('math,random');

Blockly.Robocode['math_number'] = function(block) {
  // Numeric value.
  const code = parseFloat(block.getFieldValue('NUM')).toString();
  // if (Blockly.Robocode.getTargetType() === 'Double') {
  //   if (code.indexOf('.') < 0) {
  //     code += '.0';
  //   }
  // }
  const order = code < 0 ? Blockly.Robocode.ORDER_UNARY_SIGN :
    Blockly.Robocode.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Robocode['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  const OPERATORS = {
    'ADD': [' + ', Blockly.Robocode.ORDER_ADDITIVE],
    'MINUS': [' - ', Blockly.Robocode.ORDER_ADDITIVE],
    'MULTIPLY': [' * ', Blockly.Robocode.ORDER_MULTIPLICATIVE],
    'DIVIDE': [' / ', Blockly.Robocode.ORDER_MULTIPLICATIVE],
    'POWER': [' ** ', Blockly.Robocode.ORDER_EXPONENTIATION],
  };
  const tuple = OPERATORS[block.getFieldValue('OP')];
  const operator = tuple[0];
  const order = tuple[1];
  const argument0 = Blockly.Robocode.valueToCode(block, 'A', order) || '0';
  const argument1 = Blockly.Robocode.valueToCode(block, 'B', order) || '0';
  let code = '';
  if (operator === ' ** ') {
    Blockly.Robocode.definitions_['import_math'] = 'java.lang.Math';
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
  } else {
    code = argument0 + operator + argument1;
  }
  return [code, order];
  // In case of 'DIVIDE', division between integers returns different results
  // in Robocode 2 and 3. However, is not an issue since Blockly does not
  // guarantee identical results in all languages.  To do otherwise would
  // require every operator to be wrapped in a function call.  This would kill
  // legibility of the generated code.
};

Blockly.Robocode['math_single'] = function(block) {
  // Math operators with single operand.
  const operator = block.getFieldValue('OP');
  let code;
  let arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    code = Blockly.Robocode.valueToCode(block, 'NUM',
        Blockly.Robocode.ORDER_UNARY_SIGN) || '0';
    return ['-' + code, Blockly.Robocode.ORDER_UNARY_SIGN];
  }
  Blockly.Robocode.definitions_['import_math'] = 'java.lang.Math';

  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.Robocode.valueToCode(block, 'NUM',
        Blockly.Robocode.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.Robocode.valueToCode(block, 'NUM',
        Blockly.Robocode.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Math.abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Math.log(' + arg + ')';
      break;
    case 'LOG10':
      code = 'Math.log10(' + arg + ')';
      break;
    case 'EXP':
      code = 'Math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Math.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'Math.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Math.sin(' + arg + ' / 180.0 * Math.PI)';
      break;
    case 'COS':
      code = 'Math.cos(' + arg + ' / 180.0 * Math.PI)';
      break;
    case 'TAN':
      code = 'Math.tan(' + arg + ' / 180.0 * Math.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.Robocode.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ASIN':
      code = 'Math.asin(' + arg + ') / Math.PI * 180';
      break;
    case 'ACOS':
      code = 'Math.acos(' + arg + ') / Math.PI * 180';
      break;
    case 'ATAN':
      code = 'Math.atan(' + arg + ') / Math.PI * 180';
      break;
    default:
      throw Error('Unknown math operator: ' + operator);
  }
  return [code, Blockly.Robocode.ORDER_MULTIPLICATIVE];
};

Blockly.Robocode['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  const CONSTANTS = {
    'PI': ['Math.PI', Blockly.Robocode.ORDER_MEMBER],
    'E': ['Math.E', Blockly.Robocode.ORDER_MEMBER],
    'GOLDEN_RATIO': ['(1 + Math.sqrt(5)) / 2',
      Blockly.Robocode.ORDER_MULTIPLICATIVE],
    'SQRT2': ['Math.sqrt(2)', Blockly.Robocode.ORDER_MEMBER],
    'SQRT1_2': ['Math.sqrt(1.0 / 2)', Blockly.Robocode.ORDER_MEMBER],
    'INFINITY': ['Double.POSITIVE_INFINITY', Blockly.Robocode.ORDER_ATOMIC],
  };
  const constant = block.getFieldValue('CONSTANT');
  if (constant != 'INFINITY') {
    Blockly.Robocode.definitions_['import_math'] = 'java.lang.Math';
  }
  return CONSTANTS[constant];
};

// Rounding functions have a single operand.
Blockly.Robocode['math_round'] = Blockly.Robocode['math_single'];
// Trigonometry functions have a single operand.
Blockly.Robocode['math_trig'] = Blockly.Robocode['math_single'];

Blockly.Robocode['math_modulo'] = function(block) {
  // Remainder computation.
  const argument0 = Blockly.Robocode.valueToCode(block, 'DIVIDEND',
      Blockly.Robocode.ORDER_MULTIPLICATIVE) || '0';
  const argument1 = Blockly.Robocode.valueToCode(block, 'DIVISOR',
      Blockly.Robocode.ORDER_MULTIPLICATIVE) || '0';
  const code = argument0 + ' % ' + argument1;
  return [code, Blockly.Robocode.ORDER_MULTIPLICATIVE];
};

Blockly.Robocode['math_constrain'] = function(block) {
  Blockly.Robocode.definitions_['import_math'] = 'java.lang.Math';
  // Constrain a number between two limits.
  const argument0 = Blockly.Robocode.valueToCode(block, 'VALUE',
      Blockly.Robocode.ORDER_NONE) || '0';
  const argument1 = Blockly.Robocode.valueToCode(block, 'LOW',
      Blockly.Robocode.ORDER_NONE) || '0';
  const argument2 = Blockly.Robocode.valueToCode(block, 'HIGH',
      Blockly.Robocode.ORDER_NONE) || 'float(\'inf\')';
  const code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
    argument2 + ')';
  return [code, Blockly.Robocode.ORDER_FUNCTION_CALL];
};

Blockly.Robocode['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  Blockly.Robocode.definitions_['import_threadLocalRandom'] =
    'java.util.concurrent.ThreadLocalRandom';
  const from = Blockly.Robocode.valueToCode(block, 'FROM',
      Blockly.Robocode.ORDER_NONE) || '0';
  const to = Blockly.Robocode.valueToCode(block, 'TO',
      Blockly.Robocode.ORDER_NONE) || '0';
  const code = `ThreadLocalRandom.current().nextInt(${from}, ${to} + 1)`;
  return [code, Blockly.Robocode.ORDER_FUNCTION_CALL];
};

Blockly.Robocode['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  Blockly.Robocode.definitions_['import_math'] = 'java.lang.Math';
  return ['Math.random()', Blockly.Robocode.ORDER_FUNCTION_CALL];
};
