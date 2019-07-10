import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

/**
 * External dependencies
 */
var escapeStringRegexp = require('escape-string-regexp');
/**
 * Webpack plugin for handling specific template tags in Webpack configuration
 * values like those supported in the base Webpack functionality (e.g. `name`).
 *
 * @see webpack.TemplatedPathPlugin
 */


var CustomTemplatedPathPlugin =
/*#__PURE__*/
function () {
  /**
   * CustomTemplatedPathPlugin constructor. Initializes handlers as a tuple
   * set of RegExp, handler, where the regular expression is used in matching
   * a Webpack asset path.
   *
   * @param {Object.<string,Function>} handlers Object keyed by tag to match,
   *                                            with function value returning
   *                                            replacement string.
   */
  function CustomTemplatedPathPlugin(handlers) {
    _classCallCheck(this, CustomTemplatedPathPlugin);

    this.handlers = [];

    var _arr = Object.entries(handlers);

    for (var _i = 0; _i < _arr.length; _i++) {
      var _arr$_i = _slicedToArray(_arr[_i], 2),
          key = _arr$_i[0],
          handler = _arr$_i[1];

      var regexp = new RegExp("\\[".concat(escapeStringRegexp(key), "\\]"), 'gi');
      this.handlers.push([regexp, handler]);
    }
  }
  /**
   * Webpack plugin application logic.
   *
   * @param {Object} compiler Webpack compiler
   */


  _createClass(CustomTemplatedPathPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.compilation.tap('CustomTemplatedPathPlugin', function (compilation) {
        compilation.mainTemplate.hooks.assetPath.tap('CustomTemplatedPathPlugin', function (path, data) {
          for (var i = 0; i < _this.handlers.length; i++) {
            var _this$handlers$i = _slicedToArray(_this.handlers[i], 2),
                regexp = _this$handlers$i[0],
                handler = _this$handlers$i[1];

            if (regexp.test(path)) {
              return path.replace(regexp, handler(path, data));
            }
          }

          return path;
        });
      });
    }
  }]);

  return CustomTemplatedPathPlugin;
}();

module.exports = CustomTemplatedPathPlugin;
//# sourceMappingURL=index.js.map