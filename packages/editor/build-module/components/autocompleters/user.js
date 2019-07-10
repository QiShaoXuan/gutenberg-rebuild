import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
/**
* A user mentions completer.
*
* @type {Completer}
*/

export default {
  name: 'users',
  className: 'editor-autocompleters__user',
  triggerPrefix: '@',
  options: function options(search) {
    var payload = '';

    if (search) {
      payload = '?search=' + encodeURIComponent(search);
    }

    return apiFetch({
      path: '/wp/v2/users' + payload
    });
  },
  isDebounced: true,
  getOptionKeywords: function getOptionKeywords(user) {
    return [user.slug, user.name];
  },
  getOptionLabel: function getOptionLabel(user) {
    return [createElement("img", {
      key: "avatar",
      className: "editor-autocompleters__user-avatar",
      alt: "",
      src: user.avatar_urls[24]
    }), createElement("span", {
      key: "name",
      className: "editor-autocompleters__user-name"
    }, user.name), createElement("span", {
      key: "slug",
      className: "editor-autocompleters__user-slug"
    }, user.slug)];
  },
  getOptionCompletion: function getOptionCompletion(user) {
    return "@".concat(user.slug);
  }
};
//# sourceMappingURL=user.js.map