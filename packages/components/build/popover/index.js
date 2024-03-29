"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

var _isShallowEqual = _interopRequireDefault(require("@wordpress/is-shallow-equal"));

var _utils = require("./utils");

var _withFocusReturn = _interopRequireDefault(require("../higher-order/with-focus-return"));

var _withConstrainedTabbing = _interopRequireDefault(require("../higher-order/with-constrained-tabbing"));

var _detectOutside = _interopRequireDefault(require("./detect-outside"));

var _iconButton = _interopRequireDefault(require("../icon-button"));

var _scrollLock = _interopRequireDefault(require("../scroll-lock"));

var _isolatedEventContainer = _interopRequireDefault(require("../isolated-event-container"));

var _slotFill = require("../slot-fill");

var _animate = _interopRequireDefault(require("../animate"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var FocusManaged = (0, _withConstrainedTabbing.default)((0, _withFocusReturn.default)(function (_ref) {
  var children = _ref.children;
  return children;
}));
/**
 * Name of slot in which popover should fill.
 *
 * @type {String}
 */

var SLOT_NAME = 'Popover';

var Popover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Popover, _Component);

  function Popover() {
    var _this;

    (0, _classCallCheck2.default)(this, Popover);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Popover).apply(this, arguments));
    _this.getAnchorRect = _this.getAnchorRect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.computePopoverPosition = _this.computePopoverPosition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.maybeClose = _this.maybeClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.throttledRefresh = _this.throttledRefresh.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.refresh = _this.refresh.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.refreshOnAnchorMove = _this.refreshOnAnchorMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.contentNode = (0, _element.createRef)();
    _this.anchorNode = (0, _element.createRef)();
    _this.state = {
      popoverLeft: null,
      popoverTop: null,
      yAxis: 'top',
      xAxis: 'center',
      contentHeight: null,
      contentWidth: null,
      isMobile: false,
      popoverSize: null,
      // Delay the animation after the initial render
      // because the animation have impact on the height of the popover
      // causing the computed position to be wrong.
      isReadyToAnimate: false
    }; // Property used keep track of the previous anchor rect
    // used to compute the popover position and size.

    _this.anchorRect = {};
    return _this;
  }

  (0, _createClass2.default)(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.toggleAutoRefresh(true);
      this.refresh();
      /*
       * Without the setTimeout, the dom node is not being focused. Related:
       * https://stackoverflow.com/questions/35522220/react-ref-with-focus-doesnt-work-without-settimeout-my-example
       *
       * TODO: Treat the cause, not the symptom.
       */

      this.focusTimeout = setTimeout(function () {
        _this2.focus();
      }, 0);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.position !== this.props.position) {
        this.computePopoverPosition(this.state.popoverSize, this.anchorRect);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.focusTimeout);
      this.toggleAutoRefresh(false);
    }
  }, {
    key: "toggleAutoRefresh",
    value: function toggleAutoRefresh(isActive) {
      window.cancelAnimationFrame(this.rafHandle); // Refresh the popover every time the window is resized or scrolled

      var handler = isActive ? 'addEventListener' : 'removeEventListener';
      window[handler]('resize', this.throttledRefresh);
      window[handler]('scroll', this.throttledRefresh, true);
      /*
       * There are sometimes we need to reposition or resize the popover that are not
       * handled by the resize/scroll window events (i.e. CSS changes in the layout
       * that changes the position of the anchor).
       *
       * For these situations, we refresh the popover every 0.5s
       */

      if (isActive) {
        this.autoRefresh = setInterval(this.refreshOnAnchorMove, 500);
      } else {
        clearInterval(this.autoRefresh);
      }
    }
  }, {
    key: "throttledRefresh",
    value: function throttledRefresh(event) {
      window.cancelAnimationFrame(this.rafHandle);

      if (event && event.type === 'scroll' && this.contentNode.current.contains(event.target)) {
        return;
      }

      this.rafHandle = window.requestAnimationFrame(this.refresh);
    }
    /**
     * Calling refreshOnAnchorMove
     * will only refresh the popover position if the anchor moves.
     */

  }, {
    key: "refreshOnAnchorMove",
    value: function refreshOnAnchorMove() {
      var _this$props$getAnchor = this.props.getAnchorRect,
          getAnchorRect = _this$props$getAnchor === void 0 ? this.getAnchorRect : _this$props$getAnchor;
      var anchorRect = getAnchorRect(this.anchorNode.current);
      var didAnchorRectChange = !(0, _isShallowEqual.default)(anchorRect, this.anchorRect);

      if (didAnchorRectChange) {
        this.anchorRect = anchorRect;
        this.computePopoverPosition(this.state.popoverSize, anchorRect);
      }
    }
    /**
     * Calling `refresh()` will force the Popover to recalculate its size and
     * position. This is useful when a DOM change causes the anchor node to change
     * position.
     */

  }, {
    key: "refresh",
    value: function refresh() {
      var _this$props$getAnchor2 = this.props.getAnchorRect,
          getAnchorRect = _this$props$getAnchor2 === void 0 ? this.getAnchorRect : _this$props$getAnchor2;
      var anchorRect = getAnchorRect(this.anchorNode.current);
      var contentRect = this.contentNode.current.getBoundingClientRect();
      var popoverSize = {
        width: contentRect.width,
        height: contentRect.height
      };
      var didPopoverSizeChange = !this.state.popoverSize || popoverSize.width !== this.state.popoverSize.width || popoverSize.height !== this.state.popoverSize.height;

      if (didPopoverSizeChange) {
        this.setState({
          popoverSize: popoverSize,
          isReadyToAnimate: true
        });
      }

      this.anchorRect = anchorRect;
      this.computePopoverPosition(popoverSize, anchorRect);
    }
  }, {
    key: "focus",
    value: function focus() {
      var focusOnMount = this.props.focusOnMount;

      if (!focusOnMount || !this.contentNode.current) {
        return;
      }

      if (focusOnMount === 'firstElement') {
        // Find first tabbable node within content and shift focus, falling
        // back to the popover panel itself.
        var firstTabbable = _dom.focus.tabbable.find(this.contentNode.current)[0];

        if (firstTabbable) {
          firstTabbable.focus();
        } else {
          this.contentNode.current.focus();
        }

        return;
      }

      if (focusOnMount === 'container') {
        // Focus the popover panel itself so items in the popover are easily
        // accessed via keyboard navigation.
        this.contentNode.current.focus();
      }
    }
  }, {
    key: "getAnchorRect",
    value: function getAnchorRect(anchor) {
      if (!anchor || !anchor.parentNode) {
        return;
      }

      var rect = anchor.parentNode.getBoundingClientRect(); // subtract padding

      var _window$getComputedSt = window.getComputedStyle(anchor.parentNode),
          paddingTop = _window$getComputedSt.paddingTop,
          paddingBottom = _window$getComputedSt.paddingBottom;

      var topPad = parseInt(paddingTop, 10);
      var bottomPad = parseInt(paddingBottom, 10);
      return {
        x: rect.left,
        y: rect.top + topPad,
        width: rect.width,
        height: rect.height - topPad - bottomPad,
        left: rect.left,
        right: rect.right,
        top: rect.top + topPad,
        bottom: rect.bottom - bottomPad
      };
    }
  }, {
    key: "computePopoverPosition",
    value: function computePopoverPosition(popoverSize, anchorRect) {
      var _this$props = this.props,
          _this$props$position = _this$props.position,
          position = _this$props$position === void 0 ? 'top' : _this$props$position,
          expandOnMobile = _this$props.expandOnMobile;
      var newPopoverPosition = (0, _utils.computePopoverPosition)(anchorRect, popoverSize, position, expandOnMobile);

      if (this.state.yAxis !== newPopoverPosition.yAxis || this.state.xAxis !== newPopoverPosition.xAxis || this.state.popoverLeft !== newPopoverPosition.popoverLeft || this.state.popoverTop !== newPopoverPosition.popoverTop || this.state.contentHeight !== newPopoverPosition.contentHeight || this.state.contentWidth !== newPopoverPosition.contentWidth || this.state.isMobile !== newPopoverPosition.isMobile) {
        this.setState(newPopoverPosition);
      }
    }
  }, {
    key: "maybeClose",
    value: function maybeClose(event) {
      var _this$props2 = this.props,
          onKeyDown = _this$props2.onKeyDown,
          onClose = _this$props2.onClose; // Close on escape

      if (event.keyCode === _keycodes.ESCAPE && onClose) {
        event.stopPropagation();
        onClose();
      } // Preserve original content prop behavior


      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          headerTitle = _this$props3.headerTitle,
          onClose = _this$props3.onClose,
          children = _this$props3.children,
          className = _this$props3.className,
          _this$props3$onClickO = _this$props3.onClickOutside,
          onClickOutside = _this$props3$onClickO === void 0 ? onClose : _this$props3$onClickO,
          noArrow = _this$props3.noArrow,
          position = _this$props3.position,
          range = _this$props3.range,
          focusOnMount = _this$props3.focusOnMount,
          getAnchorRect = _this$props3.getAnchorRect,
          expandOnMobile = _this$props3.expandOnMobile,
          _this$props3$animate = _this$props3.animate,
          animate = _this$props3$animate === void 0 ? true : _this$props3$animate,
          contentProps = (0, _objectWithoutProperties2.default)(_this$props3, ["headerTitle", "onClose", "children", "className", "onClickOutside", "noArrow", "position", "range", "focusOnMount", "getAnchorRect", "expandOnMobile", "animate"]);
      var _this$state = this.state,
          popoverLeft = _this$state.popoverLeft,
          popoverTop = _this$state.popoverTop,
          yAxis = _this$state.yAxis,
          xAxis = _this$state.xAxis,
          contentHeight = _this$state.contentHeight,
          contentWidth = _this$state.contentWidth,
          popoverSize = _this$state.popoverSize,
          isMobile = _this$state.isMobile,
          isReadyToAnimate = _this$state.isReadyToAnimate; // Compute the animation position

      var yAxisMapping = {
        top: 'bottom',
        bottom: 'top'
      };
      var xAxisMapping = {
        left: 'right',
        right: 'left'
      };
      var animateYAxis = yAxisMapping[yAxis] || 'middle';
      var animateXAxis = xAxisMapping[xAxis] || 'center';
      var classes = (0, _classnames.default)('components-popover', className, 'is-' + yAxis, 'is-' + xAxis, {
        'is-mobile': isMobile,
        'is-without-arrow': noArrow || xAxis === 'center' && yAxis === 'middle'
      }); // Disable reason: We care to capture the _bubbled_ events from inputs
      // within popover as inferring close intent.

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      var content = (0, _element.createElement)(_detectOutside.default, {
        onClickOutside: onClickOutside
      }, (0, _element.createElement)(_animate.default, {
        type: animate && isReadyToAnimate ? 'appear' : null,
        options: {
          origin: animateYAxis + ' ' + animateXAxis
        }
      }, function (_ref2) {
        var animateClassName = _ref2.className;
        return (0, _element.createElement)(_isolatedEventContainer.default, (0, _extends2.default)({
          className: (0, _classnames.default)(classes, animateClassName),
          style: {
            top: !isMobile && popoverTop ? popoverTop + 'px' : undefined,
            left: !isMobile && popoverLeft ? popoverLeft + 'px' : undefined,
            visibility: popoverSize ? undefined : 'hidden'
          }
        }, contentProps, {
          onKeyDown: _this3.maybeClose
        }), isMobile && (0, _element.createElement)("div", {
          className: "components-popover__header"
        }, (0, _element.createElement)("span", {
          className: "components-popover__header-title"
        }, headerTitle), (0, _element.createElement)(_iconButton.default, {
          className: "components-popover__close",
          icon: "no-alt",
          onClick: onClose
        })), (0, _element.createElement)("div", {
          ref: _this3.contentNode,
          className: "components-popover__content",
          style: {
            maxHeight: !isMobile && contentHeight ? contentHeight + 'px' : undefined,
            maxWidth: !isMobile && contentWidth ? contentWidth + 'px' : undefined
          },
          tabIndex: "-1"
        }, children));
      }));
      /* eslint-enable jsx-a11y/no-static-element-interactions */
      // Apply focus to element as long as focusOnMount is truthy; false is
      // the only "disabled" value.

      if (focusOnMount) {
        content = (0, _element.createElement)(FocusManaged, null, content);
      }

      return (0, _element.createElement)(_slotFill.Consumer, null, function (_ref3) {
        var getSlot = _ref3.getSlot;

        // In case there is no slot context in which to render,
        // default to an in-place rendering.
        if (getSlot && getSlot(SLOT_NAME)) {
          content = (0, _element.createElement)(_slotFill.Fill, {
            name: SLOT_NAME
          }, content);
        }

        return (0, _element.createElement)("span", {
          ref: _this3.anchorNode
        }, content, isMobile && expandOnMobile && (0, _element.createElement)(_scrollLock.default, null));
      });
    }
  }]);
  return Popover;
}(_element.Component);

Popover.defaultProps = {
  focusOnMount: 'firstElement',
  noArrow: false
};
var PopoverContainer = Popover;

PopoverContainer.Slot = function () {
  return (0, _element.createElement)(_slotFill.Slot, {
    bubblesVirtually: true,
    name: SLOT_NAME
  });
};

var _default = PopoverContainer;
exports.default = _default;
//# sourceMappingURL=index.js.map