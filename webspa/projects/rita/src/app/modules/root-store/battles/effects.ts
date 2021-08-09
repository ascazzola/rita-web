import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BattlesService } from 'services/battles.service';
import * as battleActions from './actions';
import { map, takeUntil, switchMapTo, first } from 'rxjs/operators';
import { Battle } from 'models/battle';

@Injectable()
export class BattlesEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(battleActions.load),
    switchMapTo(this.battlesService.getBattles()),
    map((x: Battle[])  => battleActions.loaded(x)),
    first()
  ));

  loaded$ = createEffect(() => this.actions$.pipe(
    ofType(battleActions.loaded),
    switchMapTo(this.battlesService.getBattlesEvents()),
    map((x: Battle[]) => battleActions.changed(x)),
    takeUntil(this.actions$.pipe(ofType(battleActions.unload)))
  ));

  constructor(private actions$: Actions, private battlesService: BattlesService) { }
}
