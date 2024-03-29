/**
 * External dependencies
 */
import { difference } from 'lodash';
/**
 * Internal dependencies
 */

import { isPhrasingContent } from './phrasing-content';
/**
 * Checks if the given node should be considered inline content, optionally
 * depending on a context tag.
 *
 * @param {Node}   node       Node name.
 * @param {string} contextTag Tag name.
 *
 * @return {boolean} True if the node is inline content, false if nohe.
 */

function isInline(node, contextTag) {
  if (isPhrasingContent(node)) {
    return true;
  }

  if (!contextTag) {
    return false;
  }

  var tag = node.nodeName.toLowerCase();
  var inlineWhitelistTagGroups = [['ul', 'li', 'ol'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']];
  return inlineWhitelistTagGroups.some(function (tagGroup) {
    return difference([tag, contextTag], tagGroup).length === 0;
  });
}

function deepCheck(nodes, contextTag) {
  return nodes.every(function (node) {
    return isInline(node, contextTag) && deepCheck(Array.from(node.children), contextTag);
  });
}

function isDoubleBR(node) {
  return node.nodeName === 'BR' && node.previousSibling && node.previousSibling.nodeName === 'BR';
}

export default function (HTML, contextTag) {
  var doc = document.implementation.createHTMLDocument('');
  doc.body.innerHTML = HTML;
  var nodes = Array.from(doc.body.children);
  return !nodes.some(isDoubleBR) && deepCheck(nodes, contextTag);
}
//# sourceMappingURL=is-inline-content.js.map