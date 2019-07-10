import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
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
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
/**
 * Given a node name string for a heading node, returns its numeric level.
 *
 * @param {string} nodeName Heading node name.
 *
 * @return {number} Heading level.
 */

export function getLevelFromHeadingNodeName(nodeName) {
  return Number(nodeName.substr(1));
}
var supports = {
  className: false,
  anchor: true
};
var schema = {
  content: {
    type: 'string',
    source: 'html',
    selector: 'h1,h2,h3,h4,h5,h6',
    default: ''
  },
  level: {
    type: 'number',
    default: 2
  },
  align: {
    type: 'string'
  },
  placeholder: {
    type: 'string'
  }
};
export var name = 'core/heading';
export var settings = {
  title: __('Heading'),
  description: __('Introduce new sections and organize content to help visitors (and search engines) understand the structure of your content.'),
  icon: icon,
  category: 'common',
  keywords: [__('title'), __('subtitle')],
  supports: supports,
  attributes: schema,
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref) {
        var content = _ref.content;
        return createBlock('core/heading', {
          content: content
        });
      }
    }, {
      type: 'raw',
      selector: 'h1,h2,h3,h4,h5,h6',
      schema: {
        h1: {
          children: getPhrasingContentSchema()
        },
        h2: {
          children: getPhrasingContentSchema()
        },
        h3: {
          children: getPhrasingContentSchema()
        },
        h4: {
          children: getPhrasingContentSchema()
        },
        h5: {
          children: getPhrasingContentSchema()
        },
        h6: {
          children: getPhrasingContentSchema()
        }
      },
      transform: function transform(node) {
        return createBlock('core/heading', _objectSpread({}, getBlockAttributes('core/heading', node.outerHTML), {
          level: getLevelFromHeadingNodeName(node.nodeName)
        }));
      }
    }].concat(_toConsumableArray([2, 3, 4, 5, 6].map(function (level) {
      return {
        type: 'prefix',
        prefix: Array(level + 1).join('#'),
        transform: function transform(content) {
          return createBlock('core/heading', {
            level: level,
            content: content
          });
        }
      };
    }))),
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(_ref2) {
        var content = _ref2.content;
        return createBlock('core/paragraph', {
          content: content
        });
      }
    }]
  },
  deprecated: [{
    supports: supports,
    attributes: _objectSpread({}, omit(schema, ['level']), {
      nodeName: {
        type: 'string',
        source: 'property',
        selector: 'h1,h2,h3,h4,h5,h6',
        property: 'nodeName',
        default: 'H2'
      }
    }),
    migrate: function migrate(attributes) {
      var nodeName = attributes.nodeName,
          migratedAttributes = _objectWithoutProperties(attributes, ["nodeName"]);

      return _objectSpread({}, migratedAttributes, {
        level: getLevelFromHeadingNodeName(nodeName)
      });
    },
    save: function save(_ref3) {
      var attributes = _ref3.attributes;
      var align = attributes.align,
          nodeName = attributes.nodeName,
          content = attributes.content;
      return createElement(RichText.Content, {
        tagName: nodeName.toLowerCase(),
        style: {
          textAlign: align
        },
        value: content
      });
    }
  }],
  merge: function merge(attributes, attributesToMerge) {
    return {
      content: (attributes.content || '') + (attributesToMerge.content || '')
    };
  },
  edit: edit,
  save: function save(_ref4) {
    var attributes = _ref4.attributes;
    var align = attributes.align,
        level = attributes.level,
        content = attributes.content;
    var tagName = 'h' + level;
    return createElement(RichText.Content, {
      tagName: tagName,
      style: {
        textAlign: align
      },
      value: content
    });
  }
};
//# sourceMappingURL=index.js.map