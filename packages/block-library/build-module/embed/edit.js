import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { isFromWordPress, createUpgradedEmbedBlock, getClassNames, fallback as _fallback } from './util';
import EmbedControls from './embed-controls';
import EmbedLoading from './embed-loading';
import EmbedPlaceholder from './embed-placeholder';
import EmbedPreview from './embed-preview';
/**
 * External dependencies
 */

import { kebabCase, toLower } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
export function getEmbedEditComponent(title, icon) {
  var responsive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
        _this.switchBackToURLInput = _this.switchBackToURLInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.setUrl = _this.setUrl.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.getAttributesFromPreview = _this.getAttributesFromPreview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.setAttributesFromPreview = _this.setAttributesFromPreview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.getResponsiveHelp = _this.getResponsiveHelp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.toggleResponsive = _this.toggleResponsive.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleIncomingPreview = _this.handleIncomingPreview.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {
          editingURL: false,
          url: _this.props.attributes.url
        };

        if (_this.props.preview) {
          _this.handleIncomingPreview();
        }

        return _this;
      }

      _createClass(_class, [{
        key: "handleIncomingPreview",
        value: function handleIncomingPreview() {
          var allowResponsive = this.props.attributes.allowResponsive;
          this.setAttributesFromPreview();
          var upgradedBlock = createUpgradedEmbedBlock(this.props, this.getAttributesFromPreview(this.props.preview, allowResponsive));

          if (upgradedBlock) {
            this.props.onReplace(upgradedBlock);
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var hasPreview = undefined !== this.props.preview;
          var hadPreview = undefined !== prevProps.preview;
          var previewChanged = prevProps.preview && this.props.preview && this.props.preview.html !== prevProps.preview.html;
          var switchedPreview = previewChanged || hasPreview && !hadPreview;
          var switchedURL = this.props.attributes.url !== prevProps.attributes.url;

          if (switchedPreview || switchedURL) {
            if (this.props.cannotEmbed) {
              // We either have a new preview or a new URL, but we can't embed it.
              if (!this.props.fetching) {
                // If we're not fetching the preview, then we know it can't be embedded, so try
                // removing any trailing slash, and resubmit.
                this.resubmitWithoutTrailingSlash();
              }

              return;
            }

            this.handleIncomingPreview();
          }
        }
      }, {
        key: "resubmitWithoutTrailingSlash",
        value: function resubmitWithoutTrailingSlash() {
          this.setState(function (prevState) {
            return {
              url: prevState.url.replace(/\/$/, '')
            };
          }, this.setUrl);
        }
      }, {
        key: "setUrl",
        value: function setUrl(event) {
          if (event) {
            event.preventDefault();
          }

          var url = this.state.url;
          var setAttributes = this.props.setAttributes;
          this.setState({
            editingURL: false
          });
          setAttributes({
            url: url
          });
        }
        /***
         * Gets block attributes based on the preview and responsive state.
         *
         * @param {string} preview The preview data.
         * @param {boolean} allowResponsive Apply responsive classes to fixed size content.
         * @return {Object} Attributes and values.
         */

      }, {
        key: "getAttributesFromPreview",
        value: function getAttributesFromPreview(preview) {
          var allowResponsive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          var attributes = {}; // Some plugins only return HTML with no type info, so default this to 'rich'.

          var _preview$type = preview.type,
              type = _preview$type === void 0 ? 'rich' : _preview$type; // If we got a provider name from the API, use it for the slug, otherwise we use the title,
          // because not all embed code gives us a provider name.

          var html = preview.html,
              providerName = preview.provider_name;
          var providerNameSlug = kebabCase(toLower('' !== providerName ? providerName : title));

          if (isFromWordPress(html)) {
            type = 'wp-embed';
          }

          if (html || 'photo' === type) {
            attributes.type = type;
            attributes.providerNameSlug = providerNameSlug;
          }

          attributes.className = getClassNames(html, this.props.attributes.className, responsive && allowResponsive);
          return attributes;
        }
        /***
         * Sets block attributes based on the preview data.
         */

      }, {
        key: "setAttributesFromPreview",
        value: function setAttributesFromPreview() {
          var _this$props = this.props,
              setAttributes = _this$props.setAttributes,
              preview = _this$props.preview;
          var allowResponsive = this.props.attributes.allowResponsive;
          setAttributes(this.getAttributesFromPreview(preview, allowResponsive));
        }
      }, {
        key: "switchBackToURLInput",
        value: function switchBackToURLInput() {
          this.setState({
            editingURL: true
          });
        }
      }, {
        key: "getResponsiveHelp",
        value: function getResponsiveHelp(checked) {
          return checked ? __('This embed will preserve its aspect ratio when the browser is resized.') : __('This embed may not preserve its aspect ratio when the browser is resized.');
        }
      }, {
        key: "toggleResponsive",
        value: function toggleResponsive() {
          var _this$props$attribute = this.props.attributes,
              allowResponsive = _this$props$attribute.allowResponsive,
              className = _this$props$attribute.className;
          var html = this.props.preview.html;
          var newAllowResponsive = !allowResponsive;
          this.props.setAttributes({
            allowResponsive: newAllowResponsive,
            className: getClassNames(html, className, responsive && newAllowResponsive)
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          var _this$state = this.state,
              url = _this$state.url,
              editingURL = _this$state.editingURL;
          var _this$props$attribute2 = this.props.attributes,
              caption = _this$props$attribute2.caption,
              type = _this$props$attribute2.type,
              allowResponsive = _this$props$attribute2.allowResponsive;
          var _this$props2 = this.props,
              fetching = _this$props2.fetching,
              setAttributes = _this$props2.setAttributes,
              isSelected = _this$props2.isSelected,
              className = _this$props2.className,
              preview = _this$props2.preview,
              cannotEmbed = _this$props2.cannotEmbed,
              themeSupportsResponsive = _this$props2.themeSupportsResponsive,
              tryAgain = _this$props2.tryAgain;

          if (fetching) {
            return createElement(EmbedLoading, null);
          } // translators: %s: type of embed e.g: "YouTube", "Twitter", etc. "Embed" is used when no specific type exists


          var label = sprintf(__('%s URL'), title); // No preview, or we can't embed the current URL, or we've clicked the edit button.

          if (!preview || cannotEmbed || editingURL) {
            return createElement(EmbedPlaceholder, {
              icon: icon,
              label: label,
              onSubmit: this.setUrl,
              value: url,
              cannotEmbed: cannotEmbed,
              onChange: function onChange(event) {
                return _this2.setState({
                  url: event.target.value
                });
              },
              fallback: function fallback() {
                return _fallback(url, _this2.props.onReplace);
              },
              tryAgain: tryAgain
            });
          }

          return createElement(Fragment, null, createElement(EmbedControls, {
            showEditButton: preview && !cannotEmbed,
            themeSupportsResponsive: themeSupportsResponsive,
            blockSupportsResponsive: responsive,
            allowResponsive: allowResponsive,
            getResponsiveHelp: this.getResponsiveHelp,
            toggleResponsive: this.toggleResponsive,
            switchBackToURLInput: this.switchBackToURLInput
          }), createElement(EmbedPreview, {
            preview: preview,
            className: className,
            url: url,
            type: type,
            caption: caption,
            onCaptionChange: function onCaptionChange(value) {
              return setAttributes({
                caption: value
              });
            },
            isSelected: isSelected,
            icon: icon,
            label: label
          }));
        }
      }]);

      return _class;
    }(Component)
  );
}
//# sourceMappingURL=edit.js.map