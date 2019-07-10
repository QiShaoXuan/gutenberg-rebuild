"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _window = window,
    getComputedStyle = _window.getComputedStyle;
var applyFallbackStyles = (0, _components.withFallbackStyles)(function (node, ownProps) {
  var textColor = ownProps.textColor,
      backgroundColor = ownProps.backgroundColor;
  var backgroundColorValue = backgroundColor && backgroundColor.color;
  var textColorValue = textColor && textColor.color; //avoid the use of querySelector if textColor color is known and verify if node is available.

  var textNode = !textColorValue && node ? node.querySelector('[contenteditable="true"]') : null;
  return {
    fallbackBackgroundColor: backgroundColorValue || !node ? undefined : getComputedStyle(node).backgroundColor,
    fallbackTextColor: textColorValue || !textNode ? undefined : getComputedStyle(textNode).color
  };
});

var ButtonEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ButtonEdit, _Component);

  function ButtonEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, ButtonEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ButtonEdit).apply(this, arguments));
    _this.nodeRef = null;
    _this.bindRef = _this.bindRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ButtonEdit, [{
    key: "bindRef",
    value: function bindRef(node) {
      if (!node) {
        return;
      }

      this.nodeRef = node;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          backgroundColor = _this$props.backgroundColor,
          textColor = _this$props.textColor,
          setBackgroundColor = _this$props.setBackgroundColor,
          setTextColor = _this$props.setTextColor,
          fallbackBackgroundColor = _this$props.fallbackBackgroundColor,
          fallbackTextColor = _this$props.fallbackTextColor,
          setAttributes = _this$props.setAttributes,
          isSelected = _this$props.isSelected,
          className = _this$props.className;
      var text = attributes.text,
          url = attributes.url,
          title = attributes.title;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
        className: className,
        title: title,
        ref: this.bindRef
      }, (0, _element.createElement)(_blockEditor.RichText, {
        placeholder: (0, _i18n.__)('Add text…'),
        value: text,
        onChange: function onChange(value) {
          return setAttributes({
            text: value
          });
        },
        formattingControls: ['bold', 'italic', 'strikethrough'],
        className: (0, _classnames2.default)('wp-block-button__link', (_classnames = {
          'has-background': backgroundColor.color
        }, (0, _defineProperty2.default)(_classnames, backgroundColor.class, backgroundColor.class), (0, _defineProperty2.default)(_classnames, 'has-text-color', textColor.color), (0, _defineProperty2.default)(_classnames, textColor.class, textColor.class), _classnames)),
        style: {
          backgroundColor: backgroundColor.color,
          color: textColor.color
        },
        keepPlaceholderOnFocus: true
      }), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_blockEditor.PanelColorSettings, {
        title: (0, _i18n.__)('Color Settings'),
        colorSettings: [{
          value: backgroundColor.color,
          onChange: setBackgroundColor,
          label: (0, _i18n.__)('Background Color')
        }, {
          value: textColor.color,
          onChange: setTextColor,
          label: (0, _i18n.__)('Text Color')
        }]
      }, (0, _element.createElement)(_blockEditor.ContrastChecker, {
        // Text is considered large if font size is greater or equal to 18pt or 24px,
        // currently that's not the case for button.
        isLargeText: false,
        textColor: textColor.color,
        backgroundColor: backgroundColor.color,
        fallbackBackgroundColor: fallbackBackgroundColor,
        fallbackTextColor: fallbackTextColor
      })))), isSelected && (0, _element.createElement)("form", {
        className: "block-library-button__inline-link",
        onSubmit: function onSubmit(event) {
          return event.preventDefault();
        }
      }, (0, _element.createElement)(_components.Dashicon, {
        icon: "admin-links"
      }), (0, _element.createElement)(_blockEditor.URLInput, {
        value: url,
        onChange: function onChange(value) {
          return setAttributes({
            url: value
          });
        }
      }), (0, _element.createElement)(_components.IconButton, {
        icon: "editor-break",
        label: (0, _i18n.__)('Apply'),
        type: "submit"
      })));
    }
  }]);
  return ButtonEdit;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _blockEditor.withColors)('backgroundColor', {
  textColor: 'color'
}), applyFallbackStyles])(ButtonEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map