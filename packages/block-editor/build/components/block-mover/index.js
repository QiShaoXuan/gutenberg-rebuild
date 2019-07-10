"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockMover = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _moverDescription = require("./mover-description");

var _icons = require("./icons");

var _dragHandle = require("./drag-handle");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockMover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockMover, _Component);

  function BlockMover() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockMover);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockMover).apply(this, arguments));
    _this.state = {
      isFocused: false
    };
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(BlockMover, [{
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        isFocused: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        isFocused: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onMoveUp = _this$props.onMoveUp,
          onMoveDown = _this$props.onMoveDown,
          isFirst = _this$props.isFirst,
          isLast = _this$props.isLast,
          isDraggable = _this$props.isDraggable,
          onDragStart = _this$props.onDragStart,
          onDragEnd = _this$props.onDragEnd,
          clientIds = _this$props.clientIds,
          blockElementId = _this$props.blockElementId,
          blockType = _this$props.blockType,
          firstIndex = _this$props.firstIndex,
          isLocked = _this$props.isLocked,
          instanceId = _this$props.instanceId,
          isHidden = _this$props.isHidden;
      var isFocused = this.state.isFocused;
      var blocksCount = (0, _lodash.castArray)(clientIds).length;

      if (isLocked || isFirst && isLast) {
        return null;
      } // We emulate a disabled state because forcefully applying the `disabled`
      // attribute on the button while it has focus causes the screen to change
      // to an unfocused state (body as active element) without firing blur on,
      // the rendering parent, leaving it unable to react to focus out.


      return (0, _element.createElement)("div", {
        className: (0, _classnames.default)('editor-block-mover block-editor-block-mover', {
          'is-visible': isFocused || !isHidden
        })
      }, (0, _element.createElement)(_components.IconButton, {
        className: "editor-block-mover__control block-editor-block-mover__control",
        onClick: isFirst ? null : onMoveUp,
        icon: _icons.upArrow,
        label: (0, _i18n.__)('Move up'),
        "aria-describedby": "block-editor-block-mover__up-description-".concat(instanceId),
        "aria-disabled": isFirst,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }), (0, _element.createElement)(_dragHandle.IconDragHandle, {
        className: "editor-block-mover__control block-editor-block-mover__control",
        icon: _icons.dragHandle,
        clientId: clientIds,
        blockElementId: blockElementId,
        isVisible: isDraggable,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd
      }), (0, _element.createElement)(_components.IconButton, {
        className: "editor-block-mover__control block-editor-block-mover__control",
        onClick: isLast ? null : onMoveDown,
        icon: _icons.downArrow,
        label: (0, _i18n.__)('Move down'),
        "aria-describedby": "block-editor-block-mover__down-description-".concat(instanceId),
        "aria-disabled": isLast,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }), (0, _element.createElement)("span", {
        id: "block-editor-block-mover__up-description-".concat(instanceId),
        className: "editor-block-mover__description block-editor-block-mover__description"
      }, (0, _moverDescription.getBlockMoverDescription)(blocksCount, blockType && blockType.title, firstIndex, isFirst, isLast, -1)), (0, _element.createElement)("span", {
        id: "block-editor-block-mover__down-description-".concat(instanceId),
        className: "editor-block-mover__description block-editor-block-mover__description"
      }, (0, _moverDescription.getBlockMoverDescription)(blocksCount, blockType && blockType.title, firstIndex, isFirst, isLast, 1)));
    }
  }]);
  return BlockMover;
}(_element.Component);

exports.BlockMover = BlockMover;

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref) {
  var clientIds = _ref.clientIds;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock,
      getBlockIndex = _select.getBlockIndex,
      getTemplateLock = _select.getTemplateLock,
      getBlockRootClientId = _select.getBlockRootClientId;

  var firstClientId = (0, _lodash.first)((0, _lodash.castArray)(clientIds));
  var block = getBlock(firstClientId);
  var rootClientId = getBlockRootClientId((0, _lodash.first)((0, _lodash.castArray)(clientIds)));
  return {
    firstIndex: getBlockIndex(firstClientId, rootClientId),
    blockType: block ? (0, _blocks.getBlockType)(block.name) : null,
    isLocked: getTemplateLock(rootClientId) === 'all',
    rootClientId: rootClientId
  };
}), (0, _data.withDispatch)(function (dispatch, _ref2) {
  var clientIds = _ref2.clientIds,
      rootClientId = _ref2.rootClientId;

  var _dispatch = dispatch('core/block-editor'),
      moveBlocksDown = _dispatch.moveBlocksDown,
      moveBlocksUp = _dispatch.moveBlocksUp;

  return {
    onMoveDown: (0, _lodash.partial)(moveBlocksDown, clientIds, rootClientId),
    onMoveUp: (0, _lodash.partial)(moveBlocksUp, clientIds, rootClientId)
  };
}), _compose.withInstanceId)(BlockMover);

exports.default = _default;
//# sourceMappingURL=index.js.map