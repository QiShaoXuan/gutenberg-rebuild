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
export var name = 'core/audio';
export var settings = {
  title: __('Audio'),
  description: __('Embed a simple audio player.'),
  icon: icon,
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

        var block = createBlock('core/audio', {
          src: createBlobURL(file)
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
  edit: edit,
  save: function save(_ref5) {
    var attributes = _ref5.attributes;
    var autoplay = attributes.autoplay,
        caption = attributes.caption,
        loop = attributes.loop,
        preload = attributes.preload,
        src = attributes.src;
    return createElement("figure", null, createElement("audio", {
      controls: "controls",
      src: src,
      autoPlay: autoplay,
      loop: loop,
      preload: preload
    }), !RichText.isEmpty(caption) && createElement(RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));
  }
};
//# sourceMappingURL=index.js.map