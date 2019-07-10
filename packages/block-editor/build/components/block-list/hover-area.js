"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var HoverArea =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(HoverArea, _Component);

  function HoverArea() {
    var _this;

    (0, _classCallCheck2.default)(this, HoverArea);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HoverArea).apply(this, arguments));
    _this.state = {
      hoverArea: null
    };
    _this.onMouseLeave = _this.onMouseLeave.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onMouseMove = _this.onMouseMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(HoverArea, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.container) {
        this.toggleListeners(this.props.container, false);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.container) {
        this.toggleListeners(this.props.container);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.container === this.props.container) {
        return;
      }

      if (prevProps.container) {
        this.toggleListeners(prevProps.container, false);
      }

      if (this.props.container) {
        this.toggleListeners(this.props.container, true);
      }
    }
  }, {
    key: "toggleListeners",
    value: function toggleListeners(container) {
      var shouldListnerToEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var method = shouldListnerToEvents ? 'addEventListener' : 'removeEventListener';
      container[method]('mousemove', this.onMouseMove);
      container[method]('mouseleave', this.onMouseLeave);
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      if (this.state.hoverArea) {
        this.setState({
          hoverArea: null
        });
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var _this$props = this.props,
          isRTL = _this$props.isRTL,
          container = _this$props.container;

      var _container$getBoundin = container.getBoundingClientRect(),
          width = _container$getBoundin.width,
          left = _container$getBoundin.left,
          right = _container$getBoundin.right;

      var hoverArea = null;

      if (event.clientX - left < width / 3) {
        hoverArea = isRTL ? 'right' : 'left';
      } else if (right - event.clientX < width / 3) {
        hoverArea = isRTL ? 'left' : 'right';
      }

      if (hoverArea !== this.state.hoverArea) {
        this.setState({
          hoverArea: hoverArea
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var hoverArea = this.state.hoverArea;
      var children = this.props.children;
      return children({
        hoverArea: hoverArea
      });
    }
  }]);
  return HoverArea;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  return {
    isRTL: select('core/block-editor').getSettings().isRTL
  };
})(HoverArea);

exports.default = _default;
//# sourceMappingURL=hover-area.js.map