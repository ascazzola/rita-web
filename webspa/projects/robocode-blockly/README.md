# blockly-plugin-robocode [![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

<!--
  - TODO: Edit plugin description.
  -->
A [Blockly](https://www.npmjs.com/package/blockly) plugin that ...

## Installation

### Yarn
```
yarn add blockly-plugin-robocode
```

### npm
```
npm install blockly-plugin-robocode --save
```

## Usage

A toolbox is exported an can be used

```js
import * as Blockly from 'blockly';
import {robocodeTolbox} from '../src/index';

// Inject Blockly.
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: robocodeTolbox,
});
```

## API

This plugin provides a Java parser and custom blocks in order to allow the creation of Robocode robots, only inheritance from Juniors Robot it's supported for now.

Only translation from "es" are available for now, you can create your own translatio file if you like to use a different language

## License
Apache 2.0
