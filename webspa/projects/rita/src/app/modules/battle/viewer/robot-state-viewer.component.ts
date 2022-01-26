import { Component, Input } from '@angular/core';
import { RobotState } from '../../../models/robot';

@Component({
  selector: 'app-robot-state-viewer',
  template: `
   <ng-container [ngSwitch]="state">
              <span *ngSwitchCase="'ACTIVE'"> Activo</span>
              <span *ngSwitchCase="'HIT_WALL'"> Golpe pared</span>
              <span *ngSwitchCase="'HIT_ROBOT'"> Golpe robot</span>
              <span *ngSwitchCase="'DEAD'"> Finalizado</span>
   </ng-container>
  `
})

export class RobotStateViewierComponent {
  @Input() state: RobotState = null!;
}
