import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { mapKeys } from 'lodash';
import memize from 'memize';
/**
 * WordPress dependencies
 */

import { select, dispatch, withSelect, withDispatch } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation, as in a connected or
 * other pure component which performs `shouldComponentUpdate` check on props.
 * This should be used as a last resort, since the normalized data should be
 * maintained by the reducer result in state.
 *
 * @type {Array}
 */

var EMPTY_ARRAY = [];
/**
 * Registers a new format provided a unique name and an object defining its
 * behavior.
 *
 * @param {string}   name                 Format name.
 * @param {Object}   settings             Format settings.
 * @param {string}   settings.tagName     The HTML tag this format will wrap the selection with.
 * @param {string}   [settings.className] A class to match the format.
 * @param {string}   settings.title       Name of the format.
 * @param {Function} settings.edit        Should return a component for the user to interact with the new registered format.
 *
 * @return {WPFormat|undefined} The format, if it has been successfully registered;
 *                              otherwise `undefined`.
 */

export function registerFormatType(name, settings) {
  settings = _objectSpread({
    name: name
  }, settings);

  if (typeof settings.name !== 'string') {
    window.console.error('Format names must be strings.');
    return;
  }

  if (!/^[a-z][a-z0-9-]*\/[a-z][a-z0-9-]*$/.test(settings.name)) {
    window.console.error('Format names must contain a namespace prefix, include only lowercase alphanumeric characters or dashes, and start with a letter. Example: my-plugin/my-custom-format');
    return;
  }

  if (select('core/rich-text').getFormatType(settings.name)) {
    window.console.error('Format "' + settings.name + '" is already registered.');
    return;
  }

  if (typeof settings.tagName !== 'string' || settings.tagName === '') {
    window.console.error('Format tag names must be a string.');
    return;
  }

  if ((typeof settings.className !== 'string' || settings.className === '') && settings.className !== null) {
    window.console.error('Format class names must be a string, or null to handle bare elements.');
    return;
  }

  if (!/^[_a-zA-Z]+[a-zA-Z0-9-]*$/.test(settings.className)) {
    window.console.error('A class name must begin with a letter, followed by any number of hyphens, letters, or numbers.');
    return;
  }

  if (settings.className === null) {
    var formatTypeForBareElement = select('core/rich-text').getFormatTypeForBareElement(settings.tagName);

    if (formatTypeForBareElement) {
      window.console.error("Format \"".concat(formatTypeForBareElement.name, "\" is already registered to handle bare tag name \"").concat(settings.tagName, "\"."));
      return;
    }
  } else {
    var formatTypeForClassName = select('core/rich-text').getFormatTypeForClassName(settings.className);

    if (formatTypeForClassName) {
      window.console.error("Format \"".concat(formatTypeForClassName.name, "\" is already registered to handle class name \"").concat(settings.className, "\"."));
      return;
    }
  }

  if (!('title' in settings) || settings.title === '') {
    window.console.error('The format "' + settings.name + '" must have a title.');
    return;
  }

  if ('keywords' in settings && settings.keywords.length > 3) {
    window.console.error('The format "' + settings.name + '" can have a maximum of 3 keywords.');
    return;
  }

  if (typeof settings.title !== 'string') {
    window.console.error('Format titles must be strings.');
    return;
  }

  dispatch('core/rich-text').addFormatTypes(settings);
  var getFunctionStackMemoized = memize(function () {
    var previousStack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EMPTY_ARRAY;
    var newFunction = arguments.length > 1 ? arguments[1] : undefined;
    return [].concat(_toConsumableArray(previousStack), [newFunction]);
  });

  if (settings.__experimentalCreatePrepareEditableTree) {
    addFilter('experimentalRichText', name, function (OriginalComponent) {
      var Component = OriginalComponent;

      if (settings.__experimentalCreatePrepareEditableTree || settings.__experimentalCreateFormatToValue || settings.__experimentalCreateValueToFormat) {
        Component = function Component(props) {
          var additionalProps = {};

          if (settings.__experimentalCreatePrepareEditableTree) {
            additionalProps.prepareEditableTree = getFunctionStackMemoized(props.prepareEditableTree, settings.__experimentalCreatePrepareEditableTree(props["format_".concat(name)], {
              richTextIdentifier: props.identifier,
              blockClientId: props.clientId
            }));
          }

          if (settings.__experimentalCreateOnChangeEditableValue) {
            var dispatchProps = Object.keys(props).reduce(function (accumulator, propKey) {
              var propValue = props[propKey];
              var keyPrefix = "format_".concat(name, "_dispatch_");

              if (propKey.startsWith(keyPrefix)) {
                var realKey = propKey.replace(keyPrefix, '');
                accumulator[realKey] = propValue;
              }

              return accumulator;
            }, {});
            additionalProps.onChangeEditableValue = getFunctionStackMemoized(props.onChangeEditableValue, settings.__experimentalCreateOnChangeEditableValue(_objectSpread({}, props["format_".concat(name)], dispatchProps), {
              richTextIdentifier: props.identifier,
              blockClientId: props.clientId
            }));
          }

          return createElement(OriginalComponent, _extends({}, props, additionalProps));
        };
      }

      var hocs = [];

      if (settings.__experimentalGetPropsForEditableTreePreparation) {
        hocs.push(withSelect(function (sel, _ref) {
          var clientId = _ref.clientId,
              identifier = _ref.identifier;
          return _defineProperty({}, "format_".concat(name), settings.__experimentalGetPropsForEditableTreePreparation(sel, {
            richTextIdentifier: identifier,
            blockClientId: clientId
          }));
        }));
      }

      if (settings.__experimentalGetPropsForEditableTreeChangeHandler) {
        hocs.push(withDispatch(function (disp, _ref3) {
          var clientId = _ref3.clientId,
              identifier = _ref3.identifier;

          var dispatchProps = settings.__experimentalGetPropsForEditableTreeChangeHandler(disp, {
            richTextIdentifier: identifier,
            blockClientId: clientId
          });

          return mapKeys(dispatchProps, function (value, key) {
            return "format_".concat(name, "_dispatch_").concat(key);
          });
        }));
      }

      return compose(hocs)(Component);
    });
  }

  return settings;
}
//# sourceMappingURL=register-format-type.js.map