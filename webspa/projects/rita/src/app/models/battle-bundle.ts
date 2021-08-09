import { CurrentBattle } from './current-battle';
import { Battle } from './battle';

export interface BattleBundle {
    state: CurrentBattle;
    definition: Battle;
}
