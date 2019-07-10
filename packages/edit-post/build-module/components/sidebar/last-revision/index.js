import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { PostLastRevision, PostLastRevisionCheck } from '@wordpress/editor';

function LastRevision() {
  return createElement(PostLastRevisionCheck, null, createElement(PanelBody, {
    className: "edit-post-last-revision__panel"
  }, createElement(PostLastRevision, null)));
}

export default LastRevision;
//# sourceMappingURL=index.js.map