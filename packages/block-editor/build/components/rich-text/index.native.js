"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RichTextShortcut", {
  enumerable: true,
  get: function get() {
    return _shortcut.RichTextShortcut;
  }
});
Object.defineProperty(exports, "RichTextToolbarButton", {
  enumerable: true,
  get: function get() {
    return _toolbarButton.RichTextToolbarButton;
  }
});
Object.defineProperty(exports, "UnstableRichTextInputEvent", {
  enumerable: true,
  get: function get() {
    return _inputEvent.UnstableRichTextInputEvent;
  }
});
exports.default = exports.RichText = void 0;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reactNativeAztec = _interopRequireDefault(require("react-native-aztec"));

var _reactNative = require("react-native");

var _compose = require("@wordpress/compose");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _richText = require("@wordpress/rich-text");

var _htmlEntities = require("@wordpress/html-entities");

var _keycodes = require("@wordpress/keycodes");

var _blocks = require("@wordpress/blocks");

var _url = require("@wordpress/url");

var _formatEdit = _interopRequireDefault(require("./format-edit"));

var _formatToolbar = _interopRequireDefault(require("./format-toolbar"));

var _style = _interopRequireDefault(require("./style.scss"));

var _shortcut = require("./shortcut");

var _toolbarButton = require("./toolbar-button");

var _inputEvent = require("./input-event");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var isRichTextValueEmpty = function isRichTextValueEmpty(value) {
  return !value || !value.length;
};

