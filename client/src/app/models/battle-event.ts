import { BattleSnapshot } from './battle-snapshot';
import { BattleResult } from './battle-result';

export type BattleEvent = BattleStarted | RoundStarted | TurnChanged | BattleFinished;

export interface BattleStarted {
    type: 'BattleStartedEvent';
    numberOfRounds: number;
    gunCoolingRate: number;
    inactivityTime: number;
    robotsCount: number;
    isReplay: boolean;
}

export interface RoundStarted {
    type: 'RoundStartedEvent';
    round: number;
    startSnapshot: BattleSnapshot;
}

export interface TurnChanged {
    type: 'TurnEndedEvent';
    turnSnapshot: BattleSnapshot;
}

export interface BattleFinished {
    type: 'BattleCompletedEvent';
    results: BattleResult[];
}
