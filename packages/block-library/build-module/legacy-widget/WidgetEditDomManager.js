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
import { includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, createRef } from '@wordpress/element';
import isShallowEqual from '@wordpress/is-shallow-equal';

var WidgetEditDomManager =
/*#__PURE__*/
function (_Component) {
  _inherits(WidgetEditDomManager, _Component);

  function WidgetEditDomManager() {
    var _this;

    _classCallCheck(this, WidgetEditDomManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WidgetEditDomManager).apply(this, arguments));
    _this.containerRef = createRef();
    _this.formRef = createRef();
    _this.widgetContentRef = createRef();
    _this.triggerWidgetEvent = _this.triggerWidgetEvent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(WidgetEditDomManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.triggerWidgetEvent('widget-added');
      this.previousFormData = new window.FormData(this.formRef.current);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // We can not leverage react render otherwise we would destroy dom changes applied by the plugins.
      // We manually update the required dom node replicating what the widget screen and the customizer do.
      if (nextProps.form !== this.props.form && this.widgetContentRef.current) {
        var widgetContent = this.widgetContentRef.current;
        widgetContent.innerHTML = nextProps.form;
        this.triggerWidgetEvent('widget-updated');
        this.previousFormData = new window.FormData(this.formRef.current);
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          id = _this$props.id,
          idBase = _this$props.idBase,
          widgetNumber = _this$props.widgetNumber,
          form = _this$props.form;
      return createElement("div", {
        className: "widget open",
        ref: this.containerRef
      }, createElement("div", {
        className: "widget-inside"
      }, createElement("form", {
        ref: this.formRef,
        method: "post",
        onBlur: function onBlur() {
          if (_this2.shouldTriggerInstanceUpdate()) {
            _this2.props.onInstanceChange(_this2.retrieveUpdatedInstance());
          }
        }
      }, createElement("div", {
        ref: this.widgetContentRef,
        className: "widget-content",
        dangerouslySetInnerHTML: {
          __html: form
        }
      }), createElement("input", {
        type: "hidden",
        name: "widget-id",
        className: "widget-id",
        value: id
      }), createElement("input", {
        type: "hidden",
        name: "id_base",
        className: "id_base",
        value: idBase
      }), createElement("input", {
        type: "hidden",
        name: "widget_number",
        className: "widget_number",
        value: widgetNumber
      }), createElement("input", {
        type: "hidden",
        name: "multi_number",
        className: "multi_number",
        value: ""
      }), createElement("input", {
        type: "hidden",
        name: "add_new",
        className: "add_new",
        value: ""
      }))));
    }
  }, {
    key: "shouldTriggerInstanceUpdate",
    value: function shouldTriggerInstanceUpdate() {
      if (!this.formRef.current) {
        return false;
      }

      if (!this.previousFormData) {
        return true;
      }

      var currentFormData = new window.FormData(this.formRef.current);
      var currentFormDataKeys = Array.from(currentFormData.keys());
      var previousFormDataKeys = Array.from(this.previousFormData.keys());

      if (currentFormDataKeys.length !== previousFormDataKeys.length) {
        return true;
      }

      for (var _i = 0; _i < currentFormDataKeys.length; _i++) {
        var rawKey = currentFormDataKeys[_i];

        if (!isShallowEqual(currentFormData.getAll(rawKey), this.previousFormData.getAll(rawKey))) {
          this.previousFormData = currentFormData;
          return true;
        }
      }

      return false;
    }
  }, {
    key: "triggerWidgetEvent",
    value: function triggerWidgetEvent(event) {
      window.$(window.document).trigger(event, [window.$(this.containerRef.current)]);
    }
  }, {
    key: "retrieveUpdatedInstance",
    value: function retrieveUpdatedInstance() {
      if (this.formRef.current) {
        var _this$props2 = this.props,
            idBase = _this$props2.idBase,
            widgetNumber = _this$props2.widgetNumber;
        var form = this.formRef.current;
        var formData = new window.FormData(form);
        var updatedInstance = {};
        var keyPrefixLength = "widget-".concat(idBase, "[").concat(widgetNumber, "][").length;
        var keySuffixLength = "]".length;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = formData.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rawKey = _step.value;

            // This fields are added to the form because the widget JavaScript code may use this values.
            // They are not relevant for the update mechanism.
            if (includes(['widget-id', 'id_base', 'widget_number', 'multi_number', 'add_new'], rawKey)) {
              continue;
            }

            var keyParsed = rawKey.substring(keyPrefixLength, rawKey.length - keySuffixLength);
            var value = formData.getAll(rawKey);

            if (value.length > 1) {
              updatedInstance[keyParsed] = value;
            } else {
              updatedInstance[keyParsed] = value[0];
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return updatedInstance;
      }
    }
  }]);

  return WidgetEditDomManager;
}(Component);

export default WidgetEditDomManager;
//# sourceMappingURL=WidgetEditDomManager.js.map