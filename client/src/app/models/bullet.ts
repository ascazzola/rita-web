export interface Bullet {
  state: string;
  power: number;
  x: number;
  y: number;
  paintX: number;
  paintY: number;
  color: number;
  frame: number;
  isExplosion: boolean;
  explosionImageIndex: number;
  bulletId: number;
  victimIndex: number;
  ownerIndex: number;
  heading: number;
}

