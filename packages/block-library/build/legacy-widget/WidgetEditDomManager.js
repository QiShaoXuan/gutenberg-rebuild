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

var _isShallowEqual = _interopRequireDefault(require("@wordpress/is-shallow-equal"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var WidgetEditDomManager =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(WidgetEditDomManager, _Component);

  function WidgetEditDomManager() {
    var _this;

    (0, _classCallCheck2.default)(this, WidgetEditDomManager);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WidgetEditDomManager).apply(this, arguments));
    _this.containerRef = (0, _element.createRef)();
    _this.formRef = (0, _element.createRef)();
    _this.widgetContentRef = (0, _element.createRef)();
    _this.triggerWidgetEvent = _this.triggerWidgetEvent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(WidgetEditDomManager, [{
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
      return (0, _element.createElement)("div", {
        className: "widget open",
        ref: this.containerRef
      }, (0, _element.createElement)("div", {
        className: "widget-inside"
      }, (0, _element.createElement)("form", {
        ref: this.formRef,
        method: "post",
        onBlur: function onBlur() {
          if (_this2.shouldTriggerInstanceUpdate()) {
            _this2.props.onInstanceChange(_this2.retrieveUpdatedInstance());
          }
        }
      }, (0, _element.createElement)("div", {
        ref: this.widgetContentRef,
        className: "widget-content",
        dangerouslySetInnerHTML: {
          __html: form
        }
      }), (0, _element.createElement)("input", {
        type: "hidden",
        name: "widget-id",
        className: "widget-id",
        value: id
      }), (0, _element.createElement)("input", {
        type: "hidden",
        name: "id_base",
        className: "id_base",
        value: idBase
      }), (0, _element.createElement)("input", {
        type: "hidden",
        name: "widget_number",
        className: "widget_number",
        value: widgetNumber
      }), (0, _element.createElement)("input", {
        type: "hidden",
        name: "multi_number",
        className: "multi_number",
        value: ""
      }), (0, _element.createElement)("input", {
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

        if (!(0, _isShallowEqual.default)(currentFormData.getAll(rawKey), this.previousFormData.getAll(rawKey))) {
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
            if ((0, _lodash.includes)(['widget-id', 'id_base', 'widget_number', 'multi_number', 'add_new'], rawKey)) {
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
}(_element.Component);

var _default = WidgetEditDomManager;
exports.default = _default;
//# sourceMappingURL=WidgetEditDomManager.js.map