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
import React from 'react';
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BottomSheet } from '@wordpress/editor';

var Picker =
/*#__PURE__*/
function (_Component) {
  _inherits(Picker, _Component);

  function Picker() {
    var _this;

    _classCallCheck(this, Picker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Picker).apply(this, arguments));
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onCellPress = _this.onCellPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isVisible: false
    };
    return _this;
  }

  _createClass(Picker, [{
    key: "presentPicker",
    value: function presentPicker() {
      this.setState({
        isVisible: true
      });
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.setState({
        isVisible: false
      });
    }
  }, {
    key: "onCellPress",
    value: function onCellPress(value) {
      this.props.onChange(value);
      this.onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return createElement(BottomSheet, {
        isVisible: this.state.isVisible,
        onClose: this.onClose,
        style: {
          paddingBottom: 20
        },
        hideHeader: true
      }, createElement(View, null, this.props.options.map(function (option, index) {
        return createElement(BottomSheet.Cell, {
          icon: option.icon,
          key: index,
          label: option.label,
          separatorType: 'none',
          onPress: function onPress() {
            return _this2.onCellPress(option.value);
          }
        });
      }), !this.props.hideCancelButton && createElement(BottomSheet.Cell, {
        label: __('Cancel'),
        onPress: this.onClose,
        separatorType: 'none'
      })));
    }
  }]);

  return Picker;
}(Component);

export { Picker as default };
//# sourceMappingURL=index.android.js.map