var unescapeSpaces = function unescapeSpaces(text) {
  return text.replace(/&nbsp;|&#160;/gi, ' ');
};
/**
 * Calls {@link pasteHandler} with a fallback to plain text when HTML processing
 * results in errors
 *
 * @param {Object}  [options]     The options to pass to {@link pasteHandler}
 *
 * @return {Array|string}         A list of blocks or a string, depending on
 *                                `handlerMode`.
 */


var saferPasteHandler = function saferPasteHandler(options) {
  try {
    return (0, _blocks.pasteHandler)(options);
  } catch (error) {
    window.console.log('Pasting HTML failed:', error);
    window.console.log('HTML:', options.HTML);
    window.console.log('Falling back to plain text.'); // fallback to plain text

    return (0, _blocks.pasteHandler)((0, _objectSpread2.default)({}, options, {
      HTML: ''
    }));
  }
};

var gutenbergFormatNamesToAztec = {
  'core/bold': 'bold',
  'core/italic': 'italic',
  'core/strikethrough': 'strikethrough'
};

var RichText =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RichText, _Component);

  function RichText() {
    var _this;

    (0, _classCallCheck2.default)(this, RichText);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RichText).apply(this, arguments));
    _this.isIOS = _reactNative.Platform.OS === 'ios';
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onEnter = _this.onEnter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBackspace = _this.onBackspace.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onPaste = _this.onPaste.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onContentSizeChange = _this.onContentSizeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFormatChange = _this.onFormatChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // This prevents a bug in Aztec which triggers onSelectionChange twice on format change

    _this.onSelectionChange = _this.onSelectionChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.valueToFormat = _this.valueToFormat.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      start: 0,
      end: 0,
      formatPlaceholder: null,
      height: 0
    };
    return _this;
  }
  /**
   * Get the current record (value and selection) from props and state.
   *
   * @return {Object} The current record (value and selection).
   */


  (0, _createClass2.default)(RichText, [{
    key: "getRecord",
    value: function getRecord() {
      var _this$state = this.state,
          formatPlaceholder = _this$state.formatPlaceholder,
          start = _this$state.start,
          end = _this$state.end;
      var value = this.props.value === undefined ? null : this.props.value; // Since we get the text selection from Aztec we need to be in sync with the HTML `value`
      // Removing leading white spaces using `trim()` should make sure this is the case.

      if (typeof value === 'string' || value instanceof String) {
        value = value.trimLeft();
      }

      var _this$formatToValue = this.formatToValue(value),
          formats = _this$formatToValue.formats,
          replacements = _this$formatToValue.replacements,
          text = _this$formatToValue.text;

      return {
        formats: formats,
        replacements: replacements,
        formatPlaceholder: formatPlaceholder,
        text: text,
        start: start,
        end: end
      };
    }
    /*
     * Splits the content at the location of the selection.
     *
     * Replaces the content of the editor inside this element with the contents
     * before the selection. Sends the elements after the selection to the `onSplit`
     * handler.
     *
     */

  }, {
    key: "splitContent",
    value: function splitContent(currentRecord) {
      var blocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var isPasted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var onSplit = this.props.onSplit;

      if (!onSplit) {
        return;
      } // TODO : Fix the index position in AztecNative for Android


      var _split = (0, _richText.split)(currentRecord),
          _split2 = (0, _slicedToArray2.default)(_split, 2),
          before = _split2[0],
          after = _split2[1]; // In case split occurs at the trailing or leading edge of the field,
      // assume that the before/after values respectively reflect the current
      // value. This also provides an opportunity for the parent component to
      // determine whether the before/after value has changed using a trivial
      //  strict equality operation.


      if ((0, _richText.isEmpty)(after)) {
        before = currentRecord;
      } else if ((0, _richText.isEmpty)(before)) {
        after = currentRecord;
      } // If pasting and the split would result in no content other than the
      // pasted blocks, remove the before and after blocks.


      if (isPasted) {
        before = (0, _richText.isEmpty)(before) ? null : before;
        after = (0, _richText.isEmpty)(after) ? null : after;
      }

      if (before) {
        before = this.valueToFormat(before);
      }

      if (after) {
        after = this.valueToFormat(after);
      } // The onSplit event can cause a content update event for this block.  Such event should
      // definitely be processed by our native components, since they have no knowledge of
      // how the split works.  Setting lastEventCount to undefined forces the native component to
      // always update when provided with new content.


      this.lastEventCount = undefined;
      onSplit.apply(void 0, [before, after].concat((0, _toConsumableArray2.default)(blocks)));
    }
  }, {
    key: "valueToFormat",
    value: function valueToFormat(value) {
      // remove the outer root tags
      return this.removeRootTagsProduceByAztec((0, _richText.toHTMLString)({
        value: value,
        multilineTag: this.multilineTag
      }));
    }
  }, {
    key: "getActiveFormatNames",
    value: function getActiveFormatNames(record) {
      var formatTypes = this.props.formatTypes;
      return formatTypes.map(function (_ref) {
        var name = _ref.name;
        return name;
      }).filter(function (name) {
        return (0, _richText.getActiveFormat)(record, name) !== undefined;
      }).map(function (name) {
        return gutenbergFormatNamesToAztec[name];
      }).filter(Boolean);
    }
  }, {
    key: "onFormatChange",
    value: function onFormatChange(record) {
      var newContent; // valueToFormat might throw when converting the record to a tree structure
      // let's ignore the event for now and force a render update so we're still in sync

      try {
        newContent = this.valueToFormat(record);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      this.setState({
        formatPlaceholder: record.formatPlaceholder
      });

      if (newContent && newContent !== this.props.value) {
        this.props.onChange(newContent);

        if (record.needsSelectionUpdate && record.start && record.end) {
          this.setState({
            start: record.start,
            end: record.end
          });
        }

        this.setState({
          needsSelectionUpdate: record.needsSelectionUpdate
        });
      } else {
        // make sure the component rerenders without refreshing the text on gutenberg
        // (this can trigger other events that might update the active formats on aztec)
        this.lastEventCount = 0;
        this.forceUpdate();
      }
    }
    /*
     * Cleans up any root tags produced by aztec.
     * TODO: This should be removed on a later version when aztec doesn't return the top tag of the text being edited
     */

  }, {
    key: "removeRootTagsProduceByAztec",
    value: function removeRootTagsProduceByAztec(html) {
      var _this2 = this;

      var result = this.removeRootTag(this.props.tagName, html); // Temporary workaround for https://github.com/WordPress/gutenberg/pull/13763

      if (this.props.rootTagsToEliminate) {
        this.props.rootTagsToEliminate.forEach(function (element) {
          result = _this2.removeRootTag(element, result);
        });
      }

      return result;
    }
  }, {
    key: "removeRootTag",
    value: function removeRootTag(tag, html) {
      var openingTagRegexp = RegExp('^<' + tag + '>', 'gim');
      var closingTagRegexp = RegExp('</' + tag + '>$', 'gim');
      return html.replace(openingTagRegexp, '').replace(closingTagRegexp, '');
    }
    /*
     * Handles any case where the content of the AztecRN instance has changed
     */

  }, {
    key: "onChange",
    value: function onChange(event) {
      this.lastEventCount = event.nativeEvent.eventCount;
      var contentWithoutRootTag = this.removeRootTagsProduceByAztec(unescapeSpaces(event.nativeEvent.text));
      this.lastContent = contentWithoutRootTag;
      this.props.onChange(this.lastContent);
    }
    /**
     * Handles any case where the content of the AztecRN instance has changed in size
     */

  }, {
    key: "onContentSizeChange",
    value: function onContentSizeChange(contentSize) {
      var contentHeight = contentSize.height;
      this.setState({
        height: contentHeight
      });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "onEnter",
    value: function onEnter(event) {
      this.lastEventCount = event.nativeEvent.eventCount;

      if (!this.props.onSplit) {
        // TODO: insert the \n char instead?
        return;
      }

      var currentRecord = this.createRecord((0, _objectSpread2.default)({}, event.nativeEvent, {
        currentContent: unescapeSpaces(event.nativeEvent.text)
      }));
      this.splitContent(currentRecord);
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "onBackspace",
    value: function onBackspace(event) {
      var _this$props = this.props,
          onMerge = _this$props.onMerge,
          onRemove = _this$props.onRemove;

      if (!onMerge && !onRemove) {
        return;
      }

      var keyCode = _keycodes.BACKSPACE; // TODO : should we differentiate BACKSPACE and DELETE?

      var isReverse = keyCode === _keycodes.BACKSPACE;
      var empty = this.isEmpty();

      if (onMerge) {
        onMerge(!isReverse);
      } // Only handle remove on Backspace. This serves dual-purpose of being
      // an intentional user interaction distinguishing between Backspace and
      // Delete to remove the empty field, but also to avoid merge & remove
      // causing destruction of two fields (merge, then removed merged).


      if (onRemove && empty && isReverse) {
        onRemove(!isReverse);
      }
    }
    /**
     * Handles a paste event from the native Aztec Wrapper.
     *
     * @param {PasteEvent} event The paste event which wraps `nativeEvent`.
     */

  }, {
    key: "onPaste",
    value: function onPaste(event) {
      var isPasted = true;
      var onSplit = this.props.onSplit;
      var _event$nativeEvent = event.nativeEvent,
          pastedText = _event$nativeEvent.pastedText,
          pastedHtml = _event$nativeEvent.pastedHtml;
      var currentRecord = this.createRecord(event.nativeEvent);
      event.preventDefault(); // There is a selection, check if a URL is pasted.

      if (!(0, _richText.isCollapsed)(currentRecord)) {
        var trimmedText = (pastedHtml || pastedText).replace(/<[^>]+>/g, '').trim(); // A URL was pasted, turn the selection into a link

        if ((0, _url.isURL)(trimmedText)) {
          var linkedRecord = (0, _richText.applyFormat)(currentRecord, {
            type: 'a',
            attributes: {
              href: (0, _htmlEntities.decodeEntities)(trimmedText)
            }
          });
          this.lastContent = this.valueToFormat(linkedRecord);
          this.lastEventCount = undefined;
          this.props.onChange(this.lastContent); // Allows us to ask for this information when we get a report.

          window.console.log('Created link:\n\n', trimmedText);
          return;
        }
      }

      var shouldReplace = this.props.onReplace && this.isEmpty();
      var mode = 'INLINE';

      if (shouldReplace) {
        mode = 'BLOCKS';
      } else if (onSplit) {
        mode = 'AUTO';
      }

      var pastedContent = saferPasteHandler({
        HTML: pastedHtml,
        plainText: pastedText,
        mode: mode,
        tagName: this.props.tagName,
        canUserUseUnfilteredHTML: this.props.canUserUseUnfilteredHTML
      });

      if (typeof pastedContent === 'string') {
        var recordToInsert = (0, _richText.create)({
          html: pastedContent
        });
        var insertedContent = (0, _richText.insert)(currentRecord, recordToInsert);
        var newContent = this.valueToFormat(insertedContent);
        this.lastEventCount = undefined;
        this.lastContent = newContent;
        this.props.onChange(this.lastContent);
      } else if (onSplit) {
        if (!pastedContent.length) {
          return;
        }

        if (shouldReplace) {
          this.props.onReplace(pastedContent);
        } else {
          this.splitContent(currentRecord, pastedContent, isPasted);
        }
      }
    }
  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(start, end, text, event) {
      // `end` can be less than `start` on iOS
      // Let's fix that here so `rich-text/slice` can work properly
      var realStart = Math.min(start, end);
      var realEnd = Math.max(start, end);
      var noChange = this.state.start === start && this.state.end === end;
      var isTyping = this.state.start + 1 === realStart;
      var shouldKeepFormats = noChange || isTyping; // update format placeholder to continue writing in the current format
      // or set it to null if user jumped to another part in the text

      var formatPlaceholder = shouldKeepFormats && this.state.formatPlaceholder ? (0, _objectSpread2.default)({}, this.state.formatPlaceholder, {
        index: realStart
      }) : null;
      this.setState({
        start: realStart,
        end: realEnd,
        formatPlaceholder: formatPlaceholder
      });
      this.lastEventCount = event.nativeEvent.eventCount; // we don't want to refresh aztec as no content can have changed from this event
      // let's update lastContent to prevent that in shouldComponentUpdate

      this.lastContent = this.removeRootTagsProduceByAztec(unescapeSpaces(text));
      this.props.onChange(this.lastContent);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return (0, _richText.isEmpty)(this.formatToValue(this.props.value));
    }
    /**
     * Creates a RichText value "record" from native content and selection
     * information
     *
     * @param {string} currentContent The content (usually an HTML string) from
     *                                the native component.
     * @param {number}    selectionStart The start of the selection.
     * @param {number}      selectionEnd The end of the selection (same as start if
     *                                cursor instead of selection).
     *
      * @return {Object} A RichText value with formats and selection.
     */

  }, {
    key: "createRecord",
    value: function createRecord(_ref2) {
      var currentContent = _ref2.currentContent,
          selectionStart = _ref2.selectionStart,
          selectionEnd = _ref2.selectionEnd;
      // strip outer <p> tags
      var innerContent = this.removeRootTagsProduceByAztec(currentContent); // create record (with selection) from current contents

      var currentRecord = (0, _objectSpread2.default)({
        start: selectionStart,
        end: selectionEnd
      }, (0, _richText.create)({
        html: innerContent,
        range: null,
        multilineTag: false
      }));
      return currentRecord;
    }
  }, {
    key: "formatToValue",
    value: function formatToValue(value) {
      // Handle deprecated `children` and `node` sources.
      if (Array.isArray(value)) {
        return (0, _richText.create)({
          html: _blocks.children.toHTML(value),
          multilineTag: this.multilineTag
        });
      }

      if (this.props.format === 'string') {
        return (0, _richText.create)({
          html: value,
          multilineTag: this.multilineTag
        });
      } // Guard for blocks passing `null` in onSplit callbacks. May be removed
      // if onSplit is revised to not pass a `null` value.


      if (value === null) {
        return (0, _richText.create)();
      }

      return value;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.tagName !== this.props.tagName || nextProps.isSelected !== this.props.isSelected) {
        this.lastEventCount = undefined;
        this.lastContent = undefined;
        return true;
      } // TODO: Please re-introduce the check to avoid updating the content right after an `onChange` call.
      // It was removed in https://github.com/WordPress/gutenberg/pull/12417 to fix undo/redo problem.
      // If the component is changed React side (undo/redo/merging/splitting/custom text actions)
      // we need to make sure the native is updated as well


      if (typeof nextProps.value !== 'undefined' && typeof this.lastContent !== 'undefined' && nextProps.value !== this.lastContent) {
        this.lastEventCount = undefined; // force a refresh on the native side
      }

      return true;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isSelected) {
        this._editor.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._editor.isFocused()) {
        this._editor.blur();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isSelected && !prevProps.isSelected) {
        this._editor.focus();
      } else if (!this.props.isSelected && prevProps.isSelected && this.isIOS) {
        this._editor.blur();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          tagName = _this$props2.tagName,
          style = _this$props2.style,
          formattingControls = _this$props2.formattingControls,
          isSelected = _this$props2.isSelected;
      var record = this.getRecord(); // Save back to HTML from React tree

      var value = this.valueToFormat(record);
      var html = "<".concat(tagName, ">").concat(value, "</").concat(tagName, ">"); // We need to check if the value is undefined or empty, and then assign it properly otherwise the placeholder is not visible

      if (value === undefined || value === '') {
        html = '';
        this.lastEventCount = undefined; // force a refresh on the native side
      }

      var minHeight = _style.default['block-editor-rich-text'].minHeight;

      if (style && style.minHeight) {
        minHeight = style.minHeight;
      }

      var selection = this.state.needsSelectionUpdate ? {
        start: this.state.start,
        end: this.state.end
      } : null;
      return (0, _element.createElement)(_reactNative.View, null, isSelected && (0, _element.createElement)(_blockEditor.BlockFormatControls, null, (0, _element.createElement)(_formatToolbar.default, {
        controls: formattingControls
      })), (0, _element.createElement)(_reactNativeAztec.default, {
        ref: function ref(_ref3) {
          _this3._editor = _ref3;

          if (_this3.props.setRef) {
            _this3.props.setRef(_ref3);
          }
        },
        style: (0, _objectSpread2.default)({}, style, {
          minHeight: Math.max(minHeight, this.state.height)
        }),
        text: {
          text: html,
          eventCount: this.lastEventCount,
          selection: selection
        },
        placeholder: this.props.placeholder,
        placeholderTextColor: this.props.placeholderTextColor || _style.default['block-editor-rich-text'].textDecorationColor,
        onChange: this.onChange,
        onFocus: this.props.onFocus,
        onBlur: this.props.onBlur,
        onEnter: this.onEnter,
        onBackspace: this.onBackspace,
        onPaste: this.onPaste,
        activeFormats: this.getActiveFormatNames(record),
        onContentSizeChange: this.onContentSizeChange,
        onCaretVerticalPositionChange: this.props.onCaretVerticalPositionChange,
        onSelectionChange: this.onSelectionChange,
        isSelected: isSelected,
        blockType: {
          tag: tagName
        },
        color: 'black',
        maxImagesWidth: 200,
        fontFamily: this.props.fontFamily || _style.default['block-editor-rich-text'].fontFamily,
        fontSize: this.props.fontSize,
        fontWeight: this.props.fontWeight,
        fontStyle: this.props.fontStyle,
        disableEditingMenu: this.props.disableEditingMenu
      }), isSelected && (0, _element.createElement)(_formatEdit.default, {
        value: record,
        onChange: this.onFormatChange
      }));
    }
  }]);
  return RichText;
}(_element.Component);

exports.RichText = RichText;
RichText.defaultProps = {
  formattingControls: ['bold', 'italic', 'link', 'strikethrough'],
  format: 'string'
};
var RichTextContainer = (0, _compose.compose)([_compose.withInstanceId, (0, _data.withSelect)(function (select) {
  var _select = select('core/rich-text'),
      getFormatTypes = _select.getFormatTypes;

  return {
    formatTypes: getFormatTypes()
  };
})])(RichText);

RichTextContainer.Content = function (_ref4) {
  var value = _ref4.value,
      format = _ref4.format,
      Tag = _ref4.tagName,
      props = (0, _objectWithoutProperties2.default)(_ref4, ["value", "format", "tagName"]);
  var content;

  switch (format) {
    case 'string':
      content = (0, _element.createElement)(_element.RawHTML, null, value);
      break;
  }

  if (Tag) {
    return (0, _element.createElement)(Tag, props, content);
  }

  return content;
};

RichTextContainer.isEmpty = isRichTextValueEmpty;
RichTextContainer.Content.defaultProps = {
  format: 'string'
};
var _default = RichTextContainer;
exports.default = _default;
//# sourceMappingURL=index.native.js.map