import { Point } from './point';

export interface RobotDefinition {
  specificationId: string;
  position: Point;
  energy: number;
}

