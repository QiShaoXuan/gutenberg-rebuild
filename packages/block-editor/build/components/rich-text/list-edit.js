"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListEdit = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _shortcut = require("./shortcut");

var _blockFormatControls = _interopRequireDefault(require("../block-format-controls"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _window$Node = window.Node,
    TEXT_NODE = _window$Node.TEXT_NODE,
    ELEMENT_NODE = _window$Node.ELEMENT_NODE;
/**
 * Gets the selected list node, which is the closest list node to the start of
 * the selection.
 *
 * @return {?Element} The selected list node, or undefined if none is selected.
 */

function getSelectedListNode() {
  var selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return;
  }

  var _selection$getRangeAt = selection.getRangeAt(0),
      startContainer = _selection$getRangeAt.startContainer;

  if (startContainer.nodeType === TEXT_NODE) {
    startContainer = startContainer.parentNode;
  }

  if (startContainer.nodeType !== ELEMENT_NODE) {
    return;
  }

  var rootNode = startContainer.closest('*[contenteditable]');

  if (!rootNode || !rootNode.contains(startContainer)) {
    return;
  }

  return startContainer.closest('ol,ul');
}
/**
 * Whether or not the root list is selected.
 *
 * @return {boolean} True if the root list or nothing is selected, false if an
 *                   inner list is selected.
 */


function isListRootSelected() {
  var listNode = getSelectedListNode(); // Consider the root list selected if nothing is selected.

  return !listNode || listNode.contentEditable === 'true';
}
/**
 * Wether or not the selected list has the given tag name.
 *
 * @param {string}  tagName     The tag name the list should have.
 * @param {string}  rootTagName The current root tag name, to compare with in
 *                              case nothing is selected.
 *
 * @return {boolean}             [description]
 */


function isActiveListType(tagName, rootTagName) {
  var listNode = getSelectedListNode();

  if (!listNode) {
    return tagName === rootTagName;
  }

  return listNode.nodeName.toLowerCase() === tagName;
}

var ListEdit = function ListEdit(_ref) {
  var onTagNameChange = _ref.onTagNameChange,
      tagName = _ref.tagName,
      value = _ref.value,
      onChange = _ref.onChange;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_shortcut.RichTextShortcut, {
    type: "primary",
    character: "[",
    onUse: function onUse() {
      onChange((0, _richText.outdentListItems)(value));
    }
  }), (0, _element.createElement)(_shortcut.RichTextShortcut, {
    type: "primary",
    character: "]",
    onUse: function onUse() {
      onChange((0, _richText.indentListItems)(value, {
        type: tagName
      }));
    }
  }), (0, _element.createElement)(_shortcut.RichTextShortcut, {
    type: "primary",
    character: "m",
    onUse: function onUse() {
      onChange((0, _richText.indentListItems)(value, {
        type: tagName
      }));
    }
  }), (0, _element.createElement)(_shortcut.RichTextShortcut, {
    type: "primaryShift",
    character: "m",
    onUse: function onUse() {
      onChange((0, _richText.outdentListItems)(value));
    }
  }), (0, _element.createElement)(_blockFormatControls.default, null, (0, _element.createElement)(_components.Toolbar, {
    controls: [onTagNameChange && {
      icon: 'editor-ul',
      title: (0, _i18n.__)('Convert to unordered list'),
      isActive: isActiveListType('ul', tagName),
      onClick: function onClick() {
        onChange((0, _richText.changeListType)(value, {
          type: 'ul'
        }));

        if (isListRootSelected()) {
          onTagNameChange('ul');
        }
      }
    }, onTagNameChange && {
      icon: 'editor-ol',
      title: (0, _i18n.__)('Convert to ordered list'),
      isActive: isActiveListType('ol', tagName),
      onClick: function onClick() {
        onChange((0, _richText.changeListType)(value, {
          type: 'ol'
        }));

        if (isListRootSelected()) {
          onTagNameChange('ol');
        }
      }
    }, {
      icon: 'editor-outdent',
      title: (0, _i18n.__)('Outdent list item'),
      shortcut: (0, _i18n._x)('Backspace', 'keyboard key'),
      onClick: function onClick() {
        onChange((0, _richText.outdentListItems)(value));
      }
    }, {
      icon: 'editor-indent',
      title: (0, _i18n.__)('Indent list item'),
      shortcut: (0, _i18n._x)('Space', 'keyboard key'),
      onClick: function onClick() {
        onChange((0, _richText.indentListItems)(value, {
          type: tagName
        }));
      }
    }].filter(Boolean)
  })));
};

exports.ListEdit = ListEdit;
//# sourceMappingURL=list-edit.js.map