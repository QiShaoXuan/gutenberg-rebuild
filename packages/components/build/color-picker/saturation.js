"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Saturation = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _compose = require("@wordpress/compose");

var _utils = require("./utils");

var _keyboardShortcuts = _interopRequireDefault(require("../keyboard-shortcuts"));

/**
 * Parts of this source were derived and modified from react-color,
 * released under the MIT license.
 *
 * https://github.com/casesandberg/react-color/
 *
 * Copyright (c) 2015 Case Sandberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var Saturation =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Saturation, _Component);

  function Saturation(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Saturation);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Saturation).call(this, props));
    _this.throttle = (0, _lodash.throttle)(function (fn, data, e) {
      fn(data, e);
    }, 50);
    _this.container = (0, _element.createRef)();
    _this.saturate = _this.saturate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.brighten = _this.brighten.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseDown = _this.handleMouseDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseUp = _this.handleMouseUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(Saturation, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.throttle.cancel();
      this.unbindEventListeners();
    }
  }, {
    key: "saturate",
    value: function saturate() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      var _this$props = this.props,
          hsv = _this$props.hsv,
          _this$props$onChange = _this$props.onChange,
          onChange = _this$props$onChange === void 0 ? _lodash.noop : _this$props$onChange;
      var intSaturation = (0, _lodash.clamp)(hsv.s + Math.round(amount * 100), 0, 100);
      var change = {
        h: hsv.h,
        s: intSaturation,
        v: hsv.v,
        a: hsv.a,
        source: 'rgb'
      };
      onChange(change);
    }
  }, {
    key: "brighten",
    value: function brighten() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.01;
      var _this$props2 = this.props,
          hsv = _this$props2.hsv,
          _this$props2$onChange = _this$props2.onChange,
          onChange = _this$props2$onChange === void 0 ? _lodash.noop : _this$props2$onChange;
      var intValue = (0, _lodash.clamp)(hsv.v + Math.round(amount * 100), 0, 100);
      var change = {
        h: hsv.h,
        s: hsv.s,
        v: intValue,
        a: hsv.a,
        source: 'rgb'
      };
      onChange(change);
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var _this$props$onChange2 = this.props.onChange,
          onChange = _this$props$onChange2 === void 0 ? _lodash.noop : _this$props$onChange2;
      var change = (0, _utils.calculateSaturationChange)(e, this.props, this.container.current);
      this.throttle(onChange, change, e);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      this.handleChange(e);
      window.addEventListener('mousemove', this.handleChange);
      window.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp() {
      this.unbindEventListeners();
    }
  }, {
    key: "preventKeyEvents",
    value: function preventKeyEvents(event) {
      if (event.keyCode === _keycodes.TAB) {
        return;
      }

      event.preventDefault();
    }
  }, {
    key: "unbindEventListeners",
    value: function unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          hsv = _this$props3.hsv,
          hsl = _this$props3.hsl,
          instanceId = _this$props3.instanceId;
      var pointerLocation = {
        top: "".concat(-hsv.v + 100, "%"),
        left: "".concat(hsv.s, "%")
      };
      var shortcuts = {
        up: function up() {
          return _this2.brighten();
        },
        'shift+up': function shiftUp() {
          return _this2.brighten(0.1);
        },
        pageup: function pageup() {
          return _this2.brighten(1);
        },
        down: function down() {
          return _this2.brighten(-0.01);
        },
        'shift+down': function shiftDown() {
          return _this2.brighten(-0.1);
        },
        pagedown: function pagedown() {
          return _this2.brighten(-1);
        },
        right: function right() {
          return _this2.saturate();
        },
        'shift+right': function shiftRight() {
          return _this2.saturate(0.1);
        },
        end: function end() {
          return _this2.saturate(1);
        },
        left: function left() {
          return _this2.saturate(-0.01);
        },
        'shift+left': function shiftLeft() {
          return _this2.saturate(-0.1);
        },
        home: function home() {
          return _this2.saturate(-1);
        }
      };
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions */

      return (0, _element.createElement)(_keyboardShortcuts.default, {
        shortcuts: shortcuts
      }, (0, _element.createElement)("div", {
        style: {
          background: "hsl(".concat(hsl.h, ",100%, 50%)")
        },
        className: "components-color-picker__saturation-color",
        ref: this.container,
        onMouseDown: this.handleMouseDown,
        onTouchMove: this.handleChange,
        onTouchStart: this.handleChange,
        role: "application"
      }, (0, _element.createElement)("div", {
        className: "components-color-picker__saturation-white"
      }), (0, _element.createElement)("div", {
        className: "components-color-picker__saturation-black"
      }), (0, _element.createElement)("button", {
        "aria-label": (0, _i18n.__)('Choose a shade'),
        "aria-describedby": "color-picker-saturation-".concat(instanceId),
        className: "components-color-picker__saturation-pointer",
        style: pointerLocation,
        onKeyDown: this.preventKeyEvents
      }), (0, _element.createElement)("div", {
        className: "screen-reader-text",
        id: "color-picker-saturation-".concat(instanceId)
      }, (0, _i18n.__)('Use your arrow keys to change the base color. Move up to lighten the color, down to darken, left to decrease saturation, and right to increase saturation.'))));
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-element-interactions */
    }
  }]);
  return Saturation;
}(_element.Component);

exports.Saturation = Saturation;

var _default = (0, _compose.withInstanceId)(Saturation);

exports.default = _default;
//# sourceMappingURL=saturation.js.map