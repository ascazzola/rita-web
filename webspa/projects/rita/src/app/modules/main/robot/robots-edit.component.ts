import { Component } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';
declare var defaultWorkspaceBlocks: string;

@Component({
  templateUrl: './robots-edit.component.html',
  styleUrls: ['./robots-edit.component.scss']
})
export class RobotsEditComponent {
  code$ = new BehaviorSubject('');
  originalXml = defaultWorkspaceBlocks;
  currentXml = defaultWorkspaceBlocks;
  editorOptions: MonacoEditorConstructionOptions = {theme: 'vs-dark', language: 'java', readOnly: true};

  onCodeChanged = (code: string):void => this.code$.next(code);
}
