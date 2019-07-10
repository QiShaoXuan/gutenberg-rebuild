import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { getPhrasingContentSchema } from '@wordpress/blocks';
import { RichText, getColorClassName } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
var tableContentPasteSchema = {
  tr: {
    allowEmpty: true,
    children: {
      th: {
        allowEmpty: true,
        children: getPhrasingContentSchema()
      },
      td: {
        allowEmpty: true,
        children: getPhrasingContentSchema()
      }
    }
  }
};
var tablePasteSchema = {
  table: {
    children: {
      thead: {
        allowEmpty: true,
        children: tableContentPasteSchema
      },
      tfoot: {
        allowEmpty: true,
        children: tableContentPasteSchema
      },
      tbody: {
        allowEmpty: true,
        children: tableContentPasteSchema
      }
    }
  }
};

function getTableSectionAttributeSchema(section) {
  return {
    type: 'array',
    default: [],
    source: 'query',
    selector: "t".concat(section, " tr"),
    query: {
      cells: {
        type: 'array',
        default: [],
        source: 'query',
        selector: 'td,th',
        query: {
          content: {
            type: 'string',
            source: 'html'
          },
          tag: {
            type: 'string',
            default: 'td',
            source: 'tag'
          }
        }
      }
    }
  };
}

export var name = 'core/table';
export var settings = {
  title: __('Table'),
  description: __('Insert a table — perfect for sharing charts and data.'),
  icon: icon,
  category: 'formatting',
  attributes: {
    hasFixedLayout: {
      type: 'boolean',
      default: false
    },
    backgroundColor: {
      type: 'string'
    },
    head: getTableSectionAttributeSchema('head'),
    body: getTableSectionAttributeSchema('body'),
    foot: getTableSectionAttributeSchema('foot')
  },
  styles: [{
    name: 'regular',
    label: _x('Default', 'block style'),
    isDefault: true
  }, {
    name: 'stripes',
    label: __('Stripes')
  }],
  supports: {
    align: true
  },
  transforms: {
    from: [{
      type: 'raw',
      selector: 'table',
      schema: tablePasteSchema
    }]
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var hasFixedLayout = attributes.hasFixedLayout,
        head = attributes.head,
        body = attributes.body,
        foot = attributes.foot,
        backgroundColor = attributes.backgroundColor;
    var isEmpty = !head.length && !body.length && !foot.length;

    if (isEmpty) {
      return null;
    }

    var backgroundClass = getColorClassName('background-color', backgroundColor);
    var classes = classnames(backgroundClass, {
      'has-fixed-layout': hasFixedLayout,
      'has-background': !!backgroundClass
    });

    var Section = function Section(_ref2) {
      var type = _ref2.type,
          rows = _ref2.rows;

      if (!rows.length) {
        return null;
      }

      var Tag = "t".concat(type);
      return createElement(Tag, null, rows.map(function (_ref3, rowIndex) {
        var cells = _ref3.cells;
        return createElement("tr", {
          key: rowIndex
        }, cells.map(function (_ref4, cellIndex) {
          var content = _ref4.content,
              tag = _ref4.tag;
          return createElement(RichText.Content, {
            tagName: tag,
            value: content,
            key: cellIndex
          });
        }));
      }));
    };

    return createElement("table", {
      className: classes
    }, createElement(Section, {
      type: "head",
      rows: head
    }), createElement(Section, {
      type: "body",
      rows: body
    }), createElement(Section, {
      type: "foot",
      rows: foot
    }));
  }
};
//# sourceMappingURL=index.js.map