"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backgroundImageStyles = backgroundImageStyles;
exports.dimRatioToClass = dimRatioToClass;
exports.default = exports.VIDEO_BACKGROUND_TYPE = exports.IMAGE_BACKGROUND_TYPE = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _fastAverageColor = _interopRequireDefault(require("fast-average-color"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _editor = require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _icon = _interopRequireDefault(require("./icon"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Module Constants
 */
var IMAGE_BACKGROUND_TYPE = 'image';
exports.IMAGE_BACKGROUND_TYPE = IMAGE_BACKGROUND_TYPE;
var VIDEO_BACKGROUND_TYPE = 'video';
exports.VIDEO_BACKGROUND_TYPE = VIDEO_BACKGROUND_TYPE;
var ALLOWED_MEDIA_TYPES = ['image', 'video'];
var INNER_BLOCKS_TEMPLATE = [['core/paragraph', {
  align: 'center',
  fontSize: 'large',
  placeholder: (0, _i18n.__)('Write title…')
}]];
var INNER_BLOCKS_ALLOWED_BLOCKS = ['core/button', 'core/heading', 'core/paragraph'];

function retrieveFastAverageColor() {
  if (!retrieveFastAverageColor.fastAverageColor) {
    retrieveFastAverageColor.fastAverageColor = new _fastAverageColor.default();
  }

  return retrieveFastAverageColor.fastAverageColor;
}

function backgroundImageStyles(url) {
  return url ? {
    backgroundImage: "url(".concat(url, ")")
  } : {};
}

function dimRatioToClass(ratio) {
  return ratio === 0 || ratio === 50 ? null : 'has-background-dim-' + 10 * Math.round(ratio / 10);
}

var CoverEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CoverEdit, _Component);

  function CoverEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, CoverEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CoverEdit).apply(this, arguments));
    _this.state = {
      isDark: false
    };
    _this.imageRef = (0, _element.createRef)();
    _this.videoRef = (0, _element.createRef)();
    _this.changeIsDarkIfRequired = _this.changeIsDarkIfRequired.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(CoverEdit, [{
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

        setAttributes((0, _objectSpread2.default)({
          url: media.url,
          id: media.id,
          backgroundType: mediaType
        }, mediaType === VIDEO_BACKGROUND_TYPE ? {
          focalPoint: undefined,
          hasParallax: undefined
        } : {}));
      };

      var toggleParallax = function toggleParallax() {
        setAttributes((0, _objectSpread2.default)({
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

      var style = (0, _objectSpread2.default)({}, backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {}, {
        backgroundColor: overlayColor.color
      });

      if (focalPoint) {
        style.backgroundPosition = "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%");
      }

      var controls = (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, null, !!url && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.MediaUploadCheck, null, (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_editor.MediaUpload, {
        onSelect: onSelectMedia,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        value: id,
        render: function render(_ref) {
          var open = _ref.open;
          return (0, _element.createElement)(_components.IconButton, {
            className: "components-toolbar__control",
            label: (0, _i18n.__)('Edit media'),
            icon: "edit",
            onClick: open
          });
        }
      }))))), !!url && (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Cover Settings')
      }, IMAGE_BACKGROUND_TYPE === backgroundType && (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Fixed Background'),
        checked: hasParallax,
        onChange: toggleParallax
      }), IMAGE_BACKGROUND_TYPE === backgroundType && !hasParallax && (0, _element.createElement)(_components.FocalPointPicker, {
        label: (0, _i18n.__)('Focal Point Picker'),
        url: url,
        value: focalPoint,
        onChange: function onChange(value) {
          return setAttributes({
            focalPoint: value
          });
        }
      }), (0, _element.createElement)(_editor.PanelColorSettings, {
        title: (0, _i18n.__)('Overlay'),
        initialOpen: true,
        colorSettings: [{
          value: overlayColor.color,
          onChange: setOverlayColor,
          label: (0, _i18n.__)('Overlay Color')
        }]
      }, (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Background Opacity'),
        value: dimRatio,
        onChange: setDimRatio,
        min: 0,
        max: 100,
        step: 10,
        required: true
      })))));

      if (!url) {
        var placeholderIcon = (0, _element.createElement)(_editor.BlockIcon, {
          icon: _icon.default
        });
        var label = (0, _i18n.__)('Cover');
        return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)(_editor.MediaPlaceholder, {
          icon: placeholderIcon,
          className: className,
          labels: {
            title: label,
            instructions: (0, _i18n.__)('Drag an image or a video, upload a new one or select a file from your library.')
          },
          onSelect: onSelectMedia,
          accept: "image/*,video/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice
        }));
      }

      var classes = (0, _classnames.default)(className, dimRatioToClass(dimRatio), {
        'is-dark-theme': this.state.isDark,
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      });
      return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)("div", {
        "data-url": url,
        style: style,
        className: classes
      }, IMAGE_BACKGROUND_TYPE === backgroundType && // Used only to programmatically check if the image is dark or not
      (0, _element.createElement)("img", {
        ref: this.imageRef,
        "aria-hidden": true,
        alt: "",
        style: {
          display: 'none'
        },
        src: url
      }), VIDEO_BACKGROUND_TYPE === backgroundType && (0, _element.createElement)("video", {
        ref: this.videoRef,
        className: "wp-block-cover__video-background",
        autoPlay: true,
        muted: true,
        loop: true,
        src: url
      }), (0, _element.createElement)("div", {
        className: "wp-block-cover__inner-container"
      }, (0, _element.createElement)(_editor.InnerBlocks, {
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

        this.changeIsDarkIfRequired((0, _tinycolor.default)(overlayColor.color).isDark());
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
}(_element.Component);

var _default = (0, _compose.compose)([(0, _editor.withColors)({
  overlayColor: 'background-color'
}), _components.withNotices])(CoverEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map