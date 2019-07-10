import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { isEqual, reduce, some } from 'lodash';
/**
 * Internal dependencies
 */

import supportedMatchers from './supported-matchers';

var createToBeCalledMatcher = function createToBeCalledMatcher(matcherName, methodName) {
  return function (received) {
    var spy = received[methodName];
    var calls = spy.mock.calls;
    var pass = calls.length > 0;
    var message = pass ? function () {
      return matcherHint(".not".concat(matcherName), spy.getMockName()) + '\n\n' + 'Expected mock function not to be called but it was called with:\n' + calls.map(printReceived);
    } : function () {
      return matcherHint(matcherName, spy.getMockName()) + '\n\n' + 'Expected mock function to be called.';
    };
    spy.assertionsNumber += 1;
    return {
      message: message,
      pass: pass
    };
  };
};

var createToBeCalledWithMatcher = function createToBeCalledWithMatcher(matcherName, methodName) {
  return function (received) {
    for (var _len = arguments.length, expected = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      expected[_key - 1] = arguments[_key];
    }

    var spy = received[methodName];
    var calls = spy.mock.calls;
    var pass = some(calls, function (objects) {
      return isEqual(objects, expected);
    });
    var message = pass ? function () {
      return matcherHint(".not".concat(matcherName), spy.getMockName()) + '\n\n' + 'Expected mock function not to be called with:\n' + printExpected(expected);
    } : function () {
      return matcherHint(matcherName, spy.getMockName()) + '\n\n' + 'Expected mock function to be called with:\n' + printExpected(expected) + '\n' + 'but it was called with:\n' + calls.map(printReceived);
    };
    spy.assertionsNumber += 1;
    return {
      message: message,
      pass: pass
    };
  };
};

expect.extend(reduce(supportedMatchers, function (result, matcherName, methodName) {
  var _objectSpread2;

  var matcherNameWith = "".concat(matcherName, "With");
  return _objectSpread({}, result, (_objectSpread2 = {}, _defineProperty(_objectSpread2, matcherName, createToBeCalledMatcher(".".concat(matcherName), methodName)), _defineProperty(_objectSpread2, matcherNameWith, createToBeCalledWithMatcher(".".concat(matcherNameWith), methodName)), _objectSpread2));
}, {}));
//# sourceMappingURL=matchers.js.map