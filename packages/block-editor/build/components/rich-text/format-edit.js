"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _richText = require("@wordpress/rich-text");

/**
 * WordPress dependencies
 */
var FormatEdit = function FormatEdit(_ref) {
  var formatTypes = _ref.formatTypes,
      onChange = _ref.onChange,
      value = _ref.value;
  return (0, _element.createElement)(_element.Fragment, null, formatTypes.map(function (_ref2) {
    var name = _ref2.name,
        Edit = _ref2.edit;

    if (!Edit) {
      return null;
    }

    var activeFormat = (0, _richText.getActiveFormat)(value, name);
    var isActive = activeFormat !== undefined;
    var activeObject = (0, _richText.getActiveObject)(value);
    var isObjectActive = activeObject !== undefined;
    return (0, _element.createElement)(Edit, {
      key: name,
      isActive: isActive,
      activeAttributes: isActive ? activeFormat.attributes || {} : {},
      isObjectActive: isObjectActive,
      activeObjectAttributes: isObjectActive ? activeObject.attributes || {} : {},
      value: value,
      onChange: onChange
    });
  }));
};

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/rich-text'),
      getFormatTypes = _select.getFormatTypes;

  return {
    formatTypes: getFormatTypes()
  };
})(FormatEdit);

exports.default = _default;
//# sourceMappingURL=format-edit.js.map