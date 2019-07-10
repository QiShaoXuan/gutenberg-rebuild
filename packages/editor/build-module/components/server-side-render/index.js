import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { ServerSideRender } from '@wordpress/components';
import { select } from '@wordpress/data';
export default function (_ref) {
  var _ref$urlQueryArgs = _ref.urlQueryArgs,
      urlQueryArgs = _ref$urlQueryArgs === void 0 ? {} : _ref$urlQueryArgs,
      props = _objectWithoutProperties(_ref, ["urlQueryArgs"]);

  var _select = select('core/editor'),
      getCurrentPostId = _select.getCurrentPostId;

  urlQueryArgs = _objectSpread({
    post_id: getCurrentPostId()
  }, urlQueryArgs);
  return createElement(ServerSideRender, _extends({
    urlQueryArgs: urlQueryArgs
  }, props));
}
//# sourceMappingURL=index.js.map