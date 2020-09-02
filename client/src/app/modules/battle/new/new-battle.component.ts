import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { State } from 'app/modules/root-store';
import * as fromBattles from 'app/modules/root-store/battles';

@Component({
  templateUrl: './new-battle.component.html',
  styleUrls: ['./new-battle.component.scss']
})
export class NewBattleComponent implements OnInit {
  loading$: Observable<boolean>;
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<State>) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      numberOfRounds: [null, Validators.required],
      inactivityTime: [null, Validators.required],
      gunCoolingRate: [null, Validators.required],
      robots: [null, Validators.required],
      battlefieldSpecification: [null, Validators.required]
    });

    this.loading$ = this.store.pipe(select(fromBattles.selectLoading));
  }

  newBattle() {
    this.store.dispatch(fromBattles.create({
      name: 'Test moqueado',
      specification: {
        numberOfRounds: 10,
        inactivityTime: 450,
        gunCoolingRate: 0.1,
        robots: ['sample.Corners', 'sample.Walls'],
        battlefieldSpecification: {
          height: 600,
          width: 800
        }
      }
    }));
  }

}
