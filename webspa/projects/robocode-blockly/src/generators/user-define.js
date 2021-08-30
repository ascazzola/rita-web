'use strict';

/**
 * Get statement from code.
 * @param {string} code Code inside the stametement.
 * @return {string} Statement with braces.
 */
function getStatement(code) {
  return `{${code}}`;
}


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

  const code = `public void ${name}() ${getStatement(body)}\n\n`;
  return code;
}


Blockly.Robocode['junior_robot_class'] = function(block) {
  let body = Blockly.Robocode.statementToCode(block, 'BODY');
  if (body) {
    body = `\n${body}\n`;
  }
  const className = block
      .getFieldValue('ROBOT_NAME')
      .replace(/\W+(.)/g, (_, chr) => chr.toUpperCase());

  // eslint-disable-next-line max-len
  const code = `public class ${className} extends JuniorRobot ${getStatement(body)}`;
  console.warn(code);
  Blockly.Robocode.definitions_['import_robocode'] = 'robocode.JuniorRobot';
  return code;
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
