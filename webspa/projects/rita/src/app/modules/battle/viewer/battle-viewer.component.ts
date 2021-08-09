import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'app/modules/root-store';
import { ActivatedRoute } from '@angular/router';
import { map, first, tap, switchMapTo, shareReplay, filter, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import Konva from 'konva';
import * as fromCurrentBattle from 'app/modules/root-store/current-battle';
import { BattleBundle } from 'models/battle-bundle';
import { BattlefieldSpecification } from 'models/battle';
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
  private id$!: Observable<string>;
  stage!: Konva.Stage;
  battle$!: Observable<BattleBundle>; // ToDo remove it after develop map

  private battleContainer$ = new Subject<ElementRef>();

  @ViewChild('battle') set content(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.battleContainer$.next(content);
    }
  }

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id$ = this.activatedRoute.params.pipe(
      map(x => x.id),
      first(),
      shareReplay(1)
    );

    this.battle$ = this.id$.pipe(
      tap(id => this.store.dispatch(fromCurrentBattle.load(id))),
      switchMapTo(this.store.pipe(select(fromCurrentBattle.selectLoading))),
      filter(x => !x),
      switchMapTo(this.store.pipe(select(fromCurrentBattle.selectCurrentBattle))),
      shareReplay(1)
    );
  }

  ngAfterViewInit() {
    this.battleContainer$.pipe(
      switchMap(container =>
        this.battle$.pipe(
          tap(x => console.error(x)),
          filter(x => !!x.state.snapshot && !!x.definition),
          map(x => x.definition.specification.battlefieldSpecification),
          first(),
          map(specs => ({ container, specs }))
        )
      )
    ).subscribe(({ container, specs }) => {
        this.stage = new Konva.Stage({
          container: container.nativeElement,
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
    this.id$.subscribe(id => this.store.dispatch(fromCurrentBattle.start(id)));
  }

}

export interface BattleViewerModel {
  specification: BattlefieldSpecification;
  robots: Konva.Rect[];
}
