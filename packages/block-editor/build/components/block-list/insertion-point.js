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

var _classnames = _interopRequireDefault(require("classnames"));

var _data = require("@wordpress/data");

var _inserter = _interopRequireDefault(require("../inserter"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockInsertionPoint =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockInsertionPoint, _Component);

  function BlockInsertionPoint() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockInsertionPoint);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockInsertionPoint).apply(this, arguments));
    _this.state = {
      isInserterFocused: false
    };
    _this.onBlurInserter = _this.onBlurInserter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFocusInserter = _this.onFocusInserter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(BlockInsertionPoint, [{
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
      return (0, _element.createElement)("div", {
        className: "editor-block-list__insertion-point block-editor-block-list__insertion-point"
      }, showInsertionPoint && (0, _element.createElement)("div", {
        className: "editor-block-list__insertion-point-indicator block-editor-block-list__insertion-point-indicator"
      }), (0, _element.createElement)("div", {
        onFocus: this.onFocusInserter,
        onBlur: this.onBlurInserter // While ideally it would be enough to capture the
        // bubbling focus event from the Inserter, due to the
        // characteristics of click focusing of `button`s in
        // Firefox and Safari, it is not reliable.
        //
        // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
        ,
        tabIndex: -1,
        className: (0, _classnames.default)('editor-block-list__insertion-point-inserter block-editor-block-list__insertion-point-inserter', {
          'is-visible': isInserterFocused
        })
      }, (0, _element.createElement)(_inserter.default, {
        rootClientId: rootClientId,
        clientId: clientId
      })));
    }
  }]);
  return BlockInsertionPoint;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select, _ref) {
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

exports.default = _default;
//# sourceMappingURL=insertion-point.js.map