import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-code-viewer',
  template: `
   <ngx-monaco-editor [options]="editorOptions" [ngModel]="code"></ngx-monaco-editor>
   `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CodeViewerComponent {
  editorOptions: MonacoEditorConstructionOptions = { theme: 'vs-dark', language: 'java', readOnly: true };

  @Input() code: string | null = null;
}
