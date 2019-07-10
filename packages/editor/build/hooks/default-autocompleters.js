"use strict";

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _components = require("../components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var defaultAutocompleters = [_components.userAutocompleter];
var fetchReusableBlocks = (0, _lodash.once)(function () {
  return (0, _data.dispatch)('core/editor').__experimentalFetchReusableBlocks();
});

function setDefaultCompleters(completers, blockName) {
  if (!completers) {
    // Provide copies so filters may directly modify them.
    completers = defaultAutocompleters.map(_lodash.clone); // Add blocks autocompleter for Paragraph block

    if (blockName === (0, _blocks.getDefaultBlockName)()) {
      completers.push((0, _lodash.clone)(_components.blockAutocompleter));
      /*
       * NOTE: This is a hack to help ensure reusable blocks are loaded
       * so they may be included in the block completer. It can be removed
       * once we have a way for completers to Promise options while
       * store-based data dependencies are being resolved.
       */

      fetchReusableBlocks();
    }
  }

  return completers;
}

(0, _hooks.addFilter)('editor.Autocomplete.completers', 'editor/autocompleters/set-default-completers', setDefaultCompleters);
//# sourceMappingURL=default-autocompleters.js.map