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

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _menu = _interopRequireDefault(require("./menu"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var defaultRenderToggle = function defaultRenderToggle(_ref) {
  var onToggle = _ref.onToggle,
      disabled = _ref.disabled,
      isOpen = _ref.isOpen;
  return (0, _element.createElement)(_components.IconButton, {
    icon: "insert",
    label: (0, _i18n.__)('Add block'),
    labelPosition: "bottom",
    onClick: onToggle,
    className: "editor-inserter__toggle block-editor-inserter__toggle",
    "aria-haspopup": "true",
    "aria-expanded": isOpen,
    disabled: disabled
  });
};

var Inserter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Inserter, _Component);

  function Inserter() {
    var _this;

    (0, _classCallCheck2.default)(this, Inserter);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Inserter).apply(this, arguments));
    _this.onToggle = _this.onToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderToggle = _this.renderToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderContent = _this.renderContent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(Inserter, [{
    key: "onToggle",
    value: function onToggle(isOpen) {
      var onToggle = this.props.onToggle; // Surface toggle callback to parent component

      if (onToggle) {
        onToggle(isOpen);
      }
    }
    /**
     * Render callback to display Dropdown toggle element.
     *
     * @param {Function} options.onToggle Callback to invoke when toggle is
     *                                    pressed.
     * @param {boolean}  options.isOpen   Whether dropdown is currently open.
     *
     * @return {WPElement} Dropdown toggle element.
     */

  }, {
    key: "renderToggle",
    value: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle,
          isOpen = _ref2.isOpen;
      var _this$props = this.props,
          disabled = _this$props.disabled,
          _this$props$renderTog = _this$props.renderToggle,
          renderToggle = _this$props$renderTog === void 0 ? defaultRenderToggle : _this$props$renderTog;
      return renderToggle({
        onToggle: onToggle,
        isOpen: isOpen,
        disabled: disabled
      });
    }
    /**
     * Render callback to display Dropdown content element.
     *
     * @param {Function} options.onClose Callback to invoke when dropdown is
     *                                   closed.
     *
     * @return {WPElement} Dropdown content element.
     */

  }, {
    key: "renderContent",
    value: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      var _this$props2 = this.props,
          rootClientId = _this$props2.rootClientId,
          clientId = _this$props2.clientId,
          isAppender = _this$props2.isAppender;
      return (0, _element.createElement)(_menu.default, {
        onSelect: onClose,
        rootClientId: rootClientId,
        clientId: clientId,
        isAppender: isAppender
      });
    }
  }, {
    key: "render",
    value: function render() {
      var position = this.props.position;
      return (0, _element.createElement)(_components.Dropdown, {
        className: "editor-inserter block-editor-inserter",
        contentClassName: "editor-inserter__popover block-editor-inserter__popover",
        position: position,
        onToggle: this.onToggle,
        expandOnMobile: true,
        headerTitle: (0, _i18n.__)('Add a block'),
        renderToggle: this.renderToggle,
        renderContent: this.renderContent
      });
    }
  }]);
  return Inserter;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref4) {
  var rootClientId = _ref4.rootClientId;

  var _select = select('core/block-editor'),
      hasInserterItems = _select.hasInserterItems;

  return {
    hasItems: hasInserterItems(rootClientId)
  };
}), (0, _compose.ifCondition)(function (_ref5) {
  var hasItems = _ref5.hasItems;
  return hasItems;
})])(Inserter);

exports.default = _default;
//# sourceMappingURL=index.js.map