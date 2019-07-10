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
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import Inserter from '../inserter';

var BlockInsertionPoint =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockInsertionPoint, _Component);

  function BlockInsertionPoint() {
    var _this;

    _classCallCheck(this, BlockInsertionPoint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockInsertionPoint).apply(this, arguments));
    _this.state = {
      isInserterFocused: false
    };
    _this.onBlurInserter = _this.onBlurInserter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onFocusInserter = _this.onFocusInserter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockInsertionPoint, [{
    key: "onFocusInserter",
    value: function onFocusInserter(event) {
      // Stop propagation of the focus event to avoid selecting the current
      // block while inserting a new block, as it is not relevant to sibling
      // insertion and conflicts with contextual toolbar placement.
      event.stopPropagation();
      this.setState({
        isInserterFocused: true
      });
    }
  }, {
    key: "onBlurInserter",
    value: function onBlurInserter() {
      this.setState({
        isInserterFocused: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var isInserterFocused = this.state.isInserterFocused;
      var _this$props = this.props,
          showInsertionPoint = _this$props.showInsertionPoint,
          rootClientId = _this$props.rootClientId,
          clientId = _this$props.clientId;
      return createElement("div", {
        className: "editor-block-list__insertion-point block-editor-block-list__insertion-point"
      }, showInsertionPoint && createElement("div", {
        className: "editor-block-list__insertion-point-indicator block-editor-block-list__insertion-point-indicator"
      }), createElement("div", {
        onFocus: this.onFocusInserter,
        onBlur: this.onBlurInserter // While ideally it would be enough to capture the
        // bubbling focus event from the Inserter, due to the
        // characteristics of click focusing of `button`s in
        // Firefox and Safari, it is not reliable.
        //
        // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
        ,
        tabIndex: -1,
        className: classnames('editor-block-list__insertion-point-inserter block-editor-block-list__insertion-point-inserter', {
          'is-visible': isInserterFocused
        })
      }, createElement(Inserter, {
        rootClientId: rootClientId,
        clientId: clientId
      })));
    }
  }]);

  return BlockInsertionPoint;
}(Component);

export default withSelect(function (select, _ref) {
  var clientId = _ref.clientId,
      rootClientId = _ref.rootClientId;

  var _select = select('core/block-editor'),
      getBlockIndex = _select.getBlockIndex,
      getBlockInsertionPoint = _select.getBlockInsertionPoint,
      isBlockInsertionPointVisible = _select.isBlockInsertionPointVisible;

  var blockIndex = getBlockIndex(clientId, rootClientId);
  var insertionPoint = getBlockInsertionPoint();
  var showInsertionPoint = isBlockInsertionPointVisible() && insertionPoint.index === blockIndex && insertionPoint.rootClientId === rootClientId;
  return {
    showInsertionPoint: showInsertionPoint
  };
})(BlockInsertionPoint);
//# sourceMappingURL=insertion-point.js.map