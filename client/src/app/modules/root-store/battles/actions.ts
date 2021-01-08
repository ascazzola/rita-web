import { createAction } from '@ngrx/store';
import { Battle } from 'models/battle';

export const load = createAction('[Battles] load');
export const loaded = createAction('[Battles] loaded', (items: Battle[]) => ({ items }));
export const changed = createAction('[Battles] changed', (items: Battle[]) => ({ items }));
export const unload = createAction('[Battles] unload');

