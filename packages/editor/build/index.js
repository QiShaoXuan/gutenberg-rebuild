"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  transformStyles: true
};
Object.defineProperty(exports, "transformStyles", {
  enumerable: true,
  get: function get() {
    return _editorStyles.default;
  }
});

require("@wordpress/block-editor");

require("@wordpress/blocks");

require("@wordpress/core-data");

require("@wordpress/notices");

require("@wordpress/nux");

require("@wordpress/rich-text");

require("@wordpress/viewport");

require("./store");

require("./hooks");

var _components = require("./components");

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _editorStyles = _interopRequireDefault(require("./editor-styles"));
//# sourceMappingURL=index.js.map