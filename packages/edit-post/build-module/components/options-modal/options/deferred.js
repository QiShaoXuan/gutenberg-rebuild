import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import BaseOption from './base';

var DeferredOption =
/*#__PURE__*/
function (_Component) {
  _inherits(DeferredOption, _Component);

  function DeferredOption(_ref) {
    var _this;

    var isChecked = _ref.isChecked;

    _classCallCheck(this, DeferredOption);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DeferredOption).apply(this, arguments));
    _this.state = {
      isChecked: isChecked
    };
    return _this;
  }

  _createClass(DeferredOption, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.isChecked !== this.props.isChecked) {
        this.props.onChange(this.state.isChecked);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return createElement(BaseOption, {
        label: this.props.label,
        isChecked: this.state.isChecked,
        onChange: function onChange(isChecked) {
          return _this2.setState({
            isChecked: isChecked
          });
        }
      });
    }
  }]);

  return DeferredOption;
}(Component);

export default DeferredOption;
//# sourceMappingURL=deferred.js.map