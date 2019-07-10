"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripFirstImage = stripFirstImage;
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _blob = require("@wordpress/blob");

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
var name = 'core/image';
exports.name = name;
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
    children: (0, _objectSpread2.default)({}, imageSchema, {
      a: {
        attributes: ['href', 'rel', 'target'],
        children: imageSchema
      },
      figcaption: {
        children: (0, _blocks.getPhrasingContentSchema)()
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

function stripFirstImage(attributes, _ref) {
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

var settings = {
  title: (0, _i18n.__)('Image'),
  description: (0, _i18n.__)('Insert an image to make a visual statement.'),
  icon: _icon.default,
  category: 'common',
  keywords: ['img', // "img" is not translated as it is intended to reflect the HTML <img> tag.
  (0, _i18n.__)('photo')],
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
        var attributes = (0, _blocks.getBlockAttributes)('core/image', node.outerHTML, {
          align: align,
          id: id,
          linkDestination: linkDestination,
          href: href,
          rel: rel,
          linkClass: linkClass
        });
        return (0, _blocks.createBlock)('core/image', attributes);
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

        var block = (0, _blocks.createBlock)('core/image', {
          url: (0, _blob.createBlobURL)(file)
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
  edit: _edit.default,
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
    var classes = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "align".concat(align), align), (0, _defineProperty2.default)(_classnames, 'is-resized', width || height), _classnames));
    var image = (0, _element.createElement)("img", {
      src: url,
      alt: alt,
      className: id ? "wp-image-".concat(id) : null,
      width: width,
      height: height
    });
    var figure = (0, _element.createElement)(_element.Fragment, null, href ? (0, _element.createElement)("a", {
      className: linkClass,
      href: href,
      target: linkTarget,
      rel: rel
    }, image) : image, !_blockEditor.RichText.isEmpty(caption) && (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "figcaption",
      value: caption
    }));

    if ('left' === align || 'right' === align || 'center' === align) {
      return (0, _element.createElement)("div", null, (0, _element.createElement)("figure", {
        className: classes
      }, figure));
    }

    return (0, _element.createElement)("figure", {
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
      var classes = (0, _classnames3.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "align".concat(align), align), (0, _defineProperty2.default)(_classnames2, 'is-resized', width || height), _classnames2));
      var image = (0, _element.createElement)("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return (0, _element.createElement)("figure", {
        className: classes
      }, href ? (0, _element.createElement)("a", {
        href: href
      }, image) : image, !_blockEditor.RichText.isEmpty(caption) && (0, _element.createElement)(_blockEditor.RichText.Content, {
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
      var image = (0, _element.createElement)("img", {
        src: url,
        alt: alt,
        className: id ? "wp-image-".concat(id) : null,
        width: width,
        height: height
      });
      return (0, _element.createElement)("figure", {
        className: align ? "align".concat(align) : null
      }, href ? (0, _element.createElement)("a", {
        href: href
      }, image) : image, !_blockEditor.RichText.isEmpty(caption) && (0, _element.createElement)(_blockEditor.RichText.Content, {
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
      var image = (0, _element.createElement)("img", (0, _extends2.default)({
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

      return (0, _element.createElement)("figure", {
        className: align ? "align".concat(align) : null,
        style: figureStyle
      }, href ? (0, _element.createElement)("a", {
        href: href
      }, image) : image, !_blockEditor.RichText.isEmpty(caption) && (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "figcaption",
        value: caption
      }));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map