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
import React from 'react';
import { View, ImageBackground, TextInput, Text, TouchableWithoutFeedback } from 'react-native';
import { subscribeMediaUpload, requestMediaPickFromMediaLibrary, requestMediaPickFromDeviceLibrary, requestMediaPickFromDeviceCamera, mediaUploadSync, requestImageFailedRetryDialog, requestImageUploadCancelDialog } from 'react-native-gutenberg-bridge';
/**
 * WordPress dependencies
 */

import { Toolbar, ToolbarButton, Spinner, Dashicon } from '@wordpress/components';
import { MediaPlaceholder, RichText, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { BottomSheet, Picker } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { isURL } from '@wordpress/url';
import { doAction, hasAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */

import ImageSize from './image-size';
import styles from './styles.scss';
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
  _inherits(ImageEdit, _React$Component);

  function ImageEdit(props) {
    var _this;

    _classCallCheck(this, ImageEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageEdit).call(this, props));
    _this.state = {
      showSettings: false,
      progress: 0,
      isUploadInProgress: false,
      isUploadFailed: false
    };
    _this.mediaUpload = _this.mediaUpload.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.addMediaUploadListener = _this.addMediaUploadListener.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeMediaUploadListener = _this.removeMediaUploadListener.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.finishMediaUploadWithSuccess = _this.finishMediaUploadWithSuccess.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.finishMediaUploadWithFailure = _this.finishMediaUploadWithFailure.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateMediaProgress = _this.updateMediaProgress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateAlt = _this.updateAlt.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateImageURL = _this.updateImageURL.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSetLinkDestination = _this.onSetLinkDestination.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onImagePressed = _this.onImagePressed.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onClearSettings = _this.onClearSettings.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ImageEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var attributes = this.props.attributes;

      if (attributes.id && !isURL(attributes.url)) {
        this.addMediaUploadListener();
        mediaUploadSync();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // this action will only exist if the user pressed the trash button on the block holder
      if (hasAction('blocks.onRemoveBlockCheckUpload') && this.state.isUploadInProgress) {
        doAction('blocks.onRemoveBlockCheckUpload', this.props.attributes.id);
      }

      this.removeMediaUploadListener();
    }
  }, {
    key: "onImagePressed",
    value: function onImagePressed() {
      var attributes = this.props.attributes;

      if (this.state.isUploadInProgress) {
        requestImageUploadCancelDialog(attributes.id);
      } else if (attributes.id && !isURL(attributes.url)) {
        requestImageFailedRetryDialog(attributes.id);
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

      this.subscriptionParentMediaUpload = subscribeMediaUpload(function (payload) {
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
        label: __('Choose from device')
      }, {
        icon: 'camera',
        value: MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_TAKE_PHOTO,
        label: __('Take a Photo')
      }, {
        icon: 'wordpress-alt',
        value: MEDIA_UPLOAD_BOTTOM_SHEET_VALUE_WORD_PRESS_LIBRARY,
        label: __('WordPress Media Library')
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
        requestMediaPickFromMediaLibrary(function (mediaId, mediaUrl) {
          if (mediaUrl) {
            setAttributes({
              id: mediaId,
              url: mediaUrl
            });
          }
        });
      };

      var onMediaUploadButtonPressed = function onMediaUploadButtonPressed() {
        requestMediaPickFromDeviceLibrary(function (mediaId, mediaUri) {
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
        requestMediaPickFromDeviceCamera(function (mediaId, mediaUri) {
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

      var toolbarEditButton = createElement(Toolbar, null, createElement(ToolbarButton, {
        label: __('Edit image'),
        icon: "edit",
        onClick: onMediaOptionsButtonPressed
      }));

      var getInspectorControls = function getInspectorControls() {
        return createElement(BottomSheet, {
          isVisible: _this3.state.showSettings,
          onClose: onImageSettingsClose,
          hideHeader: true
        }, createElement(BottomSheet.Cell, {
          icon: 'admin-links',
          label: __('Link To'),
          value: href || '',
          valuePlaceholder: __('Add URL'),
          onChangeValue: _this3.onSetLinkDestination,
          autoCapitalize: "none",
          autoCorrect: false
        }), createElement(BottomSheet.Cell, {
          icon: 'editor-textcolor',
          label: __('Alt Text'),
          value: alt || '',
          valuePlaceholder: __('None'),
          separatorType: 'fullWidth',
          onChangeValue: _this3.updateAlt
        }), createElement(BottomSheet.Cell, {
          label: __('Clear All Settings'),
          labelStyle: styles.clearSettingsButton,
          separatorType: 'none',
          onPress: _this3.onClearSettings
        }));
      };

      var mediaOptions = this.getMediaOptionsItems();

      var getMediaOptions = function getMediaOptions() {
        return createElement(Picker, {
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
        return createElement(View, {
          style: {
            flex: 1
          }
        }, getMediaOptions(), createElement(MediaPlaceholder, {
          onMediaOptionsPressed: onMediaOptionsButtonPressed
        }));
      }

      var showSpinner = this.state.isUploadInProgress;
      var opacity = this.state.isUploadInProgress ? 0.3 : 1;
      var progress = this.state.progress * 100;
      return createElement(TouchableWithoutFeedback, {
        onPress: this.onImagePressed,
        disabled: !isSelected
      }, createElement(View, {
        style: {
          flex: 1
        }
      }, showSpinner && createElement(Spinner, {
        progress: progress
      }), createElement(BlockControls, null, toolbarEditButton), createElement(InspectorControls, null, createElement(ToolbarButton, {
        label: __('Image Settings'),
        icon: "admin-generic",
        onClick: onImageSettingsButtonPressed
      })), createElement(ImageSize, {
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

        return createElement(View, {
          style: {
            flex: 1
          }
        }, getInspectorControls(), getMediaOptions(), !imageWidthWithinContainer && createElement(View, {
          style: styles.imageContainer
        }, createElement(Dashicon, {
          icon: 'format-image',
          size: 300
        })), createElement(ImageBackground, {
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
        }, _this3.state.isUploadFailed && createElement(View, {
          style: styles.imageContainer
        }, createElement(Dashicon, {
          icon: 'image-rotate',
          ariaPressed: 'dashicon-active'
        }), createElement(Text, {
          style: styles.uploadFailedText
        }, __('Failed to insert media.\nPlease tap for options.')))));
      }), (!RichText.isEmpty(caption) > 0 || isSelected) && createElement(View, {
        style: {
          padding: 12,
          flex: 1
        }
      }, createElement(TextInput, {
        style: {
          textAlign: 'center'
        },
        fontFamily: this.props.fontFamily || styles['caption-text'].fontFamily,
        underlineColorAndroid: "transparent",
        value: caption,
        placeholder: __('Write caption…'),
        onChangeText: function onChangeText(newCaption) {
          return setAttributes({
            caption: newCaption
          });
        }
      }))));
    }
  }]);

  return ImageEdit;
}(React.Component);

export default ImageEdit;
//# sourceMappingURL=edit.native.js.map