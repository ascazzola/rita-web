import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewBattleComponent } from './new/new-battle.component';
import { BattleViewerComponent } from './viewer/battle-viewer.component';
import { BattleRoutingModule } from './battle-routing.module';
import { BulletsComponent } from './viewer/bullets.component';
import { BatttlesBrowseComponent } from './browse/battles-browse.component';
import { RobotsComponent } from './viewer/robots.component';
import { ExplosionsComponent } from './viewer/explosions.component';
import { DeadsRobotsComponent } from './viewer/dead-robots.component';
import { RobotsNamesComponent } from './viewer/robots-names.component';
import { RobotsEnergyComponent } from './viewer/robots-energy.component';

@NgModule({
  declarations: [
    BatttlesBrowseComponent,
    NewBattleComponent,
    BattleViewerComponent,
    BulletsComponent,
    RobotsComponent,
    ExplosionsComponent,
    DeadsRobotsComponent,
    RobotsNamesComponent,
    RobotsEnergyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BattleRoutingModule,
  ],
  exports: []
})
export class BattleModule { }
