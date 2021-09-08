/**
 * Construct the elements (blocks and button) required by the flyout for the
 * robocode variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array<!Element>} Array of XML elements.
 */
 Blockly.VariablesDynamic.flyoutCategory = function(workspace) {
  let xmlList = [];
  let button = document.createElement('button');
  button.setAttribute('text', Blockly.Msg['NEW_STRING_VARIABLE']);
  button.setAttribute('callbackKey', 'CREATE_VARIABLE_STRING');
  xmlList.push(button);
  button = document.createElement('button');
  button.setAttribute('text', Blockly.Msg['NEW_NUMBER_VARIABLE']);
  button.setAttribute('callbackKey', 'CREATE_VARIABLE_NUMBER');
  xmlList.push(button);

  workspace.registerButtonCallback('CREATE_VARIABLE_STRING',
      Blockly.VariablesDynamic.onCreateVariableButtonClick_String);
  workspace.registerButtonCallback('CREATE_VARIABLE_NUMBER',
      Blockly.VariablesDynamic.onCreateVariableButtonClick_Number);

  const blockList = Blockly.VariablesDynamic.flyoutCategoryBlocks(workspace);
  xmlList = xmlList.concat(blockList);
  return xmlList;
};
