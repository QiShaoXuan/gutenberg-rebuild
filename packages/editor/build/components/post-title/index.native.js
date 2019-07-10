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

var _reactNative = require("react-native");

var _blockEditor = require("@wordpress/block-editor");

var _htmlEntities = require("@wordpress/html-entities");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _style = _interopRequireDefault(require("./style.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostTitle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostTitle, _Component);

  function PostTitle() {
    var _this;

    (0, _classCallCheck2.default)(this, PostTitle);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostTitle).apply(this, arguments));
    _this.onSelect = _this.onSelect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onUnselect = _this.onUnselect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.titleViewRef = null;
    _this.state = {
      isSelected: false
    };
    return _this;
  }

  (0, _createClass2.default)(PostTitle, [{
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
      var decodedPlaceholder = (0, _htmlEntities.decodeEntities)(placeholder);
      var borderColor = this.state.isSelected ? focusedBorderColor : 'transparent';
      return (0, _element.createElement)(_reactNative.View, {
        style: [_style.default.titleContainer, borderStyle, {
          borderColor: borderColor
        }]
      }, (0, _element.createElement)(_blockEditor.RichText, {
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
}(_element.Component);

var applyWithDispatch = (0, _data.withDispatch)(function (dispatch) {
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

var _default = (0, _compose.compose)(applyWithDispatch, _compose.withInstanceId, _components.withFocusOutside)(PostTitle);

exports.default = _default;
//# sourceMappingURL=index.native.js.map