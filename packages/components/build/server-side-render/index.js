"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rendererPath = rendererPath;
exports.default = exports.ServerSideRender = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _url = require("@wordpress/url");

var _placeholder = _interopRequireDefault(require("../placeholder"));

var _spinner = _interopRequireDefault(require("../spinner"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function rendererPath(block) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var urlQueryArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (0, _url.addQueryArgs)("/wp/v2/block-renderer/".concat(block), (0, _objectSpread2.default)({
    context: 'edit'
  }, null !== attributes ? {
    attributes: attributes
  } : {}, urlQueryArgs));
}

var ServerSideRender =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ServerSideRender, _Component);

  function ServerSideRender(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ServerSideRender);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ServerSideRender).call(this, props));
    _this.state = {
      response: null
    };
    return _this;
  }

  (0, _createClass2.default)(ServerSideRender, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isStillMounted = true;
      this.fetch(this.props); // Only debounce once the initial fetch occurs to ensure that the first
      // renders show data as soon as possible.

      this.fetch = (0, _lodash.debounce)(this.fetch, 500);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isStillMounted = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!(0, _lodash.isEqual)(prevProps, this.props)) {
        this.fetch(this.props);
      }
    }
  }, {
    key: "fetch",
    value: function fetch(props) {
      var _this2 = this;

      if (!this.isStillMounted) {
        return;
      }

      if (null !== this.state.response) {
        this.setState({
          response: null
        });
      }

      var block = props.block,
          _props$attributes = props.attributes,
          attributes = _props$attributes === void 0 ? null : _props$attributes,
          _props$urlQueryArgs = props.urlQueryArgs,
          urlQueryArgs = _props$urlQueryArgs === void 0 ? {} : _props$urlQueryArgs;
      var path = rendererPath(block, attributes, urlQueryArgs); // Store the latest fetch request so that when we process it, we can
      // check if it is the current request, to avoid race conditions on slow networks.

      var fetchRequest = this.currentFetchRequest = (0, _apiFetch.default)({
        path: path
      }).then(function (response) {
        if (_this2.isStillMounted && fetchRequest === _this2.currentFetchRequest && response && response.rendered) {
          _this2.setState({
            response: response.rendered
          });
        }
      }).catch(function (error) {
        if (_this2.isStillMounted && fetchRequest === _this2.currentFetchRequest) {
          _this2.setState({
            response: {
              error: true,
              errorMsg: error.message
            }
          });
        }
      });
      return fetchRequest;
    }
  }, {
    key: "render",
    value: function render() {
      var response = this.state.response;
      var className = this.props.className;

      if (!response) {
        return (0, _element.createElement)(_placeholder.default, {
          className: className
        }, (0, _element.createElement)(_spinner.default, null));
      } else if (response.error) {
        // translators: %s: error message describing the problem
        var errorMessage = (0, _i18n.sprintf)((0, _i18n.__)('Error loading block: %s'), response.errorMsg);
        return (0, _element.createElement)(_placeholder.default, {
          className: className
        }, errorMessage);
      } else if (!response.length) {
        return (0, _element.createElement)(_placeholder.default, {
          className: className
        }, (0, _i18n.__)('No results found.'));
      }

      return (0, _element.createElement)(_element.RawHTML, {
        key: "html",
        className: className
      }, response);
    }
  }]);
  return ServerSideRender;
}(_element.Component);

exports.ServerSideRender = ServerSideRender;
var _default = ServerSideRender;
exports.default = _default;
//# sourceMappingURL=index.js.map