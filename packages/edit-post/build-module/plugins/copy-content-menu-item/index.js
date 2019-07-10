import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { ClipboardButton } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { withState, compose } from '@wordpress/compose';

function CopyContentMenuItem(_ref) {
  var editedPostContent = _ref.editedPostContent,
      hasCopied = _ref.hasCopied,
      setState = _ref.setState;
  return createElement(ClipboardButton, {
    text: editedPostContent,
    className: "components-menu-item__button",
    onCopy: function onCopy() {
      return setState({
        hasCopied: true
      });
    },
    onFinishCopy: function onFinishCopy() {
      return setState({
        hasCopied: false
      });
    }
  }, hasCopied ? __('Copied!') : __('Copy All Content'));
}

export default compose(withSelect(function (select) {
  return {
    editedPostContent: select('core/editor').getEditedPostAttribute('content')
  };
}), withState({
  hasCopied: false
}))(CopyContentMenuItem);
//# sourceMappingURL=index.js.map