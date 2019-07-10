"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _i18n = require("@wordpress/i18n");

var _nonce = _interopRequireDefault(require("./middlewares/nonce"));

var _rootUrl = _interopRequireDefault(require("./middlewares/root-url"));

var _preloading = _interopRequireDefault(require("./middlewares/preloading"));

var _fetchAllMiddleware = _interopRequireDefault(require("./middlewares/fetch-all-middleware"));

var _namespaceEndpoint = _interopRequireDefault(require("./middlewares/namespace-endpoint"));

var _httpV = _interopRequireDefault(require("./middlewares/http-v1"));

var _userLocale = _interopRequireDefault(require("./middlewares/user-locale"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Default set of header values which should be sent with every request unless
 * explicitly provided through apiFetch options.
 *
 * @type {Object}
 */
var DEFAULT_HEADERS = {
  // The backend uses the Accept header as a condition for considering an
  // incoming request as a REST request.
  //
  // See: https://core.trac.wordpress.org/ticket/44534
  Accept: 'application/json, */*;q=0.1'
};
/**
 * Default set of fetch option values which should be sent with every request
 * unless explicitly provided through apiFetch options.
 *
 * @type {Object}
 */

var DEFAULT_OPTIONS = {
  credentials: 'include'
};
var middlewares = [_userLocale.default, _namespaceEndpoint.default, _httpV.default, _fetchAllMiddleware.default];

function registerMiddleware(middleware) {
  middlewares.unshift(middleware);
}

var defaultFetchHandler = function defaultFetchHandler(nextOptions) {
  var url = nextOptions.url,
      path = nextOptions.path,
      data = nextOptions.data,
      _nextOptions$parse = nextOptions.parse,
      parse = _nextOptions$parse === void 0 ? true : _nextOptions$parse,
      remainingOptions = (0, _objectWithoutProperties2.default)(nextOptions, ["url", "path", "data", "parse"]);
  var body = nextOptions.body,
      headers = nextOptions.headers; // Merge explicitly-provided headers with default values.

  headers = (0, _objectSpread2.default)({}, DEFAULT_HEADERS, headers); // The `data` property is a shorthand for sending a JSON body.

  if (data) {
    body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }

  var responsePromise = window.fetch(url || path, (0, _objectSpread2.default)({}, DEFAULT_OPTIONS, remainingOptions, {
    body: body,
    headers: headers
  }));

  var checkStatus = function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw response;
  };

  var parseResponse = function parseResponse(response) {
    if (parse) {
      if (response.status === 204) {
        return null;
      }

      return response.json ? response.json() : Promise.reject(response);
    }

    return response;
  };

  return responsePromise.then(checkStatus).then(parseResponse).catch(function (response) {
    if (!parse) {
      throw response;
    }

    var invalidJsonError = {
      code: 'invalid_json',
      message: (0, _i18n.__)('The response is not a valid JSON response.')
    };

    if (!response || !response.json) {
      throw invalidJsonError;
    }

    return response.json().catch(function () {
      throw invalidJsonError;
    }).then(function (error) {
      var unknownError = {
        code: 'unknown_error',
        message: (0, _i18n.__)('An unknown error occurred.')
      };
      throw error || unknownError;
    });
  });
};

var fetchHandler = defaultFetchHandler;
/**
 * Defines a custom fetch handler for making the requests that will override
 * the default one using window.fetch
 *
 * @param {Function} newFetchHandler The new fetch handler
 */

function setFetchHandler(newFetchHandler) {
  fetchHandler = newFetchHandler;
}

function apiFetch(options) {
  var steps = [].concat(middlewares, [fetchHandler]);

  var createRunStep = function createRunStep(index) {
    return function (workingOptions) {
      var step = steps[index];

      if (index === steps.length - 1) {
        return step(workingOptions);
      }

      var next = createRunStep(index + 1);
      return step(workingOptions, next);
    };
  };

  return createRunStep(0)(options);
}

apiFetch.use = registerMiddleware;
apiFetch.setFetchHandler = setFetchHandler;
apiFetch.createNonceMiddleware = _nonce.default;
apiFetch.createPreloadingMiddleware = _preloading.default;
apiFetch.createRootURLMiddleware = _rootUrl.default;
apiFetch.fetchAllMiddleware = _fetchAllMiddleware.default;
var _default = apiFetch;
exports.default = _default;
//# sourceMappingURL=index.js.map