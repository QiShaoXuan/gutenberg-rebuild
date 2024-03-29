/**
 * WordPress dependencies
 */
import { wrap, replaceTag } from '@wordpress/dom';
export default function (node, doc) {
  // In jsdom-jscore, 'node.style' can be null.
  // TODO: Explore fixing this by patching jsdom-jscore.
  if (node.nodeName === 'SPAN' && node.style) {
    var _node$style = node.style,
        fontWeight = _node$style.fontWeight,
        fontStyle = _node$style.fontStyle,
        textDecorationLine = _node$style.textDecorationLine,
        verticalAlign = _node$style.verticalAlign;

    if (fontWeight === 'bold' || fontWeight === '700') {
      wrap(doc.createElement('strong'), node);
    }

    if (fontStyle === 'italic') {
      wrap(doc.createElement('em'), node);
    }

    if (textDecorationLine === 'line-through') {
      wrap(doc.createElement('s'), node);
    }

    if (verticalAlign === 'super') {
      wrap(doc.createElement('sup'), node);
    } else if (verticalAlign === 'sub') {
      wrap(doc.createElement('sub'), node);
    }
  } else if (node.nodeName === 'B') {
    node = replaceTag(node, 'strong');
  } else if (node.nodeName === 'I') {
    node = replaceTag(node, 'em');
  } else if (node.nodeName === 'A') {
    // In jsdom-jscore, 'node.target' can be null.
    // TODO: Explore fixing this by patching jsdom-jscore.
    if (node.target && node.target.toLowerCase() === '_blank') {
      node.rel = 'noreferrer noopener';
    } else {
      node.removeAttribute('target');
      node.removeAttribute('rel');
    }
  }
}
//# sourceMappingURL=phrasing-content-reducer.js.map