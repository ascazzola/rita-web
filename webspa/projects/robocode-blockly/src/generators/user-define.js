'use strict';

/**
 * Get code from methods.
 * @param {!Blockly.Block} block The block used to get the code.
 * @param {string} name The method name.
 * @return {string} Method code.
 */
function getMethodCode(block, name) {
  let body = Blockly.Robocode.statementToCode(block, 'BODY');
  if (body) {
    body = `\n${body}`;
  }
  const codeBlock = Blockly.Robocode.getCodeBlock(body);
  const code = `public void ${name}() ${codeBlock}\n`;
  return code;
}

/**
 * Convert text to camelCase.
 * @param {string} text String to convert.
 * @return {string} Text in camelcase.
 */
function camelCase(text) {
  const regex = /\s+(\w)?/gi;

  return text.replace(regex, function(match, letter) {
    return letter.toUpperCase();
  });
}
Blockly.Robocode['class_name'] = function(block) {
  const className = camelCase(block.getFieldValue('NAME'));
  Blockly.Robocode.definitions_['className'] = className;
  return null;
};

Blockly.Robocode['method_run'] = function(block) {
  return getMethodCode(block, 'run');
};

Blockly.Robocode['method_onHitByBullet'] = function(block) {
  return getMethodCode(block, 'onHitByBullet');
};

Blockly.Robocode['method_onHitRobot'] = function(block) {
  return getMethodCode(block, 'onHitRobot');
};

Blockly.Robocode['method_onHitWall'] = function(block) {
  return getMethodCode(block, 'onHitWall');
};

Blockly.Robocode['method_onScannedRobot'] = function(block) {
  return getMethodCode(block, 'onScannedRobot');
};
