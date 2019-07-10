import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { CheckboxControl } from '@wordpress/components';

function BaseOption(_ref) {
  var label = _ref.label,
      isChecked = _ref.isChecked,
      onChange = _ref.onChange;
  return createElement(CheckboxControl, {
    className: "edit-post-options-modal__option",
    label: label,
    checked: isChecked,
    onChange: onChange
  });
}

export default BaseOption;
//# sourceMappingURL=base.js.map