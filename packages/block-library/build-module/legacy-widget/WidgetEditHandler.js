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
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import WidgetEditDomManager from './WidgetEditDomManager';

var WidgetEditHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(WidgetEditHandler, _Component);

  function WidgetEditHandler() {
    var _this;

    _classCallCheck(this, WidgetEditHandler);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WidgetEditHandler).apply(this, arguments));
    _this.state = {
      form: null,
      idBase: null
    };
    _this.instanceUpdating = null;
    _this.onInstanceChange = _this.onInstanceChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.requestWidgetUpdater = _this.requestWidgetUpdater.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(WidgetEditHandler, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isStillMounted = true;
      this.requestWidgetUpdater();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.instance !== this.props.instance && this.instanceUpdating !== this.props.instance) {
        this.requestWidgetUpdater();
      }

      if (this.instanceUpdating === this.props.instance) {
        this.instanceUpdating = null;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isStillMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          instanceId = _this$props.instanceId,
          identifier = _this$props.identifier;
      var _this$state = this.state,
          id = _this$state.id,
          idBase = _this$state.idBase,
          form = _this$state.form;

      if (!identifier) {
        return __('Not a valid widget.');
      }

      if (!form) {
        return null;
      }

      return createElement("div", {
        className: "wp-block-legacy-widget__edit-container" // Display none is used because when we switch from edit to preview,
        // we don't want to unmount the component.
        // Otherwise when we went back to edit we wound need to trigger
        // all widgets events again and some scripts may not deal well with this.
        ,
        style: {
          display: this.props.isVisible ? 'block' : 'none'
        }
      }, createElement(WidgetEditDomManager, {
        ref: function ref(_ref) {
          _this2.widgetEditDomManagerRef = _ref;
        },
        onInstanceChange: this.onInstanceChange,
        widgetNumber: instanceId * -1,
        id: id,
        idBase: idBase,
        form: form
      }));
    }
  }, {
    key: "onInstanceChange",
    value: function onInstanceChange(instanceChanges) {
      var _this3 = this;

      this.requestWidgetUpdater(instanceChanges, function (response) {
        _this3.instanceUpdating = response.instance;

        _this3.props.onInstanceChange(response.instance);
      });
    }
  }, {
    key: "requestWidgetUpdater",
    value: function requestWidgetUpdater(instanceChanges, callback) {
      var _this4 = this;

      var _this$props2 = this.props,
          identifier = _this$props2.identifier,
          instanceId = _this$props2.instanceId,
          instance = _this$props2.instance;

      if (!identifier) {
        return;
      }

      apiFetch({
        path: "/wp/v2/widgets/".concat(identifier, "/"),
        data: {
          identifier: identifier,
          instance: instance,
          // use negative ids to make sure the id does not exist on the database.
          id_to_use: instanceId * -1,
          instance_changes: instanceChanges
        },
        method: 'POST'
      }).then(function (response) {
        if (_this4.isStillMounted) {
          _this4.setState({
            form: response.form,
            idBase: response.id_base,
            id: response.id
          });

          if (callback) {
            callback(response);
          }
        }
      });
    }
  }]);

  return WidgetEditHandler;
}(Component);

export default withInstanceId(WidgetEditHandler);
//# sourceMappingURL=WidgetEditHandler.js.map