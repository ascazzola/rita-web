import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Konva from 'konva';
import { STAGE } from './stage';
// import { getColor } from 'app/modules/shared/get-color.fn';
import { Bullet } from '../../../models/bullet';
import { Group } from 'konva/lib/Group';
import { getColor } from '../../shared/get-color.fn';
import { getPosition } from './positionFn';

@Component({
  selector: 'app-bullets',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulletsComponent implements OnInit, AfterViewInit, OnDestroy {
  private bullets$ = new ReplaySubject<Bullet[]>(1);
  private onDestroy$ = new Subject();
  private layer = new Konva.Layer();

  @Input() set bullets(val: Bullet[]) {
    this.bullets$.next(val.filter(x => !x.isExplosion));
  }

  constructor(@Inject(STAGE) private stage: Konva.Stage) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.stage.add(this.layer);
    this.bullets$.pipe(takeUntil(this.onDestroy$))
      .subscribe(bullets => {
        const receivedIds = bullets.map(x => x.bulletId.toString());
        const existing = this.layer.getChildren() as Group[];
        const existingIds = existing.map(x => x.id());

        const newBullets = bullets.filter(x => existingIds.indexOf(x.bulletId.toString()) < 0);
        const bulletsToDelete = existing.filter(x => receivedIds.indexOf(x.id()) < 0);
        const bulletsToUpdate = bullets.filter(x => existingIds.indexOf(x.bulletId.toString()) >= 0);


        this.addNewBullets(newBullets);
        this.deleteBullets(bulletsToDelete);
        this.updateBullets(bulletsToUpdate, existing);
      });
  }

  private addNewBullets(bullets: Bullet[]) {
    bullets.forEach(b => {
      const position = getPosition(b.x, b.y);
      const circle = new Konva.Circle({
        x: position.x,
        y: position.y,
        radius: b.power * 2,
        fill: getColor(b.color),
        id: b.bulletId.toString()
      });
      // add the shape to the layer
      this.layer.add(circle);
    });
  }

  private deleteBullets(bulletsToDelete: Group[]) {
    bulletsToDelete.forEach(x => x.remove())
  }

  private updateBullets(bulletsToUpdate: Bullet[], existing: Group[]) {
    bulletsToUpdate.forEach(bullet => {
        const currentBullet = existing.find(x => x.id() === bullet.bulletId.toString());

        if (!currentBullet) {
          throw "Bullet cannot be null";
        }

        currentBullet!.setPosition(getPosition(bullet.x, bullet.y);
        (currentBullet as any).radius(bullet.power * 2);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}

