"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/separator';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Separator'),
  description: (0, _i18n.__)('Create a break between ideas or sections with a horizontal separator.'),
  icon: _icon.default,
  category: 'layout',
  keywords: [(0, _i18n.__)('horizontal-line'), 'hr', (0, _i18n.__)('divider')],
  styles: [{
    name: 'default',
    label: (0, _i18n.__)('Default'),
    isDefault: true
  }, {
    name: 'wide',
    label: (0, _i18n.__)('Wide Line')
  }, {
    name: 'dots',
    label: (0, _i18n.__)('Dots')
  }],
  transforms: {
    from: [{
      type: 'enter',
      regExp: /^-{3,}$/,
      transform: function transform() {
        return (0, _blocks.createBlock)('core/separator');
      }
    }, {
      type: 'raw',
      selector: 'hr',
      schema: {
        hr: {}
      }
    }]
  },
  edit: _edit.default,
  save: function save() {
    return (0, _element.createElement)("hr", null);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map