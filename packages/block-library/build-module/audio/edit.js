import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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
import { getBlobByURL, isBlobURL } from '@wordpress/blob';
import { Disabled, IconButton, PanelBody, SelectControl, ToggleControl, Toolbar, withNotices } from '@wordpress/components';
import { BlockControls, BlockIcon, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import icon from './icon';
/**
 * Internal dependencies
 */

import { createUpgradedEmbedBlock } from '../embed/util';
var ALLOWED_MEDIA_TYPES = ['audio'];

var AudioEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(AudioEdit, _Component);

  function AudioEdit() {
    var _this;

    _classCallCheck(this, AudioEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioEdit).apply(this, arguments)); // edit component has its own src in the state so it can be edited
    // without setting the actual value outside of the edit UI

    _this.state = {
      editing: !_this.props.attributes.src
    };
    _this.toggleAttribute = _this.toggleAttribute.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectURL = _this.onSelectURL.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AudioEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          noticeOperations = _this$props.noticeOperations,
          setAttributes = _this$props.setAttributes;
      var id = attributes.id,
          _attributes$src = attributes.src,
          src = _attributes$src === void 0 ? '' : _attributes$src;

      if (!id && isBlobURL(src)) {
        var file = getBlobByURL(src);

        if (file) {
          mediaUpload({
            filesList: [file],
            onFileChange: function onFileChange(_ref) {
              var _ref2 = _slicedToArray(_ref, 1),
                  _ref2$ = _ref2[0],
                  mediaId = _ref2$.id,
                  url = _ref2$.url;

              setAttributes({
                id: mediaId,
                src: url
              });
            },
            onError: function onError(e) {
              setAttributes({
                src: undefined,
                id: undefined
              });

              _this2.setState({
                editing: true
              });

              noticeOperations.createErrorNotice(e);
            },
            allowedTypes: ALLOWED_MEDIA_TYPES
          });
        }
      }
    }
  }, {
    key: "toggleAttribute",
    value: function toggleAttribute(attribute) {
      var _this3 = this;

      return function (newValue) {
        _this3.props.setAttributes(_defineProperty({}, attribute, newValue));
      };
    }
  }, {
    key: "onSelectURL",
    value: function onSelectURL(newSrc) {
      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      var src = attributes.src; // Set the block's src from the edit component's state, and switch off
      // the editing UI.

      if (newSrc !== src) {
        // Check if there's an embed block that handles this URL.
        var embedBlock = createUpgradedEmbedBlock({
          attributes: {
            url: newSrc
          }
        });

        if (undefined !== embedBlock) {
          this.props.onReplace(embedBlock);
          return;
        }

        setAttributes({
          src: newSrc,
          id: undefined
        });
      }

      this.setState({
        editing: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props$attribute = this.props.attributes,
          autoplay = _this$props$attribute.autoplay,
          caption = _this$props$attribute.caption,
          loop = _this$props$attribute.loop,
          preload = _this$props$attribute.preload,
          src = _this$props$attribute.src;
      var _this$props3 = this.props,
          setAttributes = _this$props3.setAttributes,
          isSelected = _this$props3.isSelected,
          className = _this$props3.className,
          noticeOperations = _this$props3.noticeOperations,
          noticeUI = _this$props3.noticeUI;
      var editing = this.state.editing;

      var switchToEditing = function switchToEditing() {
        _this4.setState({
          editing: true
        });
      };

      var onSelectAudio = function onSelectAudio(media) {
        if (!media || !media.url) {
          // in this case there was an error and we should continue in the editing state
          // previous attributes should be removed because they may be temporary blob urls
          setAttributes({
            src: undefined,
            id: undefined
          });
          switchToEditing();
          return;
        } // sets the block's attribute and updates the edit component from the
        // selected media, then switches off the editing UI


        setAttributes({
          src: media.url,
          id: media.id
        });

        _this4.setState({
          src: media.url,
          editing: false
        });
      };

      if (editing) {
        return createElement(MediaPlaceholder, {
          icon: createElement(BlockIcon, {
            icon: icon
          }),
          className: className,
          onSelect: onSelectAudio,
          onSelectURL: this.onSelectURL,
          accept: "audio/*",
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: this.props.attributes,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice
        });
      }
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */


      return createElement(Fragment, null, createElement(BlockControls, null, createElement(Toolbar, null, createElement(IconButton, {
        className: "components-icon-button components-toolbar__control",
        label: __('Edit audio'),
        onClick: switchToEditing,
        icon: "edit"
      }))), createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Audio Settings')
      }, createElement(ToggleControl, {
        label: __('Autoplay'),
        onChange: this.toggleAttribute('autoplay'),
        checked: autoplay
      }), createElement(ToggleControl, {
        label: __('Loop'),
        onChange: this.toggleAttribute('loop'),
        checked: loop
      }), createElement(SelectControl, {
        label: __('Preload'),
        value: undefined !== preload ? preload : 'none' // `undefined` is required for the preload attribute to be unset.
        ,
        onChange: function onChange(value) {
          return setAttributes({
            preload: 'none' !== value ? value : undefined
          });
        },
        options: [{
          value: 'auto',
          label: __('Auto')
        }, {
          value: 'metadata',
          label: __('Metadata')
        }, {
          value: 'none',
          label: __('None')
        }]
      }))), createElement("figure", {
        className: className
      }, createElement(Disabled, null, createElement("audio", {
        controls: "controls",
        src: src
      })), (!RichText.isEmpty(caption) || isSelected) && createElement(RichText, {
        tagName: "figcaption",
        placeholder: __('Write caption…'),
        value: caption,
        onChange: function onChange(value) {
          return setAttributes({
            caption: value
          });
        },
        inlineToolbar: true
      })));
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
    }
  }]);

  return AudioEdit;
}(Component);

export default withNotices(AudioEdit);
//# sourceMappingURL=edit.js.map