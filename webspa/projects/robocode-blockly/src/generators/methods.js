'use strict';

Blockly.Robocode['action_turn_gun_left'] = function(block) {
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnGunLeft(${degress});\n`;
};

Blockly.Robocode['action_turn_gun_right'] = function(block) {
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnGunRight(${degress});\n`;
};

Blockly.Robocode['action_turn_gun_to'] = function(block) {
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnGunTo(${degress});\n`;
};

Blockly.Robocode['action_bear_gun_to'] = function(block) {
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `bearGunTo(${degress});\n`;
};

Blockly.Robocode['action_do_nothing'] = function(block) {
  return `doNothing();\n`;
};

Blockly.Robocode['action_do_nothing_turns'] = function(block) {
  const turns = Blockly.Robocode.valueToCode(block, 'TURNS', 0) || 0;
  return `doNothing(${turns});\n`;
};

Blockly.Robocode['action_fire'] = function(block) {
  return `fire();\n`;
};

Blockly.Robocode['action_fire_power'] = function(block) {
  const power = Blockly.Robocode.valueToCode(block, 'POWER', 0) || 0;
  return `fire(${power});\n`;
};

Blockly.Robocode['move_ahead'] = function(block) {
  const distance = Blockly.Robocode.valueToCode(block, 'DISTANCE', 0) || 0;
  return `ahead(${distance});\n`;
};

Blockly.Robocode['move_back'] = function(block) {
  const distance = Blockly.Robocode.valueToCode(block, 'DISTANCE', 0) || 0;
  return `back(${distance});\n`;
};

Blockly.Robocode['move_ahead_left'] = function(block) {
  const distance = Blockly.Robocode.valueToCode(block, 'DISTANCE', 0) || 0;
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnAheadLeft(${distance},${degress});\n`;
};

Blockly.Robocode['move_ahead_right'] = function(block) {
  const distance = Blockly.Robocode.valueToCode(block, 'DISTANCE', 0) || 0;
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnAheadRight(${distance},${degress});\n`;
};

Blockly.Robocode['move_back_left'] = function(block) {
  const distance = Blockly.Robocode.valueToCode(block, 'DISTANCE', 0) || 0;
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnBackLeft(${distance},${degress});\n`;
};

Blockly.Robocode['move_back_right'] = function(block) {
  const distance = Blockly.Robocode.valueToCode(block, 'DISTANCE', 0) || 0;
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnBackRight(${distance},${degress});\n`;
};

Blockly.Robocode['move_turn_left'] = function(block) {
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnLeft(${degress});\n`;
};

Blockly.Robocode['move_turn_right'] = function(block) {
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnRight(${degress});\n`;
};

Blockly.Robocode['move_turn'] = function(block) {
  const degress = Blockly.Robocode.valueToCode(block, 'DEGRESS', 0) || 0;
  return `turnTo(${degress});\n`;
};

/**
 * Function used to convert an rgb color to int (Robocode style).
 * @param {string} rgb Color to convert to int.
 * @return {number} Color as int (robocode style).
 */
function rgbToInt(rgb) {
  const bbggrr = rgb.substr(5, 2) + rgb.substr(3, 2) + rgb.substr(1, 3);
  return parseInt(bbggrr, 16);
}

Blockly.Robocode['set_some_colours'] = function(block) {
  const body = rgbToInt(block.getFieldValue('BODY'));
  const gun = rgbToInt(block.getFieldValue('GUN'));
  const radar = rgbToInt(block.getFieldValue('RADAR'));
  return `setColors(${body}, ${gun}, ${radar});\n`;
};

Blockly.Robocode['set_all_colours'] = function(block) {
  const body = rgbToInt(block.getFieldValue('BODY'));
  const gun = rgbToInt(block.getFieldValue('GUN'));
  const radar = rgbToInt(block.getFieldValue('RADAR'));
  const bullet = rgbToInt(block.getFieldValue('BULLET'));
  const scanArc = rgbToInt(block.getFieldValue('SCANARC'));
  return `setColors(${body}, ${gun}, ${radar}, ${bullet}, ${scanArc});\n`;
};
