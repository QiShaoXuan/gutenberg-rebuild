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
import { Component, createRef } from '@wordpress/element';
import { withGlobalEvents } from '@wordpress/compose';
/**
 * Browser dependencies
 */

var _window = window,
    FocusEvent = _window.FocusEvent;

var WpEmbedPreview =
/*#__PURE__*/
function (_Component) {
  _inherits(WpEmbedPreview, _Component);

  function WpEmbedPreview() {
    var _this;

    _classCallCheck(this, WpEmbedPreview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WpEmbedPreview).apply(this, arguments));
    _this.checkFocus = _this.checkFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.node = createRef();
    return _this;
  }
  /**
   * Checks whether the wp embed iframe is the activeElement,
   * if it is dispatch a focus event.
   */


  _createClass(WpEmbedPreview, [{
    key: "checkFocus",
    value: function checkFocus() {
      var _document = document,
          activeElement = _document.activeElement;

      if (activeElement.tagName !== 'IFRAME' || activeElement.parentNode !== this.node.current) {
        return;
      }

      var focusEvent = new FocusEvent('focus', {
        bubbles: true
      });
      activeElement.dispatchEvent(focusEvent);
    }
  }, {
    key: "render",
    value: function render() {
      var html = this.props.html;
      return createElement("div", {
        ref: this.node,
        className: "wp-block-embed__wrapper",
        dangerouslySetInnerHTML: {
          __html: html
        }
      });
    }
  }]);

  return WpEmbedPreview;
}(Component);

export default withGlobalEvents({
  blur: 'checkFocus'
})(WpEmbedPreview);
//# sourceMappingURL=wp-embed-preview.js.map