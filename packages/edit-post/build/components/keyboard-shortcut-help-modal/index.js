"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardShortcutHelpModal = KeyboardShortcutHelpModal;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _config = _interopRequireDefault(require("./config"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MODAL_NAME = 'edit-post/keyboard-shortcut-help';

var mapKeyCombination = function mapKeyCombination(keyCombination) {
  return keyCombination.map(function (character, index) {
    if (character === '+') {
      return (0, _element.createElement)(_element.Fragment, {
        key: index
      }, character);
    }

    return (0, _element.createElement)("kbd", {
      key: index,
      className: "edit-post-keyboard-shortcut-help__shortcut-key"
    }, character);
  });
};

var ShortcutList = function ShortcutList(_ref) {
  var shortcuts = _ref.shortcuts;
  return (0, _element.createElement)("dl", {
    className: "edit-post-keyboard-shortcut-help__shortcut-list"
  }, shortcuts.map(function (_ref2, index) {
    var keyCombination = _ref2.keyCombination,
        description = _ref2.description,
        ariaLabel = _ref2.ariaLabel;
    return (0, _element.createElement)("div", {
      className: "edit-post-keyboard-shortcut-help__shortcut",
      key: index
    }, (0, _element.createElement)("dt", {
      className: "edit-post-keyboard-shortcut-help__shortcut-term"
    }, (0, _element.createElement)("kbd", {
      className: "edit-post-keyboard-shortcut-help__shortcut-key-combination",
      "aria-label": ariaLabel
    }, mapKeyCombination((0, _lodash.castArray)(keyCombination)))), (0, _element.createElement)("dd", {
      className: "edit-post-keyboard-shortcut-help__shortcut-description"
    }, description));
  }));
};

var ShortcutSection = function ShortcutSection(_ref3) {
  var title = _ref3.title,
      shortcuts = _ref3.shortcuts;
  return (0, _element.createElement)("section", {
    className: "edit-post-keyboard-shortcut-help__section"
  }, (0, _element.createElement)("h2", {
    className: "edit-post-keyboard-shortcut-help__section-title"
  }, title), (0, _element.createElement)(ShortcutList, {
    shortcuts: shortcuts
  }));
};

function KeyboardShortcutHelpModal(_ref4) {
  var isModalActive = _ref4.isModalActive,
      toggleModal = _ref4.toggleModal;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.KeyboardShortcuts, {
    bindGlobal: true,
    shortcuts: (0, _defineProperty2.default)({}, _keycodes.rawShortcut.access('h'), toggleModal)
  }), isModalActive && (0, _element.createElement)(_components.Modal, {
    className: "edit-post-keyboard-shortcut-help",
    title: (0, _i18n.__)('Keyboard Shortcuts'),
    closeLabel: (0, _i18n.__)('Close'),
    onRequestClose: toggleModal
  }, _config.default.map(function (config, index) {
    return (0, _element.createElement)(ShortcutSection, (0, _extends2.default)({
      key: index
    }, config));
  })));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    isModalActive: select('core/edit-post').isModalActive(MODAL_NAME)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref6) {
  var isModalActive = _ref6.isModalActive;

  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal,
      closeModal = _dispatch.closeModal;

  return {
    toggleModal: function toggleModal() {
      return isModalActive ? closeModal() : openModal(MODAL_NAME);
    }
  };
})])(KeyboardShortcutHelpModal);

exports.default = _default;
//# sourceMappingURL=index.js.map