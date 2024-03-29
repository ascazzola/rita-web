import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BattleBundle } from 'models/battle-bundle';
import { selectAllById as selectBattlesById } from '../battles';
import { State } from './state';

const state = createFeatureSelector<State>('currentBattle');

export const selectLoading = createSelector(state,
  (currentState) => currentState.loading
);
export const selectCurrentBattle = createSelector(state, selectBattlesById,
  (currentState, battlesById) => ({
    state: currentState.current,
    definition: currentState.current?.id && battlesById[currentState.current.id]
  } as BattleBundle)
);
