"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsModal = OptionsModal;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _editor = require("@wordpress/editor");

var _section = _interopRequireDefault(require("./section"));

var _options = require("./options");

var _metaBoxesSection = _interopRequireDefault(require("./meta-boxes-section"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MODAL_NAME = 'edit-post/options';

function OptionsModal(_ref) {
  var isModalActive = _ref.isModalActive,
      isViewable = _ref.isViewable,
      closeModal = _ref.closeModal;

  if (!isModalActive) {
    return null;
  }

  return (0, _element.createElement)(_components.Modal, {
    className: "edit-post-options-modal",
    title: (0, _i18n.__)('Options'),
    closeLabel: (0, _i18n.__)('Close'),
    onRequestClose: closeModal
  }, (0, _element.createElement)(_section.default, {
    title: (0, _i18n.__)('General')
  }, (0, _element.createElement)(_options.EnablePublishSidebarOption, {
    label: (0, _i18n.__)('Enable Pre-publish Checks')
  }), (0, _element.createElement)(_options.EnableTipsOption, {
    label: (0, _i18n.__)('Enable Tips')
  })), (0, _element.createElement)(_section.default, {
    title: (0, _i18n.__)('Document Panels')
  }, isViewable && (0, _element.createElement)(_options.EnablePanelOption, {
    label: (0, _i18n.__)('Permalink'),
    panelName: "post-link"
  }), (0, _element.createElement)(_editor.PostTaxonomies, {
    taxonomyWrapper: function taxonomyWrapper(content, taxonomy) {
      return (0, _element.createElement)(_options.EnablePanelOption, {
        label: (0, _lodash.get)(taxonomy, ['labels', 'menu_name']),
        panelName: "taxonomy-panel-".concat(taxonomy.slug)
      });
    }
  }), (0, _element.createElement)(_editor.PostFeaturedImageCheck, null, (0, _element.createElement)(_options.EnablePanelOption, {
    label: (0, _i18n.__)('Featured Image'),
    panelName: "featured-image"
  })), (0, _element.createElement)(_editor.PostExcerptCheck, null, (0, _element.createElement)(_options.EnablePanelOption, {
    label: (0, _i18n.__)('Excerpt'),
    panelName: "post-excerpt"
  })), (0, _element.createElement)(_editor.PostTypeSupportCheck, {
    supportKeys: ['comments', 'trackbacks']
  }, (0, _element.createElement)(_options.EnablePanelOption, {
    label: (0, _i18n.__)('Discussion'),
    panelName: "discussion-panel"
  })), (0, _element.createElement)(_editor.PageAttributesCheck, null, (0, _element.createElement)(_options.EnablePanelOption, {
    label: (0, _i18n.__)('Page Attributes'),
    panelName: "page-attributes"
  }))), (0, _element.createElement)(_metaBoxesSection.default, {
    title: (0, _i18n.__)('Advanced Panels')
  }));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  var postType = getPostType(getEditedPostAttribute('type'));
  return {
    isModalActive: select('core/edit-post').isModalActive(MODAL_NAME),
    isViewable: (0, _lodash.get)(postType, ['viewable'], false)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    closeModal: function closeModal() {
      return dispatch('core/edit-post').closeModal();
    }
  };
}))(OptionsModal);

exports.default = _default;
//# sourceMappingURL=index.js.map