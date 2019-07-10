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

var _i18n = require("@wordpress/i18n");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _compose = require("@wordpress/compose");

var _WidgetEditDomManager = _interopRequireDefault(require("./WidgetEditDomManager"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var WidgetEditHandler =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(WidgetEditHandler, _Component);

  function WidgetEditHandler() {
    var _this;

    (0, _classCallCheck2.default)(this, WidgetEditHandler);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WidgetEditHandler).apply(this, arguments));
    _this.state = {
      form: null,
      idBase: null
    };
    _this.instanceUpdating = null;
    _this.onInstanceChange = _this.onInstanceChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.requestWidgetUpdater = _this.requestWidgetUpdater.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(WidgetEditHandler, [{
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
        return (0, _i18n.__)('Not a valid widget.');
      }

      if (!form) {
        return null;
      }

      return (0, _element.createElement)("div", {
        className: "wp-block-legacy-widget__edit-container" // Display none is used because when we switch from edit to preview,
        // we don't want to unmount the component.
        // Otherwise when we went back to edit we wound need to trigger
        // all widgets events again and some scripts may not deal well with this.
        ,
        style: {
          display: this.props.isVisible ? 'block' : 'none'
        }
      }, (0, _element.createElement)(_WidgetEditDomManager.default, {
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

      (0, _apiFetch.default)({
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
}(_element.Component);

var _default = (0, _compose.withInstanceId)(WidgetEditHandler);

exports.default = _default;
//# sourceMappingURL=WidgetEditHandler.js.map