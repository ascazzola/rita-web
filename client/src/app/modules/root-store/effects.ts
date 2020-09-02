import { Injectable } from '@angular/core';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import * as fromBattles from './battles';

@Injectable()
export class AppEffects {

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mapTo(fromBattles.load())
  );

  constructor(private actions$: Actions) { }
}
