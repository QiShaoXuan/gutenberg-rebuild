"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
var DEFAULT_MIN_ITEMS = 1;
var DEFAULT_MAX_ITEMS = 10;

var RSSEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RSSEdit, _Component);

  function RSSEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, RSSEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RSSEdit).apply(this, arguments));
    _this.state = {
      editing: !_this.props.attributes.feedURL
    };
    _this.toggleAttribute = _this.toggleAttribute.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSubmitURL = _this.onSubmitURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(RSSEdit, [{
    key: "toggleAttribute",
    value: function toggleAttribute(propName) {
      var _this2 = this;

      return function () {
        var value = _this2.props.attributes[propName];
        var setAttributes = _this2.props.setAttributes;
        setAttributes((0, _defineProperty2.default)({}, propName, !value));
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
        return (0, _element.createElement)(_components.Placeholder, {
          icon: "rss",
          label: "RSS"
        }, (0, _element.createElement)("form", {
          onSubmit: this.onSubmitURL
        }, (0, _element.createElement)(_components.TextControl, {
          placeholder: (0, _i18n.__)('Enter URL here…'),
          value: feedURL,
          onChange: function onChange(value) {
            return setAttributes({
              feedURL: value
            });
          },
          className: 'components-placeholder__input'
        }), (0, _element.createElement)(_components.Button, {
          isLarge: true,
          type: "submit"
        }, (0, _i18n.__)('Use URL'))));
      }

      var toolbarControls = [{
        icon: 'edit',
        title: (0, _i18n.__)('Edit RSS URL'),
        onClick: function onClick() {
          return _this3.setState({
            editing: true
          });
        }
      }, {
        icon: 'list-view',
        title: (0, _i18n.__)('List View'),
        onClick: function onClick() {
          return setAttributes({
            blockLayout: 'list'
          });
        },
        isActive: blockLayout === 'list'
      }, {
        icon: 'grid-view',
        title: (0, _i18n.__)('Grid View'),
        onClick: function onClick() {
          return setAttributes({
            blockLayout: 'grid'
          });
        },
        isActive: blockLayout === 'grid'
      }];
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.Toolbar, {
        controls: toolbarControls
      })), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('RSS Settings')
      }, (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Number of items'),
        value: itemsToShow,
        onChange: function onChange(value) {
          return setAttributes({
            itemsToShow: value
          });
        },
        min: DEFAULT_MIN_ITEMS,
        max: DEFAULT_MAX_ITEMS,
        required: true
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Display author'),
        checked: displayAuthor,
        onChange: this.toggleAttribute('displayAuthor')
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Display date'),
        checked: displayDate,
        onChange: this.toggleAttribute('displayDate')
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Display excerpt'),
        checked: displayExcerpt,
        onChange: this.toggleAttribute('displayExcerpt')
      }), displayExcerpt && (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Max number of words in excerpt'),
        value: excerptLength,
        onChange: function onChange(value) {
          return setAttributes({
            excerptLength: value
          });
        },
        min: 10,
        max: 100,
        required: true
      }), blockLayout === 'grid' && (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Columns'),
        value: columns,
        onChange: function onChange(value) {
          return setAttributes({
            columns: value
          });
        },
        min: 2,
        max: 6,
        required: true
      }))), (0, _element.createElement)(_components.Disabled, null, (0, _element.createElement)(_components.ServerSideRender, {
        block: "core/rss",
        attributes: this.props.attributes
      })));
    }
  }]);
  return RSSEdit;
}(_element.Component);

var _default = RSSEdit;
exports.default = _default;
//# sourceMappingURL=edit.js.map