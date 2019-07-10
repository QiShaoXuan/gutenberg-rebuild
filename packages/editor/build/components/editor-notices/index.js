"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorNotices = EditorNotices;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _templateValidationNotice = _interopRequireDefault(require("../template-validation-notice"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function EditorNotices(_ref) {
  var dismissible = _ref.dismissible,
      notices = _ref.notices,
      props = (0, _objectWithoutProperties2.default)(_ref, ["dismissible", "notices"]);

  if (dismissible !== undefined) {
    notices = (0, _lodash.filter)(notices, {
      isDismissible: dismissible
    });
  }

  return (0, _element.createElement)(_components.NoticeList, (0, _extends2.default)({
    notices: notices
  }, props), dismissible !== false && (0, _element.createElement)(_templateValidationNotice.default, null));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    notices: select('core/notices').getNotices()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onRemove: dispatch('core/notices').removeNotice
  };
})])(EditorNotices);

exports.default = _default;
//# sourceMappingURL=index.js.map