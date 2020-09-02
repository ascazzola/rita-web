import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, first, tap } from 'rxjs/operators';
import { BattlesService } from '../../services/battles.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'battle-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BattleDetailComponent implements OnInit {
  private id$: Observable<string>;
  events$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute, private battlesService: BattlesService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.id$ = this.activatedRoute.params.pipe(
      map(x => x.id),
      first()
    );

    this.events$ = this.id$.pipe(
      switchMap(id => this.battlesService.getBattleEvents(id)),
      tap(_ => this.changeDetector.detectChanges()));

    this.events$.subscribe(x => console.log('received event', x));
  }

  startBattle() {
    this.activatedRoute.params.pipe(
      map(x => x.id),
      switchMap(id => this.battlesService.startBattle(id)),
      first()
    )
      .subscribe(() => console.log('battleStarted'));
  }
}
