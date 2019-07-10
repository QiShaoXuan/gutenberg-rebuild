import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

var HoverArea =
/*#__PURE__*/
function (_Component) {
  _inherits(HoverArea, _Component);

  function HoverArea() {
    var _this;

    _classCallCheck(this, HoverArea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HoverArea).apply(this, arguments));
    _this.state = {
      hoverArea: null
    };
    _this.onMouseLeave = _this.onMouseLeave.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(HoverArea, [{
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
}(Component);

export default withSelect(function (select) {
  return {
    isRTL: select('core/block-editor').getSettings().isRTL
  };
})(HoverArea);
//# sourceMappingURL=hover-area.js.map