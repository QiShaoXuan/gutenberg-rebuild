import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { createBlobURL } from '@wordpress/blob';
import { createBlock } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/video';
export var settings = {
  title: __('Video'),
  description: __('Embed a video from your media library or upload a new one.'),
  icon: icon,
  keywords: [__('movie')],
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

        var block = createBlock('core/video', {
          src: createBlobURL(file)
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
  edit: edit,
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
    return createElement("figure", null, src && createElement("video", {
      autoPlay: autoplay,
      controls: controls,
      loop: loop,
      muted: muted,
      poster: poster,
      preload: preload !== 'metadata' ? preload : undefined,
      src: src,
      playsInline: playsInline
    }), !RichText.isEmpty(caption) && createElement(RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));
  }
};
//# sourceMappingURL=index.js.map