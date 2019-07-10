"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _autop = require("@wordpress/autop");

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/shortcode';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Shortcode'),
  description: (0, _i18n.__)('Insert additional custom elements with a WordPress shortcode.'),
  icon: _icon.default,
  category: 'widgets',
  transforms: {
    from: [{
      type: 'shortcode',
      // Per "Shortcode names should be all lowercase and use all
      // letters, but numbers and underscores should work fine too.
      // Be wary of using hyphens (dashes), you'll be better off not
      // using them." in https://codex.wordpress.org/Shortcode_API
      // Require that the first character be a letter. This notably
      // prevents footnote markings ([1]) from being caught as
      // shortcodes.
      tag: '[a-z][a-z0-9_-]*',
      attributes: {
        text: {
          type: 'string',
          shortcode: function shortcode(attrs, _ref) {
            var content = _ref.content;
            return (0, _autop.removep)((0, _autop.autop)(content));
          }
        }
      },
      priority: 20
    }]
  },
  supports: {
    customClassName: false,
    className: false,
    html: false
  },
  edit: _edit.default,
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    return (0, _element.createElement)(_element.RawHTML, null, attributes.text);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map