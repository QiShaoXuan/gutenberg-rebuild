import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Toolbar } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { indentListItems, outdentListItems, changeListType } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import { RichTextShortcut } from './shortcut';
import BlockFormatControls from '../block-format-controls';
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

export var ListEdit = function ListEdit(_ref) {
  var onTagNameChange = _ref.onTagNameChange,
      tagName = _ref.tagName,
      value = _ref.value,
      onChange = _ref.onChange;
  return createElement(Fragment, null, createElement(RichTextShortcut, {
    type: "primary",
    character: "[",
    onUse: function onUse() {
      onChange(outdentListItems(value));
    }
  }), createElement(RichTextShortcut, {
    type: "primary",
    character: "]",
    onUse: function onUse() {
      onChange(indentListItems(value, {
        type: tagName
      }));
    }
  }), createElement(RichTextShortcut, {
    type: "primary",
    character: "m",
    onUse: function onUse() {
      onChange(indentListItems(value, {
        type: tagName
      }));
    }
  }), createElement(RichTextShortcut, {
    type: "primaryShift",
    character: "m",
    onUse: function onUse() {
      onChange(outdentListItems(value));
    }
  }), createElement(BlockFormatControls, null, createElement(Toolbar, {
    controls: [onTagNameChange && {
      icon: 'editor-ul',
      title: __('Convert to unordered list'),
      isActive: isActiveListType('ul', tagName),
      onClick: function onClick() {
        onChange(changeListType(value, {
          type: 'ul'
        }));

        if (isListRootSelected()) {
          onTagNameChange('ul');
        }
      }
    }, onTagNameChange && {
      icon: 'editor-ol',
      title: __('Convert to ordered list'),
      isActive: isActiveListType('ol', tagName),
      onClick: function onClick() {
        onChange(changeListType(value, {
          type: 'ol'
        }));

        if (isListRootSelected()) {
          onTagNameChange('ol');
        }
      }
    }, {
      icon: 'editor-outdent',
      title: __('Outdent list item'),
      shortcut: _x('Backspace', 'keyboard key'),
      onClick: function onClick() {
        onChange(outdentListItems(value));
      }
    }, {
      icon: 'editor-indent',
      title: __('Indent list item'),
      shortcut: _x('Space', 'keyboard key'),
      onClick: function onClick() {
        onChange(indentListItems(value, {
          type: tagName
        }));
      }
    }].filter(Boolean)
  })));
};
//# sourceMappingURL=list-edit.js.map