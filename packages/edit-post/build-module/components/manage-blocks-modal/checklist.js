import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { partial } from 'lodash';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { BlockIcon } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';

function BlockTypesChecklist(_ref) {
  var blockTypes = _ref.blockTypes,
      value = _ref.value,
      onItemChange = _ref.onItemChange;
  return createElement("ul", {
    className: "edit-post-manage-blocks-modal__checklist"
  }, blockTypes.map(function (blockType) {
    return createElement("li", {
      key: blockType.name,
      className: "edit-post-manage-blocks-modal__checklist-item"
    }, createElement(CheckboxControl, {
      label: createElement(Fragment, null, blockType.title, createElement(BlockIcon, {
        icon: blockType.icon
      })),
      checked: value.includes(blockType.name),
      onChange: partial(onItemChange, blockType.name)
    }));
  }));
}

export default BlockTypesChecklist;
//# sourceMappingURL=checklist.js.map