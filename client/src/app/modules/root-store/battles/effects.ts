import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BattlesService } from 'services/battles.service';
import * as battleActions from './actions';
import { map, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class BattlesEffects {

  load$ = createEffect(() => this.battlesService.getBattlesEvents().pipe(
    map(x => battleActions.changed(x)),
    takeUntil(this.actions$.pipe(ofType(battleActions.unload)))
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(battleActions.create),
    switchMap(action => this.battlesService.createBattle(action.item)),
    tap(id => this.router.navigate(['battles', id, 'view']))
  ), { dispatch: false });

  start$ = createEffect(() => this.actions$.pipe(
    ofType(battleActions.start),
    switchMap(action => this.battlesService.startBattle(action.id))
  ), { dispatch: false });

  constructor(private actions$: Actions, private battlesService: BattlesService, private router: Router) { }
}
