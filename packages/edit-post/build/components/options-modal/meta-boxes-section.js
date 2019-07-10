"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetaBoxesSection = MetaBoxesSection;
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _section = _interopRequireDefault(require("./section"));

var _options = require("./options");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function MetaBoxesSection(_ref) {
  var areCustomFieldsRegistered = _ref.areCustomFieldsRegistered,
      metaBoxes = _ref.metaBoxes,
      sectionProps = (0, _objectWithoutProperties2.default)(_ref, ["areCustomFieldsRegistered", "metaBoxes"]);
  // The 'Custom Fields' meta box is a special case that we handle separately.
  var thirdPartyMetaBoxes = (0, _lodash.filter)(metaBoxes, function (_ref2) {
    var id = _ref2.id;
    return id !== 'postcustom';
  });

  if (!areCustomFieldsRegistered && thirdPartyMetaBoxes.length === 0) {
    return null;
  }

  return (0, _element.createElement)(_section.default, sectionProps, areCustomFieldsRegistered && (0, _element.createElement)(_options.EnableCustomFieldsOption, {
    label: (0, _i18n.__)('Custom Fields')
  }), (0, _lodash.map)(thirdPartyMetaBoxes, function (_ref3) {
    var id = _ref3.id,
        title = _ref3.title;
    return (0, _element.createElement)(_options.EnablePanelOption, {
      key: id,
      label: title,
      panelName: "meta-box-".concat(id)
    });
  }));
}

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditorSettings = _select.getEditorSettings;

  var _select2 = select('core/edit-post'),
      getAllMetaBoxes = _select2.getAllMetaBoxes;

  return {
    // This setting should not live in the block editor's store.
    areCustomFieldsRegistered: getEditorSettings().enableCustomFields !== undefined,
    metaBoxes: getAllMetaBoxes()
  };
})(MetaBoxesSection);

exports.default = _default;
//# sourceMappingURL=meta-boxes-section.js.map