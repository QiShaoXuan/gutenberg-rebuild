import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { getActiveFormat, getActiveObject } from '@wordpress/rich-text';

var FormatEdit = function FormatEdit(_ref) {
  var formatTypes = _ref.formatTypes,
      onChange = _ref.onChange,
      value = _ref.value;
  return createElement(Fragment, null, formatTypes.map(function (_ref2) {
    var name = _ref2.name,
        Edit = _ref2.edit;

    if (!Edit) {
      return null;
    }

    var activeFormat = getActiveFormat(value, name);
    var isActive = activeFormat !== undefined;
    var activeObject = getActiveObject(value);
    var isObjectActive = activeObject !== undefined;
    return createElement(Edit, {
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

export default withSelect(function (select) {
  var _select = select('core/rich-text'),
      getFormatTypes = _select.getFormatTypes;

  return {
    formatTypes: getFormatTypes()
  };
})(FormatEdit);
//# sourceMappingURL=format-edit.js.map