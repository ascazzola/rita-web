import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, first, map, mapTo, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { RobotDefinition } from '../../../models/robot-definition';
import { RobotDefinitionsService } from '../../../services/robot-definitions.service';
import { SNACKBAR_DURATION } from '../../../models/constants';
declare var defaultWorkspaceBlocks: string;

export type IdType = string | number;
interface EditState<TModel> {
  id: IdType;
  isNew: boolean;

  loading?: boolean;
  data?: TModel;

  saving?: boolean;
}

@Component({
  templateUrl: './robots-edit.component.html',
  styleUrls: ['./robots-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotsEditComponent implements OnInit {
  private saveSubject = new Subject();
  protected reloadSubject = new BehaviorSubject(null);

  code$!: Observable<string>;

  model$!: Observable<EditState<string>>;
  form!: FormGroup;
  defaultXml = defaultWorkspaceBlocks;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private robotDefinitionsService: RobotDefinitionsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.form = this.buildForm(this.formBuilder);

    this.code$ = this.form.controls.definition.valueChanges.pipe(map(x => x.code));

    const saving$ = this.saveSubject.pipe(
      switchMap(__ => this.buildSaveRequest().pipe(
        tap(() => {
          this.form.reset(this.form.value, { emitEvent: false });
          this.return();
        }),
        catchError((res: HttpErrorResponse) => {
          if (res.status === 409) {
            this.snackBar.open('Error de concurrencia, otra persona guardo el mismo registro', undefined, { duration: SNACKBAR_DURATION });
            this.reloadSubject.next(null);
            return of(null);
          }
          throw res;
        }),
        mapTo(false),
        startWith(true),
      )),
      startWith(false),
    );

    const loadModel$ = combineLatest([this.route.params, this.route.queryParams, this.reloadSubject]).pipe(
      map(([params, queryParams]) => ({
        id: params.id,
        isNew: !params.id,
        basedOnId: queryParams.basedOn
      })),
      switchMap(p => {
        if (p.id || p.basedOnId) {
          return this.getData(p.id || p.basedOnId).pipe(
            map(data => p.basedOnId ? { ...data, id: null, name: null, code: null, xml: null } : data),
            tap(data => this.patchFormValue(this.form, data as RobotDefinition)),
            map(data => ({ ...p, data })),
            startWith(({ ...p, loading: true }))
          );
        }

        return of(p);
      })
    );

    this.model$ = combineLatest([loadModel$, saving$]).pipe(
      map(([loadModel, saving]) => ({ ...loadModel, saving })),
      shareReplay(1)
    );

  }

  save() {
    this.saveSubject.next();
  }

  private buildForm(fb: FormBuilder): FormGroup {
    return fb.group({
      name: [null, Validators.required],
      definition: [null, Validators.required],
    })
  }

  private buildSaveRequest(): Observable<any> {
    return this.model$.pipe(
      filter(editModel => !editModel.loading),
      first(),
      switchMap(editModel => {
        const formValue = this.form.value;
        const updatedModel = { name: formValue.name, code: formValue.definition?.code, xml: formValue.definition?.xml } as RobotDefinition
        const model = Object.assign({}, editModel.data, updatedModel);
        const request = editModel.isNew
          ? this.robotDefinitionsService.insert(model)
          : this.robotDefinitionsService.update(model);
        return request;
      })
    );
  }

  private getData(id: string): Observable<RobotDefinition> {
    return this.robotDefinitionsService.getById(id)
  }

  private patchFormValue(form: FormGroup, data: RobotDefinition): void {
    const formModel = { name: data.name, definition: { code: data.code, xml: data.xml } };
    form.patchValue(formModel, { emitEvent: false });
  }

  return(): void {
    this.router.navigate(['/robots/browse']);
  }
}
