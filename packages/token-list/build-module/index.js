import _regeneratorRuntime from "@babel/runtime/regenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

/**
 * External dependencies
 */
import { uniq, compact, without } from 'lodash';
/**
 * A set of tokens.
 *
 * @link https://dom.spec.whatwg.org/#domtokenlist
 */

var TokenList =
/*#__PURE__*/
function () {
  /**
   * Constructs a new instance of TokenList.
   *
   * @param {string} initialValue Initial value to assign.
   */
  function TokenList() {
    var _this = this;

    var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, TokenList);

    this.value = initialValue;
    ['entries', 'forEach', 'keys', 'values'].forEach(function (fn) {
      _this[fn] = function () {
        var _this$_valueAsArray;

        return (_this$_valueAsArray = this._valueAsArray)[fn].apply(_this$_valueAsArray, arguments);
      }.bind(_this);
    });
  }
  /**
   * Returns the associated set as string.
   *
   * @link https://dom.spec.whatwg.org/#dom-domtokenlist-value
   *
   * @return {string} Token set as string.
   */


  _createClass(TokenList, [{
    key: "toString",

    /**
     * Returns the stringified form of the TokenList.
     *
     * @link https://dom.spec.whatwg.org/#DOMTokenList-stringification-behavior
     * @link https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tostring
     *
     * @return {string} Token set as string.
     */
    value: function toString() {
      return this.value;
    }
    /**
     * Returns an iterator for the TokenList, iterating items of the set.
     *
     * @link https://dom.spec.whatwg.org/#domtokenlist
     *
     * @return {Generator} TokenList iterator.
     */

  }, {
    key: Symbol.iterator,
    value:
    /*#__PURE__*/
    _regeneratorRuntime.mark(function value() {
      return _regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.delegateYield(this._valueAsArray, "t0", 1);

            case 1:
              return _context.abrupt("return", _context.t0);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
    /**
     * Returns the token with index `index`.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-item
     *
     * @param {number} index Index at which to return token.
     *
     * @return {?string} Token at index.
     */

  }, {
    key: "item",
    value: function item(index) {
      return this._valueAsArray[index];
    }
    /**
     * Returns true if `token` is present, and false otherwise.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-contains
     *
     * @param {string} item Token to test.
     *
     * @return {boolean} Whether token is present.
     */

  }, {
    key: "contains",
    value: function contains(item) {
      return this._valueAsArray.indexOf(item) !== -1;
    }
    /**
     * Adds all arguments passed, except those already present.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-add
     *
     * @param {...string} items Items to add.
     */

  }, {
    key: "add",
    value: function add() {
      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      this.value += ' ' + items.join(' ');
    }
    /**
     * Removes arguments passed, if they are present.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-remove
     *
     * @param {...string} items Items to remove.
     */

  }, {
    key: "remove",
    value: function remove() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      this.value = without.apply(void 0, [this._valueAsArray].concat(items)).join(' ');
    }
    /**
     * If `force` is not given, "toggles" `token`, removing it if it’s present
     * and adding it if it’s not present. If `force` is true, adds token (same
     * as add()). If force is false, removes token (same as remove()). Returns
     * true if `token` is now present, and false otherwise.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-toggle
     *
     * @param {string}   token Token to toggle.
     * @param {?boolean} force Presence to force.
     *
     * @return {boolean} Whether token is present after toggle.
     */

  }, {
    key: "toggle",
    value: function toggle(token, force) {
      if (undefined === force) {
        force = !this.contains(token);
      }

      if (force) {
        this.add(token);
      } else {
        this.remove(token);
      }

      return force;
    }
    /**
     * Replaces `token` with `newToken`. Returns true if `token` was replaced
     * with `newToken`, and false otherwise.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-replace
     *
     * @param {string} token    Token to replace with `newToken`.
     * @param {string} newToken Token to use in place of `token`.
     *
     * @return {boolean} Whether replacement occurred.
     */

  }, {
    key: "replace",
    value: function replace(token, newToken) {
      if (!this.contains(token)) {
        return false;
      }

      this.remove(token);
      this.add(newToken);
      return true;
    }
    /**
     * Returns true if `token` is in the associated attribute’s supported
     * tokens. Returns false otherwise.
     *
     * Always returns `true` in this implementation.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-supports
     *
     * @return {boolean} Whether token is supported.
     */

  }, {
    key: "supports",
    value: function supports() {
      return true;
    }
  }, {
    key: "value",
    get: function get() {
      return this._currentValue;
    }
    /**
     * Replaces the associated set with a new string value.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-value
     *
     * @param {string} value New token set as string.
     */
    ,
    set: function set(value) {
      value = String(value);
      this._valueAsArray = uniq(compact(value.split(/\s+/g)));
      this._currentValue = this._valueAsArray.join(' ');
    }
    /**
     * Returns the number of tokens.
     *
     * @link https://dom.spec.whatwg.org/#dom-domtokenlist-length
     *
     * @return {number} Number of tokens.
     */

  }, {
    key: "length",
    get: function get() {
      return this._valueAsArray.length;
    }
  }]);

  return TokenList;
}();

export { TokenList as default };
//# sourceMappingURL=index.js.map