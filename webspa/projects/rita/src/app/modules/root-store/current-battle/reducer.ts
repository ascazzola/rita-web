import { createReducer, on, Action } from '@ngrx/store';
import { CurrentBattle } from 'models/current-battle';
import * as currentBattleActions from './actions';
import { initialState, State } from './state';

const currentBattleReducer = createReducer(
  initialState,
  on(currentBattleActions.create, _ => ({ loading: true })),
  on(currentBattleActions.load, (_, { id }) => ({ current: { id }, loading: false })),
  on(currentBattleActions.start, (state) => ({ ...state })),
  on(currentBattleActions.roundStarted, (state, { round, snapshot }) => ({
    current: { ...(state.current as CurrentBattle), round, snapshot },
    ...state
  })),
  on(currentBattleActions.snapshotChanged, (state, { snapshot }) => ({ current: { ...(state.current as CurrentBattle), snapshot }, ...state })),
  on(currentBattleActions.battleFinished, (state, { results }) => ({ current: { ...(state.current as CurrentBattle), results }, ...state })),
  on(currentBattleActions.unload, _ => ({ loading: false })),
);

export function reducer(state: State, action: Action) {
  return currentBattleReducer(state, action);
}
