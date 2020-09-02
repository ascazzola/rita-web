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
  robots: string[];
  battlefieldSpecification: BattlefieldSpecification;
}

export interface BattlefieldSpecification {
  height: number;
  width: number;
}


