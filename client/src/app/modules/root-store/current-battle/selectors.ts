import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './state';
import { selectAllById as SelectBattlesById } from '../battles';

const state = createFeatureSelector<State>('currentBattle');

export const selectCurrentBattle = createSelector(state, SelectBattlesById,
  (currentBattle, battlesById) => {
    const battle = battlesById[currentBattle.id];
    return {
      battle,
      snapshot: currentBattle.snapshot,
      specification: battle && battle.specification
    };
  });
