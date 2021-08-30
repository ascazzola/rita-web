export const robocodeTolbox = `
<xml id="toolbox" style="display: none">
  <category name="Robocode" colour="1">
    <category name="Requeridos" colour="1">
      <block type="junior_robot_class"/>
      <block type="method_run"/>
      <block type="method_onHitByBullet"/>
      <block type="method_onHitRobot"/>
      <block type="method_onHitWall"/>
      <block type="method_onScannedRobot"/>
    </category>
    <category name="Movimiento" colour="20">
      <block type="move_ahead"/>
      <block type="move_back"/>
      <block type="move_ahead_left"/>
      <block type="move_ahead_right"/>
      <block type="move_back_left"/>
      <block type="move_back_right"/>
      <block type="move_turn_left" />
      <block type="move_turn_right" />
      <block type="move_turn" />
    </category>
    <category name="Acciones" colour="40">
      <block type="action_turn_gun_left" />
      <block type="action_turn_gun_right" />
      <block type="action_turn_gun_to" />
      <block type="action_bear_gun_to" />
      <block type="action_do_nothing" />
      <block type="action_do_nothing_turns" />
      <block type="action_fire" />
      <block type="action_fire_power" />
    </category>
    <category name="Información" colour="60">
      <block type="variable_energy" />
      <block type="field_height" />
      <block type="field_width" />
      <block type="variable_gun_bearing" />
      <block type="variable_gun_heading" />
      <block type="variable_gun_ready" />
      <block type="variable_heading" />
      <block type="variable_hit_by_bullet_angle" />
      <block type="variable_hit_by_bullet_bearing" />
      <block type="variable_hit_robot_angle" />
      <block type="variable_hit_robot_bearing" />
      <block type="variable_hit_wall_angle" />
      <block type="variable_hit_wall_bearing" />
      <block type="variable_others" />
      <block type="variable_robot_x" />
      <block type="variable_robot_y" />
      <block type="variable_scanned_angle" />
      <block type="variable_scanned_bearing" />
      <block type="variable_scanned_distance" />
      <block type="variable_scanned_energy" />
      <block type="variable_scanned_heading" />
      <block type="variable_scanned_velocity" />
    </category>
    <category name="Colores" colour="80">
    <block type="set_some_colours" />
    <block type="set_all_colours" />
    </category>
  </category>
  <category name="Sentencias Java" colour="100">
    <category name="Matemáticas" colour="120">
      <block type="math_number" />
      <block type="math_arithmetic" />
      <block type="math_single" />
      <block type="math_trig" />
      <block type="math_constant" />
      <block type="math_round" />
      <block type="math_modulo" />
      <block type="math_constrain" />
      <block type="math_random_int" />
      <block type="math_random_float" />
    </category>
    <category name="Bucles" colour="140">
      <block type="controls_repeat" />
      <block type="controls_whileUntil" />
      <block type="controls_flow_statements" />
    </category>
    <category name="Lógica" colour="160">
      <block type="controls_if" />
      <block type="logic_compare" />
      <block type="logic_operation" />
      <block type="logic_negate" />
      <block type="logic_boolean" />
      <block type="logic_null" />
      <block type="logic_ternary" />
    </category>
  </category>
  <category name="Variables" colour="180" custom="VARIABLE_DYNAMIC">
  </category>
  <category name="Texto" colour="200">
    <block type="text" />
    <block type="text_length" />
    <block type="text_isEmpty" />
    <block type="text_indexOf" />
    <block type="text_trim" />
  </category>
</xml>
  `;
