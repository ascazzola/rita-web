import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'app/modules/root-store';
import { ActivatedRoute } from '@angular/router';
import * as fromBattles from 'app/modules/root-store/battles';
import * as fromCurrentBattle from 'app/modules/root-store/current-battle';
import { map, first, tap, switchMapTo, shareReplay, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CurrentBattle } from 'models/current-battle';
import { BattlefieldSpecification } from 'models/battle';
import Konva from 'konva';
import { STAGE } from './stage';

@Component({
  templateUrl: './battle-viewer.component.html',
  styleUrls: ['./battle-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: STAGE, useFactory: (comp: BattleViewerComponent) =>
      comp.stage,
    deps: [BattleViewerComponent]
  }]
})
export class BattleViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  private id$: Observable<string>;
  private stage: Konva.Stage;
  battle$: Observable<CurrentBattle>; // ToDo remove it after develop map

  @ViewChild('battle') battleContainer: ElementRef;

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id$ = this.battle$ = this.activatedRoute.params.pipe(
      map(x => x.id),
      first(),
      shareReplay(1)
    );

    this.battle$ = this.id$.pipe(
      tap(id => this.store.dispatch(fromCurrentBattle.load(id))),
      switchMapTo(this.store.pipe(select(fromCurrentBattle.selectCurrentBattle))),
      filter(x => !!x.snapshot),
      shareReplay(1)
    );
  }

  ngAfterViewInit() {
    this.battle$.pipe(map(x => x.specification.battlefieldSpecification), first()).subscribe(specs => {
      this.stage = new Konva.Stage({
        container: this.battleContainer.nativeElement,
        width: specs.width,
        height: specs.height,
        visible: true
      });
    });
  }

  ngOnDestroy() {
    this.store.dispatch(fromCurrentBattle.unload());
  }

  startBattle() {
    this.id$.subscribe(id => this.store.dispatch(fromBattles.start(id)));
  }

}

export interface BattleViewerModel {
  specification: BattlefieldSpecification;
  robots: Konva.Rect[];
}
