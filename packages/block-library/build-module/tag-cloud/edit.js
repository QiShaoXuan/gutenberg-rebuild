import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map, filter } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, SelectControl, ServerSideRender } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

var TagCloudEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(TagCloudEdit, _Component);

  function TagCloudEdit() {
    var _this;

    _classCallCheck(this, TagCloudEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagCloudEdit).apply(this, arguments));
    _this.state = {
      editing: !_this.props.attributes.taxonomy
    };
    _this.setTaxonomy = _this.setTaxonomy.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleShowTagCounts = _this.toggleShowTagCounts.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TagCloudEdit, [{
    key: "getTaxonomyOptions",
    value: function getTaxonomyOptions() {
      var taxonomies = filter(this.props.taxonomies, 'show_cloud');
      var selectOption = {
        label: __('- Select -'),
        value: ''
      };
      var taxonomyOptions = map(taxonomies, function (taxonomy) {
        return {
          value: taxonomy.slug,
          label: taxonomy.name
        };
      });
      return [selectOption].concat(_toConsumableArray(taxonomyOptions));
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
      var inspectorControls = createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Tag Cloud Settings')
      }, createElement(SelectControl, {
        label: __('Taxonomy'),
        options: taxonomyOptions,
        value: taxonomy,
        onChange: this.setTaxonomy
      }), createElement(ToggleControl, {
        label: __('Show post counts'),
        checked: showTagCounts,
        onChange: this.toggleShowTagCounts
      })));
      return createElement(Fragment, null, inspectorControls, createElement(ServerSideRender, {
        key: "tag-cloud",
        block: "core/tag-cloud",
        attributes: attributes
      }));
    }
  }]);

  return TagCloudEdit;
}(Component);

export default withSelect(function (select) {
  return {
    taxonomies: select('core').getTaxonomies()
  };
})(TagCloudEdit);
//# sourceMappingURL=edit.js.map