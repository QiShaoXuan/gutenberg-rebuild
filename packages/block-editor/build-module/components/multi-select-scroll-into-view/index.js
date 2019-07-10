import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/**
 * External dependencies
 */
import _scrollIntoView from 'dom-scroll-into-view';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { getScrollContainer } from '@wordpress/dom';
/**
 * Internal dependencies
 */

import { getBlockDOMNode } from '../../utils/dom';

var MultiSelectScrollIntoView =
/*#__PURE__*/
function (_Component) {
  _inherits(MultiSelectScrollIntoView, _Component);

  function MultiSelectScrollIntoView() {
    _classCallCheck(this, MultiSelectScrollIntoView);

    return _possibleConstructorReturn(this, _getPrototypeOf(MultiSelectScrollIntoView).apply(this, arguments));
  }

  _createClass(MultiSelectScrollIntoView, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // Relies on expectation that `componentDidUpdate` will only be called
      // if value of `extentClientId` changes.
      this.scrollIntoView();
    }
    /**
     * Ensures that if a multi-selection exists, the extent of the selection is
     * visible within the nearest scrollable container.
     *
     * @return {void}
     */

  }, {
    key: "scrollIntoView",
    value: function scrollIntoView() {
      var extentClientId = this.props.extentClientId;

      if (!extentClientId) {
        return;
      }

      var extentNode = getBlockDOMNode(extentClientId);

      if (!extentNode) {
        return;
      }

      var scrollContainer = getScrollContainer(extentNode); // If there's no scroll container, it follows that there's no scrollbar
      // and thus there's no need to try to scroll into view.

      if (!scrollContainer) {
        return;
      }

      _scrollIntoView(extentNode, scrollContainer, {
        onlyScrollIfNeeded: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return MultiSelectScrollIntoView;
}(Component);

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getLastMultiSelectedBlockClientId = _select.getLastMultiSelectedBlockClientId;

  return {
    extentClientId: getLastMultiSelectedBlockClientId()
  };
})(MultiSelectScrollIntoView);
//# sourceMappingURL=index.js.map