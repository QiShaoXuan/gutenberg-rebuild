"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reactAutosizeTextarea = _interopRequireDefault(require("react-autosize-textarea"));

var _classnames = _interopRequireDefault(require("classnames"));

/**
 * External dependencies
 */
function PlainText(_ref) {
  var _onChange = _ref.onChange,
      className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["onChange", "className"]);
  return (0, _element.createElement)(_reactAutosizeTextarea.default, (0, _extends2.default)({
    className: (0, _classnames.default)('editor-plain-text block-editor-plain-text', className),
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    }
  }, props));
}

var _default = PlainText;
exports.default = _default;
//# sourceMappingURL=index.js.map