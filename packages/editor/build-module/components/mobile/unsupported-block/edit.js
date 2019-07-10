import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, Text } from 'react-native';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import styles from './style.scss';

var UnsupportedBlockEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(UnsupportedBlockEdit, _Component);

  function UnsupportedBlockEdit() {
    _classCallCheck(this, UnsupportedBlockEdit);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnsupportedBlockEdit).apply(this, arguments));
  }

  _createClass(UnsupportedBlockEdit, [{
    key: "render",
    value: function render() {
      return createElement(View, {
        style: styles.unsupportedBlock
      }, createElement(Text, {
        style: styles.unsupportedBlockMessage
      }, "Unsupported"));
    }
  }]);

  return UnsupportedBlockEdit;
}(Component);

export { UnsupportedBlockEdit as default };
//# sourceMappingURL=edit.js.map