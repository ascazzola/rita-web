import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Battle } from 'models/battle';


export interface State extends EntityState<Battle> { }

export const adapter = createEntityAdapter<Battle>();

export const initialState: State = adapter.getInitialState();

