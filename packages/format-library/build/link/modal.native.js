"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

var _url = require("@wordpress/url");

var _components = require("@wordpress/components");

var _richText = require("@wordpress/rich-text");

var _utils = require("./utils");

var _modal = _interopRequireDefault(require("./modal.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ModalLinkUI =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ModalLinkUI, _Component);

  function ModalLinkUI() {
    var _this;

    (0, _classCallCheck2.default)(this, ModalLinkUI);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ModalLinkUI).apply(this, arguments));
    _this.submitLink = _this.submitLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onChangeInputValue = _this.onChangeInputValue.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onChangeText = _this.onChangeText.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onChangeOpensInNewWindow = _this.onChangeOpensInNewWindow.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.removeLink = _this.removeLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onDismiss = _this.onDismiss.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      inputValue: '',
      text: '',
      opensInNewWindow: false
    };
    return _this;
  }

  (0, _createClass2.default)(ModalLinkUI, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (oldProps === this.props) {
        return;
      }

      this.setState({
        inputValue: this.props.activeAttributes.url || '',
        text: (0, _richText.getTextContent)((0, _richText.slice)(this.props.value)),
        opensInNewWindow: false
      });
    }
  }, {
    key: "onChangeInputValue",
    value: function onChangeInputValue(inputValue) {
      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "onChangeText",
    value: function onChangeText(text) {
      this.setState({
        text: text
      });
    }
  }, {
    key: "onChangeOpensInNewWindow",
    value: function onChangeOpensInNewWindow(opensInNewWindow) {
      this.setState({
        opensInNewWindow: opensInNewWindow
      });
    }
  }, {
    key: "submitLink",
    value: function submitLink() {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          onChange = _this$props.onChange,
          speak = _this$props.speak,
          value = _this$props.value;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          opensInNewWindow = _this$state.opensInNewWindow,
          text = _this$state.text;
      var url = (0, _url.prependHTTP)(inputValue);
      var linkText = text || inputValue;
      var format = (0, _utils.createLinkFormat)({
        url: url,
        opensInNewWindow: opensInNewWindow,
        text: linkText
      });
      var placeholderFormats = value.formatPlaceholder && value.formatPlaceholder.formats || [];

      if ((0, _richText.isCollapsed)(value) && !isActive) {
        // insert link
        var toInsert = (0, _richText.applyFormat)((0, _richText.create)({
          text: linkText
        }), [].concat((0, _toConsumableArray2.default)(placeholderFormats), [format]), 0, linkText.length);
        var newAttributes = (0, _richText.insert)(value, toInsert);
        onChange((0, _objectSpread2.default)({}, newAttributes, {
          needsSelectionUpdate: true
        }));
      } else if (text !== (0, _richText.getTextContent)((0, _richText.slice)(value))) {
        // edit text in selected link
        var _toInsert = (0, _richText.applyFormat)((0, _richText.create)({
          text: text
        }), [].concat((0, _toConsumableArray2.default)(placeholderFormats), [format]), 0, text.length);

        var _newAttributes = (0, _richText.insert)(value, _toInsert, value.start, value.end);

        onChange((0, _objectSpread2.default)({}, _newAttributes, {
          needsSelectionUpdate: true
        }));
      } else {
        // transform selected text into link
        var _newAttributes2 = (0, _richText.applyFormat)(value, [].concat((0, _toConsumableArray2.default)(placeholderFormats), [format]));

        onChange((0, _objectSpread2.default)({}, _newAttributes2, {
          needsSelectionUpdate: true
        }));
      }

      if (!(0, _utils.isValidHref)(url)) {
        speak((0, _i18n.__)('Warning: the link has been inserted but may have errors. Please test it.'), 'assertive');
      } else if (isActive) {
        speak((0, _i18n.__)('Link edited.'), 'assertive');
      } else {
        speak((0, _i18n.__)('Link inserted'), 'assertive');
      }

      this.props.onClose();
    }
  }, {
    key: "removeLink",
    value: function removeLink() {
      this.props.onRemove();
      this.props.onClose();
    }
  }, {
    key: "onDismiss",
    value: function onDismiss() {
      if (this.state.inputValue === '') {
        this.removeLink();
      } else {
        this.submitLink();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isVisible = this.props.isVisible;
      return (0, _element.createElement)(_editor.BottomSheet, {
        isVisible: isVisible,
        onClose: this.onDismiss,
        hideHeader: true
      },
      /* eslint-disable jsx-a11y/no-autofocus */
      (0, _element.createElement)(_editor.BottomSheet.Cell, {
        icon: 'admin-links',
        label: (0, _i18n.__)('URL'),
        value: this.state.inputValue,
        placeholder: (0, _i18n.__)('Add URL'),
        autoCapitalize: "none",
        autoCorrect: false,
        keyboardType: "url",
        onChangeValue: this.onChangeInputValue,
        autoFocus: _reactNative.Platform.OS === 'ios'
      })
      /* eslint-enable jsx-a11y/no-autofocus */
      , (0, _element.createElement)(_editor.BottomSheet.Cell, {
        icon: 'editor-textcolor',
        label: (0, _i18n.__)('Link Text'),
        value: this.state.text,
        placeholder: (0, _i18n.__)('Add Link Text'),
        onChangeValue: this.onChangeText
      }), (0, _element.createElement)(_editor.BottomSheet.Cell, {
        icon: 'external',
        label: (0, _i18n.__)('Open in New Tab'),
        value: ''
      }, (0, _element.createElement)(_reactNative.Switch, {
        value: this.state.opensInNewWindow,
        onValueChange: this.onChangeOpensInNewWindow
      })), (0, _element.createElement)(_editor.BottomSheet.Cell, {
        label: (0, _i18n.__)('Remove Link'),
        labelStyle: _modal.default.clearLinkButton,
        separatorType: 'none',
        onPress: this.removeLink
      }));
    }
  }]);
  return ModalLinkUI;
}(_element.Component);

var _default = (0, _components.withSpokenMessages)(ModalLinkUI);

exports.default = _default;
//# sourceMappingURL=modal.native.js.map