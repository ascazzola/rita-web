import { Component, ViewChild } from '@angular/core';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import { NgxRobocodeBlocklyComponent } from 'projects/ngx-robocode-blockly/src/public-api';
declare var defaultWorkspaceBlocks: string;
declare var Blockly: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model: { xml: string, code: string } | undefined;
  @ViewChild(NgxRobocodeBlocklyComponent) blocklyComponent!: NgxRobocodeBlocklyComponent;
  defaultWorkspaceXml = defaultWorkspaceBlocks;

  editorOptions: MonacoEditorConstructionOptions = { theme: 'vs-dark', language: 'java', readOnly: true };

  updateBlocklyWorkspace() {
    Blockly.svgResize(this.blocklyComponent.workspace);
  }
}
