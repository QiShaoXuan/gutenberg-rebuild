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

var _edit = _interopRequireDefault(require("./edit"));

var _context = require("./context");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockEdit, _Component);

  function BlockEdit(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BlockEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockEdit).call(this, props));
    _this.setFocusedElement = _this.setFocusedElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      focusedElement: null,
      setFocusedElement: _this.setFocusedElement
    };
    return _this;
  }

  (0, _createClass2.default)(BlockEdit, [{
    key: "setFocusedElement",
    value: function setFocusedElement(focusedElement) {
      this.setState(function (prevState) {
        if (prevState.focusedElement === focusedElement) {
          return null;
        }

        return {
          focusedElement: focusedElement
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _element.createElement)(_context.BlockEditContextProvider, {
        value: this.state
      }, (0, _element.createElement)(_edit.default, this.props));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      var clientId = props.clientId,
          name = props.name,
          isSelected = props.isSelected;
      return {
        name: name,
        isSelected: isSelected,
        clientId: clientId
      };
    }
  }]);
  return BlockEdit;
}(_element.Component);

var _default = BlockEdit;
exports.default = _default;
//# sourceMappingURL=index.js.map