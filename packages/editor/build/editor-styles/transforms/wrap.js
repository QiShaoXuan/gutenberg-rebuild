"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * @const string IS_ROOT_TAG Regex to check if the selector is a root tag selector.
 */
var IS_ROOT_TAG = /^(body|html|:root).*$/;

var wrap = function wrap(namespace) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function (node) {
    var updateSelector = function updateSelector(selector) {
      if ((0, _lodash.includes)(ignore, selector.trim())) {
        return selector;
      } // Anything other than a root tag is always prefixed.


      {
        if (!selector.match(IS_ROOT_TAG)) {
          return namespace + ' ' + selector;
        }
      } // HTML and Body elements cannot be contained within our container so lets extract their styles.

      return selector.replace(/^(body|html|:root)/, namespace);
    };

    if (node.type === 'rule') {
      return (0, _objectSpread2.default)({}, node, {
        selectors: node.selectors.map(updateSelector)
      });
    }

    return node;
  };
};

var _default = wrap;
exports.default = _default;
//# sourceMappingURL=wrap.js.map