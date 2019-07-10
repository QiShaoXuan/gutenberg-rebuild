import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { PostTrash as PostTrashLink, PostTrashCheck } from '@wordpress/editor';
export default function PostTrash() {
  return createElement(PostTrashCheck, null, createElement(PanelRow, null, createElement(PostTrashLink, null)));
}
//# sourceMappingURL=index.js.map