import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { assign, get, has, includes, without } from 'lodash';
/**
 * WordPress dependencies
 */

import { compose, createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { getBlockSupport, getBlockType, hasBlockSupport } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { BlockControls, BlockAlignmentToolbar } from '../components';
/**
 * An array which includes all possible valid alignments,
 * used to validate if an alignment is valid or not.
 *
 * @constant
 * @type {string[]}
*/

var ALL_ALIGNMENTS = ['left', 'center', 'right', 'wide', 'full'];
/**
 * An array which includes all wide alignments.
 * In order for this alignments to be valid they need to be supported by the block,
 * and by the theme.
 *
 * @constant
 * @type {string[]}
*/

var WIDE_ALIGNMENTS = ['wide', 'full'];
/**
 * Returns the valid alignments.
 * Takes into consideration the aligns supported by a block, if the block supports wide controls or not and if theme supports wide controls or not.
 * Exported just for testing purposes, not exported outside the module.
 *
 * @param {?boolean|string[]} blockAlign          Aligns supported by the block.
 * @param {?boolean}          hasWideBlockSupport True if block supports wide alignments. And False otherwise.
 * @param {?boolean}          hasWideEnabled      True if theme supports wide alignments. And False otherwise.
 *
 * @return {string[]} Valid alignments.
 */

export function getValidAlignments(blockAlign) {
  var hasWideBlockSupport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var hasWideEnabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var validAlignments;

  if (Array.isArray(blockAlign)) {
    validAlignments = blockAlign;
  } else if (blockAlign === true) {
    // `true` includes all alignments...
    validAlignments = ALL_ALIGNMENTS;
  } else {
    validAlignments = [];
  }

  if (!hasWideEnabled || blockAlign === true && !hasWideBlockSupport) {
    return without.apply(void 0, [validAlignments].concat(WIDE_ALIGNMENTS));
  }

  return validAlignments;
}
/**
 * Filters registered block settings, extending attributes to include `align`.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */

export function addAttribute(settings) {
  // allow blocks to specify their own attribute definition with default values if needed.
  if (has(settings.attributes, ['align', 'type'])) {
    return settings;
  }

  if (hasBlockSupport(settings, 'align')) {
    // Use Lodash's assign to gracefully handle if attributes are undefined
    settings.attributes = assign(settings.attributes, {
      align: {
        type: 'string'
      }
    });
  }

  return settings;
}
/**
 * Override the default edit UI to include new toolbar controls for block
 * alignment, if block defines support.
 *
 * @param  {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */

export var withToolbarControls = createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    var blockName = props.name; // Compute valid alignments without taking into account,
    // if the theme supports wide alignments or not.
    // BlockAlignmentToolbar takes into account the theme support.

    var validAlignments = getValidAlignments(getBlockSupport(blockName, 'align'), hasBlockSupport(blockName, 'alignWide', true));

    var updateAlignment = function updateAlignment(nextAlign) {
      if (!nextAlign) {
        var blockType = getBlockType(props.name);
        var blockDefaultAlign = get(blockType, ['attributes', 'align', 'default']);

        if (blockDefaultAlign) {
          nextAlign = '';
        }
      }

      props.setAttributes({
        align: nextAlign
      });
    };

    return [validAlignments.length > 0 && props.isSelected && createElement(BlockControls, {
      key: "align-controls"
    }, createElement(BlockAlignmentToolbar, {
      value: props.attributes.align,
      onChange: updateAlignment,
      controls: validAlignments
    })), createElement(BlockEdit, _extends({
      key: "edit"
    }, props))];
  };
}, 'withToolbarControls'); // Exported just for testing purposes, not exported outside the module.

export var insideSelectWithDataAlign = function insideSelectWithDataAlign(BlockListBlock) {
  return function (props) {
    var name = props.name,
        attributes = props.attributes,
        hasWideEnabled = props.hasWideEnabled;
    var align = attributes.align;
    var validAlignments = getValidAlignments(getBlockSupport(name, 'align'), hasBlockSupport(name, 'alignWide', true), hasWideEnabled);
    var wrapperProps = props.wrapperProps;

    if (includes(validAlignments, align)) {
      wrapperProps = _objectSpread({}, wrapperProps, {
        'data-align': align
      });
    }

    return createElement(BlockListBlock, _extends({}, props, {
      wrapperProps: wrapperProps
    }));
  };
};
/**
 * Override the default block element to add alignment wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */

export var withDataAlign = createHigherOrderComponent(compose([withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    hasWideEnabled: !!getSettings().alignWide
  };
}), insideSelectWithDataAlign]));
/**
 * Override props assigned to save component to inject alignment class name if
 * block supports it.
 *
 * @param  {Object} props      Additional props applied to save element
 * @param  {Object} blockType  Block type
 * @param  {Object} attributes Block attributes
 * @return {Object}            Filtered props applied to save element
 */

export function addAssignedAlign(props, blockType, attributes) {
  var align = attributes.align;
  var blockAlign = getBlockSupport(blockType, 'align');
  var hasWideBlockSupport = hasBlockSupport(blockType, 'alignWide', true);
  var isAlignValid = includes( // Compute valid alignments without taking into account,
  // if the theme supports wide alignments or not.
  // This way changing themes does not impacts the block save.
  getValidAlignments(blockAlign, hasWideBlockSupport), align);

  if (isAlignValid) {
    props.className = classnames("align".concat(align), props.className);
  }

  return props;
}
addFilter('blocks.registerBlockType', 'core/align/addAttribute', addAttribute);
addFilter('editor.BlockListBlock', 'core/editor/align/with-data-align', withDataAlign);
addFilter('editor.BlockEdit', 'core/editor/align/with-toolbar-controls', withToolbarControls);
addFilter('blocks.getSaveContent.extraProps', 'core/align/addAssignedAlign', addAssignedAlign);
//# sourceMappingURL=align.js.map