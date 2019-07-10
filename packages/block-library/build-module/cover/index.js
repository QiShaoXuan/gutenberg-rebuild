import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { omit } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { createBlock } from '@wordpress/blocks';
import { InnerBlocks, RichText, getColorClassName } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import icon from './icon';
import { default as CoverEdit, IMAGE_BACKGROUND_TYPE, VIDEO_BACKGROUND_TYPE, backgroundImageStyles, dimRatioToClass } from './edit';
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
export var name = 'core/cover';
export var settings = {
  title: __('Cover'),
  description: __('Add an image or video with a text overlay — great for headers.'),
  icon: icon,
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
        return createBlock('core/cover', {
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
        return createBlock('core/cover', {
          title: caption,
          url: src,
          align: align,
          id: id,
          backgroundType: VIDEO_BACKGROUND_TYPE
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/image'],
      isMatch: function isMatch(_ref3) {
        var backgroundType = _ref3.backgroundType,
            url = _ref3.url;
        return !url || backgroundType === IMAGE_BACKGROUND_TYPE;
      },
      transform: function transform(_ref4) {
        var title = _ref4.title,
            url = _ref4.url,
            align = _ref4.align,
            id = _ref4.id;
        return createBlock('core/image', {
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
        return !url || backgroundType === VIDEO_BACKGROUND_TYPE;
      },
      transform: function transform(_ref6) {
        var title = _ref6.title,
            url = _ref6.url,
            align = _ref6.align,
            id = _ref6.id;
        return createBlock('core/video', {
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
    var overlayColorClass = getColorClassName('background-color', overlayColor);
    var style = backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {};

    if (!overlayColorClass) {
      style.backgroundColor = customOverlayColor;
    }

    if (focalPoint && !hasParallax) {
      style.backgroundPosition = "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%");
    }

    var classes = classnames(dimRatioToClass(dimRatio), overlayColorClass, {
      'has-background-dim': dimRatio !== 0,
      'has-parallax': hasParallax
    });
    return createElement("div", {
      className: classes,
      style: style
    }, VIDEO_BACKGROUND_TYPE === backgroundType && url && createElement("video", {
      className: "wp-block-cover__video-background",
      autoPlay: true,
      muted: true,
      loop: true,
      src: url
    }), createElement("div", {
      className: "wp-block-cover__inner-container"
    }, createElement(InnerBlocks.Content, null)));
  },
  edit: CoverEdit,
  deprecated: [{
    attributes: _objectSpread({}, blockAttributes, {
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
      var overlayColorClass = getColorClassName('background-color', overlayColor);
      var style = backgroundType === IMAGE_BACKGROUND_TYPE ? backgroundImageStyles(url) : {};

      if (!overlayColorClass) {
        style.backgroundColor = customOverlayColor;
      }

      if (focalPoint && !hasParallax) {
        style.backgroundPosition = "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%");
      }

      var classes = classnames(dimRatioToClass(dimRatio), overlayColorClass, _defineProperty({
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'));
      return createElement("div", {
        className: classes,
        style: style
      }, VIDEO_BACKGROUND_TYPE === backgroundType && url && createElement("video", {
        className: "wp-block-cover__video-background",
        autoPlay: true,
        muted: true,
        loop: true,
        src: url
      }), !RichText.isEmpty(title) && createElement(RichText.Content, {
        tagName: "p",
        className: "wp-block-cover-text",
        value: title
      }));
    },
    migrate: function migrate(attributes) {
      return [omit(attributes, ['title', 'contentAlign']), [createBlock('core/paragraph', {
        content: attributes.title,
        align: attributes.contentAlign,
        fontSize: 'large',
        placeholder: __('Write title…')
      })]];
    }
  }, {
    attributes: _objectSpread({}, blockAttributes, {
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
      var overlayColorClass = getColorClassName('background-color', overlayColor);
      var style = backgroundImageStyles(url);

      if (!overlayColorClass) {
        style.backgroundColor = customOverlayColor;
      }

      var classes = classnames('wp-block-cover-image', dimRatioToClass(dimRatio), overlayColorClass, _defineProperty({
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, "has-".concat(contentAlign, "-content"), contentAlign !== 'center'), align ? "align".concat(align) : null);
      return createElement("div", {
        className: classes,
        style: style
      }, !RichText.isEmpty(title) && createElement(RichText.Content, {
        tagName: "p",
        className: "wp-block-cover-image-text",
        value: title
      }));
    }
  }, {
    attributes: _objectSpread({}, blockAttributes, {
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
      var style = backgroundImageStyles(url);
      var classes = classnames(dimRatioToClass(dimRatio), {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax
      }, align ? "align".concat(align) : null);
      return createElement("section", {
        className: classes,
        style: style
      }, createElement(RichText.Content, {
        tagName: "h2",
        value: title
      }));
    }
  }]
};
//# sourceMappingURL=index.js.map