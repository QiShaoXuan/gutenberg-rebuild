import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
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
import { find, isNil, isEqual, omit, pickBy, get, isPlainObject } from 'lodash';
import memize from 'memize';
/**
 * WordPress dependencies
 */

import { Component, Fragment, RawHTML } from '@wordpress/element';
import { isHorizontalEdge } from '@wordpress/dom';
import { createBlobURL } from '@wordpress/blob';
import { BACKSPACE, DELETE, ENTER, LEFT, RIGHT, SPACE } from '@wordpress/keycodes';
import { withDispatch, withSelect } from '@wordpress/data';
import { pasteHandler, children, getBlockTransforms, findTransform } from '@wordpress/blocks';
import { withInstanceId, withSafeTimeout, compose } from '@wordpress/compose';
import { isURL } from '@wordpress/url';
import { isEmpty as _isEmpty, create, apply, applyFormat, split, toHTMLString, getTextContent, insert, insertLineBreak, insertLineSeparator, isEmptyLine, unstableToDom, remove, removeFormat, isCollapsed, LINE_SEPARATOR, indentListItems, __unstableGetActiveFormats, __unstableUpdateFormats } from '@wordpress/rich-text';
import { decodeEntities } from '@wordpress/html-entities';
import { withFilters, IsolatedEventContainer } from '@wordpress/components';
import deprecated from '@wordpress/deprecated';
/**
 * Internal dependencies
 */

import Autocomplete from '../autocomplete';
import BlockFormatControls from '../block-format-controls';
import FormatEdit from './format-edit';
import FormatToolbar from './format-toolbar';
import Editable from './editable';
import { pickAriaProps } from './aria';
import { getPatterns } from './patterns';
import { withBlockEditContext } from '../block-edit/context';
import { ListEdit } from './list-edit';
import { RemoveBrowserShortcuts } from './remove-browser-shortcuts';
/**
 * Browser dependencies
 */

var _window = window,
    getSelection = _window.getSelection,
    getComputedStyle = _window.getComputedStyle;
/**
 * All inserting input types that would insert HTML into the DOM.
 *
 * @see  https://www.w3.org/TR/input-events-2/#interface-InputEvent-Attributes
 *
 * @type {Set}
 */

var INSERTION_INPUT_TYPES_TO_IGNORE = new Set(['insertParagraph', 'insertOrderedList', 'insertUnorderedList', 'insertHorizontalRule', 'insertLink']);
/**
 * Global stylesheet.
 */

