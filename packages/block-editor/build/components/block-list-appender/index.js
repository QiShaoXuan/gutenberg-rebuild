"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _ignoreNestedEvents = _interopRequireDefault(require("../ignore-nested-events"));

var _defaultBlockAppender = _interopRequireDefault(require("../default-block-appender"));

var _inserter = _interopRequireDefault(require("../inserter"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockListAppender(_ref) {
  var blockClientIds = _ref.blockClientIds,
      rootClientId = _ref.rootClientId,
      canInsertDefaultBlock = _ref.canInsertDefaultBlock,
      isLocked = _ref.isLocked;

  if (isLocked) {
    return null;
  }

  if (canInsertDefaultBlock) {
    return (0, _element.createElement)(_ignoreNestedEvents.default, {
      childHandledEvents: ['onFocus', 'onClick', 'onKeyDown']
    }, (0, _element.createElement)(_defaultBlockAppender.default, {
      rootClientId: rootClientId,
      lastBlockClientId: (0, _lodash.last)(blockClientIds)
    }));
  }

  return (0, _element.createElement)("div", {
    className: "block-list-appender"
  }, (0, _element.createElement)(_inserter.default, {
    rootClientId: rootClientId,
    renderToggle: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle,
          disabled = _ref2.disabled,
          isOpen = _ref2.isOpen;
      return (0, _element.createElement)(_components.IconButton, {
        label: (0, _i18n.__)('Add block'),
        icon: "insert",
        onClick: onToggle,
        className: "block-list-appender__toggle",
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        disabled: disabled
      });
    },
    isAppender: true
  }));
}

var _default = (0, _data.withSelect)(function (select, _ref3) {
  var rootClientId = _ref3.rootClientId;

  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder,
      canInsertBlockType = _select.canInsertBlockType,
      getTemplateLock = _select.getTemplateLock;

  return {
    isLocked: !!getTemplateLock(rootClientId),
    blockClientIds: getBlockOrder(rootClientId),
    canInsertDefaultBlock: canInsertBlockType((0, _blocks.getDefaultBlockName)(), rootClientId)
  };
})(BlockListAppender);

exports.default = _default;
//# sourceMappingURL=index.js.map