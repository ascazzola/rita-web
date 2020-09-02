import { Robot } from './robot';
import { Bullet } from './bullet';

export interface BattleSnapshot {
  robots: Robot[];
  bullets: Bullet[];
  round: number;
  turn: number;
  sortedTeamScores: any[];
  indexedTeamScores: any[];
}
