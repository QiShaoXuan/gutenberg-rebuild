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

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _editor = _interopRequireDefault(require("./editor.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MoreEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MoreEdit, _Component);

  function MoreEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, MoreEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MoreEdit).apply(this, arguments));
    _this.onChangeInput = _this.onChangeInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      defaultText: (0, _i18n.__)('Read more')
    };
    return _this;
  }

  (0, _createClass2.default)(MoreEdit, [{
    key: "onChangeInput",
    value: function onChangeInput(newValue) {
      // Detect Enter.key and add new empty block after.
      // Note: This is detected after the fact, and the newline could be visible on the block
      // for a very small time. This is OK for the alpha, we will revisit the logic later.
      // See https://github.com/wordpress-mobile/gutenberg-mobile/issues/324
      if (newValue.indexOf('\n') !== -1) {
        var insertBlocksAfter = this.props.insertBlocksAfter;
        insertBlocksAfter([(0, _blocks.createBlock)((0, _blocks.getDefaultBlockName)())]);
        return;
      } // Set defaultText to an empty string, allowing the user to clear/replace the input field's text


      this.setState({
        defaultText: ''
      });
      var value = newValue.length === 0 ? undefined : newValue;
      this.props.setAttributes({
        customText: value
      });
    }
  }, {
    key: "renderLine",
    value: function renderLine() {
      return (0, _element.createElement)(_reactNative.View, {
        style: _editor.default['block-library-more__line']
      });
    }
  }, {
    key: "renderText",
    value: function renderText() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur;
      var customText = attributes.customText;
      var defaultText = this.state.defaultText;
      var value = customText !== undefined ? customText : defaultText;
      return (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_blockEditor.PlainText, {
        style: _editor.default['block-library-more__text'],
        value: value,
        multiline: true,
        underlineColorAndroid: "transparent",
        onChange: this.onChangeInput,
        placeholder: defaultText,
        isSelected: this.props.isSelected,
        onFocus: onFocus,
        onBlur: onBlur
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _element.createElement)(_reactNative.View, {
        style: _editor.default['block-library-more__container']
      }, this.renderLine(), this.renderText(), this.renderLine());
    }
  }]);
  return MoreEdit;
}(_element.Component);

exports.default = MoreEdit;
//# sourceMappingURL=edit.native.js.map