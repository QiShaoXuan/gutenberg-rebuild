import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
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
import { reduce } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, forwardRef } from '@wordpress/element';
/**
 * Component which renders a div with passed props applied except the optional
 * `childHandledEvents` prop. Event prop handlers are replaced with a proxying
 * event handler to capture and prevent events from being handled by ancestor
 * `IgnoreNestedEvents` elements by testing the presence of a private property
 * assigned on the event object.
 *
 * Optionally accepts an `childHandledEvents` prop array, which can be used in
 * instances where an inner `IgnoreNestedEvents` element exists and the outer
 * element should stop propagation but not invoke a callback handler, since it
 * would be assumed these are invoked by the child element.
 *
 * @type {Component}
 */

export var IgnoreNestedEvents =
/*#__PURE__*/
function (_Component) {
  _inherits(IgnoreNestedEvents, _Component);

  function IgnoreNestedEvents() {
    var _this;

    _classCallCheck(this, IgnoreNestedEvents);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IgnoreNestedEvents).apply(this, arguments));
    _this.proxyEvent = _this.proxyEvent.bind(_assertThisInitialized(_assertThisInitialized(_this))); // The event map is responsible for tracking an event type to a React
    // component prop name, since it is easy to determine event type from
    // a React prop name, but not the other way around.

    _this.eventMap = {};
    return _this;
  }
  /**
   * General event handler which only calls to its original props callback if
   * it has not already been handled by a descendant IgnoreNestedEvents.
   *
   * @param {Event} event Event object.
   *
   * @return {void}
   */


  _createClass(IgnoreNestedEvents, [{
    key: "proxyEvent",
    value: function proxyEvent(event) {
      var isHandled = !!event.nativeEvent._blockHandled; // Assign into the native event, since React will reuse their synthetic
      // event objects and this property assignment could otherwise leak.
      //
      // See: https://reactjs.org/docs/events.html#event-pooling

      event.nativeEvent._blockHandled = true; // Invoke original prop handler

      var propKey = this.eventMap[event.type]; // If already handled (i.e. assume nested block), only invoke a
      // corresponding "Handled"-suffixed prop callback.

      if (isHandled) {
        propKey += 'Handled';
      }

      if (this.props[propKey]) {
        this.props[propKey](event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$childHand = _this$props.childHandledEvents,
          childHandledEvents = _this$props$childHand === void 0 ? [] : _this$props$childHand,
          forwardedRef = _this$props.forwardedRef,
          props = _objectWithoutProperties(_this$props, ["childHandledEvents", "forwardedRef"]);

      var eventHandlers = reduce([].concat(_toConsumableArray(childHandledEvents), _toConsumableArray(Object.keys(props))), function (result, key) {
        // Try to match prop key as event handler
        var match = key.match(/^on([A-Z][a-zA-Z]+?)(Handled)?$/);

        if (match) {
          var isHandledProp = !!match[2];

          if (isHandledProp) {
            // Avoid assigning through the invalid prop key. This
            // assumes mutation of shallow clone by above spread.
            delete props[key];
          } // Re-map the prop to the local proxy handler to check whether
          // the event has already been handled.


          var proxiedPropName = 'on' + match[1];
          result[proxiedPropName] = _this2.proxyEvent; // Assign event -> propName into an instance variable, so as to
          // avoid re-renders which could be incurred either by setState
          // or in mapping values to a newly created function.

          _this2.eventMap[match[1].toLowerCase()] = proxiedPropName;
        }

        return result;
      }, {});
      return createElement("div", _extends({
        ref: forwardedRef
      }, props, eventHandlers));
    }
  }]);

  return IgnoreNestedEvents;
}(Component);

var forwardedIgnoreNestedEvents = function forwardedIgnoreNestedEvents(props, ref) {
  return createElement(IgnoreNestedEvents, _extends({}, props, {
    forwardedRef: ref
  }));
};

forwardedIgnoreNestedEvents.displayName = 'IgnoreNestedEvents';
export default forwardRef(forwardedIgnoreNestedEvents);
//# sourceMappingURL=index.js.map