import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View } from 'react-native';
export default function Spinner(props) {
  var progress = props.progress;
  var width = progress + '%';
  return createElement(View, {
    style: {
      flex: 1,
      height: 5,
      backgroundColor: '#c8d7e1'
    }
  }, createElement(View, {
    style: {
      width: width,
      height: 5,
      backgroundColor: '#0087be'
    }
  }));
}
//# sourceMappingURL=index.native.js.map