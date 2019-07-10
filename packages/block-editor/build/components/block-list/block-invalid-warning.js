"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockInvalidWarning = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _warning = _interopRequireDefault(require("../warning"));

var _blockCompare = _interopRequireDefault(require("../block-compare"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockInvalidWarning =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockInvalidWarning, _Component);

  function BlockInvalidWarning(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BlockInvalidWarning);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockInvalidWarning).call(this, props));
    _this.state = {
      compare: false
    };
    _this.onCompare = _this.onCompare.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onCompareClose = _this.onCompareClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(BlockInvalidWarning, [{
    key: "onCompare",
    value: function onCompare() {
      this.setState({
        compare: true
      });
    }
  }, {
    key: "onCompareClose",
    value: function onCompareClose() {
      this.setState({
        compare: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          convertToHTML = _this$props.convertToHTML,
          convertToBlocks = _this$props.convertToBlocks,
          convertToClassic = _this$props.convertToClassic,
          attemptBlockRecovery = _this$props.attemptBlockRecovery,
          block = _this$props.block;
      var hasHTMLBlock = !!(0, _blocks.getBlockType)('core/html');
      var compare = this.state.compare;
      var hiddenActions = [{
        title: (0, _i18n.__)('Convert to Classic Block'),
        onClick: convertToClassic
      }, {
        title: (0, _i18n.__)('Attempt Block Recovery'),
        onClick: attemptBlockRecovery
      }];

      if (compare) {
        return (0, _element.createElement)(_components.Modal, {
          title: // translators: Dialog title to fix block content
          (0, _i18n.__)('Resolve Block'),
          onRequestClose: this.onCompareClose,
          className: "editor-block-compare block-editor-block-compare"
        }, (0, _element.createElement)(_blockCompare.default, {
          block: block,
          onKeep: convertToHTML,
          onConvert: convertToBlocks,
          convertor: blockToBlocks,
          convertButtonText: (0, _i18n.__)('Convert to Blocks')
        }));
      }

      return (0, _element.createElement)(_warning.default, {
        actions: [(0, _element.createElement)(_components.Button, {
          key: "convert",
          onClick: this.onCompare,
          isLarge: true,
          isPrimary: !hasHTMLBlock
        }, // translators: Button to fix block content
        (0, _i18n._x)('Resolve', 'imperative verb')), hasHTMLBlock && (0, _element.createElement)(_components.Button, {
          key: "edit",
          onClick: convertToHTML,
          isLarge: true,
          isPrimary: true
        }, (0, _i18n.__)('Convert to HTML'))],
        secondaryActions: hiddenActions
      }, (0, _i18n.__)('This block contains unexpected or invalid content.'));
    }
  }]);
  return BlockInvalidWarning;
}(_element.Component);

exports.BlockInvalidWarning = BlockInvalidWarning;

var blockToClassic = function blockToClassic(block) {
  return (0, _blocks.createBlock)('core/freeform', {
    content: block.originalContent
  });
};

var blockToHTML = function blockToHTML(block) {
  return (0, _blocks.createBlock)('core/html', {
    content: block.originalContent
  });
};

var blockToBlocks = function blockToBlocks(block) {
  return (0, _blocks.rawHandler)({
    HTML: block.originalContent
  });
};

var recoverBlock = function recoverBlock(_ref) {
  var name = _ref.name,
      attributes = _ref.attributes,
      innerBlocks = _ref.innerBlocks;
  return (0, _blocks.createBlock)(name, attributes, innerBlocks);
};

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;
  return {
    block: select('core/block-editor').getBlock(clientId)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
  var block = _ref3.block;

  var _dispatch = dispatch('core/block-editor'),
      replaceBlock = _dispatch.replaceBlock;

  return {
    convertToClassic: function convertToClassic() {
      replaceBlock(block.clientId, blockToClassic(block));
    },
    convertToHTML: function convertToHTML() {
      replaceBlock(block.clientId, blockToHTML(block));
    },
    convertToBlocks: function convertToBlocks() {
      replaceBlock(block.clientId, blockToBlocks(block));
    },
    attemptBlockRecovery: function attemptBlockRecovery() {
      replaceBlock(block.clientId, recoverBlock(block));
    }
  };
})])(BlockInvalidWarning);

exports.default = _default;
//# sourceMappingURL=block-invalid-warning.js.map