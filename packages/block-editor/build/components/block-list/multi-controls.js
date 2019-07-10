"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _blockMover = _interopRequireDefault(require("../block-mover"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockListMultiControls(_ref) {
  var multiSelectedBlockClientIds = _ref.multiSelectedBlockClientIds,
      clientId = _ref.clientId,
      isSelecting = _ref.isSelecting,
      isFirst = _ref.isFirst,
      isLast = _ref.isLast;

  if (isSelecting) {
    return null;
  }

  return (0, _element.createElement)(_blockMover.default, {
    key: "mover",
    clientId: clientId,
    clientIds: multiSelectedBlockClientIds,
    isFirst: isFirst,
    isLast: isLast
  });
}

var _default = (0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
      isMultiSelecting = _select.isMultiSelecting,
      getBlockIndex = _select.getBlockIndex,
      getBlockCount = _select.getBlockCount;

  var clientIds = getMultiSelectedBlockClientIds();
  var firstIndex = getBlockIndex((0, _lodash.first)(clientIds), clientId);
  var lastIndex = getBlockIndex((0, _lodash.last)(clientIds), clientId);
  return {
    multiSelectedBlockClientIds: clientIds,
    isSelecting: isMultiSelecting(),
    isFirst: firstIndex === 0,
    isLast: lastIndex + 1 === getBlockCount()
  };
})(BlockListMultiControls);

exports.default = _default;
//# sourceMappingURL=multi-controls.js.map