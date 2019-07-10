import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import TextareaAutosize from 'react-autosize-textarea';
import { isEqual } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { getBlockAttributes, getBlockContent, getBlockType, isValidBlockContent, getSaveContent } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
export var BlockHTML =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockHTML, _Component);

  function BlockHTML(props) {
    var _this;

    _classCallCheck(this, BlockHTML);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockHTML).apply(this, arguments));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      html: props.block.isValid ? getBlockContent(props.block) : props.block.originalContent
    };
    return _this;
  }

  _createClass(BlockHTML, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!isEqual(this.props.block.attributes, prevProps.block.attributes)) {
        this.setState({
          html: getBlockContent(this.props.block)
        });
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var html = this.state.html;
      var blockType = getBlockType(this.props.block.name);
      var attributes = getBlockAttributes(blockType, html, this.props.block.attributes); // If html is empty  we reset the block to the default HTML and mark it as valid to avoid triggering an error

      var content = html ? html : getSaveContent(blockType, attributes);
      var isValid = html ? isValidBlockContent(blockType, attributes, content) : true;
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
      return createElement(TextareaAutosize, {
        className: "editor-block-list__block-html-textarea block-editor-block-list__block-html-textarea",
        value: html,
        onBlur: this.onBlur,
        onChange: this.onChange
      });
    }
  }]);

  return BlockHTML;
}(Component);
export default compose([withSelect(function (select, ownProps) {
  return {
    block: select('core/block-editor').getBlock(ownProps.clientId)
  };
}), withDispatch(function (dispatch) {
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
//# sourceMappingURL=block-html.js.map