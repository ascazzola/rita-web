import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBattleComponent } from './new/new-battle.component';
import { BattleViewerComponent } from './viewer/battle-viewer.component';

const routes: Routes = [
  { path: 'new', component: NewBattleComponent },
  { path: ':id/view', component: BattleViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleRoutingModule { }
