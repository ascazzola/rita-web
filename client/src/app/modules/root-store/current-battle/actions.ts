import { createAction } from '@ngrx/store';
import { BattleSnapshot } from 'models/battle-snapshot';
import { BattleResult } from 'models/battle-result';

export const load = createAction('[CurrentBattle] load', (id: string) => ({ id }));
export const roundStarted = createAction('[CurrentBattle] round started', (round: number, snapshot: BattleSnapshot) =>
  ({ round, snapshot }));
export const snapshotChanged = createAction('[CurrentBattle] snapshot changed', (snapshot: BattleSnapshot) => ({ snapshot }));
export const battleFinished = createAction('[CurrentBattle] battle finished', (results: BattleResult[]) => ({ results }));
export const unload = createAction('[CurrentBattle] unload');
