import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BlockControls, PlainText } from '@wordpress/block-editor';
import { transformStyles } from '@wordpress/editor';
import { Disabled, SandBox } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

var HTMLEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(HTMLEdit, _Component);

  function HTMLEdit() {
    var _this;

    _classCallCheck(this, HTMLEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLEdit).apply(this, arguments));
    _this.state = {
      isPreview: false,
      styles: []
    };
    _this.switchToHTML = _this.switchToHTML.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.switchToPreview = _this.switchToPreview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(HTMLEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var styles = this.props.styles; // Default styles used to unset some of the styles
      // that might be inherited from the editor style.

      var defaultStyles = "\n\t\t\thtml,body,:root {\n\t\t\t\tmargin: 0 !important;\n\t\t\t\tpadding: 0 !important;\n\t\t\t\toverflow: visible !important;\n\t\t\t\tmin-height: auto !important;\n\t\t\t}\n\t\t";
      this.setState({
        styles: [defaultStyles].concat(_toConsumableArray(transformStyles(styles)))
      });
    }
  }, {
    key: "switchToPreview",
    value: function switchToPreview() {
      this.setState({
        isPreview: true
      });
    }
  }, {
    key: "switchToHTML",
    value: function switchToHTML() {
      this.setState({
        isPreview: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      var _this$state = this.state,
          isPreview = _this$state.isPreview,
          styles = _this$state.styles;
      return createElement("div", {
        className: "wp-block-html"
      }, createElement(BlockControls, null, createElement("div", {
        className: "components-toolbar"
      }, createElement("button", {
        className: "components-tab-button ".concat(!isPreview ? 'is-active' : ''),
        onClick: this.switchToHTML
      }, createElement("span", null, "HTML")), createElement("button", {
        className: "components-tab-button ".concat(isPreview ? 'is-active' : ''),
        onClick: this.switchToPreview
      }, createElement("span", null, __('Preview'))))), createElement(Disabled.Consumer, null, function (isDisabled) {
        return isPreview || isDisabled ? createElement(SandBox, {
          html: attributes.content,
          styles: styles
        }) : createElement(PlainText, {
          value: attributes.content,
          onChange: function onChange(content) {
            return setAttributes({
              content: content
            });
          },
          placeholder: __('Write HTML…'),
          "aria-label": __('HTML')
        });
      }));
    }
  }]);

  return HTMLEdit;
}(Component);

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    styles: getSettings().styles
  };
})(HTMLEdit);
//# sourceMappingURL=edit.js.map