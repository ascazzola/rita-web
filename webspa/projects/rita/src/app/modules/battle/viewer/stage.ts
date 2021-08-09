import { InjectionToken } from '@angular/core';
import Konva from 'konva';

export const STAGE = new InjectionToken<Konva.Stage>('Stage');
