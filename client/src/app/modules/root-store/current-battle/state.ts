import { BattleSnapshot } from 'models/battle-snapshot';
import { BattleResult } from 'models/battle-result';

export interface State {
  id: string;
  round: number;
  snapshot: BattleSnapshot;
  results?: BattleResult[];
}
/* Si la batalla no está inciada ---> State == null.
   Si la batalla no está terminada ---> Results == null
*/

export const initialState = null;
