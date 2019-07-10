import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER } from '@wordpress/keycodes';
import { getDefaultBlockName, createBlock } from '@wordpress/blocks';

var MoreEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(MoreEdit, _Component);

  function MoreEdit() {
    var _this;

    _classCallCheck(this, MoreEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoreEdit).apply(this, arguments));
    _this.onChangeInput = _this.onChangeInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      defaultText: __('Read more')
    };
    return _this;
  }

  _createClass(MoreEdit, [{
    key: "onChangeInput",
    value: function onChangeInput(event) {
      // Set defaultText to an empty string, allowing the user to clear/replace the input field's text
      this.setState({
        defaultText: ''
      });
      var value = event.target.value.length === 0 ? undefined : event.target.value;
      this.props.setAttributes({
        customText: value
      });
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var keyCode = event.keyCode;
      var insertBlocksAfter = this.props.insertBlocksAfter;

      if (keyCode === ENTER) {
        insertBlocksAfter([createBlock(getDefaultBlockName())]);
      }
    }
  }, {
    key: "getHideExcerptHelp",
    value: function getHideExcerptHelp(checked) {
      return checked ? __('The excerpt is hidden.') : __('The excerpt is visible.');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$attribute = this.props.attributes,
          customText = _this$props$attribute.customText,
          noTeaser = _this$props$attribute.noTeaser;
      var setAttributes = this.props.setAttributes;

      var toggleHideExcerpt = function toggleHideExcerpt() {
        return setAttributes({
          noTeaser: !noTeaser
        });
      };

      var defaultText = this.state.defaultText;
      var value = customText !== undefined ? customText : defaultText;
      var inputLength = value.length + 1;
      return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, null, createElement(ToggleControl, {
        label: __('Hide the excerpt on the full content page'),
        checked: !!noTeaser,
        onChange: toggleHideExcerpt,
        help: this.getHideExcerptHelp
      }))), createElement("div", {
        className: "wp-block-more"
      }, createElement("input", {
        type: "text",
        value: value,
        size: inputLength,
        onChange: this.onChangeInput,
        onKeyDown: this.onKeyDown
      })));
    }
  }]);

  return MoreEdit;
}(Component);

export { MoreEdit as default };
//# sourceMappingURL=edit.js.map