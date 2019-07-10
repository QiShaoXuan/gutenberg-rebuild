"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _richText = require("@wordpress/rich-text");

var _annotation = require("./annotation");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = _annotation.annotation.name,
    settings = (0, _objectWithoutProperties2.default)(_annotation.annotation, ["name"]);
(0, _richText.registerFormatType)(name, settings);
//# sourceMappingURL=index.js.map