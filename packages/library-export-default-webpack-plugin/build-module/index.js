import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

/**
 * External dependencies
 */
var _require = require('lodash'),
    includes = _require.includes;

var _require2 = require('webpack-sources'),
    ConcatSource = _require2.ConcatSource;

module.exports =
/*#__PURE__*/
function () {
  function LibraryExportDefaultPlugin(entryPointNames) {
    _classCallCheck(this, LibraryExportDefaultPlugin);

    this.entryPointNames = entryPointNames;
  }

  _createClass(LibraryExportDefaultPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.compilation.tap('LibraryExportDefaultPlugin', function (compilation) {
        var mainTemplate = compilation.mainTemplate,
            chunkTemplate = compilation.chunkTemplate;

        var onRenderWithEntry = function onRenderWithEntry(source, chunk) {
          if (!includes(_this.entryPointNames, chunk.name)) {
            return source;
          }

          return new ConcatSource(source, '["default"]');
        };

        var _arr = [mainTemplate, chunkTemplate];

        for (var _i = 0; _i < _arr.length; _i++) {
          var template = _arr[_i];
          template.hooks.renderWithEntry.tap('LibraryExportDefaultPlugin', onRenderWithEntry);
        }

        mainTemplate.hooks.hash.tap('LibraryExportDefaultPlugin', function (hash) {
          hash.update('export property');
          hash.update('default');
        });
      });
    }
  }]);

  return LibraryExportDefaultPlugin;
}();
//# sourceMappingURL=index.js.map