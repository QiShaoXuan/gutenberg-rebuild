import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { range } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Toolbar } from '@wordpress/components';

var HeadingToolbar =
/*#__PURE__*/
function (_Component) {
  _inherits(HeadingToolbar, _Component);

  function HeadingToolbar() {
    _classCallCheck(this, HeadingToolbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeadingToolbar).apply(this, arguments));
  }

  _createClass(HeadingToolbar, [{
    key: "createLevelControl",
    value: function createLevelControl(targetLevel, selectedLevel, onChange) {
      return {
        icon: 'heading',
        // translators: %s: heading level e.g: "1", "2", "3"
        title: sprintf(__('Heading %d'), targetLevel),
        isActive: targetLevel === selectedLevel,
        onClick: function onClick() {
          return onChange(targetLevel);
        },
        subscript: String(targetLevel)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          minLevel = _this$props.minLevel,
          maxLevel = _this$props.maxLevel,
          selectedLevel = _this$props.selectedLevel,
          onChange = _this$props.onChange;
      return createElement(Toolbar, {
        controls: range(minLevel, maxLevel).map(function (index) {
          return _this.createLevelControl(index, selectedLevel, onChange);
        })
      });
    }
  }]);

  return HeadingToolbar;
}(Component);

export default HeadingToolbar;
//# sourceMappingURL=heading-toolbar.js.map