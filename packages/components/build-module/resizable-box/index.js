import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import ReResizableBox from 're-resizable';

function ResizableBox(_ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);

  // Removes the inline styles in the drag handles.
  var handleStylesOverrides = {
    width: null,
    height: null,
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  var handleClassName = 'components-resizable-box__handle';
  var sideHandleClassName = 'components-resizable-box__side-handle';
  var cornerHandleClassName = 'components-resizable-box__corner-handle';
  return createElement(ReResizableBox, _extends({
    className: classnames('components-resizable-box__container', className),
    handleClasses: {
      top: classnames(handleClassName, sideHandleClassName, 'components-resizable-box__handle-top'),
      right: classnames(handleClassName, sideHandleClassName, 'components-resizable-box__handle-right'),
      bottom: classnames(handleClassName, sideHandleClassName, 'components-resizable-box__handle-bottom'),
      left: classnames(handleClassName, sideHandleClassName, 'components-resizable-box__handle-left'),
      topLeft: classnames(handleClassName, cornerHandleClassName, 'components-resizable-box__handle-top', 'components-resizable-box__handle-left'),
      topRight: classnames(handleClassName, cornerHandleClassName, 'components-resizable-box__handle-top', 'components-resizable-box__handle-right'),
      bottomRight: classnames(handleClassName, cornerHandleClassName, 'components-resizable-box__handle-bottom', 'components-resizable-box__handle-right'),
      bottomLeft: classnames(handleClassName, cornerHandleClassName, 'components-resizable-box__handle-bottom', 'components-resizable-box__handle-left')
    },
    handleStyles: {
      top: handleStylesOverrides,
      right: handleStylesOverrides,
      bottom: handleStylesOverrides,
      left: handleStylesOverrides,
      topLeft: handleStylesOverrides,
      topRight: handleStylesOverrides,
      bottomRight: handleStylesOverrides,
      bottomLeft: handleStylesOverrides
    }
  }, props));
}

export default ResizableBox;
//# sourceMappingURL=index.js.map