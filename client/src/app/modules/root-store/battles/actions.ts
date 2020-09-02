import { createAction } from '@ngrx/store';
import { Battle, NewBattle } from 'models/battle';

export const create = createAction('[Battles] create', (item: NewBattle) => ({ item }));
export const load = createAction('[Battles] load');
export const start = createAction('[Battles] start', (id: string) => ({ id }));
export const unload = createAction('[Battles] unload');
export const changed = createAction('[Battles] changed', (items: Battle[]) => ({ items }));
