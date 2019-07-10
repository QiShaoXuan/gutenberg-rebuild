"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _richText = require("@wordpress/rich-text");

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

var _contants = require("./contants");

var _blockAttributes;

var blockAttributes = (_blockAttributes = {}, (0, _defineProperty2.default)(_blockAttributes, _contants.ATTRIBUTE_QUOTE, {
  type: 'string',
  source: 'html',
  selector: 'blockquote',
  multiline: 'p',
  default: ''
}), (0, _defineProperty2.default)(_blockAttributes, _contants.ATTRIBUTE_CITATION, {
  type: 'string',
  source: 'html',
  selector: 'cite',
  default: ''
}), (0, _defineProperty2.default)(_blockAttributes, "align", {
  type: 'string'
}), _blockAttributes);
var name = 'core/quote';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Quote'),
  description: (0, _i18n.__)('Give quoted text visual emphasis. "In quoting others, we cite ourselves." — Julio Cortázar'),
  icon: _icon.default,
  category: 'common',
  keywords: [(0, _i18n.__)('blockquote')],
  attributes: blockAttributes,
  styles: [{
    name: 'default',
    label: (0, _i18n._x)('Default', 'block style'),
    isDefault: true
  }, {
    name: 'large',
    label: (0, _i18n._x)('Large', 'block style')
  }],
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/quote', {
          value: (0, _richText.toHTMLString)({
            value: (0, _richText.join)(attributes.map(function (_ref) {
              var content = _ref.content;
              return (0, _richText.create)({
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
        return (0, _blocks.createBlock)('core/quote', {
          value: "<p>".concat(content, "</p>")
        });
      }
    }, {
      type: 'block',
      blocks: ['core/pullquote'],
      transform: function transform(_ref3) {
        var value = _ref3.value,
            citation = _ref3.citation;
        return (0, _blocks.createBlock)('core/quote', {
          value: value,
          citation: citation
        });
      }
    }, {
      type: 'prefix',
      prefix: '>',
      transform: function transform(content) {
        return (0, _blocks.createBlock)('core/quote', {
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
              children: (0, _blocks.getPhrasingContentSchema)()
            },
            cite: {
              children: (0, _blocks.getPhrasingContentSchema)()
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
          paragraphs.push.apply(paragraphs, (0, _toConsumableArray2.default)((0, _richText.split)((0, _richText.create)({
            html: value,
            multilineTag: 'p'
          }), "\u2028").map(function (piece) {
            return (0, _blocks.createBlock)('core/paragraph', {
              content: (0, _richText.toHTMLString)({
                value: piece
              })
            });
          })));
        }

        if (citation && citation !== '<p></p>') {
          paragraphs.push((0, _blocks.createBlock)('core/paragraph', {
            content: citation
          }));
        }

        if (paragraphs.length === 0) {
          return (0, _blocks.createBlock)('core/paragraph', {
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
            attrs = (0, _objectWithoutProperties2.default)(_ref5, ["value", "citation"]);

        // If there is no quote content, use the citation as the
        // content of the resulting heading. A nonexistent citation
        // will result in an empty heading.
        if (value === '<p></p>') {
          return (0, _blocks.createBlock)('core/heading', {
            content: citation
          });
        }

        var pieces = (0, _richText.split)((0, _richText.create)({
          html: value,
          multilineTag: 'p'
        }), "\u2028");
        var headingBlock = (0, _blocks.createBlock)('core/heading', {
          content: (0, _richText.toHTMLString)({
            value: pieces[0]
          })
        });

        if (!citation && pieces.length === 1) {
          return headingBlock;
        }

        var quotePieces = pieces.slice(1);
        var quoteBlock = (0, _blocks.createBlock)('core/quote', (0, _objectSpread2.default)({}, attrs, {
          citation: citation,
          value: (0, _richText.toHTMLString)({
            value: quotePieces.length ? (0, _richText.join)(pieces.slice(1), "\u2028") : (0, _richText.create)(),
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
        return (0, _blocks.createBlock)('core/pullquote', {
          value: value,
          citation: citation
        });
      }
    }]
  },
  edit: _edit.default,
  save: function save(_ref7) {
    var attributes = _ref7.attributes;
    var align = attributes.align,
        value = attributes.value,
        citation = attributes.citation;
    return (0, _element.createElement)("blockquote", {
      style: {
        textAlign: align ? align : null
      }
    }, (0, _element.createElement)(_blockEditor.RichText.Content, {
      multiline: true,
      value: value
    }), !_blockEditor.RichText.isEmpty(citation) && (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "cite",
      value: citation
    }));
  },
  merge: function merge(attributes, _ref8) {
    var value = _ref8.value,
        citation = _ref8.citation;

    if (!value || value === '<p></p>') {
      return (0, _objectSpread2.default)({}, attributes, {
        citation: attributes.citation + citation
      });
    }

    return (0, _objectSpread2.default)({}, attributes, {
      value: attributes.value + value,
      citation: attributes.citation + citation
    });
  },
  deprecated: [{
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
      style: {
        type: 'number',
        default: 1
      }
    }),
    migrate: function migrate(attributes) {
      if (attributes.style === 2) {
        return (0, _objectSpread2.default)({}, (0, _lodash.omit)(attributes, ['style']), {
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
      return (0, _element.createElement)("blockquote", {
        className: style === 2 ? 'is-large' : '',
        style: {
          textAlign: align ? align : null
        }
      }, (0, _element.createElement)(_blockEditor.RichText.Content, {
        multiline: true,
        value: value
      }), !_blockEditor.RichText.isEmpty(citation) && (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "cite",
        value: citation
      }));
    }
  }, {
    attributes: (0, _objectSpread2.default)({}, blockAttributes, {
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
      return (0, _element.createElement)("blockquote", {
        className: "blocks-quote-style-".concat(style),
        style: {
          textAlign: align ? align : null
        }
      }, (0, _element.createElement)(_blockEditor.RichText.Content, {
        multiline: true,
        value: value
      }), !_blockEditor.RichText.isEmpty(citation) && (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "footer",
        value: citation
      }));
    }
  }]
};
exports.settings = settings;
//# sourceMappingURL=index.js.map