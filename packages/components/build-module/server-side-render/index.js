import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEqual, debounce } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, RawHTML } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */

import Placeholder from '../placeholder';
import Spinner from '../spinner';
export function rendererPath(block) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var urlQueryArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return addQueryArgs("/wp/v2/block-renderer/".concat(block), _objectSpread({
    context: 'edit'
  }, null !== attributes ? {
    attributes: attributes
  } : {}, urlQueryArgs));
}
export var ServerSideRender =
/*#__PURE__*/
function (_Component) {
  _inherits(ServerSideRender, _Component);

  function ServerSideRender(props) {
    var _this;

    _classCallCheck(this, ServerSideRender);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ServerSideRender).call(this, props));
    _this.state = {
      response: null
    };
    return _this;
  }

  _createClass(ServerSideRender, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isStillMounted = true;
      this.fetch(this.props); // Only debounce once the initial fetch occurs to ensure that the first
      // renders show data as soon as possible.

      this.fetch = debounce(this.fetch, 500);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isStillMounted = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!isEqual(prevProps, this.props)) {
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

      var fetchRequest = this.currentFetchRequest = apiFetch({
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
        return createElement(Placeholder, {
          className: className
        }, createElement(Spinner, null));
      } else if (response.error) {
        // translators: %s: error message describing the problem
        var errorMessage = sprintf(__('Error loading block: %s'), response.errorMsg);
        return createElement(Placeholder, {
          className: className
        }, errorMessage);
      } else if (!response.length) {
        return createElement(Placeholder, {
          className: className
        }, __('No results found.'));
      }

      return createElement(RawHTML, {
        key: "html",
        className: className
      }, response);
    }
  }]);

  return ServerSideRender;
}(Component);
export default ServerSideRender;
//# sourceMappingURL=index.js.map