import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import moment from 'moment';
import memoize from 'memize';
/**
 * WordPress dependencies
 */

import { Disabled, ServerSideRender } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

var CalendarEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(CalendarEdit, _Component);

  function CalendarEdit() {
    var _this;

    _classCallCheck(this, CalendarEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CalendarEdit).apply(this, arguments));
    _this.getYearMonth = memoize(_this.getYearMonth.bind(_assertThisInitialized(_assertThisInitialized(_this))), {
      maxSize: 1
    });
    _this.getServerSideAttributes = memoize(_this.getServerSideAttributes.bind(_assertThisInitialized(_assertThisInitialized(_this))), {
      maxSize: 1
    });
    return _this;
  }

  _createClass(CalendarEdit, [{
    key: "getYearMonth",
    value: function getYearMonth(date) {
      if (!date) {
        return {};
      }

      var momentDate = moment(date);
      return {
        year: momentDate.year(),
        month: momentDate.month() + 1
      };
    }
  }, {
    key: "getServerSideAttributes",
    value: function getServerSideAttributes(attributes, date) {
      return _objectSpread({}, attributes, this.getYearMonth(date));
    }
  }, {
    key: "render",
    value: function render() {
      return createElement(Disabled, null, createElement(ServerSideRender, {
        block: "core/calendar",
        attributes: this.getServerSideAttributes(this.props.attributes, this.props.date)
      }));
    }
  }]);

  return CalendarEdit;
}(Component);

export default withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var postType = getEditedPostAttribute('type'); // Dates are used to overwrite year and month used on the calendar.
  // This overwrite should only happen for 'post' post types.
  // For other post types the calendar always displays the current month.

  return {
    date: postType === 'post' ? getEditedPostAttribute('date') : undefined
  };
})(CalendarEdit);
//# sourceMappingURL=edit.js.map