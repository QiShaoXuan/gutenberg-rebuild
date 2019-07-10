"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ColumnsEdit = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _utils = require("./utils");

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
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
*/
var ALLOWED_BLOCKS = ['core/column'];

var ColumnsEdit = function ColumnsEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      className = _ref.className,
      updateAlignment = _ref.updateAlignment;
  var columns = attributes.columns,
      verticalAlignment = attributes.verticalAlignment;
  var classes = (0, _classnames2.default)(className, "has-".concat(columns, "-columns"), (0, _defineProperty2.default)({}, "are-vertically-aligned-".concat(verticalAlignment), verticalAlignment));

  var onChange = function onChange(alignment) {
    // Update all the (immediate) child Column Blocks
    updateAlignment(alignment);
  };

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, null, (0, _element.createElement)(_components.RangeControl, {
    label: (0, _i18n.__)('Columns'),
    value: columns,
    onChange: function onChange(nextColumns) {
      setAttributes({
        columns: nextColumns
      });
    },
    min: 2,
    max: 6
  }))), (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.BlockVerticalAlignmentToolbar, {
    onChange: onChange,
    value: verticalAlignment
  })), (0, _element.createElement)("div", {
    className: classes
  }, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    template: (0, _utils.getColumnsTemplate)(columns),
    templateLock: "all",
    allowedBlocks: ALLOWED_BLOCKS
  })));
};

exports.ColumnsEdit = ColumnsEdit;
var DEFAULT_EMPTY_ARRAY = [];

var _default = (0, _compose.compose)(
/**
 * Selects the child column Blocks for this parent Column
 */
(0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/editor'),
      getBlocksByClientId = _select.getBlocksByClientId;

  var block = getBlocksByClientId(clientId)[0];
  return {
    childColumns: block ? block.innerBlocks : DEFAULT_EMPTY_ARRAY
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
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

exports.default = _default;
//# sourceMappingURL=edit.js.map