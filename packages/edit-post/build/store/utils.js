"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onChangeListener = void 0;

/**
 * Given a selector returns a functions that returns the listener only
 * if the returned value from the selector changes.
 *
 * @param  {function} selector Selector.
 * @param  {function} listener Listener.
 * @return {function}          Listener creator.
 */
var onChangeListener = function onChangeListener(selector, listener) {
  var previousValue = selector();
  return function () {
    var selectedValue = selector();

    if (selectedValue !== previousValue) {
      previousValue = selectedValue;
      listener(selectedValue);
    }
  };
};

exports.onChangeListener = onChangeListener;
//# sourceMappingURL=utils.js.map