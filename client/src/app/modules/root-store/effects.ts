import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { AppActionTypes } from './actions';
import * as fromBattles from './battles';

@Injectable()
export class AppEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AppActionTypes.Login),
    mapTo(fromBattles.load())
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AppActionTypes.Logout),
    mapTo(fromBattles.unload())
  );

  constructor(private actions$: Actions) { }
}
