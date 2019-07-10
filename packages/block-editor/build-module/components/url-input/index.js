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
import { throttle } from 'lodash';
import classnames from 'classnames';
import scrollIntoView from 'dom-scroll-into-view';
/**
 * WordPress dependencies
 */

import { __, sprintf, _n } from '@wordpress/i18n';
import { Component, createRef } from '@wordpress/element';
import { UP, DOWN, ENTER, TAB } from '@wordpress/keycodes';
import { Spinner, withSpokenMessages, Popover } from '@wordpress/components';
import { withInstanceId, withSafeTimeout, compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data'; // Since URLInput is rendered in the context of other inputs, but should be
// considered a separate modal node, prevent keyboard events from propagating
// as being considered from the input.

var stopEventPropagation = function stopEventPropagation(event) {
  return event.stopPropagation();
};

var URLInput =
/*#__PURE__*/
function (_Component) {
  _inherits(URLInput, _Component);

  function URLInput(_ref) {
    var _this;

    var autocompleteRef = _ref.autocompleteRef;

    _classCallCheck(this, URLInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(URLInput).apply(this, arguments));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.autocompleteRef = autocompleteRef || createRef();
    _this.inputRef = createRef();
    _this.updateSuggestions = throttle(_this.updateSuggestions.bind(_assertThisInitialized(_assertThisInitialized(_this))), 200);
    _this.suggestionNodes = [];
    _this.state = {
      suggestions: [],
      showSuggestions: false,
      selectedSuggestion: null
    };
    return _this;
  }

  _createClass(URLInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var _this$state = this.state,
          showSuggestions = _this$state.showSuggestions,
          selectedSuggestion = _this$state.selectedSuggestion; // only have to worry about scrolling selected suggestion into view
      // when already expanded

      if (showSuggestions && selectedSuggestion !== null && !this.scrollingIntoView) {
        this.scrollingIntoView = true;
        scrollIntoView(this.suggestionNodes[selectedSuggestion], this.autocompleteRef.current, {
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
          _this4.props.debouncedSpeak(sprintf(_n('%d result found, use up and down arrow keys to navigate.', '%d results found, use up and down arrow keys to navigate.', suggestions.length), suggestions.length), 'assertive');
        } else {
          _this4.props.debouncedSpeak(__('No results.'), 'assertive');
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
          case UP:
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

          case DOWN:
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
        case UP:
          {
            event.stopPropagation();
            event.preventDefault();
            var previousIndex = !selectedSuggestion ? suggestions.length - 1 : selectedSuggestion - 1;
            this.setState({
              selectedSuggestion: previousIndex
            });
            break;
          }

        case DOWN:
          {
            event.stopPropagation();
            event.preventDefault();
            var nextIndex = selectedSuggestion === null || selectedSuggestion === suggestions.length - 1 ? 0 : selectedSuggestion + 1;
            this.setState({
              selectedSuggestion: nextIndex
            });
            break;
          }

        case TAB:
          {
            if (this.state.selectedSuggestion !== null) {
              this.selectLink(suggestion); // Announce a link has been selected when tabbing away from the input field.

              this.props.speak(__('Link selected.'));
            }

            break;
          }

        case ENTER:
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

      return createElement("div", {
        className: classnames('editor-url-input block-editor-url-input', className)
      }, createElement("input", {
        autoFocus: autoFocus,
        type: "text",
        "aria-label": __('URL'),
        required: true,
        value: value,
        onChange: this.onChange,
        onInput: stopEventPropagation,
        placeholder: __('Paste URL or type to search'),
        onKeyDown: this.onKeyDown,
        role: "combobox",
        "aria-expanded": showSuggestions,
        "aria-autocomplete": "list",
        "aria-owns": "block-editor-url-input-suggestions-".concat(instanceId),
        "aria-activedescendant": selectedSuggestion !== null ? "block-editor-url-input-suggestion-".concat(instanceId, "-").concat(selectedSuggestion) : undefined,
        ref: this.inputRef
      }), loading && createElement(Spinner, null), showSuggestions && !!suggestions.length && createElement(Popover, {
        position: "bottom",
        noArrow: true,
        focusOnMount: false
      }, createElement("div", {
        className: "editor-url-input__suggestions block-editor-url-input__suggestions",
        id: "editor-url-input-suggestions-".concat(instanceId),
        ref: this.autocompleteRef,
        role: "listbox"
      }, suggestions.map(function (suggestion, index) {
        return createElement("button", {
          key: suggestion.id,
          role: "option",
          tabIndex: "-1",
          id: "block-editor-url-input-suggestion-".concat(instanceId, "-").concat(index),
          ref: _this5.bindSuggestionNode(index),
          className: classnames('editor-url-input__suggestion block-editor-url-input__suggestion', {
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
}(Component);

export default compose(withSafeTimeout, withSpokenMessages, withInstanceId, withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    fetchLinkSuggestions: getSettings().__experimentalFetchLinkSuggestions
  };
}))(URLInput);
//# sourceMappingURL=index.js.map