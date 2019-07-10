import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { clone } from 'lodash';
/**
 * WordPress dependencies
 */

import { applyFilters, hasFilter } from '@wordpress/hooks';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { Autocomplete as OriginalAutocomplete } from '@wordpress/components';
/**
 * Internal dependencies
 */

import { withBlockEditContext } from '../block-edit/context';
/*
 * Use one array instance for fallback rather than inline array literals
 * because the latter may cause rerender due to failed prop equality checks.
 */

var completersFallback = [];
/**
 * Wrap the default Autocomplete component with one that
 * supports a filter hook for customizing its list of autocompleters.
 *
 * Since there may be many Autocomplete instances at one time, this component
 * applies the filter on demand, when the component is first focused after
 * receiving a new list of completers.
 *
 * This function is exported for unit test.
 *
 * @param  {Function} Autocomplete Original component.
 * @return {Function}              Wrapped component
 */

export function withFilteredAutocompleters(Autocomplete) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(FilteredAutocomplete, _Component);

      function FilteredAutocomplete() {
        var _this;

        _classCallCheck(this, FilteredAutocomplete);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(FilteredAutocomplete).call(this));
        _this.state = {
          completers: completersFallback
        };
        _this.saveParentRef = _this.saveParentRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(FilteredAutocomplete, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          var hasFocus = this.parentNode.contains(document.activeElement);
          /*
           * It's possible for props to be updated when the component has focus,
           * so here, we ensure new completers are immediately applied while we
           * have the focus.
           *
           * NOTE: This may trigger another render but only when the component has focus.
           */

          if (hasFocus && this.hasStaleCompleters()) {
            this.updateCompletersState();
          }
        }
      }, {
        key: "onFocus",
        value: function onFocus() {
          if (this.hasStaleCompleters()) {
            this.updateCompletersState();
          }
        }
      }, {
        key: "hasStaleCompleters",
        value: function hasStaleCompleters() {
          return !('lastFilteredCompletersProp' in this.state) || this.state.lastFilteredCompletersProp !== this.props.completers;
        }
      }, {
        key: "updateCompletersState",
        value: function updateCompletersState() {
          var _this$props = this.props,
              blockName = _this$props.blockName,
              completers = _this$props.completers;
          var nextCompleters = completers;
          var lastFilteredCompletersProp = nextCompleters;

          if (hasFilter('editor.Autocomplete.completers')) {
            nextCompleters = applyFilters('editor.Autocomplete.completers', // Provide copies so filters may directly modify them.
            nextCompleters && nextCompleters.map(clone), blockName);
          }

          this.setState({
            lastFilteredCompletersProp: lastFilteredCompletersProp,
            completers: nextCompleters || completersFallback
          });
        }
      }, {
        key: "saveParentRef",
        value: function saveParentRef(parentNode) {
          this.parentNode = parentNode;
        }
      }, {
        key: "render",
        value: function render() {
          var completers = this.state.completers;

          var autocompleteProps = _objectSpread({}, this.props, {
            completers: completers
          });

          return createElement("div", {
            onFocus: this.onFocus,
            ref: this.saveParentRef
          }, createElement(Autocomplete, _extends({
            onFocus: this.onFocus
          }, autocompleteProps)));
        }
      }]);

      return FilteredAutocomplete;
    }(Component)
  );
}
export default compose([withBlockEditContext(function (_ref) {
  var name = _ref.name;
  return {
    blockName: name
  };
}), withFilteredAutocompleters])(OriginalAutocomplete);
//# sourceMappingURL=index.js.map