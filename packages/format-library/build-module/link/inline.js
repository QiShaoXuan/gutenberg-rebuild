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
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component, createRef } from '@wordpress/element';
import { ExternalLink, IconButton, ToggleControl, withSpokenMessages, PositionedAtSelection } from '@wordpress/components';
import { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
import { prependHTTP, safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { create, insert, isCollapsed, applyFormat, getTextContent, slice } from '@wordpress/rich-text';
import { URLInput, URLPopover } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import { createLinkFormat, isValidHref } from './utils';

var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};

function isShowingInput(props, state) {
  return props.addingLink || state.editLink;
}

var LinkEditor = function LinkEditor(_ref) {
  var value = _ref.value,
      onChangeInputValue = _ref.onChangeInputValue,
      onKeyDown = _ref.onKeyDown,
      submitLink = _ref.submitLink,
      autocompleteRef = _ref.autocompleteRef;
  return (// Disable reason: KeyPress must be suppressed so the block doesn't hide the toolbar

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    createElement("form", {
      className: "editor-format-toolbar__link-container-content block-editor-format-toolbar__link-container-content",
      onKeyPress: stopKeyPropagation,
      onKeyDown: onKeyDown,
      onSubmit: submitLink
    }, createElement(URLInput, {
      value: value,
      onChange: onChangeInputValue,
      autocompleteRef: autocompleteRef
    }), createElement(IconButton, {
      icon: "editor-break",
      label: __('Apply'),
      type: "submit"
    }))
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */

  );
};

var LinkViewerUrl = function LinkViewerUrl(_ref2) {
  var url = _ref2.url;
  var prependedURL = prependHTTP(url);
  var linkClassName = classnames('editor-format-toolbar__link-container-value block-editor-format-toolbar__link-container-value', {
    'has-invalid-link': !isValidHref(prependedURL)
  });

  if (!url) {
    return createElement("span", {
      className: linkClassName
    });
  }

  return createElement(ExternalLink, {
    className: linkClassName,
    href: url
  }, filterURLForDisplay(safeDecodeURI(url)));
};

var LinkViewer = function LinkViewer(_ref3) {
  var url = _ref3.url,
      editLink = _ref3.editLink;
  return (// Disable reason: KeyPress must be suppressed so the block doesn't hide the toolbar

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    createElement("div", {
      className: "editor-format-toolbar__link-container-content block-editor-format-toolbar__link-container-content",
      onKeyPress: stopKeyPropagation
    }, createElement(LinkViewerUrl, {
      url: url
    }), createElement(IconButton, {
      icon: "edit",
      label: __('Edit'),
      onClick: editLink
    }))
    /* eslint-enable jsx-a11y/no-static-element-interactions */

  );
};

var InlineLinkUI =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineLinkUI, _Component);

  function InlineLinkUI() {
    var _this;

    _classCallCheck(this, InlineLinkUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InlineLinkUI).apply(this, arguments));
    _this.editLink = _this.editLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.submitLink = _this.submitLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeInputValue = _this.onChangeInputValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setLinkTarget = _this.setLinkTarget.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onClickOutside = _this.onClickOutside.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resetState = _this.resetState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.autocompleteRef = createRef();
    _this.state = {
      opensInNewWindow: false,
      inputValue: ''
    };
    return _this;
  }

  _createClass(InlineLinkUI, [{
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if ([LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER].indexOf(event.keyCode) > -1) {
        // Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
        event.stopPropagation();
      }
    }
  }, {
    key: "onChangeInputValue",
    value: function onChangeInputValue(inputValue) {
      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "setLinkTarget",
    value: function setLinkTarget(opensInNewWindow) {
      var _this$props = this.props,
          _this$props$activeAtt = _this$props.activeAttributes.url,
          url = _this$props$activeAtt === void 0 ? '' : _this$props$activeAtt,
          value = _this$props.value,
          onChange = _this$props.onChange;
      this.setState({
        opensInNewWindow: opensInNewWindow
      }); // Apply now if URL is not being edited.

      if (!isShowingInput(this.props, this.state)) {
        var selectedText = getTextContent(slice(value));
        onChange(applyFormat(value, createLinkFormat({
          url: url,
          opensInNewWindow: opensInNewWindow,
          text: selectedText
        })));
      }
    }
  }, {
    key: "editLink",
    value: function editLink(event) {
      this.setState({
        editLink: true
      });
      event.preventDefault();
    }
  }, {
    key: "submitLink",
    value: function submitLink(event) {
      var _this$props2 = this.props,
          isActive = _this$props2.isActive,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          speak = _this$props2.speak;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          opensInNewWindow = _this$state.opensInNewWindow;
      var url = prependHTTP(inputValue);
      var selectedText = getTextContent(slice(value));
      var format = createLinkFormat({
        url: url,
        opensInNewWindow: opensInNewWindow,
        text: selectedText
      });
      event.preventDefault();

      if (isCollapsed(value) && !isActive) {
        var toInsert = applyFormat(create({
          text: url
        }), format, 0, url.length);
        onChange(insert(value, toInsert));
      } else {
        onChange(applyFormat(value, format));
      }

      this.resetState();

      if (!isValidHref(url)) {
        speak(__('Warning: the link has been inserted but may have errors. Please test it.'), 'assertive');
      } else if (isActive) {
        speak(__('Link edited.'), 'assertive');
      } else {
        speak(__('Link inserted.'), 'assertive');
      }
    }
  }, {
    key: "onClickOutside",
    value: function onClickOutside(event) {
      // The autocomplete suggestions list renders in a separate popover (in a portal),
      // so onClickOutside fails to detect that a click on a suggestion occurred in the
      // LinkContainer. Detect clicks on autocomplete suggestions using a ref here, and
      // return to avoid the popover being closed.
      var autocompleteElement = this.autocompleteRef.current;

      if (autocompleteElement && autocompleteElement.contains(event.target)) {
        return;
      }

      this.resetState();
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.props.stopAddingLink();
      this.setState({
        editLink: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          isActive = _this$props3.isActive,
          url = _this$props3.activeAttributes.url,
          addingLink = _this$props3.addingLink,
          value = _this$props3.value;

      if (!isActive && !addingLink) {
        return null;
      }

      var _this$state2 = this.state,
          inputValue = _this$state2.inputValue,
          opensInNewWindow = _this$state2.opensInNewWindow;
      var showInput = isShowingInput(this.props, this.state);
      return createElement(PositionedAtSelection, {
        key: "".concat(value.start).concat(value.end)
        /* Used to force rerender on selection change */

      }, createElement(URLPopover, {
        onClickOutside: this.onClickOutside,
        onClose: this.resetState,
        focusOnMount: showInput ? 'firstElement' : false,
        renderSettings: function renderSettings() {
          return createElement(ToggleControl, {
            label: __('Open in New Tab'),
            checked: opensInNewWindow,
            onChange: _this2.setLinkTarget
          });
        }
      }, showInput ? createElement(LinkEditor, {
        value: inputValue,
        onChangeInputValue: this.onChangeInputValue,
        onKeyDown: this.onKeyDown,
        submitLink: this.submitLink,
        autocompleteRef: this.autocompleteRef
      }) : createElement(LinkViewer, {
        url: url,
        editLink: this.editLink
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var _props$activeAttribut = props.activeAttributes,
          url = _props$activeAttribut.url,
          target = _props$activeAttribut.target;
      var opensInNewWindow = target === '_blank';

      if (!isShowingInput(props, state)) {
        if (url !== state.inputValue) {
          return {
            inputValue: url
          };
        }

        if (opensInNewWindow !== state.opensInNewWindow) {
          return {
            opensInNewWindow: opensInNewWindow
          };
        }
      }

      return null;
    }
  }]);

  return InlineLinkUI;
}(Component);

export default withSpokenMessages(InlineLinkUI);
//# sourceMappingURL=inline.js.map