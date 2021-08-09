import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { BattlesStoreModule } from './battles/battles.store.module';
import { CurrentBattleStoreModule } from './current-battle/current-battle.store.module';
import { reducers, metaReducers, State } from './state';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Login } from './actions';
import { Logout } from './actions';
import { filter } from 'rxjs/operators';

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
  constructor(@Optional() @SkipSelf() parentModule: RootStoreModule, keycloakService: KeycloakService, store: Store<State>) {
    throwIfAlreadyLoaded(parentModule, 'RootStoreModule');

    keycloakService.keycloakEvents$.pipe(filter(e => e.type === KeycloakEventType.OnAuthSuccess))
      .subscribe(() => store.dispatch(new Login()));

    keycloakService.keycloakEvents$.pipe(filter(e => e.type === KeycloakEventType.OnAuthLogout))
      .subscribe(() => store.dispatch(new Logout()));
  }
}
