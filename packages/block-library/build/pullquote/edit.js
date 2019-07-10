"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SOLID_COLOR_CLASS = exports.SOLID_COLOR_STYLE_NAME = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var SOLID_COLOR_STYLE_NAME = 'solid-color';
exports.SOLID_COLOR_STYLE_NAME = SOLID_COLOR_STYLE_NAME;
var SOLID_COLOR_CLASS = "is-style-".concat(SOLID_COLOR_STYLE_NAME);
exports.SOLID_COLOR_CLASS = SOLID_COLOR_CLASS;

var PullQuoteEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PullQuoteEdit, _Component);

  function PullQuoteEdit(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PullQuoteEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PullQuoteEdit).call(this, props));
    _this.wasTextColorAutomaticallyComputed = false;
    _this.pullQuoteMainColorSetter = _this.pullQuoteMainColorSetter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.pullQuoteTextColorSetter = _this.pullQuoteTextColorSetter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(PullQuoteEdit, [{
    key: "pullQuoteMainColorSetter",
    value: function pullQuoteMainColorSetter(colorValue) {
      var _this$props = this.props,
          colorUtils = _this$props.colorUtils,
          textColor = _this$props.textColor,
          setTextColor = _this$props.setTextColor,
          setMainColor = _this$props.setMainColor,
          className = _this$props.className;
      var isSolidColorStyle = (0, _lodash.includes)(className, SOLID_COLOR_CLASS);
      var needTextColor = !textColor.color || this.wasTextColorAutomaticallyComputed;
      var shouldSetTextColor = isSolidColorStyle && needTextColor && colorValue;
      setMainColor(colorValue);

      if (shouldSetTextColor) {
        this.wasTextColorAutomaticallyComputed = true;
        setTextColor(colorUtils.getMostReadableColor(colorValue));
      }
    }
  }, {
    key: "pullQuoteTextColorSetter",
    value: function pullQuoteTextColorSetter(colorValue) {
      var setTextColor = this.props.setTextColor;
      setTextColor(colorValue);
      this.wasTextColorAutomaticallyComputed = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          mainColor = _this$props2.mainColor,
          textColor = _this$props2.textColor,
          setAttributes = _this$props2.setAttributes,
          isSelected = _this$props2.isSelected,
          className = _this$props2.className;
      var value = attributes.value,
          citation = attributes.citation;
      var isSolidColorStyle = (0, _lodash.includes)(className, SOLID_COLOR_CLASS);
      var figureStyle = isSolidColorStyle ? {
        backgroundColor: mainColor.color
      } : {
        borderColor: mainColor.color
      };
      var blockquoteStyle = {
        color: textColor.color
      };
      var blockquoteClasses = textColor.color ? (0, _classnames3.default)('has-text-color', (0, _defineProperty2.default)({}, textColor.class, textColor.class)) : undefined;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("figure", {
        style: figureStyle,
        className: (0, _classnames3.default)(className, (0, _defineProperty2.default)({}, mainColor.class, isSolidColorStyle && mainColor.class))
      }, (0, _element.createElement)("blockquote", {
        style: blockquoteStyle,
        className: blockquoteClasses
      }, (0, _element.createElement)(_blockEditor.RichText, {
        multiline: true,
        value: value,
        onChange: function onChange(nextValue) {
          return setAttributes({
            value: nextValue
          });
        },
        placeholder: // translators: placeholder text used for the quote
        (0, _i18n.__)('Write quote…'),
        wrapperClassName: "block-library-pullquote__content"
      }), (!_blockEditor.RichText.isEmpty(citation) || isSelected) && (0, _element.createElement)(_blockEditor.RichText, {
        value: citation,
        placeholder: // translators: placeholder text used for the citation
        (0, _i18n.__)('Write citation…'),
        onChange: function onChange(nextCitation) {
          return setAttributes({
            citation: nextCitation
          });
        },
        className: "wp-block-pullquote__citation"
      }))), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_blockEditor.PanelColorSettings, {
        title: (0, _i18n.__)('Color Settings'),
        colorSettings: [{
          value: mainColor.color,
          onChange: this.pullQuoteMainColorSetter,
          label: (0, _i18n.__)('Main Color')
        }, {
          value: textColor.color,
          onChange: this.pullQuoteTextColorSetter,
          label: (0, _i18n.__)('Text Color')
        }]
      }, isSolidColorStyle && (0, _element.createElement)(_blockEditor.ContrastChecker, (0, _extends2.default)({
        textColor: textColor.color,
        backgroundColor: mainColor.color
      }, {
        isLargeText: false
      })))));
    }
  }]);
  return PullQuoteEdit;
}(_element.Component);

var _default = (0, _blockEditor.withColors)({
  mainColor: 'background-color',
  textColor: 'color'
})(PullQuoteEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map