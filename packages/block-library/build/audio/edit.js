"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _icon = _interopRequireDefault(require("./icon"));

var _util = require("../embed/util");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Internal dependencies
 */
var ALLOWED_MEDIA_TYPES = ['audio'];

var AudioEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AudioEdit, _Component);

  function AudioEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, AudioEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AudioEdit).apply(this, arguments)); // edit component has its own src in the state so it can be edited
    // without setting the actual value outside of the edit UI

    _this.state = {
      editing: !_this.props.attributes.src
    };
    _this.toggleAttribute = _this.toggleAttribute.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelectURL = _this.onSelectURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(AudioEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          noticeOperations = _this$props.noticeOperations,
          setAttributes = _this$props.setAttributes;
      var id = attributes.id,
          _attributes$src = attributes.src,
          src = _attributes$src === void 0 ? '' : _attributes$src;

      if (!id && (0, _blob.isBlobURL)(src)) {
        var file = (0, _blob.getBlobByURL)(src);

        if (file) {
          (0, _editor.mediaUpload)({
            filesList: [file],
            onFileChange: function onFileChange(_ref) {
              var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
                  _ref2$ = _ref2[0],
                  mediaId = _ref2$.id,
                  url = _ref2$.url;

              setAttributes({
                id: mediaId,
                src: url
              });
            },
            onError: function onError(e) {
              setAttributes({
                src: undefined,
                id: undefined
              });

              _this2.setState({
                editing: true
              });

              noticeOperations.createErrorNotice(e);
            },
            allowedTypes: ALLOWED_MEDIA_TYPES
          });
        }
      }
    }
  }, {
    key: "toggleAttribute",
    value: function toggleAttribute(attribute) {
      var _this3 = this;

      return function (newValue) {
        _this3.props.setAttributes((0, _defineProperty2.default)({}, attribute, newValue));
      };
    }
  }, {
    key: "onSelectURL",
    value: function onSelectURL(newSrc) {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      var src = attributes.src; // Set the block's src from the edit component's state, and switch off
      // the editing UI.

      if (newSrc !== src) {
        // Check if there's an embed block that handles this URL.
        var embedBlock = (0, _util.createUpgradedEmbedBlock)({
          attributes: {
            url: newSrc
          }
        });

        if (undefined !== embedBlock) {
          this.props.onReplace(embedBlock);
          return;
        }

        setAttributes({
          src: newSrc,
          id: undefined
        });
      }

      this.setState({
        editing: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props$attribute = this.props.attributes,
          autoplay = _this$props$attribute.autoplay,
          caption = _this$props$attribute.caption,
          loop = _this$props$attribute.loop,
          preload = _this$props$attribute.preload,
          src = _this$props$attribute.src;
      var _this$props3 = this.props,
          setAttributes = _this$props3.setAttributes,
          isSelected = _this$props3.isSelected,
          className = _this$props3.className,
          noticeOperations = _this$props3.noticeOperations,
          noticeUI = _this$props3.noticeUI;
      var editing = this.state.editing;

      var switchToEditing = function switchToEditing() {
        _this4.setState({
          editing: true
        });
      };

      var onSelectAudio = function onSelectAudio(media) {
        if (!media || !media.url) {
          // in this case there was an error and we should continue in the editing state
          // previous attributes should be removed because they may be temporary blob urls
          setAttributes({
            src: undefined,
            id: undefined
          });
          switchToEditing();
          return;
        } // sets the block's attribute and updates the edit component from the
        // selected media, then switches off the editing UI


        setAttributes({
          src: media.url,
          id: media.id
        });

        _this4.setState({
          src: media.url,
          editing: false
        });
      };

      if (editing) {
        return (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
          icon: (0, _element.createElement)(_blockEditor.BlockIcon, {
            icon: _icon.default
          }),
          className: className,
          onSelect: onSelectAudio,
          onSelectURL: this.onSelectURL,
          accept: "audio/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: this.props.attributes,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice
        });
      }
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */


      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.IconButton, {
        className: "components-icon-button components-toolbar__control",
        label: (0, _i18n.__)('Edit audio'),
        onClick: switchToEditing,
        icon: "edit"
      }))), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Audio Settings')
      }, (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Autoplay'),
        onChange: this.toggleAttribute('autoplay'),
        checked: autoplay
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Loop'),
        onChange: this.toggleAttribute('loop'),
        checked: loop
      }), (0, _element.createElement)(_components.SelectControl, {
        label: (0, _i18n.__)('Preload'),
        value: undefined !== preload ? preload : 'none' // `undefined` is required for the preload attribute to be unset.
        ,
        onChange: function onChange(value) {
          return setAttributes({
            preload: 'none' !== value ? value : undefined
          });
        },
        options: [{
          value: 'auto',
          label: (0, _i18n.__)('Auto')
        }, {
          value: 'metadata',
          label: (0, _i18n.__)('Metadata')
        }, {
          value: 'none',
          label: (0, _i18n.__)('None')
        }]
      }))), (0, _element.createElement)("figure", {
        className: className
      }, (0, _element.createElement)(_components.Disabled, null, (0, _element.createElement)("audio", {
        controls: "controls",
        src: src
      })), (!_blockEditor.RichText.isEmpty(caption) || isSelected) && (0, _element.createElement)(_blockEditor.RichText, {
        tagName: "figcaption",
        placeholder: (0, _i18n.__)('Write caption…'),
        value: caption,
        onChange: function onChange(value) {
          return setAttributes({
            caption: value
          });
        },
        inlineToolbar: true
      })));
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    }
  }]);
  return AudioEdit;
}(_element.Component);

var _default = (0, _components.withNotices)(AudioEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map