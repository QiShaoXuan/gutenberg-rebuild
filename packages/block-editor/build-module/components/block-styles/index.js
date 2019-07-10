import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { find, noop } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import TokenList from '@wordpress/token-list';
import { ENTER, SPACE } from '@wordpress/keycodes';
import { _x } from '@wordpress/i18n';
import { getBlockType } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { BlockPreviewContent } from '../block-preview';
/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */

export function getActiveStyle(styles, className) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = new TokenList(className).values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var style = _step.value;

      if (style.indexOf('is-style-') === -1) {
        continue;
      }

      var potentialStyleName = style.substring(9);
      var activeStyle = find(styles, {
        name: potentialStyleName
      });

      if (activeStyle) {
        return activeStyle;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return find(styles, 'isDefault');
}
/**
 * Replaces the active style in the block's className.
 *
 * @param {string}  className   Class name.
 * @param {Object?} activeStyle The replaced style.
 * @param {Object}  newStyle    The replacing style.
 *
 * @return {string} The updated className.
 */

export function replaceActiveStyle(className, activeStyle, newStyle) {
  var list = new TokenList(className);

  if (activeStyle) {
    list.remove('is-style-' + activeStyle.name);
  }

  list.add('is-style-' + newStyle.name);
  return list.value;
}

function BlockStyles(_ref) {
  var styles = _ref.styles,
      className = _ref.className,
      onChangeClassName = _ref.onChangeClassName,
      name = _ref.name,
      attributes = _ref.attributes,
      type = _ref.type,
      _ref$onSwitch = _ref.onSwitch,
      onSwitch = _ref$onSwitch === void 0 ? noop : _ref$onSwitch,
      _ref$onHoverClassName = _ref.onHoverClassName,
      onHoverClassName = _ref$onHoverClassName === void 0 ? noop : _ref$onHoverClassName;

  if (!styles || styles.length === 0) {
    return null;
  }

  if (!type.styles && !find(styles, 'isDefault')) {
    styles = [{
      name: 'default',
      label: _x('Default', 'block style'),
      isDefault: true
    }].concat(_toConsumableArray(styles));
  }

  var activeStyle = getActiveStyle(styles, className);

  function updateClassName(style) {
    var updatedClassName = replaceActiveStyle(className, activeStyle, style);
    onChangeClassName(updatedClassName);
    onHoverClassName(null);
    onSwitch();
  }

  return createElement("div", {
    className: "editor-block-styles block-editor-block-styles"
  }, styles.map(function (style) {
    var styleClassName = replaceActiveStyle(className, activeStyle, style);
    return createElement("div", {
      key: style.name,
      className: classnames('editor-block-styles__item block-editor-block-styles__item', {
        'is-active': activeStyle === style
      }),
      onClick: function onClick() {
        return updateClassName(style);
      },
      onKeyDown: function onKeyDown(event) {
        if (ENTER === event.keyCode || SPACE === event.keyCode) {
          event.preventDefault();
          updateClassName(style);
        }
      },
      onMouseEnter: function onMouseEnter() {
        return onHoverClassName(styleClassName);
      },
      onMouseLeave: function onMouseLeave() {
        return onHoverClassName(null);
      },
      role: "button",
      tabIndex: "0",
      "aria-label": style.label || style.name
    }, createElement("div", {
      className: "editor-block-styles__item-preview block-editor-block-styles__item-preview"
    }, createElement(BlockPreviewContent, {
      name: name,
      attributes: _objectSpread({}, attributes, {
        className: styleClassName
      })
    })), createElement("div", {
      className: "editor-block-styles__item-label block-editor-block-styles__item-label"
    }, style.label || style.name));
  }));
}

export default compose([withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock;

  var _select2 = select('core/blocks'),
      getBlockStyles = _select2.getBlockStyles;

  var block = getBlock(clientId);
  var blockType = getBlockType(block.name);
  return {
    name: block.name,
    attributes: block.attributes,
    className: block.attributes.className || '',
    styles: getBlockStyles(block.name),
    type: blockType
  };
}), withDispatch(function (dispatch, _ref3) {
  var clientId = _ref3.clientId;
  return {
    onChangeClassName: function onChangeClassName(newClassName) {
      dispatch('core/block-editor').updateBlockAttributes(clientId, {
        className: newClassName
      });
    }
  };
})])(BlockStyles);
//# sourceMappingURL=index.js.map