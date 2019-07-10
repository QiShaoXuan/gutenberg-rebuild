"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _richText = require("@wordpress/rich-text");

var _url = require("@wordpress/url");

var _modal = _interopRequireDefault(require("./modal"));

/**
 * External dependencies
 */

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
      key: "getLinkSelection",
      value: function getLinkSelection() {
        var _this$props2 = this.props,
            value = _this$props2.value,
            isActive = _this$props2.isActive;
        var startFormat = (0, _richText.getActiveFormat)(value, 'core/link'); // if the link isn't selected, get the link manually by looking around the cursor
        // TODO: handle partly selected links

        if (startFormat && (0, _richText.isCollapsed)(value) && isActive) {
          var startIndex = value.start;
          var endIndex = value.end;

          while ((0, _lodash.find)(value.formats[startIndex], startFormat)) {
            startIndex--;
          }

          endIndex++;

          while ((0, _lodash.find)(value.formats[endIndex], startFormat)) {
            endIndex++;
          }

          return (0, _objectSpread2.default)({}, value, {
            start: startIndex + 1,
            end: endIndex
          });
        }

        return value;
      }
    }, {
      key: "onRemoveFormat",
      value: function onRemoveFormat() {
        var _this$props3 = this.props,
            onChange = _this$props3.onChange,
            speak = _this$props3.speak;
        var linkSelection = this.getLinkSelection();
        onChange((0, _richText.removeFormat)(linkSelection, name));
        speak((0, _i18n.__)('Link removed.'), 'assertive');
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            isActive = _this$props4.isActive,
            activeAttributes = _this$props4.activeAttributes,
            onChange = _this$props4.onChange;
        var linkSelection = this.getLinkSelection();
        return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_modal.default, {
          isVisible: this.state.addingLink,
          isActive: isActive,
          activeAttributes: activeAttributes,
          onClose: this.stopAddingLink,
          onChange: onChange,
          onRemove: this.onRemoveFormat,
          value: linkSelection
        }), (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
          name: "link",
          icon: "admin-links",
          title: (0, _i18n.__)('Link'),
          onClick: this.addLink,
          isActive: isActive,
          shortcutType: "primary",
          shortcutCharacter: "k"
        }));
      }
    }]);
    return LinkEdit;
  }(_element.Component))
};
exports.link = link;
//# sourceMappingURL=index.native.js.map