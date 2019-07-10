/**
 * External dependencies
 */
import { castArray } from 'lodash';
/**
 * WordPress dependencies
 */

import { renderToString } from '@wordpress/element';
/**
 * Internal dependencies
 */

import * as node from './node';
/**
 * A representation of a block's rich text value.
 *
 * @typedef {WPBlockNode[]} WPBlockChildren
 */

/**
 * Given block children, returns a serialize-capable WordPress element.
 *
 * @param {WPBlockChildren} children Block children object to convert.
 *
 * @return {WPElement} A serialize-capable element.
 */

export function getSerializeCapableElement(children) {
  // The fact that block children are compatible with the element serializer is
  // merely an implementation detail that currently serves to be true, but
  // should not be mistaken as being a guarantee on the external API. The
  // public API only offers guarantees to work with strings (toHTML) and DOM
  // elements (fromDOM), and should provide utilities to manipulate the value
  // rather than expect consumers to inspect or construct its shape (concat).
  return children;
}
/**
 * Given block children, returns an array of block nodes.
 *
 * @param {WPBlockChildren} children Block children object to convert.
 *
 * @return {Array<WPBlockNode>} An array of individual block nodes.
 */

function getChildrenArray(children) {
  // The fact that block children are compatible with the element serializer
  // is merely an implementation detail that currently serves to be true, but
  // should not be mistaken as being a guarantee on the external API.
  return children;
}
/**
 * Given two or more block nodes, returns a new block node representing a
 * concatenation of its values.
 *
 * @param {...WPBlockChildren} blockNodes Block nodes to concatenate.
 *
 * @return {WPBlockChildren} Concatenated block node.
 */


export function concat() {
  var result = [];

  for (var i = 0; i < arguments.length; i++) {
    var blockNode = castArray(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    for (var j = 0; j < blockNode.length; j++) {
      var child = blockNode[j];
      var canConcatToPreviousString = typeof child === 'string' && typeof result[result.length - 1] === 'string';

      if (canConcatToPreviousString) {
        result[result.length - 1] += child;
      } else {
        result.push(child);
      }
    }
  }

  return result;
}
/**
 * Given an iterable set of DOM nodes, returns equivalent block children.
 * Ignores any non-element/text nodes included in set.
 *
 * @param {Iterable.<Node>} domNodes Iterable set of DOM nodes to convert.
 *
 * @return {WPBlockChildren} Block children equivalent to DOM nodes.
 */

export function fromDOM(domNodes) {
  var result = [];

  for (var i = 0; i < domNodes.length; i++) {
    try {
      result.push(node.fromDOM(domNodes[i]));
    } catch (error) {// Simply ignore if DOM node could not be converted.
    }
  }

  return result;
}
/**
 * Given a block node, returns its HTML string representation.
 *
 * @param {WPBlockChildren} children Block node(s) to convert to string.
 *
 * @return {string} String HTML representation of block node.
 */

export function toHTML(children) {
  var element = getSerializeCapableElement(children);
  return renderToString(element);
}
/**
 * Given a selector, returns an hpq matcher generating a WPBlockChildren value
 * matching the selector result.
 *
 * @param {string} selector DOM selector.
 *
 * @return {Function} hpq matcher.
 */

export function matcher(selector) {
  return function (domNode) {
    var match = domNode;

    if (selector) {
      match = domNode.querySelector(selector);
    }

    if (match) {
      return fromDOM(match.childNodes);
    }

    return [];
  };
}
export default {
  concat: concat,
  getChildrenArray: getChildrenArray,
  fromDOM: fromDOM,
  toHTML: toHTML,
  matcher: matcher
};
//# sourceMappingURL=children.js.map