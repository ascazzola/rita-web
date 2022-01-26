import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Konva from 'konva';
import { ImagesService } from '../../../services/images.service';
import { STAGE } from './stage';
import { Group } from 'konva/lib/Group';
import { Robot } from '../../../models/robot';


@Component({
  selector: 'app-deads-robots',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadsRobotsComponent implements OnInit, AfterViewInit, OnDestroy {
  private robots$ = new ReplaySubject<Robot[]>(1);
  private onDestroy$ = new Subject();
  private layer = new Konva.Layer();

  @Input() set robots(val: Robot[]) {
    this.robots$.next(val.filter(x => x.energy <= 0));
  }

  constructor(@Inject(STAGE) private stage: Konva.Stage, private imagesService: ImagesService) { }

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
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }


  addNewRobots(robots: Robot[]) {
    robots.forEach(robot => {
      const imgUrl = this.imagesService.getExplodeDebrisImagePath();
      Konva.Image.fromURL(imgUrl, (image: any) => {
        image.setAttrs({
          x: robot.x,
          y: robot.y,
        });

        image.id(robot.name);
        this.layer.add(image);
      });
    });
  }

  deleteRobots(robotsToDelete: Group[]) {
    robotsToDelete.forEach(x => x.remove())
  }
}
