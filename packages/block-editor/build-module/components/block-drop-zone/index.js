import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { DropZone, withFilters } from '@wordpress/components';
import { pasteHandler, getBlockTransforms, findTransform } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import MediaUploadCheck from '../media-upload/check';

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
  _inherits(BlockDropZone, _Component);

  function BlockDropZone() {
    var _this;

    _classCallCheck(this, BlockDropZone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockDropZone).apply(this, arguments));
    _this.onFilesDrop = _this.onFilesDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onHTMLDrop = _this.onHTMLDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockDropZone, [{
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
      var transformation = findTransform(getBlockTransforms('from'), function (transform) {
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
      var blocks = pasteHandler({
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
      return createElement(MediaUploadCheck, null, createElement(DropZone, {
        className: classnames('editor-block-drop-zone block-editor-block-drop-zone', {
          'is-appender': isAppender
        }),
        onFilesDrop: this.onFilesDrop,
        onHTMLDrop: this.onHTMLDrop,
        onDrop: this.onDrop
      }));
    }
  }]);

  return BlockDropZone;
}(Component);

export default compose(withDispatch(function (dispatch, ownProps) {
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
}), withSelect(function (select, _ref) {
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
}), withFilters('editor.BlockDropZone'))(BlockDropZone);
//# sourceMappingURL=index.js.map