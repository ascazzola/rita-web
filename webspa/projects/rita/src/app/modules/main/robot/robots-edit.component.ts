import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, first, map, mapTo, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { RobotDefinition } from '../../../models/robot-definition';
import { RobotDefinitionsService } from '../../../services/robot-definitions.service';
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
  styleUrls: ['./robots-edit.component.scss']
})
export class RobotsEditComponent implements OnInit {
  private saveSubject = new Subject();
  protected reloadSubject = new BehaviorSubject(null);

  model$!: Observable<EditState<string>>;
  form!: FormGroup;
  currentXml = defaultWorkspaceBlocks;
  editorOptions: MonacoEditorConstructionOptions = { theme: 'vs-dark', language: 'java', readOnly: true };

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private robotDefinitionsService: RobotDefinitionsService) { }

  ngOnInit() {

    this.form = this.buildForm(this.formBuilder);

    const saving$ = this.saveSubject.pipe(
      switchMap(__ => this.buildSaveRequest().pipe(
        // tap(() => this.notifySaveSuccess()),
        tap(() => {
          this.form.reset(this.form.value, { emitEvent: false });
          this.return();
        }),
        catchError((res: HttpErrorResponse) => {
          if (res.status === 409) {
            // const errorDetails = res.error as ConflictDetails;
            // if (errorDetails && errorDetails.title === 'Conflict') {
            //   const text1 = errorDetails.updatedAt
            //     ? 'The information you are trying to update was recently updated by {{updatedBy}} at {{updatedAt}}.'
            //       .replace('{{updatedBy}}', errorDetails.updatedBy || '')
            //       .replace('{{updatedAt}}', moment(errorDetails.updatedAt).format('lll'))
            //     : 'The information you are trying to update was recently updated by another user.';
            //   const message = text1 + '\n' + 'Data will be refreshed so you can review/apply your changes again.';
            //   this.messageBoxService.alert('Warning', message)
            //     .then(() => {
            //       this.reloadSubject.next(null);
            //     });
            // TODO show message with error
            return of(null);
            // }
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

  onCodeChanged(code: string): void {
    this.form.controls.code.setValue(code);
    this.form.controls.code.updateValueAndValidity();
  }


  onXmlChanged(xml: string): void {
    this.form.controls.xml.setValue(xml);
    this.form.controls.xml.updateValueAndValidity();
  }

  save() {
    this.saveSubject.next();
  }

  private buildForm(fb: FormBuilder): FormGroup {
    return fb.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      xml: [null, Validators.required],
    })
  }

  private buildSaveRequest(): Observable<any> {
    return this.model$.pipe(
      filter(editModel => !editModel.loading),
      first(),
      switchMap(editModel => {
        const model = Object.assign({}, editModel.data, this.form.value);
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
    form.patchValue(data, { emitEvent: false });
  }

  return(): void {
    this.router.navigate(['/robots/browse']);
  }
}
