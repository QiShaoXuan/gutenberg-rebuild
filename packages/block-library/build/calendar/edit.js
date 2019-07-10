"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _moment = _interopRequireDefault(require("moment"));

var _memize = _interopRequireDefault(require("memize"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var CalendarEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CalendarEdit, _Component);

  function CalendarEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, CalendarEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CalendarEdit).apply(this, arguments));
    _this.getYearMonth = (0, _memize.default)(_this.getYearMonth.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), {
      maxSize: 1
    });
    _this.getServerSideAttributes = (0, _memize.default)(_this.getServerSideAttributes.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), {
      maxSize: 1
    });
    return _this;
  }

  (0, _createClass2.default)(CalendarEdit, [{
    key: "getYearMonth",
    value: function getYearMonth(date) {
      if (!date) {
        return {};
      }

      var momentDate = (0, _moment.default)(date);
      return {
        year: momentDate.year(),
        month: momentDate.month() + 1
      };
    }
  }, {
    key: "getServerSideAttributes",
    value: function getServerSideAttributes(attributes, date) {
      return (0, _objectSpread2.default)({}, attributes, this.getYearMonth(date));
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _element.createElement)(_components.Disabled, null, (0, _element.createElement)(_components.ServerSideRender, {
        block: "core/calendar",
        attributes: this.getServerSideAttributes(this.props.attributes, this.props.date)
      }));
    }
  }]);
  return CalendarEdit;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var postType = getEditedPostAttribute('type'); // Dates are used to overwrite year and month used on the calendar.
  // This overwrite should only happen for 'post' post types.
  // For other post types the calendar always displays the current month.

  return {
    date: postType === 'post' ? getEditedPostAttribute('date') : undefined
  };
})(CalendarEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map