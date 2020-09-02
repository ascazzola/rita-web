import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BattleListComponent } from './list/battle-list.component';
import { NewBattleComponent } from './new/new-battle.component';
import { BattleViewerComponent } from './viewer/battle-viewer.component';
import { BattleRoutingModule } from './battle-routing.module';
import { RobotsComponent } from './viewer/robots.component';
import { BulletsComponent } from './viewer/bullets.component';

@NgModule({
  declarations: [
    BattleListComponent,
    NewBattleComponent,
    BattleViewerComponent,
    RobotsComponent,
    BulletsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BattleRoutingModule,
  ],
  exports: [
    BattleListComponent
  ]
})
export class BattleModule { }
