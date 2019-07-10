"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _check = _interopRequireDefault(require("../media-upload/check"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var parseDropEvent = function parseDropEvent(event) {
  var result = {
    srcRootClientId: null,
    srcClientId: null,
    srcIndex: null,
    type: null
  };

  if (!event.dataTransfer) {
    return result;
  }

  try {
    result = Object.assign(result, JSON.parse(event.dataTransfer.getData('text')));
  } catch (err) {
    return result;
  }

  return result;
};

var BlockDropZone =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockDropZone, _Component);

  function BlockDropZone() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockDropZone);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockDropZone).apply(this, arguments));
    _this.onFilesDrop = _this.onFilesDrop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onHTMLDrop = _this.onHTMLDrop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onDrop = _this.onDrop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(BlockDropZone, [{
    key: "getInsertIndex",
    value: function getInsertIndex(position) {
      var _this$props = this.props,
          clientId = _this$props.clientId,
          rootClientId = _this$props.rootClientId,
          getBlockIndex = _this$props.getBlockIndex;

      if (clientId !== undefined) {
        var index = getBlockIndex(clientId, rootClientId);
        return position.y === 'top' ? index : index + 1;
      }
    }
  }, {
    key: "onFilesDrop",
    value: function onFilesDrop(files, position) {
      var transformation = (0, _blocks.findTransform)((0, _blocks.getBlockTransforms)('from'), function (transform) {
        return transform.type === 'files' && transform.isMatch(files);
      });

      if (transformation) {
        var insertIndex = this.getInsertIndex(position);
        var blocks = transformation.transform(files, this.props.updateBlockAttributes);
        this.props.insertBlocks(blocks, insertIndex);
      }
    }
  }, {
    key: "onHTMLDrop",
    value: function onHTMLDrop(HTML, position) {
      var blocks = (0, _blocks.pasteHandler)({
        HTML: HTML,
        mode: 'BLOCKS'
      });

      if (blocks.length) {
        this.props.insertBlocks(blocks, this.getInsertIndex(position));
      }
    }
  }, {
    key: "onDrop",
    value: function onDrop(event, position) {
      var _this$props2 = this.props,
          dstRootClientId = _this$props2.rootClientId,
          dstClientId = _this$props2.clientId,
          getClientIdsOfDescendants = _this$props2.getClientIdsOfDescendants,
          getBlockIndex = _this$props2.getBlockIndex;

      var _parseDropEvent = parseDropEvent(event),
          srcRootClientId = _parseDropEvent.srcRootClientId,
          srcClientId = _parseDropEvent.srcClientId,
          srcIndex = _parseDropEvent.srcIndex,
          type = _parseDropEvent.type;

      var isBlockDropType = function isBlockDropType(dropType) {
        return dropType === 'block';
      };

      var isSameLevel = function isSameLevel(srcRoot, dstRoot) {
        // Note that rootClientId of top-level blocks will be undefined OR a void string,
        // so we also need to account for that case separately.
        return srcRoot === dstRoot || !srcRoot === true && !dstRoot === true;
      };

      var isSameBlock = function isSameBlock(src, dst) {
        return src === dst;
      };

      var isSrcBlockAnAncestorOfDstBlock = function isSrcBlockAnAncestorOfDstBlock(src, dst) {
        return getClientIdsOfDescendants([src]).some(function (id) {
          return id === dst;
        });
      };

      if (!isBlockDropType(type) || isSameBlock(srcClientId, dstClientId) || isSrcBlockAnAncestorOfDstBlock(srcClientId, dstClientId || dstRootClientId)) {
        return;
      }

      var dstIndex = dstClientId ? getBlockIndex(dstClientId, dstRootClientId) : undefined;
      var positionIndex = this.getInsertIndex(position); // If the block is kept at the same level and moved downwards,
      // subtract to account for blocks shifting upward to occupy its old position.

      var insertIndex = dstIndex && srcIndex < dstIndex && isSameLevel(srcRootClientId, dstRootClientId) ? positionIndex - 1 : positionIndex;
      this.props.moveBlockToPosition(srcClientId, srcRootClientId, insertIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          isLocked = _this$props3.isLocked,
          index = _this$props3.index;

      if (isLocked) {
        return null;
      }

      var isAppender = index === undefined;
      return (0, _element.createElement)(_check.default, null, (0, _element.createElement)(_components.DropZone, {
        className: (0, _classnames.default)('editor-block-drop-zone block-editor-block-drop-zone', {
          'is-appender': isAppender
        }),
        onFilesDrop: this.onFilesDrop,
        onHTMLDrop: this.onHTMLDrop,
        onDrop: this.onDrop
      }));
    }
  }]);
  return BlockDropZone;
}(_element.Component);

var _default = (0, _compose.compose)((0, _data.withDispatch)(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/block-editor'),
      _insertBlocks = _dispatch.insertBlocks,
      _updateBlockAttributes = _dispatch.updateBlockAttributes,
      _moveBlockToPosition = _dispatch.moveBlockToPosition;

  return {
    insertBlocks: function insertBlocks(blocks, index) {
      var rootClientId = ownProps.rootClientId;

      _insertBlocks(blocks, index, rootClientId);
    },
    updateBlockAttributes: function updateBlockAttributes() {
      _updateBlockAttributes.apply(void 0, arguments);
    },
    moveBlockToPosition: function moveBlockToPosition(srcClientId, srcRootClientId, dstIndex) {
      var dstRootClientId = ownProps.rootClientId;

      _moveBlockToPosition(srcClientId, srcRootClientId, dstRootClientId, dstIndex);
    }
  };
}), (0, _data.withSelect)(function (select, _ref) {
  var rootClientId = _ref.rootClientId;

  var _select = select('core/block-editor'),
      getClientIdsOfDescendants = _select.getClientIdsOfDescendants,
      getTemplateLock = _select.getTemplateLock,
      getBlockIndex = _select.getBlockIndex;

  return {
    isLocked: !!getTemplateLock(rootClientId),
    getClientIdsOfDescendants: getClientIdsOfDescendants,
    getBlockIndex: getBlockIndex
  };
}), (0, _components.withFilters)('editor.BlockDropZone'))(BlockDropZone);

exports.default = _default;
//# sourceMappingURL=index.js.map