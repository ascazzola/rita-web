'use strict';

/**
 * Method used to get all the imports.
 * @param {string[]} imports Array of imports.
 * @return {string} String with all the imports.
 */
function getImports(imports) {
  return imports.map((x) => `import ${x};`).join('\n');
}

const robocodeGenerator = new Blockly.Generator('Robocode');

Blockly.Robocode = robocodeGenerator;
robocodeGenerator.addReservedWords(
    // import keyword
    // print ','.join(keyword.kwlist)
    // http://en.wikipedia.org/wiki/List_of_Java_keywords
    // eslint-disable-next-line max-len
    'abstract,assert,boolean,break,case,catch,class,const,continue,default,do,double,else,enum,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,long,native,new,package,private,protected,public,return,short,static,strictfp,super,switch,synchronized,this,throw,throws,transient,try,void,volatile,while,' +
  // http://en.wikipedia.org/wiki/List_of_Java_keywords#Reserved_words_for_literal_values
  'false,null,true,' +
  // http://docs.Java.org/library/functions.html
  // eslint-disable-next-line max-len
  'abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,coerce,dir,id,oct,sorted,intern,equal');

robocodeGenerator.ORDER_ATOMIC = 0; // 0 "" ...
robocodeGenerator.ORDER_COLLECTION = 1; // tuples, lists, dictionaries
robocodeGenerator.ORDER_STRING_CONVERSION = 1; // `expression...`

robocodeGenerator.ORDER_MEMBER = 2; // . []
robocodeGenerator.ORDER_FUNCTION_CALL = 2; // ()

robocodeGenerator.ORDER_POSTFIX = 3; // expr++ expr--
robocodeGenerator.ORDER_EXPONENTIATION = 3; // **  TODO: Replace this

robocodeGenerator.ORDER_LOGICAL_NOT = 3; // not
robocodeGenerator.ORDER_UNARY_SIGN = 4; // ++expr --expr +expr -expr ~ !
robocodeGenerator.ORDER_MULTIPLICATIVE = 5; // * / %
robocodeGenerator.ORDER_ADDITIVE = 6; // + -
robocodeGenerator.ORDER_BITWISE_SHIFT = 7; // << >> >>>
robocodeGenerator.ORDER_RELATIONAL = 8; // < > <= >= instanceof
robocodeGenerator.ORDER_EQUALITY = 9; // == !=
robocodeGenerator.ORDER_BITWISE_AND = 10; // &
robocodeGenerator.ORDER_BITWISE_XOR = 11; // ^
robocodeGenerator.ORDER_BITWISE_OR = 12; // |
robocodeGenerator.ORDER_LOGICAL_AND = 13; // &&
robocodeGenerator.ORDER_LOGICAL_OR = 14; // ||
robocodeGenerator.ORDER_CONDITIONAL = 15; // ? :

robocodeGenerator.ORDER_ASSIGNMENT = 16;

robocodeGenerator.ORDER_NONE = 99;


/**
 * Closure code for a section.
 */
robocodeGenerator.POSTFIX = '';
/**
 * The method of indenting.  Java prefers four spaces by convention.
 */
robocodeGenerator.INDENT = '    ';
/**
 * Any extra indent to be added to the currently generating code block.
 */
robocodeGenerator.EXTRAINDENT = '';

robocodeGenerator.TYPES_MAP = {
  'String': 'String',
  'Number': 'double',
};

robocodeGenerator.init = function(workspace) {
  // Call Blockly.Generator's init.
  Object.getPrototypeOf(this).init.call(this);

  if (!this.nameDB_) {
    this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
  } else {
    this.nameDB_.reset();
  }

  this.nameDB_.setVariableMap(workspace.getVariableMap());
  this.nameDB_.populateVariables(workspace);
  this.nameDB_.populateProcedures(workspace);

  const defvars = [];
  // Add developer variables (not created or named by the user).
  const devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (let i = 0; i < devVarList.length; i++) {
    const devType = this.TYPES_MAP[devVarList[i].type];
    if (!devType) {
      throw Error(`Type not implemented ${devVarList[i].type}`);
    }

    const devName = this.nameDB_
        .getName(devVarList[i].getId(), Blockly.Names.DEVELOPER_VARIABLE_TYPE);

    defvars.push(`${devType} ${devName};`);
  }

  // Add user variables, but only ones that are being used.
  const variables = Blockly.Variables.allUsedVarModels(workspace);
  for (let i = 0; i < variables.length; i++) {
    const type = this.TYPES_MAP[variables[i].type];
    if (!type) {
      throw Error(`Type not implemented ${variables[i].type}`);
    }

    const variableName = this.nameDB_
        .getName(variables[i].getId(), Blockly.VARIABLE_CATEGORY_NAME);

    defvars.push(`${type} ${variableName};`);
  }

  if (defvars.length > 0) {
    this.definitions_['variables'] = defvars.join('\n');
  }
  this.isInitialized = true;
};

robocodeGenerator.getCodeBlock = function(code) {
  return `{${code}}`;
};

robocodeGenerator.finish = function(code) {
  const imports = [];
  const definitions = [];
  let className = 'MyRobot';
  // eslint-disable-next-line guard-for-in
  for (const name in this.definitions_) {
    const def = this.definitions_[name];
    if (name.match(/^import_/)) {
      imports.push(def);
    } else if (name.match(/^variables/)) {
      definitions.push(def);
    } else if (name === 'className') {
      className = def;
    }
  }
  this.nameDB_.reset();
  const classLine = `public class ${className} extends JuniorRobot `;
  const javaImports = getImports(imports);
  const variables = definitions.length > 0 &&
    `\n\n${definitions.join('\n')}` || '';

  // eslint-disable-next-line max-len
  const classBody = this.getCodeBlock(this.prefixLines(`${variables}\n\n${code}`, this.INDENT));
  console.log(variables);
  return `package robots;\n${javaImports}\n${classLine}${classBody}`;
};


Blockly.Robocode.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\\n')
      .replace(/'/g, '\\\'');
  return `"${string}"`;
};


Blockly.Robocode.scrub_ = function(block, code, parms) {
  let commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    commentCode = block.getCommentText() || '';
    if (commentCode) {
      commentCode += this.prefixLines(commentCode, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (let x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        const childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          const comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  const postFix = this.POSTFIX;
  this.POSTFIX = '';
  const extraIndent = this.EXTRAINDENT;
  this.EXTRAINDENT = '';
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  let nextCode = this.blockToCode(nextBlock, parms);
  if (extraIndent != '') {
    nextCode = this.prefixLines(nextCode, extraIndent);
  }
  return commentCode + code + nextCode + postFix;
};
