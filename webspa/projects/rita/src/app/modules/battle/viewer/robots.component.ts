import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject, combineLatest } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';
import Konva from 'konva';
import { ImagesService } from '../../../services/images.service';
import { STAGE } from './stage';
import { Group } from 'konva/lib/Group';
import { Robot } from '../../../models/robot';

@Component({
  selector: 'app-robots',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotsComponent implements OnInit, AfterViewInit, OnDestroy {
  private robots$ = new ReplaySubject<Robot[]>(1);
  private onDestroy$ = new Subject();
  private layer = new Konva.Layer();

  @Input() set robots(val: Robot[]) {
    this.robots$.next(val);
  }

  constructor(@Inject(STAGE) private stage: Konva.Stage, private imagesService: ImagesService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.stage.add(this.layer);


    this.robots$.pipe(
      map(robots => robots.filter(r => r.energy > 0)),
      switchMap(robots =>
        combineLatest(robots.map(robot =>
          this.imagesService.getRobotImage(robot.name, robot.energy, robot.bodyColor, robot.gunColor, robot.x, robot.y, robot.bodyHeading, robot.gunHeading)))
      ),
      takeUntil(this.onDestroy$))
      .subscribe((robots: Group[]) => {
        this.layer.removeChildren();
        robots.forEach(r => this.layer.add(r));
        this.layer.draw();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}

