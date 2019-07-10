import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import classnames from 'classnames';
import FastAverageColor from 'fast-average-color';
import tinycolor from 'tinycolor2';
/**
 * WordPress dependencies
 */

import { FocalPointPicker, IconButton, PanelBody, RangeControl, ToggleControl, Toolbar, withNotices } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { BlockControls, BlockIcon, InnerBlocks, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, PanelColorSettings, withColors } from '@wordpress/editor';
import { Component, createRef, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import icon from './icon';
/**
 * Module Constants
 */

export var IMAGE_BACKGROUND_TYPE = 'image';
export var VIDEO_BACKGROUND_TYPE = 'video';
var ALLOWED_MEDIA_TYPES = ['image', 'video'];
var INNER_BLOCKS_TEMPLATE = [['core/paragraph', {
  align: 'center',
  fontSize: 'large',
  placeholder: __('Write title…')
}]];
var INNER_BLOCKS_ALLOWED_BLOCKS = ['core/button', 'core/heading', 'core/paragraph'];

function retrieveFastAverageColor() {
  if (!retrieveFastAverageColor.fastAverageColor) {
    retrieveFastAverageColor.fastAverageColor = new FastAverageColor();
  }

  return retrieveFastAverageColor.fastAverageColor;
}

export function backgroundImageStyles(url) {
  return url ? {
    backgroundImage: "url(".concat(url, ")")
  } : {};
}
export function dimRatioToClass(ratio) {
  return ratio === 0 || ratio === 50 ? null : 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

var CoverEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(CoverEdit, _Component);

  function CoverEdit() {
    var _this;

    _classCallCheck(this, CoverEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CoverEdit).apply(this, arguments));
    _this.state = {
      isDark: false
    };
    _this.imageRef = createRef();
    _this.videoRef = createRef();
    _this.changeIsDarkIfRequired = _this.changeIsDarkIfRequired.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CoverEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleBackgroundMode();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.handleBackgroundMode(prevProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes,
          className = _this$props.className,
          noticeOperations = _this$props.noticeOperations,
          noticeUI = _this$props.noticeUI,
          overlayColor = _this$props.overlayColor,
          setOverlayColor = _this$props.setOverlayColor;
      var backgroundType = attributes.backgroundType,
          dimRatio = attributes.dimRatio,
          focalPoint = attributes.focalPoint,
          hasParallax = attributes.hasParallax,
          id = attributes.id,
          url = attributes.url;

      var onSelectMedia = function onSelectMedia(media) {
        if (!media || !media.url) {
          setAttributes({
            url: undefined,
            id: undefined
          });
          return;
        }

        var mediaType; // for media selections originated from a file upload.

        if (media.media_type) {
          if (media.media_type === IMAGE_BACKGROUND_TYPE) {
            mediaType = IMAGE_BACKGROUND_TYPE;
          } else {
            // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
            // Videos contain the media type of 'file' in the object returned from the rest api.
            mediaType = VIDEO_BACKGROUND_TYPE;
          }
        } else {
          // for media selections originated from existing files in the media library.
          if (media.type !== IMAGE_BACKGROUND_TYPE && media.type !== VIDEO_BACKGROUND_TYPE) {
            return;
          }

          mediaType = media.type;
        }

        setAttributes(_objectSpread({
          url: media.url,
          id: media.id,
          backgroundType: mediaType
        }, mediaType === VIDEO_BACKGROUND_TYPE ? {
          focalPoint: undefined,
          hasParallax: undefined
        } : {}));
      };

      var toggleParallax = function toggleParallax() {
        setAttributes(_objectSpread({
          hasParallax: !hasParallax
        }, !hasParallax ? {
          focalPoint: undefined
        } : {}));
      };

      var setDimRatio = function setDimRatio(ratio) {
        return setAttributes({
          dimRatio: ratio
        });
      };

      var style = _objectSpread({}, backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {}, {
        backgroundColor: overlayColor.color
      });

      if (focalPoint) {
        style.backgroundPosition = "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%");
      }

      var controls = createElement(Fragment, null, createElement(BlockControls, null, !!url && createElement(Fragment, null, createElement(MediaUploadCheck, null, createElement(Toolbar, null, createElement(MediaUpload, {
        onSelect: onSelectMedia,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        value: id,
        render: function render(_ref) {
          var open = _ref.open;
          return createElement(IconButton, {
            className: "components-toolbar__control",
            label: __('Edit media'),
            icon: "edit",
            onClick: open
          });
        }
      }))))), !!url && createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Cover Settings')
      }, IMAGE_BACKGROUND_TYPE === backgroundType && createElement(ToggleControl, {
        label: __('Fixed Background'),
        checked: hasParallax,
        onChange: toggleParallax
      }), IMAGE_BACKGROUND_TYPE === backgroundType && !hasParallax && createElement(FocalPointPicker, {
        label: __('Focal Point Picker'),
        url: url,
        value: focalPoint,
        onChange: function onChange(value) {
          return setAttributes({
            focalPoint: value
          });
        }
      }), createElement(PanelColorSettings, {
        title: __('Overlay'),
        initialOpen: true,
        colorSettings: [{
          value: overlayColor.color,
          onChange: setOverlayColor,
          label: __('Overlay Color')
        }]
      }, createElement(RangeControl, {
        label: __('Background Opacity'),
        value: dimRatio,
        onChange: setDimRatio,
        min: 0,
        max: 100,
        step: 10,
        required: true
      })))));

      if (!url) {
        var placeholderIcon = createElement(BlockIcon, {
          icon: icon
        });

        var label = __('Cover');

        return createElement(Fragment, null, controls, createElement(MediaPlaceholder, {
          icon: placeholderIcon,
          className: className,
          labels: {
            title: label,
            instructions: __('Drag an image or a video, upload a new one or select a file from your library.')
          },
          onSelect: onSelectMedia,
          accept: "image/*,video/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice
        }));
      }

      var classes = classnames(className, dimRatioToClass(dimRatio), {
        'is-dark-theme': this.state.isDark,
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      });
      return createElement(Fragment, null, controls, createElement("div", {
        "data-url": url,
        style: style,
        className: classes
      }, IMAGE_BACKGROUND_TYPE === backgroundType && // Used only to programmatically check if the image is dark or not
      createElement("img", {
        ref: this.imageRef,
        "aria-hidden": true,
        alt: "",
        style: {
          display: 'none'
        },
        src: url
      }), VIDEO_BACKGROUND_TYPE === backgroundType && createElement("video", {
        ref: this.videoRef,
        className: "wp-block-cover__video-background",
        autoPlay: true,
        muted: true,
        loop: true,
        src: url
      }), createElement("div", {
        className: "wp-block-cover__inner-container"
      }, createElement(InnerBlocks, {
        template: INNER_BLOCKS_TEMPLATE,
        allowedBlocks: INNER_BLOCKS_ALLOWED_BLOCKS
      }))));
    }
  }, {
    key: "handleBackgroundMode",
    value: function handleBackgroundMode(prevProps) {
      var _this2 = this;

      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          overlayColor = _this$props2.overlayColor;
      var dimRatio = attributes.dimRatio,
          url = attributes.url; // If opacity is greater than 50 the dominant color is the overlay color,
      // so use that color for the dark mode computation.

      if (dimRatio > 50) {
        if (prevProps && prevProps.attributes.dimRatio > 50 && prevProps.overlayColor.color === overlayColor.color) {
          // No relevant prop changes happened there is no need to apply any change.
          return;
        }

        if (!overlayColor.color) {
          // If no overlay color exists the overlay color is black (isDark )
          this.changeIsDarkIfRequired(true);
          return;
        }

        this.changeIsDarkIfRequired(tinycolor(overlayColor.color).isDark());
        return;
      } // If opacity is lower than 50 the dominant color is the image or video color,
      // so use that color for the dark mode computation.


      if (prevProps && prevProps.attributes.dimRatio <= 50 && prevProps.attributes.url === url) {
        // No relevant prop changes happened there is no need to apply any change.
        return;
      }

      var backgroundType = attributes.backgroundType;
      var element;

      switch (backgroundType) {
        case IMAGE_BACKGROUND_TYPE:
          element = this.imageRef.current;
          break;

        case VIDEO_BACKGROUND_TYPE:
          element = this.videoRef.current;
          break;
      }

      if (!element) {
        return;
      }

      retrieveFastAverageColor().getColorAsync(element, function (color) {
        _this2.changeIsDarkIfRequired(color.isDark);
      });
    }
  }, {
    key: "changeIsDarkIfRequired",
    value: function changeIsDarkIfRequired(newIsDark) {
      if (this.state.isDark !== newIsDark) {
        this.setState({
          isDark: newIsDark
        });
      }
    }
  }]);

  return CoverEdit;
}(Component);

export default compose([withColors({
  overlayColor: 'background-color'
}), withNotices])(CoverEdit);
//# sourceMappingURL=edit.js.map