import { BattleSpecification, Battle } from './battle';
import { BattleSnapshot } from './battle-snapshot';

export interface CurrentBattle {
  battle: Battle;
  specification: BattleSpecification;
  snapshot: BattleSnapshot;
}
