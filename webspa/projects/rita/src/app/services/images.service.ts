import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

const BATTLE_IMAGES_PATH = 'assets/battle/';
const BODY_URI = '/assets/battle/body.svg';
const TURRET_URI = '/assets/battle/turret.svg';
const EXPLOSION_IMAGES_PATH = 'assets/battle/explosion';
export const DYNAMIC_COLOR_CLASS = 'dynamic-color';
export const BODY_SIZE = { width: 36, height: 36 };
export const TURRET_SIZE = { width: 20, height: 54 };

@Injectable({ providedIn: 'root' })
export class ImagesService {
  bodyImage$: Observable<string>;
  turretImage$: Observable<string>;

  constructor(private httpClient: HttpClient) {
    this.bodyImage$ = this.httpClient.get(BODY_URI, { responseType: 'text' }).pipe(
      shareReplay(1)
    );

    this.turretImage$ = this.httpClient.get(TURRET_URI, { responseType: 'text' }).pipe(
      shareReplay(1)
    );
  }

  getExplosionImagePath(explosionIndex: number, frame: number) {
    return `${EXPLOSION_IMAGES_PATH}/explosion${explosionIndex}-${frame}.png`;
  }

  getExplodeDebrisImagePath() {
    return `${BATTLE_IMAGES_PATH}/explode_debris.png`;
  }
}
