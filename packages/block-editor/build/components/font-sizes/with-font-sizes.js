"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _utils = require("./utils");

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
 * Higher-order component, which handles font size logic for class generation,
 * font size value retrieval, and font size change handling.
 *
 * @param {...(object|string)} args The arguments should all be strings
 *                                  Each string contains the font size attribute name e.g: 'fontSize'.
 *
 * @return {Function} Higher-order component.
 */
var _default = function _default() {
  for (var _len = arguments.length, fontSizeNames = new Array(_len), _key = 0; _key < _len; _key++) {
    fontSizeNames[_key] = arguments[_key];
  }

  /*
  * Computes an object whose key is the font size attribute name as passed in the array,
  * and the value is the custom font size attribute name.
  * Custom font size is automatically compted by appending custom followed by the font size attribute name in with the first letter capitalized.
  */
  var fontSizeAttributeNames = (0, _lodash.reduce)(fontSizeNames, function (fontSizeAttributeNamesAccumulator, fontSizeAttributeName) {
    fontSizeAttributeNamesAccumulator[fontSizeAttributeName] = "custom".concat((0, _lodash.upperFirst)(fontSizeAttributeName));
    return fontSizeAttributeNamesAccumulator;
  }, {});
  return (0, _compose.createHigherOrderComponent)((0, _compose.compose)([(0, _data.withSelect)(function (select) {
    var _select$getSettings = select('core/block-editor').getSettings(),
        fontSizes = _select$getSettings.fontSizes;

    return {
      fontSizes: fontSizes
    };
  }), function (WrappedComponent) {
    return (
      /*#__PURE__*/
      function (_Component) {
        (0, _inherits2.default)(_class, _Component);

        function _class(props) {
          var _this;

          (0, _classCallCheck2.default)(this, _class);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).call(this, props));
          _this.setters = _this.createSetters();
          _this.state = {};
          return _this;
        }

        (0, _createClass2.default)(_class, [{
          key: "createSetters",
          value: function createSetters() {
            var _this2 = this;

            return (0, _lodash.reduce)(fontSizeAttributeNames, function (settersAccumulator, customFontSizeAttributeName, fontSizeAttributeName) {
              var upperFirstFontSizeAttributeName = (0, _lodash.upperFirst)(fontSizeAttributeName);
              settersAccumulator["set".concat(upperFirstFontSizeAttributeName)] = _this2.createSetFontSize(fontSizeAttributeName, customFontSizeAttributeName);
              return settersAccumulator;
            }, {});
          }
        }, {
          key: "createSetFontSize",
          value: function createSetFontSize(fontSizeAttributeName, customFontSizeAttributeName) {
            var _this3 = this;

            return function (fontSizeValue) {
              var _this3$props$setAttri;

              var fontSizeObject = (0, _lodash.find)(_this3.props.fontSizes, {
                size: fontSizeValue
              });

              _this3.props.setAttributes((_this3$props$setAttri = {}, (0, _defineProperty2.default)(_this3$props$setAttri, fontSizeAttributeName, fontSizeObject && fontSizeObject.slug ? fontSizeObject.slug : undefined), (0, _defineProperty2.default)(_this3$props$setAttri, customFontSizeAttributeName, fontSizeObject && fontSizeObject.slug ? undefined : fontSizeValue), _this3$props$setAttri));
            };
          }
        }, {
          key: "render",
          value: function render() {
            return (0, _element.createElement)(WrappedComponent, (0, _objectSpread2.default)({}, this.props, {
              fontSizes: undefined
            }, this.state, this.setters));
          }
        }], [{
          key: "getDerivedStateFromProps",
          value: function getDerivedStateFromProps(_ref, previousState) {
            var attributes = _ref.attributes,
                fontSizes = _ref.fontSizes;

            var didAttributesChange = function didAttributesChange(customFontSizeAttributeName, fontSizeAttributeName) {
              if (previousState[fontSizeAttributeName]) {
                // if new font size is name compare with the previous slug
                if (attributes[fontSizeAttributeName]) {
                  return attributes[fontSizeAttributeName] !== previousState[fontSizeAttributeName].slug;
                } // if font size is not named, update when the font size value changes.


                return previousState[fontSizeAttributeName].size !== attributes[customFontSizeAttributeName];
              } // in this case we need to build the font size object


              return true;
            };

            if (!(0, _lodash.some)(fontSizeAttributeNames, didAttributesChange)) {
              return null;
            }

            var newState = (0, _lodash.reduce)((0, _lodash.pickBy)(fontSizeAttributeNames, didAttributesChange), function (newStateAccumulator, customFontSizeAttributeName, fontSizeAttributeName) {
              var fontSizeAttributeValue = attributes[fontSizeAttributeName];
              var fontSizeObject = (0, _utils.getFontSize)(fontSizes, fontSizeAttributeValue, attributes[customFontSizeAttributeName]);
              newStateAccumulator[fontSizeAttributeName] = (0, _objectSpread2.default)({}, fontSizeObject, {
                class: (0, _utils.getFontSizeClass)(fontSizeAttributeValue)
              });
              return newStateAccumulator;
            }, {});
            return (0, _objectSpread2.default)({}, previousState, newState);
          }
        }]);
        return _class;
      }(_element.Component)
    );
  }]), 'withFontSizes');
};

exports.default = _default;
//# sourceMappingURL=with-font-sizes.js.map