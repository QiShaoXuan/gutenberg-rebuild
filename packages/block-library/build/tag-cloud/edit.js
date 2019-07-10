"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var TagCloudEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TagCloudEdit, _Component);

  function TagCloudEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, TagCloudEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TagCloudEdit).apply(this, arguments));
    _this.state = {
      editing: !_this.props.attributes.taxonomy
    };
    _this.setTaxonomy = _this.setTaxonomy.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleShowTagCounts = _this.toggleShowTagCounts.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(TagCloudEdit, [{
    key: "getTaxonomyOptions",
    value: function getTaxonomyOptions() {
      var taxonomies = (0, _lodash.filter)(this.props.taxonomies, 'show_cloud');
      var selectOption = {
        label: (0, _i18n.__)('- Select -'),
        value: ''
      };
      var taxonomyOptions = (0, _lodash.map)(taxonomies, function (taxonomy) {
        return {
          value: taxonomy.slug,
          label: taxonomy.name
        };
      });
      return [selectOption].concat((0, _toConsumableArray2.default)(taxonomyOptions));
    }
  }, {
    key: "setTaxonomy",
    value: function setTaxonomy(taxonomy) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        taxonomy: taxonomy
      });
    }
  }, {
    key: "toggleShowTagCounts",
    value: function toggleShowTagCounts() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      var showTagCounts = attributes.showTagCounts;
      setAttributes({
        showTagCounts: !showTagCounts
      });
    }
  }, {
    key: "render",
    value: function render() {
      var attributes = this.props.attributes;
      var taxonomy = attributes.taxonomy,
          showTagCounts = attributes.showTagCounts;
      var taxonomyOptions = this.getTaxonomyOptions();
      var inspectorControls = (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Tag Cloud Settings')
      }, (0, _element.createElement)(_components.SelectControl, {
        label: (0, _i18n.__)('Taxonomy'),
        options: taxonomyOptions,
        value: taxonomy,
        onChange: this.setTaxonomy
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Show post counts'),
        checked: showTagCounts,
        onChange: this.toggleShowTagCounts
      })));
      return (0, _element.createElement)(_element.Fragment, null, inspectorControls, (0, _element.createElement)(_components.ServerSideRender, {
        key: "tag-cloud",
        block: "core/tag-cloud",
        attributes: attributes
      }));
    }
  }]);
  return TagCloudEdit;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  return {
    taxonomies: select('core').getTaxonomies()
  };
})(TagCloudEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map