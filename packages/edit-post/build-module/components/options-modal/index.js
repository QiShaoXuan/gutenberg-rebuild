import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { PostTaxonomies, PostExcerptCheck, PageAttributesCheck, PostFeaturedImageCheck, PostTypeSupportCheck } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import Section from './section';
import { EnablePublishSidebarOption, EnableTipsOption, EnablePanelOption } from './options';
import MetaBoxesSection from './meta-boxes-section';
var MODAL_NAME = 'edit-post/options';
export function OptionsModal(_ref) {
  var isModalActive = _ref.isModalActive,
      isViewable = _ref.isViewable,
      closeModal = _ref.closeModal;

  if (!isModalActive) {
    return null;
  }

  return createElement(Modal, {
    className: "edit-post-options-modal",
    title: __('Options'),
    closeLabel: __('Close'),
    onRequestClose: closeModal
  }, createElement(Section, {
    title: __('General')
  }, createElement(EnablePublishSidebarOption, {
    label: __('Enable Pre-publish Checks')
  }), createElement(EnableTipsOption, {
    label: __('Enable Tips')
  })), createElement(Section, {
    title: __('Document Panels')
  }, isViewable && createElement(EnablePanelOption, {
    label: __('Permalink'),
    panelName: "post-link"
  }), createElement(PostTaxonomies, {
    taxonomyWrapper: function taxonomyWrapper(content, taxonomy) {
      return createElement(EnablePanelOption, {
        label: get(taxonomy, ['labels', 'menu_name']),
        panelName: "taxonomy-panel-".concat(taxonomy.slug)
      });
    }
  }), createElement(PostFeaturedImageCheck, null, createElement(EnablePanelOption, {
    label: __('Featured Image'),
    panelName: "featured-image"
  })), createElement(PostExcerptCheck, null, createElement(EnablePanelOption, {
    label: __('Excerpt'),
    panelName: "post-excerpt"
  })), createElement(PostTypeSupportCheck, {
    supportKeys: ['comments', 'trackbacks']
  }, createElement(EnablePanelOption, {
    label: __('Discussion'),
    panelName: "discussion-panel"
  })), createElement(PageAttributesCheck, null, createElement(EnablePanelOption, {
    label: __('Page Attributes'),
    panelName: "page-attributes"
  }))), createElement(MetaBoxesSection, {
    title: __('Advanced Panels')
  }));
}
export default compose(withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  var postType = getPostType(getEditedPostAttribute('type'));
  return {
    isModalActive: select('core/edit-post').isModalActive(MODAL_NAME),
    isViewable: get(postType, ['viewable'], false)
  };
}), withDispatch(function (dispatch) {
  return {
    closeModal: function closeModal() {
      return dispatch('core/edit-post').closeModal();
    }
  };
}))(OptionsModal);
//# sourceMappingURL=index.js.map