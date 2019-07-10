"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCoreBlocks = void 0;

var _blocks = require("@wordpress/blocks");

var code = _interopRequireWildcard(require("./code"));

var heading = _interopRequireWildcard(require("./heading"));

var more = _interopRequireWildcard(require("./more"));

var paragraph = _interopRequireWildcard(require("./paragraph"));

var image = _interopRequireWildcard(require("./image"));

var nextpage = _interopRequireWildcard(require("./nextpage"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var registerCoreBlocks = function registerCoreBlocks() {
  [paragraph, heading, code, more, image, nextpage].forEach(function (_ref) {
    var name = _ref.name,
        settings = _ref.settings;
    (0, _blocks.registerBlockType)(name, settings);
  });
};

exports.registerCoreBlocks = registerCoreBlocks;
(0, _blocks.setDefaultBlockName)(paragraph.name);
//# sourceMappingURL=index.native.js.map