import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Battle } from '../../../models/battle';
import { State } from '../../root-store/battles';
import * as fromBattles from '../../root-store/battles';

@Component({
  templateUrl: 'battles-browse.component.html',
  styleUrls: ['./battles-browse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BatttlesBrowseComponent implements OnInit {
  battles$!: Observable<Battle[]>;
  displayedColumns: string[] = ['name', 'started', 'numberOfRounds', 'see'];

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.battles$ = this.store.pipe(select(fromBattles.selectAll));
  }

  viewBattle(battle: Battle) {
  }

}
