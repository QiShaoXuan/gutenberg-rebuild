"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AdminNotices = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */

/**
 * Mapping of server-supported notice class names to an equivalent notices
 * module status.
 *
 * @type {Map}
 */
var NOTICE_CLASS_STATUSES = {
  'notice-success': 'success',
  updated: 'success',
  'notice-warning': 'warning',
  'notice-error': 'error',
  error: 'error',
  'notice-info': 'info'
};
/**
 * Returns an array of admin notice Elements.
 *
 * @return {Element[]} Admin notice elements.
 */

function getAdminNotices() {
  // The order is reversed to match expectations of rendered order, since a
  // NoticesList is itself rendered in reverse order (newest to oldest).
  return (0, _toConsumableArray2.default)(document.querySelectorAll('#wpbody-content > .notice')).reverse();
}
/**
 * Given an admin notice Element, returns the relevant notice content HTML.
 *
 * @param {Element} element Admin notice element.
 *
 * @return {Element} Upgraded notice HTML.
 */


function getNoticeHTML(element) {
  var fragments = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = element.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      if (child.nodeType !== window.Node.ELEMENT_NODE) {
        var value = child.nodeValue.trim();

        if (value) {
          fragments.push(child.nodeValue);
        }
      } else if (!child.classList.contains('notice-dismiss')) {
        fragments.push(child.outerHTML);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return fragments.join('');
}
/**
 * Given an admin notice Element, returns the upgraded status type, or
 * undefined if one cannot be determined (i.e. one is not assigned).
 *
 * @param {Element} element Admin notice element.
 *
 * @return {?string} Upgraded status type.
 */


function getNoticeStatus(element) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = element.classList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var className = _step2.value;

      if (NOTICE_CLASS_STATUSES.hasOwnProperty(className)) {
        return NOTICE_CLASS_STATUSES[className];
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

var AdminNotices =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AdminNotices, _Component);

  function AdminNotices() {
    (0, _classCallCheck2.default)(this, AdminNotices);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AdminNotices).apply(this, arguments));
  }

  (0, _createClass2.default)(AdminNotices, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.convertNotices();
    }
  }, {
    key: "convertNotices",
    value: function convertNotices() {
      var createNotice = this.props.createNotice;
      getAdminNotices().forEach(function (element) {
        // Convert and create.
        var status = getNoticeStatus(element);
        var content = getNoticeHTML(element);
        var isDismissible = element.classList.contains('is-dismissible');
        createNotice(status, content, {
          speak: false,
          __unstableHTML: true,
          isDismissible: isDismissible
        }); // Remove (now-redundant) admin notice element.

        element.parentNode.removeChild(element);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return AdminNotices;
}(_element.Component);

exports.AdminNotices = AdminNotices;

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/notices'),
      createNotice = _dispatch.createNotice;

  return {
    createNotice: createNotice
  };
})(AdminNotices);

exports.default = _default;
//# sourceMappingURL=index.js.map