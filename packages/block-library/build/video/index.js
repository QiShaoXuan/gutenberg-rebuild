"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _blob = require("@wordpress/blob");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/video';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Video'),
  description: (0, _i18n.__)('Embed a video from your media library or upload a new one.'),
  icon: _icon.default,
  keywords: [(0, _i18n.__)('movie')],
  category: 'common',
  attributes: {
    autoplay: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'autoplay'
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption'
    },
    controls: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'controls',
      default: true
    },
    id: {
      type: 'number'
    },
    loop: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'loop'
    },
    muted: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'muted'
    },
    poster: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'poster'
    },
    preload: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'preload',
      default: 'metadata'
    },
    src: {
      type: 'string',
      source: 'attribute',
      selector: 'video',
      attribute: 'src'
    },
    playsInline: {
      type: 'boolean',
      source: 'attribute',
      selector: 'video',
      attribute: 'playsinline'
    }
  },
  transforms: {
    from: [{
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length === 1 && files[0].type.indexOf('video/') === 0;
      },
      transform: function transform(files) {
        var file = files[0]; // We don't need to upload the media directly here
        // It's already done as part of the `componentDidMount`
        // in the video block

        var block = (0, _blocks.createBlock)('core/video', {
          src: (0, _blob.createBlobURL)(file)
        });
        return block;
      }
    }, {
      type: 'shortcode',
      tag: 'video',
      attributes: {
        src: {
          type: 'string',
          shortcode: function shortcode(_ref) {
            var src = _ref.named.src;
            return src;
          }
        },
        poster: {
          type: 'string',
          shortcode: function shortcode(_ref2) {
            var poster = _ref2.named.poster;
            return poster;
          }
        },
        loop: {
          type: 'string',
          shortcode: function shortcode(_ref3) {
            var loop = _ref3.named.loop;
            return loop;
          }
        },
        autoplay: {
          type: 'string',
          shortcode: function shortcode(_ref4) {
            var autoplay = _ref4.named.autoplay;
            return autoplay;
          }
        },
        preload: {
          type: 'string',
          shortcode: function shortcode(_ref5) {
            var preload = _ref5.named.preload;
            return preload;
          }
        }
      }
    }]
  },
  supports: {
    align: true
  },
  edit: _edit.default,
  save: function save(_ref6) {
    var attributes = _ref6.attributes;
    var autoplay = attributes.autoplay,
        caption = attributes.caption,
        controls = attributes.controls,
        loop = attributes.loop,
        muted = attributes.muted,
        poster = attributes.poster,
        preload = attributes.preload,
        src = attributes.src,
        playsInline = attributes.playsInline;
    return (0, _element.createElement)("figure", null, src && (0, _element.createElement)("video", {
      autoPlay: autoplay,
      controls: controls,
      loop: loop,
      muted: muted,
      poster: poster,
      preload: preload !== 'metadata' ? preload : undefined,
      src: src,
      playsInline: playsInline
    }), !_blockEditor.RichText.isEmpty(caption) && (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map