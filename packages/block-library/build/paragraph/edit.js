"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _window = window,
    getComputedStyle = _window.getComputedStyle;
var name = 'core/paragraph';
var applyFallbackStyles = (0, _components.withFallbackStyles)(function (node, ownProps) {
  var _ownProps$attributes = ownProps.attributes,
      textColor = _ownProps$attributes.textColor,
      backgroundColor = _ownProps$attributes.backgroundColor,
      fontSize = _ownProps$attributes.fontSize,
      customFontSize = _ownProps$attributes.customFontSize;
  var editableNode = node.querySelector('[contenteditable="true"]'); //verify if editableNode is available, before using getComputedStyle.

  var computedStyles = editableNode ? getComputedStyle(editableNode) : null;
  return {
    fallbackBackgroundColor: backgroundColor || !computedStyles ? undefined : computedStyles.backgroundColor,
    fallbackTextColor: textColor || !computedStyles ? undefined : computedStyles.color,
    fallbackFontSize: fontSize || customFontSize || !computedStyles ? undefined : parseInt(computedStyles.fontSize) || undefined
  };
});

var ParagraphBlock =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ParagraphBlock, _Component);

  function ParagraphBlock() {
    var _this;

    (0, _classCallCheck2.default)(this, ParagraphBlock);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ParagraphBlock).apply(this, arguments));
    _this.onReplace = _this.onReplace.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleDropCap = _this.toggleDropCap.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.splitBlock = _this.splitBlock.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ParagraphBlock, [{
    key: "onReplace",
    value: function onReplace(blocks) {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          onReplace = _this$props.onReplace;
      onReplace(blocks.map(function (block, index) {
        return index === 0 && block.name === name ? (0, _objectSpread2.default)({}, block, {
          attributes: (0, _objectSpread2.default)({}, attributes, block.attributes)
        }) : block;
      }));
    }
  }, {
    key: "toggleDropCap",
    value: function toggleDropCap() {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      setAttributes({
        dropCap: !attributes.dropCap
      });
    }
  }, {
    key: "getDropCapHelp",
    value: function getDropCapHelp(checked) {
      return checked ? (0, _i18n.__)('Showing large initial letter.') : (0, _i18n.__)('Toggle to show a large initial letter.');
    }
    /**
     * Split handler for RichText value, namely when content is pasted or the
     * user presses the Enter key.
     *
     * @param {?Array}     before Optional before value, to be used as content
     *                            in place of what exists currently for the
     *                            block. If undefined, the block is deleted.
     * @param {?Array}     after  Optional after value, to be appended in a new
     *                            paragraph block to the set of blocks passed
     *                            as spread.
     * @param {...WPBlock} blocks Optional blocks inserted between the before
     *                            and after value blocks.
     */

  }, {
    key: "splitBlock",
    value: function splitBlock(before, after) {
      var _this$props3 = this.props,
          attributes = _this$props3.attributes,
          insertBlocksAfter = _this$props3.insertBlocksAfter,
          setAttributes = _this$props3.setAttributes,
          onReplace = _this$props3.onReplace;

      for (var _len = arguments.length, blocks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        blocks[_key - 2] = arguments[_key];
      }

      if (after !== null) {
        // Append "After" content as a new paragraph block to the end of
        // any other blocks being inserted after the current paragraph.
        blocks.push((0, _blocks.createBlock)(name, {
          content: after
        }));
      }

      if (blocks.length && insertBlocksAfter) {
        insertBlocksAfter(blocks);
      }

      var content = attributes.content;

      if (before === null) {
        // If before content is omitted, treat as intent to delete block.
        onReplace([]);
      } else if (content !== before) {
        // Only update content if it has in-fact changed. In case that user
        // has created a new paragraph at end of an existing one, the value
        // of before will be strictly equal to the current content.
        setAttributes({
          content: before
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props4 = this.props,
          attributes = _this$props4.attributes,
          setAttributes = _this$props4.setAttributes,
          mergeBlocks = _this$props4.mergeBlocks,
          onReplace = _this$props4.onReplace,
          className = _this$props4.className,
          backgroundColor = _this$props4.backgroundColor,
          textColor = _this$props4.textColor,
          setBackgroundColor = _this$props4.setBackgroundColor,
          setTextColor = _this$props4.setTextColor,
          fallbackBackgroundColor = _this$props4.fallbackBackgroundColor,
          fallbackTextColor = _this$props4.fallbackTextColor,
          fallbackFontSize = _this$props4.fallbackFontSize,
          fontSize = _this$props4.fontSize,
          setFontSize = _this$props4.setFontSize,
          isRTL = _this$props4.isRTL;
      var align = attributes.align,
          content = attributes.content,
          dropCap = attributes.dropCap,
          placeholder = attributes.placeholder,
          direction = attributes.direction;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.AlignmentToolbar, {
        value: align,
        onChange: function onChange(nextAlign) {
          setAttributes({
            align: nextAlign
          });
        }
      }), isRTL && (0, _element.createElement)(_components.Toolbar, {
        controls: [{
          icon: 'editor-ltr',
          title: (0, _i18n._x)('Left to right', 'editor button'),
          isActive: direction === 'ltr',
          onClick: function onClick() {
            var nextDirection = direction === 'ltr' ? undefined : 'ltr';
            setAttributes({
              direction: nextDirection
            });
          }
        }]
      })), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Text Settings'),
        className: "blocks-font-size"
      }, (0, _element.createElement)(_blockEditor.FontSizePicker, {
        fallbackFontSize: fallbackFontSize,
        value: fontSize.size,
        onChange: setFontSize
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Drop Cap'),
        checked: !!dropCap,
        onChange: this.toggleDropCap,
        help: this.getDropCapHelp
      })), (0, _element.createElement)(_blockEditor.PanelColorSettings, {
        title: (0, _i18n.__)('Color Settings'),
        initialOpen: false,
        colorSettings: [{
          value: backgroundColor.color,
          onChange: setBackgroundColor,
          label: (0, _i18n.__)('Background Color')
        }, {
          value: textColor.color,
          onChange: setTextColor,
          label: (0, _i18n.__)('Text Color')
        }]
      }, (0, _element.createElement)(_blockEditor.ContrastChecker, (0, _extends2.default)({
        textColor: textColor.color,
        backgroundColor: backgroundColor.color,
        fallbackTextColor: fallbackTextColor,
        fallbackBackgroundColor: fallbackBackgroundColor
      }, {
        fontSize: fontSize.size
      })))), (0, _element.createElement)(_blockEditor.RichText, {
        identifier: "content",
        tagName: "p",
        className: (0, _classnames2.default)('wp-block-paragraph', className, (_classnames = {
          'has-text-color': textColor.color,
          'has-background': backgroundColor.color,
          'has-drop-cap': dropCap
        }, (0, _defineProperty2.default)(_classnames, backgroundColor.class, backgroundColor.class), (0, _defineProperty2.default)(_classnames, textColor.class, textColor.class), (0, _defineProperty2.default)(_classnames, fontSize.class, fontSize.class), _classnames)),
        style: {
          backgroundColor: backgroundColor.color,
          color: textColor.color,
          fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
          textAlign: align,
          direction: direction
        },
        value: content,
        onChange: function onChange(nextContent) {
          setAttributes({
            content: nextContent
          });
        },
        unstableOnSplit: this.splitBlock,
        onMerge: mergeBlocks,
        onReplace: this.onReplace,
        onRemove: function onRemove() {
          return onReplace([]);
        },
        "aria-label": content ? (0, _i18n.__)('Paragraph block') : (0, _i18n.__)('Empty block; start writing or type forward slash to choose a block'),
        placeholder: placeholder || (0, _i18n.__)('Start writing or type / to choose a block')
      }));
    }
  }]);
  return ParagraphBlock;
}(_element.Component);

var ParagraphEdit = (0, _compose.compose)([(0, _blockEditor.withColors)('backgroundColor', {
  textColor: 'color'
}), (0, _blockEditor.withFontSizes)('fontSize'), applyFallbackStyles, (0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    isRTL: getSettings().isRTL
  };
})])(ParagraphBlock);
var _default = ParagraphEdit;
exports.default = _default;
//# sourceMappingURL=edit.js.map