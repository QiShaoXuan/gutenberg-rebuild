import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import HeadingToolbar from './heading-toolbar';
/**
 * External dependencies
 */

import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import styles from './editor.scss';
var name = 'core/heading';

var HeadingEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(HeadingEdit, _Component);

  function HeadingEdit(props) {
    var _this;

    _classCallCheck(this, HeadingEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeadingEdit).call(this, props));
    _this.splitBlock = _this.splitBlock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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


  _createClass(HeadingEdit, [{
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

      if (after) {
        // Append "After" content as a new heading block to the end of
        // any other blocks being inserted after the current heading.
        var newBlock = createBlock(name, {
          content: after
        });
        blocks.push(newBlock);
      } else {
        var _newBlock = createBlock('core/paragraph', {
          content: after
        });

        blocks.push(_newBlock);
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
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes,
          mergeBlocks = _this$props2.mergeBlocks,
          style = _this$props2.style;
      var level = attributes.level,
          placeholder = attributes.placeholder,
          content = attributes.content;
      var tagName = 'h' + level;
      return createElement(View, null, createElement(BlockControls, null, createElement(HeadingToolbar, {
        minLevel: 2,
        maxLevel: 5,
        selectedLevel: level,
        onChange: function onChange(newLevel) {
          return setAttributes({
            level: newLevel
          });
        }
      })), createElement(RichText, {
        tagName: tagName,
        value: content,
        isSelected: this.props.isSelected,
        style: _objectSpread({}, style, {
          minHeight: styles['wp-block-heading'].minHeight
        }),
        onFocus: this.props.onFocus // always assign onFocus as a props
        ,
        onBlur: this.props.onBlur // always assign onBlur as a props
        ,
        onCaretVerticalPositionChange: this.props.onCaretVerticalPositionChange,
        onChange: function onChange(value) {
          return setAttributes({
            content: value
          });
        },
        onMerge: mergeBlocks,
        onSplit: this.splitBlock,
        placeholder: placeholder || __('Write heading…')
      }));
    }
  }]);

  return HeadingEdit;
}(Component);

export default HeadingEdit;
//# sourceMappingURL=edit.native.js.map