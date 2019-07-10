import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import AxePuppeteer from 'axe-puppeteer';
/**
 * Formats the list of violations object returned by Axe analysis.
 *
 * @param {Object} violations The object with the errors found by Axe.
 *
 * @return {string} The user friendly message to display when the matcher fails.
 */

function formatViolations(violations) {
  return violations.map(function (_ref) {
    var help = _ref.help,
        id = _ref.id,
        nodes = _ref.nodes;
    var output = "Rule: ".concat(id, " (").concat(help, ")\n") + 'Affected Nodes:\n';
    nodes.forEach(function (node) {
      if (node.any.length) {
        output += "  ".concat(node.target, "\n");
        output += '    Fix ANY of the following:\n';
        node.any.forEach(function (item) {
          output += "    - ".concat(item.message, "\n");
        });
      }

      if (node.all.length) {
        output += "  ".concat(node.target, "\n");
        output += '    Fix ALL of the following:\n';
        node.all.forEach(function (item) {
          output += "      - ".concat(item.message, ".\n");
        });
      }

      if (node.none.length) {
        output += "  ".concat(node.target, "\n");
        output += '    Fix ALL of the following:\n';
        node.none.forEach(function (item) {
          output += "      - ".concat(item.message, ".\n");
        });
      }
    });
    return output;
  }).join('\n');
}
/**
 * Defines async matcher to check whether a given Puppeteer's page instance passes Axe accessibility tests.
 *
 * @see https://www.deque.com/axe/
 * It is possible to pass optional Axe API options to perform customized check.
 *
 * @see https://github.com/dequelabs/axe-puppeteer
 *
 * @param {Page}    page             Puppeteer's page instance.
 * @param {?Object} params           Optional Axe API options.
 * @param {?string} params.include   CSS selector to add to the list of elements
 *                                   to include in analysis.
 * @param {?string} params.exclude   CSS selector to add to the list of elements
 *                                   to exclude from analysis.
 *
 * @return {Object} A matcher object with two keys `pass` and `message`.
 */


function toPassAxeTests(_x) {
  return _toPassAxeTests.apply(this, arguments);
}

function _toPassAxeTests() {
  _toPassAxeTests = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(page) {
    var _this = this;

    var _ref2,
        include,
        exclude,
        axe,
        _ref3,
        violations,
        pass,
        message,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, include = _ref2.include, exclude = _ref2.exclude;
            axe = new AxePuppeteer(page);

            if (include) {
              axe.include(include);
            }

            if (exclude) {
              axe.exclude(exclude);
            }

            _context.next = 6;
            return axe.analyze();

          case 6:
            _ref3 = _context.sent;
            violations = _ref3.violations;
            pass = violations.length === 0;
            message = pass ? function () {
              return _this.utils.matcherHint('.not.toPassAxeTests') + '\n\n' + 'Expected page to contain accessibility check violations.\n' + 'No violations found.';
            } : function () {
              return _this.utils.matcherHint('.toPassAxeTests') + '\n\n' + 'Expected page to pass Axe accessibility tests.\n' + 'Violations found:\n' + _this.utils.RECEIVED_COLOR(formatViolations(violations));
            };
            return _context.abrupt("return", {
              message: message,
              pass: pass
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _toPassAxeTests.apply(this, arguments);
}

expect.extend({
  toPassAxeTests: toPassAxeTests
});
//# sourceMappingURL=index.js.map