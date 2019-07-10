import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { PostSticky as PostStickyForm, PostStickyCheck } from '@wordpress/editor';
export function PostSticky() {
  return createElement(PostStickyCheck, null, createElement(PanelRow, null, createElement(PostStickyForm, null)));
}
export default PostSticky;
//# sourceMappingURL=index.js.map