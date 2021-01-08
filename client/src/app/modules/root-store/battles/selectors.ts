import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from './state';


const selectors = adapter.getSelectors();

const getBattlesState = createFeatureSelector<State>('battles');

export const selectAll = createSelector(getBattlesState, selectors.selectAll);
export const selectAllById = createSelector(getBattlesState, selectors.selectEntities);
