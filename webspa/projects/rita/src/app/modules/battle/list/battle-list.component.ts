import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Battle } from 'models/battle';
import { State } from 'app/modules/root-store';
import * as fromBattles from 'app/modules/root-store/battles';

@Component({
  selector: 'app-battle-list',
  templateUrl: './battle-list.component.html',
  styleUrls: ['./battle-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleListComponent implements OnInit {
  battles$!: Observable<Battle[]>;
  displayedColumns: string[] = ['name', 'started', 'numberOfRounds', 'see'];

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.battles$ = this.store.pipe(select(fromBattles.selectAll));
  }

  viewBattle(battle: Battle) {
    console.log(battle);
  }

}
