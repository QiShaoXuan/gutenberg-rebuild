"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnstableRichTextInputEvent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _element = require("@wordpress/element");

/**
 * WordPress dependencies
 */
var UnstableRichTextInputEvent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(UnstableRichTextInputEvent, _Component);

  function UnstableRichTextInputEvent() {
    var _this;

    (0, _classCallCheck2.default)(this, UnstableRichTextInputEvent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UnstableRichTextInputEvent).apply(this, arguments));
    _this.onInput = _this.onInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(UnstableRichTextInputEvent, [{
    key: "onInput",
    value: function onInput(event) {
      if (event.inputType === this.props.inputType) {
        this.props.onInput();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('input', this.onInput, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('input', this.onInput, true);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return UnstableRichTextInputEvent;
}(_element.Component);

exports.UnstableRichTextInputEvent = UnstableRichTextInputEvent;
//# sourceMappingURL=input-event.js.map