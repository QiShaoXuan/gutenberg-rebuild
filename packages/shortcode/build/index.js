"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.next = next;
exports.replace = replace;
exports.string = string;
exports.regexp = regexp;
exports.fromMatch = fromMatch;
exports.default = exports.attrs = void 0;

var _lodash = require("lodash");

var _memize = _interopRequireDefault(require("memize"));

/**
 * External dependencies
 */

/**
 * Shortcode attributes object.
 *
 * @typedef {Object} WPShortcodeAttrs
 *
 * @property {Object} named   Object with named attributes.
 * @property {Array}  numeric Array with numeric attributes.
 */

/**
 * Shortcode object.
 *
 * @typedef {Object} WPShortcode
 *
 * @property {string}           tag     Shortcode tag.
 * @property {WPShortcodeAttrs} attrs   Shortcode attributes.
 * @property {string}           content Shortcode content.
 * @property {string}           type    Shortcode type: `self-closing`,
 *                                      `closed`, or `single`.
 */

/**
 * @typedef {Object} WPShortcodeMatch
 *
 * @property {number}      index     Index the shortcode is found at.
 * @property {string}      content   Matched content.
 * @property {WPShortcode} shortcode Shortcode instance of the match.
 */

/**
 * Find the next matching shortcode.
 *
 * @param {string} tag   Shortcode tag.
 * @param {string} text  Text to search.
 * @param {number} index Index to start search from.
 *
 * @return {?WPShortcodeMatch} Matched information.
 */
function next(tag, text) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var re = regexp(tag);
  re.lastIndex = index;
  var match = re.exec(text);

  if (!match) {
    return;
  } // If we matched an escaped shortcode, try again.


  if ('[' === match[1] && ']' === match[7]) {
    return next(tag, text, re.lastIndex);
  }

  var result = {
    index: match.index,
    content: match[0],
    shortcode: fromMatch(match)
  }; // If we matched a leading `[`, strip it from the match and increment the
  // index accordingly.

  if (match[1]) {
    result.content = result.content.slice(1);
    result.index++;
  } // If we matched a trailing `]`, strip it from the match.


  if (match[7]) {
    result.content = result.content.slice(0, -1);
  }

  return result;
}
/**
 * Replace matching shortcodes in a block of text.
 *
 * @param {string}   tag      Shortcode tag.
 * @param {string}   text     Text to search.
 * @param {Function} callback Function to process the match and return
 *                            replacement string.
 *
 * @return {string} Text with shortcodes replaced.
 */


function replace(tag, text, callback) {
  var _arguments = arguments;
  return text.replace(regexp(tag), function (match, left, $3, attrs, slash, content, closing, right) {
    // If both extra brackets exist, the shortcode has been properly
    // escaped.
    if (left === '[' && right === ']') {
      return match;
    } // Create the match object and pass it through the callback.


    var result = callback(fromMatch(_arguments)); // Make sure to return any of the extra brackets if they weren't used to
    // escape the shortcode.

    return result ? left + result + right : match;
  });
}
/**
 * Generate a string from shortcode parameters.
 *
 * Creates a shortcode instance and returns a string.
 *
 * Accepts the same `options` as the `shortcode()` constructor, containing a
 * `tag` string, a string or object of `attrs`, a boolean indicating whether to
 * format the shortcode using a `single` tag, and a `content` string.
 *
 * @param {Object} options
 *
 * @return {string} String representation of the shortcode.
 */


function string(options) {
  return new shortcode(options).string();
}
/**
 * Generate a RegExp to identify a shortcode.
 *
 * The base regex is functionally equivalent to the one found in
 * `get_shortcode_regex()` in `wp-includes/shortcodes.php`.
 *
 * Capture groups:
 *
 * 1. An extra `[` to allow for escaping shortcodes with double `[[]]`
 * 2. The shortcode name
 * 3. The shortcode argument list
 * 4. The self closing `/`
 * 5. The content of a shortcode when it wraps some content.
 * 6. The closing tag.
 * 7. An extra `]` to allow for escaping shortcodes with double `[[]]`
 *
 * @param {string} tag Shortcode tag.
 *
 * @return {RegExp} Shortcode RegExp.
 */


function regexp(tag) {
  return new RegExp('\\[(\\[?)(' + tag + ')(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)', 'g');
}
/**
 * Parse shortcode attributes.
 *
 * Shortcodes accept many types of attributes. These can chiefly be divided into
 * named and numeric attributes:
 *
 * Named attributes are assigned on a key/value basis, while numeric attributes
 * are treated as an array.
 *
 * Named attributes can be formatted as either `name="value"`, `name='value'`,
 * or `name=value`. Numeric attributes can be formatted as `"value"` or just
 * `value`.
 *
 * @param {string} text Serialised shortcode attributes.
 *
 * @return {WPShortcodeAttrs} Parsed shortcode attributes.
 */


