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

var _blockEditor = require("@wordpress/block-editor");

var _keycodes = require("@wordpress/keycodes");

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */
var MoreEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MoreEdit, _Component);

  function MoreEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, MoreEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MoreEdit).apply(this, arguments));
    _this.onChangeInput = _this.onChangeInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      defaultText: (0, _i18n.__)('Read more')
    };
    return _this;
  }

  (0, _createClass2.default)(MoreEdit, [{
    key: "onChangeInput",
    value: function onChangeInput(event) {
      // Set defaultText to an empty string, allowing the user to clear/replace the input field's text
      this.setState({
        defaultText: ''
      });
      var value = event.target.value.length === 0 ? undefined : event.target.value;
      this.props.setAttributes({
        customText: value
      });
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var keyCode = event.keyCode;
      var insertBlocksAfter = this.props.insertBlocksAfter;

      if (keyCode === _keycodes.ENTER) {
        insertBlocksAfter([(0, _blocks.createBlock)((0, _blocks.getDefaultBlockName)())]);
      }
    }
  }, {
    key: "getHideExcerptHelp",
    value: function getHideExcerptHelp(checked) {
      return checked ? (0, _i18n.__)('The excerpt is hidden.') : (0, _i18n.__)('The excerpt is visible.');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$attribute = this.props.attributes,
          customText = _this$props$attribute.customText,
          noTeaser = _this$props$attribute.noTeaser;
      var setAttributes = this.props.setAttributes;

      var toggleHideExcerpt = function toggleHideExcerpt() {
        return setAttributes({
          noTeaser: !noTeaser
        });
      };

      var defaultText = this.state.defaultText;
      var value = customText !== undefined ? customText : defaultText;
      var inputLength = value.length + 1;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, null, (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Hide the excerpt on the full content page'),
        checked: !!noTeaser,
        onChange: toggleHideExcerpt,
        help: this.getHideExcerptHelp
      }))), (0, _element.createElement)("div", {
        className: "wp-block-more"
      }, (0, _element.createElement)("input", {
        type: "text",
        value: value,
        size: inputLength,
        onChange: this.onChangeInput,
        onKeyDown: this.onKeyDown
      })));
    }
  }]);
  return MoreEdit;
}(_element.Component);

exports.default = MoreEdit;
//# sourceMappingURL=edit.js.map