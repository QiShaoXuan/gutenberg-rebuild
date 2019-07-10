import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
export var name = 'core/column';

var ColumnEdit = function ColumnEdit(_ref) {
  var attributes = _ref.attributes,
      updateAlignment = _ref.updateAlignment;
  var verticalAlignment = attributes.verticalAlignment;
  var classes = classnames('block-core-columns', _defineProperty({}, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment));

  var onChange = function onChange(alignment) {
    return updateAlignment(alignment);
  };

  return createElement("div", {
    className: classes
  }, createElement(BlockControls, null, createElement(BlockVerticalAlignmentToolbar, {
    onChange: onChange,
    value: verticalAlignment
  })), createElement(InnerBlocks, {
    templateLock: false
  }));
};

var edit = compose(withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/editor'),
      getBlockRootClientId = _select.getBlockRootClientId;

  return {
    parentColumsBlockClientId: getBlockRootClientId(clientId)
  };
}), withDispatch(function (dispatch, _ref3) {
  var clientId = _ref3.clientId,
      parentColumsBlockClientId = _ref3.parentColumsBlockClientId;
  return {
    updateAlignment: function updateAlignment(alignment) {
      // Update self...
      dispatch('core/editor').updateBlockAttributes(clientId, {
        verticalAlignment: alignment
      }); // Reset Parent Columns Block

      dispatch('core/editor').updateBlockAttributes(parentColumsBlockClientId, {
        verticalAlignment: null
      });
    }
  };
}))(ColumnEdit);
export var settings = {
  title: __('Column'),
  parent: ['core/columns'],
  icon: createElement(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement(Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), createElement(Path, {
    d: "M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"
  })),
  description: __('A single column within a columns block.'),
  category: 'common',
  attributes: {
    verticalAlignment: {
      type: 'string'
    }
  },
  supports: {
    inserter: false,
    reusable: false,
    html: false
  },
  edit: edit,
  save: function save(_ref4) {
    var attributes = _ref4.attributes;
    var verticalAlignment = attributes.verticalAlignment;
    var wrapperClasses = classnames(_defineProperty({}, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment));
    return createElement("div", {
      className: wrapperClasses
    }, createElement(InnerBlocks.Content, null));
  }
};
//# sourceMappingURL=column.js.map