import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { State } from 'app/modules/root-store';
import * as fromCurrentBattle from 'app/modules/root-store/current-battle';
import { RobotDefinitionsService } from '../../../services/robot-definitions.service';
import { Observable } from 'rxjs';
import { RobotDefinition } from '../../../models/robot-definition';
import { PREDEFINED_ROBOTS } from '../../../models/predefined-robots';
import { ListType } from '../../../models/list-type';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './new-battle.component.html',
  styleUrls: ['./new-battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewBattleComponent implements OnInit {
  form!: FormGroup;
  saving = false;
  predefinedRobots: ListType[] = PREDEFINED_ROBOTS;
  userRobots$!: Observable<RobotDefinition[]>;

  constructor(private fb: FormBuilder, private store: Store<State>, private robotDefinitionsService: RobotDefinitionsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      numberOfRounds: [null, Validators.required],
      predefinedRobots: [null],
      userRobots: [null]
    }, { validators: this.atLeastOneRobotSelected });

    this.userRobots$ = this.robotDefinitionsService.getAll().pipe(
      map(x => x.filter(y => y.compiled))
    );
  }

  save() {
    const value = this.form.value;
    this.store.dispatch(fromCurrentBattle.create({
      name: value.name,
      specification: {
        numberOfRounds: value.numberOfRounds,
        inactivityTime: 450,
        gunCoolingRate: 0.1,
        predefinedRobots: value.predefinedRobots,
        userRobots: value.userRobots, //['fc680f88-f17d-495d-9fee-e57cd4f38703'],
        battlefieldSpecification: {
          height: 600,
          width: 800
        }
      }
    }));
  }

  private atLeastOneRobotSelected(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    const selectedRobots = formValue.predefinedRobots?.length || 0 + formValue.userRobots?.length || 0;
    return selectedRobots > 0 ? null : { atLeastOneRobotSelected: true }
  }
}
