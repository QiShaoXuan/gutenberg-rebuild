"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _blocks = require("@wordpress/blocks");

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
var supports = {
  className: false
};
var schema = {
  content: {
    type: 'string',
    source: 'html',
    selector: 'p',
    default: ''
  },
  align: {
    type: 'string'
  },
  dropCap: {
    type: 'boolean',
    default: false
  },
  placeholder: {
    type: 'string'
  },
  textColor: {
    type: 'string'
  },
  customTextColor: {
    type: 'string'
  },
  backgroundColor: {
    type: 'string'
  },
  customBackgroundColor: {
    type: 'string'
  },
  fontSize: {
    type: 'string'
  },
  customFontSize: {
    type: 'number'
  },
  direction: {
    type: 'string',
    enum: ['ltr', 'rtl']
  }
};
var name = 'core/paragraph';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Paragraph'),
  description: (0, _i18n.__)('Start with the building block of all narrative.'),
  icon: _icon.default,
  category: 'common',
  keywords: [(0, _i18n.__)('text')],
  supports: supports,
  attributes: schema,
  transforms: {
    from: [{
      type: 'raw',
      // Paragraph is a fallback and should be matched last.
      priority: 20,
      selector: 'p',
      schema: {
        p: {
          children: (0, _blocks.getPhrasingContentSchema)()
        }
      }
    }]
  },
  deprecated: [{
    supports: supports,
    attributes: (0, _objectSpread2.default)({}, schema, {
      width: {
        type: 'string'
      }
    }),
    save: function save(_ref) {
      var _classnames;

      var attributes = _ref.attributes;
      var width = attributes.width,
          align = attributes.align,
          content = attributes.content,
          dropCap = attributes.dropCap,
          backgroundColor = attributes.backgroundColor,
          textColor = attributes.textColor,
          customBackgroundColor = attributes.customBackgroundColor,
          customTextColor = attributes.customTextColor,
          fontSize = attributes.fontSize,
          customFontSize = attributes.customFontSize;
      var textClass = (0, _blockEditor.getColorClassName)('color', textColor);
      var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
      var fontSizeClass = fontSize && "is-".concat(fontSize, "-text");
      var className = (0, _classnames4.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "align".concat(width), width), (0, _defineProperty2.default)(_classnames, 'has-background', backgroundColor || customBackgroundColor), (0, _defineProperty2.default)(_classnames, 'has-drop-cap', dropCap), (0, _defineProperty2.default)(_classnames, fontSizeClass, fontSizeClass), (0, _defineProperty2.default)(_classnames, textClass, textClass), (0, _defineProperty2.default)(_classnames, backgroundClass, backgroundClass), _classnames));
      var styles = {
        backgroundColor: backgroundClass ? undefined : customBackgroundColor,
        color: textClass ? undefined : customTextColor,
        fontSize: fontSizeClass ? undefined : customFontSize,
        textAlign: align
      };
      return (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "p",
        style: styles,
        className: className ? className : undefined,
        value: content
      });
    }
  }, {
    supports: supports,
    attributes: (0, _lodash.omit)((0, _objectSpread2.default)({}, schema, {
      fontSize: {
        type: 'number'
      }
    }), 'customFontSize', 'customTextColor', 'customBackgroundColor'),
    save: function save(_ref2) {
      var _classnames2;

      var attributes = _ref2.attributes;
      var width = attributes.width,
          align = attributes.align,
          content = attributes.content,
          dropCap = attributes.dropCap,
          backgroundColor = attributes.backgroundColor,
          textColor = attributes.textColor,
          fontSize = attributes.fontSize;
      var className = (0, _classnames4.default)((_classnames2 = {}, (0, _defineProperty2.default)(_classnames2, "align".concat(width), width), (0, _defineProperty2.default)(_classnames2, 'has-background', backgroundColor), (0, _defineProperty2.default)(_classnames2, 'has-drop-cap', dropCap), _classnames2));
      var styles = {
        backgroundColor: backgroundColor,
        color: textColor,
        fontSize: fontSize,
        textAlign: align
      };
      return (0, _element.createElement)("p", {
        style: styles,
        className: className ? className : undefined
      }, content);
    },
    migrate: function migrate(attributes) {
      return (0, _lodash.omit)((0, _objectSpread2.default)({}, attributes, {
        customFontSize: (0, _lodash.isFinite)(attributes.fontSize) ? attributes.fontSize : undefined,
        customTextColor: attributes.textColor && '#' === attributes.textColor[0] ? attributes.textColor : undefined,
        customBackgroundColor: attributes.backgroundColor && '#' === attributes.backgroundColor[0] ? attributes.backgroundColor : undefined
      }), ['fontSize', 'textColor', 'backgroundColor']);
    }
  }, {
    supports: supports,
    attributes: (0, _objectSpread2.default)({}, schema, {
      content: {
        type: 'string',
        source: 'html',
        default: ''
      }
    }),
    save: function save(_ref3) {
      var attributes = _ref3.attributes;
      return (0, _element.createElement)(_element.RawHTML, null, attributes.content);
    },
    migrate: function migrate(attributes) {
      return attributes;
    }
  }],
  merge: function merge(attributes, attributesToMerge) {
    return {
      content: (attributes.content || '') + (attributesToMerge.content || '')
    };
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var width = attributes.width;

    if (['wide', 'full', 'left', 'right'].indexOf(width) !== -1) {
      return {
        'data-align': width
      };
    }
  },
  edit: _edit.default,
  save: function save(_ref4) {
    var _classnames3;

    var attributes = _ref4.attributes;
    var align = attributes.align,
        content = attributes.content,
        dropCap = attributes.dropCap,
        backgroundColor = attributes.backgroundColor,
        textColor = attributes.textColor,
        customBackgroundColor = attributes.customBackgroundColor,
        customTextColor = attributes.customTextColor,
        fontSize = attributes.fontSize,
        customFontSize = attributes.customFontSize,
        direction = attributes.direction;
    var textClass = (0, _blockEditor.getColorClassName)('color', textColor);
    var backgroundClass = (0, _blockEditor.getColorClassName)('background-color', backgroundColor);
    var fontSizeClass = (0, _blockEditor.getFontSizeClass)(fontSize);
    var className = (0, _classnames4.default)((_classnames3 = {
      'has-text-color': textColor || customTextColor,
      'has-background': backgroundColor || customBackgroundColor,
      'has-drop-cap': dropCap
    }, (0, _defineProperty2.default)(_classnames3, fontSizeClass, fontSizeClass), (0, _defineProperty2.default)(_classnames3, textClass, textClass), (0, _defineProperty2.default)(_classnames3, backgroundClass, backgroundClass), _classnames3));
    var styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: textClass ? undefined : customTextColor,
      fontSize: fontSizeClass ? undefined : customFontSize,
      textAlign: align
    };
    console.log('from rebuild gutenberg-js paragraph');
    return (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "p",
      style: styles,
      className: className ? className : undefined,
      value: content,
      dir: direction
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map