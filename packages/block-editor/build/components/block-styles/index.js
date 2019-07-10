"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveStyle = getActiveStyle;
exports.replaceActiveStyle = replaceActiveStyle;
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _tokenList = _interopRequireDefault(require("@wordpress/token-list"));

var _keycodes = require("@wordpress/keycodes");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockPreview = require("../block-preview");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Returns the active style from the given className.
 *
 * @param {Array} styles Block style variations.
 * @param {string} className  Class name
 *
 * @return {Object?} The active style.
 */
function getActiveStyle(styles, className) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = new _tokenList.default(className).values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var style = _step.value;

      if (style.indexOf('is-style-') === -1) {
        continue;
      }

      var potentialStyleName = style.substring(9);
      var activeStyle = (0, _lodash.find)(styles, {
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

  return (0, _lodash.find)(styles, 'isDefault');
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


function replaceActiveStyle(className, activeStyle, newStyle) {
  var list = new _tokenList.default(className);

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
      onSwitch = _ref$onSwitch === void 0 ? _lodash.noop : _ref$onSwitch,
      _ref$onHoverClassName = _ref.onHoverClassName,
      onHoverClassName = _ref$onHoverClassName === void 0 ? _lodash.noop : _ref$onHoverClassName;

  if (!styles || styles.length === 0) {
    return null;
  }

  if (!type.styles && !(0, _lodash.find)(styles, 'isDefault')) {
    styles = [{
      name: 'default',
      label: (0, _i18n._x)('Default', 'block style'),
      isDefault: true
    }].concat((0, _toConsumableArray2.default)(styles));
  }

  var activeStyle = getActiveStyle(styles, className);

  function updateClassName(style) {
    var updatedClassName = replaceActiveStyle(className, activeStyle, style);
    onChangeClassName(updatedClassName);
    onHoverClassName(null);
    onSwitch();
  }

  return (0, _element.createElement)("div", {
    className: "editor-block-styles block-editor-block-styles"
  }, styles.map(function (style) {
    var styleClassName = replaceActiveStyle(className, activeStyle, style);
    return (0, _element.createElement)("div", {
      key: style.name,
      className: (0, _classnames.default)('editor-block-styles__item block-editor-block-styles__item', {
        'is-active': activeStyle === style
      }),
      onClick: function onClick() {
        return updateClassName(style);
      },
      onKeyDown: function onKeyDown(event) {
        if (_keycodes.ENTER === event.keyCode || _keycodes.SPACE === event.keyCode) {
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
    }, (0, _element.createElement)("div", {
      className: "editor-block-styles__item-preview block-editor-block-styles__item-preview"
    }, (0, _element.createElement)(_blockPreview.BlockPreviewContent, {
      name: name,
      attributes: (0, _objectSpread2.default)({}, attributes, {
        className: styleClassName
      })
    })), (0, _element.createElement)("div", {
      className: "editor-block-styles__item-label block-editor-block-styles__item-label"
    }, style.label || style.name));
  }));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock;

  var _select2 = select('core/blocks'),
      getBlockStyles = _select2.getBlockStyles;

  var block = getBlock(clientId);
  var blockType = (0, _blocks.getBlockType)(block.name);
  return {
    name: block.name,
    attributes: block.attributes,
    className: block.attributes.className || '',
    styles: getBlockStyles(block.name),
    type: blockType
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var clientId = _ref3.clientId;
  return {
    onChangeClassName: function onChangeClassName(newClassName) {
      dispatch('core/block-editor').updateBlockAttributes(clientId, {
        className: newClassName
      });
    }
  };
})])(BlockStyles);

exports.default = _default;
//# sourceMappingURL=index.js.map