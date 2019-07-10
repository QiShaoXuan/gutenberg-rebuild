"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

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
var DEFAULT_MEDIA_WIDTH = 50;
var name = 'core/media-text';
exports.name = name;
var blockAttributes = {
  align: {
    type: 'string',
    default: 'wide'
  },
  backgroundColor: {
    type: 'string'
  },
  customBackgroundColor: {
    type: 'string'
  },
  mediaAlt: {
    type: 'string',
    source: 'attribute',
    selector: 'figure img',
    attribute: 'alt',
    default: ''
  },
  mediaPosition: {
    type: 'string',
    default: 'left'
  },
  mediaId: {
    type: 'number'
  },
  mediaUrl: {
    type: 'string',
    source: 'attribute',
    selector: 'figure video,figure img',
    attribute: 'src'
  },
  mediaType: {
    type: 'string'
  },
  mediaWidth: {
    type: 'number',
    default: 50
  },
  isStackedOnMobile: {
    type: 'boolean',
    default: false
  },
  verticalAlignment: {
    type: 'string'
  }
};
var settings = {
  title: (0, _i18n.__)('Media & Text'),
  description: (0, _i18n.__)('Set media and words side-by-side for a richer layout.'),
  icon: _icon.default,
  category: 'layout',
  keywords: [(0, _i18n.__)('image'), (0, _i18n.__)('video')],
  attributes: blockAttributes,
  supports: {
    align: ['wide', 'full'],
    html: false
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/image'],
      transform: function transform(_ref) {
        var alt = _ref.alt,
            url = _ref.url,
            id = _ref.id;
        return (0, _blocks.createBlock)('core/media-text', {
          mediaAlt: alt,
          mediaId: id,
          mediaUrl: url,
          mediaType: 'image'
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      transform: function transform(_ref2) {
        var src = _ref2.src,
            id = _ref2.id;
        return (0, _blocks.createBlock)('core/media-text', {
          mediaId: id,
          mediaUrl: src,
          mediaType: 'video'
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/image'],
      isMatch: function isMatch(_ref3) {
        var mediaType = _ref3.mediaType,
            mediaUrl = _ref3.mediaUrl;
        return !mediaUrl || mediaType === 'image';
      },
      transform: function transform(_ref4) {
        var mediaAlt = _ref4.mediaAlt,
            mediaId = _ref4.mediaId,
            mediaUrl = _ref4.mediaUrl;
        return (0, _blocks.createBlock)('core/image', {
          alt: mediaAlt,
          id: mediaId,
          url: mediaUrl
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      isMatch: function isMatch(_ref5) {
        var mediaType = _ref5.mediaType,
            mediaUrl = _ref5.mediaUrl;
        return !mediaUrl || mediaType === 'video';
      },
      transform: function transform(_ref6) {
        var mediaId = _ref6.mediaId,
            mediaUrl = _ref6.mediaUrl;
        return (0, _blocks.createBlock)('core/video', {
          id: mediaId,
          src: mediaUrl
        });
      }
    }]
  },
  edit: _edit.default,
  save: function save(_ref7) {
    var _classnames;

    var attributes = _ref7.attributes;
    var backgroundColor = attributes.backgroundColor,
        customBackgroundColor = attributes.customBackgroundColor,
        isStackedOnMobile = attributes.isStackedOnMobile,
        mediaAlt = attributes.mediaAlt,
        mediaPosition = attributes.mediaPosition,
        mediaType = attributes.mediaType,
        mediaUrl = attributes.mediaUrl,
        mediaWidth = attributes.mediaWidth,
        mediaId = attributes.mediaId,
        verticalAlignment = attributes.verticalAlignment;
    var mediaTypeRenders = {
      image: function image() {
        return (0, _element.createElement)("img", {
          src: mediaUrl,
          alt: mediaAlt,
          className: mediaId && mediaType === 'image' ? "wp-image-".concat(mediaId) : null
        });
      },
      video: function video() {
        return (0, _element.createElement)("video", {
          controls: true,
          src: mediaUrl
        });
      }
    };
    var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
    var className = (0, _classnames3.default)((_classnames = {
      'has-media-on-the-right': 'right' === mediaPosition
    }, (0, _defineProperty2.default)(_classnames, backgroundClass, backgroundClass), (0, _defineProperty2.default)(_classnames, 'is-stacked-on-mobile', isStackedOnMobile), (0, _defineProperty2.default)(_classnames, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment), _classnames));
    var gridTemplateColumns;

    if (mediaWidth !== DEFAULT_MEDIA_WIDTH) {
      gridTemplateColumns = 'right' === mediaPosition ? "auto ".concat(mediaWidth, "%") : "".concat(mediaWidth, "% auto");
    }

    var style = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      gridTemplateColumns: gridTemplateColumns
    };
    return (0, _element.createElement)("div", {
      className: className,
      style: style
    }, (0, _element.createElement)("figure", {
      className: "wp-block-media-text__media"
    }, (mediaTypeRenders[mediaType] || _lodash.noop)()), (0, _element.createElement)("div", {
      className: "wp-block-media-text__content"
    }, (0, _element.createElement)(_blockEditor.InnerBlocks.Content, null)));
  },
  deprecated: [{
    attributes: blockAttributes,
    save: function save(_ref8) {
      var _classnames2;

      var attributes = _ref8.attributes;
      var backgroundColor = attributes.backgroundColor,
          customBackgroundColor = attributes.customBackgroundColor,
          isStackedOnMobile = attributes.isStackedOnMobile,
          mediaAlt = attributes.mediaAlt,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaUrl = attributes.mediaUrl,
          mediaWidth = attributes.mediaWidth;
      var mediaTypeRenders = {
        image: function image() {
          return (0, _element.createElement)("img", {
            src: mediaUrl,
            alt: mediaAlt
          });
        },
        video: function video() {
          return (0, _element.createElement)("video", {
            controls: true,
            src: mediaUrl
          });
        }
      };
      var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
      var className = (0, _classnames3.default)((_classnames2 = {
        'has-media-on-the-right': 'right' === mediaPosition
      }, (0, _defineProperty2.default)(_classnames2, backgroundClass, backgroundClass), (0, _defineProperty2.default)(_classnames2, 'is-stacked-on-mobile', isStackedOnMobile), _classnames2));
      var gridTemplateColumns;

      if (mediaWidth !== DEFAULT_MEDIA_WIDTH) {
        gridTemplateColumns = 'right' === mediaPosition ? "auto ".concat(mediaWidth, "%") : "".concat(mediaWidth, "% auto");
      }

      var style = {
        backgroundColor: backgroundClass ? undefined : customBackgroundColor,
        gridTemplateColumns: gridTemplateColumns
      };
      return (0, _element.createElement)("div", {
        className: className,
        style: style
      }, (0, _element.createElement)("figure", {
        className: "wp-block-media-text__media"
      }, (mediaTypeRenders[mediaType] || _lodash.noop)()), (0, _element.createElement)("div", {
        className: "wp-block-media-text__content"
      }, (0, _element.createElement)(_blockEditor.InnerBlocks.Content, null)));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map