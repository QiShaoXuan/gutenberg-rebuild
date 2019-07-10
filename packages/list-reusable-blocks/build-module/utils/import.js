import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import { isString } from 'lodash';
/**
 * WordPress dependencies
 */

import apiFetch from '@wordpress/api-fetch';
/**
 * Internal dependencies
 */

import { readTextFile } from './file';
/**
 * Import a reusable block from a JSON file.
 *
 * @param {File}     file File.
 * @return {Promise} Promise returning the imported reusable block.
 */

function importReusableBlock(_x) {
  return _importReusableBlock.apply(this, arguments);
}

function _importReusableBlock() {
  _importReusableBlock = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(file) {
    var fileContent, parsedContent, postType, reusableBlock;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readTextFile(file);

          case 2:
            fileContent = _context.sent;
            _context.prev = 3;
            parsedContent = JSON.parse(fileContent);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](3);
            throw new Error('Invalid JSON file');

          case 10:
            if (!(parsedContent.__file !== 'wp_block' || !parsedContent.title || !parsedContent.content || !isString(parsedContent.title) || !isString(parsedContent.content))) {
              _context.next = 12;
              break;
            }

            throw new Error('Invalid Reusable Block JSON file');

          case 12:
            _context.next = 14;
            return apiFetch({
              path: "/wp/v2/types/wp_block"
            });

          case 14:
            postType = _context.sent;
            _context.next = 17;
            return apiFetch({
              path: "/wp/v2/".concat(postType.rest_base),
              data: {
                title: parsedContent.title,
                content: parsedContent.content,
                status: 'publish'
              },
              method: 'POST'
            });

          case 17:
            reusableBlock = _context.sent;
            return _context.abrupt("return", reusableBlock);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 7]]);
  }));
  return _importReusableBlock.apply(this, arguments);
}

export default importReusableBlock;
//# sourceMappingURL=import.js.map