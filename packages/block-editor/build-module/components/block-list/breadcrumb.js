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
import { Component, Fragment } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockTitle from '../block-title';
/**
 * Block breadcrumb component, displaying the label of the block. If the block
 * descends from a root block, a button is displayed enabling the user to select
 * the root block.
 *
 * @param {string}   props.clientId        Client ID of block.
 * @param {string}   props.rootClientId    Client ID of block's root.
 * @param {Function} props.selectRootBlock Callback to select root block.
 */

export var BlockBreadcrumb =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockBreadcrumb, _Component);

  function BlockBreadcrumb() {
    var _this;

    _classCallCheck(this, BlockBreadcrumb);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockBreadcrumb).apply(this, arguments));
    _this.state = {
      isFocused: false
    };
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockBreadcrumb, [{
    key: "onFocus",
    value: function onFocus(event) {
      this.setState({
        isFocused: true
      }); // This is used for improved interoperability
      // with the block's `onFocus` handler which selects the block, thus conflicting
      // with the intention to select the root block.

      event.stopPropagation();
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        isFocused: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          clientId = _this$props.clientId,
          rootClientId = _this$props.rootClientId;
      return createElement("div", {
        className: 'editor-block-list__breadcrumb block-editor-block-list__breadcrumb'
      }, createElement(Toolbar, null, rootClientId && createElement(Fragment, null, createElement(BlockTitle, {
        clientId: rootClientId
      }), createElement("span", {
        className: "editor-block-list__descendant-arrow block-editor-block-list__descendant-arrow"
      })), createElement(BlockTitle, {
        clientId: clientId
      })));
    }
  }]);

  return BlockBreadcrumb;
}(Component);
export default compose([withSelect(function (select, ownProps) {
  var _select = select('core/block-editor'),
      getBlockRootClientId = _select.getBlockRootClientId;

  var clientId = ownProps.clientId;
  return {
    rootClientId: getBlockRootClientId(clientId)
  };
})])(BlockBreadcrumb);
//# sourceMappingURL=breadcrumb.js.map