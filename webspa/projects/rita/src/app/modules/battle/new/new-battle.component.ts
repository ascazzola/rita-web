import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { State } from '../../root-store';
import * as fromCurrentBattle from '../../root-store/current-battle';
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
      predefinedRobots: this.fb.array([]), 
      userRobots: this.fb.array([]),
    }, { validators: this.atLeastOneRobotSelected });

    this.userRobots$ = this.robotDefinitionsService.getAll().pipe(
      map(x => x.filter(y => y.compiled))
    );
  }

  save() {
    this.saving = true;
    const value = this.form.value;
    const predefinedRobots = ((value.predefinedRobots as RobotDefinitionSelected[]) || []).reduce((ac,a) => ({...ac,[a.id]: {
      first: a.first,
      third: a.third,
      second: a.second,
    }}),{});
    const userRobots = ((value.userRobots as RobotDefinitionSelected[]) || []).reduce((ac,a) => ({...ac,[a.id]: {
      first: a.first,
      third: a.third,
      second: a.second,
    }}),{});
    this.store.dispatch(fromCurrentBattle.create({
      name: value.name,
      specification: {
        numberOfRounds: value.numberOfRounds,
        inactivityTime: 450,
        gunCoolingRate: 0.1,
        predefinedRobots: predefinedRobots,
        userRobots: userRobots,
        battlefieldSpecification: {
          height: 600,
          width: 800
        }
      }
    }));
  }

  predefinedRobotsChanged(definitions: RobotDefinition[]): void {
    const predefinedRobotsFormArray = this.form.controls.predefinedRobots as FormArray;
    this.robotsChanged(predefinedRobotsFormArray, definitions);
  }

  userRobotsChanged(definitions: RobotDefinition[]): void {
    const userRobotsFormArray = this.form.controls.userRobots as FormArray;
    this.robotsChanged(userRobotsFormArray, definitions);
  }

  private robotsChanged(formArray: FormArray, definitions: RobotDefinition[]): void {
    const currentDefinitions = formArray.value as RobotDefinition[];
    const definitionsValue = this.getDefinitionsValue(currentDefinitions, definitions);
    formArray.clear();
    definitionsValue.map(this.getRobotFormGroup).forEach(group => formArray.push(group));
    formArray.updateValueAndValidity();
  }
  private getDefinitionsValue(currentDefinitions: RobotDefinition[], definitions: RobotDefinition[]) {
    const currentWithoutRemoved = currentDefinitions.filter(x => definitions.find(y => y.id == x.id));
    const definitionsToAdd = definitions.filter(x => !currentDefinitions.find(y => y.id == x.id));
    const definitionsValue = currentWithoutRemoved.concat(definitionsToAdd);
    return definitionsValue;
  }

  private atLeastOneRobotSelected(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    const selectedRobots = formValue.predefinedRobots?.length || 0 + formValue.userRobots?.length || 0;
    return selectedRobots > 0 ? null : { atLeastOneRobotSelected: true }
  }

  private getRobotFormGroup = (definition: RobotDefinition | RobotDefinitionSelected): FormGroup => {
    const group = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      first: [null, [Validators.min(0), Validators.max(800)]],
      second: [null, [Validators.min(0), Validators.max(600)]],
      third: null
    });

    group.patchValue(definition);
    return group;
  }
}

export interface RobotDefinitionSelected extends RobotDefinition {
  first: number | null;
  second: number | null;
  third: number | null;
}
