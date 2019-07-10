"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _editor = require("@wordpress/editor");

var _WidgetEditHandler = _interopRequireDefault(require("./WidgetEditHandler"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var LegacyWidgetEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LegacyWidgetEdit, _Component);

  function LegacyWidgetEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, LegacyWidgetEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LegacyWidgetEdit).apply(this, arguments));
    _this.state = {
      isPreview: false
    };
    _this.switchToEdit = _this.switchToEdit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.switchToPreview = _this.switchToPreview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.changeWidget = _this.changeWidget.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(LegacyWidgetEdit, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          availableLegacyWidgets = _this$props.availableLegacyWidgets,
          hasPermissionsToManageWidgets = _this$props.hasPermissionsToManageWidgets,
          setAttributes = _this$props.setAttributes;
      var isPreview = this.state.isPreview;
      var identifier = attributes.identifier,
          isCallbackWidget = attributes.isCallbackWidget;
      var widgetObject = identifier && availableLegacyWidgets[identifier];

      if (!widgetObject) {
        var placeholderContent;

        if (!hasPermissionsToManageWidgets) {
          placeholderContent = (0, _i18n.__)('You don\'t have permissions to use widgets on this site.');
        } else if (availableLegacyWidgets.length === 0) {
          placeholderContent = (0, _i18n.__)('There are no widgets available.');
        } else {
          placeholderContent = (0, _element.createElement)(_components.SelectControl, {
            label: (0, _i18n.__)('Select a legacy widget to display:'),
            value: identifier || 'none',
            onChange: function onChange(value) {
              return setAttributes({
                instance: {},
                identifier: value,
                isCallbackWidget: availableLegacyWidgets[value].isCallbackWidget
              });
            },
            options: [{
              value: 'none',
              label: 'Select widget'
            }].concat((0, _lodash.map)(availableLegacyWidgets, function (widget, key) {
              return {
                value: key,
                label: widget.name
              };
            }))
          });
        }

        return (0, _element.createElement)(_components.Placeholder, {
          icon: (0, _element.createElement)(_editor.BlockIcon, {
            icon: "admin-customizer"
          }),
          label: (0, _i18n.__)('Legacy Widget')
        }, placeholderContent);
      }

      var inspectorControls = (0, _element.createElement)(_editor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: widgetObject.name
      }, widgetObject.description));

      if (!hasPermissionsToManageWidgets) {
        return (0, _element.createElement)(_element.Fragment, null, inspectorControls, this.renderWidgetPreview());
      }

      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_editor.BlockControls, null, (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_components.IconButton, {
        onClick: this.changeWidget,
        label: (0, _i18n.__)('Change widget'),
        icon: "update"
      }), !isCallbackWidget && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
        className: "components-tab-button ".concat(!isPreview ? 'is-active' : ''),
        onClick: this.switchToEdit
      }, (0, _element.createElement)("span", null, (0, _i18n.__)('Edit'))), (0, _element.createElement)(_components.Button, {
        className: "components-tab-button ".concat(isPreview ? 'is-active' : ''),
        onClick: this.switchToPreview
      }, (0, _element.createElement)("span", null, (0, _i18n.__)('Preview')))))), inspectorControls, !isCallbackWidget && (0, _element.createElement)(_WidgetEditHandler.default, {
        isVisible: !isPreview,
        identifier: attributes.identifier,
        instance: attributes.instance,
        onInstanceChange: function onInstanceChange(newInstance) {
          _this2.props.setAttributes({
            instance: newInstance
          });
        }
      }), (isPreview || isCallbackWidget) && this.renderWidgetPreview());
    }
  }, {
    key: "changeWidget",
    value: function changeWidget() {
      this.switchToEdit();
      this.props.setAttributes({
        instance: {},
        identifier: undefined
      });
    }
  }, {
    key: "switchToEdit",
    value: function switchToEdit() {
      this.setState({
        isPreview: false
      });
    }
  }, {
    key: "switchToPreview",
    value: function switchToPreview() {
      this.setState({
        isPreview: true
      });
    }
  }, {
    key: "renderWidgetPreview",
    value: function renderWidgetPreview() {
      var attributes = this.props.attributes;
      return (0, _element.createElement)(_editor.ServerSideRender, {
        className: "wp-block-legacy-widget__preview",
        block: "core/legacy-widget",
        attributes: attributes
      });
    }
  }]);
  return LegacyWidgetEdit;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  var editorSettings = select('core/block-editor').getSettings();
  var availableLegacyWidgets = editorSettings.availableLegacyWidgets,
      hasPermissionsToManageWidgets = editorSettings.hasPermissionsToManageWidgets;
  return {
    hasPermissionsToManageWidgets: hasPermissionsToManageWidgets,
    availableLegacyWidgets: availableLegacyWidgets
  };
})(LegacyWidgetEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map