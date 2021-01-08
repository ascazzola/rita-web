import { createReducer, on, Action } from '@ngrx/store';
import * as currentBattleActions from './actions';
import { initialState, State } from './state';

const currentBattleReducer = createReducer(
  initialState,
  on(currentBattleActions.create, _ => ({ loading: true })),
  on(currentBattleActions.load, (_, { id }) => ({ current: { id }, loading: false })),
  on(currentBattleActions.start, (state) => ({ current: { ...state.current } })),
  on(currentBattleActions.roundStarted, (state, { round, snapshot }) => ({
    current: { ...state.current, round, snapshot }
  })),
  on(currentBattleActions.snapshotChanged, (state, { snapshot }) => ({ current: { ...state.current, snapshot } })),
  on(currentBattleActions.battleFinished, (state, { results }) => ({ current: { ...state.current, results } })),
  on(currentBattleActions.unload, _ => ({})),
);

export function reducer(state: State | undefined, action: Action) {
  return currentBattleReducer(state, action);
}
