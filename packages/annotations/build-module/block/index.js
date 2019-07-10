/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { withSelect } from '@wordpress/data';
/**
 * Adds annotation className to the block-list-block component.
 *
 * @param {Object} OriginalComponent The original BlockListBlock component.
 * @return {Object} The enhanced component.
 */

var addAnnotationClassName = function addAnnotationClassName(OriginalComponent) {
  return withSelect(function (select, _ref) {
    var clientId = _ref.clientId;

    var annotations = select('core/annotations').__experimentalGetAnnotationsForBlock(clientId);

    return {
      className: annotations.map(function (annotation) {
        return 'is-annotated-by-' + annotation.source;
      }).join(' ')
    };
  })(OriginalComponent);
};

addFilter('editor.BlockListBlock', 'core/annotations', addAnnotationClassName);
//# sourceMappingURL=index.js.map