var globalStyle = document.createElement('style');
document.head.appendChild(globalStyle);
export var RichText =
/*#__PURE__*/
function (_Component) {
  _inherits(RichText, _Component);

  function RichText(_ref) {
    var _this;

    var value = _ref.value,
        onReplace = _ref.onReplace,
        multiline = _ref.multiline;

    _classCallCheck(this, RichText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RichText).apply(this, arguments));

    if (multiline === true || multiline === 'p' || multiline === 'li') {
      _this.multilineTag = multiline === true ? 'p' : multiline;
    }

    if (_this.multilineTag === 'li') {
      _this.multilineWrapperTags = ['ul', 'ol'];
    }

    if (_this.props.onSplit) {
      _this.onSplit = _this.props.onSplit;
      deprecated('wp.editor.RichText onSplit prop', {
        plugin: 'Gutenberg',
        alternative: 'wp.editor.RichText unstableOnSplit prop'
      });
    } else if (_this.props.unstableOnSplit) {
      _this.onSplit = _this.props.unstableOnSplit;
    }

    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDeleteKeyDown = _this.onDeleteKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPaste = _this.onPaste.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onCreateUndoLevel = _this.onCreateUndoLevel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setFocusedElement = _this.setFocusedElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onCompositionEnd = _this.onCompositionEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectionChange = _this.onSelectionChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getRecord = _this.getRecord.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.createRecord = _this.createRecord.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.applyRecord = _this.applyRecord.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.isEmpty = _this.isEmpty.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.valueToFormat = _this.valueToFormat.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setRef = _this.setRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.valueToEditableHTML = _this.valueToEditableHTML.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleHorizontalNavigation = _this.handleHorizontalNavigation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPointerDown = _this.onPointerDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.formatToValue = memize(_this.formatToValue.bind(_assertThisInitialized(_assertThisInitialized(_this))), {
      maxSize: 1
    });
    _this.savedContent = value;
    _this.patterns = getPatterns({
      onReplace: onReplace,
      valueToFormat: _this.valueToFormat
    });
    _this.enterPatterns = getBlockTransforms('from').filter(function (_ref2) {
      var type = _ref2.type;
      return type === 'enter';
    });
    _this.state = {};
    _this.usedDeprecatedChildrenSource = Array.isArray(value);
    _this.lastHistoryValue = value;
    return _this;
  }

  _createClass(RichText, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('selectionchange', this.onSelectionChange);
    }
  }, {
    key: "setRef",
    value: function setRef(node) {
      if (node) {
        if (process.env.NODE_ENV === 'development') {
          var computedStyle = getComputedStyle(node);

          if (computedStyle.display === 'inline') {
            // eslint-disable-next-line no-console
            console.warn('RichText cannot be used with an inline container. Please use a different tagName.');
          }
        }

        this.editableRef = node;
      } else {
        delete this.editableRef;
      }
    }
  }, {
    key: "setFocusedElement",
    value: function setFocusedElement() {
      if (this.props.setFocusedElement) {
        this.props.setFocusedElement(this.props.instanceId);
      }
    }
    /**
     * Get the current record (value and selection) from props and state.
     *
     * @return {Object} The current record (value and selection).
     */

  }, {
    key: "getRecord",
    value: function getRecord() {
      var _this$formatToValue = this.formatToValue(this.props.value),
          formats = _this$formatToValue.formats,
          replacements = _this$formatToValue.replacements,
          text = _this$formatToValue.text;

      var _this$state = this.state,
          start = _this$state.start,
          end = _this$state.end,
          activeFormats = _this$state.activeFormats;
      return {
        formats: formats,
        replacements: replacements,
        text: text,
        start: start,
        end: end,
        activeFormats: activeFormats
      };
    }
  }, {
    key: "createRecord",
    value: function createRecord() {
      var selection = getSelection();
      var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      return create({
        element: this.editableRef,
        range: range,
        multilineTag: this.multilineTag,
        multilineWrapperTags: this.multilineWrapperTags,
        prepareEditableTree: this.props.prepareEditableTree,
        __unstableIsEditableTree: true
      });
    }
  }, {
    key: "applyRecord",
    value: function applyRecord(record) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          domOnly = _ref3.domOnly;

      apply({
        value: record,
        current: this.editableRef,
        multilineTag: this.multilineTag,
        multilineWrapperTags: this.multilineWrapperTags,
        prepareEditableTree: this.props.prepareEditableTree,
        __unstableDomOnly: domOnly
      });
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return _isEmpty(this.formatToValue(this.props.value));
    }
    /**
     * Handles a paste event.
     *
     * Saves the pasted data as plain text in `pastedPlainText`.
     *
     * @param {PasteEvent} event The paste event.
     */

  }, {
    key: "onPaste",
    value: function onPaste(event) {
      var clipboardData = event.clipboardData;
      var items = clipboardData.items,
          files = clipboardData.files; // In Edge these properties can be null instead of undefined, so a more
      // rigorous test is required over using default values.

      items = isNil(items) ? [] : items;
      files = isNil(files) ? [] : files;
      var plainText = '';
      var html = ''; // IE11 only supports `Text` as an argument for `getData` and will
      // otherwise throw an invalid argument error, so we try the standard
      // arguments first, then fallback to `Text` if they fail.

      try {
        plainText = clipboardData.getData('text/plain');
        html = clipboardData.getData('text/html');
      } catch (error1) {
        try {
          html = clipboardData.getData('Text');
        } catch (error2) {
          // Some browsers like UC Browser paste plain text by default and
          // don't support clipboardData at all, so allow default
          // behaviour.
          return;
        }
      }

      event.preventDefault(); // Allows us to ask for this information when we get a report.

      window.console.log('Received HTML:\n\n', html);
      window.console.log('Received plain text:\n\n', plainText); // Only process file if no HTML is present.
      // Note: a pasted file may have the URL as plain text.

      var item = find([].concat(_toConsumableArray(items), _toConsumableArray(files)), function (_ref4) {
        var type = _ref4.type;
        return /^image\/(?:jpe?g|png|gif)$/.test(type);
      });

      if (item && !html) {
        var file = item.getAsFile ? item.getAsFile() : item;

        var _content = pasteHandler({
          HTML: "<img src=\"".concat(createBlobURL(file), "\">"),
          mode: 'BLOCKS',
          tagName: this.props.tagName
        });

        var _shouldReplace = this.props.onReplace && this.isEmpty(); // Allows us to ask for this information when we get a report.


        window.console.log('Received item:\n\n', file);

        if (_shouldReplace) {
          this.props.onReplace(_content);
        } else if (this.onSplit) {
          this.splitContent(_content);
        }

        return;
      }

      var record = this.getRecord(); // There is a selection, check if a URL is pasted.

      if (!isCollapsed(record)) {
        var pastedText = (html || plainText).replace(/<[^>]+>/g, '').trim(); // A URL was pasted, turn the selection into a link

        if (isURL(pastedText)) {
          this.onChange(applyFormat(record, {
            type: 'a',
            attributes: {
              href: decodeEntities(pastedText)
            }
          })); // Allows us to ask for this information when we get a report.

          window.console.log('Created link:\n\n', pastedText);
          return;
        }
      }

      var shouldReplace = this.props.onReplace && this.isEmpty();
      var mode = 'INLINE';

      if (shouldReplace) {
        mode = 'BLOCKS';
      } else if (this.onSplit) {
        mode = 'AUTO';
      }

      var content = pasteHandler({
        HTML: html,
        plainText: plainText,
        mode: mode,
        tagName: this.props.tagName,
        canUserUseUnfilteredHTML: this.props.canUserUseUnfilteredHTML
      });

      if (typeof content === 'string') {
        var recordToInsert = create({
          html: content
        });
        this.onChange(insert(record, recordToInsert));
      } else if (this.onSplit) {
        if (!content.length) {
          return;
        }

        if (shouldReplace) {
          this.props.onReplace(content);
        } else {
          this.splitContent(content, {
            paste: true
          });
        }
      }
    }
    /**
     * Handles a focus event on the contenteditable field, calling the
     * `unstableOnFocus` prop callback if one is defined. The callback does not
     * receive any arguments.
     *
     * This is marked as a private API and the `unstableOnFocus` prop is not
     * documented, as the current requirements where it is used are subject to
     * future refactoring following `isSelected` handling.
     *
     * In contrast with `setFocusedElement`, this is only triggered in response
     * to focus within the contenteditable field, whereas `setFocusedElement`
     * is triggered on focus within any `RichText` descendent element.
     *
     * @see setFocusedElement
     *
     * @private
     */

  }, {
    key: "onFocus",
    value: function onFocus() {
      var unstableOnFocus = this.props.unstableOnFocus;

      if (unstableOnFocus) {
        unstableOnFocus();
      }

      this.recalculateBoundaryStyle();
      document.addEventListener('selectionchange', this.onSelectionChange);
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      document.removeEventListener('selectionchange', this.onSelectionChange);
    }
    /**
     * Handle input on the next selection change event.
     *
     * @param {SyntheticEvent} event Synthetic input event.
     */

  }, {
    key: "onInput",
    value: function onInput(event) {
      // For Input Method Editor (IME), used in Chinese, Japanese, and Korean
      // (CJK), do not trigger a change if characters are being composed.
      // Browsers setting `isComposing` to `true` will usually emit a final
      // `input` event when the characters are composed.
      if (event && event.nativeEvent.isComposing) {
        // Also don't update any selection.
        document.removeEventListener('selectionchange', this.onSelectionChange);
        return;
      }

      if (event && event.nativeEvent.inputType) {
        var inputType = event.nativeEvent.inputType; // The browser formatted something or tried to insert HTML.
        // Overwrite it. It will be handled later by the format library if
        // needed.

        if (inputType.indexOf('format') === 0 || INSERTION_INPUT_TYPES_TO_IGNORE.has(inputType)) {
          this.applyRecord(this.getRecord());
          return;
        }
      }

      var value = this.createRecord();
      var _this$state2 = this.state,
          _this$state2$activeFo = _this$state2.activeFormats,
          activeFormats = _this$state2$activeFo === void 0 ? [] : _this$state2$activeFo,
          start = _this$state2.start; // Update the formats between the last and new caret position.

      var change = __unstableUpdateFormats({
        value: value,
        start: start,
        end: value.start,
        formats: activeFormats
      });

      this.onChange(change, {
        withoutHistory: true
      });
      var transformed = this.patterns.reduce(function (accumlator, transform) {
        return transform(accumlator);
      }, change);

      if (transformed !== change) {
        this.onCreateUndoLevel();
        this.onChange(_objectSpread({}, transformed, {
          activeFormats: activeFormats
        }));
      } // Create an undo level when input stops for over a second.


      this.props.clearTimeout(this.onInput.timeout);
      this.onInput.timeout = this.props.setTimeout(this.onCreateUndoLevel, 1000);
    }
  }, {
    key: "onCompositionEnd",
    value: function onCompositionEnd() {
      // Ensure the value is up-to-date for browsers that don't emit a final
      // input event after composition.
      this.onInput(); // Tracking selection changes can be resumed.

      document.addEventListener('selectionchange', this.onSelectionChange);
    }
    /**
     * Handles the `selectionchange` event: sync the selection to local state.
     */

  }, {
    key: "onSelectionChange",
    value: function onSelectionChange() {
      var value = this.createRecord();
      var start = value.start,
          end = value.end;

      if (start !== this.state.start || end !== this.state.end) {
        var isCaretWithinFormattedText = this.props.isCaretWithinFormattedText;

        var activeFormats = __unstableGetActiveFormats(value);

        if (!isCaretWithinFormattedText && activeFormats.length) {
          this.props.onEnterFormattedText();
        } else if (isCaretWithinFormattedText && !activeFormats.length) {
          this.props.onExitFormattedText();
        }

        this.setState({
          start: start,
          end: end,
          activeFormats: activeFormats
        });
        this.applyRecord(_objectSpread({}, value, {
          activeFormats: activeFormats
        }), {
          domOnly: true
        });

        if (activeFormats.length > 0) {
          this.recalculateBoundaryStyle();
        }
      }
    }
  }, {
    key: "recalculateBoundaryStyle",
    value: function recalculateBoundaryStyle() {
      var boundarySelector = '*[data-rich-text-format-boundary]';
      var element = this.editableRef.querySelector(boundarySelector);

      if (element) {
        var computedStyle = getComputedStyle(element);
        var newColor = computedStyle.color.replace(')', ', 0.2)').replace('rgb', 'rgba');
        globalStyle.innerHTML = "*:focus ".concat(boundarySelector, "{background-color: ").concat(newColor, "}");
      }
    }
    /**
     * Calls all registered onChangeEditableValue handlers.
     *
     * @param {Array}  formats The formats of the latest rich-text value.
     * @param {string} text    The text of the latest rich-text value.
     */

  }, {
    key: "onChangeEditableValue",
    value: function onChangeEditableValue(_ref5) {
      var formats = _ref5.formats,
          text = _ref5.text;
      get(this.props, ['onChangeEditableValue'], []).forEach(function (eventHandler) {
        eventHandler(formats, text);
      });
    }
    /**
     * Sync the value to global state. The node tree and selection will also be
     * updated if differences are found.
     *
     * @param {Object}  record            The record to sync and apply.
     * @param {Object}  $2                Named options.
     * @param {boolean} $2.withoutHistory If true, no undo level will be
     *                                    created.
     */

  }, {
    key: "onChange",
    value: function onChange(record) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          withoutHistory = _ref6.withoutHistory;

      this.applyRecord(record);
      var start = record.start,
          end = record.end,
          _record$activeFormats = record.activeFormats,
          activeFormats = _record$activeFormats === void 0 ? [] : _record$activeFormats;
      this.onChangeEditableValue(record);
      this.savedContent = this.valueToFormat(record);
      this.props.onChange(this.savedContent);
      this.setState({
        start: start,
        end: end,
        activeFormats: activeFormats
      });

      if (!withoutHistory) {
        this.onCreateUndoLevel();
      }
    }
  }, {
    key: "onCreateUndoLevel",
    value: function onCreateUndoLevel() {
      // If the content is the same, no level needs to be created.
      if (this.lastHistoryValue === this.savedContent) {
        return;
      }

      this.props.onCreateUndoLevel();
      this.lastHistoryValue = this.savedContent;
    }
    /**
     * Handles a delete keyDown event to handle merge or removal for collapsed
     * selection where caret is at directional edge: forward for a delete key,
     * reverse for a backspace key.
     *
     * @link https://en.wikipedia.org/wiki/Caret_navigation
     *
     * @param {KeyboardEvent} event Keydown event.
     */

  }, {
    key: "onDeleteKeyDown",
    value: function onDeleteKeyDown(event) {
      var _this$props = this.props,
          onMerge = _this$props.onMerge,
          onRemove = _this$props.onRemove;

      if (!onMerge && !onRemove) {
        return;
      }

      var keyCode = event.keyCode;
      var isReverse = keyCode === BACKSPACE; // Only process delete if the key press occurs at uncollapsed edge.

      if (!isCollapsed(this.createRecord())) {
        return;
      }

      var empty = this.isEmpty(); // It is important to consider emptiness because an empty container
      // will include a padding BR node _after_ the caret, so in a forward
      // deletion the isHorizontalEdge function will incorrectly interpret the
      // presence of the BR node as not being at the edge.

      var isEdge = empty || isHorizontalEdge(this.editableRef, isReverse);

      if (!isEdge) {
        return;
      }

      if (onMerge) {
        onMerge(!isReverse);
      } // Only handle remove on Backspace. This serves dual-purpose of being
      // an intentional user interaction distinguishing between Backspace and
      // Delete to remove the empty field, but also to avoid merge & remove
      // causing destruction of two fields (merge, then removed merged).


      if (onRemove && empty && isReverse) {
        onRemove(!isReverse);
      }

      event.preventDefault();
    }
    /**
     * Handles a keydown event.
     *
     * @param {SyntheticEvent} event A synthetic keyboard event.
     */

  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var keyCode = event.keyCode,
          shiftKey = event.shiftKey,
          altKey = event.altKey,
          metaKey = event.metaKey,
          ctrlKey = event.ctrlKey;

      if ( // Only override left and right keys without modifiers pressed.
      !shiftKey && !altKey && !metaKey && !ctrlKey && (keyCode === LEFT || keyCode === RIGHT)) {
        this.handleHorizontalNavigation(event);
      } // Use the space key in list items (at the start of an item) to indent
      // the list item.


      if (keyCode === SPACE && this.multilineTag === 'li') {
        var value = this.createRecord();

        if (isCollapsed(value)) {
          var text = value.text,
              start = value.start;
          var characterBefore = text[start - 1]; // The caret must be at the start of a line.

          if (!characterBefore || characterBefore === LINE_SEPARATOR) {
            this.onChange(indentListItems(value, {
              type: this.props.tagName
            }));
            event.preventDefault();
          }
        }
      }

      if (keyCode === DELETE || keyCode === BACKSPACE) {
        var _value = this.createRecord();

        var replacements = _value.replacements,
            _text = _value.text,
            _start = _value.start,
            end = _value.end; // Always handle full content deletion ourselves.

        if (_start === 0 && end !== 0 && end === _value.text.length) {
          this.onChange(remove(_value));
          event.preventDefault();
          return;
        }

        if (this.multilineTag) {
          var newValue;

          if (keyCode === BACKSPACE) {
            var index = _start - 1;

            if (_text[index] === LINE_SEPARATOR) {
              var collapsed = isCollapsed(_value); // If the line separator that is about te be removed
              // contains wrappers, remove the wrappers first.

              if (collapsed && replacements[index] && replacements[index].length) {
                var newReplacements = replacements.slice();
                newReplacements[index] = replacements[index].slice(0, -1);
                newValue = _objectSpread({}, _value, {
                  replacements: newReplacements
                });
              } else {
                newValue = remove(_value, // Only remove the line if the selection is
                // collapsed, otherwise remove the selection.
                collapsed ? _start - 1 : _start, end);
              }
            }
          } else if (_text[end] === LINE_SEPARATOR) {
            var _collapsed = isCollapsed(_value); // If the line separator that is about te be removed
            // contains wrappers, remove the wrappers first.


            if (_collapsed && replacements[end] && replacements[end].length) {
              var _newReplacements = replacements.slice();

              _newReplacements[end] = replacements[end].slice(0, -1);
              newValue = _objectSpread({}, _value, {
                replacements: _newReplacements
              });
            } else {
              newValue = remove(_value, _start, // Only remove the line if the selection is
              // collapsed, otherwise remove the selection.
              _collapsed ? end + 1 : end);
            }
          }

          if (newValue) {
            this.onChange(newValue);
            event.preventDefault();
          }
        }

        this.onDeleteKeyDown(event);
      } else if (keyCode === ENTER) {
        event.preventDefault();
        var record = this.createRecord();

        if (this.props.onReplace) {
          var _text2 = getTextContent(record);

          var transformation = findTransform(this.enterPatterns, function (item) {
            return item.regExp.test(_text2);
          });

          if (transformation) {
            this.props.onReplace([transformation.transform({
              content: _text2
            })]);
            return;
          }
        }

        if (this.multilineTag) {
          if (event.shiftKey) {
            this.onChange(insertLineBreak(record));
          } else if (this.onSplit && isEmptyLine(record)) {
            this.onSplit.apply(this, _toConsumableArray(split(record).map(this.valueToFormat)));
          } else {
            this.onChange(insertLineSeparator(record));
          }
        } else if (event.shiftKey || !this.onSplit) {
          this.onChange(insertLineBreak(record));
        } else {
          this.splitContent();
        }
      }
    }
    /**
     * Handles horizontal keyboard navigation when no modifiers are pressed. The
     * navigation is handled separately to move correctly around format
     * boundaries.
     *
     * @param  {SyntheticEvent} event A synthetic keyboard event.
     */

  }, {
    key: "handleHorizontalNavigation",
    value: function handleHorizontalNavigation(event) {
      var _this2 = this;

      var value = this.createRecord();
      var formats = value.formats,
          text = value.text,
          start = value.start,
          end = value.end;
      var _this$state$activeFor = this.state.activeFormats,
          activeFormats = _this$state$activeFor === void 0 ? [] : _this$state$activeFor;
      var collapsed = isCollapsed(value);
      var isReverse = event.keyCode === LEFT; // If the selection is collapsed and at the very start, do nothing if
      // navigating backward.
      // If the selection is collapsed and at the very end, do nothing if
      // navigating forward.

      if (collapsed && activeFormats.length === 0) {
        if (start === 0 && isReverse) {
          return;
        }

        if (end === text.length && !isReverse) {
          return;
        }
      } // If the selection is not collapsed, let the browser handle collapsing
      // the selection for now. Later we could expand this logic to set
      // boundary positions if needed.


      if (!collapsed) {
        return;
      } // In all other cases, prevent default behaviour.


      event.preventDefault();
      var formatsBefore = formats[start - 1] || [];
      var formatsAfter = formats[start] || [];
      var newActiveFormatsLength = activeFormats.length;
      var source = formatsAfter;

      if (formatsBefore.length > formatsAfter.length) {
        source = formatsBefore;
      } // If the amount of formats before the caret and after the caret is
      // different, the caret is at a format boundary.


      if (formatsBefore.length < formatsAfter.length) {
        if (!isReverse && activeFormats.length < formatsAfter.length) {
          newActiveFormatsLength++;
        }

        if (isReverse && activeFormats.length > formatsBefore.length) {
          newActiveFormatsLength--;
        }
      } else if (formatsBefore.length > formatsAfter.length) {
        if (!isReverse && activeFormats.length > formatsAfter.length) {
          newActiveFormatsLength--;
        }

        if (isReverse && activeFormats.length < formatsBefore.length) {
          newActiveFormatsLength++;
        }
      } // Wait for boundary class to be added.


      this.props.setTimeout(function () {
        return _this2.recalculateBoundaryStyle();
      });

      if (newActiveFormatsLength !== activeFormats.length) {
        var newActiveFormats = source.slice(0, newActiveFormatsLength);
        this.applyRecord(_objectSpread({}, value, {
          activeFormats: newActiveFormats
        }));
        this.setState({
          activeFormats: newActiveFormats
        });
        return;
      }

      var newPos = value.start + (isReverse ? -1 : 1);
      this.setState({
        start: newPos,
        end: newPos
      });
      this.applyRecord(_objectSpread({}, value, {
        start: newPos,
        end: newPos,
        activeFormats: isReverse ? formatsBefore : formatsAfter
      }));
    }
    /**
     * Splits the content at the location of the selection.
     *
     * Replaces the content of the editor inside this element with the contents
     * before the selection. Sends the elements after the selection to the `onSplit`
     * handler.
     *
     * @param {Array}  blocks  The blocks to add after the split point.
     * @param {Object} context The context for splitting.
     */

  }, {
    key: "splitContent",
    value: function splitContent() {
      var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.onSplit) {
        return;
      }

      var record = this.createRecord();

      var _split = split(record),
          _split2 = _slicedToArray(_split, 2),
          before = _split2[0],
          after = _split2[1]; // In case split occurs at the trailing or leading edge of the field,
      // assume that the before/after values respectively reflect the current
      // value. This also provides an opportunity for the parent component to
      // determine whether the before/after value has changed using a trivial
      //  strict equality operation.


      if (_isEmpty(after)) {
        before = record;
      } else if (_isEmpty(before)) {
        after = record;
      } // If pasting and the split would result in no content other than the
      // pasted blocks, remove the before and after blocks.


      if (context.paste) {
        before = _isEmpty(before) ? null : before;
        after = _isEmpty(after) ? null : after;
      }

      if (before) {
        before = this.valueToFormat(before);
      }

      if (after) {
        after = this.valueToFormat(after);
      }

      this.onSplit.apply(this, [before, after].concat(_toConsumableArray(blocks)));
    }
    /**
     * Select object when they are clicked. The browser will not set any
     * selection when clicking e.g. an image.
     *
     * @param  {SyntheticEvent} event Synthetic mousedown or touchstart event.
     */

  }, {
    key: "onPointerDown",
    value: function onPointerDown(event) {
      var target = event.target; // If the child element has no text content, it must be an object.

      if (target === this.editableRef || target.textContent) {
        return;
      }

      var parentNode = target.parentNode;
      var index = Array.from(parentNode.childNodes).indexOf(target);
      var range = target.ownerDocument.createRange();
      var selection = getSelection();
      range.setStart(target.parentNode, index);
      range.setEnd(target.parentNode, index + 1);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _this$props2 = this.props,
          tagName = _this$props2.tagName,
          value = _this$props2.value,
          isSelected = _this$props2.isSelected;

      if (tagName === prevProps.tagName && value !== prevProps.value && value !== this.savedContent) {
        // Handle deprecated `children` and `node` sources.
        // The old way of passing a value with the `node` matcher required
        // the value to be mapped first, creating a new array each time, so
        // a shallow check wouldn't work. We need to check deep equality.
        // This is only executed for a deprecated API and will eventually be
        // removed.
        if (Array.isArray(value) && isEqual(value, this.savedContent)) {
          return;
        }

        var record = this.formatToValue(value);

        if (isSelected) {
          var prevRecord = this.formatToValue(prevProps.value);
          var length = getTextContent(prevRecord).length;
          record.start = length;
          record.end = length;
        }

        this.applyRecord(record);
        this.savedContent = value;
      } // If any format props update, reapply value.


      var shouldReapply = Object.keys(this.props).some(function (name) {
        if (name.indexOf('format_') !== 0) {
          return false;
        } // Allow primitives and arrays:


        if (!isPlainObject(_this3.props[name])) {
          return _this3.props[name] !== prevProps[name];
        }

        return Object.keys(_this3.props[name]).some(function (subName) {
          return _this3.props[name][subName] !== prevProps[name][subName];
        });
      });

      if (shouldReapply) {
        var _record = this.formatToValue(value); // Maintain the previous selection if the instance is currently
        // selected.


        if (isSelected) {
          _record.start = this.state.start;
          _record.end = this.state.end;
        }

        this.applyRecord(_record);
      }
    }
    /**
     * Get props that are provided by formats to modify RichText.
     *
     * @return {Object} Props that start with 'format_'.
     */

  }, {
    key: "getFormatProps",
    value: function getFormatProps() {
      return pickBy(this.props, function (propValue, name) {
        return name.startsWith('format_');
      });
    }
    /**
     * Converts the outside data structure to our internal representation.
     *
     * @param {*} value The outside value, data type depends on props.
     * @return {Object} An internal rich-text value.
     */

  }, {
    key: "formatToValue",
    value: function formatToValue(value) {
      // Handle deprecated `children` and `node` sources.
      if (Array.isArray(value)) {
        return create({
          html: children.toHTML(value),
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags
        });
      }

      if (this.props.format === 'string') {
        return create({
          html: value,
          multilineTag: this.multilineTag,
          multilineWrapperTags: this.multilineWrapperTags
        });
      } // Guard for blocks passing `null` in onSplit callbacks. May be removed
      // if onSplit is revised to not pass a `null` value.


      if (value === null) {
        return create();
      }

      return value;
    }
  }, {
    key: "valueToEditableHTML",
    value: function valueToEditableHTML(value) {
      return unstableToDom({
        value: value,
        multilineTag: this.multilineTag,
        prepareEditableTree: this.props.prepareEditableTree
      }).body.innerHTML;
    }
    /**
     * Removes editor only formats from the value.
     *
     * Editor only formats are applied using `prepareEditableTree`, so we need to
     * remove them before converting the internal state
     *
     * @param {Object} value The internal rich-text value.
     * @return {Object} A new rich-text value.
     */

  }, {
    key: "removeEditorOnlyFormats",
    value: function removeEditorOnlyFormats(value) {
      this.props.formatTypes.forEach(function (formatType) {
        // Remove formats created by prepareEditableTree, because they are editor only.
        if (formatType.__experimentalCreatePrepareEditableTree) {
          value = removeFormat(value, formatType.name, 0, value.text.length);
        }
      });
      return value;
    }
    /**
     * Converts the internal value to the external data format.
     *
     * @param {Object} value The internal rich-text value.
     * @return {*} The external data format, data type depends on props.
     */

  }, {
    key: "valueToFormat",
    value: function valueToFormat(value) {
      value = this.removeEditorOnlyFormats(value); // Handle deprecated `children` and `node` sources.

      if (this.usedDeprecatedChildrenSource) {
        return children.fromDOM(unstableToDom({
          value: value,
          multilineTag: this.multilineTag,
          isEditableTree: false
        }).body.childNodes);
      }

      if (this.props.format === 'string') {
        return toHTMLString({
          value: value,
          multilineTag: this.multilineTag
        });
      }

      return value;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          _this$props3$tagName = _this$props3.tagName,
          Tagname = _this$props3$tagName === void 0 ? 'div' : _this$props3$tagName,
          style = _this$props3.style,
          wrapperClassName = _this$props3.wrapperClassName,
          className = _this$props3.className,
          _this$props3$inlineTo = _this$props3.inlineToolbar,
          inlineToolbar = _this$props3$inlineTo === void 0 ? false : _this$props3$inlineTo,
          formattingControls = _this$props3.formattingControls,
          placeholder = _this$props3.placeholder,
          _this$props3$keepPlac = _this$props3.keepPlaceholderOnFocus,
          keepPlaceholderOnFocus = _this$props3$keepPlac === void 0 ? false : _this$props3$keepPlac,
          isSelected = _this$props3.isSelected,
          autocompleters = _this$props3.autocompleters,
          onTagNameChange = _this$props3.onTagNameChange; // Generating a key that includes `tagName` ensures that if the tag
      // changes, we replace the relevant element. This is needed because we
      // prevent Editable component updates.

      var key = Tagname;
      var MultilineTag = this.multilineTag;
      var ariaProps = pickAriaProps(this.props);
      var isPlaceholderVisible = placeholder && (!isSelected || keepPlaceholderOnFocus) && this.isEmpty();
      var classes = classnames(wrapperClassName, 'editor-rich-text block-editor-rich-text');
      var record = this.getRecord();
      return createElement("div", {
        className: classes,
        onFocus: this.setFocusedElement
      }, isSelected && this.multilineTag === 'li' && createElement(ListEdit, {
        onTagNameChange: onTagNameChange,
        tagName: Tagname,
        value: record,
        onChange: this.onChange
      }), isSelected && !inlineToolbar && createElement(BlockFormatControls, null, createElement(FormatToolbar, {
        controls: formattingControls
      })), isSelected && inlineToolbar && createElement(IsolatedEventContainer, {
        className: "editor-rich-text__inline-toolbar block-editor-rich-text__inline-toolbar"
      }, createElement(FormatToolbar, {
        controls: formattingControls
      })), createElement(Autocomplete, {
        onReplace: this.props.onReplace,
        completers: autocompleters,
        record: record,
        onChange: this.onChange
      }, function (_ref7) {
        var listBoxId = _ref7.listBoxId,
            activeId = _ref7.activeId;
        return createElement(Fragment, null, createElement(Editable, _extends({
          tagName: Tagname,
          style: style,
          record: record,
          valueToEditableHTML: _this4.valueToEditableHTML,
          isPlaceholderVisible: isPlaceholderVisible,
          "aria-label": placeholder,
          "aria-autocomplete": "list",
          "aria-owns": listBoxId,
          "aria-activedescendant": activeId
        }, ariaProps, {
          className: className,
          key: key,
          onPaste: _this4.onPaste,
          onInput: _this4.onInput,
          onCompositionEnd: _this4.onCompositionEnd,
          onKeyDown: _this4.onKeyDown,
          onFocus: _this4.onFocus,
          onBlur: _this4.onBlur,
          onMouseDown: _this4.onPointerDown,
          onTouchStart: _this4.onPointerDown,
          setRef: _this4.setRef
        })), isPlaceholderVisible && createElement(Tagname, {
          className: classnames('editor-rich-text__editable block-editor-rich-text__editable', className),
          style: style
        }, MultilineTag ? createElement(MultilineTag, null, placeholder) : placeholder), isSelected && createElement(FormatEdit, {
          value: record,
          onChange: _this4.onChange
        }));
      }), isSelected && createElement(RemoveBrowserShortcuts, null));
    }
  }]);

  return RichText;
}(Component);
RichText.defaultProps = {
  formattingControls: ['bold', 'italic', 'link', 'strikethrough'],
  format: 'string',
  value: ''
};
var RichTextContainer = compose([withInstanceId, withBlockEditContext(function (context, ownProps) {
  // When explicitly set as not selected, do nothing.
  if (ownProps.isSelected === false) {
    return {
      clientId: context.clientId
    };
  } // When explicitly set as selected, use the value stored in the context instead.


  if (ownProps.isSelected === true) {
    return {
      isSelected: context.isSelected,
      clientId: context.clientId
    };
  } // Ensures that only one RichText component can be focused.


  return {
    isSelected: context.isSelected && context.focusedElement === ownProps.instanceId,
    setFocusedElement: context.setFocusedElement,
    clientId: context.clientId
  };
}), withSelect(function (select) {
  // This should probably be moved to the block editor settings.
  var _select = select('core/editor'),
      canUserUseUnfilteredHTML = _select.canUserUseUnfilteredHTML;

  var _select2 = select('core/block-editor'),
      isCaretWithinFormattedText = _select2.isCaretWithinFormattedText;

  var _select3 = select('core/rich-text'),
      getFormatTypes = _select3.getFormatTypes;

  return {
    canUserUseUnfilteredHTML: canUserUseUnfilteredHTML(),
    isCaretWithinFormattedText: isCaretWithinFormattedText(),
    formatTypes: getFormatTypes()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      __unstableMarkLastChangeAsPersistent = _dispatch.__unstableMarkLastChangeAsPersistent,
      enterFormattedText = _dispatch.enterFormattedText,
      exitFormattedText = _dispatch.exitFormattedText;

  return {
    onCreateUndoLevel: __unstableMarkLastChangeAsPersistent,
    onEnterFormattedText: enterFormattedText,
    onExitFormattedText: exitFormattedText
  };
}), withSafeTimeout, withFilters('experimentalRichText')])(RichText);

RichTextContainer.Content = function (_ref8) {
  var value = _ref8.value,
      Tag = _ref8.tagName,
      multiline = _ref8.multiline,
      props = _objectWithoutProperties(_ref8, ["value", "tagName", "multiline"]);

  var html = value;
  var MultilineTag;

  if (multiline === true || multiline === 'p' || multiline === 'li') {
    MultilineTag = multiline === true ? 'p' : multiline;
  } // Handle deprecated `children` and `node` sources.


  if (Array.isArray(value)) {
    html = children.toHTML(value);
  }

  if (!html && MultilineTag) {
    html = "<".concat(MultilineTag, "></").concat(MultilineTag, ">");
  }

  var content = createElement(RawHTML, null, html);

  if (Tag) {
    return createElement(Tag, omit(props, ['format']), content);
  }

  return content;
};

RichTextContainer.isEmpty = function () {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Handle deprecated `children` and `node` sources.
  if (Array.isArray(value)) {
    return !value || value.length === 0;
  }

  return value.length === 0;
};

RichTextContainer.Content.defaultProps = {
  format: 'string',
  value: ''
};
export default RichTextContainer;
export { RichTextShortcut } from './shortcut';
export { RichTextToolbarButton } from './toolbar-button';
export { UnstableRichTextInputEvent } from './input-event';
//# sourceMappingURL=index.js.map