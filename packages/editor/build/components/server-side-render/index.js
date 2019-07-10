"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
function _default(_ref) {
  var _ref$urlQueryArgs = _ref.urlQueryArgs,
      urlQueryArgs = _ref$urlQueryArgs === void 0 ? {} : _ref$urlQueryArgs,
      props = (0, _objectWithoutProperties2.default)(_ref, ["urlQueryArgs"]);

  var _select = (0, _data.select)('core/editor'),
      getCurrentPostId = _select.getCurrentPostId;

  urlQueryArgs = (0, _objectSpread2.default)({
    post_id: getCurrentPostId()
  }, urlQueryArgs);
  return (0, _element.createElement)(_components.ServerSideRender, (0, _extends2.default)({
    urlQueryArgs: urlQueryArgs
  }, props));
}
//# sourceMappingURL=index.js.map