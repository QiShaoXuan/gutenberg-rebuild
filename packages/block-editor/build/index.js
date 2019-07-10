"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SETTINGS_DEFAULTS: true
};
Object.defineProperty(exports, "SETTINGS_DEFAULTS", {
  enumerable: true,
  get: function get() {
    return _defaults.SETTINGS_DEFAULTS;
  }
});

require("@wordpress/blocks");

require("@wordpress/core-data");

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

var _defaults = require("./store/defaults");
//# sourceMappingURL=index.js.map