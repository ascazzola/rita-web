import { createReducer, on, Action } from '@ngrx/store';
import { CurrentBattle } from '../../../models/current-battle';
import * as currentBattleActions from './actions';
import { initialState, State } from './state';

const currentBattleReducer = createReducer(
  initialState,
  on(currentBattleActions.create, _ => ({ loading: true })),
  on(currentBattleActions.load, (_, { id }) => ({ current: { id }, loading: false })),
  on(currentBattleActions.start, (state) => ({ ...state })),
  on(currentBattleActions.roundStarted, (state, { round, snapshot }) => ({
    ...state,
    current: { ...(state.current as CurrentBattle), round, snapshot },
  })),
  on(currentBattleActions.snapshotChanged, (state, { snapshot }) => ({  ...state, current: { ...(state.current as CurrentBattle), snapshot } })),
  on(currentBattleActions.battleFinished, (state, { results }) => ({ ...state, current: { ...(state.current as CurrentBattle), results }})),
  on(currentBattleActions.unload, _ => ({ loading: false })),
);

export function reducer(state: State, action: Action) {
  return currentBattleReducer(state, action);
}
