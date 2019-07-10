import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { PostAuthor as PostAuthorForm, PostAuthorCheck } from '@wordpress/editor';
export function PostAuthor() {
  return createElement(PostAuthorCheck, null, createElement(PanelRow, null, createElement(PostAuthorForm, null)));
}
export default PostAuthor;
//# sourceMappingURL=index.js.map