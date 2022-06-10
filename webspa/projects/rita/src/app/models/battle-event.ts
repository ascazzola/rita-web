import { BattleSnapshot } from './battle-snapshot';
import { BattleResult } from './battle-result';

export type BattleEvent = BattleStarted | RoundStarted | RoundEnded | TurnChanged | BattleFinished;

export interface BattleStarted {
    id: string;
    type: 'BattleStarted';
    numberOfRounds: number;
    gunCoolingRate: number;
    inactivityTime: number;
    robotsCount: number;
    isReplay: boolean;
}

export interface RoundStarted {
    id: string;
    type: 'RoundStarted';
    round: number;
    startSnapshot: BattleSnapshot;
}

export interface TurnChanged {
    id: string;
    type: 'TurnEnded';
    round: number;
    turnSnapshot: BattleSnapshot;
}

export interface BattleFinished {
    id: string;
    type: 'BattleCompleted';
    result: BattleResult[];
}


export interface RoundEnded {
  id: string;
  type: 'RoundEnded';
  round: number;
  turns: number;
  totalTurns: number;
}
