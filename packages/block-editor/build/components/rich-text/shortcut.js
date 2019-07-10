"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichTextShortcut = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _components = require("@wordpress/components");

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
var RichTextShortcut =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RichTextShortcut, _Component);

  function RichTextShortcut() {
    var _this;

    (0, _classCallCheck2.default)(this, RichTextShortcut);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RichTextShortcut).apply(this, arguments));
    _this.onUse = _this.onUse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(RichTextShortcut, [{
    key: "onUse",
    value: function onUse() {
      this.props.onUse();
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          character = _this$props.character,
          type = _this$props.type;
      return (0, _element.createElement)(_components.KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: (0, _defineProperty2.default)({}, _keycodes.rawShortcut[type](character), this.onUse)
      });
    }
  }]);
  return RichTextShortcut;
}(_element.Component);

exports.RichTextShortcut = RichTextShortcut;
//# sourceMappingURL=shortcut.js.map