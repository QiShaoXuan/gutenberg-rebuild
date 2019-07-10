"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _richText = require("@wordpress/rich-text");

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
var listContentSchema = (0, _objectSpread2.default)({}, (0, _blocks.getPhrasingContentSchema)(), {
  ul: {},
  ol: {
    attributes: ['type']
  }
}); // Recursion is needed.
// Possible: ul > li > ul.
// Impossible: ul > ul.

['ul', 'ol'].forEach(function (tag) {
  listContentSchema[tag].children = {
    li: {
      children: listContentSchema
    }
  };
});
var supports = {
  className: false
};
var schema = {
  ordered: {
    type: 'boolean',
    default: false
  },
  values: {
    type: 'string',
    source: 'html',
    selector: 'ol,ul',
    multiline: 'li',
    default: ''
  }
};
var name = 'core/list';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('List'),
  description: (0, _i18n.__)('Create a bulleted or numbered list.'),
  icon: _icon.default,
  category: 'common',
  keywords: [(0, _i18n.__)('bullet list'), (0, _i18n.__)('ordered list'), (0, _i18n.__)('numbered list')],
  attributes: schema,
  supports: supports,
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(blockAttributes) {
        return (0, _blocks.createBlock)('core/list', {
          values: (0, _richText.toHTMLString)({
            value: (0, _richText.join)(blockAttributes.map(function (_ref) {
              var content = _ref.content;
              var value = (0, _richText.create)({
                html: content
              });

              if (blockAttributes.length > 1) {
                return value;
              } // When converting only one block, transform
              // every line to a list item.


              return (0, _richText.replace)(value, /\n/g, _richText.LINE_SEPARATOR);
            }), _richText.LINE_SEPARATOR),
            multilineTag: 'li'
          })
        });
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      transform: function transform(_ref2) {
        var value = _ref2.value;
        return (0, _blocks.createBlock)('core/list', {
          values: (0, _richText.toHTMLString)({
            value: (0, _richText.create)({
              html: value,
              multilineTag: 'p'
            }),
            multilineTag: 'li'
          })
        });
      }
    }, {
      type: 'raw',
      selector: 'ol,ul',
      schema: {
        ol: listContentSchema.ol,
        ul: listContentSchema.ul
      },
      transform: function transform(node) {
        return (0, _blocks.createBlock)('core/list', (0, _objectSpread2.default)({}, (0, _blocks.getBlockAttributes)('core/list', node.outerHTML), {
          ordered: node.nodeName === 'OL'
        }));
      }
    }].concat((0, _toConsumableArray2.default)(['*', '-'].map(function (prefix) {
      return {
        type: 'prefix',
        prefix: prefix,
        transform: function transform(content) {
          return (0, _blocks.createBlock)('core/list', {
            values: "<li>".concat(content, "</li>")
          });
        }
      };
    })), (0, _toConsumableArray2.default)(['1.', '1)'].map(function (prefix) {
      return {
        type: 'prefix',
        prefix: prefix,
        transform: function transform(content) {
          return (0, _blocks.createBlock)('core/list', {
            ordered: true,
            values: "<li>".concat(content, "</li>")
          });
        }
      };
    }))),
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref3) {
        var values = _ref3.values;
        return (0, _richText.split)((0, _richText.create)({
          html: values,
          multilineTag: 'li',
          multilineWrapperTags: ['ul', 'ol']
        }), _richText.LINE_SEPARATOR).map(function (piece) {
          return (0, _blocks.createBlock)('core/paragraph', {
            content: (0, _richText.toHTMLString)({
              value: piece
            })
          });
        });
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      transform: function transform(_ref4) {
        var values = _ref4.values;
        return (0, _blocks.createBlock)('core/quote', {
          value: (0, _richText.toHTMLString)({
            value: (0, _richText.create)({
              html: values,
              multilineTag: 'li',
              multilineWrapperTags: ['ul', 'ol']
            }),
            multilineTag: 'p'
          })
        });
      }
    }]
  },
  deprecated: [{
    supports: supports,
    attributes: (0, _objectSpread2.default)({}, (0, _lodash.omit)(schema, ['ordered']), {
      nodeName: {
        type: 'string',
        source: 'property',
        selector: 'ol,ul',
        property: 'nodeName',
        default: 'UL'
      }
    }),
    migrate: function migrate(attributes) {
      var nodeName = attributes.nodeName,
          migratedAttributes = (0, _objectWithoutProperties2.default)(attributes, ["nodeName"]);
      return (0, _objectSpread2.default)({}, migratedAttributes, {
        ordered: 'OL' === nodeName
      });
    },
    save: function save(_ref5) {
      var attributes = _ref5.attributes;
      var nodeName = attributes.nodeName,
          values = attributes.values;
      return (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: nodeName.toLowerCase(),
        value: values
      });
    }
  }],
  merge: function merge(attributes, attributesToMerge) {
    var values = attributesToMerge.values;

    if (!values || values === '<li></li>') {
      return attributes;
    }

    return (0, _objectSpread2.default)({}, attributes, {
      values: attributes.values + values
    });
  },
  edit: _edit.default,
  save: function save(_ref6) {
    var attributes = _ref6.attributes;
    var ordered = attributes.ordered,
        values = attributes.values;
    var tagName = ordered ? 'ol' : 'ul';
    return (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: tagName,
      value: values,
      multiline: "li"
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map