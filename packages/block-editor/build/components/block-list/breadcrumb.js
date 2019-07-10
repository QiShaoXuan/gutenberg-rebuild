"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockBreadcrumb = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blockTitle = _interopRequireDefault(require("../block-title"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Block breadcrumb component, displaying the label of the block. If the block
 * descends from a root block, a button is displayed enabling the user to select
 * the root block.
 *
 * @param {string}   props.clientId        Client ID of block.
 * @param {string}   props.rootClientId    Client ID of block's root.
 * @param {Function} props.selectRootBlock Callback to select root block.
 */
var BlockBreadcrumb =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockBreadcrumb, _Component);

  function BlockBreadcrumb() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockBreadcrumb);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockBreadcrumb).apply(this, arguments));
    _this.state = {
      isFocused: false
    };
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(BlockBreadcrumb, [{
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
      return (0, _element.createElement)("div", {
        className: 'editor-block-list__breadcrumb block-editor-block-list__breadcrumb'
      }, (0, _element.createElement)(_components.Toolbar, null, rootClientId && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockTitle.default, {
        clientId: rootClientId
      }), (0, _element.createElement)("span", {
        className: "editor-block-list__descendant-arrow block-editor-block-list__descendant-arrow"
      })), (0, _element.createElement)(_blockTitle.default, {
        clientId: clientId
      })));
    }
  }]);
  return BlockBreadcrumb;
}(_element.Component);

exports.BlockBreadcrumb = BlockBreadcrumb;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, ownProps) {
  var _select = select('core/block-editor'),
      getBlockRootClientId = _select.getBlockRootClientId;

  var clientId = ownProps.clientId;
  return {
    rootClientId: getBlockRootClientId(clientId)
  };
})])(BlockBreadcrumb);

exports.default = _default;
//# sourceMappingURL=breadcrumb.js.map