import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { createBlobURL } from '@wordpress/blob';
import { createBlock, getBlockAttributes, getPhrasingContentSchema } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/image';
var blockAttributes = {
  url: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'src'
  },
  alt: {
    type: 'string',
    source: 'attribute',
    selector: 'img',
    attribute: 'alt',
    default: ''
  },
  caption: {
    type: 'string',
    source: 'html',
    selector: 'figcaption'
  },
  href: {
    type: 'string',
    source: 'attribute',
    selector: 'figure > a',
    attribute: 'href'
  },
  rel: {
    type: 'string',
    source: 'attribute',
    selector: 'figure > a',
    attribute: 'rel'
  },
  linkClass: {
    type: 'string',
    source: 'attribute',
    selector: 'figure > a',
    attribute: 'class'
  },
  id: {
    type: 'number'
  },
  align: {
    type: 'string'
  },
  width: {
    type: 'number'
  },
  height: {
    type: 'number'
  },
  linkDestination: {
    type: 'string',
    default: 'none'
  },
  linkTarget: {
    type: 'string',
    source: 'attribute',
    selector: 'figure > a',
    attribute: 'target'
  }
};
var imageSchema = {
  img: {
    attributes: ['src', 'alt'],
    classes: ['alignleft', 'aligncenter', 'alignright', 'alignnone', /^wp-image-\d+$/]
  }
};
var schema = {
  figure: {
    require: ['img'],
    children: _objectSpread({}, imageSchema, {
      a: {
        attributes: ['href', 'rel', 'target'],
        children: imageSchema
      },
      figcaption: {
        children: getPhrasingContentSchema()
      }
    })
  }
};

function getFirstAnchorAttributeFormHTML(html, attributeName) {
  var _document$implementat = document.implementation.createHTMLDocument(''),
      body = _document$implementat.body;

  body.innerHTML = html;
  var firstElementChild = body.firstElementChild;

  if (firstElementChild && firstElementChild.nodeName === 'A') {
    return firstElementChild.getAttribute(attributeName) || undefined;
  }
}

