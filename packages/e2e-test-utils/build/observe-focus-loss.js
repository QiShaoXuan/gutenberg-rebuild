"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observeFocusLoss = observeFocusLoss;

/**
 * Binds to the document on page load which throws an error if a `focusout`
 * event occurs without a related target (i.e. focus loss).
 */
function observeFocusLoss() {
  page.on('load', function () {
    page.evaluate(function () {
      document.body.addEventListener('focusout', function (event) {
        if (!event.relatedTarget) {
          throw new Error('Unexpected focus loss');
        }
      });
    });
  });
}
//# sourceMappingURL=observe-focus-loss.js.map