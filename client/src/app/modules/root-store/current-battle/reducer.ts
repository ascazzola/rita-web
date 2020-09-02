import { createReducer, on, Action } from '@ngrx/store';
import * as currentBattleActions from './actions';
import { initialState, State } from './state';

const currentBattleReducer = createReducer(
  initialState,
  on(currentBattleActions.load, (_, { id }) => ({ id })),
  on(currentBattleActions.roundStarted, (state, { round, snapshot }) => ({ ...state, round, snapshot })),
  on(currentBattleActions.snapshotChanged, (state, { snapshot }) => ({ ...state, snapshot })),
  on(currentBattleActions.battleFinished, (state, { results }) => ({ ...state, results })),
  on(currentBattleActions.unload, _ => null),
);

export function reducer(state: State | undefined, action: Action) {
  return currentBattleReducer(state, action);
}
