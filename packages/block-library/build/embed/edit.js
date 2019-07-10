"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmbedEditComponent = getEmbedEditComponent;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _util = require("./util");

var _embedControls = _interopRequireDefault(require("./embed-controls"));

var _embedLoading = _interopRequireDefault(require("./embed-loading"));

var _embedPlaceholder = _interopRequireDefault(require("./embed-placeholder"));

var _embedPreview = _interopRequireDefault(require("./embed-preview"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

/**
 * Internal dependencies
 */

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function getEmbedEditComponent(title, icon) {
  var responsive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(_class, _Component);

      function _class() {
        var _this;

        (0, _classCallCheck2.default)(this, _class);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
        _this.switchBackToURLInput = _this.switchBackToURLInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.setUrl = _this.setUrl.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.getAttributesFromPreview = _this.getAttributesFromPreview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.setAttributesFromPreview = _this.setAttributesFromPreview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.getResponsiveHelp = _this.getResponsiveHelp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.toggleResponsive = _this.toggleResponsive.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.handleIncomingPreview = _this.handleIncomingPreview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.state = {
          editingURL: false,
          url: _this.props.attributes.url
        };

        if (_this.props.preview) {
          _this.handleIncomingPreview();
        }

        return _this;
      }

      (0, _createClass2.default)(_class, [{
        key: "handleIncomingPreview",
        value: function handleIncomingPreview() {
          var allowResponsive = this.props.attributes.allowResponsive;
          this.setAttributesFromPreview();
          var upgradedBlock = (0, _util.createUpgradedEmbedBlock)(this.props, this.getAttributesFromPreview(this.props.preview, allowResponsive));

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
          var providerNameSlug = (0, _lodash.kebabCase)((0, _lodash.toLower)('' !== providerName ? providerName : title));

          if ((0, _util.isFromWordPress)(html)) {
            type = 'wp-embed';
          }

          if (html || 'photo' === type) {
            attributes.type = type;
            attributes.providerNameSlug = providerNameSlug;
          }

          attributes.className = (0, _util.getClassNames)(html, this.props.attributes.className, responsive && allowResponsive);
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
          return checked ? (0, _i18n.__)('This embed will preserve its aspect ratio when the browser is resized.') : (0, _i18n.__)('This embed may not preserve its aspect ratio when the browser is resized.');
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
            className: (0, _util.getClassNames)(html, className, responsive && newAllowResponsive)
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
            return (0, _element.createElement)(_embedLoading.default, null);
          } // translators: %s: type of embed e.g: "YouTube", "Twitter", etc. "Embed" is used when no specific type exists


          var label = (0, _i18n.sprintf)((0, _i18n.__)('%s URL'), title); // No preview, or we can't embed the current URL, or we've clicked the edit button.

          if (!preview || cannotEmbed || editingURL) {
            return (0, _element.createElement)(_embedPlaceholder.default, {
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
                return (0, _util.fallback)(url, _this2.props.onReplace);
              },
              tryAgain: tryAgain
            });
          }

          return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_embedControls.default, {
            showEditButton: preview && !cannotEmbed,
            themeSupportsResponsive: themeSupportsResponsive,
            blockSupportsResponsive: responsive,
            allowResponsive: allowResponsive,
            getResponsiveHelp: this.getResponsiveHelp,
            toggleResponsive: this.toggleResponsive,
            switchBackToURLInput: this.switchBackToURLInput
          }), (0, _element.createElement)(_embedPreview.default, {
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
    }(_element.Component)
  );
}
//# sourceMappingURL=edit.js.map