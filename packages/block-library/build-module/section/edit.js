import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks, PanelColorSettings, withColors } from '@wordpress/block-editor';

function SectionEdit(_ref) {
  var className = _ref.className,
      setBackgroundColor = _ref.setBackgroundColor,
      backgroundColor = _ref.backgroundColor;
  var styles = {
    backgroundColor: backgroundColor.color
  };
  var classes = classnames(className, backgroundColor.class, {
    'has-background': !!backgroundColor.color
  });
  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelColorSettings, {
    title: __('Color Settings'),
    colorSettings: [{
      value: backgroundColor.color,
      onChange: setBackgroundColor,
      label: __('Background Color')
    }]
  })), createElement("div", {
    className: classes,
    style: styles
  }, createElement(InnerBlocks, null)));
}

export default withColors('backgroundColor')(SectionEdit);
//# sourceMappingURL=edit.js.map