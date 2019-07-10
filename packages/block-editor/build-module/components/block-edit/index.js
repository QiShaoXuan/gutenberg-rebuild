import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Edit from './edit';
import { BlockEditContextProvider } from './context';

var BlockEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockEdit, _Component);

  function BlockEdit(props) {
    var _this;

    _classCallCheck(this, BlockEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockEdit).call(this, props));
    _this.setFocusedElement = _this.setFocusedElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      focusedElement: null,
      setFocusedElement: _this.setFocusedElement
    };
    return _this;
  }

  _createClass(BlockEdit, [{
    key: "setFocusedElement",
    value: function setFocusedElement(focusedElement) {
      this.setState(function (prevState) {
        if (prevState.focusedElement === focusedElement) {
          return null;
        }

        return {
          focusedElement: focusedElement
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return createElement(BlockEditContextProvider, {
        value: this.state
      }, createElement(Edit, this.props));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      var clientId = props.clientId,
          name = props.name,
          isSelected = props.isSelected;
      return {
        name: name,
        isSelected: isSelected,
        clientId: clientId
      };
    }
  }]);

  return BlockEdit;
}(Component);

export default BlockEdit;
//# sourceMappingURL=index.js.map