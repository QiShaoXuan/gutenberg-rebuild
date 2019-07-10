"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAttribute = addAttribute;
exports.addSaveProps = addSaveProps;
exports.withInspectorControl = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _components2 = require("../components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
var ANCHOR_REGEX = /[\s#]/g;
/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */

function addAttribute(settings) {
  if ((0, _blocks.hasBlockSupport)(settings, 'anchor')) {
    // Use Lodash's assign to gracefully handle if attributes are undefined
    settings.attributes = (0, _lodash.assign)(settings.attributes, {
      anchor: {
        type: 'string',
        source: 'attribute',
        attribute: 'id',
        selector: '*'
      }
    });
  }

  return settings;
}
/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the anchor ID, if block supports anchor.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */


var withInspectorControl = (0, _compose.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    var hasAnchor = (0, _blocks.hasBlockSupport)(props.name, 'anchor');

    if (hasAnchor && props.isSelected) {
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(BlockEdit, props), (0, _element.createElement)(_components2.InspectorAdvancedControls, null, (0, _element.createElement)(_components.TextControl, {
        label: (0, _i18n.__)('HTML Anchor'),
        help: (0, _i18n.__)('Anchors lets you link directly to a section on a page.'),
        value: props.attributes.anchor || '',
        onChange: function onChange(nextValue) {
          nextValue = nextValue.replace(ANCHOR_REGEX, '-');
          props.setAttributes({
            anchor: nextValue
          });
        }
      })));
    }

    return (0, _element.createElement)(BlockEdit, props);
  };
}, 'withInspectorControl');
/**
 * Override props assigned to save component to inject anchor ID, if block
 * supports anchor. This is only applied if the block's save result is an
 * element and not a markup string.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */

exports.withInspectorControl = withInspectorControl;

function addSaveProps(extraProps, blockType, attributes) {
  if ((0, _blocks.hasBlockSupport)(blockType, 'anchor')) {
    extraProps.id = attributes.anchor === '' ? null : attributes.anchor;
  }

  return extraProps;
}

(0, _hooks.addFilter)('blocks.registerBlockType', 'core/anchor/attribute', addAttribute);
(0, _hooks.addFilter)('editor.BlockEdit', 'core/editor/anchor/with-inspector-control', withInspectorControl);
(0, _hooks.addFilter)('blocks.getSaveContent.extraProps', 'core/anchor/save-props', addSaveProps);
//# sourceMappingURL=anchor.js.map