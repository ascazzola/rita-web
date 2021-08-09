import { BattleSnapshot } from './battle-snapshot';
import { BattleResult } from './battle-result';

export interface CurrentBattle {
  id: string;
  round?: number;
  snapshot?: BattleSnapshot;
  results?: BattleResult[];
}
