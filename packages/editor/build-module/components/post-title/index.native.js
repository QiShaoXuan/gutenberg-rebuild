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

import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import { withDispatch } from '@wordpress/data';
import { withFocusOutside } from '@wordpress/components';
import { withInstanceId, compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import styles from './style.scss';

var PostTitle =
/*#__PURE__*/
function (_Component) {
  _inherits(PostTitle, _Component);

  function PostTitle() {
    var _this;

    _classCallCheck(this, PostTitle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostTitle).apply(this, arguments));
    _this.onSelect = _this.onSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onUnselect = _this.onUnselect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.titleViewRef = null;
    _this.state = {
      isSelected: false
    };
    return _this;
  }

  _createClass(PostTitle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.innerRef) {
        this.props.innerRef(this);
      }
    }
  }, {
    key: "handleFocusOutside",
    value: function handleFocusOutside() {
      this.onUnselect();
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.titleViewRef) {
        this.titleViewRef.focus();
        this.setState({
          isSelected: true
        });
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect() {
      this.setState({
        isSelected: true
      });
      this.props.clearSelectedBlock();
    }
  }, {
    key: "onUnselect",
    value: function onUnselect() {
      this.setState({
        isSelected: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          style = _this$props.style,
          title = _this$props.title,
          focusedBorderColor = _this$props.focusedBorderColor,
          borderStyle = _this$props.borderStyle;
      var decodedPlaceholder = decodeEntities(placeholder);
      var borderColor = this.state.isSelected ? focusedBorderColor : 'transparent';
      return createElement(View, {
        style: [styles.titleContainer, borderStyle, {
          borderColor: borderColor
        }]
      }, createElement(RichText, {
        tagName: 'p',
        rootTagsToEliminate: ['strong'],
        onFocus: this.onSelect,
        onBlur: this.props.onBlur // always assign onBlur as a props
        ,
        multiline: false,
        style: style,
        fontSize: 24,
        fontWeight: 'bold',
        onChange: function onChange(value) {
          _this2.props.onUpdate(value);
        },
        placeholder: decodedPlaceholder,
        value: title,
        onSplit: this.props.onEnterPress,
        disableEditingMenu: true,
        setRef: function setRef(ref) {
          _this2.titleViewRef = ref;
        }
      }));
    }
  }]);

  return PostTitle;
}(Component);

var applyWithDispatch = withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      undo = _dispatch.undo,
      redo = _dispatch.redo;

  var _dispatch2 = dispatch('core/block-editor'),
      insertDefaultBlock = _dispatch2.insertDefaultBlock,
      clearSelectedBlock = _dispatch2.clearSelectedBlock;

  return {
    onEnterPress: function onEnterPress() {
      insertDefaultBlock(undefined, undefined, 0);
    },
    onUndo: undo,
    onRedo: redo,
    clearSelectedBlock: clearSelectedBlock
  };
});
export default compose(applyWithDispatch, withInstanceId, withFocusOutside)(PostTitle);
//# sourceMappingURL=index.native.js.map