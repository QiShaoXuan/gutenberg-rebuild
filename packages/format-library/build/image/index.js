"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.image = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
var ALLOWED_MEDIA_TYPES = ['image'];
var name = 'core/image';

var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};

var image = {
  name: name,
  title: (0, _i18n.__)('Image'),
  keywords: [(0, _i18n.__)('photo'), (0, _i18n.__)('media')],
  object: true,
  tagName: 'img',
  className: null,
  attributes: {
    className: 'class',
    style: 'style',
    url: 'src',
    alt: 'alt'
  },
  edit:
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(ImageEdit, _Component);

    function ImageEdit() {
      var _this;

      (0, _classCallCheck2.default)(this, ImageEdit);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageEdit).apply(this, arguments));
      _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.openModal = _this.openModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.closeModal = _this.closeModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.state = {
        modal: false
      };
      return _this;
    }

    (0, _createClass2.default)(ImageEdit, [{
      key: "onChange",
      value: function onChange(width) {
        this.setState({
          width: width
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if ([_keycodes.LEFT, _keycodes.DOWN, _keycodes.RIGHT, _keycodes.UP, _keycodes.BACKSPACE, _keycodes.ENTER].indexOf(event.keyCode) > -1) {
          // Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
          event.stopPropagation();
        }
      }
    }, {
      key: "openModal",
      value: function openModal() {
        this.setState({
          modal: true
        });
      }
    }, {
      key: "closeModal",
      value: function closeModal() {
        this.setState({
          modal: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange,
            isObjectActive = _this$props.isObjectActive,
            activeObjectAttributes = _this$props.activeObjectAttributes;
        var style = activeObjectAttributes.style; // Rerender PositionedAtSelection when the selection changes or when
        // the width changes.

        var key = value.start + style;
        return (0, _element.createElement)(_blockEditor.MediaUploadCheck, null, (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
          icon: (0, _element.createElement)(_components.SVG, {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
          }, (0, _element.createElement)(_components.Path, {
            d: "M4 16h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2zM4 5h10v9H4V5zm14 9v2h4v-2h-4zM2 20h20v-2H2v2zm6.4-8.8L7 9.4 5 12h8l-2.6-3.4-2 2.6z"
          })),
          title: (0, _i18n.__)('Inline Image'),
          onClick: this.openModal,
          isActive: isObjectActive
        }), this.state.modal && (0, _element.createElement)(_blockEditor.MediaUpload, {
          allowedTypes: ALLOWED_MEDIA_TYPES,
          onSelect: function onSelect(_ref) {
            var id = _ref.id,
                url = _ref.url,
                alt = _ref.alt,
                width = _ref.width;

            _this2.closeModal();

            onChange((0, _richText.insertObject)(value, {
              type: name,
              attributes: {
                className: "wp-image-".concat(id),
                style: "width: ".concat(Math.min(width, 150), "px;"),
                url: url,
                alt: alt
              }
            }));
          },
          onClose: this.closeModal,
          render: function render(_ref2) {
            var open = _ref2.open;
            open();
            return null;
          }
        }), isObjectActive && (0, _element.createElement)(_components.PositionedAtSelection, {
          key: key
        }, (0, _element.createElement)(_components.Popover, {
          position: "bottom center",
          focusOnMount: false
        }, (0, _element.createElement)("form", {
          className: "editor-format-toolbar__image-container-content block-editor-format-toolbar__image-container-content",
          onKeyPress: stopKeyPropagation,
          onKeyDown: this.onKeyDown,
          onSubmit: function onSubmit(event) {
            var newReplacements = value.replacements.slice();
            newReplacements[value.start] = {
              type: name,
              attributes: (0, _objectSpread2.default)({}, activeObjectAttributes, {
                style: "width: ".concat(_this2.state.width, "px;")
              })
            };
            onChange((0, _objectSpread2.default)({}, value, {
              replacements: newReplacements
            }));
            event.preventDefault();
          }
        }, (0, _element.createElement)(_components.TextControl, {
          className: "editor-format-toolbar__image-container-value block-editor-format-toolbar__image-container-value",
          type: "number",
          label: (0, _i18n.__)('Width'),
          value: this.state.width,
          min: 1,
          onChange: this.onChange
        }), (0, _element.createElement)(_components.IconButton, {
          icon: "editor-break",
          label: (0, _i18n.__)('Apply'),
          type: "submit"
        })))));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        var style = props.activeObjectAttributes.style;

        if (style === state.previousStyle) {
          return null;
        }

        if (!style) {
          return {
            width: undefined,
            previousStyle: style
          };
        }

        return {
          width: style.replace(/\D/g, ''),
          previousStyle: style
        };
      }
    }]);
    return ImageEdit;
  }(_element.Component)
};
exports.image = image;
//# sourceMappingURL=index.js.map