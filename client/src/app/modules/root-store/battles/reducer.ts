import { createReducer, on, Action } from '@ngrx/store';
import * as battleActions from './actions';
import { initialState, adapter, State } from './state';

const battlesReducer = createReducer(
  initialState,
  on(battleActions.create, state => ({ ...state, loading: true })),
  on(battleActions.changed, (state, { items }) =>
    ({ loading: false, ...adapter.setAll(items, adapter.removeAll(state)) })),
  on(battleActions.unload, state => adapter.removeAll(state))
);

export function reducer(state: State | undefined, action: Action) {
  return battlesReducer(state, action);
}
