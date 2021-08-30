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
  // private initialBlocks$ = new ReplaySubject<string>(1);

  // @Input() set blocks(value: string) {
  //   this.initialBlocks$.next(value);
  // }

  @Output() public codeChanged: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
      { toolbox: robocodeTolbox });

    this.workspace.addChangeListener(this._onWorkspaceChange.bind(this));

    // this.initialBlocks$.subscribe(blocks => {
    //   console.log(this.workspace);
    //   BlocklyDef.Xml.appendDomToWorkspace(blocks, this.workspace)
    // });
  }

  private _onWorkspaceChange(_: any) {
    this.workspaceToCode();
  }

  workspaceToCode() {
    const code = Blockly.Robocode.workspaceToCode(this.workspace)
    this.codeChanged.emit(code);
  }
}