var attrs = (0, _memize.default)(function (text) {
  var named = {};
  var numeric = []; // This regular expression is reused from `shortcode_parse_atts()` in
  // `wp-includes/shortcodes.php`.
  //
  // Capture groups:
  //
  // 1. An attribute name, that corresponds to...
  // 2. a value in double quotes.
  // 3. An attribute name, that corresponds to...
  // 4. a value in single quotes.
  // 5. An attribute name, that corresponds to...
  // 6. an unquoted value.
  // 7. A numeric attribute in double quotes.
  // 8. A numeric attribute in single quotes.
  // 9. An unquoted numeric attribute.

  var pattern = /([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|'([^']*)'(?:\s|$)|(\S+)(?:\s|$)/g; // Map zero-width spaces to actual spaces.

  text = text.replace(/[\u00a0\u200b]/g, ' ');
  var match; // Match and normalize attributes.

  while (match = pattern.exec(text)) {
    if (match[1]) {
      named[match[1].toLowerCase()] = match[2];
    } else if (match[3]) {
      named[match[3].toLowerCase()] = match[4];
    } else if (match[5]) {
      named[match[5].toLowerCase()] = match[6];
    } else if (match[7]) {
      numeric.push(match[7]);
    } else if (match[8]) {
      numeric.push(match[8]);
    } else if (match[9]) {
      numeric.push(match[9]);
    }
  }

  return {
    named: named,
    numeric: numeric
  };
});
/**
 * Generate a Shortcode Object from a RegExp match.
 *
 * Accepts a `match` object from calling `regexp.exec()` on a `RegExp` generated
 * by `regexp()`. `match` can also be set to the `arguments` from a callback
 * passed to `regexp.replace()`.
 *
 * @param {Array} match Match array.
 *
 * @return {WPShortcode} Shortcode instance.
 */

exports.attrs = attrs;

function fromMatch(match) {
  var type;

  if (match[4]) {
    type = 'self-closing';
  } else if (match[6]) {
    type = 'closed';
  } else {
    type = 'single';
  }

  return new shortcode({
    tag: match[2],
    attrs: match[3],
    type: type,
    content: match[5]
  });
}
/**
 * Creates a shortcode instance.
 *
 * To access a raw representation of a shortcode, pass an `options` object,
 * containing a `tag` string, a string or object of `attrs`, a string indicating
 * the `type` of the shortcode ('single', 'self-closing', or 'closed'), and a
 * `content` string.
 *
 * @param {Object} options Options as described.
 *
 * @return {WPShortcode} Shortcode instance.
 */


var shortcode = (0, _lodash.extend)(function (options) {
  var _this = this;

  (0, _lodash.extend)(this, (0, _lodash.pick)(options || {}, 'tag', 'attrs', 'type', 'content'));
  var attributes = this.attrs; // Ensure we have a correctly formatted `attrs` object.

  this.attrs = {
    named: {},
    numeric: []
  };

  if (!attributes) {
    return;
  } // Parse a string of attributes.


  if ((0, _lodash.isString)(attributes)) {
    this.attrs = attrs(attributes); // Identify a correctly formatted `attrs` object.
  } else if ((0, _lodash.isEqual)(Object.keys(attributes), ['named', 'numeric'])) {
    this.attrs = attributes; // Handle a flat object of attributes.
  } else {
    (0, _lodash.forEach)(attributes, function (value, key) {
      _this.set(key, value);
    });
  }
}, {
  next: next,
  replace: replace,
  string: string,
  regexp: regexp,
  attrs: attrs,
  fromMatch: fromMatch
});
(0, _lodash.extend)(shortcode.prototype, {
  /**
   * Get a shortcode attribute.
   *
   * Automatically detects whether `attr` is named or numeric and routes it
   * accordingly.
   *
   * @param {(number|string)} attr Attribute key.
   *
   * @return {string} Attribute value.
   */
  get: function get(attr) {
    return this.attrs[(0, _lodash.isNumber)(attr) ? 'numeric' : 'named'][attr];
  },

  /**
   * Set a shortcode attribute.
   *
   * Automatically detects whether `attr` is named or numeric and routes it
   * accordingly.
   *
   * @param {(number|string)} attr  Attribute key.
   * @param {string}          value Attribute value.
   *
   * @return {WPShortcode} Shortcode instance.
   */
  set: function set(attr, value) {
    this.attrs[(0, _lodash.isNumber)(attr) ? 'numeric' : 'named'][attr] = value;
    return this;
  },

  /**
   * Transform the shortcode into a string.
   *
   * @return {string} String representation of the shortcode.
   */
  string: function string() {
    var text = '[' + this.tag;
    (0, _lodash.forEach)(this.attrs.numeric, function (value) {
      if (/\s/.test(value)) {
        text += ' "' + value + '"';
      } else {
        text += ' ' + value;
      }
    });
    (0, _lodash.forEach)(this.attrs.named, function (value, name) {
      text += ' ' + name + '="' + value + '"';
    }); // If the tag is marked as `single` or `self-closing`, close the tag and
    // ignore any additional content.

    if ('single' === this.type) {
      return text + ']';
    } else if ('self-closing' === this.type) {
      return text + ' /]';
    } // Complete the opening tag.


    text += ']';

    if (this.content) {
      text += this.content;
    } // Add the closing tag.


    return text + '[/' + this.tag + ']';
  }
});
var _default = shortcode;
exports.default = _default;
//# sourceMappingURL=index.js.map