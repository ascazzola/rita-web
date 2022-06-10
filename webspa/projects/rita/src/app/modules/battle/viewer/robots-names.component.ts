import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Konva from 'konva';
import { STAGE } from './stage';
import { Group } from 'konva/lib/Group';
import { Robot } from '../../../models/robot';
import { BODY_SIZE } from '../../../services/images.service';
import { getPosition } from './positionFn';


@Component({
  selector: 'app-robots-names',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotsNamesComponent implements OnInit, AfterViewInit, OnDestroy {
  private robots$ = new ReplaySubject<Robot[]>(1);
  private onDestroy$ = new Subject();
  private layer = new Konva.Layer();

  @Input() set robots(val: Robot[]) {
    this.robots$.next(val.filter(x => x.energy > 0));
  }

  constructor(@Inject(STAGE) private stage: Konva.Stage) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.stage.add(this.layer);

    this.robots$.pipe(
      takeUntil(this.onDestroy$))
      .subscribe((robots) => {
        const receivedIds = robots.map(x => x.name);
        const existing = this.layer.getChildren() as Group[];
        const existingIds = existing.map(x => x.id());

        const newRobots = robots.filter(x => existingIds.indexOf(x.name) < 0);
        const robotsToDelete = existing.filter(x => receivedIds.indexOf(x.id()) < 0);

        this.addNewRobots(newRobots);
        this.deleteRobots(robotsToDelete);
        this.layer.moveToTop();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }


  private addNewRobots(robots: Robot[]) {
    robots.forEach(robot => {
      const position = getPosition(robot.x, robot.y);
      const text = new Konva.Text({
        text: robot.name,
        fill: 'white',
        x: position.x - BODY_SIZE.width,
        y: position.y -  BODY_SIZE.height - 5,
        align: 'center'
      });

      this.layer.add(text);
    });
  }

  private deleteRobots(robotsToDelete: Group[]) {
    robotsToDelete.forEach(x => x.remove())
  }
}
