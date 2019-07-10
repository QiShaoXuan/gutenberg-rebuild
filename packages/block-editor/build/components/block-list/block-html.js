"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockHTML = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _reactAutosizeTextarea = _interopRequireDefault(require("react-autosize-textarea"));

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var BlockHTML =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockHTML, _Component);

  function BlockHTML(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BlockHTML);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockHTML).apply(this, arguments));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      html: props.block.isValid ? (0, _blocks.getBlockContent)(props.block) : props.block.originalContent
    };
    return _this;
  }

  (0, _createClass2.default)(BlockHTML, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!(0, _lodash.isEqual)(this.props.block.attributes, prevProps.block.attributes)) {
        this.setState({
          html: (0, _blocks.getBlockContent)(this.props.block)
        });
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var html = this.state.html;
      var blockType = (0, _blocks.getBlockType)(this.props.block.name);
      var attributes = (0, _blocks.getBlockAttributes)(blockType, html, this.props.block.attributes); // If html is empty  we reset the block to the default HTML and mark it as valid to avoid triggering an error

      var content = html ? html : (0, _blocks.getSaveContent)(blockType, attributes);
      var isValid = html ? (0, _blocks.isValidBlockContent)(blockType, attributes, content) : true;
      this.props.onChange(this.props.clientId, attributes, content, isValid); // Ensure the state is updated if we reset so it displays the default content

      if (!html) {
        this.setState({
          html: content
        });
      }
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.setState({
        html: event.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var html = this.state.html;
      return (0, _element.createElement)(_reactAutosizeTextarea.default, {
        className: "editor-block-list__block-html-textarea block-editor-block-list__block-html-textarea",
        value: html,
        onBlur: this.onBlur,
        onChange: this.onChange
      });
    }
  }]);
  return BlockHTML;
}(_element.Component);

exports.BlockHTML = BlockHTML;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, ownProps) {
  return {
    block: select('core/block-editor').getBlock(ownProps.clientId)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onChange: function onChange(clientId, attributes, originalContent, isValid) {
      dispatch('core/block-editor').updateBlock(clientId, {
        attributes: attributes,
        originalContent: originalContent,
        isValid: isValid
      });
    }
  };
})])(BlockHTML);

exports.default = _default;
//# sourceMappingURL=block-html.js.map