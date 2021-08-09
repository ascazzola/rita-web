import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { AppActionTypes } from './actions';
import * as fromBattles from './battles';

@Injectable()
export class AppEffects {

  login$ =  createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.Login),
    mapTo(fromBattles.load())
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.Logout),
    mapTo(fromBattles.unload())
  ));

  constructor(private actions$: Actions) { }
}
