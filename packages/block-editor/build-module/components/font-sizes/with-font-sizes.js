import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { find, pickBy, reduce, some, upperFirst } from 'lodash';
/**
 * WordPress dependencies
 */

import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { getFontSize, getFontSizeClass } from './utils';
/**
 * Higher-order component, which handles font size logic for class generation,
 * font size value retrieval, and font size change handling.
 *
 * @param {...(object|string)} args The arguments should all be strings
 *                                  Each string contains the font size attribute name e.g: 'fontSize'.
 *
 * @return {Function} Higher-order component.
 */

export default (function () {
  for (var _len = arguments.length, fontSizeNames = new Array(_len), _key = 0; _key < _len; _key++) {
    fontSizeNames[_key] = arguments[_key];
  }

  /*
  * Computes an object whose key is the font size attribute name as passed in the array,
  * and the value is the custom font size attribute name.
  * Custom font size is automatically compted by appending custom followed by the font size attribute name in with the first letter capitalized.
  */
  var fontSizeAttributeNames = reduce(fontSizeNames, function (fontSizeAttributeNamesAccumulator, fontSizeAttributeName) {
    fontSizeAttributeNamesAccumulator[fontSizeAttributeName] = "custom".concat(upperFirst(fontSizeAttributeName));
    return fontSizeAttributeNamesAccumulator;
  }, {});
  return createHigherOrderComponent(compose([withSelect(function (select) {
    var _select$getSettings = select('core/block-editor').getSettings(),
        fontSizes = _select$getSettings.fontSizes;

    return {
      fontSizes: fontSizes
    };
  }), function (WrappedComponent) {
    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(_class, _Component);

        function _class(props) {
          var _this;

          _classCallCheck(this, _class);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
          _this.setters = _this.createSetters();
          _this.state = {};
          return _this;
        }

        _createClass(_class, [{
          key: "createSetters",
          value: function createSetters() {
            var _this2 = this;

            return reduce(fontSizeAttributeNames, function (settersAccumulator, customFontSizeAttributeName, fontSizeAttributeName) {
              var upperFirstFontSizeAttributeName = upperFirst(fontSizeAttributeName);
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

              var fontSizeObject = find(_this3.props.fontSizes, {
                size: fontSizeValue
              });

              _this3.props.setAttributes((_this3$props$setAttri = {}, _defineProperty(_this3$props$setAttri, fontSizeAttributeName, fontSizeObject && fontSizeObject.slug ? fontSizeObject.slug : undefined), _defineProperty(_this3$props$setAttri, customFontSizeAttributeName, fontSizeObject && fontSizeObject.slug ? undefined : fontSizeValue), _this3$props$setAttri));
            };
          }
        }, {
          key: "render",
          value: function render() {
            return createElement(WrappedComponent, _objectSpread({}, this.props, {
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

            if (!some(fontSizeAttributeNames, didAttributesChange)) {
              return null;
            }

            var newState = reduce(pickBy(fontSizeAttributeNames, didAttributesChange), function (newStateAccumulator, customFontSizeAttributeName, fontSizeAttributeName) {
              var fontSizeAttributeValue = attributes[fontSizeAttributeName];
              var fontSizeObject = getFontSize(fontSizes, fontSizeAttributeValue, attributes[customFontSizeAttributeName]);
              newStateAccumulator[fontSizeAttributeName] = _objectSpread({}, fontSizeObject, {
                class: getFontSizeClass(fontSizeAttributeValue)
              });
              return newStateAccumulator;
            }, {});
            return _objectSpread({}, previousState, newState);
          }
        }]);

        return _class;
      }(Component)
    );
  }]), 'withFontSizes');
});
//# sourceMappingURL=with-font-sizes.js.map