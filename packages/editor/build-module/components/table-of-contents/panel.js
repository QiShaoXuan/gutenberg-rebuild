import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import WordCount from '../word-count';
import DocumentOutline from '../document-outline';

function TableOfContentsPanel(_ref) {
  var headingCount = _ref.headingCount,
      paragraphCount = _ref.paragraphCount,
      numberOfBlocks = _ref.numberOfBlocks,
      hasOutlineItemsDisabled = _ref.hasOutlineItemsDisabled,
      onRequestClose = _ref.onRequestClose;
  return createElement(Fragment, null, createElement("div", {
    className: "table-of-contents__counts",
    role: "note",
    "aria-label": __('Document Statistics'),
    tabIndex: "0"
  }, createElement("div", {
    className: "table-of-contents__count"
  }, __('Words'), createElement(WordCount, null)), createElement("div", {
    className: "table-of-contents__count"
  }, __('Headings'), createElement("span", {
    className: "table-of-contents__number"
  }, headingCount)), createElement("div", {
    className: "table-of-contents__count"
  }, __('Paragraphs'), createElement("span", {
    className: "table-of-contents__number"
  }, paragraphCount)), createElement("div", {
    className: "table-of-contents__count"
  }, __('Blocks'), createElement("span", {
    className: "table-of-contents__number"
  }, numberOfBlocks))), headingCount > 0 && createElement(Fragment, null, createElement("hr", null), createElement("span", {
    className: "table-of-contents__title"
  }, __('Document Outline')), createElement(DocumentOutline, {
    onSelect: onRequestClose,
    hasOutlineItemsDisabled: hasOutlineItemsDisabled
  })));
}

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getGlobalBlockCount = _select.getGlobalBlockCount;

  return {
    headingCount: getGlobalBlockCount('core/heading'),
    paragraphCount: getGlobalBlockCount('core/paragraph'),
    numberOfBlocks: getGlobalBlockCount()
  };
})(TableOfContentsPanel);
//# sourceMappingURL=panel.js.map