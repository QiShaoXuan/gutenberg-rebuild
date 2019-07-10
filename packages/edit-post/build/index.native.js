"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeEditor = initializeEditor;

require("@wordpress/core-data");

require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

require("@wordpress/notices");

var _blockLibrary = require("@wordpress/block-library");

var _blocks = require("@wordpress/blocks");

require("./store");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Initializes the Editor.
 */
function initializeEditor() {
  // register and setup blocks
  (0, _blockLibrary.registerCoreBlocks)();
  (0, _blocks.registerBlockType)(_editor.UnsupportedBlock.name, _editor.UnsupportedBlock.settings);
  (0, _blocks.setUnregisteredTypeHandlerName)(_editor.UnsupportedBlock.name); // disable Code and More blocks for the release
  // eslint-disable-next-line no-undef

  if (typeof __DEV__ === 'undefined' || !__DEV__) {
    (0, _blocks.unregisterBlockType)('core/code');
    (0, _blocks.unregisterBlockType)('core/more');
  }
}
//# sourceMappingURL=index.native.js.map