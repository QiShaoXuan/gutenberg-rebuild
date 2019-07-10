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
import { times, unescape } from 'lodash';
/**
 * WordPress dependencies
 */

import { PanelBody, Placeholder, Spinner, ToggleControl } from '@wordpress/components';
import { compose, withInstanceId } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

var CategoriesEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(CategoriesEdit, _Component);

  function CategoriesEdit() {
    var _this;

    _classCallCheck(this, CategoriesEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CategoriesEdit).apply(this, arguments));
    _this.toggleDisplayAsDropdown = _this.toggleDisplayAsDropdown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleShowPostCounts = _this.toggleShowPostCounts.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleShowHierarchy = _this.toggleShowHierarchy.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(CategoriesEdit, [{
    key: "toggleDisplayAsDropdown",
    value: function toggleDisplayAsDropdown() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      var displayAsDropdown = attributes.displayAsDropdown;
      setAttributes({
        displayAsDropdown: !displayAsDropdown
      });
    }
  }, {
    key: "toggleShowPostCounts",
    value: function toggleShowPostCounts() {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      var showPostCounts = attributes.showPostCounts;
      setAttributes({
        showPostCounts: !showPostCounts
      });
    }
  }, {
    key: "toggleShowHierarchy",
    value: function toggleShowHierarchy() {
      var _this$props3 = this.props,
          attributes = _this$props3.attributes,
          setAttributes = _this$props3.setAttributes;
      var showHierarchy = attributes.showHierarchy;
      setAttributes({
        showHierarchy: !showHierarchy
      });
    }
  }, {
    key: "getCategories",
    value: function getCategories() {
      var parentId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var categories = this.props.categories;

      if (!categories || !categories.length) {
        return [];
      }

      if (parentId === null) {
        return categories;
      }

      return categories.filter(function (category) {
        return category.parent === parentId;
      });
    }
  }, {
    key: "getCategoryListClassName",
    value: function getCategoryListClassName(level) {
      return "wp-block-categories__list wp-block-categories__list-level-".concat(level);
    }
  }, {
    key: "renderCategoryName",
    value: function renderCategoryName(category) {
      if (!category.name) {
        return __('(Untitled)');
      }

      return unescape(category.name).trim();
    }
  }, {
    key: "renderCategoryList",
    value: function renderCategoryList() {
      var _this2 = this;

      var showHierarchy = this.props.attributes.showHierarchy;
      var parentId = showHierarchy ? 0 : null;
      var categories = this.getCategories(parentId);
      return createElement("ul", {
        className: this.getCategoryListClassName(0)
      }, categories.map(function (category) {
        return _this2.renderCategoryListItem(category, 0);
      }));
    }
  }, {
    key: "renderCategoryListItem",
    value: function renderCategoryListItem(category, level) {
      var _this3 = this;

      var _this$props$attribute = this.props.attributes,
          showHierarchy = _this$props$attribute.showHierarchy,
          showPostCounts = _this$props$attribute.showPostCounts;
      var childCategories = this.getCategories(category.id);
      return createElement("li", {
        key: category.id
      }, createElement("a", {
        href: category.link,
        target: "_blank",
        rel: "noreferrer noopener"
      }, this.renderCategoryName(category)), showPostCounts && createElement("span", {
        className: "wp-block-categories__post-count"
      }, ' ', "(", category.count, ")"), showHierarchy && !!childCategories.length && createElement("ul", {
        className: this.getCategoryListClassName(level + 1)
      }, childCategories.map(function (childCategory) {
        return _this3.renderCategoryListItem(childCategory, level + 1);
      })));
    }
  }, {
    key: "renderCategoryDropdown",
    value: function renderCategoryDropdown() {
      var _this4 = this;

      var instanceId = this.props.instanceId;
      var showHierarchy = this.props.attributes.showHierarchy;
      var parentId = showHierarchy ? 0 : null;
      var categories = this.getCategories(parentId);
      var selectId = "blocks-category-select-".concat(instanceId);
      return createElement(Fragment, null, createElement("label", {
        htmlFor: selectId,
        className: "screen-reader-text"
      }, __('Categories')), createElement("select", {
        id: selectId,
        className: "wp-block-categories__dropdown"
      }, categories.map(function (category) {
        return _this4.renderCategoryDropdownItem(category, 0);
      })));
    }
  }, {
    key: "renderCategoryDropdownItem",
    value: function renderCategoryDropdownItem(category, level) {
      var _this5 = this;

      var _this$props$attribute2 = this.props.attributes,
          showHierarchy = _this$props$attribute2.showHierarchy,
          showPostCounts = _this$props$attribute2.showPostCounts;
      var childCategories = this.getCategories(category.id);
      return [createElement("option", {
        key: category.id
      }, times(level * 3, function () {
        return '\xa0';
      }), this.renderCategoryName(category), !!showPostCounts ? " (".concat(category.count, ")") : ''), showHierarchy && !!childCategories.length && childCategories.map(function (childCategory) {
        return _this5.renderCategoryDropdownItem(childCategory, level + 1);
      })];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          attributes = _this$props4.attributes,
          isRequesting = _this$props4.isRequesting;
      var displayAsDropdown = attributes.displayAsDropdown,
          showHierarchy = attributes.showHierarchy,
          showPostCounts = attributes.showPostCounts;
      var inspectorControls = createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Categories Settings')
      }, createElement(ToggleControl, {
        label: __('Display as Dropdown'),
        checked: displayAsDropdown,
        onChange: this.toggleDisplayAsDropdown
      }), createElement(ToggleControl, {
        label: __('Show Hierarchy'),
        checked: showHierarchy,
        onChange: this.toggleShowHierarchy
      }), createElement(ToggleControl, {
        label: __('Show Post Counts'),
        checked: showPostCounts,
        onChange: this.toggleShowPostCounts
      })));

      if (isRequesting) {
        return createElement(Fragment, null, inspectorControls, createElement(Placeholder, {
          icon: "admin-post",
          label: __('Categories')
        }, createElement(Spinner, null)));
      }

      return createElement(Fragment, null, inspectorControls, createElement("div", {
        className: this.props.className
      }, displayAsDropdown ? this.renderCategoryDropdown() : this.renderCategoryList()));
    }
  }]);

  return CategoriesEdit;
}(Component);

export default compose(withSelect(function (select) {
  var _select = select('core'),
      getEntityRecords = _select.getEntityRecords;

  var _select2 = select('core/data'),
      isResolving = _select2.isResolving;

  var query = {
    per_page: -1,
    hide_empty: true
  };
  return {
    categories: getEntityRecords('taxonomy', 'category', query),
    isRequesting: isResolving('core', 'getEntityRecords', ['taxonomy', 'category', query])
  };
}), withInstanceId)(CategoriesEdit);
//# sourceMappingURL=edit.js.map