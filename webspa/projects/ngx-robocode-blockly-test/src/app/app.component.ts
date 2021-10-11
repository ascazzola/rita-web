import { Component } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
declare var defaultWorkspaceBlocks: string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model: { xml: string, code: string } | undefined;

  defaultWorkspaceXml = defaultWorkspaceBlocks;

  editorOptions: MonacoEditorConstructionOptions = { theme: 'vs-dark', language: 'java', readOnly: true };
}
