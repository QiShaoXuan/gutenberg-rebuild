import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { every, get, isArray, noop, startsWith } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button, FormFileUpload, Placeholder, DropZone, IconButton, withFilters } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import MediaUpload from '../media-upload';
import MediaUploadCheck from '../media-upload/check';
import URLPopover from '../url-popover';

var InsertFromURLPopover = function InsertFromURLPopover(_ref) {
  var src = _ref.src,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      onClose = _ref.onClose;
  return createElement(URLPopover, {
    onClose: onClose
  }, createElement("form", {
    className: "editor-media-placeholder__url-input-form block-editor-media-placeholder__url-input-form",
    onSubmit: onSubmit
  }, createElement("input", {
    className: "editor-media-placeholder__url-input-field block-editor-media-placeholder__url-input-field",
    type: "url",
    "aria-label": __('URL'),
    placeholder: __('Paste or type URL'),
    onChange: onChange,
    value: src
  }), createElement(IconButton, {
    className: "editor-media-placeholder__url-input-submit-button block-editor-media-placeholder__url-input-submit-button",
    icon: "editor-break",
    label: __('Apply'),
    type: "submit"
  })));
};

export var MediaPlaceholder =
/*#__PURE__*/
function (_Component) {
  _inherits(MediaPlaceholder, _Component);

  function MediaPlaceholder() {
    var _this;

    _classCallCheck(this, MediaPlaceholder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MediaPlaceholder).apply(this, arguments));
    _this.state = {
      src: '',
      isURLInputVisible: false
    };
    _this.onChangeSrc = _this.onChangeSrc.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSubmitSrc = _this.onSubmitSrc.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onUpload = _this.onUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onFilesUpload = _this.onFilesUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.openURLInput = _this.openURLInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.closeURLInput = _this.closeURLInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(MediaPlaceholder, [{
    key: "onlyAllowsImages",
    value: function onlyAllowsImages() {
      var allowedTypes = this.props.allowedTypes;

      if (!allowedTypes) {
        return false;
      }

      return every(allowedTypes, function (allowedType) {
        return allowedType === 'image' || startsWith(allowedType, 'image/');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        src: get(this.props.value, ['src'], '')
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (get(prevProps.value, ['src'], '') !== get(this.props.value, ['src'], '')) {
        this.setState({
          src: get(this.props.value, ['src'], '')
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
          var _ref3 = _slicedToArray(_ref2, 1),
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
        instructions = __('To edit this block, you need permission to upload media.');
      }

      if (instructions === undefined || title === undefined) {
        var isOneType = 1 === allowedTypes.length;
        var isAudio = isOneType && 'audio' === allowedTypes[0];
        var isImage = isOneType && 'image' === allowedTypes[0];
        var isVideo = isOneType && 'video' === allowedTypes[0];

        if (instructions === undefined && mediaUpload) {
          instructions = __('Drag a media file, upload a new one or select a file from your library.');

          if (isAudio) {
            instructions = __('Drag an audio, upload a new one or select a file from your library.');
          } else if (isImage) {
            instructions = __('Drag an image, upload a new one or select a file from your library.');
          } else if (isVideo) {
            instructions = __('Drag a video, upload a new one or select a file from your library.');
          }
        }

        if (title === undefined) {
          title = __('Media');

          if (isAudio) {
            title = __('Audio');
          } else if (isImage) {
            title = __('Image');
          } else if (isVideo) {
            title = __('Video');
          }
        }
      }

      var placeholderClassName = classnames('block-editor-media-placeholder', 'editor-media-placeholder', className, {
        'is-appender': isAppender
      });
      return createElement(Placeholder, {
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
          onHTMLDrop = _this$props$onHTMLDro === void 0 ? noop : _this$props$onHTMLDro;
      return createElement(DropZone, {
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
      return createElement("div", {
        className: "editor-media-placeholder__url-input-container block-editor-media-placeholder__url-input-container"
      }, createElement(Button, {
        className: "editor-media-placeholder__button block-editor-media-placeholder__button",
        onClick: this.openURLInput,
        isToggled: isURLInputVisible,
        isLarge: true
      }, __('Insert from URL')), isURLInputVisible && createElement(InsertFromURLPopover, {
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
      var mediaLibraryButton = createElement(MediaUpload, {
        addToGallery: addToGallery,
        gallery: multiple && this.onlyAllowsImages(),
        multiple: multiple,
        onSelect: onSelect,
        allowedTypes: allowedTypes,
        value: isArray(value) ? value.map(function (_ref4) {
          var id = _ref4.id;
          return id;
        }) : value.id,
        render: function render(_ref5) {
          var open = _ref5.open;
          return createElement(Button, {
            isLarge: true,
            className: classnames('editor-media-placeholder__button', 'editor-media-placeholder__media-library-button'),
            onClick: function onClick(event) {
              event.stopPropagation();
              open();
            }
          }, __('Media Library'));
        }
      });

      if (mediaUpload && isAppender) {
        return createElement(Fragment, null, this.renderDropZone(), createElement(FormFileUpload, {
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple,
          render: function render(_ref6) {
            var openFileDialog = _ref6.openFileDialog;
            var content = createElement(Fragment, null, createElement(IconButton, {
              isLarge: true,
              className: classnames('block-editor-media-placeholder__button', 'editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
              icon: "upload"
            }, __('Upload')), mediaLibraryButton, _this2.renderUrlSelectionUI());
            return _this2.renderPlaceholder(content, openFileDialog);
          }
        }));
      }

      if (mediaUpload) {
        var content = createElement(Fragment, null, this.renderDropZone(), createElement(FormFileUpload, {
          isLarge: true,
          className: classnames('block-editor-media-placeholder__button', 'editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple
        }, __('Upload')), mediaLibraryButton, this.renderUrlSelectionUI());
        return this.renderPlaceholder(content);
      }

      return this.renderPlaceholder(mediaLibraryButton);
    }
  }, {
    key: "render",
    value: function render() {
      var dropZoneUIOnly = this.props.dropZoneUIOnly;

      if (dropZoneUIOnly) {
        return createElement(MediaUploadCheck, null, this.renderDropZone());
      }

      return createElement(MediaUploadCheck, {
        fallback: this.renderPlaceholder(this.renderUrlSelectionUI())
      }, this.renderMediaUploadChecked());
    }
  }]);

  return MediaPlaceholder;
}(Component);
var applyWithSelect = withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    mediaUpload: getSettings().__experimentalMediaUpload
  };
});
export default compose(applyWithSelect, withFilters('editor.MediaPlaceholder'))(MediaPlaceholder);
//# sourceMappingURL=index.js.map