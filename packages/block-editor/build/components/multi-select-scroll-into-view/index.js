"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _dom = require("@wordpress/dom");

var _dom2 = require("../../utils/dom");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MultiSelectScrollIntoView =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MultiSelectScrollIntoView, _Component);

  function MultiSelectScrollIntoView() {
    (0, _classCallCheck2.default)(this, MultiSelectScrollIntoView);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MultiSelectScrollIntoView).apply(this, arguments));
  }

  (0, _createClass2.default)(MultiSelectScrollIntoView, [{
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

      var extentNode = (0, _dom2.getBlockDOMNode)(extentClientId);

      if (!extentNode) {
        return;
      }

      var scrollContainer = (0, _dom.getScrollContainer)(extentNode); // If there's no scroll container, it follows that there's no scrollbar
      // and thus there's no need to try to scroll into view.

      if (!scrollContainer) {
        return;
      }

      (0, _domScrollIntoView.default)(extentNode, scrollContainer, {
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
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getLastMultiSelectedBlockClientId = _select.getLastMultiSelectedBlockClientId;

  return {
    extentClientId: getLastMultiSelectedBlockClientId()
  };
})(MultiSelectScrollIntoView);

exports.default = _default;
//# sourceMappingURL=index.js.map