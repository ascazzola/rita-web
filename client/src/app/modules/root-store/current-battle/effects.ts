import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as battleActions from './actions';
import { map, takeUntil, switchMap, tap, filter, first } from 'rxjs/operators';
import { BattlesService } from 'services/battles.service';
import { selectAllById as selectBattlesById } from '../battles';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { State } from '..';
import { concat } from 'rxjs';

@Injectable()
export class CurrentBattleEffects {

  loaded$ = createEffect(() => this.actions$.pipe(
    ofType(battleActions.load),
    switchMap(action => this.battlesService.getBattleEvents(action.id).pipe(
      filter(x => !!x),
      takeUntil(this.actions$.pipe(ofType(battleActions.unload)))
    )),
    map(event => {
      switch (event.type) {
        case 'BattleStarted':
          return battleActions.battleStarted(); // ToDo review
        case 'RoundStarted':
          return battleActions.roundStarted(event.round, event.startSnapshot);
        case 'TurnEnded':
          return battleActions.snapshotChanged(event.turnSnapshot);
        case 'BattleCompletedEvent':
          return battleActions.battleFinished(event.results);
      }
    })
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

  constructor(private actions$: Actions, private battlesService: BattlesService, private router: Router, private store: Store<State>) { }
}
