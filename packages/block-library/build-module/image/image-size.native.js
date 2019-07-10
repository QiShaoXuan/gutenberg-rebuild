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
/**
 * External dependencies
 */

import { View, Image } from 'react-native';
/**
 * Internal dependencies
 */

import { calculatePreferedImageSize } from './utils';

var ImageSize =
/*#__PURE__*/
function (_Component) {
  _inherits(ImageSize, _Component);

  function ImageSize() {
    var _this;

    _classCallCheck(this, ImageSize);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageSize).apply(this, arguments));
    _this.state = {
      width: undefined,
      height: undefined
    };
    _this.onLayout = _this.onLayout.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ImageSize, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.src !== prevProps.src) {
        this.image = {};
        this.setState({
          width: undefined,
          height: undefined
        });
        this.fetchImageSize();
      }

      if (this.props.dirtynessTrigger !== prevProps.dirtynessTrigger) {
        this.calculateSize();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchImageSize();
    }
  }, {
    key: "fetchImageSize",
    value: function fetchImageSize() {
      var _this2 = this;

      Image.getSize(this.props.src, function (width, height) {
        _this2.image = {
          width: width,
          height: height
        };

        _this2.calculateSize();
      });
    }
  }, {
    key: "calculateSize",
    value: function calculateSize() {
      if (this.image === undefined || this.container === undefined) {
        return;
      }

      var _calculatePreferedIma = calculatePreferedImageSize(this.image, this.container),
          width = _calculatePreferedIma.width,
          height = _calculatePreferedIma.height;

      this.setState({
        width: width,
        height: height
      });
    }
  }, {
    key: "onLayout",
    value: function onLayout(event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
          width = _event$nativeEvent$la.width,
          height = _event$nativeEvent$la.height;
      this.container = {
        clientWidth: width,
        clientHeight: height
      };
      this.calculateSize();
    }
  }, {
    key: "render",
    value: function render() {
      var sizes = {
        imageWidth: this.image && this.image.width,
        imageHeight: this.image && this.image.height,
        containerWidth: this.container && this.container.width,
        containerHeight: this.container && this.container.height,
        imageWidthWithinContainer: this.state.width,
        imageHeightWithinContainer: this.state.height
      };
      return createElement(View, {
        onLayout: this.onLayout
      }, this.props.children(sizes));
    }
  }]);

  return ImageSize;
}(Component);

export default ImageSize;
//# sourceMappingURL=image-size.native.js.map