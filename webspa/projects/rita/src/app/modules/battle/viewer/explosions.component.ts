import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Konva from 'konva';
import { STAGE } from './stage';
import { Bullet } from '../../../models/bullet';
import { ImagesService } from '../../../services/images.service';
import { Group } from 'konva/lib/Group';
import { getPosition } from './positionFn';

const EXPLOSIONS_LENGTH = 2;
const EXPOSIONS_LENGHT = [17, 71];
@Component({
  selector: 'app-explosions',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplosionsComponent implements OnInit, AfterViewInit, OnDestroy {
  private bullets$ = new ReplaySubject<Bullet[]>(1);
  private onDestroy$ = new Subject();
  private layer = new Konva.Layer();

  @Input() set bullets(val: Bullet[]) {
    //TODO review index and frame functionality
    this.bullets$.next(val.filter(x => x.explosionImageIndex < EXPLOSIONS_LENGTH && x.frame < EXPOSIONS_LENGHT[x.explosionImageIndex]));
  }

  constructor(@Inject(STAGE) private stage: Konva.Stage, private imagesService: ImagesService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.stage.add(this.layer);
    this.bullets$.pipe(takeUntil(this.onDestroy$), distinctUntilChanged())
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
      this.AddBullet(b);
    });
  }

  private deleteBullets(bulletsToDelete: Group[]) {
    bulletsToDelete.forEach(x => x.remove());
  }

  private updateBullets(bulletsToUpdate: Bullet[], existing: Group[]) {
    bulletsToUpdate.forEach(bullet => {
      const currentBullet = existing.find(x => x.id() === bullet.bulletId.toString()) as any;

      if (!currentBullet) {
        throw "Bullet cannot be null";
      }

      currentBullet.remove();
      this.AddBullet(bullet);
    });
  }

  private AddBullet(b: Bullet) {
    const imgUrl = this.imagesService.getExplosionImagePath(b.explosionImageIndex + 1, b.frame + 1);
    const position = getPosition(b.paintX, b.paintY);
    Konva.Image.fromURL(imgUrl, (image: any) => {
      image.setAttrs({
        x: position.x,
        y: position.y,
      });

      image.id(b.bulletId.toString());
      this.layer.add(image);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}

