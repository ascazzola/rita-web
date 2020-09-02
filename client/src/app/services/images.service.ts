import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import Konva from 'konva';
import { getColor } from 'app/modules/shared/get-color.fn';

const DYNAMIC_COLOR_CLASS = 'dynamic-color';
const BODY_URI = '/assets/battle/body.svg';
const TURRET_URI = '/assets/battle/turret.svg';
const BODY_SIZE = { width: 36, height: 36 };
const TURRET_SIZE = { width: 20, height: 54 };

@Injectable({ providedIn: 'root' })
export class ImagesService {
  private bodyImage$: Observable<string>;
  private turretImage$: Observable<string>;

  constructor(private httpClient: HttpClient) {
    this.bodyImage$ = this.httpClient.get(BODY_URI, { responseType: 'text' }).pipe(
      shareReplay(1)
    );

    this.turretImage$ = this.httpClient.get(TURRET_URI, { responseType: 'text' }).pipe(
      shareReplay(1)
    );
  }

  getRobotImage(bodyRgba: number, turretRgba: number, x: number, y: number): Observable<Konva.Group> {
    return combineLatest([this.bodyImage$, this.turretImage$]).pipe(
      map(([bodyImg, turretImg]) => {
        const body = this.getColoredGroup(bodyImg, getColor(bodyRgba), BODY_SIZE);
        const turret = this.getColoredGroup(turretImg, getColor(turretRgba), TURRET_SIZE);
        turret.setPosition({
          x: 8,
          y: -8
        });
        body.add(turret);
        body.setPosition({
          x: x - (BODY_SIZE.width / 2),
          y: y - (BODY_SIZE.height / 2),
        });
        return body;
      })
    );
  }

  private getColoredGroup = (image: string, color: string, size: { width: number, height: number }): Konva.Group => {
    const g = new Konva.Group({
      width: size.width,
      height: size.height,
    });

    const parser = new DOMParser();
    const document = parser.parseFromString(image, 'image/svg+xml');
    const elements = document.getElementsByClassName(DYNAMIC_COLOR_CLASS);

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < elements.length; index++) {
      elements[index].setAttribute('fill', color);
    }

    const paths = document.getElementsByTagName('path');

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < paths.length; index++) {
      const item = paths[index];
      g.add(new Konva.Path({
        fill: item.getAttribute('fill'),
        data: item.getAttribute('d')
      }));
    }

    return g;
  }
}
