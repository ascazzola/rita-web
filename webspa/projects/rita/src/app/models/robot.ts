export interface Robot {
  name: string;
  shortName: string;
  veryShortName: string;
  teamName: string;
  robotIndex: number;
  teamIndex: number;
  state: RobotState;
  energy: number;
  velocity: number;
  gunHeat: number;
  bodyHeading: number;
  gunHeading: number;
  radarHeading: number;
  x: number;
  y: number;
  bodyColor: number;
  gunColor: number; // an ARGB color value. (Bits 24-31 are alpha, 16-23 are red, 8-15 are green, 0-7 are blue)
  radarColor: number;
  scanColor: number;
  isDrioid: boolean;
  isSentryRobot: boolean;
  isPaintRobot: boolean;
  isPaintEnabled: boolean;
  isSGPaintEnabled: boolean;
  scanArc: {
    x: number;
    y: number;
    w: number;
    h: number;
    start: number;
    extent: number;
    type: number;
  };
}


export type RobotState = 'ACTIVE' | 'HIT_WALL' | 'HIT_ROBOT' | 'DEAD';
