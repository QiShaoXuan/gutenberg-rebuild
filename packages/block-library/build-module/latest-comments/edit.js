import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import { InspectorControls } from '@wordpress/block-editor';
import { Disabled, PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { ServerSideRender } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Minimum number of comments a user can show using this block.
 *
 * @type {number}
 */

var MIN_COMMENTS = 1;
/**
 * Maximum number of comments a user can show using this block.
 *
 * @type {number}
 */

var MAX_COMMENTS = 100;

var LatestComments =
/*#__PURE__*/
function (_Component) {
  _inherits(LatestComments, _Component);

  function LatestComments() {
    var _this;

    _classCallCheck(this, LatestComments);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LatestComments).apply(this, arguments));
    _this.setCommentsToShow = _this.setCommentsToShow.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Create toggles for each attribute; we create them here rather than
    // passing `this.createToggleAttribute( 'displayAvatar' )` directly to
    // `onChange` to avoid re-renders.

    _this.toggleDisplayAvatar = _this.createToggleAttribute('displayAvatar');
    _this.toggleDisplayDate = _this.createToggleAttribute('displayDate');
    _this.toggleDisplayExcerpt = _this.createToggleAttribute('displayExcerpt');
    return _this;
  }

  _createClass(LatestComments, [{
    key: "createToggleAttribute",
    value: function createToggleAttribute(propName) {
      var _this2 = this;

      return function () {
        var value = _this2.props.attributes[propName];
        var setAttributes = _this2.props.setAttributes;
        setAttributes(_defineProperty({}, propName, !value));
      };
    }
  }, {
    key: "setCommentsToShow",
    value: function setCommentsToShow(commentsToShow) {
      this.props.setAttributes({
        commentsToShow: commentsToShow
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$attribute = this.props.attributes,
          commentsToShow = _this$props$attribute.commentsToShow,
          displayAvatar = _this$props$attribute.displayAvatar,
          displayDate = _this$props$attribute.displayDate,
          displayExcerpt = _this$props$attribute.displayExcerpt;
      return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Latest Comments Settings')
      }, createElement(ToggleControl, {
        label: __('Display Avatar'),
        checked: displayAvatar,
        onChange: this.toggleDisplayAvatar
      }), createElement(ToggleControl, {
        label: __('Display Date'),
        checked: displayDate,
        onChange: this.toggleDisplayDate
      }), createElement(ToggleControl, {
        label: __('Display Excerpt'),
        checked: displayExcerpt,
        onChange: this.toggleDisplayExcerpt
      }), createElement(RangeControl, {
        label: __('Number of Comments'),
        value: commentsToShow,
        onChange: this.setCommentsToShow,
        min: MIN_COMMENTS,
        max: MAX_COMMENTS,
        required: true
      }))), createElement(Disabled, null, createElement(ServerSideRender, {
        block: "core/latest-comments",
        attributes: this.props.attributes
      })));
    }
  }]);

  return LatestComments;
}(Component);

export default LatestComments;
//# sourceMappingURL=edit.js.map