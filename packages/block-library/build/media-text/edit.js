"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _mediaContainer = _interopRequireDefault(require("./media-container"));

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
 * Constants
 */
var ALLOWED_BLOCKS = ['core/button', 'core/paragraph', 'core/heading', 'core/list'];
var TEMPLATE = [['core/paragraph', {
  fontSize: 'large',
  placeholder: (0, _i18n._x)('Content…', 'content placeholder')
}]];

var MediaTextEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MediaTextEdit, _Component);

  function MediaTextEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, MediaTextEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MediaTextEdit).apply(this, arguments));
    _this.onSelectMedia = _this.onSelectMedia.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onWidthChange = _this.onWidthChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.commitWidthChange = _this.commitWidthChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      mediaWidth: null
    };
    return _this;
  }

  (0, _createClass2.default)(MediaTextEdit, [{
    key: "onSelectMedia",
    value: function onSelectMedia(media) {
      var setAttributes = this.props.setAttributes;
      var mediaType;
      var src; // for media selections originated from a file upload.

      if (media.media_type) {
        if (media.media_type === 'image') {
          mediaType = 'image';
        } else {
          // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
          // video contain the media type of 'file' in the object returned from the rest api.
          mediaType = 'video';
        }
      } else {
        // for media selections originated from existing files in the media library.
        mediaType = media.type;
      }

      if (mediaType === 'image') {
        // Try the "large" size URL, falling back to the "full" size URL below.
        src = (0, _lodash.get)(media, ['sizes', 'large', 'url']) || (0, _lodash.get)(media, ['media_details', 'sizes', 'large', 'source_url']);
      }

      setAttributes({
        mediaAlt: media.alt,
        mediaId: media.id,
        mediaType: mediaType,
        mediaUrl: src || media.url
      });
    }
  }, {
    key: "onWidthChange",
    value: function onWidthChange(width) {
      this.setState({
        mediaWidth: width
      });
    }
  }, {
    key: "commitWidthChange",
    value: function commitWidthChange(width) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        mediaWidth: width
      });
      this.setState({
        mediaWidth: null
      });
    }
  }, {
    key: "renderMediaArea",
    value: function renderMediaArea() {
      var attributes = this.props.attributes;
      var mediaAlt = attributes.mediaAlt,
          mediaId = attributes.mediaId,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaUrl = attributes.mediaUrl,
          mediaWidth = attributes.mediaWidth;
      return (0, _element.createElement)(_mediaContainer.default, (0, _extends2.default)({
        className: "block-library-media-text__media-container",
        onSelectMedia: this.onSelectMedia,
        onWidthChange: this.onWidthChange,
        commitWidthChange: this.commitWidthChange
      }, {
        mediaAlt: mediaAlt,
        mediaId: mediaId,
        mediaType: mediaType,
        mediaUrl: mediaUrl,
        mediaPosition: mediaPosition,
        mediaWidth: mediaWidth
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          className = _this$props.className,
          backgroundColor = _this$props.backgroundColor,
          isSelected = _this$props.isSelected,
          setAttributes = _this$props.setAttributes,
          setBackgroundColor = _this$props.setBackgroundColor;
      var isStackedOnMobile = attributes.isStackedOnMobile,
          mediaAlt = attributes.mediaAlt,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaWidth = attributes.mediaWidth,
          verticalAlignment = attributes.verticalAlignment;
      var temporaryMediaWidth = this.state.mediaWidth;
      var classNames = (0, _classnames2.default)(className, (_classnames = {
        'has-media-on-the-right': 'right' === mediaPosition,
        'is-selected': isSelected
      }, (0, _defineProperty2.default)(_classnames, backgroundColor.class, backgroundColor.class), (0, _defineProperty2.default)(_classnames, 'is-stacked-on-mobile', isStackedOnMobile), (0, _defineProperty2.default)(_classnames, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment), _classnames));
      var widthString = "".concat(temporaryMediaWidth || mediaWidth, "%");
      var style = {
        gridTemplateColumns: 'right' === mediaPosition ? "auto ".concat(widthString) : "".concat(widthString, " auto"),
        backgroundColor: backgroundColor.color
      };
      var colorSettings = [{
        value: backgroundColor.color,
        onChange: setBackgroundColor,
        label: (0, _i18n.__)('Background Color')
      }];
      var toolbarControls = [{
        icon: 'align-pull-left',
        title: (0, _i18n.__)('Show media on left'),
        isActive: mediaPosition === 'left',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'left'
          });
        }
      }, {
        icon: 'align-pull-right',
        title: (0, _i18n.__)('Show media on right'),
        isActive: mediaPosition === 'right',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'right'
          });
        }
      }];

      var onMediaAltChange = function onMediaAltChange(newMediaAlt) {
        setAttributes({
          mediaAlt: newMediaAlt
        });
      };

      var onVerticalAlignmentChange = function onVerticalAlignmentChange(alignment) {
        setAttributes({
          verticalAlignment: alignment
        });
      };

      var mediaTextGeneralSettings = (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Media & Text Settings')
      }, (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Stack on mobile'),
        checked: isStackedOnMobile,
        onChange: function onChange() {
          return setAttributes({
            isStackedOnMobile: !isStackedOnMobile
          });
        }
      }), mediaType === 'image' && (0, _element.createElement)(_components.TextareaControl, {
        label: (0, _i18n.__)('Alt Text (Alternative Text)'),
        value: mediaAlt,
        onChange: onMediaAltChange,
        help: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.ExternalLink, {
          href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
        }, (0, _i18n.__)('Describe the purpose of the image')), (0, _i18n.__)('Leave empty if the image is purely decorative.'))
      }));
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, mediaTextGeneralSettings, (0, _element.createElement)(_blockEditor.PanelColorSettings, {
        title: (0, _i18n.__)('Color Settings'),
        initialOpen: false,
        colorSettings: colorSettings
      })), (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.Toolbar, {
        controls: toolbarControls
      }), (0, _element.createElement)(_blockEditor.BlockVerticalAlignmentToolbar, {
        onChange: onVerticalAlignmentChange,
        value: verticalAlignment
      })), (0, _element.createElement)("div", {
        className: classNames,
        style: style
      }, this.renderMediaArea(), (0, _element.createElement)(_blockEditor.InnerBlocks, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE,
        templateInsertUpdatesSelection: false
      })));
    }
  }]);
  return MediaTextEdit;
}(_element.Component);

var _default = (0, _blockEditor.withColors)('backgroundColor')(MediaTextEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map