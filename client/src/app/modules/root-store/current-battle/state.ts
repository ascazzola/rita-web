import { CurrentBattle } from 'models/current-battle';

export interface State {
  current: CurrentBattle;
  loading: boolean;
}

export const initialState = null;
