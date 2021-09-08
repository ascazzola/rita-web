import { Component } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';
declare var defaultWorkspaceBlocks: string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  code$ = new BehaviorSubject('');
  originalXml = defaultWorkspaceBlocks;
  currentXml = defaultWorkspaceBlocks;
  editorOptions: MonacoEditorConstructionOptions = {theme: 'vs-dark', language: 'java', readOnly: true};

  onCodeChanged = (code: string):void => this.code$.next(code);
}
