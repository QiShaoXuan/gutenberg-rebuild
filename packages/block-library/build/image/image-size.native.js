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

var _reactNative = require("react-native");

var _utils = require("./utils");

/**
 * WordPress dependencies
 */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
var ImageSize =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ImageSize, _Component);

  function ImageSize() {
    var _this;

    (0, _classCallCheck2.default)(this, ImageSize);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageSize).apply(this, arguments));
    _this.state = {
      width: undefined,
      height: undefined
    };
    _this.onLayout = _this.onLayout.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ImageSize, [{
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

      _reactNative.Image.getSize(this.props.src, function (width, height) {
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

      var _calculatePreferedIma = (0, _utils.calculatePreferedImageSize)(this.image, this.container),
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
      return (0, _element.createElement)(_reactNative.View, {
        onLayout: this.onLayout
      }, this.props.children(sizes));
    }
  }]);
  return ImageSize;
}(_element.Component);

var _default = ImageSize;
exports.default = _default;
//# sourceMappingURL=image-size.native.js.map