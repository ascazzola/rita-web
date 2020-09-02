import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Konva from 'konva';
import { STAGE } from './stage';
import { Bullet } from 'models/bullet';
import { getColor } from 'app/modules/shared/get-color.fn';

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
    this.bullets$.next(val);
  }

  constructor(@Inject(STAGE) private stage: Konva.Stage) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.stage.add(this.layer);
    this.bullets$.pipe(takeUntil(this.onDestroy$))
      .subscribe(bullets => {
        this.layer.removeChildren();
        bullets.forEach(b => {
          const circle = new Konva.Circle({
            x: b.x,
            y: b.y,
            radius: b.power * 2,
            fill: getColor(b.color)
          });
          // add the shape to the layer
          this.layer.add(circle);
        });
        this.layer.draw();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}

