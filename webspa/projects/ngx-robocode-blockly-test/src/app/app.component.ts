import { Component } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_XML = `<xml xmlns="https://developers.google.com/blockly/xml" id="workspace-blocks" style="display: none">
<block type="junior_robot_class" id="jY7hU+kM]gXKO}.5$w:S" x="0" y="0">
  <field name="ROBOT_NAME">MyRobot</field>
  <statement name="BODY">
    <block type="method_run" id="aayNvZKe1MuC))q?EeF_">
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
      <next>
        <block type="method_onScannedRobot" id="%4Szo%_E},fhZ$]58yi?">
          <statement name="BODY">
            <block type="action_fire_power" id="U5D,rq0L$46quz#4[=%O">
              <field name="POWER">1</field>
            </block>
          </statement>
          <next>
            <block type="method_onHitByBullet" id="#-U4.vh,4,#\`Eaz#+:Hp">
              <statement name="BODY">
                <block type="move_back" id="f@,.2p|=E+FZnt~W9$.|">
                  <field name="DISTANCE">10</field>
                </block>
              </statement>
              <next>
                <block type="method_onHitWall" id="A.%,bh%i_.iOON%]dbVH">
                  <statement name="BODY">
                    <block type="move_back" id="e^V13SPir~g$?*wTvWc\`">
                      <field name="DISTANCE">20</field>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </statement>
</block>
</xml>`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  code$ = new BehaviorSubject('');
  originalXml = DEFAULT_XML;
  currentXml = DEFAULT_XML;
  editorOptions: MonacoEditorConstructionOptions = {theme: 'vs-dark', language: 'java', readOnly: true};

  onCodeChanged = (code: string):void => this.code$.next(code);
}
