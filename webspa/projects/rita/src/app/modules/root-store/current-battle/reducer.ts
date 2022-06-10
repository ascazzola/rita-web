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
  on(currentBattleActions.roundEnded, (state, { round, turns, totalTurns }) => ({ ...state, current: { ...(state.current as CurrentBattle)} })),
  on(currentBattleActions.snapshotChanged, (state, { round, snapshot }) => ({ ...state, current: { ...(state.current as CurrentBattle), round, snapshot } })),
  on(currentBattleActions.battleFinished, (state, { result }) => ({ ...state, current: { ...(state.current as CurrentBattle), result, finalized: true } })),
  on(currentBattleActions.unload, _ => ({ loading: false })),
);

export function reducer(state: State, action: Action) {
  return currentBattleReducer(state, action);
}
