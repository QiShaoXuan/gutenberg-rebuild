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
var name = 'core/nextpage';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Page Break'),
  description: (0, _i18n.__)('Separate your content into a multi-page experience.'),
  icon: _icon.default,
  category: 'layout',
  keywords: [(0, _i18n.__)('next page'), (0, _i18n.__)('pagination')],
  supports: {
    customClassName: false,
    className: false,
    html: false
  },
  attributes: {},
  transforms: {
    from: [{
      type: 'raw',
      schema: {
        'wp-block': {
          attributes: ['data-block']
        }
      },
      isMatch: function isMatch(node) {
        return node.dataset && node.dataset.block === 'core/nextpage';
      },
      transform: function transform() {
        return (0, _blocks.createBlock)('core/nextpage', {});
      }
    }]
  },
  edit: _edit.default,
  save: function save() {
    return (0, _element.createElement)(_element.RawHTML, null, '<!--nextpage-->');
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map