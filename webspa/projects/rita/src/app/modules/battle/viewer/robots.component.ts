import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Inject, OnInit } from '@angular/core';
import { ReplaySubject, Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import Konva from 'konva';
import { BODY_SIZE, DYNAMIC_COLOR_CLASS, ImagesService, TURRET_SIZE } from '../../../services/images.service';
import { STAGE } from './stage';
import { Group } from 'konva/lib/Group';
import { Robot } from '../../../models/robot';
import { getColor } from '../../shared/get-color.fn';

const TURRET_ID = 'turret';
const DEGREES_CONVERSION_FACTOR = 57.2958;
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

    const robots$ = this.robots$.pipe(map(robots => robots.filter(r => r.energy > 0)));
    combineLatest([robots$, this.imagesService.bodyImage$, this.imagesService.turretImage$]).pipe(
      takeUntil(this.onDestroy$))
      .subscribe(([robots, bodyImage, turretImage]) => {
        const receivedIds = robots.map(x => x.name);
        const existing = this.layer.getChildren() as Group[];
        const existingIds = existing.map(x => x.id());

        const newRobots = robots.filter(x => existingIds.indexOf(x.name) < 0);
        const robotsToDelete = existing.filter(x => receivedIds.indexOf(x.id()) < 0);
        const robotsToUpdate = robots.filter(x => existingIds.indexOf(x.name) >= 0);

        this.addNewRobots(newRobots, bodyImage, turretImage);
        this.deleteRobots(robotsToDelete);
        this.updateRobots(robotsToUpdate, existing);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }


  addNewRobots(robots: Robot[], bodyImg: string, turretImg: string) {
    robots.forEach(robot => {
      const body = this.getColoredGroup(bodyImg, getColor(robot.bodyColor), BODY_SIZE);
      body.id(robot.name);

      const turret = this.getColoredGroup(turretImg, getColor(robot.gunColor), TURRET_SIZE);
      turret.id(TURRET_ID);
      turret.setPosition({
        x: 8 + turret.width() / 2,
        y: -8 + turret.height() / 2
      });

      turret.offsetY(turret.height() / 2);
      turret.offsetX(turret.width() / 2);

      body.add(turret);
      body.offsetY(body.height() / 2);
      body.offsetX(body.width() / 2);

      this.positionRobot(robot, body, turret);

      this.layer.add(body);
    });
  }

  deleteRobots(robotsToDelete: Group[]) {
    robotsToDelete.forEach(x => x.remove())
  }

  updateRobots(robotsToUpdate: Robot[], existing: Group[]) {
    robotsToUpdate.forEach(robot => {
      const body = existing.find(x => x.id() === robot.name);

      if (!body) {
        throw "body cannot be null"
      }

      const turret = body.getChildren(x => x.id() == TURRET_ID)[0] as Group;

      if (!turret) {
        throw "Turret cannot be null"
      }

      this.positionRobot(robot, body, turret);
    })
  }

  private getColoredGroup = (image: string, color: string, size: { width: number, height: number }): Konva.Group => {
    const g = new Konva.Group({
      width: size.width,
      height: size.height
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
        fill: item.getAttribute('fill') || undefined,
        data: item.getAttribute('d') || undefined
      }));
    }

    return g;
  }

  private positionRobot(robot: Robot, body: Group, turret: Group) {
    const bodyRotation = robot.bodyHeading * DEGREES_CONVERSION_FACTOR;
    if (body.rotation() !== bodyRotation) {
      body.rotation(robot.bodyHeading * DEGREES_CONVERSION_FACTOR);
    }

    const turretRotation = robot.gunHeading * DEGREES_CONVERSION_FACTOR;
    if (turret.rotation() !== turretRotation) {
      turret.rotation(turretRotation);
    }

    body.setPosition(this.getBodyPosition(robot.x, robot.y));
  }

  private getBodyPosition(x: number, y: number) {
    return {
      x: x,
      y: y,
    };
  }
}
