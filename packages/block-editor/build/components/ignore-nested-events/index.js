"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.IgnoreNestedEvents = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

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
var IgnoreNestedEvents =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(IgnoreNestedEvents, _Component);

  function IgnoreNestedEvents() {
    var _this;

    (0, _classCallCheck2.default)(this, IgnoreNestedEvents);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(IgnoreNestedEvents).apply(this, arguments));
    _this.proxyEvent = _this.proxyEvent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // The event map is responsible for tracking an event type to a React
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


  (0, _createClass2.default)(IgnoreNestedEvents, [{
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
          props = (0, _objectWithoutProperties2.default)(_this$props, ["childHandledEvents", "forwardedRef"]);
      var eventHandlers = (0, _lodash.reduce)([].concat((0, _toConsumableArray2.default)(childHandledEvents), (0, _toConsumableArray2.default)(Object.keys(props))), function (result, key) {
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
      return (0, _element.createElement)("div", (0, _extends2.default)({
        ref: forwardedRef
      }, props, eventHandlers));
    }
  }]);
  return IgnoreNestedEvents;
}(_element.Component);

exports.IgnoreNestedEvents = IgnoreNestedEvents;

var forwardedIgnoreNestedEvents = function forwardedIgnoreNestedEvents(props, ref) {
  return (0, _element.createElement)(IgnoreNestedEvents, (0, _extends2.default)({}, props, {
    forwardedRef: ref
  }));
};

forwardedIgnoreNestedEvents.displayName = 'IgnoreNestedEvents';

var _default = (0, _element.forwardRef)(forwardedIgnoreNestedEvents);

exports.default = _default;
//# sourceMappingURL=index.js.map