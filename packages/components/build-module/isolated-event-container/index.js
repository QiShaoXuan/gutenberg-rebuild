import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
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
import { Component } from '@wordpress/element';

var IsolatedEventContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(IsolatedEventContainer, _Component);

  function IsolatedEventContainer(props) {
    var _this;

    _classCallCheck(this, IsolatedEventContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IsolatedEventContainer).call(this, props));
    _this.stopEventPropagationOutsideContainer = _this.stopEventPropagationOutsideContainer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(IsolatedEventContainer, [{
    key: "stopEventPropagationOutsideContainer",
    value: function stopEventPropagationOutsideContainer(event) {
      event.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = _objectWithoutProperties(_this$props, ["children"]); // Disable reason: this stops certain events from propagating outside of the component.
      //   - onMouseDown is disabled as this can cause interactions with other DOM elements

      /* eslint-disable jsx-a11y/no-static-element-interactions */


      return createElement("div", _extends({}, props, {
        onMouseDown: this.stopEventPropagationOutsideContainer
      }), children);
    }
  }]);

  return IsolatedEventContainer;
}(Component);

export default IsolatedEventContainer;
//# sourceMappingURL=index.js.map