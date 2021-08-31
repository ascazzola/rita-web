import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as BlocklyDef from 'blockly';
import { ReplaySubject } from 'rxjs';
declare var Blockly: any;
declare var robocodeTolbox: string;

@Component({
  selector: 'lib-ngx-robocode-blockly',
  template: `
    <div #blocklyDiv style="height: 100vh"></div>
  `,
  styles: [
  ]
})
export class NgxRobocodeBlocklyComponent implements OnInit, AfterViewInit {
  @ViewChild('blocklyDiv') blocklyDiv!: ElementRef;
  workspace!: BlocklyDef.Workspace;
  private xml$ = new ReplaySubject<string>(1);

  @Input() set xml(value: string) {
    this.xml$.next(value);
  }

  @Output() public codeChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() public xmlChanged: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
      { toolbox: robocodeTolbox });

    this.workspace.addChangeListener(this._onWorkspaceChange.bind(this));

    this.xml$.subscribe(xml => BlocklyDef.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this.workspace));
  }

  private _onWorkspaceChange(_: any): void {
    this.workspaceToCode();
    this.workspaceToXml();
  }

  workspaceToCode(): void {
    const code = Blockly.Robocode.workspaceToCode(this.workspace)
    this.codeChanged.emit(code);
  }

  workspaceToXml(): void {
    const xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace));
    this.xmlChanged.emit(xml);
  }
}
