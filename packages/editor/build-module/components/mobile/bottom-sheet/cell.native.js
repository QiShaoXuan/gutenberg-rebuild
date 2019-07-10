import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { TouchableOpacity, Text, View, TextInput, I18nManager } from 'react-native';
/**
 * WordPress dependencies
 */

import { Dashicon } from '@wordpress/components';
import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import styles from './styles.scss';
import platformStyles from './cellStyles.scss';

var Cell =
/*#__PURE__*/
function (_Component) {
  _inherits(Cell, _Component);

  function Cell(props) {
    var _this;

    _classCallCheck(this, Cell);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cell).apply(this, arguments));
    _this.state = {
      isEditingValue: props.autoFocus || false
    };
    return _this;
  }

  _createClass(Cell, [{
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
          valueProps = _objectWithoutProperties(_this$props, ["onPress", "label", "value", "valuePlaceholder", "icon", "labelStyle", "valueStyle", "onChangeValue", "children", "editable", "separatorType", "style"]);

      var showValue = value !== undefined;
      var isValueEditable = editable && onChangeValue !== undefined;
      var defaultLabelStyle = showValue || icon !== undefined ? styles.cellLabel : styles.cellLabelCentered;
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
        var leftMarginStyle = _objectSpread({}, styles.cellSeparator, platformStyles.separatorMarginLeft);

        switch (separatorType) {
          case 'leftMargin':
            return leftMarginStyle;

          case 'fullWidth':
            return styles.separator;

          case 'none':
            return undefined;

          case undefined:
            return showValue ? leftMarginStyle : styles.separator;
        }
      };

      var getValueComponent = function getValueComponent() {
        var styleRTL = I18nManager.isRTL && styles.cellValueRTL;

        var finalStyle = _objectSpread({}, styles.cellValue, valueStyle, styleRTL); // To be able to show the `middle` ellipsizeMode on editable cells
        // we show the TextInput just when the user wants to edit the value,
        // and the Text component to display it.
        // We also show the TextInput to display placeholder.


        var shouldShowPlaceholder = isValueEditable && value === '';
        return _this2.state.isEditingValue || shouldShowPlaceholder ? createElement(TextInput, _extends({
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
        }, valueProps)) : createElement(Text, {
          style: _objectSpread({}, styles.cellValue, valueStyle),
          numberOfLines: 1,
          ellipsizeMode: 'middle'
        }, value);
      };

      return createElement(TouchableOpacity, {
        onPress: onCellPress,
        style: _objectSpread({}, styles.clipToBounds, style)
      }, createElement(View, {
        style: styles.cellContainer
      }, createElement(View, {
        style: styles.cellRowContainer
      }, icon && createElement(View, {
        style: styles.cellRowContainer
      }, createElement(Dashicon, {
        icon: icon,
        size: 24
      }), createElement(View, {
        style: platformStyles.labelIconSeparator
      })), createElement(Text, {
        numberOfLines: 1,
        style: _objectSpread({}, defaultLabelStyle, labelStyle)
      }, label)), showValue && getValueComponent(), children), drawSeparator && createElement(View, {
        style: separatorStyle()
      }));
    }
  }]);

  return Cell;
}(Component);

export { Cell as default };
//# sourceMappingURL=cell.native.js.map