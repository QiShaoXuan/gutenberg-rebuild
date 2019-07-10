import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { PostFormat as PostFormatForm, PostFormatCheck } from '@wordpress/editor';
export function PostFormat() {
  return createElement(PostFormatCheck, null, createElement(PanelRow, null, createElement(PostFormatForm, null)));
}
export default PostFormat;
//# sourceMappingURL=index.js.map