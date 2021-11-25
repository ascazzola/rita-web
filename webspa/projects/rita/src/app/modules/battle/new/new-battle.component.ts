import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'app/modules/root-store';
import * as fromCurrentBattle from 'app/modules/root-store/current-battle';

@Component({
  templateUrl: './new-battle.component.html',
  styleUrls: ['./new-battle.component.scss']
})
export class NewBattleComponent implements OnInit {
  form!: FormGroup;

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
  }

  newBattle() {
    this.store.dispatch(fromCurrentBattle.create({
      name: 'Test moqueado',
      specification: {
        numberOfRounds: 10,
        inactivityTime: 450,
        gunCoolingRate: 0.1,
        predefinedRobots: ['sample.Corners', 'sample.Walls'],
        userRobots: ['fc680f88-f17d-495d-9fee-e57cd4f38703'],
        battlefieldSpecification: {
          height: 600,
          width: 800
        }
      }
    }));
  }

}
