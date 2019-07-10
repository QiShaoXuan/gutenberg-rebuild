"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

var _i18n = require("@wordpress/i18n");

var _icon = _interopRequireDefault(require("./icon"));

var _inspector = _interopRequireDefault(require("./inspector"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var FileEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FileEdit, _Component);

  function FileEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, FileEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FileEdit).apply(this, arguments));
    _this.onSelectFile = _this.onSelectFile.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.confirmCopyURL = _this.confirmCopyURL.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resetCopyConfirmation = _this.resetCopyConfirmation.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.changeLinkDestinationOption = _this.changeLinkDestinationOption.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.changeOpenInNewWindow = _this.changeOpenInNewWindow.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.changeShowDownloadButton = _this.changeShowDownloadButton.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      hasError: false,
      showCopyConfirmation: false
    };
    return _this;
  }

  (0, _createClass2.default)(FileEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          noticeOperations = _this$props.noticeOperations;
      var href = attributes.href; // Upload a file drag-and-dropped into the editor

      if ((0, _blob.isBlobURL)(href)) {
        var file = (0, _blob.getBlobByURL)(href);
        (0, _editor.mediaUpload)({
          filesList: [file],
          onFileChange: function onFileChange(_ref) {
            var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
                media = _ref2[0];

            return _this2.onSelectFile(media);
          },
          onError: function onError(message) {
            _this2.setState({
              hasError: true
            });

            noticeOperations.createErrorNotice(message);
          }
        });
        (0, _blob.revokeBlobURL)(href);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Reset copy confirmation state when block is deselected
      if (prevProps.isSelected && !this.props.isSelected) {
        this.setState({
          showCopyConfirmation: false
        });
      }
    }
  }, {
    key: "onSelectFile",
    value: function onSelectFile(media) {
      if (media && media.url) {
        this.setState({
          hasError: false
        });
        this.props.setAttributes({
          href: media.url,
          fileName: media.title,
          textLinkHref: media.url,
          id: media.id
        });
      }
    }
  }, {
    key: "confirmCopyURL",
    value: function confirmCopyURL() {
      this.setState({
        showCopyConfirmation: true
      });
    }
  }, {
    key: "resetCopyConfirmation",
    value: function resetCopyConfirmation() {
      this.setState({
        showCopyConfirmation: false
      });
    }
  }, {
    key: "changeLinkDestinationOption",
    value: function changeLinkDestinationOption(newHref) {
      // Choose Media File or Attachment Page (when file is in Media Library)
      this.props.setAttributes({
        textLinkHref: newHref
      });
    }
  }, {
    key: "changeOpenInNewWindow",
    value: function changeOpenInNewWindow(newValue) {
      this.props.setAttributes({
        textLinkTarget: newValue ? '_blank' : false
      });
    }
  }, {
    key: "changeShowDownloadButton",
    value: function changeShowDownloadButton(newValue) {
      this.props.setAttributes({
        showDownloadButton: newValue
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          isSelected = _this$props2.isSelected,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes,
          noticeUI = _this$props2.noticeUI,
          noticeOperations = _this$props2.noticeOperations,
          media = _this$props2.media;
      var fileName = attributes.fileName,
          href = attributes.href,
          textLinkHref = attributes.textLinkHref,
          textLinkTarget = attributes.textLinkTarget,
          showDownloadButton = attributes.showDownloadButton,
          downloadButtonText = attributes.downloadButtonText,
          id = attributes.id;
      var _this$state = this.state,
          hasError = _this$state.hasError,
          showCopyConfirmation = _this$state.showCopyConfirmation;
      var attachmentPage = media && media.link;

      if (!href || hasError) {
        return (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
          icon: (0, _element.createElement)(_blockEditor.BlockIcon, {
            icon: _icon.default
          }),
          labels: {
            title: (0, _i18n.__)('File'),
            instructions: (0, _i18n.__)('Drag a file, upload a new one or select a file from your library.')
          },
          onSelect: this.onSelectFile,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice,
          accept: "*"
        });
      }

      var classes = (0, _classnames.default)(className, {
        'is-transient': (0, _blob.isBlobURL)(href)
      });
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_inspector.default, (0, _extends2.default)({
        hrefs: {
          href: href,
          textLinkHref: textLinkHref,
          attachmentPage: attachmentPage
        }
      }, {
        openInNewWindow: !!textLinkTarget,
        showDownloadButton: showDownloadButton,
        changeLinkDestinationOption: this.changeLinkDestinationOption,
        changeOpenInNewWindow: this.changeOpenInNewWindow,
        changeShowDownloadButton: this.changeShowDownloadButton
      })), (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.MediaUploadCheck, null, (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_blockEditor.MediaUpload, {
        onSelect: this.onSelectFile,
        value: id,
        render: function render(_ref3) {
          var open = _ref3.open;
          return (0, _element.createElement)(_components.IconButton, {
            className: "components-toolbar__control",
            label: (0, _i18n.__)('Edit file'),
            onClick: open,
            icon: "edit"
          });
        }
      })))), (0, _element.createElement)("div", {
        className: classes
      }, (0, _element.createElement)("div", {
        className: 'wp-block-file__content-wrapper'
      }, (0, _element.createElement)(_blockEditor.RichText, {
        wrapperClassName: 'wp-block-file__textlink',
        tagName: "div" // must be block-level or else cursor disappears
        ,
        value: fileName,
        placeholder: (0, _i18n.__)('Write file name…'),
        keepPlaceholderOnFocus: true,
        formattingControls: [] // disable controls
        ,
        onChange: function onChange(text) {
          return setAttributes({
            fileName: text
          });
        }
      }), showDownloadButton && (0, _element.createElement)("div", {
        className: 'wp-block-file__button-richtext-wrapper'
      }, (0, _element.createElement)(_blockEditor.RichText, {
        tagName: "div" // must be block-level or else cursor disappears
        ,
        className: 'wp-block-file__button',
        value: downloadButtonText,
        formattingControls: [] // disable controls
        ,
        placeholder: (0, _i18n.__)('Add text…'),
        keepPlaceholderOnFocus: true,
        onChange: function onChange(text) {
          return setAttributes({
            downloadButtonText: text
          });
        }
      }))), isSelected && (0, _element.createElement)(_components.ClipboardButton, {
        isDefault: true,
        text: href,
        className: 'wp-block-file__copy-url-button',
        onCopy: this.confirmCopyURL,
        onFinishCopy: this.resetCopyConfirmation,
        disabled: (0, _blob.isBlobURL)(href)
      }, showCopyConfirmation ? (0, _i18n.__)('Copied!') : (0, _i18n.__)('Copy URL'))));
    }
  }]);
  return FileEdit;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, props) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var id = props.attributes.id;
  return {
    media: id === undefined ? undefined : getMedia(id)
  };
}), _components.withNotices])(FileEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map