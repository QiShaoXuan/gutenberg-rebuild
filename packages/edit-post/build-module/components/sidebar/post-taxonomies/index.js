import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PostTaxonomies as PostTaxonomiesForm, PostTaxonomiesCheck } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import TaxonomyPanel from './taxonomy-panel';

function PostTaxonomies() {
  return createElement(PostTaxonomiesCheck, null, createElement(PostTaxonomiesForm, {
    taxonomyWrapper: function taxonomyWrapper(content, taxonomy) {
      return createElement(TaxonomyPanel, {
        taxonomy: taxonomy
      }, content);
    }
  }));
}

export default PostTaxonomies;
//# sourceMappingURL=index.js.map