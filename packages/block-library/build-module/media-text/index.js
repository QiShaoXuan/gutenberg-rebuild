import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { createBlock } from '@wordpress/blocks';
import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
var DEFAULT_MEDIA_WIDTH = 50;
export var name = 'core/media-text';
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
export var settings = {
  title: __('Media & Text'),
  description: __('Set media and words side-by-side for a richer layout.'),
  icon: icon,
  category: 'layout',
  keywords: [__('image'), __('video')],
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
        return createBlock('core/media-text', {
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
        return createBlock('core/media-text', {
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
        return createBlock('core/image', {
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
        return createBlock('core/video', {
          id: mediaId,
          src: mediaUrl
        });
      }
    }]
  },
  edit: edit,
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
        return createElement("img", {
          src: mediaUrl,
          alt: mediaAlt,
          className: mediaId && mediaType === 'image' ? "wp-image-".concat(mediaId) : null
        });
      },
      video: function video() {
        return createElement("video", {
          controls: true,
          src: mediaUrl
        });
      }
    };
    var backgroundClass = getColorClassName('background-color', backgroundColor);
    var className = classnames((_classnames = {
      'has-media-on-the-right': 'right' === mediaPosition
    }, _defineProperty(_classnames, backgroundClass, backgroundClass), _defineProperty(_classnames, 'is-stacked-on-mobile', isStackedOnMobile), _defineProperty(_classnames, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment), _classnames));
    var gridTemplateColumns;

    if (mediaWidth !== DEFAULT_MEDIA_WIDTH) {
      gridTemplateColumns = 'right' === mediaPosition ? "auto ".concat(mediaWidth, "%") : "".concat(mediaWidth, "% auto");
    }

    var style = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      gridTemplateColumns: gridTemplateColumns
    };
    return createElement("div", {
      className: className,
      style: style
    }, createElement("figure", {
      className: "wp-block-media-text__media"
    }, (mediaTypeRenders[mediaType] || noop)()), createElement("div", {
      className: "wp-block-media-text__content"
    }, createElement(InnerBlocks.Content, null)));
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
          return createElement("img", {
            src: mediaUrl,
            alt: mediaAlt
          });
        },
        video: function video() {
          return createElement("video", {
            controls: true,
            src: mediaUrl
          });
        }
      };
      var backgroundClass = getColorClassName('background-color', backgroundColor);
      var className = classnames((_classnames2 = {
        'has-media-on-the-right': 'right' === mediaPosition
      }, _defineProperty(_classnames2, backgroundClass, backgroundClass), _defineProperty(_classnames2, 'is-stacked-on-mobile', isStackedOnMobile), _classnames2));
      var gridTemplateColumns;

      if (mediaWidth !== DEFAULT_MEDIA_WIDTH) {
        gridTemplateColumns = 'right' === mediaPosition ? "auto ".concat(mediaWidth, "%") : "".concat(mediaWidth, "% auto");
      }

      var style = {
        backgroundColor: backgroundClass ? undefined : customBackgroundColor,
        gridTemplateColumns: gridTemplateColumns
      };
      return createElement("div", {
        className: className,
        style: style
      }, createElement("figure", {
        className: "wp-block-media-text__media"
      }, (mediaTypeRenders[mediaType] || noop)()), createElement("div", {
        className: "wp-block-media-text__content"
      }, createElement(InnerBlocks.Content, null)));
    }
  }]
};
//# sourceMappingURL=index.js.map