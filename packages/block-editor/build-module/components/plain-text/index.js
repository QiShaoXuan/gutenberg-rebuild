import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import TextareaAutosize from 'react-autosize-textarea';
import classnames from 'classnames';

function PlainText(_ref) {
  var _onChange = _ref.onChange,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["onChange", "className"]);

  return createElement(TextareaAutosize, _extends({
    className: classnames('editor-plain-text block-editor-plain-text', className),
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    }
  }, props));
}

export default PlainText;
//# sourceMappingURL=index.js.map