import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { castArray } from 'lodash';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { Modal, KeyboardShortcuts } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { rawShortcut } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import shortcutConfig from './config';
var MODAL_NAME = 'edit-post/keyboard-shortcut-help';

var mapKeyCombination = function mapKeyCombination(keyCombination) {
  return keyCombination.map(function (character, index) {
    if (character === '+') {
      return createElement(Fragment, {
        key: index
      }, character);
    }

    return createElement("kbd", {
      key: index,
      className: "edit-post-keyboard-shortcut-help__shortcut-key"
    }, character);
  });
};

var ShortcutList = function ShortcutList(_ref) {
  var shortcuts = _ref.shortcuts;
  return createElement("dl", {
    className: "edit-post-keyboard-shortcut-help__shortcut-list"
  }, shortcuts.map(function (_ref2, index) {
    var keyCombination = _ref2.keyCombination,
        description = _ref2.description,
        ariaLabel = _ref2.ariaLabel;
    return createElement("div", {
      className: "edit-post-keyboard-shortcut-help__shortcut",
      key: index
    }, createElement("dt", {
      className: "edit-post-keyboard-shortcut-help__shortcut-term"
    }, createElement("kbd", {
      className: "edit-post-keyboard-shortcut-help__shortcut-key-combination",
      "aria-label": ariaLabel
    }, mapKeyCombination(castArray(keyCombination)))), createElement("dd", {
      className: "edit-post-keyboard-shortcut-help__shortcut-description"
    }, description));
  }));
};

var ShortcutSection = function ShortcutSection(_ref3) {
  var title = _ref3.title,
      shortcuts = _ref3.shortcuts;
  return createElement("section", {
    className: "edit-post-keyboard-shortcut-help__section"
  }, createElement("h2", {
    className: "edit-post-keyboard-shortcut-help__section-title"
  }, title), createElement(ShortcutList, {
    shortcuts: shortcuts
  }));
};

export function KeyboardShortcutHelpModal(_ref4) {
  var isModalActive = _ref4.isModalActive,
      toggleModal = _ref4.toggleModal;
  return createElement(Fragment, null, createElement(KeyboardShortcuts, {
    bindGlobal: true,
    shortcuts: _defineProperty({}, rawShortcut.access('h'), toggleModal)
  }), isModalActive && createElement(Modal, {
    className: "edit-post-keyboard-shortcut-help",
    title: __('Keyboard Shortcuts'),
    closeLabel: __('Close'),
    onRequestClose: toggleModal
  }, shortcutConfig.map(function (config, index) {
    return createElement(ShortcutSection, _extends({
      key: index
    }, config));
  })));
}
export default compose([withSelect(function (select) {
  return {
    isModalActive: select('core/edit-post').isModalActive(MODAL_NAME)
  };
}), withDispatch(function (dispatch, _ref6) {
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
//# sourceMappingURL=index.js.map