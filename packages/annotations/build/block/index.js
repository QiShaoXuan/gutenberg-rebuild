"use strict";

var _hooks = require("@wordpress/hooks");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */

/**
 * Adds annotation className to the block-list-block component.
 *
 * @param {Object} OriginalComponent The original BlockListBlock component.
 * @return {Object} The enhanced component.
 */
var addAnnotationClassName = function addAnnotationClassName(OriginalComponent) {
  return (0, _data.withSelect)(function (select, _ref) {
    var clientId = _ref.clientId;

    var annotations = select('core/annotations').__experimentalGetAnnotationsForBlock(clientId);

    return {
      className: annotations.map(function (annotation) {
        return 'is-annotated-by-' + annotation.source;
      }).join(' ')
    };
  })(OriginalComponent);
};

(0, _hooks.addFilter)('editor.BlockListBlock', 'core/annotations', addAnnotationClassName);
//# sourceMappingURL=index.js.map