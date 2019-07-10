import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { PostPendingStatus as PostPendingStatusForm, PostPendingStatusCheck } from '@wordpress/editor';
export function PostPendingStatus() {
  return createElement(PostPendingStatusCheck, null, createElement(PanelRow, null, createElement(PostPendingStatusForm, null)));
}
export default PostPendingStatus;
//# sourceMappingURL=index.js.map