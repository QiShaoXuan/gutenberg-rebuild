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

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeGutenbergBridge = require("react-native-gutenberg-bridge");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _url = require("@wordpress/url");

var _hooks = require("@wordpress/hooks");

var _imageSize = _interopRequireDefault(require("./image-size"));

var _styles = _interopRequireDefault(require("./styles.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MEDIA_UPLOAD_STATE_UPLOADING = 1;
var MEDIA_UPLOAD_STATE_SUCCEEDED = 2;
var MEDIA_UPLOAD_STATE_FAILED = 3;
var MEDIA_UPLOAD_STATE_RESET = 4;
var MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_CHOOSE_FROM_DEVICE = 'choose_from_device';
var MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_TAKE_PHOTO = 'take_photo';
var MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_WORD_PRESS_LIBRARY = 'wordpress_media_library';
var LINK_DESTINATION_CUSTOM = 'custom';
var LINK_DESTINATION_NONE = 'none';

var ImageEdit =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ImageEdit, _React$Component);

  function ImageEdit(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ImageEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageEdit).call(this, props));
    _this.state = {
      showSettings: false,
      progress: 0,
      isUploadInProgress: false,
      isUploadFailed: false
    };
    _this.mediaUpload = _this.mediaUpload.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.addMediaUploadListener = _this.addMediaUploadListener.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.removeMediaUploadListener = _this.removeMediaUploadListener.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.finishMediaUploadWithSuccess = _this.finishMediaUploadWithSuccess.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.finishMediaUploadWithFailure = _this.finishMediaUploadWithFailure.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateMediaProgress = _this.updateMediaProgress.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateAlt = _this.updateAlt.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updateImageURL = _this.updateImageURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSetLinkDestination = _this.onSetLinkDestination.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onImagePressed = _this.onImagePressed.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onClearSettings = _this.onClearSettings.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ImageEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var attributes = this.props.attributes;

      if (attributes.id && !(0, _url.isURL)(attributes.url)) {
        this.addMediaUploadListener();
        (0, _reactNativeGutenbergBridge.mediaUploadSync)();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // this action will only exist if the user pressed the trash button on the block holder
      if ((0, _hooks.hasAction)('blocks.onRemoveBlockCheckUpload') && this.state.isUploadInProgress) {
        (0, _hooks.doAction)('blocks.onRemoveBlockCheckUpload', this.props.attributes.id);
      }

      this.removeMediaUploadListener();
    }
  }, {
    key: "onImagePressed",
    value: function onImagePressed() {
      var attributes = this.props.attributes;

      if (this.state.isUploadInProgress) {
        (0, _reactNativeGutenbergBridge.requestImageUploadCancelDialog)(attributes.id);
      } else if (attributes.id && !(0, _url.isURL)(attributes.url)) {
        (0, _reactNativeGutenbergBridge.requestImageFailedRetryDialog)(attributes.id);
      }
    }
  }, {
    key: "mediaUpload",
    value: function mediaUpload(payload) {
      var attributes = this.props.attributes;

      if (payload.mediaId !== attributes.id) {
        return;
      }

      switch (payload.state) {
        case MEDIA_UPLOAD_STATE_UPLOADING:
          this.updateMediaProgress(payload);
          break;

        case MEDIA_UPLOAD_STATE_SUCCEEDED:
          this.finishMediaUploadWithSuccess(payload);
          break;

        case MEDIA_UPLOAD_STATE_FAILED:
          this.finishMediaUploadWithFailure(payload);
          break;

        case MEDIA_UPLOAD_STATE_RESET:
          this.mediaUploadStateReset(payload);
          break;
      }
    }
  }, {
    key: "updateMediaProgress",
    value: function updateMediaProgress(payload) {
      var setAttributes = this.props.setAttributes;
      this.setState({
        progress: payload.progress,
        isUploadInProgress: true,
        isUploadFailed: false
      });

      if (payload.mediaUrl) {
        setAttributes({
          url: payload.mediaUrl
        });
      }
    }
  }, {
    key: "finishMediaUploadWithSuccess",
    value: function finishMediaUploadWithSuccess(payload) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        url: payload.mediaUrl,
        id: payload.mediaServerId
      });
      this.setState({
        isUploadInProgress: false
      });
      this.removeMediaUploadListener();
    }
  }, {
    key: "finishMediaUploadWithFailure",
    value: function finishMediaUploadWithFailure(payload) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        id: payload.mediaId
      });
      this.setState({
        isUploadInProgress: false,
        isUploadFailed: true
      });
    }
  }, {
    key: "mediaUploadStateReset",
    value: function mediaUploadStateReset(payload) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        id: payload.mediaId,
        url: null
      });
      this.setState({
        isUploadInProgress: false,
        isUploadFailed: false
      });
    }
  }, {
    key: "addMediaUploadListener",
    value: function addMediaUploadListener() {
      var _this2 = this;

      //if we already have a subscription not worth doing it again
      if (this.subscriptionParentMediaUpload) {
        return;
      }

      this.subscriptionParentMediaUpload = (0, _reactNativeGutenbergBridge.subscribeMediaUpload)(function (payload) {
        _this2.mediaUpload(payload);
      });
    }
  }, {
    key: "removeMediaUploadListener",
    value: function removeMediaUploadListener() {
      if (this.subscriptionParentMediaUpload) {
        this.subscriptionParentMediaUpload.remove();
      }
    }
  }, {
    key: "updateAlt",
    value: function updateAlt(newAlt) {
      this.props.setAttributes({
        alt: newAlt
      });
    }
  }, {
    key: "updateImageURL",
    value: function updateImageURL(url) {
      this.props.setAttributes({
        url: url,
        width: undefined,
        height: undefined
      });
    }
  }, {
    key: "onSetLinkDestination",
    value: function onSetLinkDestination(href) {
      this.props.setAttributes({
        linkDestination: LINK_DESTINATION_CUSTOM,
        href: href
      });
    }
  }, {
    key: "onClearSettings",
    value: function onClearSettings() {
      this.props.setAttributes({
        alt: '',
        linkDestination: LINK_DESTINATION_NONE,
        href: undefined
      });
    }
  }, {
    key: "getMediaOptionsItems",
    value: function getMediaOptionsItems() {
      return [{
        icon: 'format-image',
        value: MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_CHOOSE_FROM_DEVICE,
        label: (0, _i18n.__)('Choose from device')
      }, {
        icon: 'camera',
        value: MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_TAKE_PHOTO,
        label: (0, _i18n.__)('Take a Photo')
      }, {
        icon: 'wordpress-alt',
        value: MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_WORD_PRESS_LIBRARY,
        label: (0, _i18n.__)('WordPress Media Library')
      }];
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          isSelected = _this$props.isSelected,
          setAttributes = _this$props.setAttributes;
      var url = attributes.url,
          caption = attributes.caption,
          height = attributes.height,
          width = attributes.width,
          alt = attributes.alt,
          href = attributes.href;

      var onMediaLibraryButtonPressed = function onMediaLibraryButtonPressed() {
        (0, _reactNativeGutenbergBridge.requestMediaPickFromMediaLibrary)(function (mediaId, mediaUrl) {
          if (mediaUrl) {
            setAttributes({
              id: mediaId,
              url: mediaUrl
            });
          }
        });
      };

      var onMediaUploadButtonPressed = function onMediaUploadButtonPressed() {
        (0, _reactNativeGutenbergBridge.requestMediaPickFromDeviceLibrary)(function (mediaId, mediaUri) {
          if (mediaUri) {
            _this3.addMediaUploadListener();

            setAttributes({
              url: mediaUri,
              id: mediaId
            });
          }
        });
      };

      var onMediaCaptureButtonPressed = function onMediaCaptureButtonPressed() {
        (0, _reactNativeGutenbergBridge.requestMediaPickFromDeviceCamera)(function (mediaId, mediaUri) {
          if (mediaUri) {
            _this3.addMediaUploadListener();

            setAttributes({
              url: mediaUri,
              id: mediaId
            });
          }
        });
      };

      var onImageSettingsButtonPressed = function onImageSettingsButtonPressed() {
        _this3.setState({
          showSettings: true
        });
      };

      var onImageSettingsClose = function onImageSettingsClose() {
        _this3.setState({
          showSettings: false
        });
      };

      var picker;

      var onMediaOptionsButtonPressed = function onMediaOptionsButtonPressed() {
        picker.presentPicker();
      };

      var toolbarEditButton = (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.ToolbarButton, {
        label: (0, _i18n.__)('Edit image'),
        icon: "edit",
        onClick: onMediaOptionsButtonPressed
      }));

      var getInspectorControls = function getInspectorControls() {
        return (0, _element.createElement)(_editor.BottomSheet, {
          isVisible: _this3.state.showSettings,
          onClose: onImageSettingsClose,
          hideHeader: true
        }, (0, _element.createElement)(_editor.BottomSheet.Cell, {
          icon: 'admin-links',
          label: (0, _i18n.__)('Link To'),
          value: href || '',
          valuePlaceholder: (0, _i18n.__)('Add URL'),
          onChangeValue: _this3.onSetLinkDestination,
          autoCapitalize: "none",
          autoCorrect: false
        }), (0, _element.createElement)(_editor.BottomSheet.Cell, {
          icon: 'editor-textcolor',
          label: (0, _i18n.__)('Alt Text'),
          value: alt || '',
          valuePlaceholder: (0, _i18n.__)('None'),
          separatorType: 'fullWidth',
          onChangeValue: _this3.updateAlt
        }), (0, _element.createElement)(_editor.BottomSheet.Cell, {
          label: (0, _i18n.__)('Clear All Settings'),
          labelStyle: _styles.default.clearSettingsButton,
          separatorType: 'none',
          onPress: _this3.onClearSettings
        }));
      };

      var mediaOptions = this.getMediaOptionsItems();

      var getMediaOptions = function getMediaOptions() {
        return (0, _element.createElement)(_editor.Picker, {
          hideCancelButton: true,
          ref: function ref(instance) {
            return picker = instance;
          },
          options: mediaOptions,
          onChange: function onChange(value) {
            if (value === MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_CHOOSE_FROM_DEVICE) {
              onMediaUploadButtonPressed();
            } else if (value === MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_TAKE_PHOTO) {
              onMediaCaptureButtonPressed();
            } else if (value === MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_WORD_PRESS_LIBRARY) {
              onMediaLibraryButtonPressed();
            }
          }
        });
      };

      if (!url) {
        return (0, _element.createElement)(_reactNative.View, {
          style: {
            flex: 1
          }
        }, getMediaOptions(), (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
          onMediaOptionsPressed: onMediaOptionsButtonPressed
        }));
      }

      var showSpinner = this.state.isUploadInProgress;
      var opacity = this.state.isUploadInProgress ? 0.3 : 1;
      var progress = this.state.progress * 100;
      return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
        onPress: this.onImagePressed,
        disabled: !isSelected
      }, (0, _element.createElement)(_reactNative.View, {
        style: {
          flex: 1
        }
      }, showSpinner && (0, _element.createElement)(_components.Spinner, {
        progress: progress
      }), (0, _element.createElement)(_blockEditor.BlockControls, null, toolbarEditButton), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.ToolbarButton, {
        label: (0, _i18n.__)('Image Settings'),
        icon: "admin-generic",
        onClick: onImageSettingsButtonPressed
      })), (0, _element.createElement)(_imageSize.default, {
        src: url
      }, function (sizes) {
        var imageWidthWithinContainer = sizes.imageWidthWithinContainer,
            imageHeightWithinContainer = sizes.imageHeightWithinContainer;
        var finalHeight = imageHeightWithinContainer;

        if (height > 0 && height < imageHeightWithinContainer) {
          finalHeight = height;
        }

        var finalWidth = imageWidthWithinContainer;

        if (width > 0 && width < imageWidthWithinContainer) {
          finalWidth = width;
        }

        return (0, _element.createElement)(_reactNative.View, {
          style: {
            flex: 1
          }
        }, getInspectorControls(), getMediaOptions(), !imageWidthWithinContainer && (0, _element.createElement)(_reactNative.View, {
          style: _styles.default.imageContainer
        }, (0, _element.createElement)(_components.Dashicon, {
          icon: 'format-image',
          size: 300
        })), (0, _element.createElement)(_reactNative.ImageBackground, {
          style: {
            width: finalWidth,
            height: finalHeight,
            opacity: opacity
          },
          resizeMethod: "scale",
          source: {
            uri: url
          },
          key: url
        }, _this3.state.isUploadFailed && (0, _element.createElement)(_reactNative.View, {
          style: _styles.default.imageContainer
        }, (0, _element.createElement)(_components.Dashicon, {
          icon: 'image-rotate',
          ariaPressed: 'dashicon-active'
        }), (0, _element.createElement)(_reactNative.Text, {
          style: _styles.default.uploadFailedText
        }, (0, _i18n.__)('Failed to insert media.\nPlease tap for options.')))));
      }), (!_blockEditor.RichText.isEmpty(caption) > 0 || isSelected) && (0, _element.createElement)(_reactNative.View, {
        style: {
          padding: 12,
          flex: 1
        }
      }, (0, _element.createElement)(_reactNative.TextInput, {
        style: {
          textAlign: 'center'
        },
        fontFamily: this.props.fontFamily || _styles.default['caption-text'].fontFamily,
        underlineColorAndroid: "transparent",
        value: caption,
        placeholder: (0, _i18n.__)('Write caption…'),
        onChangeText: function onChangeText(newCaption) {
          return setAttributes({
            caption: newCaption
          });
        }
      }))));
    }
  }]);
  return ImageEdit;
}(_react.default.Component);

var _default = ImageEdit;
exports.default = _default;
//# sourceMappingURL=edit.native.js.map