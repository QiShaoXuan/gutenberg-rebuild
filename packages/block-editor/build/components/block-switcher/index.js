"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockSwitcher = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _keycodes = require("@wordpress/keycodes");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blockIcon = _interopRequireDefault(require("../block-icon"));

var _blockStyles = _interopRequireDefault(require("../block-styles"));

var _blockPreview = _interopRequireDefault(require("../block-preview"));

var _blockTypesList = _interopRequireDefault(require("../block-types-list"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockSwitcher =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockSwitcher, _Component);

  function BlockSwitcher() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockSwitcher);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockSwitcher).apply(this, arguments));
    _this.state = {
      hoveredClassName: null
    };
    _this.onHoverClassName = _this.onHoverClassName.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(BlockSwitcher, [{
    key: "onHoverClassName",
    value: function onHoverClassName(className) {
      this.setState({
        hoveredClassName: className
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          blocks = _this$props.blocks,
          onTransform = _this$props.onTransform,
          inserterItems = _this$props.inserterItems,
          hasBlockStyles = _this$props.hasBlockStyles;
      var hoveredClassName = this.state.hoveredClassName;

      if (!blocks || !blocks.length) {
        return null;
      }

      var itemsByName = (0, _lodash.mapKeys)(inserterItems, function (_ref) {
        var name = _ref.name;
        return name;
      });
      var possibleBlockTransformations = (0, _lodash.orderBy)((0, _lodash.filter)((0, _blocks.getPossibleBlockTransformations)(blocks), function (block) {
        return block && !!itemsByName[block.name];
      }), function (block) {
        return itemsByName[block.name].frecency;
      }, 'desc'); // When selection consists of blocks of multiple types, display an
      // appropriate icon to communicate the non-uniformity.

      var isSelectionOfSameType = (0, _lodash.uniq)((0, _lodash.map)(blocks, 'name')).length === 1;
      var icon;

      if (isSelectionOfSameType) {
        var sourceBlockName = blocks[0].name;
        var blockType = (0, _blocks.getBlockType)(sourceBlockName);
        icon = blockType.icon;
      } else {
        icon = 'layout';
      }

      if (!hasBlockStyles && !possibleBlockTransformations.length) {
        return (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.IconButton, {
          disabled: true,
          className: "editor-block-switcher__no-switcher-icon block-editor-block-switcher__no-switcher-icon",
          label: (0, _i18n.__)('Block icon')
        }, (0, _element.createElement)(_blockIcon.default, {
          icon: icon,
          showColors: true
        })));
      }

      return (0, _element.createElement)(_components.Dropdown, {
        position: "bottom right",
        className: "editor-block-switcher block-editor-block-switcher",
        contentClassName: "editor-block-switcher__popover block-editor-block-switcher__popover",
        renderToggle: function renderToggle(_ref2) {
          var onToggle = _ref2.onToggle,
              isOpen = _ref2.isOpen;

          var openOnArrowDown = function openOnArrowDown(event) {
            if (!isOpen && event.keyCode === _keycodes.DOWN) {
              event.preventDefault();
              event.stopPropagation();
              onToggle();
            }
          };

          var label = 1 === blocks.length ? (0, _i18n.__)('Change block type or style') : (0, _i18n.sprintf)((0, _i18n._n)('Change type of %d block', 'Change type of %d blocks', blocks.length), blocks.length);
          return (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.IconButton, {
            className: "editor-block-switcher__toggle block-editor-block-switcher__toggle",
            onClick: onToggle,
            "aria-haspopup": "true",
            "aria-expanded": isOpen,
            label: label,
            tooltip: label,
            onKeyDown: openOnArrowDown,
            icon: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockIcon.default, {
              icon: icon,
              showColors: true
            }), (0, _element.createElement)(_components.SVG, {
              className: "editor-block-switcher__transform block-editor-block-switcher__transform",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24"
            }, (0, _element.createElement)(_components.Path, {
              d: "M6.5 8.9c.6-.6 1.4-.9 2.2-.9h6.9l-1.3 1.3 1.4 1.4L19.4 7l-3.7-3.7-1.4 1.4L15.6 6H8.7c-1.4 0-2.6.5-3.6 1.5l-2.8 2.8 1.4 1.4 2.8-2.8zm13.8 2.4l-2.8 2.8c-.6.6-1.3.9-2.1.9h-7l1.3-1.3-1.4-1.4L4.6 16l3.7 3.7 1.4-1.4L8.4 17h6.9c1.3 0 2.6-.5 3.5-1.5l2.8-2.8-1.3-1.4z"
            })))
          }));
        },
        renderContent: function renderContent(_ref3) {
          var onClose = _ref3.onClose;
          return (0, _element.createElement)(_element.Fragment, null, hasBlockStyles && (0, _element.createElement)(_components.PanelBody, {
            title: (0, _i18n.__)('Block Styles'),
            initialOpen: true
          }, (0, _element.createElement)(_blockStyles.default, {
            clientId: blocks[0].clientId,
            onSwitch: onClose,
            onHoverClassName: _this2.onHoverClassName
          })), possibleBlockTransformations.length !== 0 && (0, _element.createElement)(_components.PanelBody, {
            title: (0, _i18n.__)('Transform To:'),
            initialOpen: true
          }, (0, _element.createElement)(_blockTypesList.default, {
            items: possibleBlockTransformations.map(function (destinationBlockType) {
              return {
                id: destinationBlockType.name,
                icon: destinationBlockType.icon,
                title: destinationBlockType.title,
                hasChildBlocksWithInserterSupport: (0, _blocks.hasChildBlocksWithInserterSupport)(destinationBlockType.name)
              };
            }),
            onSelect: function onSelect(item) {
              onTransform(blocks, item.id);
              onClose();
            }
          })), hoveredClassName !== null && (0, _element.createElement)(_blockPreview.default, {
            name: blocks[0].name,
            attributes: (0, _objectSpread2.default)({}, blocks[0].attributes, {
              className: hoveredClassName
            })
          }));
        }
      });
    }
  }]);
  return BlockSwitcher;
}(_element.Component);

exports.BlockSwitcher = BlockSwitcher;

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref4) {
  var clientIds = _ref4.clientIds;

  var _select = select('core/block-editor'),
      getBlocksByClientId = _select.getBlocksByClientId,
      getBlockRootClientId = _select.getBlockRootClientId,
      getInserterItems = _select.getInserterItems;

  var _select2 = select('core/blocks'),
      getBlockStyles = _select2.getBlockStyles;

  var rootClientId = getBlockRootClientId((0, _lodash.first)((0, _lodash.castArray)(clientIds)));
  var blocks = getBlocksByClientId(clientIds);
  var firstBlock = blocks && blocks.length === 1 ? blocks[0] : null;
  var styles = firstBlock && getBlockStyles(firstBlock.name);
  return {
    blocks: blocks,
    inserterItems: getInserterItems(rootClientId),
    hasBlockStyles: styles && styles.length > 0
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  return {
    onTransform: function onTransform(blocks, name) {
      dispatch('core/block-editor').replaceBlocks(ownProps.clientIds, (0, _blocks.switchToBlockType)(blocks, name));
    }
  };
}))(BlockSwitcher);

exports.default = _default;
//# sourceMappingURL=index.js.map