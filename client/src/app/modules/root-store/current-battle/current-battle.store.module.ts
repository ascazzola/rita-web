import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducer';
import { CurrentBattleEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('currentBattle', reducer),
    EffectsModule.forFeature([CurrentBattleEffects])
  ]
})
export class CurrentBattleStoreModule { }
