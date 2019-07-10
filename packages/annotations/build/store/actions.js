"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__experimentalAddAnnotation = __experimentalAddAnnotation;
exports.__experimentalRemoveAnnotation = __experimentalRemoveAnnotation;
exports.__experimentalUpdateAnnotationRange = __experimentalUpdateAnnotationRange;
exports.__experimentalRemoveAnnotationsBySource = __experimentalRemoveAnnotationsBySource;

var _v = _interopRequireDefault(require("uuid/v4"));

/**
 * External dependencies
 */

/**
 * Adds an annotation to a block.
 *
 * The `block` attribute refers to a block ID that needs to be annotated.
 * `isBlockAnnotation` controls whether or not the annotation is a block
 * annotation. The `source` is the source of the annotation, this will be used
 * to identity groups of annotations.
 *
 * The `range` property is only relevant if the selector is 'range'.
 *
 * @param {Object} annotation         The annotation to add.
 * @param {string} blockClientId      The blockClientId to add the annotation to.
 * @param {string} richTextIdentifier Identifier for the RichText instance the annotation applies to.
 * @param {Object} range              The range at which to apply this annotation.
 * @param {number} range.start        The offset where the annotation should start.
 * @param {number} range.end          The offset where the annotation should end.
 * @param {string} [selector="range"] The way to apply this annotation.
 * @param {string} [source="default"] The source that added the annotation.
 * @param {string} [id=uuid()]        The ID the annotation should have.
 *                                    Generates a UUID by default.
 *
 * @return {Object} Action object.
 */
function __experimentalAddAnnotation(_ref) {
  var blockClientId = _ref.blockClientId,
      _ref$richTextIdentifi = _ref.richTextIdentifier,
      richTextIdentifier = _ref$richTextIdentifi === void 0 ? null : _ref$richTextIdentifi,
      _ref$range = _ref.range,
      range = _ref$range === void 0 ? null : _ref$range,
      _ref$selector = _ref.selector,
      selector = _ref$selector === void 0 ? 'range' : _ref$selector,
      _ref$source = _ref.source,
      source = _ref$source === void 0 ? 'default' : _ref$source,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? (0, _v.default)() : _ref$id;
  var action = {
    type: 'ANNOTATION_ADD',
    id: id,
    blockClientId: blockClientId,
    richTextIdentifier: richTextIdentifier,
    source: source,
    selector: selector
  };

  if (selector === 'range') {
    action.range = range;
  }

  return action;
}
/**
 * Removes an annotation with a specific ID.
 *
 * @param {string} annotationId The annotation to remove.
 *
 * @return {Object} Action object.
 */


function __experimentalRemoveAnnotation(annotationId) {
  return {
    type: 'ANNOTATION_REMOVE',
    annotationId: annotationId
  };
}
/**
 * Updates the range of an annotation.
 *
 * @param {string} annotationId ID of the annotation to update.
 * @param {number} start The start of the new range.
 * @param {number} end The end of the new range.
 *
 * @return {Object} Action object.
 */


function __experimentalUpdateAnnotationRange(annotationId, start, end) {
  return {
    type: 'ANNOTATION_UPDATE_RANGE',
    annotationId: annotationId,
    start: start,
    end: end
  };
}
/**
 * Removes all annotations of a specific source.
 *
 * @param {string} source The source to remove.
 *
 * @return {Object} Action object.
 */


function __experimentalRemoveAnnotationsBySource(source) {
  return {
    type: 'ANNOTATION_REMOVE_SOURCE',
    source: source
  };
}
//# sourceMappingURL=actions.js.map