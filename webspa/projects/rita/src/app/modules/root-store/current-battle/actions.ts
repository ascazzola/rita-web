import { createAction } from '@ngrx/store';
import { NewBattle } from '../../../models/battle';
import { BattleResult } from '../../../models/battle-result';
import { BattleSnapshot } from '../../../models/battle-snapshot';

export const create = createAction('[CurrentBattle] create', (item: NewBattle) => ({ item }));
export const load = createAction('[CurrentBattle] load', (id: string) => ({ id }));
export const start = createAction('[CurrentBattle] start', (id: string) => ({ id }));
export const battleStarted = createAction('[CurrentBattle] started');
export const roundStarted = createAction('[CurrentBattle] round started', (round: number, snapshot: BattleSnapshot) =>
  ({ round, snapshot }));
  export const roundEnded = createAction('[CurrentBattle] round ended', (round: number, turns: number, totalTurns: number) =>
  ({ round, turns, totalTurns }));
export const snapshotChanged = createAction('[CurrentBattle] snapshot changed', (round: number, snapshot: BattleSnapshot) => ({ round, snapshot }));
export const battleFinished = createAction('[CurrentBattle] battle finished', (result: BattleResult[]) => ({ result }));
export const unload = createAction('[CurrentBattle] unload');
