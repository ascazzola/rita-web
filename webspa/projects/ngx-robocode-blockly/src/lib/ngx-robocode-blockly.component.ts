import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as BlocklyDef from 'blockly';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
declare var Blockly: any;
declare var robocodeTolbox: string;

@Component({
  selector: 'lib-ngx-robocode-blockly',
  template: `
    <div #blocklyDiv style="height: 100%"></div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgxRobocodeBlocklyComponent),
    }
  ]
})
export class NgxRobocodeBlocklyComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('blocklyDiv') blocklyDiv!: ElementRef;
  workspace!: BlocklyDef.Workspace;
  form: FormGroup;
  defaultWorkspaceXml$ = new ReplaySubject<string>();
  @Input() set defaultWorkspaceXml(xml: string) {
    this.defaultWorkspaceXml$.next(xml);
  }

  private finishedLoading = false;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      xml: null,
      code: null
    });
  }

  writeValue(model: { xml: string, code: string }): void {
    this.form.patchValue(model);
  }

  private onChange = (_: any) => { };
  private onTouched = () => { };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  registerOnValidatorChange(fn: () => void): void { }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(x => this.onChange(x))
  }

  ngAfterViewInit(): void {
    this.workspace = Blockly.inject(this.blocklyDiv.nativeElement,
      { toolbox: robocodeTolbox });

    this.workspace.addChangeListener(this.onWorkspaceChange.bind(this));

    this.defaultWorkspaceXml$.subscribe(xml =>
      Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), this.workspace)
    );
  }

  private onWorkspaceChange(event: any): void {
    if (event.type === Blockly.Events.FINISHED_LOADING) {
      this.finishedLoading = true;
      this.updateFormValue();
      return;
    }
    if (!this.finishedLoading) {
      return;
    }

    if (event instanceof Blockly.Events.BlockBase ||
      event instanceof Blockly.Events.VarBase ||
      event instanceof Blockly.Events.CommentBase) {
      this.updateFormValue();
    }
  }

  private updateFormValue() {
    const code = this.workspaceToCode();
    const xml = this.workspaceToXml();
    this.form.setValue({ code, xml });
  }

  workspaceToCode(): string {
    const code = Blockly.Robocode.workspaceToCode(this.workspace)
    return code;
  }

  workspaceToXml(): string {
    const xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace));
    return xml;
  }
}
