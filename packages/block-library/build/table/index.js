"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

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
var tableContentPasteSchema = {
  tr: {
    allowEmpty: true,
    children: {
      th: {
        allowEmpty: true,
        children: (0, _blocks.getPhrasingContentSchema)()
      },
      td: {
        allowEmpty: true,
        children: (0, _blocks.getPhrasingContentSchema)()
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

var name = 'core/table';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Table'),
  description: (0, _i18n.__)('Insert a table — perfect for sharing charts and data.'),
  icon: _icon.default,
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
    label: (0, _i18n._x)('Default', 'block style'),
    isDefault: true
  }, {
    name: 'stripes',
    label: (0, _i18n.__)('Stripes')
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
  edit: _edit.default,
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

    var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
    var classes = (0, _classnames.default)(backgroundClass, {
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
      return (0, _element.createElement)(Tag, null, rows.map(function (_ref3, rowIndex) {
        var cells = _ref3.cells;
        return (0, _element.createElement)("tr", {
          key: rowIndex
        }, cells.map(function (_ref4, cellIndex) {
          var content = _ref4.content,
              tag = _ref4.tag;
          return (0, _element.createElement)(_blockEditor.RichText.Content, {
            tagName: tag,
            value: content,
            key: cellIndex
          });
        }));
      }));
    };

    return (0, _element.createElement)("table", {
      className: classes
    }, (0, _element.createElement)(Section, {
      type: "head",
      rows: head
    }), (0, _element.createElement)(Section, {
      type: "body",
      rows: body
    }), (0, _element.createElement)(Section, {
      type: "foot",
      rows: foot
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map