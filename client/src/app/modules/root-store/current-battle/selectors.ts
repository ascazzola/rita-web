import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BattleBundle } from 'models/battle-bundle';
import { selectAllById as selctBattlesById } from '../battles';
import { State } from './state';

const state = createFeatureSelector<State>('currentBattle');

export const selectLoading = createSelector(state,
  (currentState) => currentState.loading
);
export const selectCurrentBattle = createSelector(state, selctBattlesById,
  (currentState, battlesById) => ({
    state: currentState.current,
    definition: currentState.current?.id && battlesById[currentState.current.id]
  } as BattleBundle)
);
