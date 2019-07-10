import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';

function BaseControl(_ref) {
  var id = _ref.id,
      label = _ref.label,
      help = _ref.help,
      className = _ref.className,
      children = _ref.children;
  return createElement("div", {
    className: classnames('components-base-control', className)
  }, createElement("div", {
    className: "components-base-control__field"
  }, label && id && createElement("label", {
    className: "components-base-control__label",
    htmlFor: id
  }, label), label && !id && createElement(BaseControl.VisualLabel, null, label), children), !!help && createElement("p", {
    id: id + '__help',
    className: "components-base-control__help"
  }, help));
}

BaseControl.VisualLabel = function (_ref2) {
  var className = _ref2.className,
      children = _ref2.children;
  className = classnames('components-base-control__label', className);
  return createElement("span", {
    className: className
  }, children);
};

export default BaseControl;
//# sourceMappingURL=index.js.map