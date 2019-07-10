import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

var name = 'core/paragraph';

var ParagraphEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(ParagraphEdit, _Component);

  function ParagraphEdit(props) {
    var _this;

    _classCallCheck(this, ParagraphEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ParagraphEdit).call(this, props));
    _this.splitBlock = _this.splitBlock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onReplace = _this.onReplace.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * Split handler for RichText value, namely when content is pasted or the
   * user presses the Enter key.
   *
   * @param {?Array}     before Optional before value, to be used as content
   *                            in place of what exists currently for the
   *                            block. If undefined, the block is deleted.
   * @param {?Array}     after  Optional after value, to be appended in a new
   *                            paragraph block to the set of blocks passed
   *                            as spread.
   * @param {...WPBlock} blocks Optional blocks inserted between the before
   *                            and after value blocks.
   */


  _createClass(ParagraphEdit, [{
    key: "splitBlock",
    value: function splitBlock(before, after) {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          insertBlocksAfter = _this$props.insertBlocksAfter,
          setAttributes = _this$props.setAttributes,
          onReplace = _this$props.onReplace;

      for (var _len = arguments.length, blocks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        blocks[_key - 2] = arguments[_key];
      }

      if (after !== null) {
        // Append "After" content as a new paragraph block to the end of
        // any other blocks being inserted after the current paragraph.
        var newBlock = createBlock(name, {
          content: after
        });
        blocks.push(newBlock);
      }

      if (blocks.length && insertBlocksAfter) {
        insertBlocksAfter(blocks);
      }

      var content = attributes.content;

      if (before === null) {
        onReplace([]);
      } else if (content !== before) {
        // Only update content if it has in-fact changed. In case that user
        // has created a new paragraph at end of an existing one, the value
        // of before will be strictly equal to the current content.
        setAttributes({
          content: before
        });
      }
    }
  }, {
    key: "onReplace",
    value: function onReplace(blocks) {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          onReplace = _this$props2.onReplace;
      onReplace(blocks.map(function (block, index) {
        return index === 0 && block.name === name ? _objectSpread({}, block, {
          attributes: _objectSpread({}, attributes, block.attributes)
        }) : block;
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          attributes = _this$props3.attributes,
          setAttributes = _this$props3.setAttributes,
          mergeBlocks = _this$props3.mergeBlocks,
          style = _this$props3.style;
      var placeholder = attributes.placeholder,
          content = attributes.content;
      return createElement(View, null, createElement(RichText, {
        tagName: "p",
        value: content,
        isSelected: this.props.isSelected,
        onFocus: this.props.onFocus // always assign onFocus as a props
        ,
        onBlur: this.props.onBlur // always assign onBlur as a props
        ,
        onCaretVerticalPositionChange: this.props.onCaretVerticalPositionChange,
        style: style,
        onChange: function onChange(nextContent) {
          setAttributes({
            content: nextContent
          });
        },
        onSplit: this.splitBlock,
        onMerge: mergeBlocks,
        onReplace: this.onReplace,
        placeholder: placeholder || __('Start writing…')
      }));
    }
  }]);

  return ParagraphEdit;
}(Component);

export default ParagraphEdit;
//# sourceMappingURL=edit.native.js.map