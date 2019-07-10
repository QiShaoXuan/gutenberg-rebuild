"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _classnames3 = _interopRequireDefault(require("classnames"));

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _icon = _interopRequireDefault(require("./icon"));

var _edit = _interopRequireWildcard(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var blockAttributes = {
  url: {
    type: 'string'
  },
  id: {
    type: 'number'
  },
  hasParallax: {
    type: 'boolean',
    default: false
  },
  dimRatio: {
    type: 'number',
    default: 50
  },
  overlayColor: {
    type: 'string'
  },
  customOverlayColor: {
    type: 'string'
  },
  backgroundType: {
    type: 'string',
    default: 'image'
  },
  focalPoint: {
    type: 'object'
  }
};
var name = 'core/cover';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Cover'),
  description: (0, _i18n.__)('Add an image or video with a text overlay — great for headers.'),
  icon: _icon.default,
  category: 'common',
  attributes: blockAttributes,
  supports: {
    align: true
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/image'],
      transform: function transform(_ref) {
        var caption = _ref.caption,
            url = _ref.url,
            align = _ref.align,
            id = _ref.id;
        return (0, _blocks.createBlock)('core/cover', {
          title: caption,
          url: url,
          align: align,
          id: id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      transform: function transform(_ref2) {
        var caption = _ref2.caption,
            src = _ref2.src,
            align = _ref2.align,
            id = _ref2.id;
        return (0, _blocks.createBlock)('core/cover', {
          title: caption,
          url: src,
          align: align,
          id: id,
          backgroundType: _edit.VIDEO_BACKGROUND_TYPE
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/image'],
      isMatch: function isMatch(_ref3) {
        var backgroundType = _ref3.backgroundType,
            url = _ref3.url;
        return !url || backgroundType === _edit.IMAGE_BACKGROUND_TYPE;
      },
      transform: function transform(_ref4) {
        var title = _ref4.title,
            url = _ref4.url,
            align = _ref4.align,
            id = _ref4.id;
        return (0, _blocks.createBlock)('core/image', {
          caption: title,
          url: url,
          align: align,
          id: id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      isMatch: function isMatch(_ref5) {
        var backgroundType = _ref5.backgroundType,
            url = _ref5.url;
        return !url || backgroundType === _edit.VIDEO_BACKGROUND_TYPE;
      },
      transform: function transform(_ref6) {
        var title = _ref6.title,
            url = _ref6.url,
            align = _ref6.align,
            id = _ref6.id;
        return (0, _blocks.createBlock)('core/video', {
          caption: title,
          src: url,
          id: id,
          align: align
        });
      }
    }]
  },
  save: function save(_ref7) {
    var attributes = _ref7.attributes;
    var backgroundType = attributes.backgroundType,
        customOverlayColor = attributes.customOverlayColor,
        dimRatio = attributes.dimRatio,
        focalPoint = attributes.focalPoint,
        hasParallax = attributes.hasParallax,
        overlayColor = attributes.overlayColor,
        url = attributes.url;
    var overlayColorClass = (0, _blockEditor.getColorClassName)('background-color', overlayColor);
    var style = backgroundType === _edit.IMAGE_BACKGROUND_TYPE ? (0, _edit.backgroundImageStyles)(url) : {};

    if (!overlayColorClass) {
      style.backgroundColor = customOverlayColor;
    }

    if (focalPoint && !hasParallax) {
      style.backgroundPosition = "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%");
    }

    var classes = (0, _classnames3.default)((0, _edit.dimRatioToClass)(dimRatio), overlayColorClass, {
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax
    });
    return (0, _element.createElement)("div", {
      className: classes,
      style: style
    }, _edit.VIDEO_BACKGROUND_TYPE === backgroundType && url && (0, _element.createElement)("video", {
      className: "wp-block-cover__video-background",
      autoPlay: true,
      muted: true,
      loop: true,
      src: url
    }), (0, _element.createElement)("div", {
      className: "wp-block-cover__inner-container"
    }, (0, _element.createElement)(_blockEditor.InnerBlocks.Content, null)));
  },
  edit: _edit.default,
  deprecated: [{
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
      title: {
        type: 'string',
        source: 'html',
        selector: 'p'
      },
      contentAlign: {
        type: 'string',
        default: 'center'
      }
    }),
    supports: {
      align: true
    },
    save: function save(_ref8) {
      var attributes = _ref8.attributes;
      var backgroundType = attributes.backgroundType,
          contentAlign = attributes.contentAlign,
          customOverlayColor = attributes.customOverlayColor,
          dimRatio = attributes.dimRatio,
          focalPoint = attributes.focalPoint,
          hasParallax = attributes.hasParallax,
          overlayColor = attributes.overlayColor,
          title = attributes.title,
          url = attributes.url;
      var overlayColorClass = (0, _blockEditor.getColorClassName)('background-color', overlayColor);
      var style = backgroundType === _edit.IMAGE_BACKGROUND_TYPE ? (0, _edit.backgroundImageStyles)(url) : {};

      if (!overlayColorClass) {
        style.backgroundColor = customOverlayColor;
      }

      if (focalPoint && !hasParallax) {
        style.backgroundPosition = "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%");
      }

      var classes = (0, _classnames3.default)((0, _edit.dimRatioToClass)(dimRatio), overlayColorClass, (0, _defineProperty2.default)({
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'));
      return (0, _element.createElement)("div", {
        className: classes,
        style: style
      }, _edit.VIDEO_BACKGROUND_TYPE === backgroundType && url && (0, _element.createElement)("video", {
        className: "wp-block-cover__video-background",
        autoPlay: true,
        muted: true,
        loop: true,
        src: url
      }), !_blockEditor.RichText.isEmpty(title) && (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "p",
        className: "wp-block-cover-text",
        value: title
      }));
    },
    migrate: function migrate(attributes) {
      return [(0, _lodash.omit)(attributes, ['title', 'contentAlign']), [(0, _blocks.createBlock)('core/paragraph', {
        content: attributes.title,
        align: attributes.contentAlign,
        fontSize: 'large',
        placeholder: (0, _i18n.__)('Write title…')
      })]];
    }
  }, {
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
      title: {
        type: 'string',
        source: 'html',
        selector: 'p'
      },
      contentAlign: {
        type: 'string',
        default: 'center'
      },
      align: {
        type: 'string'
      }
    }),
    supports: {
      className: false
    },
    save: function save(_ref9) {
      var attributes = _ref9.attributes;
      var url = attributes.url,
          title = attributes.title,
          hasParallax = attributes.hasParallax,
          dimRatio = attributes.dimRatio,
          align = attributes.align,
          contentAlign = attributes.contentAlign,
          overlayColor = attributes.overlayColor,
          customOverlayColor = attributes.customOverlayColor;
      var overlayColorClass = (0, _blockEditor.getColorClassName)('background-color', overlayColor);
      var style = (0, _edit.backgroundImageStyles)(url);

      if (!overlayColorClass) {
        style.backgroundColor = customOverlayColor;
      }

      var classes = (0, _classnames3.default)('wp-block-cover-image', (0, _edit.dimRatioToClass)(dimRatio), overlayColorClass, (0, _defineProperty2.default)({
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'), align ? "align".concat(align) : null);
      return (0, _element.createElement)("div", {
        className: classes,
        style: style
      }, !_blockEditor.RichText.isEmpty(title) && (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "p",
        className: "wp-block-cover-image-text",
        value: title
      }));
    }
  }, {
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
      align: {
        type: 'string'
      },
      title: {
        type: 'string',
        source: 'html',
        selector: 'h2'
      },
      contentAlign: {
        type: 'string',
        default: 'center'
      }
    }),
    save: function save(_ref10) {
      var attributes = _ref10.attributes;
      var url = attributes.url,
          title = attributes.title,
          hasParallax = attributes.hasParallax,
          dimRatio = attributes.dimRatio,
          align = attributes.align;
      var style = (0, _edit.backgroundImageStyles)(url);
      var classes = (0, _classnames3.default)((0, _edit.dimRatioToClass)(dimRatio), {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, align ? "align".concat(align) : null);
      return (0, _element.createElement)("section", {
        className: classes,
        style: style
      }, (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "h2",
        value: title
      }));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map