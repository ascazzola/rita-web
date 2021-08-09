export interface BattleResult {
  teamLeaderName: string; // the name of the team leader.
  rank: number; // the rank of the robot in the battle.
  score: number; // the total score for the robot in the battle.
  survival: number; // the survival score for the robot in the battle
  lastSurvivorBonus: number; // the last survivor bonus for the robot in the battle
  bulletDamage: number; // the bullet damage score for the robot in the battle
  bulletDamageBonus: number; // the bullet damage bonus for the robot in the battle
  ramDamage: number; // the ramming damage for the robot in the battle
  ramDamageBonus: number; // the ramming damage bonus for the robot in the battle
  firsts: number; // the number of rounds this robot placed first
  seconds: number; // the number of rounds this robot placed second
  thirds: number; // the number of rounds this robot placed third
}

