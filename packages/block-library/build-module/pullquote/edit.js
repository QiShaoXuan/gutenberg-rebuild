import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import { includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { RichText, ContrastChecker, InspectorControls, withColors, PanelColorSettings } from '@wordpress/block-editor';
export var SOLID_COLOR_STYLE_NAME = 'solid-color';
export var SOLID_COLOR_CLASS = "is-style-".concat(SOLID_COLOR_STYLE_NAME);

var PullQuoteEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(PullQuoteEdit, _Component);

  function PullQuoteEdit(props) {
    var _this;

    _classCallCheck(this, PullQuoteEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PullQuoteEdit).call(this, props));
    _this.wasTextColorAutomaticallyComputed = false;
    _this.pullQuoteMainColorSetter = _this.pullQuoteMainColorSetter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.pullQuoteTextColorSetter = _this.pullQuoteTextColorSetter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PullQuoteEdit, [{
    key: "pullQuoteMainColorSetter",
    value: function pullQuoteMainColorSetter(colorValue) {
      var _this$props = this.props,
          colorUtils = _this$props.colorUtils,
          textColor = _this$props.textColor,
          setTextColor = _this$props.setTextColor,
          setMainColor = _this$props.setMainColor,
          className = _this$props.className;
      var isSolidColorStyle = includes(className, SOLID_COLOR_CLASS);
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
      var isSolidColorStyle = includes(className, SOLID_COLOR_CLASS);
      var figureStyle = isSolidColorStyle ? {
        backgroundColor: mainColor.color
      } : {
        borderColor: mainColor.color
      };
      var blockquoteStyle = {
        color: textColor.color
      };
      var blockquoteClasses = textColor.color ? classnames('has-text-color', _defineProperty({}, textColor.class, textColor.class)) : undefined;
      return createElement(Fragment, null, createElement("figure", {
        style: figureStyle,
        className: classnames(className, _defineProperty({}, mainColor.class, isSolidColorStyle && mainColor.class))
      }, createElement("blockquote", {
        style: blockquoteStyle,
        className: blockquoteClasses
      }, createElement(RichText, {
        multiline: true,
        value: value,
        onChange: function onChange(nextValue) {
          return setAttributes({
            value: nextValue
          });
        },
        placeholder: // translators: placeholder text used for the quote
        __('Write quote…'),
        wrapperClassName: "block-library-pullquote__content"
      }), (!RichText.isEmpty(citation) || isSelected) && createElement(RichText, {
        value: citation,
        placeholder: // translators: placeholder text used for the citation
        __('Write citation…'),
        onChange: function onChange(nextCitation) {
          return setAttributes({
            citation: nextCitation
          });
        },
        className: "wp-block-pullquote__citation"
      }))), createElement(InspectorControls, null, createElement(PanelColorSettings, {
        title: __('Color Settings'),
        colorSettings: [{
          value: mainColor.color,
          onChange: this.pullQuoteMainColorSetter,
          label: __('Main Color')
        }, {
          value: textColor.color,
          onChange: this.pullQuoteTextColorSetter,
          label: __('Text Color')
        }]
      }, isSolidColorStyle && createElement(ContrastChecker, _extends({
        textColor: textColor.color,
        backgroundColor: mainColor.color
      }, {
        isLargeText: false
      })))));
    }
  }]);

  return PullQuoteEdit;
}(Component);

export default withColors({
  mainColor: 'background-color',
  textColor: 'color'
})(PullQuoteEdit);
//# sourceMappingURL=edit.js.map