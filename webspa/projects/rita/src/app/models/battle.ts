import { Robot } from './robot';

export interface Battle {
  id: string;
  name: string;
  specification: BattleSpecification;
  started: boolean;
}

export interface BattleSpecification {
  numberOfRounds: number;
  inactivityTime: number;
  gunCoolingRate: number;
  robots: Robot[];
  battlefieldSpecification: BattlefieldSpecification;
}

export interface NewBattle {
  name: string;
  specification: NewBattleSpecification;
}

export interface NewBattleSpecification {
  numberOfRounds: number;
  inactivityTime: number;
  gunCoolingRate: number;
  predefinedRobots: {[key: string]: RobotPosition | null};
  userRobots: {[key: string]: RobotPosition | null};
  battlefieldSpecification: BattlefieldSpecification;
}

export interface RobotPosition {
  first: number | null;
  second: number | null;
  third: number | null;
}

export interface BattlefieldSpecification {
  height: number;
  width: number;
}

export const BATTLE_HEIGHT = 600;
export const BATTLE_WIDTH = 800;

