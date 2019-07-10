"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MediaPlaceholder = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _mediaUpload = _interopRequireDefault(require("../media-upload"));

var _check = _interopRequireDefault(require("../media-upload/check"));

var _urlPopover = _interopRequireDefault(require("../url-popover"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var InsertFromURLPopover = function InsertFromURLPopover(_ref) {
  var src = _ref.src,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      onClose = _ref.onClose;
  return (0, _element.createElement)(_urlPopover.default, {
    onClose: onClose
  }, (0, _element.createElement)("form", {
    className: "editor-media-placeholder__url-input-form block-editor-media-placeholder__url-input-form",
    onSubmit: onSubmit
  }, (0, _element.createElement)("input", {
    className: "editor-media-placeholder__url-input-field block-editor-media-placeholder__url-input-field",
    type: "url",
    "aria-label": (0, _i18n.__)('URL'),
    placeholder: (0, _i18n.__)('Paste or type URL'),
    onChange: onChange,
    value: src
  }), (0, _element.createElement)(_components.IconButton, {
    className: "editor-media-placeholder__url-input-submit-button block-editor-media-placeholder__url-input-submit-button",
    icon: "editor-break",
    label: (0, _i18n.__)('Apply'),
    type: "submit"
  })));
};

var MediaPlaceholder =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MediaPlaceholder, _Component);

  function MediaPlaceholder() {
    var _this;

    (0, _classCallCheck2.default)(this, MediaPlaceholder);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MediaPlaceholder).apply(this, arguments));
    _this.state = {
      src: '',
      isURLInputVisible: false
    };
    _this.onChangeSrc = _this.onChangeSrc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSubmitSrc = _this.onSubmitSrc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onUpload = _this.onUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFilesUpload = _this.onFilesUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.openURLInput = _this.openURLInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.closeURLInput = _this.closeURLInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(MediaPlaceholder, [{
    key: "onlyAllowsImages",
    value: function onlyAllowsImages() {
      var allowedTypes = this.props.allowedTypes;

      if (!allowedTypes) {
        return false;
      }

      return (0, _lodash.every)(allowedTypes, function (allowedType) {
        return allowedType === 'image' || (0, _lodash.startsWith)(allowedType, 'image/');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        src: (0, _lodash.get)(this.props.value, ['src'], '')
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if ((0, _lodash.get)(prevProps.value, ['src'], '') !== (0, _lodash.get)(this.props.value, ['src'], '')) {
        this.setState({
          src: (0, _lodash.get)(this.props.value, ['src'], '')
        });
      }
    }
  }, {
    key: "onChangeSrc",
    value: function onChangeSrc(event) {
      this.setState({
        src: event.target.value
      });
    }
  }, {
    key: "onSubmitSrc",
    value: function onSubmitSrc(event) {
      event.preventDefault();

      if (this.state.src && this.props.onSelectURL) {
        this.props.onSelectURL(this.state.src);
        this.closeURLInput();
      }
    }
  }, {
    key: "onUpload",
    value: function onUpload(event) {
      this.onFilesUpload(event.target.files);
    }
  }, {
    key: "onFilesUpload",
    value: function onFilesUpload(files) {
      var _this$props = this.props,
          addToGallery = _this$props.addToGallery,
          allowedTypes = _this$props.allowedTypes,
          mediaUpload = _this$props.mediaUpload,
          multiple = _this$props.multiple,
          onError = _this$props.onError,
          onSelect = _this$props.onSelect,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? [] : _this$props$value;
      var setMedia;

      if (multiple) {
        if (addToGallery) {
          var currentValue = value;

          setMedia = function setMedia(newMedia) {
            onSelect(currentValue.concat(newMedia));
          };
        } else {
          setMedia = onSelect;
        }
      } else {
        setMedia = function setMedia(_ref2) {
          var _ref3 = (0, _slicedToArray2.default)(_ref2, 1),
              media = _ref3[0];

          return onSelect(media);
        };
      }

      mediaUpload({
        allowedTypes: allowedTypes,
        filesList: files,
        onFileChange: setMedia,
        onError: onError
      });
    }
  }, {
    key: "openURLInput",
    value: function openURLInput() {
      this.setState({
        isURLInputVisible: true
      });
    }
  }, {
    key: "closeURLInput",
    value: function closeURLInput() {
      this.setState({
        isURLInputVisible: false
      });
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder(content, onClick) {
      var _this$props2 = this.props,
          _this$props2$allowedT = _this$props2.allowedTypes,
          allowedTypes = _this$props2$allowedT === void 0 ? [] : _this$props2$allowedT,
          className = _this$props2.className,
          icon = _this$props2.icon,
          isAppender = _this$props2.isAppender,
          _this$props2$labels = _this$props2.labels,
          labels = _this$props2$labels === void 0 ? {} : _this$props2$labels,
          notices = _this$props2.notices,
          onSelectURL = _this$props2.onSelectURL,
          mediaUpload = _this$props2.mediaUpload;
      var instructions = labels.instructions;
      var title = labels.title;

      if (!mediaUpload && !onSelectURL) {
        instructions = (0, _i18n.__)('To edit this block, you need permission to upload media.');
      }

      if (instructions === undefined || title === undefined) {
        var isOneType = 1 === allowedTypes.length;
        var isAudio = isOneType && 'audio' === allowedTypes[0];
        var isImage = isOneType && 'image' === allowedTypes[0];
        var isVideo = isOneType && 'video' === allowedTypes[0];

        if (instructions === undefined && mediaUpload) {
          instructions = (0, _i18n.__)('Drag a media file, upload a new one or select a file from your library.');

          if (isAudio) {
            instructions = (0, _i18n.__)('Drag an audio, upload a new one or select a file from your library.');
          } else if (isImage) {
            instructions = (0, _i18n.__)('Drag an image, upload a new one or select a file from your library.');
          } else if (isVideo) {
            instructions = (0, _i18n.__)('Drag a video, upload a new one or select a file from your library.');
          }
        }

        if (title === undefined) {
          title = (0, _i18n.__)('Media');

          if (isAudio) {
            title = (0, _i18n.__)('Audio');
          } else if (isImage) {
            title = (0, _i18n.__)('Image');
          } else if (isVideo) {
            title = (0, _i18n.__)('Video');
          }
        }
      }

      var placeholderClassName = (0, _classnames.default)('block-editor-media-placeholder', 'editor-media-placeholder', className, {
        'is-appender': isAppender
      });
      return (0, _element.createElement)(_components.Placeholder, {
        icon: icon,
        label: title,
        instructions: instructions,
        className: placeholderClassName,
        notices: notices,
        onClick: onClick
      }, content);
    }
  }, {
    key: "renderDropZone",
    value: function renderDropZone() {
      var _this$props$onHTMLDro = this.props.onHTMLDrop,
          onHTMLDrop = _this$props$onHTMLDro === void 0 ? _lodash.noop : _this$props$onHTMLDro;
      return (0, _element.createElement)(_components.DropZone, {
        onFilesDrop: this.onFilesUpload,
        onHTMLDrop: onHTMLDrop
      });
    }
  }, {
    key: "renderUrlSelectionUI",
    value: function renderUrlSelectionUI() {
      var onSelectURL = this.props.onSelectURL;

      if (!onSelectURL) {
        return null;
      }

      var _this$state = this.state,
          isURLInputVisible = _this$state.isURLInputVisible,
          src = _this$state.src;
      return (0, _element.createElement)("div", {
        className: "editor-media-placeholder__url-input-container block-editor-media-placeholder__url-input-container"
      }, (0, _element.createElement)(_components.Button, {
        className: "editor-media-placeholder__button block-editor-media-placeholder__button",
        onClick: this.openURLInput,
        isToggled: isURLInputVisible,
        isLarge: true
      }, (0, _i18n.__)('Insert from URL')), isURLInputVisible && (0, _element.createElement)(InsertFromURLPopover, {
        src: src,
        onChange: this.onChangeSrc,
        onSubmit: this.onSubmitSrc,
        onClose: this.closeURLInput
      }));
    }
  }, {
    key: "renderMediaUploadChecked",
    value: function renderMediaUploadChecked() {
      var _this2 = this;

      var _this$props3 = this.props,
          accept = _this$props3.accept,
          addToGallery = _this$props3.addToGallery,
          _this$props3$allowedT = _this$props3.allowedTypes,
          allowedTypes = _this$props3$allowedT === void 0 ? [] : _this$props3$allowedT,
          isAppender = _this$props3.isAppender,
          mediaUpload = _this$props3.mediaUpload,
          _this$props3$multiple = _this$props3.multiple,
          multiple = _this$props3$multiple === void 0 ? false : _this$props3$multiple,
          onSelect = _this$props3.onSelect,
          _this$props3$value = _this$props3.value,
          value = _this$props3$value === void 0 ? {} : _this$props3$value;
      var mediaLibraryButton = (0, _element.createElement)(_mediaUpload.default, {
        addToGallery: addToGallery,
        gallery: multiple && this.onlyAllowsImages(),
        multiple: multiple,
        onSelect: onSelect,
        allowedTypes: allowedTypes,
        value: (0, _lodash.isArray)(value) ? value.map(function (_ref4) {
          var id = _ref4.id;
          return id;
        }) : value.id,
        render: function render(_ref5) {
          var open = _ref5.open;
          return (0, _element.createElement)(_components.Button, {
            isLarge: true,
            className: (0, _classnames.default)('editor-media-placeholder__button', 'editor-media-placeholder__media-library-button'),
            onClick: function onClick(event) {
              event.stopPropagation();
              open();
            }
          }, (0, _i18n.__)('Media Library'));
        }
      });

      if (mediaUpload && isAppender) {
        return (0, _element.createElement)(_element.Fragment, null, this.renderDropZone(), (0, _element.createElement)(_components.FormFileUpload, {
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple,
          render: function render(_ref6) {
            var openFileDialog = _ref6.openFileDialog;
            var content = (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.IconButton, {
              isLarge: true,
              className: (0, _classnames.default)('block-editor-media-placeholder__button', 'editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
              icon: "upload"
            }, (0, _i18n.__)('Upload')), mediaLibraryButton, _this2.renderUrlSelectionUI());
            return _this2.renderPlaceholder(content, openFileDialog);
          }
        }));
      }

      if (mediaUpload) {
        var content = (0, _element.createElement)(_element.Fragment, null, this.renderDropZone(), (0, _element.createElement)(_components.FormFileUpload, {
          isLarge: true,
          className: (0, _classnames.default)('block-editor-media-placeholder__button', 'editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple
        }, (0, _i18n.__)('Upload')), mediaLibraryButton, this.renderUrlSelectionUI());
        return this.renderPlaceholder(content);
      }

      return this.renderPlaceholder(mediaLibraryButton);
    }
  }, {
    key: "render",
    value: function render() {
      var dropZoneUIOnly = this.props.dropZoneUIOnly;

      if (dropZoneUIOnly) {
        return (0, _element.createElement)(_check.default, null, this.renderDropZone());
      }

      return (0, _element.createElement)(_check.default, {
        fallback: this.renderPlaceholder(this.renderUrlSelectionUI())
      }, this.renderMediaUploadChecked());
    }
  }]);
  return MediaPlaceholder;
}(_element.Component);

exports.MediaPlaceholder = MediaPlaceholder;
var applyWithSelect = (0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    mediaUpload: getSettings().__experimentalMediaUpload
  };
});

var _default = (0, _compose.compose)(applyWithSelect, (0, _components.withFilters)('editor.MediaPlaceholder'))(MediaPlaceholder);

exports.default = _default;
//# sourceMappingURL=index.js.map