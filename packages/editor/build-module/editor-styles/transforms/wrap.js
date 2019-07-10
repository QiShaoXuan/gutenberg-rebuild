import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { includes } from 'lodash';
/**
 * @const string IS_ROOT_TAG Regex to check if the selector is a root tag selector.
 */

var IS_ROOT_TAG = /^(body|html|:root).*$/;

var wrap = function wrap(namespace) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function (node) {
    var updateSelector = function updateSelector(selector) {
      if (includes(ignore, selector.trim())) {
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
      return _objectSpread({}, node, {
        selectors: node.selectors.map(updateSelector)
      });
    }

    return node;
  };
};

export default wrap;
//# sourceMappingURL=wrap.js.map