import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { TouchableOpacity, View, Text } from 'react-native';
/**
 * Internal dependencies
 */

import styles from './styles.scss';
export default function Button(props) {
  var onPress = props.onPress,
      disabled = props.disabled,
      text = props.text,
      color = props.color;
  return createElement(TouchableOpacity, {
    accessible: true,
    onPress: onPress,
    disabled: disabled
  }, createElement(View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center'
    }
  }, createElement(Text, {
    style: _objectSpread({}, styles.buttonText, {
      color: color
    })
  }, text)));
}
//# sourceMappingURL=button.native.js.map