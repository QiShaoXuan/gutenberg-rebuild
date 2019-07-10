"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/section';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Section'),
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.Path, {
    d: "M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M0 0h24v24H0z",
    fill: "none"
  })),
  category: 'layout',
  description: (0, _i18n.__)('A wrapping section acting as a container for other blocks.'),
  keywords: [(0, _i18n.__)('container'), (0, _i18n.__)('wrapper'), (0, _i18n.__)('row')],
  supports: {
    align: ['wide', 'full'],
    anchor: true,
    html: false
  },
  attributes: {
    backgroundColor: {
      type: 'string'
    },
    customBackgroundColor: {
      type: 'string'
    }
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var backgroundColor = attributes.backgroundColor,
        customBackgroundColor = attributes.customBackgroundColor;
    var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
    var className = (0, _classnames.default)(backgroundClass, {
      'has-background': backgroundColor || customBackgroundColor
    });
    var styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor
    };
    return (0, _element.createElement)("div", {
      className: className,
      style: styles
    }, (0, _element.createElement)(_blockEditor.InnerBlocks.Content, null));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map