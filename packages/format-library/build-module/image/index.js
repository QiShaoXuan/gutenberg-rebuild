import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Path, SVG, TextControl, Popover, IconButton, PositionedAtSelection } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { insertObject } from '@wordpress/rich-text';
import { MediaUpload, RichTextToolbarButton, MediaUploadCheck } from '@wordpress/block-editor';
import { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
var ALLOWED_MEDIA_TYPES = ['image'];
var name = 'core/image';

var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};

export var image = {
  name: name,
  title: __('Image'),
  keywords: [__('photo'), __('media')],
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
    _inherits(ImageEdit, _Component);

    function ImageEdit() {
      var _this;

      _classCallCheck(this, ImageEdit);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageEdit).apply(this, arguments));
      _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.openModal = _this.openModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        modal: false
      };
      return _this;
    }

    _createClass(ImageEdit, [{
      key: "onChange",
      value: function onChange(width) {
        this.setState({
          width: width
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if ([LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER].indexOf(event.keyCode) > -1) {
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
        return createElement(MediaUploadCheck, null, createElement(RichTextToolbarButton, {
          icon: createElement(SVG, {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24"
          }, createElement(Path, {
            d: "M4 16h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2zM4 5h10v9H4V5zm14 9v2h4v-2h-4zM2 20h20v-2H2v2zm6.4-8.8L7 9.4 5 12h8l-2.6-3.4-2 2.6z"
          })),
          title: __('Inline Image'),
          onClick: this.openModal,
          isActive: isObjectActive
        }), this.state.modal && createElement(MediaUpload, {
          allowedTypes: ALLOWED_MEDIA_TYPES,
          onSelect: function onSelect(_ref) {
            var id = _ref.id,
                url = _ref.url,
                alt = _ref.alt,
                width = _ref.width;

            _this2.closeModal();

            onChange(insertObject(value, {
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
        }), isObjectActive && createElement(PositionedAtSelection, {
          key: key
        }, createElement(Popover, {
          position: "bottom center",
          focusOnMount: false
        }, createElement("form", {
          className: "editor-format-toolbar__image-container-content block-editor-format-toolbar__image-container-content",
          onKeyPress: stopKeyPropagation,
          onKeyDown: this.onKeyDown,
          onSubmit: function onSubmit(event) {
            var newReplacements = value.replacements.slice();
            newReplacements[value.start] = {
              type: name,
              attributes: _objectSpread({}, activeObjectAttributes, {
                style: "width: ".concat(_this2.state.width, "px;")
              })
            };
            onChange(_objectSpread({}, value, {
              replacements: newReplacements
            }));
            event.preventDefault();
          }
        }, createElement(TextControl, {
          className: "editor-format-toolbar__image-container-value block-editor-format-toolbar__image-container-value",
          type: "number",
          label: __('Width'),
          value: this.state.width,
          min: 1,
          onChange: this.onChange
        }), createElement(IconButton, {
          icon: "editor-break",
          label: __('Apply'),
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
  }(Component)
};
//# sourceMappingURL=index.js.map