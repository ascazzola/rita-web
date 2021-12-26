import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewBattleComponent } from './new/new-battle.component';
import { BattleViewerComponent } from './viewer/battle-viewer.component';
import { BattleRoutingModule } from './battle-routing.module';
import { BulletsComponent } from './viewer/bullets.component';
import { BatttlesBrowseComponent } from './browse/battles-browse.component';
import { RobotsComponent } from './viewer/robots.component';

@NgModule({
  declarations: [
    BatttlesBrowseComponent,
    NewBattleComponent,
    BattleViewerComponent,
    BulletsComponent,
    RobotsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BattleRoutingModule,
  ],
  exports: []
})
export class BattleModule { }
