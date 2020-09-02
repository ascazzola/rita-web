import { CustomBlock, BlockMutator } from 'ngx-blockly';
declare var Blockly: any;

export class MethodBlock extends CustomBlock {
  private text: string;
  private color: number;
  private tooltip: string;
  private params: { name: string, type: string }[];

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MethodBlock;
    this.text = args && args[0] || 'Unkmown method';
    this.color = args && args[1] || 30;
    this.tooltip = args && args[2] || this.text;
    this.params = args && args[3] || [];
  }

  defineBlock() {
    this.block.setColour(this.color);
    this.block.setTooltip(this.tooltip || this.text);
    this.block.appendStatementInput(this.type)
      .appendField(this.text);

    this.params.forEach(param => {
      this.block.appendDummyInput().appendField(new Blockly.FieldVariable(param.name, null, [param.type], param.type));
      Blockly.Variables.createVariable_(this.block.workspace, null, param.name);
    });
  }

  toXML() {
    return 'Not implemented';
  }

  toDartCode(block: MethodBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: MethodBlock): string | any[] {
    // tslint:disable-next-line: max-line-length
    return `${this.type}: function(${this.params.map(x => x.name).join(', ')}) {\n${Blockly.JavaScript.statementToCode(block, this.type)}}`;
  }

  toLuaCode(block: MethodBlock): string | any[] {
    return 'Not implemented';
  }

  toPHPCode(block: MethodBlock): string | any[] {
    return 'Not implemented';
  }

  toPythonCode(block: MethodBlock): string | any[] {
    return 'Not implemented';
  }
}
