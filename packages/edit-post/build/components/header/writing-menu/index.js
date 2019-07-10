"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _viewport = require("@wordpress/viewport");

var _featureToggle = _interopRequireDefault(require("../feature-toggle"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function WritingMenu() {
  return (0, _element.createElement)(_components.MenuGroup, {
    label: (0, _i18n._x)('View', 'noun')
  }, (0, _element.createElement)(_featureToggle.default, {
    feature: "fixedToolbar",
    label: (0, _i18n.__)('Top Toolbar'),
    info: (0, _i18n.__)('Access all block and document tools in a single place'),
    messageActivated: (0, _i18n.__)('Top toolbar activated'),
    messageDeactivated: (0, _i18n.__)('Top toolbar deactivated')
  }), (0, _element.createElement)(_featureToggle.default, {
    feature: "focusMode",
    label: (0, _i18n.__)('Spotlight Mode'),
    info: (0, _i18n.__)('Focus on one block at a time'),
    messageActivated: (0, _i18n.__)('Spotlight mode activated'),
    messageDeactivated: (0, _i18n.__)('Spotlight mode deactivated')
  }), (0, _element.createElement)(_featureToggle.default, {
    feature: "fullscreenMode",
    label: (0, _i18n.__)('Fullscreen Mode'),
    info: (0, _i18n.__)('Work without distraction'),
    messageActivated: (0, _i18n.__)('Fullscreen mode activated'),
    messageDeactivated: (0, _i18n.__)('Fullscreen mode deactivated')
  }));
}

var _default = (0, _viewport.ifViewportMatches)('medium')(WritingMenu);

exports.default = _default;
//# sourceMappingURL=index.js.map