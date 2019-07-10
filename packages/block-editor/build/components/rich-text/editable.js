"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _element = require("@wordpress/element");

var _keycodes = require("@wordpress/keycodes");

var _aria = require("./aria");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Browser dependencies
 */
var userAgent = window.navigator.userAgent;
/**
 * Applies a fix that provides `input` events for contenteditable in Internet Explorer.
 *
 * @param {Element} editorNode The root editor node.
 *
 * @return {Function} A function to remove the fix (for cleanup).
 */

function applyInternetExplorerInputFix(editorNode) {
  /**
   * Dispatches `input` events in response to `textinput` events.
   *
   * IE provides a `textinput` event that is similar to an `input` event,
   * and we use it to manually dispatch an `input` event.
   * `textinput` is dispatched for text entry but for not deletions.
   *
   * @param {Event} textInputEvent An Internet Explorer `textinput` event.
   */
  function mapTextInputEvent(textInputEvent) {
    textInputEvent.stopImmediatePropagation();
    var inputEvent = document.createEvent('Event');
    inputEvent.initEvent('input', true, false);
    inputEvent.data = textInputEvent.data;
    textInputEvent.target.dispatchEvent(inputEvent);
  }
  /**
   * Dispatches `input` events in response to Delete and Backspace keyup.
   *
   * It would be better dispatch an `input` event after each deleting
   * `keydown` because the DOM is updated after each, but it is challenging
   * to determine the right time to dispatch `input` since propagation of
   * `keydown` can be stopped at any point.
   *
   * It's easier to listen for `keyup` in the capture phase and dispatch
   * `input` before `keyup` propagates further. It's not perfect, but should
   * be good enough.
   *
   * @param {KeyboardEvent} keyUp
   * @param {Node}          keyUp.target  The event target.
   * @param {number}        keyUp.keyCode The key code.
   */


  function mapDeletionKeyUpEvents(_ref) {
    var target = _ref.target,
        keyCode = _ref.keyCode;
    var isDeletion = _keycodes.BACKSPACE === keyCode || _keycodes.DELETE === keyCode;

    if (isDeletion && editorNode.contains(target)) {
      var inputEvent = document.createEvent('Event');
      inputEvent.initEvent('input', true, false);
      inputEvent.data = null;
      target.dispatchEvent(inputEvent);
    }
  }

  editorNode.addEventListener('textinput', mapTextInputEvent);
  document.addEventListener('keyup', mapDeletionKeyUpEvents, true);
  return function removeInternetExplorerInputFix() {
    editorNode.removeEventListener('textinput', mapTextInputEvent);
    document.removeEventListener('keyup', mapDeletionKeyUpEvents, true);
  };
}

var IS_PLACEHOLDER_VISIBLE_ATTR_NAME = 'data-is-placeholder-visible';
var CLASS_NAME = 'editor-rich-text__editable block-editor-rich-text__editable';
/**
 * Whether or not the user agent is Internet Explorer.
 *
 * @type {boolean}
 */

var IS_IE = userAgent.indexOf('Trident') >= 0;

var Editable =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Editable, _Component);

  function Editable() {
    var _this;

    (0, _classCallCheck2.default)(this, Editable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Editable).call(this));
    _this.bindEditorNode = _this.bindEditorNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  } // We must prevent rerenders because the browser will modify the DOM. React
  // will rerender the DOM fine, but we're losing selection and it would be
  // more expensive to do so as it would just set the inner HTML through
  // `dangerouslySetInnerHTML`. Instead RichText does it's own diffing and
  // selection setting.
  //
  // Because we never update the component, we have to look through props and
  // update the attributes on the wrapper nodes here. `componentDidUpdate`
  // will never be called.


  (0, _createClass2.default)(Editable, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      this.configureIsPlaceholderVisible(nextProps.isPlaceholderVisible);

      if (!(0, _lodash.isEqual)(this.props.style, nextProps.style)) {
        this.editorNode.setAttribute('style', '');
        Object.assign(this.editorNode.style, nextProps.style);
      }

      if (!(0, _lodash.isEqual)(this.props.className, nextProps.className)) {
        this.editorNode.className = (0, _classnames.default)(nextProps.className, CLASS_NAME);
      }

      var _diffAriaProps = (0, _aria.diffAriaProps)(this.props, nextProps),
          removedKeys = _diffAriaProps.removedKeys,
          updatedKeys = _diffAriaProps.updatedKeys;

      removedKeys.forEach(function (key) {
        return _this2.editorNode.removeAttribute(key);
      });
      updatedKeys.forEach(function (key) {
        return _this2.editorNode.setAttribute(key, nextProps[key]);
      });
      return false;
    }
  }, {
    key: "configureIsPlaceholderVisible",
    value: function configureIsPlaceholderVisible(isPlaceholderVisible) {
      var isPlaceholderVisibleString = String(!!isPlaceholderVisible);

      if (this.editorNode.getAttribute(IS_PLACEHOLDER_VISIBLE_ATTR_NAME) !== isPlaceholderVisibleString) {
        this.editorNode.setAttribute(IS_PLACEHOLDER_VISIBLE_ATTR_NAME, isPlaceholderVisibleString);
      }
    }
  }, {
    key: "bindEditorNode",
    value: function bindEditorNode(editorNode) {
      this.editorNode = editorNode;
      this.props.setRef(editorNode);

      if (IS_IE) {
        if (editorNode) {
          // Mounting:
          this.removeInternetExplorerInputFix = applyInternetExplorerInputFix(editorNode);
        } else {
          // Unmounting:
          this.removeInternetExplorerInputFix();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _objectSpread2;

      var _this$props = this.props,
          _this$props$tagName = _this$props.tagName,
          tagName = _this$props$tagName === void 0 ? 'div' : _this$props$tagName,
          style = _this$props.style,
          record = _this$props.record,
          valueToEditableHTML = _this$props.valueToEditableHTML,
          className = _this$props.className,
          isPlaceholderVisible = _this$props.isPlaceholderVisible,
          remainingProps = (0, _objectWithoutProperties2.default)(_this$props, ["tagName", "style", "record", "valueToEditableHTML", "className", "isPlaceholderVisible"]);
      delete remainingProps.setRef;
      return (0, _element.createElement)(tagName, (0, _objectSpread3.default)((_objectSpread2 = {
        role: 'textbox',
        'aria-multiline': true,
        className: (0, _classnames.default)(className, CLASS_NAME),
        contentEditable: true
      }, (0, _defineProperty2.default)(_objectSpread2, IS_PLACEHOLDER_VISIBLE_ATTR_NAME, isPlaceholderVisible), (0, _defineProperty2.default)(_objectSpread2, "ref", this.bindEditorNode), (0, _defineProperty2.default)(_objectSpread2, "style", style), (0, _defineProperty2.default)(_objectSpread2, "suppressContentEditableWarning", true), (0, _defineProperty2.default)(_objectSpread2, "dangerouslySetInnerHTML", {
        __html: valueToEditableHTML(record)
      }), _objectSpread2), remainingProps));
    }
  }]);
  return Editable;
}(_element.Component);

exports.default = Editable;
//# sourceMappingURL=editable.js.map