"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _richText = require("@wordpress/rich-text");

var _url = require("@wordpress/url");

var _blockEditor = require("@wordpress/block-editor");

var _inline = _interopRequireDefault(require("./inline"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/link';
var link = {
  name: name,
  title: (0, _i18n.__)('Link'),
  tagName: 'a',
  className: null,
  attributes: {
    url: 'href',
    target: 'target'
  },
  edit: (0, _components.withSpokenMessages)(
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(LinkEdit, _Component);

    function LinkEdit() {
      var _this;

      (0, _classCallCheck2.default)(this, LinkEdit);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LinkEdit).apply(this, arguments));
      _this.addLink = _this.addLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.stopAddingLink = _this.stopAddingLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.onRemoveFormat = _this.onRemoveFormat.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.state = {
        addingLink: false
      };
      return _this;
    }

    (0, _createClass2.default)(LinkEdit, [{
      key: "addLink",
      value: function addLink() {
        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange;
        var text = (0, _richText.getTextContent)((0, _richText.slice)(value));

        if (text && (0, _url.isURL)(text)) {
          onChange((0, _richText.applyFormat)(value, {
            type: name,
            attributes: {
              url: text
            }
          }));
        } else {
          this.setState({
            addingLink: true
          });
        }
      }
    }, {
      key: "stopAddingLink",
      value: function stopAddingLink() {
        this.setState({
          addingLink: false
        });
      }
    }, {
      key: "onRemoveFormat",
      value: function onRemoveFormat() {
        var _this$props2 = this.props,
            value = _this$props2.value,
            onChange = _this$props2.onChange,
            speak = _this$props2.speak;
        onChange((0, _richText.removeFormat)(value, name));
        speak((0, _i18n.__)('Link removed.'), 'assertive');
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            isActive = _this$props3.isActive,
            activeAttributes = _this$props3.activeAttributes,
            value = _this$props3.value,
            onChange = _this$props3.onChange;
        return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.RichTextShortcut, {
          type: "access",
          character: "a",
          onUse: this.addLink
        }), (0, _element.createElement)(_blockEditor.RichTextShortcut, {
          type: "access",
          character: "s",
          onUse: this.onRemoveFormat
        }), (0, _element.createElement)(_blockEditor.RichTextShortcut, {
          type: "primary",
          character: "k",
          onUse: this.addLink
        }), (0, _element.createElement)(_blockEditor.RichTextShortcut, {
          type: "primaryShift",
          character: "k",
          onUse: this.onRemoveFormat
        }), isActive && (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
          name: "link",
          icon: "editor-unlink",
          title: (0, _i18n.__)('Unlink'),
          onClick: this.onRemoveFormat,
          isActive: isActive,
          shortcutType: "primaryShift",
          shortcutCharacter: "k"
        }), !isActive && (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
          name: "link",
          icon: "admin-links",
          title: (0, _i18n.__)('Link'),
          onClick: this.addLink,
          isActive: isActive,
          shortcutType: "primary",
          shortcutCharacter: "k"
        }), (0, _element.createElement)(_inline.default, {
          addingLink: this.state.addingLink,
          stopAddingLink: this.stopAddingLink,
          isActive: isActive,
          activeAttributes: activeAttributes,
          value: value,
          onChange: onChange
        }));
      }
    }]);
    return LinkEdit;
  }(_element.Component))
};
exports.link = link;
//# sourceMappingURL=index.js.map