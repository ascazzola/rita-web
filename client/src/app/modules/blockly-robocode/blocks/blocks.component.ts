import { Component, Output, EventEmitter } from '@angular/core';
import { NgxBlocklyConfig, NgxBlocklyGeneratorConfig, CustomBlock } from 'ngx-blockly';
import { MethodBlock } from '../custom-blocks/method-block';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent {
  private requiredMethods = [
    new MethodBlock('startRound', null, null, 'Iniciar ronda', 30),
    new MethodBlock('run', null, null, 'Ejecutar', 30),
    new MethodBlock('draw', null, null, 'Dibujar', 30),
    new MethodBlock('onHitWall', null, null, 'Golpea la pared', 30),
    new MethodBlock('onHitByBullet', null, null, 'Golpeado por una bala', 30, null,
      [{ name: 'direction', type: 'string' }, { name: 'power', type: 'string' }, { name: 'velocity', type: 'number' }]),
    new MethodBlock('onBulletHitRobot', null, null, 'Una bala golpea un robot', 30, null,
      [{ name: 'x', type: 'number' }, { name: 'y', type: 'number' },
      { name: 'enemyPower', type: 'number' }, { name: 'enemyName', type: 'string' }]),
    new MethodBlock('onBulletHitWall', null, null, 'Una bala golpea una pared', 30, null,
      [{ name: 'x', type: 'number' }, { name: 'y', type: 'number' }]),
    new MethodBlock('onScannedRobot', null, null, 'Robot escaneado', 30, null,
      [{ name: 'name', type: 'string' }, { name: 'direction', type: 'string' },
      { name: 'distance', type: 'number' }, { name: 'heading', type: 'string' },
      { name: 'velocity', type: 'number' }, { name: 'power', type: 'number' }]),
    new MethodBlock('onDeath', null, null, 'Al morir', 30),
    new MethodBlock('onWin', null, null, 'Al g', 30)
  ];
  public customBlocks: CustomBlock[] = [...this.requiredMethods];

  public config: NgxBlocklyConfig = {
    toolbox: `<xml id="toolbox" style="display: none">
    <category name="Bloques robocode">
      <category colour="120" name="Métodos requeridos">
        ${this.requiredMethods.map(x => `<block type="${x.type}"></block>`).join('\n')}
      </category>
      <category colour="210" name="Movimiento">
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_boolean"></block>
      </category>
      <category colour="330" name="Acciones">
        <block type="logic_compare"></block>
      </category>
      <category colour="450" name="Información">
        <block type="logic_compare"></block>
      </category>
      <category name="Colores">
        <block type="text"></block>
        <block type="math_arithmetic"></block>
        <block type="text_print"></block>
      </category>
      <category  colour="132" name="Variables" custom="VARIABLE"></category>
    </category>
  </xml>`,
    scrollbars: false,
    trashcan: false
  };

  generatorConfig: NgxBlocklyGeneratorConfig = {
    javascript: true,
  };

  @Output() codeChanged = new EventEmitter<string>();

  onCode(code: string) {
    this.codeChanged.emit(code);
  }
}
