"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlockMoverDescription = getBlockMoverDescription;
exports.getMultiBlockMoverDescription = getMultiBlockMoverDescription;

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */

/**
 * Return a label for the block movement controls depending on block position.
 *
 * @param {number}  selectedCount Number of blocks selected.
 * @param {string}  type          Block type - in the case of a single block, should
 *                                 define its 'type'. I.e. 'Text', 'Heading', 'Image' etc.
 * @param {number}  firstIndex    The index (position - 1) of the first block selected.
 * @param {boolean} isFirst       This is the first block.
 * @param {boolean} isLast        This is the last block.
 * @param {number}  dir           Direction of movement (> 0 is considered to be going
 *                                 down, < 0 is up).
 *
 * @return {string} Label for the block movement controls.
 */
function getBlockMoverDescription(selectedCount, type, firstIndex, isFirst, isLast, dir) {
  var position = firstIndex + 1;

  if (selectedCount > 1) {
    return getMultiBlockMoverDescription(selectedCount, firstIndex, isFirst, isLast, dir);
  }

  if (isFirst && isLast) {
    // translators: %s: Type of block (i.e. Text, Image etc)
    return (0, _i18n.sprintf)((0, _i18n.__)('Block %s is the only block, and cannot be moved'), type);
  }

  if (dir > 0 && !isLast) {
    // moving down
    return (0, _i18n.sprintf)( // translators: 1: Type of block (i.e. Text, Image etc), 2: Position of selected block, 3: New position
    (0, _i18n.__)('Move %1$s block from position %2$d down to position %3$d'), type, position, position + 1);
  }

  if (dir > 0 && isLast) {
    // moving down, and is the last item
    // translators: %s: Type of block (i.e. Text, Image etc)
    return (0, _i18n.sprintf)((0, _i18n.__)('Block %s is at the end of the content and can’t be moved down'), type);
  }

  if (dir < 0 && !isFirst) {
    // moving up
    return (0, _i18n.sprintf)( // translators: 1: Type of block (i.e. Text, Image etc), 2: Position of selected block, 3: New position
    (0, _i18n.__)('Move %1$s block from position %2$d up to position %3$d'), type, position, position - 1);
  }

  if (dir < 0 && isFirst) {
    // moving up, and is the first item
    // translators: %s: Type of block (i.e. Text, Image etc)
    return (0, _i18n.sprintf)((0, _i18n.__)('Block %s is at the beginning of the content and can’t be moved up'), type);
  }
}
/**
 * Return a label for the block movement controls depending on block position.
 *
 * @param {number}  selectedCount Number of blocks selected.
 * @param {number}  firstIndex    The index (position - 1) of the first block selected.
 * @param {boolean} isFirst       This is the first block.
 * @param {boolean} isLast        This is the last block.
 * @param {number}  dir           Direction of movement (> 0 is considered to be going
 *                                 down, < 0 is up).
 *
 * @return {string} Label for the block movement controls.
 */


function getMultiBlockMoverDescription(selectedCount, firstIndex, isFirst, isLast, dir) {
  var position = firstIndex + 1;

  if (dir < 0 && isFirst) {
    return (0, _i18n.__)('Blocks cannot be moved up as they are already at the top');
  }

  if (dir > 0 && isLast) {
    return (0, _i18n.__)('Blocks cannot be moved down as they are already at the bottom');
  }

  if (dir < 0 && !isFirst) {
    return (0, _i18n.sprintf)( // translators: 1: Number of selected blocks, 2: Position of selected blocks
    (0, _i18n._n)('Move %1$d block from position %2$d up by one place', 'Move %1$d blocks from position %2$d up by one place', selectedCount), selectedCount, position);
  }

  if (dir > 0 && !isLast) {
    return (0, _i18n.sprintf)( // translators: 1: Number of selected blocks, 2: Position of selected blocks
    (0, _i18n._n)('Move %1$d block from position %2$d down by one place', 'Move %1$d blocks from position %2$d down by one place', selectedCount), selectedCount, position);
  }
}
//# sourceMappingURL=mover-description.js.map