export function stripFirstImage(attributes, _ref) {
  var shortcode = _ref.shortcode;

  var _document$implementat2 = document.implementation.createHTMLDocument(''),
      body = _document$implementat2.body;

  body.innerHTML = shortcode.content;
  var nodeToRemove = body.querySelector('img'); // if an image has parents, find the topmost node to remove

  while (nodeToRemove && nodeToRemove.parentNode && nodeToRemove.parentNode !== body) {
    nodeToRemove = nodeToRemove.parentNode;
  }

  if (nodeToRemove) {
    nodeToRemove.parentNode.removeChild(nodeToRemove);
  }

  return body.innerHTML.trim();
}
export var settings = {
  title: __('Image'),
  description: __('Insert an image to make a visual statement.'),
  icon: icon,
  category: 'common',
  keywords: ['img', // "img" is not translated as it is intended to reflect the HTML <img> tag.
  __('photo')],
  attributes: blockAttributes,
  transforms: {
    from: [{
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'FIGURE' && !!node.querySelector('img');
      },
      schema: schema,
      transform: function transform(node) {
        // Search both figure and image classes. Alignment could be
        // set on either. ID is set on the image.
        var className = node.className + ' ' + node.querySelector('img').className;
        var alignMatches = /(?:^|\s)align(left|center|right)(?:$|\s)/.exec(className);
        var align = alignMatches ? alignMatches[1] : undefined;
        var idMatches = /(?:^|\s)wp-image-(\d+)(?:$|\s)/.exec(className);
        var id = idMatches ? Number(idMatches[1]) : undefined;
        var anchorElement = node.querySelector('a');
        var linkDestination = anchorElement && anchorElement.href ? 'custom' : undefined;
        var href = anchorElement && anchorElement.href ? anchorElement.href : undefined;
        var rel = anchorElement && anchorElement.rel ? anchorElement.rel : undefined;
        var linkClass = anchorElement && anchorElement.className ? anchorElement.className : undefined;
        var attributes = getBlockAttributes('core/image', node.outerHTML, {
          align: align,
          id: id,
          linkDestination: linkDestination,
          href: href,
          rel: rel,
          linkClass: linkClass
        });
        return createBlock('core/image', attributes);
      }
    }, {
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length === 1 && files[0].type.indexOf('image/') === 0;
      },
      transform: function transform(files) {
        var file = files[0]; // We don't need to upload the media directly here
        // It's already done as part of the `componentDidMount`
        // int the image block

        var block = createBlock('core/image', {
          url: createBlobURL(file)
        });
        return block;
      }
    }, {
      type: 'shortcode',
      tag: 'caption',
      attributes: {
        url: {
          type: 'string',
          source: 'attribute',
          attribute: 'src',
          selector: 'img'
        },
        alt: {
          type: 'string',
          source: 'attribute',
          attribute: 'alt',
          selector: 'img'
        },
        caption: {
          shortcode: stripFirstImage
        },
        href: {
          shortcode: function shortcode(attributes, _ref2) {
            var _shortcode = _ref2.shortcode;
            return getFirstAnchorAttributeFormHTML(_shortcode.content, 'href');
          }
        },
        rel: {
          shortcode: function shortcode(attributes, _ref3) {
            var _shortcode2 = _ref3.shortcode;
            return getFirstAnchorAttributeFormHTML(_shortcode2.content, 'rel');
          }
        },
        linkClass: {
          shortcode: function shortcode(attributes, _ref4) {
            var _shortcode3 = _ref4.shortcode;
            return getFirstAnchorAttributeFormHTML(_shortcode3.content, 'class');
          }
        },
        id: {
          type: 'number',
          shortcode: function shortcode(_ref5) {
            var id = _ref5.named.id;

            if (!id) {
              return;
            }

            return parseInt(id.replace('attachment_', ''), 10);
          }
        },
        align: {
          type: 'string',
          shortcode: function shortcode(_ref6) {
            var _ref6$named$align = _ref6.named.align,
                align = _ref6$named$align === void 0 ? 'alignnone' : _ref6$named$align;
            return align.replace('align', '');
          }
        }
      }
    }]
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var align = attributes.align,
        width = attributes.width;

    if ('left' === align || 'center' === align || 'right' === align || 'wide' === align || 'full' === align) {
      return {
        'data-align': align,
        'data-resized': !!width
      };
    }
  },
  edit: edit,
  save: function save(_ref7) {
    var _classnames;

    var attributes = _ref7.attributes;
    var url = attributes.url,
        alt = attributes.alt,
        caption = attributes.caption,
        align = attributes.align,
        href = attributes.href,
        rel = attributes.rel,
        linkClass = attributes.linkClass,
        width = attributes.width,
        height = attributes.height,
        id = attributes.id,
        linkTarget = attributes.linkTarget;
    var classes = classnames((_classnames = {}, _defineProperty(_classnames, "align".concat(align), align), _defineProperty(_classnames, 'is-resized', width || height), _classnames));
    var image = createElement("img", {
      src: url,
      alt: alt,
      className: id ? "wp-image-".concat(id) : null,
      width: width,
      height: height
    });
    var figure = createElement(Fragment, null, href ? createElement("a", {
      className: linkClass,
      href: href,
      target: linkTarget,
      rel: rel
    }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));

    if ('left' === align || 'right' === align || 'center' === align) {
      return createElement("div", null, createElement("figure", {
        className: classes
      }, figure));
    }

    return createElement("figure", {
      className: classes
    }, figure);
  },
  deprecated: [{
    attributes: blockAttributes,
    save: function save(_ref8) {
      var _classnames2;

      var attributes = _ref8.attributes;
      var url = attributes.url,
          alt = attributes.alt,
          caption = attributes.caption,
          align = attributes.align,
          href = attributes.href,
          width = attributes.width,
          height = attributes.height,
          id = attributes.id;
      var classes = classnames((_classnames2 = {}, _defineProperty(_classnames2, "align".concat(align), align), _defineProperty(_classnames2, 'is-resized', width || height), _classnames2));
      var image = createElement("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return createElement("figure", {
        className: classes
      }, href ? createElement("a", {
        href: href
      }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }, {
    attributes: blockAttributes,
    save: function save(_ref9) {
      var attributes = _ref9.attributes;
      var url = attributes.url,
          alt = attributes.alt,
          caption = attributes.caption,
          align = attributes.align,
          href = attributes.href,
          width = attributes.width,
          height = attributes.height,
          id = attributes.id;
      var image = createElement("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return createElement("figure", {
        className: align ? "align".concat(align) : null
      }, href ? createElement("a", {
        href: href
      }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }, {
    attributes: blockAttributes,
    save: function save(_ref10) {
      var attributes = _ref10.attributes;
      var url = attributes.url,
          alt = attributes.alt,
          caption = attributes.caption,
          align = attributes.align,
          href = attributes.href,
          width = attributes.width,
          height = attributes.height;
      var extraImageProps = width || height ? {
        width: width,
        height: height
      } : {};
      var image = createElement("img", _extends({
        src: url,
        alt: alt
      }, extraImageProps));
      var figureStyle = {};

      if (width) {
        figureStyle = {
          width: width
        };
      } else if (align === 'left' || align === 'right') {
        figureStyle = {
          maxWidth: '50%'
        };
      }

      return createElement("figure", {
        className: align ? "align".concat(align) : null,
        style: figureStyle
      }, href ? createElement("a", {
        href: href
      }, image) : image, !RichText.isEmpty(caption) && createElement(RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }]
};
//# sourceMappingURL=index.js.map