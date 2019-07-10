import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
import { BACKSPACE, DELETE, F10 } from '@wordpress/keycodes';
var _window = window,
    wp = _window.wp;

function isTmceEmpty(editor) {
  // When tinyMce is empty the content seems to be:
  // <p><br data-mce-bogus="1"></p>
  // avoid expensive checks for large documents
  var body = editor.getBody();

  if (body.childNodes.length > 1) {
    return false;
  } else if (body.childNodes.length === 0) {
    return true;
  }

  if (body.childNodes[0].childNodes.length > 1) {
    return false;
  }

  return /^\n?$/.test(body.innerText || body.textContent);
}

var ClassicEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(ClassicEdit, _Component);

  function ClassicEdit(props) {
    var _this;

    _classCallCheck(this, ClassicEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClassicEdit).call(this, props));
    _this.initialize = _this.initialize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSetup = _this.onSetup.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focus = _this.focus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ClassicEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _window$wpEditorL10n$ = window.wpEditorL10n.tinymce,
          baseURL = _window$wpEditorL10n$.baseURL,
          suffix = _window$wpEditorL10n$.suffix;
      window.tinymce.EditorManager.overrideDefaults({
        base_url: baseURL,
        suffix: suffix
      });

      if (document.readyState === 'complete') {
        this.initialize();
      } else {
        window.addEventListener('DOMContentLoaded', this.initialize);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.addEventListener('DOMContentLoaded', this.initialize);
      wp.oldEditor.remove("editor-".concat(this.props.clientId));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          clientId = _this$props.clientId,
          content = _this$props.attributes.content;
      var editor = window.tinymce.get("editor-".concat(clientId));

      if (prevProps.attributes.content !== content) {
        editor.setContent(content || '');
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var clientId = this.props.clientId;
      var settings = window.wpEditorL10n.tinymce.settings;
      wp.oldEditor.initialize("editor-".concat(clientId), {
        tinymce: _objectSpread({}, settings, {
          inline: true,
          content_css: false,
          fixed_toolbar_container: "#toolbar-".concat(clientId),
          setup: this.onSetup
        })
      });
    }
  }, {
    key: "onSetup",
    value: function onSetup(editor) {
      var _this2 = this;

      var _this$props2 = this.props,
          content = _this$props2.attributes.content,
          setAttributes = _this$props2.setAttributes;
      var ref = this.ref;
      var bookmark;
      this.editor = editor;

      if (content) {
        editor.on('loadContent', function () {
          return editor.setContent(content);
        });
      }

      editor.on('blur', function () {
        bookmark = editor.selection.getBookmark(2, true);
        setAttributes({
          content: editor.getContent()
        });
        editor.once('focus', function () {
          if (bookmark) {
            editor.selection.moveToBookmark(bookmark);
          }
        });
        return false;
      });
      editor.on('mousedown touchstart', function () {
        bookmark = null;
      });
      editor.on('keydown', function (event) {
        if ((event.keyCode === BACKSPACE || event.keyCode === DELETE) && isTmceEmpty(editor)) {
          // delete the block
          _this2.props.onReplace([]);

          event.preventDefault();
          event.stopImmediatePropagation();
        }

        var altKey = event.altKey;
        /*
         * Prevent Mousetrap from kicking in: TinyMCE already uses its own
         * `alt+f10` shortcut to focus its toolbar.
         */

        if (altKey && event.keyCode === F10) {
          event.stopPropagation();
        }
      }); // TODO: the following is for back-compat with WP 4.9, not needed in WP 5.0. Remove it after the release.

      editor.addButton('kitchensink', {
        tooltip: _x('More', 'button to expand options'),
        icon: 'dashicon dashicons-editor-kitchensink',
        onClick: function onClick() {
          var button = this;
          var active = !button.active();
          button.active(active);
          editor.dom.toggleClass(ref, 'has-advanced-toolbar', active);
        }
      }); // Show the second, third, etc. toolbars when the `kitchensink` button is removed by a plugin.

      editor.on('init', function () {
        if (editor.settings.toolbar1 && editor.settings.toolbar1.indexOf('kitchensink') === -1) {
          editor.dom.addClass(ref, 'has-advanced-toolbar');
        }
      });
      editor.addButton('wp_add_media', {
        tooltip: __('Insert Media'),
        icon: 'dashicon dashicons-admin-media',
        cmd: 'WP_Medialib'
      }); // End TODO.

      editor.on('init', function () {
        var rootNode = _this2.editor.getBody(); // Create the toolbar by refocussing the editor.


        if (document.activeElement === rootNode) {
          rootNode.blur();

          _this2.editor.focus();
        }
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.editor) {
        this.editor.focus();
      }
    }
  }, {
    key: "onToolbarKeyDown",
    value: function onToolbarKeyDown(event) {
      // Prevent WritingFlow from kicking in and allow arrows navigation on the toolbar.
      event.stopPropagation(); // Prevent Mousetrap from moving focus to the top toolbar when pressing `alt+f10` on this block toolbar.

      event.nativeEvent.stopImmediatePropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var clientId = this.props.clientId; // Disable reason: the toolbar itself is non-interactive, but must capture
      // events from the KeyboardShortcuts component to stop their propagation.

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return [// Disable reason: Clicking on this visual placeholder should create
      // the toolbar, it can also be created by focussing the field below.

      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
      createElement("div", {
        key: "toolbar",
        id: "toolbar-".concat(clientId),
        ref: function ref(_ref) {
          return _this3.ref = _ref;
        },
        className: "block-library-classic__toolbar",
        onClick: this.focus,
        "data-placeholder": __('Classic'),
        onKeyDown: this.onToolbarKeyDown
      }), createElement("div", {
        key: "editor",
        id: "editor-".concat(clientId),
        className: "wp-block-freeform block-library-rich-text__tinymce"
      })];
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return ClassicEdit;
}(Component);

export { ClassicEdit as default };
//# sourceMappingURL=edit.js.map