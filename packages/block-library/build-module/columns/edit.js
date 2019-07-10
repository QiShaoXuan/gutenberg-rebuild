import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls, InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { getColumnsTemplate } from './utils';
/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
*/

var ALLOWED_BLOCKS = ['core/column'];
export var ColumnsEdit = function ColumnsEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      className = _ref.className,
      updateAlignment = _ref.updateAlignment;
  var columns = attributes.columns,
      verticalAlignment = attributes.verticalAlignment;
  var classes = classnames(className, "has-".concat(columns, "-columns"), _defineProperty({}, "are-vertically-aligned-".concat(verticalAlignment), verticalAlignment));

  var onChange = function onChange(alignment) {
    // Update all the (immediate) child Column Blocks
    updateAlignment(alignment);
  };

  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, null, createElement(RangeControl, {
    label: __('Columns'),
    value: columns,
    onChange: function onChange(nextColumns) {
      setAttributes({
        columns: nextColumns
      });
    },
    min: 2,
    max: 6
  }))), createElement(BlockControls, null, createElement(BlockVerticalAlignmentToolbar, {
    onChange: onChange,
    value: verticalAlignment
  })), createElement("div", {
    className: classes
  }, createElement(InnerBlocks, {
    template: getColumnsTemplate(columns),
    templateLock: "all",
    allowedBlocks: ALLOWED_BLOCKS
  })));
};
var DEFAULT_EMPTY_ARRAY = [];
export default compose(
/**
 * Selects the child column Blocks for this parent Column
 */
withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/editor'),
      getBlocksByClientId = _select.getBlocksByClientId;

  var block = getBlocksByClientId(clientId)[0];
  return {
    childColumns: block ? block.innerBlocks : DEFAULT_EMPTY_ARRAY
  };
}), withDispatch(function (dispatch, _ref3) {
  var clientId = _ref3.clientId,
      childColumns = _ref3.childColumns;
  return {
    /**
     * Update all child column Blocks with a new
     * vertical alignment setting based on whatever
     * alignment is passed in. This allows change to parent
     * to overide anything set on a individual column basis
     *
     * @param  {string} alignment the vertical alignment setting
     */
    updateAlignment: function updateAlignment(alignment) {
      // Update self...
      dispatch('core/editor').updateBlockAttributes(clientId, {
        verticalAlignment: alignment
      }); // Update all child Column Blocks to match

      childColumns.forEach(function (childColumn) {
        dispatch('core/editor').updateBlockAttributes(childColumn.clientId, {
          verticalAlignment: alignment
        });
      });
    }
  };
}))(ColumnsEdit);
//# sourceMappingURL=edit.js.map