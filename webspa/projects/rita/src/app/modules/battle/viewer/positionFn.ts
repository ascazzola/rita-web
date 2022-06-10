import { BATTLE_HEIGHT } from "../../../models/battle";

export function getPosition(x: number, y: number) {
  return {
    x: x,
    y: BATTLE_HEIGHT - y,
  }
}
