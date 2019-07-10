"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _i18n = require("@wordpress/i18n");

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var UnsavedChangesWarning =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(UnsavedChangesWarning, _Component);

  function UnsavedChangesWarning() {
    var _this;

    (0, _classCallCheck2.default)(this, UnsavedChangesWarning);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UnsavedChangesWarning).apply(this, arguments));
    _this.warnIfUnsavedChanges = _this.warnIfUnsavedChanges.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(UnsavedChangesWarning, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('beforeunload', this.warnIfUnsavedChanges);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('beforeunload', this.warnIfUnsavedChanges);
    }
    /**
     * Warns the user if there are unsaved changes before leaving the editor.
     *
     * @param {Event} event `beforeunload` event.
     *
     * @return {?string} Warning prompt message, if unsaved changes exist.
     */

  }, {
    key: "warnIfUnsavedChanges",
    value: function warnIfUnsavedChanges(event) {
      var isDirty = this.props.isDirty;

      if (isDirty) {
        event.returnValue = (0, _i18n.__)('You have unsaved changes. If you proceed, they will be lost.');
        return event.returnValue;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return UnsavedChangesWarning;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  return {
    isDirty: select('core/editor').isEditedPostDirty()
  };
})(UnsavedChangesWarning);

exports.default = _default;
//# sourceMappingURL=index.js.map