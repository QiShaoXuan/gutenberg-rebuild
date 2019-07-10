"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
// Since URLInput is rendered in the context of other inputs, but should be
// considered a separate modal node, prevent keyboard events from propagating
// as being considered from the input.
var stopEventPropagation = function stopEventPropagation(event) {
  return event.stopPropagation();
};

var URLInput =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(URLInput, _Component);

  function URLInput(_ref) {
    var _this;

    var autocompleteRef = _ref.autocompleteRef;
    (0, _classCallCheck2.default)(this, URLInput);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(URLInput).apply(this, arguments));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.autocompleteRef = autocompleteRef || (0, _element.createRef)();
    _this.inputRef = (0, _element.createRef)();
    _this.updateSuggestions = (0, _lodash.throttle)(_this.updateSuggestions.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), 200);
    _this.suggestionNodes = [];
    _this.state = {
      suggestions: [],
      showSuggestions: false,
      selectedSuggestion: null
    };
    return _this;
  }

  (0, _createClass2.default)(URLInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var _this$state = this.state,
          showSuggestions = _this$state.showSuggestions,
          selectedSuggestion = _this$state.selectedSuggestion; // only have to worry about scrolling selected suggestion into view
      // when already expanded

      if (showSuggestions && selectedSuggestion !== null && !this.scrollingIntoView) {
        this.scrollingIntoView = true;
        (0, _domScrollIntoView.default)(this.suggestionNodes[selectedSuggestion], this.autocompleteRef.current, {
          onlyScrollIfNeeded: true
        });
        this.props.setTimeout(function () {
          _this2.scrollingIntoView = false;
        }, 100);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      delete this.suggestionsRequest;
    }
  }, {
    key: "bindSuggestionNode",
    value: function bindSuggestionNode(index) {
      var _this3 = this;

      return function (ref) {
        _this3.suggestionNodes[index] = ref;
      };
    }
  }, {
    key: "updateSuggestions",
    value: function updateSuggestions(value) {
      var _this4 = this;

      var fetchLinkSuggestions = this.props.fetchLinkSuggestions;

      if (!fetchLinkSuggestions) {
        return;
      } // Show the suggestions after typing at least 2 characters
      // and also for URLs


      if (value.length < 2 || /^https?:/.test(value)) {
        this.setState({
          showSuggestions: false,
          selectedSuggestion: null,
          loading: false
        });
        return;
      }

      this.setState({
        showSuggestions: true,
        selectedSuggestion: null,
        loading: true
      });
      var request = fetchLinkSuggestions(value);
      request.then(function (suggestions) {
        // A fetch Promise doesn't have an abort option. It's mimicked by
        // comparing the request reference in on the instance, which is
        // reset or deleted on subsequent requests or unmounting.
        if (_this4.suggestionsRequest !== request) {
          return;
        }

        _this4.setState({
          suggestions: suggestions,
          loading: false
        });

        if (!!suggestions.length) {
          _this4.props.debouncedSpeak((0, _i18n.sprintf)((0, _i18n._n)('%d result found, use up and down arrow keys to navigate.', '%d results found, use up and down arrow keys to navigate.', suggestions.length), suggestions.length), 'assertive');
        } else {
          _this4.props.debouncedSpeak((0, _i18n.__)('No results.'), 'assertive');
        }
      }).catch(function () {
        if (_this4.suggestionsRequest === request) {
          _this4.setState({
            loading: false
          });
        }
      });
      this.suggestionsRequest = request;
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var inputValue = event.target.value;
      this.props.onChange(inputValue);
      this.updateSuggestions(inputValue);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var _this$state2 = this.state,
          showSuggestions = _this$state2.showSuggestions,
          selectedSuggestion = _this$state2.selectedSuggestion,
          suggestions = _this$state2.suggestions,
          loading = _this$state2.loading; // If the suggestions are not shown or loading, we shouldn't handle the arrow keys
      // We shouldn't preventDefault to allow block arrow keys navigation

      if (!showSuggestions || !suggestions.length || loading) {
        // In the Windows version of Firefox the up and down arrows don't move the caret
        // within an input field like they do for Mac Firefox/Chrome/Safari. This causes
        // a form of focus trapping that is disruptive to the user experience. This disruption
        // only happens if the caret is not in the first or last position in the text input.
        // See: https://github.com/WordPress/gutenberg/issues/5693#issuecomment-436684747
        switch (event.keyCode) {
          // When UP is pressed, if the caret is at the start of the text, move it to the 0
          // position.
          case _keycodes.UP:
            {
              if (0 !== event.target.selectionStart) {
                event.stopPropagation();
                event.preventDefault(); // Set the input caret to position 0

                event.target.setSelectionRange(0, 0);
              }

              break;
            }
          // When DOWN is pressed, if the caret is not at the end of the text, move it to the
          // last position.

          case _keycodes.DOWN:
            {
              if (this.props.value.length !== event.target.selectionStart) {
                event.stopPropagation();
                event.preventDefault(); // Set the input caret to the last position

                event.target.setSelectionRange(this.props.value.length, this.props.value.length);
              }

              break;
            }
        }

        return;
      }

      var suggestion = this.state.suggestions[this.state.selectedSuggestion];

      switch (event.keyCode) {
        case _keycodes.UP:
          {
            event.stopPropagation();
            event.preventDefault();
            var previousIndex = !selectedSuggestion ? suggestions.length - 1 : selectedSuggestion - 1;
            this.setState({
              selectedSuggestion: previousIndex
            });
            break;
          }

        case _keycodes.DOWN:
          {
            event.stopPropagation();
            event.preventDefault();
            var nextIndex = selectedSuggestion === null || selectedSuggestion === suggestions.length - 1 ? 0 : selectedSuggestion + 1;
            this.setState({
              selectedSuggestion: nextIndex
            });
            break;
          }

        case _keycodes.TAB:
          {
            if (this.state.selectedSuggestion !== null) {
              this.selectLink(suggestion); // Announce a link has been selected when tabbing away from the input field.

              this.props.speak((0, _i18n.__)('Link selected.'));
            }

            break;
          }

        case _keycodes.ENTER:
          {
            if (this.state.selectedSuggestion !== null) {
              event.stopPropagation();
              this.selectLink(suggestion);
            }

            break;
          }
      }
    }
  }, {
    key: "selectLink",
    value: function selectLink(suggestion) {
      this.props.onChange(suggestion.url, suggestion);
      this.setState({
        selectedSuggestion: null,
        showSuggestions: false
      });
    }
  }, {
    key: "handleOnClick",
    value: function handleOnClick(suggestion) {
      this.selectLink(suggestion); // Move focus to the input field when a link suggestion is clicked.

      this.inputRef.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props = this.props,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? '' : _this$props$value,
          _this$props$autoFocus = _this$props.autoFocus,
          autoFocus = _this$props$autoFocus === void 0 ? true : _this$props$autoFocus,
          instanceId = _this$props.instanceId,
          className = _this$props.className;
      var _this$state3 = this.state,
          showSuggestions = _this$state3.showSuggestions,
          suggestions = _this$state3.suggestions,
          selectedSuggestion = _this$state3.selectedSuggestion,
          loading = _this$state3.loading;
      /* eslint-disable jsx-a11y/no-autofocus */

      return (0, _element.createElement)("div", {
        className: (0, _classnames.default)('editor-url-input block-editor-url-input', className)
      }, (0, _element.createElement)("input", {
        autoFocus: autoFocus,
        type: "text",
        "aria-label": (0, _i18n.__)('URL'),
        required: true,
        value: value,
        onChange: this.onChange,
        onInput: stopEventPropagation,
        placeholder: (0, _i18n.__)('Paste URL or type to search'),
        onKeyDown: this.onKeyDown,
        role: "combobox",
        "aria-expanded": showSuggestions,
        "aria-autocomplete": "list",
        "aria-owns": "block-editor-url-input-suggestions-".concat(instanceId),
        "aria-activedescendant": selectedSuggestion !== null ? "block-editor-url-input-suggestion-".concat(instanceId, "-").concat(selectedSuggestion) : undefined,
        ref: this.inputRef
      }), loading && (0, _element.createElement)(_components.Spinner, null), showSuggestions && !!suggestions.length && (0, _element.createElement)(_components.Popover, {
        position: "bottom",
        noArrow: true,
        focusOnMount: false
      }, (0, _element.createElement)("div", {
        className: "editor-url-input__suggestions block-editor-url-input__suggestions",
        id: "editor-url-input-suggestions-".concat(instanceId),
        ref: this.autocompleteRef,
        role: "listbox"
      }, suggestions.map(function (suggestion, index) {
        return (0, _element.createElement)("button", {
          key: suggestion.id,
          role: "option",
          tabIndex: "-1",
          id: "block-editor-url-input-suggestion-".concat(instanceId, "-").concat(index),
          ref: _this5.bindSuggestionNode(index),
          className: (0, _classnames.default)('editor-url-input__suggestion block-editor-url-input__suggestion', {
            'is-selected': index === selectedSuggestion
          }),
          onClick: function onClick() {
            return _this5.handleOnClick(suggestion);
          },
          "aria-selected": index === selectedSuggestion
        }, suggestion.title);
      }))));
      /* eslint-enable jsx-a11y/no-autofocus */
    }
  }]);
  return URLInput;
}(_element.Component);

var _default = (0, _compose.compose)(_compose.withSafeTimeout, _components.withSpokenMessages, _compose.withInstanceId, (0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    fetchLinkSuggestions: getSettings().__experimentalFetchLinkSuggestions
  };
}))(URLInput);

exports.default = _default;
//# sourceMappingURL=index.js.map