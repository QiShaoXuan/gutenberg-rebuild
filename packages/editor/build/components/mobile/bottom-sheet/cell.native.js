"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _components = require("@wordpress/components");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _cellStyles = _interopRequireDefault(require("./cellStyles.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var Cell =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Cell, _Component);

  function Cell(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Cell);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Cell).apply(this, arguments));
    _this.state = {
      isEditingValue: props.autoFocus || false
    };
    return _this;
  }

  (0, _createClass2.default)(Cell, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.isEditingValue) {
        this._valueTextInput.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onPress = _this$props.onPress,
          label = _this$props.label,
          value = _this$props.value,
          _this$props$valuePlac = _this$props.valuePlaceholder,
          valuePlaceholder = _this$props$valuePlac === void 0 ? '' : _this$props$valuePlac,
          icon = _this$props.icon,
          _this$props$labelStyl = _this$props.labelStyle,
          labelStyle = _this$props$labelStyl === void 0 ? {} : _this$props$labelStyl,
          _this$props$valueStyl = _this$props.valueStyle,
          valueStyle = _this$props$valueStyl === void 0 ? {} : _this$props$valueStyl,
          onChangeValue = _this$props.onChangeValue,
          children = _this$props.children,
          _this$props$editable = _this$props.editable,
          editable = _this$props$editable === void 0 ? true : _this$props$editable,
          separatorType = _this$props.separatorType,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          valueProps = (0, _objectWithoutProperties2.default)(_this$props, ["onPress", "label", "value", "valuePlaceholder", "icon", "labelStyle", "valueStyle", "onChangeValue", "children", "editable", "separatorType", "style"]);
      var showValue = value !== undefined;
      var isValueEditable = editable && onChangeValue !== undefined;
      var defaultLabelStyle = showValue || icon !== undefined ? _styles.default.cellLabel : _styles.default.cellLabelCentered;
      var drawSeparator = separatorType && separatorType !== 'none' || separatorStyle === undefined;

      var onCellPress = function onCellPress() {
        if (isValueEditable) {
          startEditing();
        } else if (onPress !== undefined) {
          onPress();
        }
      };

      var finishEditing = function finishEditing() {
        _this2.setState({
          isEditingValue: false
        });
      };

      var startEditing = function startEditing() {
        if (_this2.state.isEditingValue === false) {
          _this2.setState({
            isEditingValue: true
          });
        }
      };

      var separatorStyle = function separatorStyle() {
        var leftMarginStyle = (0, _objectSpread2.default)({}, _styles.default.cellSeparator, _cellStyles.default.separatorMarginLeft);

        switch (separatorType) {
          case 'leftMargin':
            return leftMarginStyle;

          case 'fullWidth':
            return _styles.default.separator;

          case 'none':
            return undefined;

          case undefined:
            return showValue ? leftMarginStyle : _styles.default.separator;
        }
      };

      var getValueComponent = function getValueComponent() {
        var styleRTL = _reactNative.I18nManager.isRTL && _styles.default.cellValueRTL;
        var finalStyle = (0, _objectSpread2.default)({}, _styles.default.cellValue, valueStyle, styleRTL); // To be able to show the `middle` ellipsizeMode on editable cells
        // we show the TextInput just when the user wants to edit the value,
        // and the Text component to display it.
        // We also show the TextInput to display placeholder.

        var shouldShowPlaceholder = isValueEditable && value === '';
        return _this2.state.isEditingValue || shouldShowPlaceholder ? (0, _element.createElement)(_reactNative.TextInput, (0, _extends2.default)({
          ref: function ref(c) {
            return _this2._valueTextInput = c;
          },
          numberOfLines: 1,
          style: finalStyle,
          value: value,
          placeholder: valuePlaceholder,
          placeholderTextColor: '#87a6bc',
          onChangeText: onChangeValue,
          editable: isValueEditable,
          pointerEvents: _this2.state.isEditingValue ? 'auto' : 'none',
          onFocus: startEditing,
          onBlur: finishEditing
        }, valueProps)) : (0, _element.createElement)(_reactNative.Text, {
          style: (0, _objectSpread2.default)({}, _styles.default.cellValue, valueStyle),
          numberOfLines: 1,
          ellipsizeMode: 'middle'
        }, value);
      };

      return (0, _element.createElement)(_reactNative.TouchableOpacity, {
        onPress: onCellPress,
        style: (0, _objectSpread2.default)({}, _styles.default.clipToBounds, style)
      }, (0, _element.createElement)(_reactNative.View, {
        style: _styles.default.cellContainer
      }, (0, _element.createElement)(_reactNative.View, {
        style: _styles.default.cellRowContainer
      }, icon && (0, _element.createElement)(_reactNative.View, {
        style: _styles.default.cellRowContainer
      }, (0, _element.createElement)(_components.Dashicon, {
        icon: icon,
        size: 24
      }), (0, _element.createElement)(_reactNative.View, {
        style: _cellStyles.default.labelIconSeparator
      })), (0, _element.createElement)(_reactNative.Text, {
        numberOfLines: 1,
        style: (0, _objectSpread2.default)({}, defaultLabelStyle, labelStyle)
      }, label)), showValue && getValueComponent(), children), drawSeparator && (0, _element.createElement)(_reactNative.View, {
        style: separatorStyle()
      }));
    }
  }]);
  return Cell;
}(_element.Component);

exports.default = Cell;
//# sourceMappingURL=cell.native.js.map