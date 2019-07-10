import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { createBlock, getPhrasingContentSchema, getBlockAttributes } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { replace, join, split, create, toHTMLString, LINE_SEPARATOR } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';

var listContentSchema = _objectSpread({}, getPhrasingContentSchema(), {
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
export var name = 'core/list';
export var settings = {
  title: __('List'),
  description: __('Create a bulleted or numbered list.'),
  icon: icon,
  category: 'common',
  keywords: [__('bullet list'), __('ordered list'), __('numbered list')],
  attributes: schema,
  supports: supports,
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/paragraph'],
      transform: function transform(blockAttributes) {
        return createBlock('core/list', {
          values: toHTMLString({
            value: join(blockAttributes.map(function (_ref) {
              var content = _ref.content;
              var value = create({
                html: content
              });

              if (blockAttributes.length > 1) {
                return value;
              } // When converting only one block, transform
              // every line to a list item.


              return replace(value, /\n/g, LINE_SEPARATOR);
            }), LINE_SEPARATOR),
            multilineTag: 'li'
          })
        });
      }
    }, {
      type: 'block',
      blocks: ['core/quote'],
      transform: function transform(_ref2) {
        var value = _ref2.value;
        return createBlock('core/list', {
          values: toHTMLString({
            value: create({
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
        return createBlock('core/list', _objectSpread({}, getBlockAttributes('core/list', node.outerHTML), {
          ordered: node.nodeName === 'OL'
        }));
      }
    }].concat(_toConsumableArray(['*', '-'].map(function (prefix) {
      return {
        type: 'prefix',
        prefix: prefix,
        transform: function transform(content) {
          return createBlock('core/list', {
            values: "<li>".concat(content, "</li>")
          });
        }
      };
    })), _toConsumableArray(['1.', '1)'].map(function (prefix) {
      return {
        type: 'prefix',
        prefix: prefix,
        transform: function transform(content) {
          return createBlock('core/list', {
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
        return split(create({
          html: values,
          multilineTag: 'li',
          multilineWrapperTags: ['ul', 'ol']
        }), LINE_SEPARATOR).map(function (piece) {
          return createBlock('core/paragraph', {
            content: toHTMLString({
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
        return createBlock('core/quote', {
          value: toHTMLString({
            value: create({
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
    attributes: _objectSpread({}, omit(schema, ['ordered']), {
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
          migratedAttributes = _objectWithoutProperties(attributes, ["nodeName"]);

      return _objectSpread({}, migratedAttributes, {
        ordered: 'OL' === nodeName
      });
    },
    save: function save(_ref5) {
      var attributes = _ref5.attributes;
      var nodeName = attributes.nodeName,
          values = attributes.values;
      return createElement(RichText.Content, {
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

    return _objectSpread({}, attributes, {
      values: attributes.values + values
    });
  },
  edit: edit,
  save: function save(_ref6) {
    var attributes = _ref6.attributes;
    var ordered = attributes.ordered,
        values = attributes.values;
    var tagName = ordered ? 'ol' : 'ul';
    return createElement(RichText.Content, {
      tagName: tagName,
      value: values,
      multiline: "li"
    });
  }
};
//# sourceMappingURL=index.js.map