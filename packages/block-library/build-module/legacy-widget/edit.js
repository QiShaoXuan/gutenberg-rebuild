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
import { map } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { Button, IconButton, PanelBody, Placeholder, SelectControl, Toolbar } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { BlockControls, BlockIcon, InspectorControls, ServerSideRender } from '@wordpress/editor';
import WidgetEditHandler from './WidgetEditHandler';

var LegacyWidgetEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(LegacyWidgetEdit, _Component);

  function LegacyWidgetEdit() {
    var _this;

    _classCallCheck(this, LegacyWidgetEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LegacyWidgetEdit).apply(this, arguments));
    _this.state = {
      isPreview: false
    };
    _this.switchToEdit = _this.switchToEdit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.switchToPreview = _this.switchToPreview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeWidget = _this.changeWidget.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(LegacyWidgetEdit, [{
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
          placeholderContent = __('You don\'t have permissions to use widgets on this site.');
        } else if (availableLegacyWidgets.length === 0) {
          placeholderContent = __('There are no widgets available.');
        } else {
          placeholderContent = createElement(SelectControl, {
            label: __('Select a legacy widget to display:'),
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
            }].concat(map(availableLegacyWidgets, function (widget, key) {
              return {
                value: key,
                label: widget.name
              };
            }))
          });
        }

        return createElement(Placeholder, {
          icon: createElement(BlockIcon, {
            icon: "admin-customizer"
          }),
          label: __('Legacy Widget')
        }, placeholderContent);
      }

      var inspectorControls = createElement(InspectorControls, null, createElement(PanelBody, {
        title: widgetObject.name
      }, widgetObject.description));

      if (!hasPermissionsToManageWidgets) {
        return createElement(Fragment, null, inspectorControls, this.renderWidgetPreview());
      }

      return createElement(Fragment, null, createElement(BlockControls, null, createElement(Toolbar, null, createElement(IconButton, {
        onClick: this.changeWidget,
        label: __('Change widget'),
        icon: "update"
      }), !isCallbackWidget && createElement(Fragment, null, createElement(Button, {
        className: "components-tab-button ".concat(!isPreview ? 'is-active' : ''),
        onClick: this.switchToEdit
      }, createElement("span", null, __('Edit'))), createElement(Button, {
        className: "components-tab-button ".concat(isPreview ? 'is-active' : ''),
        onClick: this.switchToPreview
      }, createElement("span", null, __('Preview')))))), inspectorControls, !isCallbackWidget && createElement(WidgetEditHandler, {
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
      return createElement(ServerSideRender, {
        className: "wp-block-legacy-widget__preview",
        block: "core/legacy-widget",
        attributes: attributes
      });
    }
  }]);

  return LegacyWidgetEdit;
}(Component);

export default withSelect(function (select) {
  var editorSettings = select('core/block-editor').getSettings();
  var availableLegacyWidgets = editorSettings.availableLegacyWidgets,
      hasPermissionsToManageWidgets = editorSettings.hasPermissionsToManageWidgets;
  return {
    hasPermissionsToManageWidgets: hasPermissionsToManageWidgets,
    availableLegacyWidgets: availableLegacyWidgets
  };
})(LegacyWidgetEdit);
//# sourceMappingURL=edit.js.map