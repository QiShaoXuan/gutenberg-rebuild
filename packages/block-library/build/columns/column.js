"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var name = 'core/column';
exports.name = name;

var ColumnEdit = function ColumnEdit(_ref) {
  var attributes = _ref.attributes,
      updateAlignment = _ref.updateAlignment;
  var verticalAlignment = attributes.verticalAlignment;
  var classes = (0, _classnames3.default)('block-core-columns', (0, _defineProperty2.default)({}, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment));

  var onChange = function onChange(alignment) {
    return updateAlignment(alignment);
  };

  return (0, _element.createElement)("div", {
    className: classes
  }, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.BlockVerticalAlignmentToolbar, {
    onChange: onChange,
    value: verticalAlignment
  })), (0, _element.createElement)(_blockEditor.InnerBlocks, {
    templateLock: false
  }));
};

var edit = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/editor'),
      getBlockRootClientId = _select.getBlockRootClientId;

  return {
    parentColumsBlockClientId: getBlockRootClientId(clientId)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
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
var settings = {
  title: (0, _i18n.__)('Column'),
  parent: ['core/columns'],
  icon: (0, _element.createElement)(_components.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, _element.createElement)(_components.Path, {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), (0, _element.createElement)(_components.Path, {
    d: "M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"
  })),
  description: (0, _i18n.__)('A single column within a columns block.'),
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
    var wrapperClasses = (0, _classnames3.default)((0, _defineProperty2.default)({}, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment));
    return (0, _element.createElement)("div", {
      className: wrapperClasses
    }, (0, _element.createElement)(_blockEditor.InnerBlocks.Content, null));
  }
};
exports.settings = settings;
//# sourceMappingURL=column.js.map