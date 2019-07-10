import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { getBlockType, getUnregisteredTypeHandlerName } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */

import SkipToSelectedBlock from '../skip-to-selected-block';
import BlockIcon from '../block-icon';
import InspectorControls from '../inspector-controls';
import InspectorAdvancedControls from '../inspector-advanced-controls';
import BlockStyles from '../block-styles';
import MultiSelectionInspector from '../multi-selection-inspector';

var BlockInspector = function BlockInspector(_ref) {
  var selectedBlockClientId = _ref.selectedBlockClientId,
      selectedBlockName = _ref.selectedBlockName,
      blockType = _ref.blockType,
      count = _ref.count,
      hasBlockStyles = _ref.hasBlockStyles;

  if (count > 1) {
    return createElement(MultiSelectionInspector, null);
  }

  var isSelectedBlockUnregistered = selectedBlockName === getUnregisteredTypeHandlerName();
  /*
   * If the selected block is of an unregistered type, avoid showing it as an actual selection
   * because we want the user to focus on the unregistered block warning, not block settings.
   */

  if (!blockType || !selectedBlockClientId || isSelectedBlockUnregistered) {
    return createElement("span", {
      className: "editor-block-inspector__no-blocks block-editor-block-inspector__no-blocks"
    }, __('No block selected.'));
  }

  return createElement(Fragment, null, createElement("div", {
    className: "editor-block-inspector__card block-editor-block-inspector__card"
  }, createElement(BlockIcon, {
    icon: blockType.icon,
    showColors: true
  }), createElement("div", {
    className: "editor-block-inspector__card-content block-editor-block-inspector__card-content"
  }, createElement("div", {
    className: "editor-block-inspector__card-title block-editor-block-inspector__card-title"
  }, blockType.title), createElement("div", {
    className: "editor-block-inspector__card-description block-editor-block-inspector__card-description"
  }, blockType.description))), hasBlockStyles && createElement("div", null, createElement(PanelBody, {
    title: __('Styles'),
    initialOpen: false
  }, createElement(BlockStyles, {
    clientId: selectedBlockClientId
  }))), createElement("div", null, createElement(InspectorControls.Slot, null)), createElement("div", null, createElement(InspectorAdvancedControls.Slot, null, function (fills) {
    return !isEmpty(fills) && createElement(PanelBody, {
      className: "editor-block-inspector__advanced block-editor-block-inspector__advanced",
      title: __('Advanced'),
      initialOpen: false
    }, fills);
  })), createElement(SkipToSelectedBlock, {
    key: "back"
  }));
};

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getSelectedBlockCount = _select.getSelectedBlockCount,
      getBlockName = _select.getBlockName;

  var _select2 = select('core/blocks'),
      getBlockStyles = _select2.getBlockStyles;

  var selectedBlockClientId = getSelectedBlockClientId();
  var selectedBlockName = selectedBlockClientId && getBlockName(selectedBlockClientId);
  var blockType = selectedBlockClientId && getBlockType(selectedBlockName);
  var blockStyles = selectedBlockClientId && getBlockStyles(selectedBlockName);
  return {
    count: getSelectedBlockCount(),
    hasBlockStyles: blockStyles && blockStyles.length > 0,
    selectedBlockName: selectedBlockName,
    selectedBlockClientId: selectedBlockClientId,
    blockType: blockType
  };
})(BlockInspector);
//# sourceMappingURL=index.js.map