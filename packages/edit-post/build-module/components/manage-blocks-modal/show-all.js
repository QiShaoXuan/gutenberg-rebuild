import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withInstanceId } from '@wordpress/compose';
import { FormToggle } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function BlockManagerShowAll(_ref) {
  var instanceId = _ref.instanceId,
      checked = _ref.checked,
      _onChange = _ref.onChange;
  var id = 'edit-post-manage-blocks-modal__show-all-' + instanceId;
  return createElement("div", {
    className: "edit-post-manage-blocks-modal__show-all"
  }, createElement("label", {
    htmlFor: id,
    className: "edit-post-manage-blocks-modal__show-all-label"
  },
  /* translators: Checkbox toggle label */
  __('Show section')), createElement(FormToggle, {
    id: id,
    checked: checked,
    onChange: function onChange(event) {
      return _onChange(event.target.checked);
    }
  }));
}

export default withInstanceId(BlockManagerShowAll);
//# sourceMappingURL=show-all.js.map