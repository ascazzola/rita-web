import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as battleActions from './actions';
import { map, takeUntil, switchMap } from 'rxjs/operators';
import { BattlesService } from 'services/battles.service';

@Injectable()
export class CurrentBattleEffects {

  load$ = createEffect(() => this.actions$.pipe(
    ofType(battleActions.load),
    switchMap(action => this.battlesService.getBattleEvents(action.id)),
    map(event => {
      switch (event.type) {
        case 'RoundStartedEvent':
          return battleActions.roundStarted(event.round, event.startSnapshot);
        case 'TurnEndedEvent':
          return battleActions.snapshotChanged(event.turnSnapshot);
        case 'BattleCompletedEvent':
          return battleActions.battleFinished(event.results);
      }
    }),
    takeUntil(this.actions$.pipe(ofType(battleActions.unload)))
  ));

  constructor(private actions$: Actions, private battlesService: BattlesService) { }
}
