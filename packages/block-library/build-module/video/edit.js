import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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
import { getBlobByURL, isBlobURL } from '@wordpress/blob';
import { BaseControl, Button, Disabled, IconButton, PanelBody, SelectControl, ToggleControl, Toolbar, withNotices } from '@wordpress/components';
import { BlockControls, BlockIcon, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { Component, Fragment, createRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { createUpgradedEmbedBlock } from '../embed/util';
import icon from './icon';
var ALLOWED_MEDIA_TYPES = ['video'];
var VIDEO_POSTER_ALLOWED_MEDIA_TYPES = ['image'];

var VideoEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(VideoEdit, _Component);

  function VideoEdit() {
    var _this;

    _classCallCheck(this, VideoEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoEdit).apply(this, arguments)); // edit component has its own src in the state so it can be edited
    // without setting the actual value outside of the edit UI

    _this.state = {
      editing: !_this.props.attributes.src
    };
    _this.videoPlayer = createRef();
    _this.posterImageButton = createRef();
    _this.toggleAttribute = _this.toggleAttribute.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectURL = _this.onSelectURL.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectPoster = _this.onSelectPoster.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onRemovePoster = _this.onRemovePoster.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VideoEdit, [{
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

      if (!id && isBlobURL(src)) {
        var file = getBlobByURL(src);

        if (file) {
          mediaUpload({
            filesList: [file],
            onFileChange: function onFileChange(_ref) {
              var _ref2 = _slicedToArray(_ref, 1),
                  url = _ref2[0].url;

              setAttributes({
                src: url
              });
            },
            onError: function onError(message) {
              _this2.setState({
                editing: true
              });

              noticeOperations.createErrorNotice(message);
            },
            allowedTypes: ALLOWED_MEDIA_TYPES
          });
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.attributes.poster !== prevProps.attributes.poster) {
        this.videoPlayer.current.load();
      }
    }
  }, {
    key: "toggleAttribute",
    value: function toggleAttribute(attribute) {
      var _this3 = this;

      return function (newValue) {
        _this3.props.setAttributes(_defineProperty({}, attribute, newValue));
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
        var embedBlock = createUpgradedEmbedBlock({
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
    key: "onSelectPoster",
    value: function onSelectPoster(image) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        poster: image.url
      });
    }
  }, {
    key: "onRemovePoster",
    value: function onRemovePoster() {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        poster: ''
      }); // Move focus back to the Media Upload button.

      this.posterImageButton.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props$attribute = this.props.attributes,
          autoplay = _this$props$attribute.autoplay,
          caption = _this$props$attribute.caption,
          controls = _this$props$attribute.controls,
          loop = _this$props$attribute.loop,
          muted = _this$props$attribute.muted,
          poster = _this$props$attribute.poster,
          preload = _this$props$attribute.preload,
          src = _this$props$attribute.src,
          playsInline = _this$props$attribute.playsInline;
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

      var onSelectVideo = function onSelectVideo(media) {
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
        return createElement(MediaPlaceholder, {
          icon: createElement(BlockIcon, {
            icon: icon
          }),
          className: className,
          onSelect: onSelectVideo,
          onSelectURL: this.onSelectURL,
          accept: "video/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: this.props.attributes,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice
        });
      }
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */


      return createElement(Fragment, null, createElement(BlockControls, null, createElement(Toolbar, null, createElement(IconButton, {
        className: "components-icon-button components-toolbar__control",
        label: __('Edit video'),
        onClick: switchToEditing,
        icon: "edit"
      }))), createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Video Settings')
      }, createElement(ToggleControl, {
        label: __('Autoplay'),
        onChange: this.toggleAttribute('autoplay'),
        checked: autoplay
      }), createElement(ToggleControl, {
        label: __('Loop'),
        onChange: this.toggleAttribute('loop'),
        checked: loop
      }), createElement(ToggleControl, {
        label: __('Muted'),
        onChange: this.toggleAttribute('muted'),
        checked: muted
      }), createElement(ToggleControl, {
        label: __('Playback Controls'),
        onChange: this.toggleAttribute('controls'),
        checked: controls
      }), createElement(ToggleControl, {
        label: __('Play inline'),
        onChange: this.toggleAttribute('playsInline'),
        checked: playsInline
      }), createElement(SelectControl, {
        label: __('Preload'),
        value: preload,
        onChange: function onChange(value) {
          return setAttributes({
            preload: value
          });
        },
        options: [{
          value: 'auto',
          label: __('Auto')
        }, {
          value: 'metadata',
          label: __('Metadata')
        }, {
          value: 'none',
          label: __('None')
        }]
      }), createElement(MediaUploadCheck, null, createElement(BaseControl, {
        className: "editor-video-poster-control"
      }, createElement(BaseControl.VisualLabel, null, __('Poster Image')), createElement(MediaUpload, {
        title: __('Select Poster Image'),
        onSelect: this.onSelectPoster,
        allowedTypes: VIDEO_POSTER_ALLOWED_MEDIA_TYPES,
        render: function render(_ref3) {
          var open = _ref3.open;
          return createElement(Button, {
            isDefault: true,
            onClick: open,
            ref: _this4.posterImageButton
          }, !_this4.props.attributes.poster ? __('Select Poster Image') : __('Replace image'));
        }
      }), !!this.props.attributes.poster && createElement(Button, {
        onClick: this.onRemovePoster,
        isLink: true,
        isDestructive: true
      }, __('Remove Poster Image')))))), createElement("figure", {
        className: className
      }, createElement(Disabled, null, createElement("video", {
        controls: controls,
        poster: poster,
        src: src,
        ref: this.videoPlayer
      })), (!RichText.isEmpty(caption) || isSelected) && createElement(RichText, {
        tagName: "figcaption",
        placeholder: __('Write caption…'),
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

  return VideoEdit;
}(Component);

export default withNotices(VideoEdit);
//# sourceMappingURL=edit.js.map