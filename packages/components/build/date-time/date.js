"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _moment = _interopRequireDefault(require("moment"));

var _reactDates = require("react-dates");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Module Constants
 */
var TIMEZONELESS_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

var isRTL = function isRTL() {
  return document.documentElement.dir === 'rtl';
};

var DatePicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DatePicker, _Component);

  function DatePicker() {
    var _this;

    (0, _classCallCheck2.default)(this, DatePicker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DatePicker).apply(this, arguments));
    _this.onChangeMoment = _this.onChangeMoment.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(DatePicker, [{
    key: "onChangeMoment",
    value: function onChangeMoment(newDate) {
      var _this$props = this.props,
          currentDate = _this$props.currentDate,
          onChange = _this$props.onChange; // If currentDate is null, use now as momentTime to designate hours, minutes, seconds.

      var momentDate = currentDate ? (0, _moment.default)(currentDate) : (0, _moment.default)();
      var momentTime = {
        hours: momentDate.hours(),
        minutes: momentDate.minutes(),
        seconds: momentDate.seconds()
      };
      onChange(newDate.set(momentTime).format(TIMEZONELESS_FORMAT));
    }
    /**
     * Create a Moment object from a date string. With no currentDate supplied, default to a Moment
     * object representing now. If a null value is passed, return a null value.
     *
     * @param {?string} currentDate Date representing the currently selected date or null to signify no selection.
     * @return {?Moment} Moment object for selected date or null.
     */

  }, {
    key: "getMomentDate",
    value: function getMomentDate(currentDate) {
      if (null === currentDate) {
        return null;
      }

      return currentDate ? (0, _moment.default)(currentDate) : (0, _moment.default)();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          currentDate = _this$props2.currentDate,
          isInvalidDate = _this$props2.isInvalidDate;
      var momentDate = this.getMomentDate(currentDate);
      return (0, _element.createElement)("div", {
        className: "components-datetime__date"
      }, (0, _element.createElement)(_reactDates.DayPickerSingleDateController, {
        date: momentDate,
        daySize: 30,
        focused: true,
        hideKeyboardShortcutsPanel: true // This is a hack to force the calendar to update on month or year change
        // https://github.com/airbnb/react-dates/issues/240#issuecomment-361776665
        ,
        key: "datepicker-controller-".concat(momentDate ? momentDate.format('MM-YYYY') : 'null'),
        noBorder: true,
        numberOfMonths: 1,
        onDateChange: this.onChangeMoment,
        transitionDuration: 0,
        weekDayFormat: "ddd",
        isRTL: isRTL(),
        isOutsideRange: function isOutsideRange(date) {
          return isInvalidDate && isInvalidDate(date.toDate());
        }
      }));
    }
  }]);
  return DatePicker;
}(_element.Component);

var _default = DatePicker;
exports.default = _default;
//# sourceMappingURL=date.js.map