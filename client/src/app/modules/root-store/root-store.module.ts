import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BattlesStoreModule } from './battles/battles.store.module';
import { CurrentBattleStoreModule } from './current-battle/current-battle.store.module';
import { reducers, metaReducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects';

function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`);
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    BattlesStoreModule,
    CurrentBattleStoreModule
  ]
})
export class RootStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: RootStoreModule) {
    throwIfAlreadyLoaded(parentModule, 'RootStoreModule');
  }
}
