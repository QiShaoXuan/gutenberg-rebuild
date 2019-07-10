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
import { Component, Fragment } from '@wordpress/element';
import { Button, Disabled, PanelBody, Placeholder, RangeControl, ServerSideRender, TextControl, ToggleControl, Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
var DEFAULT_MIN_ITEMS = 1;
var DEFAULT_MAX_ITEMS = 10;

var RSSEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(RSSEdit, _Component);

  function RSSEdit() {
    var _this;

    _classCallCheck(this, RSSEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RSSEdit).apply(this, arguments));
    _this.state = {
      editing: !_this.props.attributes.feedURL
    };
    _this.toggleAttribute = _this.toggleAttribute.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSubmitURL = _this.onSubmitURL.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(RSSEdit, [{
    key: "toggleAttribute",
    value: function toggleAttribute(propName) {
      var _this2 = this;

      return function () {
        var value = _this2.props.attributes[propName];
        var setAttributes = _this2.props.setAttributes;
        setAttributes(_defineProperty({}, propName, !value));
      };
    }
  }, {
    key: "onSubmitURL",
    value: function onSubmitURL(event) {
      event.preventDefault();
      var feedURL = this.props.attributes.feedURL;

      if (feedURL) {
        this.setState({
          editing: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props$attribute = this.props.attributes,
          blockLayout = _this$props$attribute.blockLayout,
          columns = _this$props$attribute.columns,
          displayAuthor = _this$props$attribute.displayAuthor,
          displayExcerpt = _this$props$attribute.displayExcerpt,
          displayDate = _this$props$attribute.displayDate,
          excerptLength = _this$props$attribute.excerptLength,
          feedURL = _this$props$attribute.feedURL,
          itemsToShow = _this$props$attribute.itemsToShow;
      var setAttributes = this.props.setAttributes;

      if (this.state.editing) {
        return createElement(Placeholder, {
          icon: "rss",
          label: "RSS"
        }, createElement("form", {
          onSubmit: this.onSubmitURL
        }, createElement(TextControl, {
          placeholder: __('Enter URL here…'),
          value: feedURL,
          onChange: function onChange(value) {
            return setAttributes({
              feedURL: value
            });
          },
          className: 'components-placeholder__input'
        }), createElement(Button, {
          isLarge: true,
          type: "submit"
        }, __('Use URL'))));
      }

      var toolbarControls = [{
        icon: 'edit',
        title: __('Edit RSS URL'),
        onClick: function onClick() {
          return _this3.setState({
            editing: true
          });
        }
      }, {
        icon: 'list-view',
        title: __('List View'),
        onClick: function onClick() {
          return setAttributes({
            blockLayout: 'list'
          });
        },
        isActive: blockLayout === 'list'
      }, {
        icon: 'grid-view',
        title: __('Grid View'),
        onClick: function onClick() {
          return setAttributes({
            blockLayout: 'grid'
          });
        },
        isActive: blockLayout === 'grid'
      }];
      return createElement(Fragment, null, createElement(BlockControls, null, createElement(Toolbar, {
        controls: toolbarControls
      })), createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('RSS Settings')
      }, createElement(RangeControl, {
        label: __('Number of items'),
        value: itemsToShow,
        onChange: function onChange(value) {
          return setAttributes({
            itemsToShow: value
          });
        },
        min: DEFAULT_MIN_ITEMS,
        max: DEFAULT_MAX_ITEMS,
        required: true
      }), createElement(ToggleControl, {
        label: __('Display author'),
        checked: displayAuthor,
        onChange: this.toggleAttribute('displayAuthor')
      }), createElement(ToggleControl, {
        label: __('Display date'),
        checked: displayDate,
        onChange: this.toggleAttribute('displayDate')
      }), createElement(ToggleControl, {
        label: __('Display excerpt'),
        checked: displayExcerpt,
        onChange: this.toggleAttribute('displayExcerpt')
      }), displayExcerpt && createElement(RangeControl, {
        label: __('Max number of words in excerpt'),
        value: excerptLength,
        onChange: function onChange(value) {
          return setAttributes({
            excerptLength: value
          });
        },
        min: 10,
        max: 100,
        required: true
      }), blockLayout === 'grid' && createElement(RangeControl, {
        label: __('Columns'),
        value: columns,
        onChange: function onChange(value) {
          return setAttributes({
            columns: value
          });
        },
        min: 2,
        max: 6,
        required: true
      }))), createElement(Disabled, null, createElement(ServerSideRender, {
        block: "core/rss",
        attributes: this.props.attributes
      })));
    }
  }]);

  return RSSEdit;
}(Component);

export default RSSEdit;
//# sourceMappingURL=edit.js.map