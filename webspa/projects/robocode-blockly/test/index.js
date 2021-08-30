/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Plugin test.
 */

import * as Blockly from 'blockly';
import {createPlayground} from '@blockly/dev-tools';
import {robocodeTolbox} from '../src/index';
import * as ES from 'blockly/msg/es';

/**
 * Method used to configure the playground.
 * @param {Blockly.PlaygroundAPI} playground Blockly playground.
 * @return {void}
 */
function configurePlayground(playground) {
  playground.addGenerator('Java', Blockly.Robocode);

  const ws = playground.getWorkspace();
  if (ws.getAllBlocks().length == 0) {
    const blocks = document.getElementById('workspace-blocks');
    if (blocks.firstElementChild) {
      Blockly.Xml.appendDomToWorkspace(blocks, ws);
    }
  }
}

/**
 * Create a workspace.
 * @param {HTMLElement} blocklyDiv The blockly container div.
 * @param {!Blockly.BlocklyOptions} options The Blockly options.
 * @return {!Blockly.WorkspaceSvg} The created workspace.
 */
function createWorkspace(blocklyDiv, options) {
  Blockly.setLocale(ES);
  const workspace = Blockly.inject(blocklyDiv, options);
  return workspace;
}

document.addEventListener('DOMContentLoaded', function() {
  const defaultOptions = {
    toolbox: robocodeTolbox,
  };
  createPlayground(document.getElementById('root'), createWorkspace,
      defaultOptions).then(function(playground) {
    configurePlayground(playground);
  });
});

