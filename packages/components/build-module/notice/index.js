import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { Button, IconButton } from '../';

function Notice(_ref) {
  var className = _ref.className,
      status = _ref.status,
      children = _ref.children,
      _ref$onRemove = _ref.onRemove,
      onRemove = _ref$onRemove === void 0 ? noop : _ref$onRemove,
      _ref$isDismissible = _ref.isDismissible,
      isDismissible = _ref$isDismissible === void 0 ? true : _ref$isDismissible,
      _ref$actions = _ref.actions,
      actions = _ref$actions === void 0 ? [] : _ref$actions,
      __unstableHTML = _ref.__unstableHTML;
  var classes = classnames(className, 'components-notice', 'is-' + status, {
    'is-dismissible': isDismissible
  });

  if (__unstableHTML) {
    children = createElement(RawHTML, null, children);
  }

  return createElement("div", {
    className: classes
  }, createElement("div", {
    className: "components-notice__content"
  }, children, actions.map(function (_ref2, index) {
    var buttonCustomClasses = _ref2.className,
        label = _ref2.label,
        _ref2$noDefaultClasse = _ref2.noDefaultClasses,
        noDefaultClasses = _ref2$noDefaultClasse === void 0 ? false : _ref2$noDefaultClasse,
        onClick = _ref2.onClick,
        url = _ref2.url;
    return createElement(Button, {
      key: index,
      href: url,
      isDefault: !noDefaultClasses && !url,
      isLink: !noDefaultClasses && !!url,
      onClick: url ? undefined : onClick,
      className: classnames('components-notice__action', buttonCustomClasses)
    }, label);
  })), isDismissible && createElement(IconButton, {
    className: "components-notice__dismiss",
    icon: "no",
    label: __('Dismiss this notice'),
    onClick: onRemove,
    tooltip: false
  }));
}

export default Notice;
//# sourceMappingURL=index.js.map