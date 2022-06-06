/* eslint-disable max-len */
export const defaultWorkspaceBlocks = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="class_name" id="bY3]kC1zk]L_PsBXsg@O" deletable="false" movable="false" x="10" y="0">
    <field name="NAME">Mi Robot</field>
  </block>
  <block type="method_run" id="aayNvZKe1MuC))q?EeF_" deletable="false" movable="false" x="10" y="50">
    <statement name="BODY">
      <block type="set_all_colours" id=",S3W*1R^Nlpp=DqsN}H9">
        <field name="BODY">#ff0000</field>
        <field name="GUN">#ffffff</field>
        <field name="RADAR">#000000</field>
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
                <value name="DISTANCE">
                  <block type="math_number" id="i6sk[c)m_OA?5dv,pDuO">
                    <field name="NUM">100</field>
                  </block>
                </value>
                <next>
                  <block type="action_turn_gun_right" id="M;Klgs~UOW^cu?f(fiI2">
                    <value name="DEGRESS">
                      <block type="math_number" id="xp7v[HfrfVsUCsk;dy*w">
                        <field name="NUM">360</field>
                      </block>
                    </value>
                    <next>
                      <block type="move_back" id="vI}MjrVZU2*}!vvhc|hb">
                        <value name="DISTANCE">
                          <block type="math_number" id="8zI_wcM2[s}=X{ej.P(5">
                            <field name="NUM">100</field>
                          </block>
                        </value>
                        <next>
                          <block type="action_turn_gun_right" id="VdabLPqMbwLit_[=K^*#">
                            <value name="DEGRESS">
                              <block type="math_number" id="U0mrh$Is1UZNG44DLMDj">
                                <field name="NUM">360</field>
                              </block>
                            </value>
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
  <block type="method_onScannedRobot" id="%4Szo%_E},fhZ$]58yi?" deletable="false" x="10" y="350">
    <statement name="BODY">
      <block type="action_fire_power" id="U5D,rq0L$46quz#4[=%O">
        <value name="POWER">
          <block type="math_number" id="L3TR8hmzu%Tb[F$6pp2A">
            <field name="NUM">1</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  <block type="method_onHitByBullet" id="#-U4.vh,4,#sEaz#+:Hp" deletable="false" x="300" y="350"></block>
  <block type="method_onHitWall" id="A.%,bh%i_.iOON%]dbVH" deletable="false" x="10" y="650"></block>
  <block type="method_onHitRobot" id="rpR!]s#sXKG[!4G~^?}~" deletable="false" x="300" y="650"></block>
</xml>
  `;
