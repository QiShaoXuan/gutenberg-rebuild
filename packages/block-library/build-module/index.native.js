/**
 * WordPress dependencies
 */
import { registerBlockType, setDefaultBlockName } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import * as code from './code';
import * as heading from './heading';
import * as more from './more';
import * as paragraph from './paragraph';
import * as image from './image';
import * as nextpage from './nextpage';
export var registerCoreBlocks = function registerCoreBlocks() {
  [paragraph, heading, code, more, image, nextpage].forEach(function (_ref) {
    var name = _ref.name,
        settings = _ref.settings;
    registerBlockType(name, settings);
  });
};
setDefaultBlockName(paragraph.name);
//# sourceMappingURL=index.native.js.map