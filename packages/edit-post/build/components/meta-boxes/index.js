"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _metaBoxesArea = _interopRequireDefault(require("./meta-boxes-area"));

var _metaBoxVisibility = _interopRequireDefault(require("./meta-box-visibility"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function MetaBoxes(_ref) {
  var location = _ref.location,
      isVisible = _ref.isVisible,
      metaBoxes = _ref.metaBoxes;
  return (0, _element.createElement)(_element.Fragment, null, (0, _lodash.map)(metaBoxes, function (_ref2) {
    var id = _ref2.id;
    return (0, _element.createElement)(_metaBoxVisibility.default, {
      key: id,
      id: id
    });
  }), isVisible && (0, _element.createElement)(_metaBoxesArea.default, {
    location: location
  }));
}

var _default = (0, _data.withSelect)(function (select, _ref3) {
  var location = _ref3.location;

  var _select = select('core/edit-post'),
      isMetaBoxLocationVisible = _select.isMetaBoxLocationVisible,
      getMetaBoxesPerLocation = _select.getMetaBoxesPerLocation;

  return {
    metaBoxes: getMetaBoxesPerLocation(location),
    isVisible: isMetaBoxLocationVisible(location)
  };
})(MetaBoxes);

exports.default = _default;
//# sourceMappingURL=index.js.map