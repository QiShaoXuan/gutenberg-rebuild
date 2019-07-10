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
var name = 'core/audio';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Audio'),
  description: (0, _i18n.__)('Embed a simple audio player.'),
  icon: _icon.default,
  category: 'common',
  attributes: {
    src: {
      type: 'string',
      source: 'attribute',
      selector: 'audio',
      attribute: 'src'
    },
    caption: {
      type: 'string',
      source: 'html',
      selector: 'figcaption'
    },
    id: {
      type: 'number'
    },
    autoplay: {
      type: 'boolean',
      source: 'attribute',
      selector: 'audio',
      attribute: 'autoplay'
    },
    loop: {
      type: 'boolean',
      source: 'attribute',
      selector: 'audio',
      attribute: 'loop'
    },
    preload: {
      type: 'string',
      source: 'attribute',
      selector: 'audio',
      attribute: 'preload'
    }
  },
  transforms: {
    from: [{
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length === 1 && files[0].type.indexOf('audio/') === 0;
      },
      transform: function transform(files) {
        var file = files[0]; // We don't need to upload the media directly here
        // It's already done as part of the `componentDidMount`
        // in the audio block

        var block = (0, _blocks.createBlock)('core/audio', {
          src: (0, _blob.createBlobURL)(file)
        });
        return block;
      }
    }, {
      type: 'shortcode',
      tag: 'audio',
      attributes: {
        src: {
          type: 'string',
          shortcode: function shortcode(_ref) {
            var src = _ref.named.src;
            return src;
          }
        },
        loop: {
          type: 'string',
          shortcode: function shortcode(_ref2) {
            var loop = _ref2.named.loop;
            return loop;
          }
        },
        autoplay: {
          type: 'srting',
          shortcode: function shortcode(_ref3) {
            var autoplay = _ref3.named.autoplay;
            return autoplay;
          }
        },
        preload: {
          type: 'string',
          shortcode: function shortcode(_ref4) {
            var preload = _ref4.named.preload;
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
  save: function save(_ref5) {
    var attributes = _ref5.attributes;
    var autoplay = attributes.autoplay,
        caption = attributes.caption,
        loop = attributes.loop,
        preload = attributes.preload,
        src = attributes.src;
    return (0, _element.createElement)("figure", null, (0, _element.createElement)("audio", {
      controls: "controls",
      src: src,
      autoPlay: autoplay,
      loop: loop,
      preload: preload
    }), !_blockEditor.RichText.isEmpty(caption) && (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map