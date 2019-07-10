import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _blockAttributes;

import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { createBlock, getPhrasingContentSchema } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { join, split, create, toHTMLString } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
import { ATTRIBUTE_QUOTE, ATTRIBUTE_CITATION } from './contants';
var blockAttributes = (_blockAttributes = {}, _defineProperty(_blockAttributes, ATTRIBUTE_QUOTE, {
  type: 'string',
  source: 'html',
  selector: 'blockquote',
  multiline: 'p',
  default: ''
}), _defineProperty(_blockAttributes, ATTRIBUTE_CITATION, {
  type: 'string',
  source: 'html',
  selector: 'cite',
  default: ''
}), _defineProperty(_blockAttributes, "align", {
  type: 'string'
}), _blockAttributes);
export var name = 'core/quote';
export var settings = {
  title: __('Quote'),
  description: __('Give quoted text visual emphasis. "In quoting others, we cite ourselves." — Julio Cortázar'),
  icon: icon,
  category: 'common',
  keywords: [__('blockquote')],
  attributes: blockAttributes,
  styles: [{
    name: 'default',
    label: _x('Default', 'block style'),
    isDefault: true
  }, {
    name: 'large',
    label: _x('Large', 'block style')
  }],
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return createBlock('core/quote', {
          value: toHTMLString({
            value: join(attributes.map(function (_ref) {
              var content = _ref.content;
              return create({
                html: content
              });
            }), "\u2028"),
            multilineTag: 'p'
          })
        });
      }
    }, {
      type: 'block',
      blocks: ['core/heading'],
      transform: function transform(_ref2) {
        var content = _ref2.content;
        return createBlock('core/quote', {
          value: "<p>".concat(content, "</p>")
        });
      }
    }, {
      type: 'block',
      blocks: ['core/pullquote'],
      transform: function transform(_ref3) {
        var value = _ref3.value,
            citation = _ref3.citation;
        return createBlock('core/quote', {
          value: value,
          citation: citation
        });
      }
    }, {
      type: 'prefix',
      prefix: '>',
      transform: function transform(content) {
        return createBlock('core/quote', {
          value: "<p>".concat(content, "</p>")
        });
      }
    }, {
      type: 'raw',
      isMatch: function isMatch(node) {
        var isParagraphOrSingleCite = function () {
          var hasCitation = false;
          return function (child) {
            // Child is a paragraph.
            if (child.nodeName === 'P') {
              return true;
            } // Child is a cite and no other cite child exists before it.


            if (!hasCitation && child.nodeName === 'CITE') {
              hasCitation = true;
              return true;
            }
          };
        }();

        return node.nodeName === 'BLOCKQUOTE' && // The quote block can only handle multiline paragraph
        // content with an optional cite child.
        Array.from(node.childNodes).every(isParagraphOrSingleCite);
      },
      schema: {
        blockquote: {
          children: {
            p: {
              children: getPhrasingContentSchema()
            },
            cite: {
              children: getPhrasingContentSchema()
            }
          }
        }
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref4) {
        var value = _ref4.value,
            citation = _ref4.citation;
        var paragraphs = [];

        if (value && value !== '<p></p>') {
          paragraphs.push.apply(paragraphs, _toConsumableArray(split(create({
            html: value,
            multilineTag: 'p'
          }), "\u2028").map(function (piece) {
            return createBlock('core/paragraph', {
              content: toHTMLString({
                value: piece
              })
            });
          })));
        }

        if (citation && citation !== '<p></p>') {
          paragraphs.push(createBlock('core/paragraph', {
            content: citation
          }));
        }

        if (paragraphs.length === 0) {
          return createBlock('core/paragraph', {
            content: ''
          });
        }

        return paragraphs;
      }
    }, {
      type: 'block',
      blocks: ['core/heading'],
      transform: function transform(_ref5) {
        var value = _ref5.value,
            citation = _ref5.citation,
            attrs = _objectWithoutProperties(_ref5, ["value", "citation"]);

        // If there is no quote content, use the citation as the
        // content of the resulting heading. A nonexistent citation
        // will result in an empty heading.
        if (value === '<p></p>') {
          return createBlock('core/heading', {
            content: citation
          });
        }

        var pieces = split(create({
          html: value,
          multilineTag: 'p'
        }), "\u2028");
        var headingBlock = createBlock('core/heading', {
          content: toHTMLString({
            value: pieces[0]
          })
        });

        if (!citation && pieces.length === 1) {
          return headingBlock;
        }

        var quotePieces = pieces.slice(1);
        var quoteBlock = createBlock('core/quote', _objectSpread({}, attrs, {
          citation: citation,
          value: toHTMLString({
            value: quotePieces.length ? join(pieces.slice(1), "\u2028") : create(),
            multilineTag: 'p'
          })
        }));
        return [headingBlock, quoteBlock];
      }
    }, {
      type: 'block',
      blocks: ['core/pullquote'],
      transform: function transform(_ref6) {
        var value = _ref6.value,
            citation = _ref6.citation;
        return createBlock('core/pullquote', {
          value: value,
          citation: citation
        });
      }
    }]
  },
  edit: edit,
  save: function save(_ref7) {
    var attributes = _ref7.attributes;
    var align = attributes.align,
        value = attributes.value,
        citation = attributes.citation;
    return createElement("blockquote", {
      style: {
        textAlign: align ? align : null
      }
    }, createElement(RichText.Content, {
      multiline: true,
      value: value
    }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
      tagName: "cite",
      value: citation
    }));
  },
  merge: function merge(attributes, _ref8) {
    var value = _ref8.value,
        citation = _ref8.citation;

    if (!value || value === '<p></p>') {
      return _objectSpread({}, attributes, {
        citation: attributes.citation + citation
      });
    }

    return _objectSpread({}, attributes, {
      value: attributes.value + value,
      citation: attributes.citation + citation
    });
  },
  deprecated: [{
    attributes: _objectSpread({}, blockAttributes, {
      style: {
        type: 'number',
        default: 1
      }
    }),
    migrate: function migrate(attributes) {
      if (attributes.style === 2) {
        return _objectSpread({}, omit(attributes, ['style']), {
          className: attributes.className ? attributes.className + ' is-style-large' : 'is-style-large'
        });
      }

      return attributes;
    },
    save: function save(_ref9) {
      var attributes = _ref9.attributes;
      var align = attributes.align,
          value = attributes.value,
          citation = attributes.citation,
          style = attributes.style;
      return createElement("blockquote", {
        className: style === 2 ? 'is-large' : '',
        style: {
          textAlign: align ? align : null
        }
      }, createElement(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
        tagName: "cite",
        value: citation
      }));
    }
  }, {
    attributes: _objectSpread({}, blockAttributes, {
      citation: {
        type: 'string',
        source: 'html',
        selector: 'footer',
        default: ''
      },
      style: {
        type: 'number',
        default: 1
      }
    }),
    save: function save(_ref10) {
      var attributes = _ref10.attributes;
      var align = attributes.align,
          value = attributes.value,
          citation = attributes.citation,
          style = attributes.style;
      return createElement("blockquote", {
        className: "blocks-quote-style-".concat(style),
        style: {
          textAlign: align ? align : null
        }
      }, createElement(RichText.Content, {
        multiline: true,
        value: value
      }), !RichText.isEmpty(citation) && createElement(RichText.Content, {
        tagName: "footer",
        value: citation
      }));
    }
  }]
};
//# sourceMappingURL=index.js.map