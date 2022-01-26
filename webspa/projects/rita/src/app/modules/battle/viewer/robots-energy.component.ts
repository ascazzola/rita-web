import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Konva from 'konva';
import { STAGE } from './stage';
import { Group } from 'konva/lib/Group';
import { Robot } from '../../../models/robot';
import { BODY_SIZE } from '../../../services/images.service';

const PERCENTAGE_ID = 'percentage';

@Component({
  selector: 'app-robots-energy',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotsEnergyComponent implements OnInit, AfterViewInit, OnDestroy {
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
        const robotsToUpdate = robots.filter(x => existingIds.indexOf(x.name) >= 0);

        if (robotsToUpdate.length > 0) {
          console.error(robotsToUpdate);
        }

        this.addNewRobots(newRobots);
        this.deleteRobots(robotsToDelete);
        this.updateRobots(robotsToUpdate, existing);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }


  private addNewRobots(robots: Robot[]) {
    const height = 10;
    robots.forEach(robot => {
      var g = new Konva.Group({
        id: robot.name,
        width: 30,
        height: BODY_SIZE.width
      });

      g.position(this.getPosition(robot));

      var innerRect = new Konva.Rect({
        width: 100,
        height: height,
        fill: 'lightblue',
      });

      g.add(innerRect);

      var outerRect = new Konva.Rect({
        id: PERCENTAGE_ID,
        width: robot.energy,
        height: height,
        stroke: 'black',
        strokeWidth: 2,
        fill: this.getEnergy(robot.energy),
      });

      g.add(outerRect);

      this.layer.add(g);
    });
  }

  private deleteRobots(robotsToDelete: Group[]) {
    robotsToDelete.forEach(x => x.remove())
  }

  private updateRobots(robotsToUpdate: Robot[], existing: Group[]) {
    robotsToUpdate.forEach(robot => {
      const group = existing.find(x => x.id() === robot.name);

      if (!group) {
        throw "Group must exist";
      }

      const energy = group.children?.find(x => x.id() === PERCENTAGE_ID);

      if (!energy) {
        throw "Percentage must exist";
      }

      group.position(this.getPosition(robot));
      energy.width(robot.energy);
      (energy as any).fill(this.getEnergy(robot.energy));
    })
  }

  private getEnergy(energy: number): string {
    return energy > 50 ? 'green' : energy > 25 ? 'yellow' : 'red';
  }

  private getPosition(robot: Robot) {
    return {
      x: robot.x - BODY_SIZE.width,
      y: robot.y + BODY_SIZE.height + 5,
    }
  }
}
