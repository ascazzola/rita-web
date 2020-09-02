import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './reducer';
import { BattlesEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('battles', reducer),
    EffectsModule.forFeature([BattlesEffects])
  ]
})
export class BattlesStoreModule { }
