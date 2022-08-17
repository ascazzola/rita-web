'use strict';

Blockly.defineBlocksWithJsonArray([{
  'type': 'class_name',
  'message0': '%{BKY_CLASS_NAME}',
  'args0': [
    {
      'type': 'field_input',
      'name': 'NAME',
      'text': 'Mi Robot',
    },
  ],
  'colour': 230,
  'tooltip': '%{BKY_CLASS_NAME_TOOLTIP}',
  'helpUrl': '',
},
{
  'type': 'method_run',
  'message0': '%{BKY_RUN_METHOD}',
  'args0': [
    {
      'type': 'input_dummy',
    },
    {
      'type': 'input_statement',
      'name': 'BODY',
    },
  ],
  'inputsInline': true,
  'colour': 210,
  'tooltip': '%{BKY_RUN_METHOD_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#run--',
},
{
  'type': 'method_onHitByBullet',
  'message0': '%{BKY_ON_HIT_BY_BULLET_METHOD}',
  'args0': [
    {
      'type': 'input_dummy',
    },
    {
      'type': 'input_statement',
      'name': 'BODY',
    },
  ],
  'inputsInline': true,
  'colour': 210,
  'tooltip': '%{BKY_ON_HIT_BY_BULLET_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#onHitByBullet--',
},
{
  'type': 'method_onHitRobot',
  'message0': '%{BKY_ON_HIT_ROBOT_METHOD}',
  'args0': [
    {
      'type': 'input_dummy',
    },
    {
      'type': 'input_statement',
      'name': 'BODY',
    },
  ],
  'inputsInline': true,
  'colour': 210,
  'tooltip': '%{BKY_ON_HIT_ROBOT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#onHitRobot--',
},
{
  'type': 'method_onHitWall',
  'message0': '%{BKY_ON_HIT_WALL_METHOD}',
  'args0': [
    {
      'type': 'input_dummy',
    },
    {
      'type': 'input_statement',
      'name': 'BODY',
    },
  ],
  'inputsInline': true,
  'colour': 210,
  'tooltip': '%{BKY_ON_HIT_WALL_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#onHitWall--',
},
{
  'type': 'method_onScannedRobot',
  'message0': '%{BKY_ON_SCANNED_ROBOT_METHOD}',
  'args0': [
    {
      'type': 'input_dummy',
    },
    {
      'type': 'input_statement',
      'name': 'BODY',
    },
  ],
  'inputsInline': true,
  'colour': 210,
  'tooltip': '%{BKY_ON_SCANNED_ROBOT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#onScannedRobot--',
},
{
  'type': 'move_ahead',
  'message0': '%{BKY_MOVE_AHEAD}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DISTANCE',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_AHEAD_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#ahead-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_back',
  'message0': '%{BKY_MOVE_BACK}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DISTANCE',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_BACK_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#back-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_ahead_left',
  'message0': '%{BKY_MOVE_AHEAD_LEFT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DISTANCE',
      'check': 'Number',
    },
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_AHEAD_LEFT_TOOLTIP}',
  'helpUrl': '',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_ahead_right',
  'message0': '%{BKY_MOVE_AHEAD_RIGHT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DISTANCE',
      'check': 'Number',
    },
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_AHEAD_RIGHT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnAheadLeft-int-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_back_left',
  'message0': '%{BKY_MOVE_BACK_LEFT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DISTANCE',
      'check': 'Number',
    },
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_BACK_LEFT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnBackLeft-int-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_back_right',
  'message0': '%{BKY_MOVE_BACK_RIGHT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DISTANCE',
      'check': 'Number',
    },
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_BACK_RIGHT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnBackRight-int-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_turn_left',
  'message0': '%{BKY_MOVE_TURN_LEFT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_TURN_LEFT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnLeft-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_turn_right',
  'message0': '%{BKY_MOVE_TURN_RIGHT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_TURN_RIGHT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnRight-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'move_turn',
  'message0': '%{BKY_MOVE_TURN}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 220,
  'tooltip': '%{BKY_MOVE_TURN_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnTo-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_turn_gun_left',
  'message0': '%{BKY_TURN_GUN_LEFT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 230,
  'tooltip': '%{BKY_TURN_GUN_LEFT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnGunLeft-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_turn_gun_right',
  'message0': '%{BKY_TURN_GUN_RIGHT}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 230,
  'tooltip': '%{BKY_TURN_GUN_RIGHT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnGunRight-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_turn_gun_to',
  'message0': '%{BKY_TURN_GUN_TO}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 230,
  'tooltip': '%{BKY_TURN_GUN_TO_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#turnGunTo-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_bear_gun_to',
  'message0': '%{BKY_BEAR_GUN_TO}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'DEGRESS',
      'check': 'Number',
    },
  ],
  'colour': 230,
  'tooltip': '%{BKY_BEAR_GUN_TO_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#bearGunTo-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_do_nothing',
  'message0': '%{BKY_DO_NOTHING}',
  'colour': 230,
  'tooltip': '%{BKY_DO_NOTHING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#doNothing--',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_do_nothing_turns',
  'message0': '%{BKY_DO_NOTHING_TURNS}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'TURNS',
      'check': 'Number',
    },
  ],
  'colour': 230,
  'tooltip': '%{BKY_DO_NOTHING_TURNS_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#doNothing-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_fire',
  'message0': '%{BKY_FIRE}',
  'colour': 230,
  'tooltip': '%{BKY_FIRE_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#fire--',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'action_fire_power',
  'message0': '%{BKY_FIRE_POWER}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'POWER',
      'check': 'Number',
    },
  ],
  'colour': 230,
  'tooltip': '%{BKY_FIRE_POWER_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#fire-double-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'variable_energy',
  'message0': '%{BKY_VARIABLE_ENERGY}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_ENERGY_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#energy',
},
{
  'type': 'field_height',
  'message0': '%{BKY_FIELD_HEIGHT}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_FIELD_HEIGHT_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#fieldHeight',
},
{
  'type': 'field_width',
  'message0': '%{BKY_FIELD_WIDTH}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_FIELD_WIDTH_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#fieldWidt',
},
{
  'type': 'variable_gun_bearing',
  'message0': '%{BKY_VARIABLE_GUN_BEARING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_GUN_BEARING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#gunBearing',
},
{
  'type': 'variable_gun_heading',
  'message0': '%{BKY_VARIABLE_GUN_HEADING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_GUN_HEADING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#gunHeading',
},
{
  'type': 'variable_gun_ready',
  'message0': '%{BKY_VARIABLE_GUN_READY}',
  'output': 'Boolean',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_GUN_READY_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#gunReady',
},
{
  'type': 'variable_heading',
  'message0': '%{BKY_VARIABLE_HEADING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_HEADING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#heading',
},
{
  'type': 'variable_hit_by_bullet_angle',
  'message0': '%{BKY_VARIABLE_HIT_BY_BULLET_ANGLE}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_HIT_BY_BULLET_ANGLE_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#hitByBulletAngle',
},
{
  'type': 'variable_hit_by_bullet_bearing',
  'message0': '%{BKY_VARIABLE_HIT_BY_BULLET_BEARING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_HIT_BY_BULLET_BEARING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#hitByBulletAngle',
},
{
  'type': 'variable_hit_robot_angle',
  'message0': '%{BKY_VARIABLE_HIT_ROBOT_ANGLE}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_HIT_ROBOT_ANGLE_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#hitRobotAngle',
},
{
  'type': 'variable_hit_robot_bearing',
  'message0': '%{BKY_VARIABLE_HIT_ROBOT_BEARING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_HIT_ROBOT_BEARING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#hitRobotBearing',
},
{
  'type': 'variable_hit_wall_angle',
  'message0': '%{BKY_VARIABLE_HIT_WALL_ANGLE}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_HIT_WALL_ANGLE_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#hitWallAngle',
},
{
  'type': 'variable_hit_wall_bearing',
  'message0': '%{BKY_VARIABLE_HIT_WALL_BEARING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_HIT_WALL_BEARING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#hitWallBearing',
},
{
  'type': 'variable_others',
  'message0': '%{BKY_VARIABLE_OTHERS}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_OTHERS_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#others',
},
{
  'type': 'variable_robot_x',
  'message0': '%{BKY_VARIABLE_ROBOT_X}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_ROBOT_X_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#robotX',
},
{
  'type': 'variable_robot_y',
  'message0': '%{BKY_VARIABLE_ROBOT_Y}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLE_ROBOT_Y_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#robotY',
},
{
  'type': 'variable_scanned_angle',
  'message0': '%{BKY_VARIABLE_SCANNED_ANGLE}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLEE_SCANNED_ANGLE_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#scannedAngle',
},
{
  'type': 'variable_scanned_bearing',
  'message0': '%{BKY_VARIABLE_SCANNED_BEARING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLEE_SCANNED_BEARING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#scannedBearing',
},
{
  'type': 'variable_scanned_distance',
  'message0': '%{BKY_VARIABLE_SCANNED_DISTANCE}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLEE_SCANNED_DISTANCE_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#scannedDistance',
},
{
  'type': 'variable_scanned_energy',
  'message0': '%{BKY_VARIABLE_SCANNED_ENERGY}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLEE_SCANNED_ENERGY_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#scannedEnergy',
},
{
  'type': 'variable_scanned_heading',
  'message0': '%{BKY_VARIABLE_SCANNED_HEADING}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLEE_SCANNED_HEADING_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#scannedHeading',
},
{
  'type': 'variable_scanned_velocity',
  'message0': '%{BKY_VARIABLE_SCANNED_VELOCITY}',
  'output': 'Number',
  'colour': 240,
  'tooltip': '%{BKY_VARIABLEE_SCANNED_VELOCITY_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#scannedVelocity',
},
{
  'type': 'set_some_colours',
  'message0': '%{BKY_SET_SOME_COLOURS}',
  'args0': [
    {
      'type': 'field_colour',
      'name': 'BODY',
      'colour': '#ff0000',
    },
    {
      'type': 'field_colour',
      'name': 'GUN',
      'colour': '#ffffff',
    },
    {
      'type': 'field_colour',
      'name': 'RADAR',
      'colour': '#6633ff',
    },
  ],
  'colour': 250,
  'tooltip': '%{BKY_SET_SOME_COLOURS_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#setColors-int-int-int-',
  'previousStatement': null,
  'nextStatement': null,
},
{
  'type': 'set_all_colours',
  'message0': '%{BKY_SET_ALL_COLOURS}',
  'args0': [
    {
      'type': 'field_colour',
      'name': 'BODY',
      'colour': '#ff0000',
    },
    {
      'type': 'field_colour',
      'name': 'GUN',
      'colour': '#ffffff',
    },
    {
      'type': 'field_colour',
      'name': 'RADAR',
      'colour': '#6633ff',
    },
    {
      'type': 'field_colour',
      'name': 'BULLET',
      'colour': '#ffff66',
    },
    {
      'type': 'field_colour',
      'name': 'SCANARC',
      'colour': '#33cc00',
    },
  ],
  'colour': 250,
  'tooltip': '%{BKY_SET_COLOURS_TOOLTIP}',
  'helpUrl': 'https://robocode.sourceforge.io/docs/robocode/robocode/JuniorRobot.html#setColors-int-int-int-int-int-',
  'previousStatement': null,
  'nextStatement': null,
},
]);
