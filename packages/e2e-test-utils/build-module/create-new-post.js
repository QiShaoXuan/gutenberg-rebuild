import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */

import { visitAdminPage } from './visit-admin-page';
/**
 * Creates new post.
 *
 * @param {Object} obj Object to create new post, along with tips enabling option.
 */

export function createNewPost() {
  return _createNewPost.apply(this, arguments);
}

function _createNewPost() {
  _createNewPost = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var _ref,
        postType,
        title,
        content,
        excerpt,
        _ref$enableTips,
        enableTips,
        query,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, postType = _ref.postType, title = _ref.title, content = _ref.content, excerpt = _ref.excerpt, _ref$enableTips = _ref.enableTips, enableTips = _ref$enableTips === void 0 ? false : _ref$enableTips;
            query = addQueryArgs('', {
              post_type: postType,
              post_title: title,
              content: content,
              excerpt: excerpt
            }).slice(1);
            _context.next = 4;
            return visitAdminPage('post-new.php', query);

          case 4:
            _context.next = 6;
            return page.evaluate(function (_enableTips) {
              var action = _enableTips ? 'enableTips' : 'disableTips';
              wp.data.dispatch('core/nux')[action]();
            }, enableTips);

          case 6:
            if (!enableTips) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return page.reload();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _createNewPost.apply(this, arguments);
}
//# sourceMappingURL=create-new-post.js.map