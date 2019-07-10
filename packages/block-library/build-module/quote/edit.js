import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import { ATTRIBUTE_QUOTE, ATTRIBUTE_CITATION } from './contants';
export default function QuoteEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      isSelected = _ref.isSelected,
      mergeBlocks = _ref.mergeBlocks,
      onReplace = _ref.onReplace,
      className = _ref.className;
  var align = attributes.align,
      value = attributes.value,
      citation = attributes.citation;
  return createElement(Fragment, null, createElement(BlockControls, null, createElement(AlignmentToolbar, {
    value: align,
    onChange: function onChange(nextAlign) {
      setAttributes({
        align: nextAlign
      });
    }
  })), createElement("blockquote", {
    className: className,
    style: {
      textAlign: align
    }
  }, createElement(RichText, {
    identifier: ATTRIBUTE_QUOTE,
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
    __('Write quote…')
  }), (!RichText.isEmpty(citation) || isSelected) && createElement(RichText, {
    identifier: ATTRIBUTE_CITATION,
    value: citation,
    onChange: function onChange(nextCitation) {
      return setAttributes({
        citation: nextCitation
      });
    },
    placeholder: // translators: placeholder text used for the citation
    __('Write citation…'),
    className: "wp-block-quote__citation"
  })));
}
//# sourceMappingURL=edit.js.map