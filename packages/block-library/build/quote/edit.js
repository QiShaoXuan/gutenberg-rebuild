"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = QuoteEdit;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _contants = require("./contants");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function QuoteEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      isSelected = _ref.isSelected,
      mergeBlocks = _ref.mergeBlocks,
      onReplace = _ref.onReplace,
      className = _ref.className;
  var align = attributes.align,
      value = attributes.value,
      citation = attributes.citation;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.AlignmentToolbar, {
    value: align,
    onChange: function onChange(nextAlign) {
      setAttributes({
        align: nextAlign
      });
    }
  })), (0, _element.createElement)("blockquote", {
    className: className,
    style: {
      textAlign: align
    }
  }, (0, _element.createElement)(_blockEditor.RichText, {
    identifier: _contants.ATTRIBUTE_QUOTE,
    multiline: true,
    value: value,
    onChange: function onChange(nextValue) {
      return setAttributes({
        value: nextValue
      });
    },
    onMerge: mergeBlocks,
    onRemove: function onRemove(forward) {
      var hasEmptyCitation = !citation || citation.length === 0;

      if (!forward && hasEmptyCitation) {
        onReplace([]);
      }
    },
    placeholder: // translators: placeholder text used for the quote
    (0, _i18n.__)('Write quote…')
  }), (!_blockEditor.RichText.isEmpty(citation) || isSelected) && (0, _element.createElement)(_blockEditor.RichText, {
    identifier: _contants.ATTRIBUTE_CITATION,
    value: citation,
    onChange: function onChange(nextCitation) {
      return setAttributes({
        citation: nextCitation
      });
    },
    placeholder: // translators: placeholder text used for the citation
    (0, _i18n.__)('Write citation…'),
    className: "wp-block-quote__citation"
  })));
}
//# sourceMappingURL=edit.js.map