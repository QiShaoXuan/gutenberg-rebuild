"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ListEdit;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function ListEdit(_ref) {
  var attributes = _ref.attributes,
      insertBlocksAfter = _ref.insertBlocksAfter,
      setAttributes = _ref.setAttributes,
      mergeBlocks = _ref.mergeBlocks,
      onReplace = _ref.onReplace,
      className = _ref.className;
  var ordered = attributes.ordered,
      values = attributes.values;
  return (0, _element.createElement)(_blockEditor.RichText, {
    identifier: "values",
    multiline: "li",
    tagName: ordered ? 'ol' : 'ul',
    onChange: function onChange(nextValues) {
      return setAttributes({
        values: nextValues
      });
    },
    value: values,
    wrapperClassName: "block-library-list",
    className: className,
    placeholder: (0, _i18n.__)('Write list…'),
    onMerge: mergeBlocks,
    unstableOnSplit: insertBlocksAfter ? function (before, after) {
      for (var _len = arguments.length, blocks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        blocks[_key - 2] = arguments[_key];
      }

      if (!blocks.length) {
        blocks.push((0, _blocks.createBlock)('core/paragraph'));
      }

      if (after !== '<li></li>') {
        blocks.push((0, _blocks.createBlock)('core/list', {
          ordered: ordered,
          values: after
        }));
      }

      setAttributes({
        values: before
      });
      insertBlocksAfter(blocks);
    } : undefined,
    onRemove: function onRemove() {
      return onReplace([]);
    },
    onTagNameChange: function onTagNameChange(tag) {
      return setAttributes({
        ordered: tag === 'ol'
      });
    }
  });
}
//# sourceMappingURL=edit.js.map