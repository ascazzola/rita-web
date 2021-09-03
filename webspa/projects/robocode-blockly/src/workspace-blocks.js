/* eslint-disable max-len */
export const defaultWorkspaceBlocks = `
<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="class_name" deletable="false" movable="false" id="bY3]kC1zk]L_PsBXsg@O" x="10" y="0">
      <field name="NAME">Mi Robot</field>
    </block>
    <block type="method_run" deletable="false" movable="false" id="aayNvZKe1MuC))q?EeF_" x="10" y="50">
      <statement name="BODY">
        <block type="set_all_colours" id=",S3W*1R^Nlpp=DqsN}H9">
          <field name="BODY">#ff0000</field>
          <field name="GUN">#ffffff</field>
          <field name="RADAR">#6633ff</field>
          <field name="BULLET">#ffff66</field>
          <field name="SCANARC">#33cc00</field>
          <next>
            <block type="controls_whileUntil" id="QBk^yWcXhbH_VOvi]r25">
              <field name="MODE">WHILE</field>
              <value name="BOOL">
                <block type="logic_boolean" id="qUDI3{{Ikm_gMS.AXUs^">
                  <field name="BOOL">TRUE</field>
                </block>
              </value>
              <statement name="DO">
                <block type="move_ahead" id="akeFDV:I3+^J.ok1._{M">
                  <field name="DISTANCE">100</field>
                  <next>
                    <block type="action_turn_gun_right" id="M;Klg\`~UOW^cu?f(fiI2">
                      <field name="DEGRESS">180</field>
                      <next>
                        <block type="move_back" id="vI}MjrVZU2*}!vvhc|hb">
                          <field name="DISTANCE">100</field>
                          <next>
                            <block type="action_turn_gun_right" id="VdabLPqMbwLit_[=K^*#">
                              <field name="DEGRESS">180</field>
                            </block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </statement>
    </block>
    <block type="method_onScannedRobot" deletable="false" id="%4Szo%_E},fhZ$]58yi?" x="10" y="350">
      <statement name="BODY">
        <block type="action_fire_power" id="U5D,rq0L$46quz#4[=%O">
          <field name="POWER">1</field>
        </block>
      </statement>
    </block>
    <block type="method_onHitByBullet" deletable="false" id="#-U4.vh,4,#\`Eaz#+:Hp" x="300" y="350">
      <statement name="BODY">
        <block type="move_back" id="f@,.2p|=E+FZnt~W9$.|">
          <field name="DISTANCE">10</field>
        </block>
      </statement>
    </block>
    <block type="method_onHitWall" deletable="false" id="A.%,bh%i_.iOON%]dbVH" x="10" y="650">
      <statement name="BODY">
        <block type="move_back" id="e^V13SPir~g$?*wTvWc\`">
          <field name="DISTANCE">20</field>
        </block>
      </statement>
    </block>
    <block type="method_onHitRobot" deletable="false" id="A.%,bh%i_.iOON%]dbVH" x="300" y="650">
      <statement name="BODY">
      </statement>
    </block>
  </xml>
  `;
