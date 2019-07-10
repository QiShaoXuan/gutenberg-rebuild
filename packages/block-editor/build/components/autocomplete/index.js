"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withFilteredAutocompleters = withFilteredAutocompleters;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _context = require("../block-edit/context");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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

function withFilteredAutocompleters(Autocomplete) {
  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(FilteredAutocomplete, _Component);

      function FilteredAutocomplete() {
        var _this;

        (0, _classCallCheck2.default)(this, FilteredAutocomplete);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FilteredAutocomplete).call(this));
        _this.state = {
          completers: completersFallback
        };
        _this.saveParentRef = _this.saveParentRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        return _this;
      }

      (0, _createClass2.default)(FilteredAutocomplete, [{
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

          if ((0, _hooks.hasFilter)('editor.Autocomplete.completers')) {
            nextCompleters = (0, _hooks.applyFilters)('editor.Autocomplete.completers', // Provide copies so filters may directly modify them.
            nextCompleters && nextCompleters.map(_lodash.clone), blockName);
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
          var autocompleteProps = (0, _objectSpread2.default)({}, this.props, {
            completers: completers
          });
          return (0, _element.createElement)("div", {
            onFocus: this.onFocus,
            ref: this.saveParentRef
          }, (0, _element.createElement)(Autocomplete, (0, _extends2.default)({
            onFocus: this.onFocus
          }, autocompleteProps)));
        }
      }]);
      return FilteredAutocomplete;
    }(_element.Component)
  );
}

var _default = (0, _compose.compose)([(0, _context.withBlockEditContext)(function (_ref) {
  var name = _ref.name;
  return {
    blockName: name
  };
}), withFilteredAutocompleters])(_components.Autocomplete);

exports.default = _default;
//# sourceMappingURL=index.js.map